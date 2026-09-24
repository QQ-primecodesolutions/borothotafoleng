'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
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
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { SERVICES, DETAILED_SERVICES } from '@/lib/constants';
import { openQuoteModal } from '@/lib/quote-modal';
import { viewportOnce } from '@/lib/scroll';

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

export function ServicesSection() {
  return (
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
            viewport={viewportOnce}
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
                  viewport={viewportOnce}
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
  );
}
