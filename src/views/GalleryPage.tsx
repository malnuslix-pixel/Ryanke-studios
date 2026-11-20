'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { CTASection } from '@/components/sections/CTASection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Film, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import galleryHero from '@/assets/gallery-hero.jpg';

type Category = 'All' | 'Corporate' | 'Events' | 'Family' | 'Brands' | 'Portraits' | 'Documentary' | 'Drone & Aerial' | 'Creative' | 'Lifestyle';

const categories: Category[] = ['All', 'Corporate', 'Events', 'Family', 'Brands', 'Portraits', 'Documentary', 'Drone & Aerial', 'Creative', 'Lifestyle'];

interface GalleryItem {
  id: number | string;
  image_url: string;
  title: string;
  description: string;
  category: Category | string;
}

const defaultGalleryItems: GalleryItem[] = [
  { id: 1, image_url: '/gallery/event.jpg', title: 'She Sparkles Event', description: 'A vibrant celebration of women empowerment.', category: 'Events' },
  { id: 2, image_url: '/gallery/event-2.jpg', title: 'Corporate Speaking', description: 'Dynamic corporate event photography.', category: 'Events' },
  { id: 3, image_url: '/gallery/birthdays.jpg', title: 'Birthday Celebration', description: 'Milestone birthday celebrations and lively portraits.', category: 'Events' },
  { id: 4, image_url: '/gallery/family.jpg', title: 'Maternity Moments', description: 'Timeless maternity & family joy captured authentically.', category: 'Family' },
  { id: 5, image_url: '/gallery/family-2.jpg', title: 'Family Portraits', description: 'Capturing unforgettable family connections.', category: 'Family' },
  { id: 6, image_url: '/gallery/moments-1.jpg', title: 'Signature Studio Portraits', description: 'Sharp, expressive high-fashion studio portraits.', category: 'Portraits' },
  { id: 7, image_url: '/gallery/moments-2.jpg', title: 'Candid Expression', description: 'Spontaneous and heartfelt natural portraits.', category: 'Portraits' },
  { id: 8, image_url: '/gallery/moments-3.jpg', title: 'Classic Studio Lighting', description: 'Dramatic mood lighting and refined styling.', category: 'Portraits' },
  { id: 9, image_url: '/gallery/moments-4.jpg', title: 'Editorial Portrait', description: 'Modern magazine-grade editorial photography.', category: 'Portraits' },
  { id: 10, image_url: '/gallery/brand-1.jpg', title: 'Commercial Campaign', description: 'Compelling brand identity & advertising imagery.', category: 'Brands' },
  { id: 11, image_url: '/gallery/brand-2.jpg', title: 'Product Aesthetics', description: 'Polished product visuals designed to convert.', category: 'Brands' },
  { id: 12, image_url: '/gallery/brand-3.jpg', title: 'Brand Storytelling', description: 'Showcasing the team and passion behind the brand.', category: 'Brands' },
  { id: 13, image_url: '/gallery/brand-4.jpg', title: 'Corporate Branding', description: 'Executive imagery that inspires confidence.', category: 'Brands' },
  { id: 14, image_url: '/gallery/corporate.jpg', title: 'Executive Keynote', description: 'High-impact coverage of corporate summits.', category: 'Corporate' },
  { id: 15, image_url: '/gallery/creative.jpg', title: 'Creative Vision', description: 'Boundary-pushing conceptual & artistic shoots.', category: 'Creative' },
  { id: 16, image_url: '/gallery/lifestyle.jpg', title: 'City Living', description: 'Authentic moments celebrating Nairobi culture.', category: 'Lifestyle' },
  { id: 17, image_url: '/gallery/lifestyle-2.jpg', title: 'Urban Elegance', description: 'Modern metropolitan storytelling and style.', category: 'Lifestyle' },
  { id: 18, image_url: '/gallery/lifestyle-3.jpg', title: 'Outdoor Splendor', description: 'Natural light photography in scenic environments.', category: 'Lifestyle' },
  { id: 19, image_url: '/gallery/photo-retouch.jpg', title: 'Master Retouching', description: 'Ultra-fine skin and tone post-production artistry.', category: 'Creative' },
  { id: 20, image_url: '/gallery/creative.jpg', title: 'Aerial Panorama', description: 'High-altitude panoramic cinematography for real estate & events.', category: 'Drone & Aerial' },
  { id: 21, image_url: '/gallery/corporate.jpg', title: 'Voices of Impact Documentary', description: 'In-depth human interest and NGO documentary storytelling.', category: 'Documentary' },
];

const GalleryPage = () => {
  useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [featuredDoc, setFeaturedDoc] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((item: any) => item.is_active !== false);
          if (active.length > 0) {
            setGalleryItems(
              active.map((item: any, i: number) => ({
                id: item.id || i + 1,
                image_url: item.image_url,
                title: item.title || 'Ryankey Gallery',
                description: item.description || '',
                category: item.category || 'All',
              }))
            );
          }
        }
      })
      .catch(() => {});

    // Fetch documentaries from admin dashboard to power the CTA
    fetch('/api/admin/documentaries')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.find((d: any) => d.is_featured && d.is_active !== false) || data[0];
          setFeaturedDoc(featured);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setVisibleCount(5); // Reset to 5 on category change
  };

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % displayedItems.length : null));
  }, [displayedItems.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : null));
  }, [displayedItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <PageLayout>
      <PageHeader 
        title="Gallery"
        subtitle="Visual Masterpieces"
        description="Immerse yourself in our stunning collection of professional photography showcasing our finest work."
        heroImage={galleryHero}
      />

      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Category Filter - Mobile Swipeable / Desktop Centered */}
          <ScrollReveal>
            <div className="flex overflow-x-auto no-scrollbar gap-2 py-1.5 px-4 -mx-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible mb-8 sm:mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 min-h-[38px] touch-manipulation ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30 font-semibold scale-[1.02]'
                      : 'bg-card border border-border text-muted-foreground hover:border-accent/50 hover:text-accent active:scale-95'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery Grid (initial 5 images) */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-card/60 border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading={index < 5 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6" />

                  {/* Caption & Category */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-accent text-accent-foreground mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-pure-white font-heading font-semibold text-base sm:text-lg leading-tight">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-pure-white/75 text-xs sm:text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2.5 bg-accent/90 rounded-full text-accent-foreground shadow-lg backdrop-blur-sm">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Action Bar: View More & Watch Our Documentaries CTA */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {visibleCount < filteredItems.length && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredItems.length))}
                className="btn-luxury w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
              >
                <span>View More Photos ({filteredItems.length - visibleCount} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            )}

            {visibleCount >= filteredItems.length && filteredItems.length > 5 && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleCount(5)}
                className="btn-outline-luxury w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            )}

            {/* Watch Our Documentaries CTA (controlled from admin dashboard) */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              {featuredDoc?.drive_url ? (
                <a
                  href={featuredDoc.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-luxury border-accent/60 text-foreground hover:bg-accent hover:text-accent-foreground w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2.5 text-sm font-semibold transition-all duration-300 shadow-md group"
                >
                  <Film className="w-4 h-4 text-accent group-hover:text-current transition-colors" />
                  <span>{featuredDoc.cta_label || 'Watch Our Documentaries'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <Link
                  href="/portfolio#documentaries"
                  className="btn-outline-luxury border-accent/60 text-foreground hover:bg-accent hover:text-accent-foreground w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2.5 text-sm font-semibold transition-all duration-300 shadow-md group"
                >
                  <Film className="w-4 h-4 text-accent group-hover:text-current transition-colors" />
                  <span>Watch Our Documentaries</span>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && displayedItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-5 right-5 z-50 p-3 bg-accent/80 hover:bg-accent text-accent-foreground rounded-full shadow-lg transition-colors"
              onClick={closeLightbox}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Prev Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-[90vw] max-h-[80vh] w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayedItems[lightboxIndex].image_url}
                alt={displayedItems[lightboxIndex].title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white max-w-xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs text-accent uppercase tracking-wider font-semibold">
                {displayedItems[lightboxIndex].category}
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold mt-0.5">
                {displayedItems[lightboxIndex].title}
              </h3>
              {displayedItems[lightboxIndex].description && (
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  {displayedItems[lightboxIndex].description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </PageLayout>
  );
};

export default GalleryPage;
