import { Resend } from "resend";

import { COMPANY } from "@/lib/constants";
import type { EnquiryPayload } from "@/lib/enquiry";

/**
 * Sends the "new enquiry" notification email.
 *
 * Returns whether the email actually went out. The caller has already saved the
 * lead, so every failure path here logs loudly and returns false rather than
 * throwing — a missing API key must never cost the business a customer.
 *
 * Setup:
 *   1. Create an account at https://resend.com (free tier: 3,000 emails/month)
 *   2. Verify the sending domain (borothotafoleng.co.za) under Domains
 *   3. Put the values in .env — see .env.example
 */

const apiKey = process.env.RESEND_API_KEY;
const notifyTo = process.env.QUOTE_NOTIFY_EMAIL || COMPANY.email;
const notifyFrom = process.env.QUOTE_NOTIFY_FROM;

const resend = apiKey ? new Resend(apiKey) : null;

function formatEnquiry(enquiry: EnquiryPayload, leadId: string): string {
  const rows: Array<[string, string | undefined]> = [
    ["Name", enquiry.name],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email || "— not given —"],
    ...(enquiry.source === "contact"
      ? ([["Subject", enquiry.subject]] as Array<[string, string | undefined]>)
      : ([
          ["Service", enquiry.service],
          ["Property type", enquiry.propertyType],
          ["Location", enquiry.location || "— not given —"],
          ["Preferred date", enquiry.preferredDate || "— not given —"],
        ] as Array<[string, string | undefined]>)),
    ["Message", enquiry.message || "— none —"],
  ];

  const lines = rows.map(([label, value]) => `${label}: ${value ?? ""}`).join("\n");

  return [
    `New ${enquiry.source === "quote" ? "quote request" : "enquiry"} from the website.`,
    "",
    lines,
    "",
    `Reference: ${leadId}`,
    "The customer consented to being contacted about this enquiry.",
  ].join("\n");
}

export async function sendEnquiryNotification(
  enquiry: EnquiryPayload,
  leadId: string
): Promise<boolean> {
  if (!resend || !notifyFrom) {
    console.warn(
      `[notify] RESEND_API_KEY / QUOTE_NOTIFY_FROM not configured — lead ${leadId} was saved but nobody was emailed. See .env.example.`
    );
    return false;
  }

  const subject =
    enquiry.source === "quote"
      ? `Quote request: ${enquiry.service} — ${enquiry.name}`
      : `Website enquiry: ${enquiry.subject} — ${enquiry.name}`;

  try {
    const { error } = await resend.emails.send({
      from: notifyFrom,
      to: notifyTo,
      // So hitting reply in the inbox writes back to the customer.
      replyTo: enquiry.email || undefined,
      subject,
      text: formatEnquiry(enquiry, leadId),
    });

    if (error) {
      console.error(`[notify] Resend rejected lead ${leadId}:`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[notify] could not send notification for lead ${leadId}:`, error);
    return false;
  }
}

/** True when the notification path is fully configured. */
export const notificationsConfigured = Boolean(resend && notifyFrom);

export { notifyTo as notificationRecipient };
