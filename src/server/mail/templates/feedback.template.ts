import type { FeedbackPayload } from "@/server/feedback/feedback.types";
import { escapeHtml, mailLayout } from "./layout.template";

const row = (label: string, value: string) =>
  `<tr><td style="padding:10px 14px;color:#6f909e;border-bottom:1px dashed #244b5d">${escapeHtml(label)}</td><td style="padding:10px 14px;color:#d5e3dc;border-bottom:1px dashed #244b5d">${escapeHtml(value || "—")}</td></tr>`;
const block = (title: string, value: string) =>
  value
    ? `<div style="margin-top:16px"><div style="color:#ffd21a;font-size:11px;margin-bottom:8px">${escapeHtml(title)}</div><div style="background:#030c12;border-left:4px solid #ffd21a;padding:15px;color:#d5e3dc;font-family:Arial,sans-serif;line-height:1.65">${escapeHtml(value).replace(/\n/g, "<br>")}</div></div>`
    : "";

export const feedbackOwnerMail = (d: FeedbackPayload, reportId: string) => {
  const diagnostics = d.diagnostics
    ? `${d.diagnostics.platform} / ${d.diagnostics.arch} / ${d.diagnostics.osVersion}`
    : "Not included";
  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #244b5d;background:#041019">${row("REPORT ID", reportId)}${row("PRODUCT", `Hosts Editor ${d.productVersion}`)}${row("TYPE", d.kind === "bug" ? "BUG REPORT" : "FEATURE REQUEST")}${row("EMAIL", d.email)}${row("SUMMARY", d.summary)}${row("DIAGNOSTICS", diagnostics)}</table>${block(d.kind === "bug" ? "WHAT HAPPENED" : "SUGGESTION", d.description)}${block(d.kind === "bug" ? "EXPECTED" : "WHY IT HELPS", d.expected ?? "")}${block("STEPS TO REPRODUCE", d.reproductionSteps ?? "")}`;
  return {
    subject: `[Hosts Editor] ${d.kind === "bug" ? "Bug" : "Feature"} · ${reportId} · ${d.summary}`,
    text: `Report ${reportId}\n${d.email}\n${d.summary}\n\n${d.description}`,
    html: mailLayout({
      status: "NEW FEEDBACK RECEIVED",
      statusColor: "#69df91",
      title: "HOSTS EDITOR FEEDBACK",
      lead: `${reportId} · ${d.summary}`,
      content,
      terminalPath: "hosts-editor/feedback",
    }),
  };
};

export const feedbackConfirmationMail = (
  d: FeedbackPayload,
  reportId: string,
) => {
  const content = `<div style="border:1px solid #244b5d;background:#041019;padding:20px"><div style="color:#69df91;font-size:12px;margin-bottom:14px">✓ REPORT RECEIVED</div><div style="font-family:Arial,sans-serif;color:#d5e3dc;line-height:1.7">Thanks for helping improve Hosts Editor. Your ${d.kind === "bug" ? "bug report" : "feature request"} has reached NurByte Software Lab.</div></div>${block("REPORT ID", reportId)}${block("YOUR SUMMARY", d.summary)}<div style="margin-top:18px;color:#8ba7b3;font-family:Arial,sans-serif;font-size:13px;line-height:1.6">You can reply to this email if you want to add more information. Hosts contents, hostnames, IP addresses, backups and personal files were not attached automatically.</div>`;
  return {
    subject: `✓ Hosts Editor feedback received · ${reportId}`,
    text: `Thanks for helping improve Hosts Editor.\nReport ID: ${reportId}\n\n${d.summary}\n\nYou can reply to this email to add more information.`,
    html: mailLayout({
      status: "REPORT DELIVERED",
      statusColor: "#69df91",
      title: "FEEDBACK RECEIVED",
      lead: `Your report ${reportId} is safely in the queue.`,
      content,
      terminalPath: "hosts-editor/feedback",
    }),
  };
};
