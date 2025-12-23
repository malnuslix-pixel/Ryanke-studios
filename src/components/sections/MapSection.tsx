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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.951526456271!2d36.95783567496567!3d-1.1747699355455893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f3c3b7c7c7c%3A0x1c3c3c3c3c3c3c3c!2sNexus%20Business%20Centre%2C%20Ruiru%20Bypass%2C%20Kamakis!5e0!3m2!1sen!2ske!4v1702893456789!5m2!1sen!2ske"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ryankey Studios Location"
                className="w-full"
              />
              
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
