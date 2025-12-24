import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { MapSection } from '@/components/sections/MapSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { BrandMarquee } from '@/components/BrandMarquee';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <main className="relative">
        {/* Subtle grain overlay for luxury feel */}
        <div className="grain-overlay" />
        
        <Navigation />
        <HeroSection />
        <BrandMarquee />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <GallerySection />
        <PricingSection />
        <ProcessSection />
        <TestimonialsSection />
        <MapSection />
        <ContactSection />
        <Footer />
        <WhatsAppWidget />
      </main>
    </>
  );
};

export default Index;
