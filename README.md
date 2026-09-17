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
| ORM (scaffolding, unused) | Prisma + SQLite |

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

Prisma helpers: `db:push` applies `prisma/schema.prisma` to the SQLite file, `db:generate` regenerates the client, `db:migrate` / `db:reset` for migrations.

## Project structure

```
src/
  app/
    page.tsx          # the entire single-page site (all sections)
    layout.tsx        # fonts, SEO metadata, Schema.org LocalBusiness JSON-LD
    icon.svg          # favicon (Next generates the <link> tags from this)
    globals.css       # Tailwind v4 theme tokens + brand palette
    privacy/          # POPIA privacy policy
    api/quote/        # POST endpoint for the contact & quote forms
  components/         # hand-written site components (navbar, footer, cards…)
  components/ui/      # generated shadcn/ui primitives
  hooks/              # use-mobile, use-toast
  lib/
    constants.ts      # ALL site content lives here
    enquiry.ts        # shared Zod schemas for both forms + the API route
    notify.ts         # enquiry notification email (Resend)
    rate-limit.ts     # in-memory rate limiting for the enquiry endpoint
    utils.ts          # cn() class helper
    db.ts             # Prisma client singleton
scripts/leads.ts      # CLI to read enquiries out of the database
public/images/        # hero, services, gallery, team, about, logo assets
prisma/schema.prisma  # Lead model
```

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
4. **Saves the lead** to SQLite — this is the record of truth
5. **Emails a notification** via Resend, best effort

Step 5 never fails the request. If the email cannot be sent the lead is still saved with `notified: false`, and a warning is logged. Read those with `bun run leads -- --new`.

**To switch notification emails on**, copy `.env.example` to `.env` and fill in `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` (a [Resend](https://resend.com) account plus a verified sending domain). Until then enquiries are stored but nobody is notified.

### Database

Prisma + SQLite, one `Lead` model in [`prisma/schema.prisma`](prisma/schema.prisma). `DATABASE_URL` in `.env` points at `file:./db/custom.db`. After changing the schema run `bun run db:push`.

Note that SQLite is a file on the server's disk: on a platform with an ephemeral filesystem the leads disappear on redeploy. That's fine for a VPS or a persistent volume, but if you deploy to Vercel or similar, move `DATABASE_URL` to a hosted Postgres (Neon, Supabase) and change the `provider` line in the schema.

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

Remember to set `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` in the deployment environment, and to point `DATABASE_URL` at storage that survives a redeploy.

## Credits

Built for Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd by PrimeCode Solutions.
