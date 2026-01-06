import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
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
import lifestyle2 from '@/assets/gallery/lifestyle-2.jpg';
import lifestyle3 from '@/assets/gallery/lifestyle-3.jpg';

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
    title: 'Couple Moments',
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
    title: 'Memorable Moments',
    description: 'Capturing memorable outdoor moments with artistic composition and natural beauty.',
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
  {
    id: 18,
    image: lifestyle2,
    title: 'Elegant Duo',
    description: 'Sophisticated couples photography featuring bold colors and stylish formal attire.',
    category: 'Lifestyle'
  },
  {
    id: 19,
    image: lifestyle3,
    title: 'Casual Vibes',
    description: 'Relaxed lifestyle photography capturing genuine joy and authentic connection between couples.',
    category: 'Lifestyle'
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

// Swipe threshold for navigation
const SWIPE_THRESHOLD = 50;

export const Gallery3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Swipe gesture state
  const swipeX = useMotionValue(0);
  const swipeOpacity = useTransform(swipeX, [-100, 0, 100], [0.5, 1, 0.5]);

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
    setPanPosition({ x: 0, y: 0 });
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    // Restore body scroll
    document.body.style.overflow = '';
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [filteredItems.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [filteredItems.length]);

  const toggleZoom = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else if (zoomLevel === 2) {
      setZoomLevel(3);
    } else {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevLightbox();
          break;
        case 'ArrowRight':
          nextLightbox();
          break;
        case '+':
        case '=':
          if (zoomLevel < 3) setZoomLevel(prev => Math.min(prev + 1, 3));
          break;
        case '-':
          if (zoomLevel > 1) {
            setZoomLevel(prev => Math.max(prev - 1, 1));
            if (zoomLevel === 2) setPanPosition({ x: 0, y: 0 });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, prevLightbox, nextLightbox, zoomLevel]);

  // Handle mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch events for mobile panning and pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setInitialPinchDistance(distance);
      setInitialZoom(zoomLevel);
    } else if (zoomLevel > 1 && e.touches.length === 1) {
      // Single finger pan
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - panPosition.x, 
        y: e.touches[0].clientY - panPosition.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      // Pinch gesture
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const scale = distance / initialPinchDistance;
      const newZoom = Math.min(Math.max(initialZoom * scale, 1), 4);
      setZoomLevel(newZoom);
      
      if (newZoom <= 1) {
        setPanPosition({ x: 0, y: 0 });
      }
    } else if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      // Single finger pan
      setPanPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialPinchDistance(null);
  };

  // Handle swipe gesture for lightbox navigation
  const handleSwipeEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (zoomLevel > 1) return; // Don't navigate when zoomed
    
    if (info.offset.x > SWIPE_THRESHOLD) {
      prevLightbox();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      nextLightbox();
    }
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
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-wine'
                      : 'bg-primary/10 text-foreground hover:bg-accent/20 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* 3D Carousel Container - adjusted height for desktop */}
          <div className="relative h-[550px] sm:h-[650px] lg:h-[750px] xl:h-[800px] perspective-1000">
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
                      whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(currentIndex)}
                      onHoverStart={() => setIsHovering(true)}
                      onHoverEnd={() => setIsHovering(false)}
                    >
                      {/* Decorative frame */}
                      <motion.div 
                        className="absolute -inset-2 bg-gradient-to-br from-accent/30 via-transparent to-accent/30 rounded-3xl blur-sm transition-opacity duration-500"
                        animate={{ opacity: isHovering ? 1 : 0 }}
                      />
                      
                      <motion.img
                        src={filteredItems[currentIndex]?.image}
                        alt={filteredItems[currentIndex]?.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovering ? 1.05 : 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                      
                      {/* View larger hint */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-primary/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovering ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: isHovering ? 1 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="p-4 bg-accent/90 rounded-full"
                        >
                          <ZoomIn className="w-8 h-8 text-accent-foreground" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Category badge */}
                      <motion.div 
                        className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/90 backdrop-blur-sm rounded-full"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
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
                    
                    {/* Description panel - positioned below with proper spacing on desktop */}
                    <motion.div 
                      className="mt-6 sm:mt-8 lg:mt-10 text-center px-4 lg:px-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.h3 
                        className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-foreground"
                        whileHover={{ scale: 1.02 }}
                      >
                        {filteredItems[currentIndex]?.title}
                      </motion.h3>
                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-16 lg:mb-0">
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

            {/* Navigation controls - repositioned for desktop to avoid overlap */}
            <div className="absolute -bottom-4 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 left-0 right-0 lg:left-4 lg:right-4 flex items-center justify-center lg:justify-between gap-4 sm:gap-6 z-20">
              <motion.button
                onClick={prevSlide}
                className="p-3 sm:p-4 bg-primary/90 backdrop-blur-sm rounded-full text-pure-white hover:bg-accent hover:text-accent-foreground transition-all duration-300 touch-manipulation shadow-xl hover:shadow-wine"
                whileHover={{ scale: 1.15, x: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="p-3 sm:p-4 bg-primary/90 backdrop-blur-sm rounded-full text-pure-white hover:bg-accent hover:text-accent-foreground transition-all duration-300 touch-manipulation shadow-xl hover:shadow-wine"
                whileHover={{ scale: 1.15, x: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </div>

          {/* Marquee-style thumbnail navigation - continuous scroll */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 sm:mt-16 relative overflow-hidden">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <div className="flex marquee-container">
                <motion.div 
                  className="flex gap-4 sm:gap-5 marquee-track"
                  animate={{
                    x: [0, -((112 + 20) * filteredItems.length)],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: filteredItems.length * 3,
                      ease: "linear",
                    },
                  }}
                  style={{ width: 'fit-content' }}
                >
                  {/* Triple items for seamless loop */}
                  {[...filteredItems, ...filteredItems, ...filteredItems].map((item, index) => (
                    <motion.button
                      key={`${item.id}-${index}`}
                      onClick={() => {
                        const actualIndex = index % filteredItems.length;
                        setDirection(actualIndex > currentIndex ? 1 : -1);
                        setCurrentIndex(actualIndex);
                        setAnimationIndex((prev) => (prev + 1) % animationVariants.length);
                      }}
                      className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 touch-manipulation group ${
                        index % filteredItems.length === currentIndex 
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-22 object-cover"
                      />
                      {/* Hover overlay with title */}
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-pure-white font-medium text-center px-1 line-clamp-2">
                          {item.title}
                        </span>
                      </div>
                      {index % filteredItems.length === currentIndex && (
                        <motion.div 
                          className="absolute inset-0 bg-accent/20"
                          layoutId="activeThumbnail"
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence mode="wait">
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none"
            onClick={closeLightbox}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent/20 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: Math.random() * 2 + 0.5
                  }}
                  animate={{ 
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 10 + 10, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Keyboard hint */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-3"
            >
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">←</kbd>
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">→</kbd>
                Navigate
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">ESC</kbd>
                Close
              </span>
              <span className="sm:hidden">Swipe to navigate</span>
              <span>{zoomLevel.toFixed(1)}x</span>
            </motion.div>

            {/* Close button - Enhanced */}
            <motion.button
              className="absolute top-4 right-4 z-50 p-3 bg-accent/80 backdrop-blur-sm rounded-full text-accent-foreground hover:bg-accent transition-colors shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox (Escape)"
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={zoomLevel > 1 ? "Zoom out" : "Zoom in"}
            >
              {zoomLevel > 1 ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </motion.button>

            {/* Image counter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
            >
              {lightboxIndex + 1} / {filteredItems.length}
            </motion.div>

            {/* Navigation - Left Arrow */}
            <motion.button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.2, x: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Navigation - Right Arrow */}
            <motion.button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Image Container with Pan, Pinch-to-Zoom, and Swipe Support */}
            <motion.div
              className={`relative max-w-[90vw] max-h-[85vh] overflow-hidden ${zoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? 'cursor-grabbing' : ''}`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              drag={zoomLevel === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipeEnd}
              initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ touchAction: zoomLevel > 1 ? 'none' : 'pan-y', x: swipeX, opacity: swipeOpacity }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  ref={imageRef}
                  key={lightboxIndex}
                  src={filteredItems[lightboxIndex]?.image}
                  alt={filteredItems[lightboxIndex]?.title}
                  className="max-w-full max-h-[85vh] object-contain select-none rounded-lg"
                  draggable={false}
                  style={{ 
                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                    transition: isDragging || initialPinchDistance !== null ? 'none' : 'transform 0.3s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging) toggleZoom();
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={zoomLevel === 1 ? { scale: 1.02 } : {}}
                />
              </AnimatePresence>
              
              {/* Zoom indicator overlay */}
              {zoomLevel === 1 && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="p-3 bg-accent/50 rounded-full backdrop-blur-sm">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Image info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white max-w-lg px-4"
            >
              <h3 className="font-heading text-xl font-bold mb-1">
                {filteredItems[lightboxIndex]?.title}
              </h3>
              <p className="text-sm text-white/70">
                {filteredItems[lightboxIndex]?.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
