'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold font-heading">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
