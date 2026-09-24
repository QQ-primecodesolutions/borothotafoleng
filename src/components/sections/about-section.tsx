'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  Lightbulb,
  Handshake,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { AnimatedCard } from '@/components/animated-card';
import { Timeline } from '@/components/timeline';
import { VALUES, TIMELINE, TEAM } from '@/lib/constants';
import { scrollToSection, viewportOnce } from '@/lib/scroll';

const valuesIconMap: Record<string, LucideIcon> = {
  Star,
  Shield,
  Users,
  Lightbulb,
  Handshake,
  Leaf,
};

export function AboutSection() {
  return (
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
            viewport={viewportOnce}
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
              onClick={() => scrollToSection('values')}
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
            viewport={viewportOnce}
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
            viewport={viewportOnce}
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
            viewport={viewportOnce}
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
            viewport={viewportOnce}
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
              viewport={viewportOnce}
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
  );
}
