/**
 * Prints website enquiries from the database.
 *
 *   bun run leads            # the 20 most recent
 *   bun run leads -- --all   # every lead
 *   bun run leads -- --new   # only leads nobody has actioned yet
 *
 * Useful on its own, and the fallback whenever notification emails are not
 * configured or a send failed (those rows show as "not emailed").
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const args = process.argv.slice(2);
const showAll = args.includes("--all");
const onlyNew = args.includes("--new");

const leads = await db.lead.findMany({
  where: onlyNew ? { status: "new" } : undefined,
  orderBy: { createdAt: "desc" },
  take: showAll ? undefined : 20,
});

if (leads.length === 0) {
  console.log("No enquiries yet.");
} else {
  for (const lead of leads) {
    const when = lead.createdAt.toLocaleString("en-ZA");
    console.log("─".repeat(64));
    console.log(`${when}  ·  ${lead.source}  ·  ${lead.status}`);
    console.log(`${lead.name}  ${lead.phone}${lead.email ? "  " + lead.email : ""}`);
    if (lead.subject) console.log(`Subject: ${lead.subject}`);
    if (lead.service) console.log(`Service: ${lead.service} (${lead.propertyType})`);
    if (lead.location) console.log(`Location: ${lead.location}`);
    if (lead.preferredDate) console.log(`Preferred date: ${lead.preferredDate}`);
    if (lead.message) console.log(`Message: ${lead.message}`);
    if (!lead.notified) console.log("⚠️  not emailed — follow this one up manually");
    console.log(`id: ${lead.id}`);
  }
  console.log("─".repeat(64));
  console.log(`${leads.length} lead(s)${showAll ? "" : " (most recent 20)"}`);
}

await db.$disconnect();
