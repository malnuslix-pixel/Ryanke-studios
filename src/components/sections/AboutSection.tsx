import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { ParallaxSection } from '../ParallaxSection';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '150+', label: 'Happy Clients' },
  { value: '25+', label: 'Industry Awards' },
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
      className="relative py-32 lg:py-48 overflow-hidden"
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
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-px bg-accent" />
                About Us
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Where Vision Meets
                <span className="block text-accent italic mt-2">Artistry</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For over a decade, we've been at the forefront of visual storytelling, 
                transforming ordinary moments into extraordinary narratives. Our team 
                of passionate creatives combines technical excellence with artistic vision 
                to deliver images that speak volumes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every project begins with understanding your unique story. We believe 
                that the most powerful images are those that capture not just what 
                happened, but how it felt. This philosophy drives everything we do.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 group text-foreground font-medium"
                whileHover={{ x: 5 }}
              >
                Explore Our Services
                <span className="w-8 h-px bg-accent group-hover:w-12 transition-all duration-300" />
              </motion.a>
            </ScrollReveal>
          </div>

          {/* Right Content - Stats */}
          <ParallaxSection offset={30}>
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-border/50 -rotate-3" />
              <div className="absolute -inset-4 border border-accent/30 rotate-2" />

              {/* Stats Grid */}
              <div className="relative bg-card p-8 lg:p-12">
                <StaggerContainer className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <StaggerItem key={stat.label}>
                      <div className="text-center p-6 border border-border/50 hover:border-accent/30 transition-colors duration-300">
                        <motion.span
                          className="block font-serif text-4xl lg:text-5xl font-medium text-accent mb-2"
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
              </div>
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
};
