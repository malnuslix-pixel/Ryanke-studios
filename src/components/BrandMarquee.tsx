import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

// Notable Kenyan brands for a photography studio
const brands = [
  'Safaricom',
  'Kenya Airways',
  'Equity Bank',
  'KCB Group',
  'Nation Media',
  'Tusker',
  'Kenyatta University',
  'KICC',
];

export const BrandMarquee = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/50 overflow-hidden bg-secondary/20">
      <ScrollReveal>
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            Featured In & Trusted By
          </span>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* First Marquee Row */}
        <motion.div
          className="flex gap-8 md:gap-16 whitespace-nowrap mb-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <motion.span
              key={`${brand}-${index}`}
              className="font-heading text-2xl md:text-4xl font-semibold text-muted-foreground/30 hover:text-accent transition-all duration-500 cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {brand}
            </motion.span>
          ))}
        </motion.div>

        {/* Second Marquee Row - Reverse Direction */}
        <motion.div
          className="flex gap-8 md:gap-16 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...brands.reverse(), ...brands].map((brand, index) => (
            <motion.span
              key={`reverse-${brand}-${index}`}
              className="font-heading text-xl md:text-3xl font-medium text-muted-foreground/20 hover:text-accent/70 transition-all duration-500 cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {brand}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Stats Row */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-16 px-6">
          <motion.div 
            className="text-center group cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="block font-heading text-4xl md:text-5xl font-bold text-accent"
              whileHover={{ y: -5 }}
            >
              1000+
            </motion.span>
            <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              Happy Clients
            </span>
          </motion.div>
          <motion.div 
            className="text-center group cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="block font-heading text-4xl md:text-5xl font-bold text-accent"
              whileHover={{ y: -5 }}
            >
              5+
            </motion.span>
            <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              Brands Served
            </span>
          </motion.div>
          <motion.div 
            className="text-center group cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="block font-heading text-4xl md:text-5xl font-bold text-accent"
              whileHover={{ y: -5 }}
            >
              500+
            </motion.span>
            <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              Projects Done
            </span>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
};
