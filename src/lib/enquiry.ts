import { z } from "zod";

import { SERVICES } from "@/lib/constants";

/**
 * One schema, used by the contact form, the quote modal and the API route that
 * receives both. Client and server validate identically by construction — a
 * field can't drift out of sync the way two hand-maintained copies would.
 */

/** Service options offered in the quote modal, derived from the site content. */
export const SERVICE_OPTIONS = [
  ...SERVICES.map((service) => service.title),
  "Move In/Move Out Cleaning",
] as const;

export const PROPERTY_TYPES = [
  "School",
  "Office",
  "House",
  "Apartment",
  "Church",
  "Shop",
  "Commercial Building",
  "Other",
] as const;

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Service Request",
  "Quotation",
  "Feedback",
  "Partnership",
  "Complaint",
  "Other",
] as const;

/** South African numbers: 0XX XXX XXXX, +27 XX XXX XXXX, or the same with spaces, dashes or brackets. */
const phoneField = z
  .string()
  .trim()
  .min(10, "Please enter a valid phone number")
  .max(20, "That phone number looks too long")
  .regex(/^[0-9+()\s-]+$/, "Phone numbers can only contain digits, spaces, + ( ) and -");

const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .email("Please enter a valid email")
  .or(z.literal(""))
  .optional();

/**
 * POPIA s11: processing personal information requires informed consent, and we
 * have to be able to show it was given. The box is unticked by default and the
 * submission is rejected without it.
 */
const consentField = z.literal(true, {
  message: "Please agree to us contacting you about this enquiry",
});

/**
 * Anti-spam honeypot. A real person never sees this field, so anything in it
 * came from a bot filling every input it found.
 *
 * The schema deliberately *accepts* any value: rejecting it here would answer
 * with a validation error naming the field, which tells the bot exactly which
 * input to leave alone next time. The API route checks it after validation and
 * answers 200 without saving, so the bot books a success and moves on.
 */
const honeypotField = z.string().max(200).optional();

const baseFields = {
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: phoneField,
  email: optionalEmail,
  message: z.string().trim().max(2000).optional(),
  consent: consentField,
  company: honeypotField,
};

export const contactSchema = z.object({
  ...baseFields,
  subject: z.enum(CONTACT_SUBJECTS, { message: "Please select a subject" }),
});

export const quoteSchema = z.object({
  ...baseFields,
  service: z.enum(SERVICE_OPTIONS, { message: "Please select a service" }),
  propertyType: z.enum(PROPERTY_TYPES, { message: "Please select a property type" }),
  location: z.string().trim().max(120).optional(),
  preferredDate: z.string().trim().max(40).optional(),
});

/** What the API accepts: either form, tagged by `source`. */
export const enquirySchema = z.discriminatedUnion("source", [
  contactSchema.extend({ source: z.literal("contact") }),
  quoteSchema.extend({ source: z.literal("quote") }),
]);

export type ContactFormValues = z.infer<typeof contactSchema>;
export type QuoteFormValues = z.infer<typeof quoteSchema>;
export type EnquiryPayload = z.infer<typeof enquirySchema>;

/** Field name of the honeypot, shared so the markup and the checks agree. */
export const HONEYPOT_FIELD = "company" as const;
