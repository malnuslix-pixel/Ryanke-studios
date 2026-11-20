'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';

export const ProcessSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We begin with an in-depth consultation to understand your vision, preferences, and the story you want to tell.',
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Together, we craft a detailed plan including locations, timing, styling, and creative direction.',
    },
    {
      number: '03',
      title: 'Capture',
      description: 'On the day, our team works seamlessly to capture every meaningful moment with artistry and precision.',
    },
    {
      number: '04',
      title: 'Refinement',
      description: 'Each image is meticulously edited to enhance its beauty while maintaining an authentic, timeless quality.',
    },
    {
      number: '05',
      title: 'Delivery',
      description: 'Your final collection is delivered in a beautifully curated format, ready to be treasured for generations.',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-48 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Our Process
              <span className="w-8 h-px bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-4 sm:mt-6">
              From Vision to
              <span className="block text-accent mt-1 sm:mt-2">Masterpiece</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto">
              Every exceptional image follows a journey. Here's how we transform 
              your vision into timeless visual stories.
            </p>
          </ScrollReveal>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  className={`relative flex flex-col md:flex-row items-start gap-6 sm:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Number Circle */}
                  <motion.div 
                    className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-background border-2 border-accent z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="font-heading text-base sm:text-xl font-bold text-accent">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`pl-16 sm:pl-24 md:pl-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                    }`}
                    style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                  >
                    <motion.h3 
                      className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4"
                      whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Empty space for layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
