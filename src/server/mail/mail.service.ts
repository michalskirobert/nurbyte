import nodemailer from "nodemailer";

export type MailMessage = {
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly replyTo?: string;
};

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
};

export const sendMail = async (message: MailMessage) => {
  const host = requireEnv("SMTP_HOST");
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const fromEmail = requireEnv("MAIL_FROM_EMAIL");
  const port = Number(process.env.SMTP_PORT ?? 465);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });

  const from = `"${process.env.MAIL_FROM_NAME ?? "NurByte Software Lab"}" <${fromEmail}>`;
  return transporter.sendMail({ from, ...message });
};
