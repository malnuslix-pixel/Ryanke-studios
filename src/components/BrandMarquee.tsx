import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

const brands = [
  'Vogue',
  'Harper\'s Bazaar',
  'Elle',
  'Architectural Digest',
  'Forbes',
  'The New York Times',
  'Vanity Fair',
  'GQ',
];

export const BrandMarquee = () => {
  return (
    <section className="py-20 border-y border-border/50 overflow-hidden bg-secondary/20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
            Featured In
          </span>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee */}
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-serif text-3xl md:text-4xl font-light text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
