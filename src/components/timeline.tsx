'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line - center on desktop, left on mobile */}
      <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-brand-blue/20 md:left-1/2 md:-translate-x-px" />

      {items.map((item, i) => {
        const isLeft = i % 2 === 0;

        return (
          <div key={i} className="relative mb-10 last:mb-0 md:mb-16">
            {/* Circle marker */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="absolute left-4 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-blue shadow-md md:left-1/2"
            >
              <div className="h-2 w-2 rounded-full bg-white" />
            </motion.div>

            {/* Content card */}
            <motion.div
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.1 }}
              className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
              }`}
            >
              <div className="rounded-xl bg-white p-5 shadow-lg sm:p-6">
                <span className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 font-heading text-xs font-bold text-brand-blue">
                  {item.year}
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-brand-dark sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
