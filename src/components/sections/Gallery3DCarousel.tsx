import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, X, ZoomIn, ZoomOut } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

// Import gallery images
import event from '@/assets/gallery/event.jpg';
import event2 from '@/assets/gallery/event-2.jpg';
import family from '@/assets/gallery/family.jpg';
import family2 from '@/assets/gallery/family-2.jpg';
import moments1 from '@/assets/gallery/moments-1.jpg';
import moments2 from '@/assets/gallery/moments-2.jpg';
import moments3 from '@/assets/gallery/moments-3.jpg';
import moments4 from '@/assets/gallery/moments-4.jpg';
import photoRetouch from '@/assets/gallery/photo-retouch.jpg';
import birthdays from '@/assets/gallery/birthdays.jpg';
import brand1 from '@/assets/gallery/brand-1.jpg';
import brand2 from '@/assets/gallery/brand-2.jpg';
import brand3 from '@/assets/gallery/brand-3.jpg';
import brand4 from '@/assets/gallery/brand-4.jpg';
import corporate from '@/assets/gallery/corporate.jpg';
import creative from '@/assets/gallery/creative.jpg';
import lifestyle from '@/assets/gallery/lifestyle.jpg';

type Category = 'All' | 'Corporate' | 'Events' | 'Family' | 'Brands' | 'Portraits' | 'Creative' | 'Lifestyle';

const categories: Category[] = ['All', 'Corporate', 'Events', 'Family', 'Brands', 'Portraits', 'Creative', 'Lifestyle'];

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
    image: birthdays,
    title: 'Birthday Celebration',
    description: 'Capturing the joy and excitement of milestone birthday celebrations with stunning portrait photography.',
    category: 'Events'
  },
  {
    id: 4,
    image: family,
    title: 'Maternity Moments',
    description: 'Intimate maternity and family portraits celebrating the beautiful journey of growing families.',
    category: 'Family'
  },
  {
    id: 5,
    image: family2,
    title: 'Family Portrait',
    description: 'Professional family portraits capturing the love and connection between family members.',
    category: 'Family'
  },
  {
    id: 6,
    image: lifestyle,
    title: 'Elegant Couples',
    description: 'Sophisticated couple photography showcasing timeless elegance and romantic connection.',
    category: 'Portraits'
  },
  {
    id: 7,
    image: moments1,
    title: 'Lifestyle Portraits',
    description: 'Authentic lifestyle photography capturing real moments and genuine emotions.',
    category: 'Lifestyle'
  },
  {
    id: 8,
    image: moments2,
    title: 'Outdoor Lifestyle',
    description: 'Creative lifestyle shoots capturing authentic moments in beautiful outdoor settings.',
    category: 'Lifestyle'
  },
  {
    id: 9,
    image: moments3,
    title: 'Creative Portraits',
    description: 'Artistic portrait photography with creative lighting and vibrant color palettes.',
    category: 'Creative'
  },
  {
    id: 10,
    image: moments4,
    title: 'Romantic Moments',
    description: 'Capturing romantic outdoor moments with artistic composition and natural beauty.',
    category: 'Lifestyle'
  },
  {
    id: 11,
    image: creative,
    title: 'Confetti Joy',
    description: 'Vibrant creative photography capturing moments of pure joy and celebration.',
    category: 'Creative'
  },
  {
    id: 12,
    image: photoRetouch,
    title: 'Fashion & Beauty',
    description: 'High-end fashion and beauty photography with professional retouching and styling.',
    category: 'Portraits'
  },
  {
    id: 13,
    image: corporate,
    title: 'Corporate Meetings',
    description: 'Professional corporate photography capturing important business meetings and collaborations.',
    category: 'Corporate'
  },
  {
    id: 14,
    image: brand1,
    title: 'Big Heart Campaign',
    description: 'Brand photography for humanitarian campaigns, capturing the spirit of giving back.',
    category: 'Brands'
  },
  {
    id: 15,
    image: brand2,
    title: 'Avenue Healthcare',
    description: 'Professional corporate group photography for healthcare brand partnerships.',
    category: 'Brands'
  },
  {
    id: 16,
    image: brand3,
    title: 'Care For A Child\'s Heart',
    description: 'Documentary photography for charitable organizations making a difference.',
    category: 'Brands'
  },
  {
    id: 17,
    image: brand4,
    title: 'She Sparkles Brand',
    description: 'Event brand photography capturing authentic moments at empowerment events.',
    category: 'Brands'
  },
];

// Different animation variants for variety
const animationVariants = [
  // Slide and rotate
  {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0, zIndex: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  },
  // Flip effect
  {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: { rotateX: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (direction: number) => ({
      rotateX: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
  },
  // Zoom and fade
  {
    enter: () => ({
      scale: 0.3,
      opacity: 0,
      filter: 'blur(20px)',
    }),
    center: { scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 1 },
    exit: () => ({
      scale: 1.5,
      opacity: 0,
      filter: 'blur(20px)',
    }),
  },
  // Slide up with bounce
  {
    enter: (direction: number) => ({
      y: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.7,
    }),
    center: { y: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (direction: number) => ({
      y: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.7,
    }),
  },
  // 3D cube rotation
  {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { rotateY: 0, x: 0, opacity: 1, zIndex: 1 },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  },
];

export const Gallery3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [animationIndex, setAnimationIndex] = useState(0);

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    setAnimationIndex((prev) => (prev + 1) % animationVariants.length);
  }, [filteredItems.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setAnimationIndex((prev) => (prev + 1) % animationVariants.length);
  }, [filteredItems.length]);

  // Slow auto-scroll (8 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + filteredItems.length) % filteredItems.length;
      items.push({ ...filteredItems[index], position: i });
    }
    return items;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    setZoomLevel(1);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setZoomLevel(1);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
  };

  const currentVariant = animationVariants[animationIndex];

  return (
    <>
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
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

          {/* Category Filter */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground shadow-lg'
                      : 'bg-primary/10 text-foreground hover:bg-accent/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* 3D Carousel Container */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] perspective-1000">
            {/* Main carousel */}
            <div className="relative h-full flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${currentIndex}-${selectedCategory}`}
                  custom={direction}
                  variants={currentVariant}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.6,
                  }}
                  className="absolute w-full max-w-4xl mx-auto"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative group">
                    {/* Main image container */}
                    <motion.div 
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(currentIndex)}
                    >
                      {/* Decorative frame */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-accent/30 via-transparent to-accent/30 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <img
                        src={filteredItems[currentIndex]?.image}
                        alt={filteredItems[currentIndex]?.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                      
                      {/* View larger hint */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                      >
                        <ZoomIn className="w-12 h-12 text-pure-white" />
                      </motion.div>
                      
                      {/* Category badge */}
                      <motion.div 
                        className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/90 backdrop-blur-sm rounded-full"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-accent-foreground">
                          {filteredItems[currentIndex]?.category}
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
                          {currentIndex + 1} / {filteredItems.length}
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
                        {filteredItems[currentIndex]?.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {filteredItems[currentIndex]?.description}
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
                      setCurrentIndex(filteredItems.findIndex(g => g.id === item.id));
                      setAnimationIndex((prev) => (prev + 1) % animationVariants.length);
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
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                      setAnimationIndex((prev) => (prev + 1) % animationVariants.length);
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Zoom button */}
            <motion.button
              className="absolute top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {zoomLevel > 1 ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </motion.button>

            {/* Zoom level indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {zoomLevel}x zoom
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>

            {/* Navigation */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <motion.img
                key={lightboxIndex}
                src={filteredItems[lightboxIndex]?.image}
                alt={filteredItems[lightboxIndex]?.title}
                className="max-w-full max-h-[85vh] object-contain cursor-zoom-in"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />
            </motion.div>

            {/* Image info */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white max-w-lg px-4">
              <h3 className="font-heading text-xl font-bold mb-1">
                {filteredItems[lightboxIndex]?.title}
              </h3>
              <p className="text-sm text-white/70">
                {filteredItems[lightboxIndex]?.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
