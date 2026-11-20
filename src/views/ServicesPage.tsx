'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import servicesHero from '@/assets/services-hero.webp';

const ServicesPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="Our Services"
        subtitle="Professional Services for Every Vision"
        description="From intimate family moments to grand corporate events, explore our comprehensive photography and videography services."
        heroImage={servicesHero}
      />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
    </PageLayout>
  );
};

export default ServicesPage;
