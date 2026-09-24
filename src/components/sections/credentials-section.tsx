'use client';

import {
  Shield,
  ShieldCheck,
  FileCheck,
  Users,
  Clock,
  type LucideIcon,
} from 'lucide-react';

import { SectionHeading } from '@/components/section-heading';
import { AnimatedCard } from '@/components/animated-card';
import { CREDENTIALS } from '@/lib/constants';

const credentialIconMap: Record<string, LucideIcon> = {
  FileCheck,
  Users,
  ShieldCheck,
  Clock,
};

/**
 * Replaces the former testimonials + gallery sections. Those carried invented
 * customer quotes and AI-generated "our work" photos; these are claims the
 * business can actually stand behind. Restore those sections only with real
 * quotes and real job photos.
 */
export function CredentialsSection() {
  return (
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
  );
}
