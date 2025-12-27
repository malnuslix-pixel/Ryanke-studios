import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandMarquee } from '@/components/BrandMarquee';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { PageLayout } from '@/components/layout/PageLayout';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <PageLayout>
          <HeroSection />
          <BrandMarquee />
          <AboutPreview />
          <ServicesPreview />
          <PortfolioPreview />
          <TestimonialsSection />
          <CTASection />
        </PageLayout>
      )}
    </>
  );
};

export default HomePage;
