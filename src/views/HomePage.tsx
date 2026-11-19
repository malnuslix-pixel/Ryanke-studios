'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandMarquee } from '@/components/BrandMarquee';
import { PageLayout } from '@/components/layout/PageLayout';

// Dynamically imported below-the-fold sections to minimize first load JS
const AboutPreview = dynamic(
  () => import('@/components/sections/AboutPreview').then((mod) => ({ default: mod.AboutPreview })),
  { ssr: true }
);

const ServicesPreview = dynamic(
  () => import('@/components/sections/ServicesPreview').then((mod) => ({ default: mod.ServicesPreview })),
  { ssr: true }
);

const PortfolioPreview = dynamic(
  () => import('@/components/sections/PortfolioPreview').then((mod) => ({ default: mod.PortfolioPreview })),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then((mod) => ({ default: mod.TestimonialsSection })),
  { ssr: true }
);

const CTASection = dynamic(
  () => import('@/components/sections/CTASection').then((mod) => ({ default: mod.CTASection })),
  { ssr: true }
);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    // Only show loading screen once per session to maximize perceived speed
    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('ryankey_visited');
    if (!hasVisited) {
      setIsLoading(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ryankey_visited', 'true');
    }
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      <PageLayout>
        <HeroSection />
        <BrandMarquee />
        <AboutPreview />
        <ServicesPreview />
        <PortfolioPreview />
        <TestimonialsSection />
        <CTASection />
      </PageLayout>
    </>
  );
};

export default HomePage;
