import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactSection } from '@/components/sections/ContactSection';
import { MapSection } from '@/components/sections/MapSection';

const ContactPage = () => {
  useSmoothScroll();

  return (
    <PageLayout>
      <PageHeader 
        title="Contact"
        subtitle="Let's Create Something Beautiful"
        description="Ready to bring your vision to life? Reach out to discuss your project."
      />
      <ContactSection />
      <MapSection />
    </PageLayout>
  );
};

export default ContactPage;
