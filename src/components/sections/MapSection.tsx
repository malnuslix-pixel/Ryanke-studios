import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export const MapSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="location"
      ref={containerRef}
      className="relative py-16 lg:py-24 overflow-hidden bg-card"
    >
      {/* Background Decorations */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Find Us
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mt-6">
              Visit Our
              <span className="text-accent ml-3">Studio</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Nexus Business Centre, Ruiru Bypass (Kamakis)</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Map Container */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative Frame */}
            <div className="absolute -inset-3 border-2 border-accent/20 rounded-2xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-accent/10">
              {/* Static Map Image with Link - No API Required */}
              <a
                href="https://maps.app.goo.gl/qbnSnoA3k6FELAbH9"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-[450px] bg-muted relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/30 to-accent/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <MapPin className="w-16 h-16 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-heading font-bold mb-2">Ryankey Studios</h3>
                  <p className="text-muted-foreground mb-4">Nexus Business Centre, Ruiru Bypass (Kamakis)</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-lg text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Navigation className="w-4 h-4" />
                    Click to Open in Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </a>
              
              {/* Overlay with CTA */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-primary-foreground text-center sm:text-left">
                    <p className="font-semibold text-lg">Ryankey Studios</p>
                    <p className="text-primary-foreground/70 text-sm">Mon – Sat | 8:00 AM – 6:00 PM</p>
                  </div>
                  
                  <motion.a
                    href="https://maps.app.goo.gl/qbnSnoA3k6FELAbH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
