import { randomBytes } from "node:crypto";
import { sendMail } from "@/server/mail/mail.service";
import {
  feedbackConfirmationMail,
  feedbackOwnerMail,
} from "@/server/mail/templates/feedback.template";
import type { FeedbackPayload } from "./feedback.types";

const createReportId = (): string =>
  `HE-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomBytes(3).toString("hex").toUpperCase()}`;

export const sendFeedback = async (payload: FeedbackPayload) => {
  const owner = process.env.MAIL_TO_EMAIL?.trim();
  if (!owner) throw new Error("MAIL_TO_EMAIL is not configured.");
  const reportId = createReportId();
  const [ownerResult, confirmationResult] = await Promise.all([
    sendMail({
      to: owner,
      replyTo: payload.email,
      ...feedbackOwnerMail(payload, reportId),
    }),
    sendMail({
      to: payload.email,
      replyTo: owner,
      ...feedbackConfirmationMail(payload, reportId),
    }),
  ]);
  return {
    reportId,
    ownerMessageId: ownerResult.messageId,
    confirmationMessageId: confirmationResult.messageId,
  };
};
