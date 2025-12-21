import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Camera, Video, Play } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background z-10" />
        <img
          src={heroImage}
          alt="Ryankey Studios professional photography"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 left-8 lg:left-16 z-10"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 right-8 lg:right-16 z-10"
      >
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-6 lg:px-12 text-center"
      >
        {/* Pre-heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-pure-white/80">
            <Camera className="w-4 h-4" />
            Your Dream Studios
            <Video className="w-4 h-4" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-8 text-pure-white"
        >
          <span className="block">Capturing</span>
          <span className="block mt-2">
            <span className="text-accent">Moments</span> That
          </span>
          <span className="block mt-2">Last Forever</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-pure-white/80 leading-relaxed mb-12"
        >
          Ryankey Studios specializes in high-quality visual storytelling for individuals, 
          families, brands, and institutions across Nairobi and its environs.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-luxury group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4" />
              View Our Work
            </span>
          </motion.a>
          <motion.a
            href="https://wa.me/254702340700"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-luxury text-pure-white border-pure-white/30 hover:border-accent hover:text-accent"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book via WhatsApp
          </motion.a>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-pure-white/10 backdrop-blur-sm rounded-full text-sm text-pure-white/70"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Serving Nairobi, Ruiru, Kamakis, Kiambu & Westlands
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-pure-white/70 hover:text-pure-white transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-pure-white/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-pure-white/20" />
    </section>
  );
};
