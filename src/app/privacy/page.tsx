import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { COMPANY, PHONE_HREF, EMAIL_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} collects, uses and protects the personal information you share through this website, in line with South Africa's POPI Act.`,
  robots: { index: true, follow: true },
};

/**
 * POPIA (Protection of Personal Information Act 4 of 2013) requires an operator
 * to tell people what it collects, why, on what basis, how long it keeps it and
 * how to exercise their rights. This page is the site's notice for the enquiry
 * forms — the only place the site collects personal information.
 *
 * ⚠️  Two things still need a human before launch:
 *   1. The Information Officer's name and contact details (the Act requires a
 *      designated person — by default the head of the business — who must be
 *      registered with the Information Regulator).
 *   2. A legal review if the business starts processing more than enquiries
 *      (staff records, client contracts and CCTV all bring extra obligations).
 */
export default function PrivacyPolicyPage() {
  const lastUpdated = "17 September 2026";

  return (
    <main className="min-h-screen bg-brand-light py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the website
        </Link>

        <article className="mt-8 rounded-2xl bg-white p-6 shadow-lg sm:p-10">
          <h1 className="font-heading text-3xl font-extrabold text-brand-dark sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-sm mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <p>
                This policy explains how {COMPANY.name} (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;) handles the personal information you give us
                through this website. We follow the Protection of Personal
                Information Act 4 of 2013 (POPIA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                What we collect
              </h2>
              <p>
                We only collect what you type into our enquiry and quote forms:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>Your name</li>
                <li>Your phone number</li>
                <li>Your email address, if you give one</li>
                <li>
                  Details about the cleaning you need — the service, property
                  type, location, preferred date and any message you write
                </li>
              </ul>
              <p>
                We do not run advertising trackers or analytics on this site, and
                we do not buy or receive your details from anyone else.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                Why we collect it, and on what basis
              </h2>
              <p>
                We use your details for one purpose: to respond to your enquiry
                and, if you go ahead, to arrange the cleaning work. We rely on
                your consent — the tick box on the form — and on the steps
                needed to conclude a contract with you.
              </p>
              <p>
                We will not use your details for marketing unless you
                separately ask us to, and we never sell them.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                Who can see it
              </h2>
              <p>
                Your enquiry is stored in our own database and emailed to our
                team inbox. The people who see it are the staff members who
                handle bookings. We use an email delivery provider to send that
                notification; it processes the message on our behalf and is not
                permitted to use your details for anything else.
              </p>
              <p>
                We will only hand your information to anyone else if the law
                requires it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                How long we keep it
              </h2>
              <p>
                If your enquiry does not become a booking, we delete it within
                12 months. If you become a client, we keep the records for as
                long as we work together and then for five years afterwards,
                which is the period South African tax and company law requires.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                Your rights
              </h2>
              <p>Under POPIA you may, at any time and free of charge:</p>
              <ul className="ml-5 list-disc space-y-1">
                <li>Ask what personal information we hold about you</li>
                <li>Ask us to correct anything that is wrong</li>
                <li>Ask us to delete your details</li>
                <li>Withdraw your consent to us contacting you</li>
                <li>
                  Complain to the Information Regulator if you believe we have
                  mishandled your information
                </li>
              </ul>
              <p>
                To exercise any of these, contact us on{" "}
                <a
                  href={PHONE_HREF}
                  className="text-brand-blue underline underline-offset-2"
                >
                  {COMPANY.phone}
                </a>{" "}
                or{" "}
                <a
                  href={EMAIL_HREF}
                  className="text-brand-blue underline underline-offset-2"
                >
                  {COMPANY.email}
                </a>
                . We will respond within a reasonable time.
              </p>
              <p>
                The Information Regulator can be reached at{" "}
                <a
                  href="https://inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue underline underline-offset-2"
                >
                  inforegulator.org.za
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                Keeping it safe
              </h2>
              <p>
                We take reasonable steps to protect your information against
                loss and unauthorised access. No website can promise perfect
                security, but if a breach ever affects your details we will tell
                you and the Information Regulator, as POPIA requires.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-brand-dark">
                Contact us
              </h2>
              <p>
                {COMPANY.name}
                <br />
                {COMPANY.address}
                <br />
                {COMPANY.phone} · {COMPANY.email}
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
