import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Lightbox } from '../Lightbox';
import { ZoomIn } from 'lucide-react';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const galleryImages = [
  { src: portfolio1, alt: 'Professional portrait session', category: 'Portrait' },
  { src: portfolio2, alt: 'Wedding photography', category: 'Wedding' },
  { src: portfolio3, alt: 'Corporate event coverage', category: 'Corporate' },
  { src: portfolio4, alt: 'Family photography session', category: 'Family' },
  { src: portfolio5, alt: 'Product photography', category: 'Product' },
  { src: portfolio6, alt: 'Fashion photography', category: 'Fashion' },
];

export const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <section id="gallery" className="relative py-24 lg:py-40 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-0.5 bg-accent" />
                Gallery
                <span className="w-8 h-0.5 bg-accent" />
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
                Visual Stories
                <span className="block text-accent mt-2">We've Captured</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-body-text mt-6 max-w-2xl mx-auto text-base md:text-lg">
                Click on any image to view it in full detail with our smooth zoom gallery.
              </p>
            </ScrollReveal>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => openLightbox(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <motion.div
                    className="aspect-[4/3] overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4"
                    >
                      <ZoomIn className="w-6 h-6 text-accent-foreground" />
                    </motion.div>
                    <span className="text-white text-sm font-medium tracking-wide uppercase">
                      {image.category}
                    </span>
                    <span className="text-white/70 text-xs mt-1">Click to view</span>
                  </motion.div>

                  {/* Corner Decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-tl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-br-lg" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages.map((img) => img.src)}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
};
