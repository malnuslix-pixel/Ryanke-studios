import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { BrandMarquee } from '@/components/BrandMarquee';

const Index = () => {
  useSmoothScroll();

  return (
    <main className="relative">
      {/* Subtle grain overlay for luxury feel */}
      <div className="grain-overlay" />
      
      <Navigation />
      <HeroSection />
      <BrandMarquee />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
