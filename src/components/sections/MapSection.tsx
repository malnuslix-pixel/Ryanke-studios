'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { MapPin, Navigation, ExternalLink, Clock } from 'lucide-react';

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
      className="relative py-12 sm:py-20 lg:py-32 overflow-hidden bg-card"
    >
      {/* Background Decorations */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Find Us
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mt-4 sm:mt-6 text-foreground">
              Visit Our
              <span className="text-accent ml-2 sm:ml-3">Studio</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-center px-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              <span className="text-body-text text-sm sm:text-base md:text-lg">Nexus Business Centre, Ruiru Bypass (Kamakis)</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Map Container with Visible Google Maps Embed */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative Frame */}
            <div className="absolute -inset-2 sm:-inset-3 border-2 border-accent/20 rounded-2xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-accent/10">
              {/* Google Maps Embed - Visible Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0147848251695!2d36.98599!3d-1.13889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fb8f2e4c4d5%3A0x9e83f0a1d2b3c4e5!2sNexus%20Business%20Centre%2C%20Ruiru%20Bypass!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[280px] sm:h-[350px] md:h-[450px]"
                title="Ryankey Studios Location"
              />
              
              {/* Overlay with Studio Info */}
              <div className="relative sm:absolute bottom-0 left-0 right-0 bg-primary/95 sm:bg-gradient-to-t sm:from-primary/95 sm:via-primary/80 sm:to-transparent p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="text-primary-foreground text-center md:text-left">
                    <p className="font-heading font-semibold text-base sm:text-lg md:text-xl">Ryankey Studios</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <p className="text-primary-foreground/80 text-xs sm:text-sm md:text-base">Mon – Sat | 8:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                  
                  <motion.a
                    href="https://maps.app.goo.gl/qbnSnoA3k6FELAbH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta w-full sm:w-auto text-center justify-center min-h-[44px] touch-manipulation"
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

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <ScrollReveal delay={0.4}>
            <div className="p-6 bg-background border border-border/50 rounded-lg text-center hover:border-accent/30 transition-colors duration-300">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-heading font-semibold text-foreground mb-2">Address</h4>
              <p className="text-body-text text-sm md:text-base">Nexus Business Centre<br />Ruiru Bypass (Kamakis)</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.5}>
            <div className="p-6 bg-background border border-border/50 rounded-lg text-center hover:border-accent/30 transition-colors duration-300">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-heading font-semibold text-foreground mb-2">Hours</h4>
              <p className="text-body-text text-sm md:text-base">Mon – Sat: 8AM – 6PM<br />Sun: By Appointment</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.6}>
            <motion.a
              href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-accent/10 border border-accent/30 rounded-lg text-center hover:bg-accent/20 transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              <Navigation className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-heading font-semibold text-foreground mb-2">Book a Visit</h4>
              <p className="text-body-text text-sm md:text-base">Schedule your session<br />via WhatsApp</p>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
