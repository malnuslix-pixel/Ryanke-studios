'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Play } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.headline || data.hero_image_url)) {
          setHeroData(data);
        }
      })
      .catch(() => {});
  }, []);

  const imageSrc = heroData?.hero_image_url || (heroImage as any)?.src || heroImage;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden [clip-path:inset(0)]"
    >
      {/* Fixed Hero Background Image — 100% stationary, does NOT move when scrolled */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src={imageSrc}
          alt="Ryankey Studios professional photography"
          className="w-full h-full object-cover object-center select-none"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const fallback = (heroImage as any)?.src || heroImage;
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />
        {/* Subtle uniform dark overlay — zero bottom shading/gradient */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-1/4 left-4 lg:left-16 z-10 hidden sm:block pointer-events-none">
        <motion.div
          className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <div className="absolute top-1/4 right-4 lg:right-16 z-10 hidden sm:block pointer-events-none">
        <motion.div
          className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center py-20 sm:py-24">
        {/* Pre-heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-pure-white/80 max-w-full px-2">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
            {heroData?.subheadline || 'Photography • Videography • Drone • Documentaries'}
            <Video className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8 text-pure-white"
        >
          <span className="block">Capturing</span>
          <span className="block mt-1 sm:mt-2">
            <span className="text-accent">Moments</span> That
          </span>
          <span className="block mt-1 sm:mt-2">Last Forever</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-pure-white/85 leading-relaxed mb-8 sm:mb-12 px-2"
        >
          {heroData?.description ||
            'Ryankey Studios specializes in high-quality visual storytelling, documentary filmmaking, drone cinematography, and creative photography across Nairobi and beyond.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="/portfolio"
            className="btn-luxury group w-full sm:w-auto touch-manipulation min-h-[44px] flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>View Our Work</span>
          </a>
          <a
            href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-luxury text-pure-white border-pure-white/40 hover:border-accent hover:text-accent w-full sm:w-auto text-center touch-manipulation min-h-[44px] flex items-center justify-center"
          >
            Book via WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 border-l border-b border-pure-white/20 hidden sm:block pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 border-r border-b border-pure-white/20 hidden sm:block pointer-events-none" />
    </section>
  );
};
