import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { openCaptcha } from "@/lib/captcha";
const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  message: z.string().min(10).max(5000),
  captcha: z.string().min(4).max(8),
  captchaToken: z.string().min(10),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  const { name, email, message, captcha, captchaToken } = parsed.data;
  const expected = openCaptcha(captchaToken);
  if (!expected || expected !== captcha.trim().toUpperCase())
    return NextResponse.json(
      { error: "Security code is incorrect or expired." },
      { status: 400 },
    );
  if (!process.env.SMTP_HOST || !process.env.CONTACT_TO)
    return NextResponse.json(
      { error: "Contact transport is not configured yet." },
      { status: 503 },
    );
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `NurByte website // ${name}`,
    text: `From: ${name} <${email}>

${message}`,
  });
  return NextResponse.json({ ok: true });
}
