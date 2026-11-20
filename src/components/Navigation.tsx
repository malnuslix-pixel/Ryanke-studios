'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import ryankeyLogo from '@/assets/ryankey-logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle nav link click with smooth transition
  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    
    // Small delay for mobile menu to close smoothly
    const delay = isMobileMenuOpen ? 200 : 0;
    
    setTimeout(() => {
      router.push(href);
    }, delay);
  }, [router, isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'glass-nav py-2 sm:py-3'
            : 'bg-primary/90 backdrop-blur-md py-3 sm:py-4 md:py-5'
        }`}
      >
        {/* Animated gradient border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          animate={{ 
            opacity: isScrolled ? 1 : 0,
            scaleX: isScrolled ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo with hover glow */}
            <Link 
              href="/"
              className="touch-manipulation relative group"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect behind logo */}
                <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={(ryankeyLogo as any)?.src || ryankeyLogo} 
                  alt="Ryankey Studios" 
                  className="h-8 sm:h-10 md:h-12 w-auto relative z-10"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation with animated underlines and hovers */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredLink === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative"
                  >
                    <motion.span
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 block ${
                        isActive 
                          ? 'text-accent' 
                          : 'text-pure-white/90 hover:text-accent'
                      }`}
                      whileHover={{ y: -4, scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      {/* Hover glow background */}
                      <motion.span
                        className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.8
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {link.label}
                      
                      {/* Animated underline */}
                      <motion.span
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-accent to-wine-light"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ originX: 0 }}
                      />
                    </motion.span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons with enhanced animations */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="tel:+254702340700"
                className="flex items-center gap-2 text-sm font-medium text-pure-white/90 hover:text-accent transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Phone size={16} />
                  {/* Phone glow effect */}
                  <span className="absolute inset-0 bg-accent blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                </motion.span>
                <span className="hidden xl:inline">+254 702 340 700</span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-semibold tracking-wide rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.08, y: -3, boxShadow: '0 10px 40px -10px hsl(345 65% 35% / 0.6)' }}
                whileTap={{ scale: 0.92 }}
              >
                {/* Animated gradient background on hover */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-accent via-wine-light to-accent opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                />
                <span className="relative z-10">Book Now</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>

            {/* Mobile Menu Button with animation */}
            <motion.button
              className="lg:hidden p-2.5 sm:p-3 rounded-lg text-pure-white hover:bg-white/10 transition-colors touch-manipulation relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Glow effect */}
              <span className="absolute inset-0 bg-accent/20 rounded-lg blur-lg opacity-0 hover:opacity-100 transition-opacity" />
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} className="sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Full screen overlay with morphing gradient */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-primary lg:hidden overflow-hidden"
          >
            {/* Morphing gradient decorative elements */}
            <div className="absolute inset-0 bg-gradient-morph opacity-30" />
            <motion.div
              className="absolute top-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-accent/15 blur-3xl pointer-events-none"
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.15, 0.3, 0.15],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none"
              animate={{ 
                scale: [1.2, 1, 1.2], 
                opacity: [0.1, 0.2, 0.1],
                x: [0, -20, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-center min-h-[100dvh] gap-4 xs:gap-5 sm:gap-6 px-6 py-16 sm:py-20 overflow-y-auto relative z-10"
            >
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    className="overflow-hidden touch-manipulation w-full text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.05 + index * 0.05, 
                      duration: 0.35, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                    >
                      <motion.span
                        className={`font-heading text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 block py-2 relative ${
                          isActive ? 'text-accent' : 'text-pure-white'
                        }`}
                        whileHover={{ scale: 1.05, x: 10, color: 'hsl(345, 65%, 45%)' }}
                        whileTap={{ scale: 0.97, x: 8 }}
                      >
                        {/* Hover gradient underline */}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-wine-light group-hover:w-1/2 transition-all duration-300" />
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                className="flex flex-col items-center gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-accent/20 w-full max-w-[280px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                <motion.a
                  href="tel:+254702340700"
                  className="flex items-center gap-2.5 text-accent font-semibold text-sm xs:text-base sm:text-lg touch-manipulation py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone size={18} className="xs:w-5 xs:h-5" />
                  +254 702 340 700
                </motion.a>
                
                <motion.a
                  href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden flex items-center justify-center gap-2.5 w-full px-6 py-3.5 sm:py-4 bg-accent text-accent-foreground font-bold text-sm xs:text-base sm:text-lg rounded-lg shadow-wine touch-manipulation"
                  whileHover={{ scale: 1.03, boxShadow: '0 15px 50px -10px hsl(345 65% 35% / 0.6)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Shimmer effect */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Book Now</span>
                  <ArrowUpRight className="w-4 h-4 xs:w-5 xs:h-5 relative z-10" />
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
