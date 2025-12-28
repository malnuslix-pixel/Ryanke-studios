import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import pageHeroBg from '@/assets/page-hero-bg.jpg';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

export const PageHeader = ({ title, subtitle, description }: PageHeaderProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Hero Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <img 
          src={pageHeroBg} 
          alt="" 
          className="w-full h-[120%] object-cover"
        />
        {/* Dark overlay for logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-background" />
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
      
      <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-6"
          >
            <span className="w-12 h-0.5 bg-accent" />
            {title}
            <span className="w-12 h-0.5 bg-accent" />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-primary-foreground"
          >
            {subtitle}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mt-6 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>
      
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