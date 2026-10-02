const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev";
const brandMarkUrl = `${site}/assets/brand/nurbyte-mark.png`;

export const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );

export const mailLayout = ({
  status,
  statusColor,
  title,
  lead,
  content,
  terminalPath = "feedback",
}: {
  readonly status: string;
  readonly statusColor: string;
  readonly title: string;
  readonly lead: string;
  readonly content: string;
  readonly terminalPath?: string;
}): string => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background:#fff;color:#edf5f1;font-family:'Courier New',monospace">
<div style="display:none;max-height:0;overflow:hidden">${escapeHtml(lead)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;background:#06131d;border:1px solid #17445e;box-shadow:0 0 0 4px #020b12">
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#071824;border-bottom:1px solid #17445e"><tr>
<td style="padding:13px 20px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding-right:11px"><img src="${brandMarkUrl}" width="34" height="34" alt="NurByte" style="display:block;border:0"></td><td><div style="font-size:16px;font-weight:700;letter-spacing:1px;color:#fff">NUR<span style="color:#ffd21a">BYTE</span></div><div style="font-size:8px;color:#8ba7b3;margin-top:5px;letter-spacing:2px">SOFTWARE LAB</div></td></tr></table></td>
<td align="right" style="padding:16px 20px;color:${statusColor};font-size:11px">● ${escapeHtml(status)}</td></tr></table></td></tr>
<tr><td style="padding:34px 28px 10px"><div style="color:#ffd21a;font-size:10px;letter-spacing:2px">// CODE · CREATE · EXPLORE</div><h1 style="font-size:30px;line-height:1.15;margin:15px 0 10px;color:#fff;text-transform:uppercase">${escapeHtml(title)}</h1><p style="margin:0;color:#9db5aa;font-size:15px;line-height:1.65">${escapeHtml(lead)}</p></td></tr>
<tr><td style="padding:20px 28px 30px">${content}</td></tr>
<tr><td style="padding:0 28px 30px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#01090e;border:1px solid #0d789f"><tr><td style="padding:10px 14px;border-bottom:1px solid #17455e;color:#7fa6b5;font-size:12px"><span style="color:#ff4055">●</span>&nbsp; <span style="color:#ffd31a">●</span>&nbsp; <span style="color:#1fe78e">●</span>&nbsp;&nbsp; nurbyte@dev:~/${escapeHtml(terminalPath)}</td></tr><tr><td style="padding:16px 14px;color:#8ed8b0;font-size:14px;line-height:1.7"><span style="color:#ffd21a">$</span> status<br><span style="color:${statusColor}">✓ ${escapeHtml(status)}</span><br><span style="color:#ffd21a">$</span> _</td></tr></table></td></tr>
<tr><td style="padding:17px 28px;border-top:1px solid #173342;color:#6e8994;font-size:11px">NurByte Software Lab &nbsp;•&nbsp; <a href="${site}" style="color:#ffd21a;text-decoration:none">nurbyte.dev</a></td></tr>
</table></td></tr></table></body></html>`;
