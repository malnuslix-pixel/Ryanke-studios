'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);


  const imageSrc = heroData?.hero_image_url || (heroImage as any)?.src || heroImage;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={imageSrc}
          alt="Ryankey Studios professional photography"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Decorative Elements - Hidden on mobile for performance */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 left-4 lg:left-16 z-10 hidden sm:block"
      >
        <motion.div 
          className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 right-4 lg:right-16 z-10 hidden sm:block"
      >
        <motion.div 
          className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-accent to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center"
      >
        {/* Pre-heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6"
        >
          <motion.span 
            className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-pure-white/80"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.span>
            {heroData?.subheadline || 'Your Dream Studios'}
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Video className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.span>
          </motion.span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-6 sm:mb-8 text-pure-white"
        >
          <motion.span 
            className="block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Capturing
          </motion.span>
          <motion.span 
            className="block mt-1 sm:mt-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-accent">Moments</span> That
          </motion.span>
          <motion.span 
            className="block mt-1 sm:mt-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Last Forever
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-pure-white/80 leading-relaxed mb-8 sm:mb-12 px-2"
        >
          {heroData?.description || 'Ryankey Studios specializes in high-quality visual storytelling for individuals, families, brands, and institutions across Nairobi and its environs.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <motion.a
            href="/portfolio"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/portfolio';
            }}
            className="btn-luxury group w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px -10px hsl(345 65% 35% / 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Play className="w-4 h-4" />
              </motion.span>
              View Our Work
            </span>
          </motion.a>
          <motion.a
            href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-luxury text-pure-white border-pure-white/30 hover:border-accent hover:text-accent w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Book via WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Corner Decorations - Hidden on small mobile */}
      <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 border-l border-b border-pure-white/20 hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 border-r border-b border-pure-white/20 hidden sm:block" />
    </section>
  );
};
