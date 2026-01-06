import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

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
  }, [location.pathname]);

  // Handle nav link click with smooth transition
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Small delay for mobile menu to close smoothly
    const delay = isMobileMenuOpen ? 200 : 0;
    
    setTimeout(() => {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, delay);
  }, [navigate, isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-primary backdrop-blur-xl border-b border-accent/20 py-2 sm:py-3 shadow-lg'
            : 'bg-primary backdrop-blur-md py-3 sm:py-4 md:py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="touch-manipulation"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={ryankeyLogo} 
                  alt="Ryankey Studios" 
                  className="h-8 sm:h-10 md:h-12 w-auto"
                />
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <motion.span
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive 
                          ? 'text-accent' 
                          : 'text-pure-white/90 hover:text-accent'
                      }`}
                      whileHover={{ y: -3, scale: 1.05, color: 'hsl(345 65% 45%)' }}
                      whileTap={{ scale: 0.92 }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.span>
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="tel:+254702340700"
                className="flex items-center gap-2 text-sm font-medium text-pure-white/90 hover:text-accent transition-colors"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Phone size={16} />
                </motion.span>
                <span className="hidden xl:inline">+254 702 340 700</span>
              </motion.a>
              <motion.a
                href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-semibold tracking-wide rounded-md hover:bg-accent/90 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.92 }}
              >
                Book Now
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2.5 sm:p-3 rounded-lg text-pure-white hover:bg-white/10 transition-colors touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
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

      {/* Mobile Menu - Full screen overlay with smooth animations */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-primary lg:hidden"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-accent/5 blur-3xl pointer-events-none"
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-center min-h-[100dvh] gap-4 xs:gap-5 sm:gap-6 px-6 py-16 sm:py-20 overflow-y-auto"
            >
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="overflow-hidden touch-manipulation w-full text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.05 + index * 0.05, 
                      duration: 0.35, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  >
                    <motion.span
                      className={`font-heading text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-200 block py-2 ${
                        isActive ? 'text-accent' : 'text-pure-white hover:text-accent/80'
                      }`}
                      whileTap={{ scale: 0.97, x: 8 }}
                    >
                      {link.label}
                    </motion.span>
                  </motion.a>
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
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone size={18} className="xs:w-5 xs:h-5" />
                  +254 702 340 700
                </motion.a>
                
                <motion.a
                  href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 sm:py-4 bg-accent text-accent-foreground font-bold text-sm xs:text-base sm:text-lg rounded-lg shadow-wine touch-manipulation active:scale-95 transition-transform"
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now
                  <ArrowUpRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
