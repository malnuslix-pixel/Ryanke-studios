import type { Metadata, Viewport } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import '@/index.css';
import { Providers } from '@/components/Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#8B2346',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ryankey Studios | Professional Photography, Videography, Drone & Documentaries Nairobi',
  description: "Ryankey Studios is Nairobi's premier creative studio specializing in corporate photography, family shoots, documentary filmmaking, drone cinematography, and events.",
  keywords: [
    'photography studio nairobi',
    'videography kenya',
    'documentary filmmaking nairobi',
    'drone services kenya',
    'aerial photography nairobi',
    'wedding photography',
    'corporate photography',
    'family photoshoot',
    'event coverage',
    'drone photography',
    'ryankey studios',
  ],
  authors: [{ name: 'Ryankey Studios' }],
  metadataBase: new URL('https://ryankeystudios.com'),
  alternates: {
    canonical: 'https://ryankeystudios.com',
  },
  icons: {
    icon: 'https://storage.googleapis.com/gpt-engineer-file-uploads/4K6sEY8KaqMUzPohzbV6ARfxKNg1/uploads/1766601878524-Ryankey logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://ryankeystudios.com',
    title: 'Ryankey Studios | Your Dream Studios - Professional Photography & Videography Nairobi',
    description: "Ryankey Studios is Nairobi's premier creative photography and videography studio. We specialize in corporate, family, events, and product photography",
    images: [
      {
        url: 'https://storage.googleapis.com/gpt-engineer-file-uploads/4K6sEY8KaqMUzPohzbV6ARfxKNg1/social-images/social-1767019549804-ceo ryankey pic3.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryankey Studios | Your Dream Studios - Professional Photography & Videography Nairobi',
    description: "Ryankey Studios is Nairobi's premier creative photography and videography studio. We specialize in corporate, family, events, and product photography",
    images: [
      'https://storage.googleapis.com/gpt-engineer-file-uploads/4K6sEY8KaqMUzPohzbV6ARfxKNg1/social-images/social-1767019549804-ceo ryankey pic3.png',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
