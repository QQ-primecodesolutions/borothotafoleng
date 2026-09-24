'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { whatsappUrl } from '@/lib/constants';
import { openQuoteModal } from '@/lib/quote-modal';
import { scrollToSection } from '@/lib/scroll';

export function HeroSection() {
  const whatsapp = whatsappUrl();

  return (
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
            onClick={() => scrollToSection('contact')}
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
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
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
          onClick={() => scrollToSection('about')}
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
  );
}
