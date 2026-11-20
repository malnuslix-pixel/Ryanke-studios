'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

// Notable Kenyan brands for a photography studio
const defaultBrands = [
  'Safaricom',
  'Kenya Airways',
  'Equity Bank',
  'KCB Group',
  'Nation Media',
  'Tusker',
  'Kenyatta University',
  'KICC',
];

export const BrandMarquee = () => {
  const [liveBrands, setLiveBrands] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/brands')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((b: any) => b.is_active);
          if (activeOnly.length > 0) {
            setLiveBrands(activeOnly.map((b: any) => b.name));
          }
        }
      })
      .catch(() => {});
  }, []);

  const brands = liveBrands.length > 0 ? liveBrands : defaultBrands;

  return (
    <section className="py-8 sm:py-10 md:py-12 border-y border-border/50 overflow-hidden bg-secondary/20">
      <ScrollReveal>
        <div className="text-center mb-4 sm:mb-6">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground">
            Featured In & Trusted By
          </span>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* First Marquee Row */}
        <motion.div
          className="flex gap-8 md:gap-16 whitespace-nowrap mb-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <motion.span
              key={`${brand}-${index}`}
              className="font-heading text-2xl md:text-4xl font-semibold text-muted-foreground/30 hover:text-accent transition-all duration-500 cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {brand}
            </motion.span>
          ))}
        </motion.div>

        {/* Second Marquee Row - Reverse Direction */}
        <motion.div
          className="flex gap-8 md:gap-16 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...brands].reverse().concat(brands).map((brand, index) => (
            <motion.span
              key={`reverse-${brand}-${index}`}
              className="font-heading text-xl md:text-3xl font-medium text-muted-foreground/20 hover:text-accent/70 transition-all duration-500 cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {brand}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
