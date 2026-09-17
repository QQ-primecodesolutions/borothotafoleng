'use client';

import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  FileCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Counter } from '@/components/counter';

const iconMap: Record<string, LucideIcon> = {
  Users,
  ShieldCheck,
  FileCheck,
  Sparkles,
};

interface StatItem {
  value: string | number;
  suffix?: string;
  label: string;
  icon: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const IconComponent = iconMap[stat.icon] || Sparkles;
            const numericValue =
              typeof stat.value === 'number' ? stat.value : 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
                  <IconComponent className="h-7 w-7 text-brand-blue" />
                </div>
                <div className="mt-4">
                  {typeof stat.value === 'number' ? (
                    <Counter
                      end={numericValue}
                      suffix={stat.suffix || ''}
                      label={stat.label}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="font-heading text-3xl font-bold text-brand-blue sm:text-4xl">
                        {stat.value}
                        {stat.suffix || ''}
                      </div>
                      <div className="mt-1 text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
