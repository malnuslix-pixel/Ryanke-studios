import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | Ryankey Studios - Book Your Photography Session',
  description: 'Get in touch with Ryankey Studios at Nexus Business Centre, Ruiru Bypass (Kamakis). Call or book via WhatsApp.',
};

export default function Page() {
  return <ContactPage />;
}
