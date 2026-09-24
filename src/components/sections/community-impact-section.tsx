'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { Counter } from '@/components/counter';
import { viewportOnce } from '@/lib/scroll';

/** Inline SVG — lucide's TrendingUp with the stroke weight this section wants. */
function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export function CommunityImpactSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-green via-brand-green-dark to-brand-green py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-6xl lg:max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/about/community.jpg"
                alt="QwaQwa community"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-white"
          >
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Making a Difference in QwaQwa
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Every client who chooses Borotho Tafoleng is making a direct
              investment in youth employment in QwaQwa. Your support enables us to
              create meaningful jobs, develop skills, and build a brighter future
              for young people in our community.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              We are not just a cleaning company &mdash; we are a youth empowerment
              initiative that delivers professional services while changing lives.
              Together, we are building a stronger, cleaner, and more prosperous
              QwaQwa.
            </p>

            {/* Counter items */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="font-heading text-3xl font-bold sm:text-4xl">
                  <Counter end={15} suffix="+" label="" />
                </div>
                <p className="mt-2 text-sm font-medium text-white/80">
                  Young People Employed
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <TrendingUpIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-white/80">
                  Growing Local Business
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-white/80">
                  Serving the Community
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
