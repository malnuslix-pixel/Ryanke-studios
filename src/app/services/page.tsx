import type { Metadata } from 'next';
import ServicesPage from '@/views/ServicesPage';

export const metadata: Metadata = {
  title: 'Our Services | Ryankey Studios - Corporate, Events & Family Photography',
  description: 'From intimate family moments to grand corporate events, explore our comprehensive photography and videography services.',
};

export default function Page() {
  return <ServicesPage />;
}
