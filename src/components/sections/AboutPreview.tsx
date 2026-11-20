'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import ceoBrian from '@/assets/ceo-brian.jpg';

const defaultStats = [
  { value: '5000+', label: 'Clients Served' },
  { value: '1000+', label: 'Projects' },
  { value: '100+', label: 'Brands' },
];

export const AboutPreview = () => {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/about')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.ceo_name || data.story || data.stats)) {
          setAboutData(data);
        }
      })
      .catch(() => {});
  }, []);

  const stats = aboutData?.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0
    ? aboutData.stats
    : defaultStats;

  const ceoName = aboutData?.ceo_name || 'Brian Abuga';
  const ceoTitle = aboutData?.ceo_title || 'Founder & Lead Photographer';
  const ceoImage = aboutData?.ceo_image_url || (ceoBrian as any)?.src || ceoBrian;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openLightbox = () => {
    setLightboxOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  }, []);

  const toggleZoom = () => {
    setZoomLevel(prev => prev === 1 ? 2 : prev === 2 ? 3 : 1);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') setZoomLevel(prev => Math.min(prev + 1, 3));
      if (e.key === '-') setZoomLevel(prev => Math.max(prev - 1, 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox]);

  return (
    <>
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            {/* Image */}
            <ScrollReveal>
              <motion.div 
                className="relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                onClick={openLightbox}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <motion.div 
                  className="absolute -inset-2 sm:-inset-4 border border-accent/20 -rotate-2"
                  animate={{ 
                    rotate: isHovering ? 0 : -2, 
                    borderColor: isHovering ? 'hsl(345 65% 45%)' : 'hsl(345 65% 45% / 0.2)',
                    scale: isHovering ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative overflow-hidden aspect-[3/4] rounded-lg">
                  <motion.img 
                    src={ceoImage} 
                    alt={`${ceoName} - ${ceoTitle}`}
                    className="w-full h-full object-cover object-top"
                    animate={{ scale: isHovering ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Hover overlay with zoom icon */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/40 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isHovering ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="p-4 bg-accent/90 rounded-full"
                    >
                      <ZoomIn className="w-8 h-8 text-accent-foreground" />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4 sm:p-6"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-pure-white font-heading font-semibold text-lg sm:text-xl">{ceoName}</p>
                    <p className="text-pure-white/70 text-xs sm:text-sm">{ceoTitle}</p>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <ScrollReveal>
                <motion.span 
                  className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent"
                  whileHover={{ x: 5 }}
                >
                  <motion.span 
                    className="w-8 h-0.5 bg-accent"
                    whileHover={{ width: 48 }}
                  />
                  About Us
                </motion.span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  Where Vision Meets
                  <motion.span 
                    className="block text-accent mt-2"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Artistry
                  </motion.span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-sm sm:text-base md:text-lg text-body-text leading-relaxed">
                  Ryankey Studios is a creative photography and videography studio specializing 
                  in high-quality visual storytelling for individuals, families, brands, and institutions.
                </p>
              </ScrollReveal>

              {/* Stats */}
              <ScrollReveal delay={0.3}>
                <div className="flex gap-4 sm:gap-8 pt-4">
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={stat.label} 
                      className="text-center"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <span className="block font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">
                        {stat.value}
                      </span>
                      <span className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Link href="/about">
                  <motion.span
                    className="inline-flex items-center gap-2 btn-cta"
                    whileHover={{ scale: 1.05, gap: '14px', boxShadow: '0 15px 40px -10px hsl(345 65% 35% / 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More About Us
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Image Lightbox */}
      <AnimatePresence mode="wait">
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none"
            onClick={closeLightbox}
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Keyboard hint */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-3"
            >
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">ESC</kbd>
                Close
              </span>
              <span>{zoomLevel.toFixed(1)}x</span>
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-50 p-3 bg-accent/80 backdrop-blur-sm rounded-full text-accent-foreground hover:bg-accent transition-colors shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox (Escape)"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Zoom button */}
            <motion.button
              className="absolute top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={zoomLevel > 1 ? "Zoom out" : "Zoom in"}
            >
              <ZoomIn className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] overflow-hidden cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <motion.img
                src={ceoImage}
                alt={`${ceoName} - ${ceoTitle}`}
                className="max-w-full max-h-[85vh] object-contain select-none rounded-lg"
                draggable={false}
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', damping: 20 }}
                whileHover={zoomLevel === 1 ? { scale: 1.02 } : {}}
              />
            </motion.div>

            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white"
            >
              <h3 className="font-heading text-xl font-bold mb-1">{ceoName}</h3>
              <p className="text-sm text-white/70">{ceoTitle}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
