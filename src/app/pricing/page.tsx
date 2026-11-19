import type { Metadata } from 'next';
import PricingPage from '@/views/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing | Ryankey Studios - Transparent Studio Rate Card',
  description: 'Professional yet affordable packages tailored to your needs. Studio and outdoor photoshoot rates in Nairobi.',
};

export default function Page() {
  return <PricingPage />;
}
