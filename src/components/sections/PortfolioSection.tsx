import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const categories = ['All', 'Weddings', 'Portraits', 'Commercial', 'Events'];

const portfolioItems = [
  { 
    id: 1, 
    image: portfolio1, 
    title: 'Eternal Moments', 
    category: 'Weddings',
    description: 'A sunset celebration of love'
  },
  { 
    id: 2, 
    image: portfolio2, 
    title: 'Fashion Forward', 
    category: 'Portraits',
    description: 'Editorial elegance'
  },
  { 
    id: 3, 
    image: portfolio3, 
    title: 'Luxury Brand Campaign', 
    category: 'Commercial',
    description: 'Premium product storytelling'
  },
  { 
    id: 4, 
    image: portfolio4, 
    title: 'Executive Presence', 
    category: 'Portraits',
    description: 'Corporate leadership portraits'
  },
  { 
    id: 5, 
    image: portfolio5, 
    title: 'Architectural Vision', 
    category: 'Commercial',
    description: 'Luxury real estate imagery'
  },
  { 
    id: 6, 
    image: portfolio6, 
    title: 'Family Legacy', 
    category: 'Portraits',
    description: 'Intimate family connections'
  },
];

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" ref={containerRef} className="relative py-32 lg:py-48 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Portfolio
              <span className="w-8 h-px bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mt-6">
              Our Featured
              <span className="block text-accent italic mt-2">Work</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm font-medium tracking-wider uppercase border transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                {/* Image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs tracking-[0.2em] uppercase text-accent mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-ivory mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ivory/70 text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-ivory/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-ivory/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-16">
            <motion.button
              className="btn-outline-luxury"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Portfolio
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
