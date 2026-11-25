import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { contactConfigured } from "@/lib/assistant-config";

export const runtime = "nodejs";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 3, 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection. Try again later or email directly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The message could not be read." }, { status: 400 });
  }

  // Spam protection: a hidden field people never fill, and a minimum time on the page.
  const startedAt = Number(body.startedAt);
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }); // Silently accept so bots learn nothing.
  }
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return NextResponse.json({ ok: false, error: "That was quick. Wait a moment and send again." }, { status: 400 });
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  if (!contactConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: `<p><strong>${escape(data.name)}</strong> &lt;${escape(data.email)}&gt;</p><p>${escape(data.message).replace(/\n/g, "<br>")}</p>`,
      text: `${data.name} <${data.email}>\n\n${data.message}`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.json({ ok: false, error: "The message didn't go through. Email me directly instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
