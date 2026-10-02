import { NextResponse } from "next/server";
import { createCaptcha } from "@/server/captcha/captcha.service";

export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
} as const;

export const GET = (): NextResponse => {
  try {
    return NextResponse.json(createCaptcha(), {
      status: 200,
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    console.error("[feedback/captcha] Failed to create CAPTCHA", error);

    return NextResponse.json(
      { ok: false, message: "CAPTCHA service is unavailable." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }
};
