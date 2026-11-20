'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;
let rafId: number | null = null;
let subscribers = 0;
let isLoopRunning = false;

function startRafLoop() {
  if (isLoopRunning) return;
  isLoopRunning = true;

  function raf(time: number) {
    if (!isLoopRunning || !globalLenis) {
      isLoopRunning = false;
      return;
    }

    try {
      globalLenis.raf(time);
    } catch {
      // Guard against internal lenis errors during transitions
    }

    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

function stopRafLoop() {
  isLoopRunning = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(globalLenis);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if user is on a touch/mobile device or prefers reduced motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // On touch/mobile devices, disable Lenis so native hardware-accelerated inertia scrolling is preserved
    if (isTouchDevice) {
      return;
    }

    subscribers++;

    if (!globalLenis) {
      try {
        globalLenis = new Lenis({
          duration: prefersReducedMotion ? 0.3 : 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          infinite: false,
          autoResize: true,
        });
        startRafLoop();
      } catch {
        // Fallback gracefully to native scroll
        globalLenis = null;
      }
    } else {
      // Re-measure dimensions for the newly mounted page
      try {
        globalLenis.resize();
        globalLenis.scrollTo(0, { immediate: true });
      } catch {}
    }

    lenisRef.current = globalLenis;

    const handleResize = () => {
      try {
        globalLenis?.resize();
      } catch {}
    };

    const handlePopstate = () => {
      try {
        globalLenis?.scrollTo(0, { immediate: true });
      } catch {}
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopstate);

      subscribers = Math.max(0, subscribers - 1);

      // Delay teardown slightly to prevent destroying during route cross-fade
      if (subscribers === 0) {
        setTimeout(() => {
          if (subscribers === 0 && globalLenis) {
            stopRafLoop();
            try {
              globalLenis.destroy();
            } catch {}
            globalLenis = null;
          }
        }, 100);
      }
    };
  }, []);

  return lenisRef;
};
