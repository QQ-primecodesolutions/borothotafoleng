'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { PHONE_HREF } from '@/lib/constants';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnAction?: string;
  secondaryBtnText?: string;
  secondaryBtnAction?: string;
}

export function CTASection({
  title = 'Ready for a Spotless Space?',
  subtitle = 'Get in touch today for a free quote. Let us show you the Borotho Tafoleng difference.',
  primaryBtnText = 'Get a Free Quote',
  primaryBtnAction = '#contact',
  secondaryBtnText = 'Call Us Now',
  secondaryBtnAction = PHONE_HREF,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-blue py-20 sm:py-28">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-white/[0.03]" />
        <div className="absolute left-1/3 top-10 h-24 w-24 rounded-full bg-white/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-blue hover:bg-white/90"
            >
              <a href={primaryBtnAction}>
                {primaryBtnText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <a href={secondaryBtnAction}>
                <Phone className="mr-2 h-4 w-4" />
                {secondaryBtnText}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
