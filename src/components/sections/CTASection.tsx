import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-primary text-primary-foreground">
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Ready to Start?
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Let's Create Something
              <span className="block text-accent mt-2">Beautiful Together</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mt-6 max-w-2xl mx-auto">
              Ready to bring your vision to life? Book your session today and let us capture 
              your moments in a way that will be treasured forever.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <motion.a
                href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold text-base tracking-wide rounded-md hover:bg-accent/90 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </motion.a>
              <Link to="/contact">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base tracking-wide rounded-md hover:border-accent hover:text-accent transition-all duration-300"
                  whileHover={{ scale: 1.02, gap: '12px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
