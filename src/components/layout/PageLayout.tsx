import { ReactNode } from 'react';
import { Navigation } from '../Navigation';
import { Footer } from '../sections/Footer';
import { WhatsAppWidget } from '../WhatsAppWidget';
import { PageTransition } from '../PageTransition';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <div className="grain-overlay" />
      <Navigation />
      <PageTransition>
        <main className="min-h-screen">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <WhatsAppWidget />
    </>
  );
};
