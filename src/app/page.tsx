'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  Loader2,
  ArrowRight,
  Star,
  Shield,
  ShieldCheck,
  FileCheck,
  Users,
  Lightbulb,
  Handshake,
  Leaf,
  MapPin as MapPinIcon,
  Heart,
  Clock,
  BadgeCent,
  Award,
  Eye,
  GraduationCap,
  Building2,
  Home as HomeIcon,
  Church,
  Store,
  Sparkles,
  PartyPopper,
  Refrigerator,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { BackToTop } from '@/components/back-to-top';
import { QuoteModal } from '@/components/quote-modal';
import { ClientOnly } from '@/components/client-only';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { StatsSection } from '@/components/stats-section';
import { CTASection } from '@/components/cta-section';
import { FAQSection } from '@/components/faq-section';
import { Timeline } from '@/components/timeline';
import { AnimatedCard } from '@/components/animated-card';
import { Counter } from '@/components/counter';

import {
  COMPANY,
  PHONE_HREF,
  EMAIL_HREF,
  whatsappUrl,
  SERVICES,
  DETAILED_SERVICES,
  STATS,
  CREDENTIALS,
  WHY_CHOOSE_US,
  VALUES,
  TIMELINE,
  TEAM,
  FAQS,
} from '@/lib/constants';
import {
  contactSchema,
  CONTACT_SUBJECTS,
  HONEYPOT_FIELD,
  type ContactFormValues,
} from '@/lib/enquiry';
import { Checkbox } from '@/components/ui/checkbox';

// ─────────────────────────────────────────────────
// Icon Maps
// ─────────────────────────────────────────────────

const valuesIconMap: Record<string, LucideIcon> = {
  Star,
  Shield,
  Users,
  Lightbulb,
  Handshake,
  Leaf,
};

const whyChooseIconMap: Record<string, LucideIcon> = {
  MapPin: MapPinIcon,
  Heart,
  Clock,
  BadgeDollarSign: BadgeCent,
  Award,
  Eye,
};

const credentialIconMap: Record<string, LucideIcon> = {
  FileCheck,
  Users,
  ShieldCheck,
  Clock,
};

const detailedServiceIconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  Home: HomeIcon,
  Church,
  Store,
  Sparkles,
  PartyPopper,
  Refrigerator,
  Truck,
};

// ─────────────────────────────────────────────────
// Contact Form
// The schema lives in src/lib/enquiry.ts so the form, the quote modal and the
// API route all validate against the same rules.
// ─────────────────────────────────────────────────

type ContactFormState = 'idle' | 'submitting' | 'success' | 'error';

const contactSubjects = CONTACT_SUBJECTS;

// ─────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────

export default function Home() {
  // ── Contact form state ──
  const [contactState, setContactState] = useState<ContactFormState>('idle');

  const contactForm = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: undefined,
      message: '',
      consent: false as unknown as true,
      company: '',
    },
    resolver: zodResolver(contactSchema),
  });

  const onContactSubmit = async (data: ContactFormValues) => {
    setContactState('submitting');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact' }),
      });
      if (res.ok) {
        setContactState('success');
        contactForm.reset();
      } else {
        setContactState('error');
      }
    } catch {
      setContactState('error');
    }
  };

  // ── Helper functions ──
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openQuoteModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  }, []);

  const WHATSAPP_URL = whatsappUrl();

  // ── Animation Variants ──
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <ClientOnly>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />

        <main className="flex-1">
        {/* ══════════════════════════════════════════
            1. HERO SECTION
        ══════════════════════════════════════════ */}
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-bg.png"
              alt="Professional cleaning team at work"
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Professional Cleaning Services{' '}
              <span className="text-brand-blue-light">in QwaQwa</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
            >
              Empowering Youth. Delivering Excellence. Creating Cleaner Spaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                onClick={openQuoteModal}
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-8 py-3 text-base font-semibold shadow-lg shadow-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-blue/40"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => scrollTo('contact')}
                size="lg"
                variant="outline"
                className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 rounded-xl px-8 py-3 text-base font-semibold backdrop-blur-sm transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#25D366]/50 bg-[#25D366]/10 text-white hover:bg-[#25D366]/20 hover:border-[#25D366]/70 rounded-xl px-8 py-3 text-base font-semibold backdrop-blur-sm transition-all"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          >
            <button
              onClick={() => scrollTo('about')}
              className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
              aria-label="Scroll down"
            >
              <span className="text-xs font-medium tracking-widest uppercase">
                Scroll Down
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </button>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            2. STATS SECTION
        ══════════════════════════════════════════ */}
        <StatsSection stats={STATS} />

        {/* ══════════════════════════════════════════
            3. ABOUT SECTION
        ══════════════════════════════════════════ */}
        <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl lg:max-w-7xl">
            <SectionHeading
              title="About Borotho Tafoleng"
              subtitle="Youth-owned. Community-driven. Professionally committed."
            />

            {/* Two-column about content */}
            <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-5"
              >
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <span className="font-semibold text-brand-dark">
                    Borotho Tafoleng Cleaning and Maintenance (Pty) Ltd
                  </span>{' '}
                  was founded by a group of{' '}
                  <span className="font-semibold text-brand-blue">
                    15 passionate matriculated young people
                  </span>{' '}
                  from QwaQwa, Phuthaditjhaba. United by a shared dream to create
                  employment opportunities and deliver professional cleaning
                  services, we turned our vision into a registered company.
                </p>

                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  We are proudly{' '}
                  <span className="font-semibold text-brand-dark">
                    registered with CIPC
                  </span>{' '}
                  (Companies and Intellectual Property Commission), demonstrating our
                  commitment to operating with the highest standards of professionalism
                  and compliance in every aspect of our business.
                </p>

                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Our mission goes beyond cleaning. Every service we provide directly{' '}
                  <span className="font-semibold text-brand-green">
                    creates employment for young people
                  </span>{' '}
                  in QwaQwa. When you hire Borotho Tafoleng, you&apos;re not just
                  getting a clean space &mdash; you&apos;re investing in the future
                  of our community.
                </p>

                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  From schools and offices to churches and homes, we bring the same level
                  of dedication, thoroughness, and care to every job, no matter how big
                  or small.
                </p>

                <Button
                  onClick={() => scrollTo('values')}
                  className="mt-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-6 py-2.5 font-semibold shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                >
                  Learn More About Our Values
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              {/* Right: Team image */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="relative"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/team/team-photo.png"
                    alt="Borotho Tafoleng founding team"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-brand-blue/20" />
              </motion.div>
            </div>

            {/* ── Our Values ── */}
            <div id="values" className="mt-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
                  Our Values
                </h3>
                <p className="mt-2 text-muted-foreground">
                  The principles that guide everything we do.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {VALUES.map((value, i) => {
                  const IconComponent = valuesIconMap[value.icon] || Star;
                  return (
                    <AnimatedCard key={value.title} index={i}>
                      <div className="flex h-full flex-col items-center rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-8 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
                          <IconComponent className="h-7 w-7 text-brand-blue" />
                        </div>
                        <h4 className="mt-4 font-heading text-lg font-bold text-brand-dark">
                          {value.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            </div>

            {/* ── Our Journey Timeline ── */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
                  Our Journey
                </h3>
                <p className="mt-2 text-muted-foreground">
                  From an idea to a growing business making a real impact.
                </p>
              </motion.div>
              <Timeline items={TIMELINE} />
            </div>

            {/* ── Meet the Team ── */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
                  Meet the Team
                </h3>
                <p className="mt-2 text-muted-foreground">
                  The passionate young people behind Borotho Tafoleng.
                </p>
              </motion.div>

              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto max-w-3xl"
                >
                  <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                    <div className="relative aspect-[16/7] w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                    <div className="p-6 sm:p-8 text-center">
                      <h4 className="font-heading text-xl font-bold text-brand-dark">
                        {member.name}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-brand-blue">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. SERVICES SECTION
        ══════════════════════════════════════════ */}
        <section
          id="services"
          className="bg-brand-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-6xl lg:max-w-7xl">
            <SectionHeading
              title="Our Professional Cleaning Services"
              subtitle="Comprehensive cleaning solutions for homes, offices, schools, and more."
            />

            {/* Service cards grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  image={service.image}
                  index={i}
                />
              ))}
            </div>

            {/* ── Detailed Services Subsection ── */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
                  Our Services in Detail
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Learn more about what each of our professional services includes.
                </p>
              </motion.div>

              <div className="space-y-16">
                {DETAILED_SERVICES.map((service, i) => {
                  const IconComponent =
                    detailedServiceIconMap[service.icon] || Sparkles;
                  const isEven = i % 2 === 0;

                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                      className="overflow-hidden rounded-3xl bg-white shadow-xl"
                    >
                      <div
                        className={`grid grid-cols-1 lg:grid-cols-2 ${
                          isEven ? '' : 'lg:direction-rtl'
                        }`}
                      >
                        {/* Image */}
                        <div
                          className={`relative aspect-[4/3] w-full ${
                            isEven ? '' : 'lg:order-2'
                          }`}
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${
                            isEven ? '' : 'lg:order-1'
                          }`}
                        >
                          <h4 className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-sm font-medium text-brand-blue">
                            {service.shortDesc}
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {service.description}
                          </p>

                          {/* Benefits list */}
                          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {service.benefits.map((benefit) => (
                              <li
                                key={benefit}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                                {benefit}
                              </li>
                            ))}
                          </ul>

                          <Button
                            onClick={openQuoteModal}
                            className="mt-8 w-fit bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-6 py-2.5 font-semibold shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                          >
                            Request a Quote
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. WHY CHOOSE US SECTION
        ══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl lg:max-w-7xl">
            <SectionHeading
              title="Why Choose Borotho Tafoleng?"
              subtitle="We're more than just a cleaning company."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_CHOOSE_US.map((item, i) => {
                const IconComponent = whyChooseIconMap[item.icon] || Star;
                return (
                  <AnimatedCard key={item.title} index={i}>
                    <div className="flex h-full flex-col items-center rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-8 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="mt-4 font-heading text-lg font-bold text-brand-dark">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. COMMUNITY IMPACT SECTION
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-green via-brand-green-dark to-brand-green py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
          </div>

          <div className="relative mx-auto max-w-6xl lg:max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/about/community.jpg"
                    alt="QwaQwa community"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-white"
              >
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                  Making a Difference in QwaQwa
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  Every client who chooses Borotho Tafoleng is making a direct
                  investment in youth employment in QwaQwa. Your support enables us to
                  create meaningful jobs, develop skills, and build a brighter future
                  for young people in our community.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  We are not just a cleaning company &mdash; we are a youth empowerment
                  initiative that delivers professional services while changing lives.
                  Together, we are building a stronger, cleaner, and more prosperous
                  QwaQwa.
                </p>

                {/* Counter items */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="font-heading text-3xl font-bold sm:text-4xl">
                      <Counter end={15} suffix="+" label="" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-white/80">
                      Young People Employed
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                        <TrendingUpIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white/80">
                      Growing Local Business
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white/80">
                      Serving the Community
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. CREDENTIALS SECTION

            Replaces the former testimonials + gallery sections. Those carried
            invented customer quotes and AI-generated "our work" photos; these
            are claims the business can actually stand behind. Restore both
            sections once there are real quotes and real job photos.
        ══════════════════════════════════════════ */}
        <section className="bg-brand-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl lg:max-w-7xl">
            <SectionHeading
              title="Why You Can Trust Us"
              subtitle="A young company, but a properly constituted one. Here is what that means for you."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {CREDENTIALS.map((item, i) => {
                const IconComponent = credentialIconMap[item.icon] || Shield;
                return (
                  <AnimatedCard key={item.title} index={i}>
                    <div className="flex h-full gap-5 rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-8">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg font-bold text-brand-dark">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. FAQ SECTION
        ══════════════════════════════════════════ */}
        <FAQSection faqs={FAQS} />

        {/* ══════════════════════════════════════════
            9. CTA SECTION
        ══════════════════════════════════════════ */}
        <CTASection
          title="Need Professional Cleaning?"
          subtitle="Request your free quotation today. Our team is ready to deliver excellence."
          primaryBtnText="Request a Free Quote"
          primaryBtnAction="#contact"
        />

        {/* ══════════════════════════════════════════
            10. CONTACT SECTION
        ══════════════════════════════════════════ */}
        <section
          id="contact"
          className="bg-brand-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-6xl lg:max-w-7xl">
            <SectionHeading
              title="Get In Touch"
              subtitle="We'd love to hear from you. Reach out through any of these channels."
            />

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: Contact info cards */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="space-y-4"
              >
                {/* Phone */}
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Phone className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Phone
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                      {COMPANY.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 transition-colors group-hover:bg-[#25D366]">
                    <MessageCircle className="h-5 w-5 text-[#25D366] transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                      Send us a message
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Mail className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                      {COMPANY.email}
                    </p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 transition-colors group-hover:bg-[#1877F2]">
                    <Facebook className="h-5 w-5 text-[#1877F2] transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Facebook
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                      Follow us on Facebook
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                    <MapPin className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Address
                    </p>
                    <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
                    Send Us a Message
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you.
                  </p>

                  {contactState === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <CheckCircle className="h-16 w-16 text-brand-green" />
                      <h4 className="mt-4 font-heading text-lg font-bold text-brand-dark">
                        Message Sent!
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Thank you for reaching out. We&apos;ll respond within 24
                        hours.
                      </p>
                      <Button
                        onClick={() => setContactState('idle')}
                        className="mt-6 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-6"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <Form {...contactForm}>
                      <form
                        onSubmit={contactForm.handleSubmit(onContactSubmit)}
                        className="mt-6 space-y-4"
                      >
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Name <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={contactForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Phone <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="072 000 0000"
                                    type="tel"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="you@example.com"
                                    type="email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={contactForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Subject <span className="text-destructive">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {contactSubjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                      {subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us what you need..."
                                  className="min-h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Honeypot — hidden from people, irresistible to bots. */}
                        <FormField
                          control={contactForm.control}
                          name={HONEYPOT_FIELD}
                          render={({ field }) => (
                            <div aria-hidden="true" className="hidden">
                              <input
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                                {...field}
                              />
                            </div>
                          )}
                        />

                        {/* POPIA consent — unticked by default, required to submit. */}
                        <FormField
                          control={contactForm.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start gap-3 rounded-xl bg-brand-light p-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-0.5"
                                />
                              </FormControl>
                              <div className="space-y-1">
                                <FormLabel className="text-xs font-normal leading-relaxed text-muted-foreground">
                                  I agree that {COMPANY.shortName} may use the
                                  details above to contact me about this
                                  enquiry, as set out in the{' '}
                                  <Link
                                    href="/privacy"
                                    className="text-brand-blue underline underline-offset-2"
                                  >
                                    Privacy Policy
                                  </Link>
                                  .
                                </FormLabel>
                                <FormMessage className="text-xs" />
                              </div>
                            </FormItem>
                          )}
                        />

                        {contactState === 'error' && (
                          <p className="text-sm text-destructive">
                            Something went wrong. Please try again, or reach us
                            on WhatsApp.
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={contactState === 'submitting'}
                          className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-3 font-semibold shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                        >
                          {contactState === 'submitting' ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── Google Map ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <div className="overflow-hidden rounded-2xl shadow-lg border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34926.57555548775!2d28.774095999999997!3d-28.58158195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef2b178c8b3cc49%3A0x8e34cd72785410df!2sTseki%2C%20Phuthaditjhaba%2C%209874!5e1!3m2!1sen!2sza!4v1786060371683!5m2!1sen!2sza"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Borotho Tafoleng Cleaning & Maintenance - Location: QwaQwa, Phuthaditjhaba"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <QuoteModal />
      </div>
    </ClientOnly>
  );
}

// ─────────────────────────────────────────────────
// Inline SVG icon for TrendingUp (Community Impact section)
// ─────────────────────────────────────────────────
function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
