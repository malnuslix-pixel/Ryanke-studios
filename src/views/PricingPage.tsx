'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';
import pricingHero from '@/assets/pricing-hero.webp';

const PricingPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="Pricing"
        subtitle="Studio Rate Card"
        description="Professional yet affordable packages tailored to your needs. Custom packages available for brands and special requirements."
        heroImage={pricingHero}
      />
      <PricingSection />
      <CTASection />
    </PageLayout>
  );
};

export default PricingPage;
