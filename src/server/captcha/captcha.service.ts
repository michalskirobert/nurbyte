import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const CAPTCHA_TTL_MS = 5 * 60 * 1000;
const CAPTCHA_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CAPTCHA_LENGTH = 6;

const getCaptchaSecret = (): string => {
  const value = process.env.FEEDBACK_CAPTCHA_SECRET?.trim();

  if (!value) {
    throw new Error("FEEDBACK_CAPTCHA_SECRET is not configured.");
  }

  return value;
};

const sign = (payload: string): string =>
  createHmac("sha256", getCaptchaSecret()).update(payload).digest("base64url");

const createAnswer = (): string =>
  Array.from(randomBytes(CAPTCHA_LENGTH), (byte) =>
    CAPTCHA_ALPHABET.at(byte % CAPTCHA_ALPHABET.length),
  ).join("");

const createSvg = (value: string): string => {
  const characters = [...value]
    .map((character, index) => {
      const x = 25 + index * 28;
      const rotation = index % 2 === 0 ? -5 : 5;

      return `<text x="${String(x)}" y="46" transform="rotate(${String(rotation)} ${String(x)} 46)" fill="#f8d348" font-size="30" font-family="monospace" font-weight="700">${character}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 200 64"><rect width="200" height="64" rx="12" fill="#07111c"/><path d="M8 18L192 44M12 51L186 13" stroke="#2d4154" stroke-width="2" opacity=".65"/>${characters}</svg>`;
};

export type CaptchaChallenge = {
  readonly token: string;
  readonly imageDataUrl: string;
};

export const createCaptcha = (): CaptchaChallenge => {
  const value = createAnswer();
  const expiresAt = Date.now() + CAPTCHA_TTL_MS;
  const nonce = randomBytes(12).toString("base64url");
  const payload = `${value}:${String(expiresAt)}:${nonce}`;
  const signature = sign(payload);
  const token = Buffer.from(`${payload}:${signature}`).toString("base64url");
  const svg = createSvg(value);

  return {
    token,
    imageDataUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
  };
};

export const verifyCaptcha = (
  token: string,
  submittedAnswer: string,
): boolean => {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [value, expiresAtRaw, nonce, signature, ...rest] = decoded.split(":");

    if (rest.length > 0 || !value || !expiresAtRaw || !nonce || !signature) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    const expectedSignature = sign(`${value}:${expiresAtRaw}:${nonce}`);
    const receivedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    return (
      receivedBuffer.length === expectedBuffer.length &&
      timingSafeEqual(receivedBuffer, expectedBuffer) &&
      value.toUpperCase() === submittedAnswer.trim().toUpperCase()
    );
  } catch {
    return false;
  }
};
