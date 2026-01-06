import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import GalleryPage from "./pages/GalleryPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Enhanced scroll management with back/forward support
const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  
  useLayoutEffect(() => {
    // Handle scroll restoration based on navigation type
    if (navigationType === 'POP') {
      // For back/forward navigation, let browser handle scroll or reset
      const scrollPosition = sessionStorage.getItem(`scroll-${key}`);
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
    } else {
      // For push navigation, scroll to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, key, navigationType]);

  // Save scroll position before leaving
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY));
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [key]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
