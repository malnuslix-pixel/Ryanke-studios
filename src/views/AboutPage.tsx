'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import aboutHero from '@/assets/about-hero.jpeg';

const AboutPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="About Us"
        subtitle="Where Vision Meets Artistry"
        description="Discover the story behind Ryankey Studios and our passion for visual storytelling."
        heroImage={aboutHero}
      />
      <AboutSection />
      <ProcessSection />
      <CTASection />
    </PageLayout>
  );
};

export default AboutPage;
