import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  confirmationMail,
  mailBrandAttachment,
  ownerMail,
  type ContactPayload,
} from "@/lib/mail/templates";

export const runtime = "nodejs";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const categories = new Set(["project", "collaboration", "hello"]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const name = body.name?.trim() ?? "",
      email = body.email?.trim() ?? "",
      message = body.message?.trim() ?? "",
      category = body.category ?? "";
    if (name.length < 2 || name.length > 80)
      return NextResponse.json(
        { ok: false, error: "Please enter a valid name." },
        { status: 400 },
      );
    if (!emailPattern.test(email) || email.length > 160)
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    if (!categories.has(category))
      return NextResponse.json(
        { ok: false, error: "Please select a valid topic." },
        { status: 400 },
      );
    if (message.length < 10 || message.length > 250)
      return NextResponse.json(
        { ok: false, error: "Message must contain 10–250 characters." },
        { status: 400 },
      );

    const host = process.env.SMTP_HOST,
      user = process.env.SMTP_USER,
      pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT ?? 465);
    if (
      !host ||
      !user ||
      !pass ||
      !process.env.MAIL_TO_EMAIL ||
      !process.env.MAIL_FROM_EMAIL
    )
      return NextResponse.json(
        { ok: false, error: "Mail service is not configured." },
        { status: 503 },
      );

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user, pass },
    });
    const payload = {
      name,
      email,
      message,
      category: category as ContactPayload["category"],
    };
    const from = `"${process.env.MAIL_FROM_NAME ?? "NurByte Software Lab"}" <${process.env.MAIL_FROM_EMAIL}>`;

    await transporter.verify();
    const [ownerResult, confirmationResult] = await Promise.all([
      transporter.sendMail({
        from,
        to: process.env.MAIL_TO_EMAIL,
        replyTo: email,
        attachments: [mailBrandAttachment],
        ...ownerMail(payload),
      }),
      transporter.sendMail({
        from,
        to: email,
        replyTo: process.env.MAIL_TO_EMAIL,
        attachments: [mailBrandAttachment],
        ...confirmationMail(payload),
      }),
    ]);

    return NextResponse.json({
      ok: true,
      ownerMessageId: ownerResult.messageId,
      confirmationMessageId: confirmationResult.messageId,
    });
  } catch (error) {
    console.error("Contact mail error", error);
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
