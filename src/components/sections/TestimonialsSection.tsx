'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import testimonialsBg from '@/assets/testimonials-bg.png';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Grace Wanjiku',
    role: 'Brand Client',
    content: 'Ryankey Studios captured our brand essence perfectly. Their attention to detail and creative vision elevated our visual identity to new heights. Professional, reliable, and exceptional quality.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr. Peter Ochieng',
    role: 'Corporate Client - BSR Hospital',
    content: 'Outstanding corporate photography services. They understood our needs and delivered beyond expectations. The team portraits and facility shots were exactly what we needed for our marketing materials.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Kamau',
    role: 'Brand Client - Finest Mazda Garage',
    content: 'The product photography for our automotive services was top-notch. Clean, vibrant images that truly showcase our work. Fast turnaround and great communication throughout.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Faith Akinyi',
    role: 'Brand Client - Vapella Spur & Salon',
    content: 'Brian and his team brought our salon to life through stunning visuals. The photos capture the luxury and care we put into our services. Highly recommend for any business.',
    rating: 5,
  },
  {
    id: 5,
    name: 'James Hassan',
    role: 'Hospitality Client - Opal Luxurious Suites',
    content: 'The real estate and hospitality photography exceeded all expectations. Every shot tells a story of luxury and comfort. Our bookings increased significantly after using these images.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Mary Nyambura',
    role: 'Family Client',
    content: 'We had the most beautiful family photoshoot! Brian made everyone feel comfortable, especially the children. The photos are now treasured memories we will keep forever.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [liveTestimonials, setLiveTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((t: any) => t.is_active);
          if (activeOnly.length > 0) {
            setLiveTestimonials(
              activeOnly.map((t: any) => ({
                id: t.id,
                name: t.name,
                role: t.role,
                content: t.content,
                rating: t.rating || 5,
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  const testimonials = liveTestimonials.length > 0 ? liveTestimonials : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative z-20 py-12 sm:py-16 lg:py-24 text-primary-foreground overflow-hidden"
    >
      {/* Background Cover Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${(testimonialsBg as any)?.src || testimonialsBg})` }}
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      
      {/* Background Decorations */}
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="absolute right-0 top-0 w-1/2 h-full opacity-5 hidden sm:block"
      >
        <Quote className="w-full h-full text-white" />
      </motion.div>

      {/* Decorative floating elements */}
      <div
        className="absolute left-5 sm:left-10 top-1/4 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-accent/20 blur-2xl opacity-20 pointer-events-none"
      />
      <div
        className="absolute right-10 sm:right-20 bottom-1/3 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-accent/20 blur-3xl opacity-15 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent">
              <span className="w-6 sm:w-8 h-0.5 bg-accent" />
              Testimonials
              <span className="w-6 sm:w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-4 sm:mt-6">
              What Our Clients
              <span className="block text-accent mt-1 sm:mt-2">Say About Us</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Quote Icon */}
            <motion.div 
              className="absolute -top-4 sm:-top-8 left-0 lg:-left-12"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 10 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-accent/30" />
            </motion.div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center py-8 sm:py-12 px-2 sm:px-4"
            >
              <motion.p 
                className="font-heading text-base sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 sm:mb-12 text-pure-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                "{testimonials[currentIndex].content}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-semibold text-lg sm:text-xl text-pure-white">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-pure-white/70 text-xs sm:text-sm mt-1">
                  {testimonials[currentIndex].role}
                </p>
              </motion.div>

              {/* Rating Stars with Animation */}
              <motion.div 
                className="flex justify-center gap-0.5 sm:gap-1 mt-3 sm:mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.3 }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-primary-foreground/30 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary touch-manipulation"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2 sm:gap-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 sm:h-3 rounded-full transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-accent touch-manipulation ${
                      index === currentIndex
                        ? 'bg-accent w-7 sm:w-10'
                        : 'bg-primary-foreground/30 hover:bg-primary-foreground/50 w-2.5 sm:w-3'
                    }`}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-primary-foreground/30 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary touch-manipulation"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
