'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  Home,
  Church,
  Store,
  Sparkles,
  PartyPopper,
  Refrigerator,
  Truck,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  Home,
  Church,
  Store,
  Sparkles,
  PartyPopper,
  Refrigerator,
  Truck,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  index?: number;
}

export function ServiceCard({
  title,
  description,
  icon,
  image,
  index = 0,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="transition-transform duration-500 group-hover:scale-110"
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Icon badge */}
        <div className="absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue shadow-md">
          <IconComponent className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-brand-dark">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark">
          Learn More
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}
