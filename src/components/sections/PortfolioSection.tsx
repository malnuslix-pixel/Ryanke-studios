import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const categories = ['All', 'Corporate', 'Events', 'Family & Lifestyle', 'Brands & Products'];

const portfolioItems = [
  { 
    id: 1, 
    image: portfolio1, 
    title: 'Corporate Brand Session', 
    category: 'Corporate',
    description: 'Professional team and executive portraits'
  },
  { 
    id: 2, 
    image: portfolio2, 
    title: 'Family Moments', 
    category: 'Family & Lifestyle',
    description: 'Capturing warmth and connection'
  },
  { 
    id: 3, 
    image: portfolio3, 
    title: 'Product Campaign', 
    category: 'Brands & Products',
    description: 'Clean, vibrant product photography'
  },
  { 
    id: 4, 
    image: portfolio4, 
    title: 'Corporate Event', 
    category: 'Events',
    description: 'Professional event documentation'
  },
  { 
    id: 5, 
    image: portfolio5, 
    title: 'Lifestyle Portrait', 
    category: 'Family & Lifestyle',
    description: 'Natural light lifestyle sessions'
  },
  { 
    id: 6, 
    image: portfolio6, 
    title: 'Brand Identity', 
    category: 'Brands & Products',
    description: 'Visual storytelling for brands'
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
    <section id="portfolio" ref={containerRef} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Portfolio
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Our Featured
              <span className="block text-accent mt-2">Work</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-sm font-semibold tracking-wider uppercase border-2 transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground border-accent'
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs tracking-[0.2em] uppercase text-accent mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-pure-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-pure-white/70 text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pure-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pure-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-16">
            <motion.a
              href="https://www.instagram.com/ryankeystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-luxury"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View More on Instagram
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
