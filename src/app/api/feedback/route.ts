import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCaptcha } from "@/server/captcha/captcha.service";
import { parseFeedback } from "@/server/feedback/feedback.schema";
import { sendFeedback } from "@/server/feedback/feedback.service";

export const runtime = "nodejs";

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const payload = parseFeedback(await request.json());

    if (!verifyCaptcha(payload.captchaToken, payload.captchaAnswer)) {
      return NextResponse.json(
        { ok: false, message: "CAPTCHA is invalid or expired." },
        { status: 400 },
      );
    }

    const result = await sendFeedback(payload);

    return NextResponse.json(
      { ok: true, reportId: result.reportId },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid feedback payload.",
          issues: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Feedback could not be sent.";
    const configurationError = message.includes("is not configured");

    console.error("[feedback] Failed to submit feedback", error);

    return NextResponse.json(
      {
        ok: false,
        message: configurationError
          ? "Feedback service is temporarily unavailable."
          : "Feedback could not be sent. Please try again.",
      },
      { status: configurationError ? 503 : 500 },
    );
  }
};
