import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alexandra & Michael',
    role: 'Wedding Clients',
    content: 'Visual Storytellers captured our wedding day with such artistry and emotion. Every image tells a story, and looking through our album feels like reliving the magic all over again. Truly exceptional work.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Creative Director, Luxe Magazine',
    content: 'Working with this team has been an absolute pleasure. Their attention to detail and creative vision elevated our editorial shoots to new heights. They understand the nuances of luxury branding.',
    rating: 5,
  },
  {
    id: 3,
    name: 'James & Emily Foster',
    role: 'Family Portrait Clients',
    content: 'We\'ve had family photos taken before, but never like this. They captured our family\'s personality and connection in ways we didn\'t think possible. These images are treasures we\'ll cherish forever.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Morrison',
    role: 'CEO, Morrison Estates',
    content: 'The real estate photography they provided transformed how we present our luxury properties. The quality and professionalism are unmatched. Our listings now tell compelling visual stories.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

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
      className="relative py-32 lg:py-48 bg-primary text-primary-foreground overflow-hidden"
    >
      {/* Background Decorations */}
      <motion.div
        style={{ y: decorY }}
        className="absolute right-0 top-0 w-1/2 h-full opacity-5"
      >
        <Quote className="w-full h-full" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Testimonials
              <span className="w-8 h-px bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mt-6">
              What Our Clients
              <span className="block text-accent italic mt-2">Say About Us</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 lg:-left-12">
              <Quote className="w-16 h-16 text-accent/30" />
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-12 italic">
                "{testimonials[currentIndex].content}"
              </p>

              <div>
                <p className="font-medium text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-primary-foreground/60 text-sm mt-1">
                  {testimonials[currentIndex].role}
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="w-12 h-12 flex items-center justify-center border border-primary-foreground/30 hover:border-accent hover:text-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-accent w-8'
                        : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                className="w-12 h-12 flex items-center justify-center border border-primary-foreground/30 hover:border-accent hover:text-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
