import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight } from 'lucide-react';
import brianAbuga from '@/assets/brian-abuga.jpeg';

const stats = [
  { value: '2021', label: 'Established' },
  { value: '500+', label: 'Projects' },
  { value: '1000+', label: 'Happy Clients' },
];

export const AboutPreview = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute -inset-2 sm:-inset-4 border border-accent/20 -rotate-2"
                whileHover={{ rotate: 0, borderColor: 'hsl(345 65% 45%)' }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative overflow-hidden aspect-[3/4]">
                <motion.img 
                  src={brianAbuga} 
                  alt="Brian Abuga - Founder of Ryankey Studios"
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4 sm:p-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-pure-white font-heading font-semibold text-lg sm:text-xl">Brian Abuga</p>
                  <p className="text-pure-white/70 text-xs sm:text-sm">Founder & Lead Photographer</p>
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
              <Link to="/about">
                <motion.span
                  className="inline-flex items-center gap-2 btn-cta"
                  whileHover={{ scale: 1.05, gap: '14px', boxShadow: '0 15px 40px -10px hsl(345 65% 35% / 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
