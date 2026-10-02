import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const TTL_MS = 5 * 60 * 1000;
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const secret = (): string => {
  const value = process.env.FEEDBACK_CAPTCHA_SECRET?.trim();
  if (!value) throw new Error("FEEDBACK_CAPTCHA_SECRET is not configured.");
  return value;
};
const sign = (payload: string): string =>
  createHmac("sha256", secret()).update(payload).digest("base64url");
const answer = (): string =>
  Array.from(randomBytes(6), (byte) => alphabet[byte % alphabet.length]).join(
    "",
  );

export const createCaptcha = () => {
  const value = answer();
  const expiresAt = Date.now() + TTL_MS;
  const nonce = randomBytes(12).toString("base64url");
  const payload = `${value}:${expiresAt}:${nonce}`;
  const token = Buffer.from(`${payload}:${sign(payload)}`).toString(
    "base64url",
  );
  const chars = [...value]
    .map(
      (char, index) =>
        `<text x="${25 + index * 28}" y="46" transform="rotate(${index % 2 ? 5 : -5} ${25 + index * 28} 46)" fill="#f8d348" font-size="30" font-family="monospace" font-weight="700">${char}</text>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 200 64"><rect width="200" height="64" rx="12" fill="#07111c"/><path d="M8 18L192 44M12 51L186 13" stroke="#2d4154" stroke-width="2" opacity=".65"/>${chars}</svg>`;
  return {
    token,
    imageDataUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
  };
};

export const verifyCaptcha = (token: string, submitted: string): boolean => {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(":");
    if (parts.length !== 4) return false;
    const [value, expires, nonce, signature] = parts;
    if (Date.now() > Number(expires)) return false;
    const expected = sign(`${value}:${expires}:${nonce}`);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    return (
      a.length === b.length &&
      timingSafeEqual(a, b) &&
      value.toUpperCase() === submitted.trim().toUpperCase()
    );
  } catch {
    return false;
  }
};
