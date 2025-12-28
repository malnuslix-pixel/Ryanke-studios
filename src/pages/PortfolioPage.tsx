import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { CTASection } from '@/components/sections/CTASection';
import portfolioHero from '@/assets/portfolio-hero.jpg';

const PortfolioPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="Portfolio"
        subtitle="Our Featured Work"
        description="Explore our curated collection of visual stories across different platforms and categories."
        heroImage={portfolioHero}
      />
      <PortfolioSection />
      <CTASection />
    </PageLayout>
  );
};

export default PortfolioPage;
