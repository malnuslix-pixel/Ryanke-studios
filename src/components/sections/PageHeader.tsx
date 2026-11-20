'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  heroImage?: any;
}

export const PageHeader = ({ title, subtitle, description, heroImage }: PageHeaderProps) => {
  const imgSrc = typeof heroImage === 'string' ? heroImage : (heroImage as any)?.src || heroImage;

  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Fixed Background Image — zero scroll jitter, 100% stable */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover object-center select-none"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-primary" />
        )}
        {/* Dark overlay for contrast — zero bottom shading */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-1/4 left-4 lg:left-16 z-10 hidden sm:block pointer-events-none">
        <div className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent opacity-80" />
      </div>
      <div className="absolute top-1/4 right-4 lg:right-16 z-10 hidden sm:block pointer-events-none">
        <div className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent opacity-80" />
      </div>

      {/* Decorative soft glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Pre-heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 sm:mb-4"
          >
            <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-pure-white/80">
              <span className="w-8 sm:w-12 h-0.5 bg-accent" />
              {title}
              <span className="w-8 sm:w-12 h-0.5 bg-accent" />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4 sm:mb-6 text-pure-white"
          >
            {subtitle}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-pure-white/80 leading-relaxed max-w-2xl mx-auto px-2"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};
