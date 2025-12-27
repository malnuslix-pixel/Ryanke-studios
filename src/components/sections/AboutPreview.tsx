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
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-4 border border-accent/20 -rotate-2" />
              <div className="relative overflow-hidden aspect-[3/4]">
                <motion.img 
                  src={brianAbuga} 
                  alt="Brian Abuga - Founder of Ryankey Studios"
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                  <p className="text-pure-white font-heading font-semibold text-xl">Brian Abuga</p>
                  <p className="text-pure-white/70 text-sm">Founder & Lead Photographer</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-0.5 bg-accent" />
                About Us
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Where Vision Meets
                <span className="block text-accent mt-2">Artistry</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base md:text-lg text-body-text leading-relaxed">
                Ryankey Studios is a creative photography and videography studio specializing 
                in high-quality visual storytelling for individuals, families, brands, and institutions.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.3}>
              <div className="flex gap-8 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="block font-heading text-3xl lg:text-4xl font-bold text-accent">
                      {stat.value}
                    </span>
                    <span className="text-sm tracking-wide uppercase text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Link to="/about">
                <motion.span
                  className="inline-flex items-center gap-2 btn-cta"
                  whileHover={{ scale: 1.02, gap: '12px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
