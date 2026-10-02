import type { FeedbackPayload } from "./feedback.types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export const parseFeedback = (input: unknown): FeedbackPayload => {
  if (!input || typeof input !== "object")
    throw new Error("Invalid feedback payload.");
  const body = input as Record<string, unknown>;
  const email = text(body.email, 160);
  const summary = text(body.summary, 140);
  const description = text(body.description, 5000);
  const productVersion = text(body.productVersion, 40);
  const kind = body.kind;
  if (body.product !== "hosts-editor") throw new Error("Unsupported product.");
  if (kind !== "bug" && kind !== "feature")
    throw new Error("Invalid feedback type.");
  if (!emailPattern.test(email))
    throw new Error("Please enter a valid email address.");
  if (summary.length < 3) throw new Error("Please add a short description.");
  if (description.length < 5) throw new Error("Please describe your feedback.");
  if (!productVersion) throw new Error("Product version is required.");
  const diagnostics =
    body.diagnostics && typeof body.diagnostics === "object"
      ? (body.diagnostics as Record<string, unknown>)
      : undefined;
  return {
    product: "hosts-editor",
    productVersion,
    kind,
    email,
    summary,
    description,
    expected: text(body.expected, 3000),
    reproductionSteps: text(body.reproductionSteps, 3000),
    diagnostics: diagnostics
      ? {
          appVersion: text(diagnostics.appVersion, 40),
          platform: text(diagnostics.platform, 40),
          arch: text(diagnostics.arch, 40),
          osVersion: text(diagnostics.osVersion, 120),
        }
      : undefined,
    captchaToken: text(body.captchaToken, 2000),
    captchaAnswer: text(body.captchaAnswer, 20),
  };
};
