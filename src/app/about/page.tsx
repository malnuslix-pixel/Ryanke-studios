import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Ryankey Studios - Professional Photography & Videography Nairobi',
  description: 'Discover the story behind Ryankey Studios and our passion for visual storytelling in Nairobi, Kenya.',
};

export default function Page() {
  return <AboutPage />;
}
