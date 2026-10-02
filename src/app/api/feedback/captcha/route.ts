import { NextResponse } from "next/server";
import { createCaptcha } from "@/server/captcha/captcha.service";
export const runtime = "nodejs";
export function GET() {
  try {
    return NextResponse.json(createCaptcha(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("CAPTCHA API error", error);
    return NextResponse.json(
      { message: "CAPTCHA service is unavailable." },
      { status: 503 },
    );
  }
}
