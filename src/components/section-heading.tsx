'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      <h2
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-brand-dark'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-brand-blue ${
          centered ? 'mx-auto' : ''
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed sm:text-xl ${
            light ? 'text-white/80' : 'text-muted-foreground'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
