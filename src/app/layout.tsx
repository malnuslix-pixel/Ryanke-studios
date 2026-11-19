import type { Metadata, Viewport } from 'next';
import '@/index.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
  themeColor: '#8B2346',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ryankey Studios | Your Dream Studios - Professional Photography & Videography Nairobi',
  description: "Ryankey Studios is Nairobi's premier creative photography and videography studio. We specialize in corporate, family, events, and product photography",
  keywords: [
    'photography studio nairobi',
    'videography kenya',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
