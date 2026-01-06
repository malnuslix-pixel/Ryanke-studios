import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { Gallery3DCarousel } from '@/components/sections/Gallery3DCarousel';
import { CTASection } from '@/components/sections/CTASection';
import portfolioHero from '@/assets/portfolio-hero.jpg';

const GalleryPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="Gallery"
        subtitle="Visual Masterpieces"
        description="Immerse yourself in our stunning collection of professional photography showcasing our finest work."
        heroImage={portfolioHero}
      />
      <Gallery3DCarousel />
      <CTASection />
    </PageLayout>
  );
};

export default GalleryPage;
