import type { Metadata } from 'next';
import GalleryPage from '@/views/GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery | Ryankey Studios - Visual Masterpieces & 3D Showcase',
  description: 'Immerse yourself in our stunning collection of professional photography showcasing our finest work.',
};

export default function Page() {
  return <GalleryPage />;
}
