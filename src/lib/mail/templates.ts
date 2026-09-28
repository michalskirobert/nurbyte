export type ContactPayload = {
  name: string;
  email: string;
  category: "project" | "collaboration" | "hello";
  message: string;
};
const esc = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c]!,
  );
const topic = (v: ContactPayload["category"]) =>
  ({
    project: "PROJECT INQUIRY",
    collaboration: "COLLABORATION",
    hello: "HELLO",
  })[v];
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev";
export const mailBrandAttachment = {
  filename: "nurbyte-mark.png",
  path: `${process.cwd()}/public/assets/brand/nurbyte-mark.png`,
  cid: "nurbyte-brand-mark",
};

const layout = (
  status: string,
  statusColor: string,
  title: string,
  lead: string,
  content: string,
) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#ffffff;color:#edf5f1;font-family:'Courier New',monospace">
<div style="display:none;max-height:0;overflow:hidden">${lead}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;background:#06131d;border:1px solid #17445e;box-shadow:0 0 0 4px #020b12">
<tr><td style="padding:0">
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#071824;border-bottom:1px solid #17445e">
  <tr>
   <td style="padding:13px 20px">
    <table role="presentation" cellpadding="0" cellspacing="0">
     <tr>
      <td style="padding-right:11px;vertical-align:middle">
       <img src="cid:nurbyte-brand-mark" width="34" height="34" alt="NurByte" style="display:block;width:34px;height:34px;border:0">
      </td>
      <td style="vertical-align:middle;color:#fff">
       <div style="font-size:16px;font-weight:700;letter-spacing:1px;line-height:1.05">NUR<span style="color:#ffd21a">BYTE</span></div>
       <div style="font-size:8px;color:#8ba7b3;margin-top:5px;letter-spacing:2px;line-height:1.1">SOFTWARE LAB</div>
      </td>
     </tr>
    </table>
   </td>
   <td align="right" style="padding:16px 20px;color:${statusColor};font-size:11px">● ${status}</td>
  </tr>
 </table>
</td></tr>
<tr><td style="padding:34px 28px 10px">
 <div style="color:#ffd21a;font-size:10px;letter-spacing:2px">// CODE · CREATE · EXPLORE</div>
 <h1 style="font-family:'Courier New',monospace;font-size:30px;line-height:1.15;margin:15px 0 10px;color:#fff;text-transform:uppercase">${title}</h1>
 <p style="margin:0;color:#9db5aa;font-size:15px;line-height:1.65">${lead}</p>
</td></tr>
<tr><td style="padding:20px 28px 30px">${content}</td></tr>
<tr><td style="padding:0 28px 30px">
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#01090e;border:1px solid #0d789f">
  <tr><td style="padding:10px 14px;border-bottom:1px solid #17455e;color:#7fa6b5;font-size:12px"><span style="color:#ff4055">●</span>&nbsp; <span style="color:#ffd31a">●</span>&nbsp; <span style="color:#1fe78e">●</span>&nbsp;&nbsp; nurbyte@dev:~/contact</td></tr>
  <tr><td style="padding:16px 14px;color:#8ed8b0;font-size:14px;line-height:1.7"><span style="color:#ffd21a">$</span> contact --status<br><span style="color:${statusColor}">✓ ${status}</span><br><span style="color:#ffd21a">$</span> _</td></tr>
 </table>
</td></tr>
<tr><td style="padding:17px 28px;border-top:1px solid #173342;color:#6e8994;font-size:11px">
 NurByte Software Lab &nbsp;•&nbsp; <a href="${site}" style="color:#ffd21a;text-decoration:none">nurbyte.dev</a>
</td></tr>
</table></td></tr></table></body></html>`;

export function ownerMail(d: ContactPayload) {
  const name = esc(d.name),
    email = esc(d.email),
    message = esc(d.message).replace(/\n/g, "<br>");
  const panel = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #244b5d;background:#041019">
 <tr><td style="padding:12px 15px;color:#6f909e;font-size:11px;border-bottom:1px dashed #244b5d">PLAYER</td><td style="padding:12px 15px;border-bottom:1px dashed #244b5d">${name}</td></tr>
 <tr><td style="padding:12px 15px;color:#6f909e;font-size:11px;border-bottom:1px dashed #244b5d">EMAIL</td><td style="padding:12px 15px;border-bottom:1px dashed #244b5d"><a href="mailto:${email}" style="color:#ffd21a">${email}</a></td></tr>
 <tr><td style="padding:12px 15px;color:#6f909e;font-size:11px">MISSION</td><td style="padding:12px 15px;color:#ffd21a">${topic(d.category)}</td></tr>
 </table>
 <div style="margin-top:18px;border-left:4px solid #ffd21a;background:#030c12;padding:18px;color:#d5e3dc;font-family:Arial,sans-serif;font-size:15px;line-height:1.7">${message}</div>
 <div style="margin-top:20px"><a href="mailto:${email}" style="display:inline-block;background:#ffd21a;color:#071018;text-decoration:none;padding:13px 18px;border:2px solid #ffe260;font-weight:700;font-size:12px">↳ REPLY TO MESSAGE</a></div>`;
  return {
    subject: `[NurByte] ${topic(d.category)} — ${d.name}`,
    text: `New NurByte contact\nName: ${d.name}\nEmail: ${d.email}\nTopic: ${topic(d.category)}\n\n${d.message}`,
    html: layout(
      "NEW MESSAGE RECEIVED",
      "#69df91",
      "NEW CONTACT MESSAGE",
      `A new transmission from ${name} has arrived.`,
      panel,
    ),
  };
}
export function confirmationMail(d: ContactPayload) {
  const name = esc(d.name),
    message = esc(d.message).replace(/\n/g, "<br>");
  const panel = `<div style="border:1px solid #244b5d;background:#041019;padding:20px">
 <div style="color:#69df91;font-size:12px;margin-bottom:14px">✓ TRANSMISSION SUCCESSFUL</div>
 <div style="font-family:Arial,sans-serif;color:#d5e3dc;line-height:1.7">Hi ${name},<br><br>Your message reached NurByte Software Lab successfully. I’ll get back to you as soon as possible.</div>
 </div>
 <div style="margin-top:18px;padding:17px;background:#030c12;border-left:4px solid #ffd21a">
  <div style="color:#ffd21a;font-size:11px;margin-bottom:10px">${topic(d.category)}</div>
  <div style="font-family:Arial,sans-serif;color:#aebfb7;line-height:1.65">${message}</div>
 </div>`;
  return {
    subject: "✓ Message received — NurByte Software Lab",
    text: `Hi ${d.name},\n\nYour message reached NurByte Software Lab successfully. I'll get back to you as soon as possible.\n\n${d.message}`,
    html: layout(
      "MESSAGE DELIVERED",
      "#69df91",
      "MESSAGE RECEIVED",
      `Thanks, ${name}. Your transmission is safely in the queue.`,
      panel,
    ),
  };
}
