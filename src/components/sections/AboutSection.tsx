import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { ParallaxSection } from '../ParallaxSection';
import brianAbuga from '@/assets/brian-abuga.jpeg';

const stats = [
  { value: '2021', label: 'Established' },
  { value: '500+', label: 'Projects Completed' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '5+', label: 'Brands Served' },
];

const uniquePoints = [
  'Strong storytelling approach',
  'Professional yet affordable packages',
  'Fast turnaround time',
  'Personalized client experience',
  'Photography & Videography under one roof',
];

export const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 lg:py-40 overflow-hidden"
    >
      {/* Background Decorations */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-secondary blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content - Founder Image */}
          <ScrollReveal>
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-accent/20 -rotate-3" />
              <div className="absolute -inset-4 border-2 border-border/30 rotate-2" />
              
              <div className="relative overflow-hidden">
                <img 
                  src={brianAbuga} 
                  alt="Brian Abuga - Founder of Ryankey Studios"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                  <p className="text-pure-white font-heading font-semibold text-xl">Brian Abuga</p>
                  <p className="text-pure-white/70 text-sm">Founder & Lead Photographer</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Content */}
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ryankey Studios is a creative photography and videography studio specializing 
                in high-quality visual storytelling for individuals, families, brands, and institutions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by Brian Abuga, Ryankey Studios was born out of a passion for capturing 
                genuine moments and telling meaningful stories through visuals. We focus on creativity, 
                professionalism, and consistency while helping clients build strong visual identities.
              </p>
            </ScrollReveal>

            {/* Unique Selling Points */}
            <ScrollReveal delay={0.4}>
              <div className="space-y-3 pt-4">
                <p className="font-heading font-semibold text-foreground">Why Choose Us:</p>
                <ul className="space-y-2">
                  {uniquePoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 group text-foreground font-semibold"
                whileHover={{ x: 5 }}
              >
                Explore Our Services
                <span className="w-8 h-0.5 bg-accent group-hover:w-12 transition-all duration-300" />
              </motion.a>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 lg:mt-32">
          <ParallaxSection offset={30}>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center p-8 border border-border/50 bg-card hover:border-accent/30 transition-colors duration-300">
                    <motion.span
                      className="block font-heading text-4xl lg:text-5xl font-bold text-accent mb-2"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.2 + index * 0.1,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
};
