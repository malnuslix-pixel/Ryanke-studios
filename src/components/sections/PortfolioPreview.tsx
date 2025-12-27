import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight, Instagram, Play } from 'lucide-react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

const portfolioItems = [
  { src: portfolio1, title: 'Corporate Portraits', category: 'Brand' },
  { src: portfolio2, title: 'Family Sessions', category: 'Lifestyle' },
  { src: portfolio3, title: 'Event Coverage', category: 'Events' },
  { src: portfolio4, title: 'Product Shots', category: 'Commercial' },
];

export const PortfolioPreview = () => {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-0.5 bg-accent" />
                Portfolio
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
                Our Featured
                <span className="text-accent ml-3">Work</span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <Link to="/portfolio">
              <motion.span
                className="inline-flex items-center gap-2 btn-outline-luxury"
                whileHover={{ scale: 1.02, gap: '12px' }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Portfolio
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <motion.div
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-pure-white mt-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Social Links */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 mt-12 pt-12 border-t border-border/50">
            <motion.a
              href="https://www.instagram.com/ryankey_studios"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Follow on Instagram</span>
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@_ryankey_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Play className="w-5 h-5" />
              <span className="text-sm font-medium">Watch on TikTok</span>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
