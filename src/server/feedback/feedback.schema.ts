import { z } from "zod";

const diagnosticsSchema = z
  .object({
    appVersion: z.string().trim().max(40),
    platform: z.string().trim().max(40),
    arch: z.string().trim().max(40),
    osVersion: z.string().trim().max(120),
  })
  .strict();

export const feedbackSchema = z
  .object({
    product: z.literal("hosts-editor"),
    productVersion: z.string().trim().min(1).max(40),
    kind: z.enum(["bug", "feature"]),
    email: z.email().trim().max(160),
    summary: z.string().trim().min(3).max(140),
    description: z.string().trim().min(10).max(5000),
    expected: z.string().trim().max(3000).optional(),
    reproductionSteps: z.string().trim().max(3000).optional(),
    diagnostics: diagnosticsSchema.optional(),
    captchaToken: z.string().trim().min(1).max(2000),
    captchaAnswer: z.string().trim().min(1).max(20),
  })
  .strict();

export type FeedbackPayload = z.infer<typeof feedbackSchema>;

export const parseFeedback = (input: unknown): FeedbackPayload =>
  feedbackSchema.parse(input);
