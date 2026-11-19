'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user is on a touch/mobile device or prefers reduced motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // On touch/mobile devices, disable Lenis so native hardware-accelerated 120Hz smooth inertia scrolling is preserved
    if (isTouchDevice) {
      return;
    }

    // Initialize Lenis with enhanced smooth scrolling for desktop
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.3 : 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Handle resize for responsive behavior
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Handle popstate for back/forward navigation
    const handlePopstate = () => {
      lenis.scrollTo(0, { immediate: true });
    };
    
    window.addEventListener('popstate', handlePopstate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopstate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};
