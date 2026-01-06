import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

// Import gallery images
import event from '@/assets/gallery/event.jpg';
import event2 from '@/assets/gallery/event-2.jpg';
import family from '@/assets/gallery/family.jpg';
import family2 from '@/assets/gallery/family-2.jpg';
import moments1 from '@/assets/gallery/moments-1.jpg';
import moments2 from '@/assets/gallery/moments-2.jpg';
import moments3 from '@/assets/gallery/moments-3.jpg';
import photoRetouch from '@/assets/gallery/photo-retouch.jpg';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const galleryItems = [
  {
    id: 1,
    image: event,
    title: 'She Sparkles Event',
    description: 'A vibrant celebration of women empowerment with colorful group photography capturing the energy and spirit of the occasion.',
    category: 'Events'
  },
  {
    id: 2,
    image: event2,
    title: 'Corporate Speaking',
    description: 'Dynamic corporate event photography capturing powerful moments of leadership and engagement.',
    category: 'Events'
  },
  {
    id: 3,
    image: family,
    title: 'Family Moments',
    description: 'Intimate maternity and family portraits celebrating the beautiful journey of growing families.',
    category: 'Family'
  },
  {
    id: 4,
    image: family2,
    title: 'Family Portrait',
    description: 'Professional family portraits capturing the love and connection between family members.',
    category: 'Family'
  },
  {
    id: 5,
    image: moments1,
    title: 'Elegant Couples',
    description: 'Sophisticated couple photography showcasing timeless elegance and romantic connection.',
    category: 'Portraits'
  },
  {
    id: 6,
    image: moments2,
    title: 'Lifestyle Photography',
    description: 'Creative lifestyle shoots capturing authentic moments in beautiful outdoor settings.',
    category: 'Lifestyle'
  },
  {
    id: 7,
    image: moments3,
    title: 'Creative Portraits',
    description: 'Artistic portrait photography with creative lighting and vibrant color palettes.',
    category: 'Creative'
  },
  {
    id: 8,
    image: photoRetouch,
    title: 'Fashion & Beauty',
    description: 'High-end fashion and beauty photography with professional retouching and styling.',
    category: 'Fashion'
  },
  {
    id: 9,
    image: portfolio1,
    title: 'Corporate Headshots',
    description: 'Professional corporate headshots for business profiles and branding.',
    category: 'Corporate'
  },
  {
    id: 10,
    image: portfolio2,
    title: 'Wedding Photography',
    description: 'Capturing the magic and emotions of your special day with artistic wedding photography.',
    category: 'Weddings'
  },
  {
    id: 11,
    image: portfolio3,
    title: 'Product Photography',
    description: 'High-quality product photography for brands and e-commerce.',
    category: 'Commercial'
  },
  {
    id: 12,
    image: portfolio4,
    title: 'Event Coverage',
    description: 'Comprehensive event photography capturing every important moment.',
    category: 'Events'
  },
  {
    id: 13,
    image: portfolio5,
    title: 'Studio Portraits',
    description: 'Professional studio portraits with expert lighting and composition.',
    category: 'Portraits'
  },
  {
    id: 14,
    image: portfolio6,
    title: 'Documentary Style',
    description: 'Authentic documentary-style photography telling visual stories.',
    category: 'Documentary'
  },
];

export const Gallery3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + galleryItems.length) % galleryItems.length;
      items.push({ ...galleryItems[index], position: i });
    }
    return items;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <motion.span 
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4"
              whileHover={{ x: 5 }}
            >
              <span className="w-8 h-0.5 bg-accent" />
              Immersive Experience
              <span className="w-8 h-0.5 bg-accent" />
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Our <span className="text-accent">Masterpieces</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* 3D Carousel Container */}
        <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] perspective-1000">
          {/* Main carousel */}
          <div className="relative h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 },
                }}
                className="absolute w-full max-w-4xl mx-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative group">
                  {/* Main image container */}
                  <motion.div 
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Decorative frame */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-accent/30 via-transparent to-accent/30 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <img
                      src={galleryItems[currentIndex].image}
                      alt={galleryItems[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                    
                    {/* Category badge */}
                    <motion.div 
                      className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/90 backdrop-blur-sm rounded-full"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-accent-foreground">
                        {galleryItems[currentIndex].category}
                      </span>
                    </motion.div>
                    
                    {/* Image counter */}
                    <motion.div 
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/80 backdrop-blur-sm rounded-full"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-xs sm:text-sm font-medium text-pure-white">
                        {currentIndex + 1} / {galleryItems.length}
                      </span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Description panel */}
                  <motion.div 
                    className="mt-6 sm:mt-8 text-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
                      {galleryItems[currentIndex].title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {galleryItems[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Side preview images (desktop only) */}
            <div className="hidden lg:block">
              {getVisibleItems().filter(item => item.position !== 0).map((item) => (
                <motion.div
                  key={`${item.id}-${item.position}`}
                  className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: item.position < 0 ? `${5 + (item.position + 2) * 8}%` : 'auto',
                    right: item.position > 0 ? `${5 + (2 - item.position) * 8}%` : 'auto',
                    zIndex: -Math.abs(item.position),
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 0.4 - Math.abs(item.position) * 0.15,
                    scale: 0.6 - Math.abs(item.position) * 0.1,
                    rotateY: item.position * -15,
                  }}
                  whileHover={{ opacity: 0.7, scale: 0.65 }}
                  onClick={() => {
                    setDirection(item.position > 0 ? 1 : -1);
                    setCurrentIndex(galleryItems.findIndex(g => g.id === item.id));
                  }}
                >
                  <div className="w-48 h-32 rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 sm:gap-6">
            <motion.button
              onClick={prevSlide}
              className="p-3 sm:p-4 bg-primary/80 backdrop-blur-sm rounded-full text-pure-white hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-3 sm:p-4 bg-accent rounded-full text-accent-foreground transition-colors touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isAutoPlaying ? 'Pause auto-scroll' : 'Start auto-scroll'}
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="p-3 sm:p-4 bg-primary/80 backdrop-blur-sm rounded-full text-pure-white hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail navigation */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 sm:mt-16">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {galleryItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 relative rounded-lg overflow-hidden snap-center transition-all duration-300 touch-manipulation ${
                    index === currentIndex 
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background scale-105' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 object-cover"
                  />
                  {index === currentIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-accent/20"
                      layoutId="activeThumbnail"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
