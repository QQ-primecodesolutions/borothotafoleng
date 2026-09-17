import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { COMPANY } from "@/lib/constants";
import { enquirySchema, type EnquiryPayload } from "@/lib/enquiry";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEnquiryNotification } from "@/lib/notify";

/** Prisma needs the Node runtime; the edge runtime has no SQLite driver. */
export const runtime = "nodejs";

function clientIp(request: Request): string {
  // Behind a proxy the first entry of X-Forwarded-For is the visitor.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  // ── 1. Rate limit, before any parsing work ──────────────────────────────
  const { allowed, retryAfterSeconds } = checkRateLimit(clientIp(request));
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  // ── 2. Parse and validate ───────────────────────────────────────────────
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const enquiry: EnquiryPayload = parsed.data;

  // ── 3. Honeypot ─────────────────────────────────────────────────────────
  // Anything in this field means a bot filled every input on the page. Answer
  // 200 so the bot records a success and doesn't retry with a new strategy.
  if (enquiry.company) {
    console.info("[quote] honeypot triggered, enquiry dropped");
    return NextResponse.json({ message: "Enquiry received" }, { status: 200 });
  }

  // ── 4. Persist first — the row is the record of truth ───────────────────
  let leadId: string;
  try {
    const lead = await db.lead.create({
      data: {
        source: enquiry.source,
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email || null,
        subject: enquiry.source === "contact" ? enquiry.subject : null,
        service: enquiry.source === "quote" ? enquiry.service : null,
        propertyType: enquiry.source === "quote" ? enquiry.propertyType : null,
        location: enquiry.source === "quote" ? enquiry.location || null : null,
        preferredDate: enquiry.source === "quote" ? enquiry.preferredDate || null : null,
        message: enquiry.message || null,
        consentedAt: new Date(),
      },
    });
    leadId = lead.id;
  } catch (error) {
    console.error("[quote] could not save enquiry:", error);
    return NextResponse.json(
      {
        error: `We couldn't save your enquiry. Please call us on ${COMPANY.phone} and we'll help you directly.`,
      },
      { status: 500 }
    );
  }

  // ── 5. Notify — best effort, never fails the request ────────────────────
  // The lead is already saved, so a mail outage costs a notification, not a
  // customer. `notified: false` marks the rows a human still has to read.
  const notified = await sendEnquiryNotification(enquiry, leadId);
  if (notified) {
    await db.lead
      .update({ where: { id: leadId }, data: { notified: true } })
      .catch((error) => console.error("[quote] could not flag lead as notified:", error));
  }

  return NextResponse.json(
    { message: "Enquiry received successfully", id: leadId },
    { status: 200 }
  );
}
