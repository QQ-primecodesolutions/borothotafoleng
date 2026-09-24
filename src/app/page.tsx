'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { BackToTop } from '@/components/back-to-top';
import { QuoteModal } from '@/components/quote-modal';
import { ClientOnly } from '@/components/client-only';

import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/stats-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { CommunityImpactSection } from '@/components/sections/community-impact-section';
import { CredentialsSection } from '@/components/sections/credentials-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { ContactSection } from '@/components/sections/contact-section';

import { STATS, FAQS } from '@/lib/constants';

/**
 * The single-page site. Each section lives in its own file under
 * components/sections/ — this composes them in the order the visitor scrolls.
 *
 * Anchor targets live on the sections themselves: #home (hero), #about,
 * #services and #contact, matching NAV_ITEMS in constants.ts.
 */
export default function Home() {
  return (
    <ClientOnly>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />

        <main className="flex-1">
          <HeroSection />
          <StatsSection stats={STATS} />
          <AboutSection />
          <ServicesSection />
          <WhyChooseUsSection />
          <CommunityImpactSection />
          <CredentialsSection />
          <FAQSection faqs={FAQS} />
          <CTASection
            title="Need Professional Cleaning?"
            subtitle="Request your free quotation today. Our team is ready to deliver excellence."
            primaryBtnText="Request a Free Quote"
            primaryBtnAction="#contact"
          />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <QuoteModal />
      </div>
    </ClientOnly>
  );
}
