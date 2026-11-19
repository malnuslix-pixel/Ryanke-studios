'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  heroImage?: any;
}

export const PageHeader = ({ title, subtitle, description, heroImage }: PageHeaderProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Enhanced parallax effect - matching home page style with more dramatic movement
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={containerRef} className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background - Same style as Home */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        {heroImage ? (
          <motion.img 
            src={typeof heroImage === 'string' ? heroImage : (heroImage as any)?.src || heroImage} 
            alt="" 
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <div className="w-full h-full bg-primary" />
        )}
      </motion.div>

      {/* Decorative Elements - Same as Home */}
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
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
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
                className="w-8 sm:w-12 h-0.5 bg-accent"
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {title}
              <motion.span 
                className="w-8 sm:w-12 h-0.5 bg-accent"
                animate={{ scaleX: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6 text-pure-white"
          >
            <motion.span 
              className="block"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {subtitle}
            </motion.span>
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-pure-white/80 leading-relaxed px-2"
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 border-l border-b border-pure-white/20 hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 border-r border-b border-pure-white/20 hidden sm:block" />
      
      {/* Bottom decorative line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </section>
  );
};