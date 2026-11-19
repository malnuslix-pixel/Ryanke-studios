import type { Metadata } from 'next';
import PortfolioPage from '@/views/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio | Ryankey Studios - Featured Photography & Videography',
  description: 'Explore our curated collection of visual stories across Instagram, TikTok, and brand campaigns.',
};

export default function Page() {
  return <PortfolioPage />;
}
