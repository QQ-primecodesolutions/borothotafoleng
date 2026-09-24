# Borotho Tafoleng Cleaning & Maintenance

Marketing website for **Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd** — a youth-owned, CIPC-registered cleaning company serving QwaQwa / Phuthaditjhaba in the Free State, South Africa.

The site is a single animated landing page covering the company's story, services, gallery, testimonials, FAQs and contact/quote forms.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Components | shadcn/ui (new-york style) + Radix UI primitives |
| Icons | lucide-react |
| Animation | Framer Motion |
| Forms | react-hook-form + Zod |
| Runtime / package manager | Bun |
| Database | Prisma ORM + Prisma Postgres |

## Getting started

Requires [Bun](https://bun.sh) 1.3+.

```bash
bun install
bun run dev
```

The site runs at http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bun run leads` | Print website enquiries from the database (`-- --all`, `-- --new`) |
| `bunx tsc --noEmit` | Type-check (the build does this too) |

Prisma helpers: `db:migrate` creates and applies a migration after a schema edit, `db:deploy` applies existing migrations (this is what the build runs), `db:generate` regenerates the client, `db:reset` drops and rebuilds the database.

`bun run build` runs `prisma generate && prisma migrate deploy` first, so **the build needs a reachable `DATABASE_URL`** — it will fail rather than deploy a site whose forms can't save.

## Project structure

```
src/
  app/
    page.tsx          # composes the sections — no markup of its own
    layout.tsx        # fonts, SEO metadata, Schema.org LocalBusiness JSON-LD
    icon.svg          # favicon (Next generates the <link> tags from this)
    globals.css       # Tailwind v4 theme tokens + brand palette
    privacy/          # POPIA privacy policy
    api/quote/        # POST endpoint for the contact & quote forms
  components/
    sections/         # one file per page section, in scroll order
      hero-section.tsx
      about-section.tsx
      services-section.tsx
      why-choose-us-section.tsx
      community-impact-section.tsx
      credentials-section.tsx
      contact-section.tsx
    …                 # reusable pieces (navbar, footer, cards, timeline…)
    ui/               # generated shadcn/ui primitives
  hooks/              # use-mobile, use-toast
  lib/
    constants.ts      # ALL site content lives here
    enquiry.ts        # shared Zod schemas for both forms + the API route
    notify.ts         # enquiry notification email (Resend)
    rate-limit.ts     # in-memory rate limiting for the enquiry endpoint
    quote-modal.ts    # openQuoteModal() + the event name
    scroll.ts         # scrollToSection() + shared animation config
    utils.ts          # cn() class helper
    db.ts             # Prisma client singleton
scripts/leads.ts      # CLI to read enquiries out of the database
public/images/        # hero, services, gallery, team, about, logo assets
prisma/schema.prisma  # Lead model
```

Three of the ten sections (stats, FAQ, CTA) were already standalone components and stay where they are; the other seven live under `sections/`. Each section reads what it needs from `constants.ts` and takes no props, so adding or reordering a section is an edit to [`page.tsx`](src/app/page.tsx) alone.

### Editing content

Copy and data — services, credentials, FAQs, stats, company timeline, team, phone/email/address — all live in [`src/lib/constants.ts`](src/lib/constants.ts). Edit there rather than in the JSX; `page.tsx` and the components map over those arrays.

Images are referenced by path from the same file and live under `public/images/`.

> ### ⚠️ Before launch
>
> **The contact details are still placeholders.** `phone`, `whatsapp` and `email` in the `COMPANY` object at the top of [`constants.ts`](src/lib/constants.ts) are `+27 00 000 0000` / `270000000000` / `info@borothotafoleng.co.za`. That object is now the only place they appear — the navbar, footer, contact section, WhatsApp button, CTA buttons and the Schema.org business listing all read from it, so one edit updates the site.
>
> **The testimonials and photo gallery were removed.** They contained invented customer quotes attributed to named people, and AI-generated images presented as the company's completed work. Publishing either would be a misrepresentation. A factual "Why You Can Trust Us" section (`CREDENTIALS` in `constants.ts`) stands in their place; restore the originals only with real quotes and real job photos, published with permission.

### Brand theme

Brand colours are Tailwind v4 tokens declared in the `@theme inline` block of [`src/app/globals.css`](src/app/globals.css):

- `brand-blue` `#0E74BC` (plus `-light` / `-dark`)
- `brand-green` `#3FAE49` (plus `-light` / `-dark`)
- `brand-dark` `#1E293B`, `brand-light` `#F8FAFC`, `brand-accent` `#16A34A`

Use them as normal utilities: `bg-brand-blue`, `text-brand-green`, `border-brand-blue-light`. Headings use Poppins (`--font-heading`), body copy uses Inter.

`tailwind.config.ts` is a legacy v3-style file kept for the `tailwindcss-animate` plugin — it is **not** where the brand palette comes from.

### Quote modal

The "Get a Quote" dialog is opened by a global DOM event rather than props, so any button anywhere can trigger it:

```ts
window.dispatchEvent(new CustomEvent('open-quote-modal'));
```

[`src/components/quote-modal.tsx`](src/components/quote-modal.tsx) listens for that event.

### Enquiries

Both the inline contact form and the quote modal validate against the shared schemas in [`src/lib/enquiry.ts`](src/lib/enquiry.ts) and POST to [`src/app/api/quote/route.ts`](src/app/api/quote/route.ts), tagged `source: "contact"` or `source: "quote"`. The route:

1. **Rate limits** by IP — 5 enquiries per 10 minutes ([`rate-limit.ts`](src/lib/rate-limit.ts), in-memory and per-instance)
2. **Validates** with the same Zod schema the browser used
3. **Drops bot submissions** silently via a honeypot field, answering 200 so the bot doesn't adapt
4. **Saves the lead** to Postgres — this is the record of truth
5. **Emails a notification** via Resend, best effort

Step 5 never fails the request. If the email cannot be sent the lead is still saved with `notified: false`, and a warning is logged. Read those with `bun run leads -- --new`.

**To switch notification emails on**, copy `.env.example` to `.env` and fill in `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` (a [Resend](https://resend.com) account plus a verified sending domain). Until then enquiries are stored but nobody is notified.

The sending domain does **not** have to be the company's own. This mail never reaches a customer — it is an internal "you have a new lead" notice — and `replyTo` is set to the enquirer's address, so hitting reply in the inbox writes to them, not to the sender. Any domain verified in the Resend account will do, which is useful while `borothotafoleng.co.za` is still a placeholder.

`QUOTE_NOTIFY_EMAIL` (the recipient) needs no verification at all and can be an ordinary mailbox. Set it explicitly — its default is `COMPANY.email`, which is a placeholder address, so leaving it unset means notifications go nowhere.

### Database

Prisma ORM against **Prisma Postgres**, one `Lead` model in [`prisma/schema.prisma`](prisma/schema.prisma).

Prisma Postgres offers the database under two connection strings, and either works here:

| Form | Looks like | Notes |
| --- | --- | --- |
| Direct (pooled TCP) | `postgres://…@pooled.db.prisma.io:5432/postgres?sslmode=require` | What the project currently uses. An ordinary Postgres DSN — any Postgres tool can read it. |
| Accelerate | `prisma+postgres://accelerate.prisma-data.net/?api_key=…` | Pooled HTTP protocol. Only the Prisma client can speak it, and only with the extension below. |

[`src/lib/db.ts`](src/lib/db.ts) applies `withAccelerate()` from `@prisma/extension-accelerate`, which is **required** for the second form and a verified pass-through for the first. Keeping it means the connection string can be switched without touching code.

The `provider` in the schema is fixed at build time — Prisma cannot switch between SQLite and Postgres per environment, so local development needs a Postgres URL too.

Note that in both forms the credential is embedded in the URL, so the string itself is the secret. It belongs in an environment variable and never in the repo.

#### Getting a connection string

Either route produces the same kind of URL:

**On Vercel** — Project → Storage → Prisma Postgres → Create. The integration writes `DATABASE_URL` into the project's environment variables for you; nothing to copy.

**Standalone** — sign in at [console.prisma.io](https://console.prisma.io), create a project and a database (pick the region closest to South Africa), and copy either connection string it shows into `DATABASE_URL`.

Create a **second, free database for local development** and put its URL in `.env`, so local testing never writes into the live leads table.

#### Changing the schema

```bash
bun run db:migrate       # creates prisma/migrations/<timestamp>_<name>/ and applies it
```

Commit the generated migration folder. `bun run build` runs `prisma migrate deploy`, so whatever you committed is applied to production on the next deploy. `prisma/migrations/0_init/` creates the `Lead` table on a fresh database.

### POPIA

Both forms require an explicit, unticked-by-default consent box before they submit, the consent timestamp is stored on the lead, and [`/privacy`](src/app/privacy/page.tsx) sets out what is collected, why, who sees it, how long it is kept and how to have it deleted. Two gaps still need a person: the Information Officer's details (must be registered with the Information Regulator) and a legal review if the business starts processing more than enquiries.

## Deployment

A standard Next.js build; any Node host works.

```bash
bun run build
bun run start
```

For a self-hosted/Docker deployment you can add `output: "standalone"` back to `next.config.ts` to get a self-contained `.next/standalone` bundle.

The build type-checks (`ignoreBuildErrors` is off), so a green build means the code compiles. The ESLint config still disables most rules, so lint remains a weak signal.

### Vercel

Add both marketplace integrations Vercel offers during setup — neither is really optional here:

| Integration | Sets | Why |
| --- | --- | --- |
| Prisma Postgres | `DATABASE_URL` | Vercel's filesystem is read-only and ephemeral, so there is nowhere for a local database file to live. Without it every enquiry fails. |
| Resend | `RESEND_API_KEY` | Notification emails. Leads still save without it, just silently. |

Then set `QUOTE_NOTIFY_FROM` (and optionally `QUOTE_NOTIFY_EMAIL`) by hand — Resend only sends from a domain you have verified in its dashboard.

The rate limiter in [`rate-limit.ts`](src/lib/rate-limit.ts) counts in process memory, so on serverless each warm instance keeps its own tally and the effective limit is looser than 5 per 10 minutes. Adequate at this traffic level; move it to Redis if it ever has to hold.

## Credits

Built for Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd by PrimeCode Solutions.
