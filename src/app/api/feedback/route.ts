import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/server/captcha/captcha.service";
import { parseFeedback } from "@/server/feedback/feedback.schema";
import { sendFeedback } from "@/server/feedback/feedback.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = parseFeedback(await request.json());
    if (!verifyCaptcha(payload.captchaToken, payload.captchaAnswer))
      return NextResponse.json(
        { message: "CAPTCHA is invalid or expired." },
        { status: 400 },
      );
    const result = await sendFeedback(payload);
    return NextResponse.json({ ok: true, reportId: result.reportId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Feedback could not be sent.";
    const configurationError = message.includes("configured");
    console.error("Feedback API error", error);
    return NextResponse.json(
      {
        message: configurationError
          ? "Feedback service is temporarily unavailable."
          : message,
      },
      { status: configurationError ? 503 : 400 },
    );
  }
}
