import type { FeedbackPayload } from "./feedback.schema";

export type FeedbackKind = FeedbackPayload["kind"];
export type FeedbackProduct = FeedbackPayload["product"];
export type FeedbackDiagnostics = NonNullable<FeedbackPayload["diagnostics"]>;
export type { FeedbackPayload };
