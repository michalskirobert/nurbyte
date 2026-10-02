export type FeedbackKind = "bug" | "feature";
export type FeedbackProduct = "hosts-editor";

export type FeedbackDiagnostics = {
  readonly appVersion: string;
  readonly platform: string;
  readonly arch: string;
  readonly osVersion: string;
};

export type FeedbackPayload = {
  readonly product: FeedbackProduct;
  readonly productVersion: string;
  readonly kind: FeedbackKind;
  readonly email: string;
  readonly summary: string;
  readonly description: string;
  readonly expected?: string;
  readonly reproductionSteps?: string;
  readonly diagnostics?: FeedbackDiagnostics;
  readonly captchaToken: string;
  readonly captchaAnswer: string;
};
