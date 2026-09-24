'use client';

import {
  Star,
  MapPin as MapPinIcon,
  Heart,
  Clock,
  BadgeCent,
  Award,
  Eye,
  type LucideIcon,
} from 'lucide-react';

import { SectionHeading } from '@/components/section-heading';
import { AnimatedCard } from '@/components/animated-card';
import { WHY_CHOOSE_US } from '@/lib/constants';

const whyChooseIconMap: Record<string, LucideIcon> = {
  MapPin: MapPinIcon,
  Heart,
  Clock,
  BadgeDollarSign: BadgeCent,
  Award,
  Eye,
};

export function WhyChooseUsSection() {
  return (
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
  );
}
