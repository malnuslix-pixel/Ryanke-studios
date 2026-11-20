'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandMarquee } from '@/components/BrandMarquee';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { PageLayout } from '@/components/layout/PageLayout';

const HomePage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <HeroSection />
      <BrandMarquee />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default HomePage;
