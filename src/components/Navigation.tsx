import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import ryankeyLogo from '@/assets/ryankey-logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const showTransparentBg = isHomePage && !isScrolled;

  // Handle nav link click - scroll to top
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Scroll to top with smooth animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate after a brief delay for visual feedback
    setTimeout(() => {
      navigate(href);
    }, 100);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-primary/98 backdrop-blur-xl border-b border-accent/20 py-2 sm:py-3 shadow-lg'
            : 'bg-primary/70 backdrop-blur-md py-3 sm:py-4 md:py-5'
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-primary lg:hidden overflow-y-auto"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-accent/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-accent/5 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-center min-h-screen gap-5 sm:gap-7 px-6 py-20"
            >
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="overflow-hidden touch-manipulation"
                  >
                    <motion.span
                      className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors block ${
                        isActive ? 'text-accent' : 'text-pure-white'
                      }`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.95, x: 10 }}
                      transition={{ delay: 0.1 + index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {link.label}
                    </motion.span>
                  </a>
                );
              })}
              
              <motion.div
                className="flex flex-col items-center gap-4 sm:gap-5 mt-6 sm:mt-10 pt-6 sm:pt-10 border-t border-accent/20 w-full max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <motion.a
                  href="tel:+254702340700"
                  className="flex items-center gap-3 text-accent font-semibold text-base sm:text-lg touch-manipulation"
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={20} className="sm:w-[22px] sm:h-[22px]" />
                  +254 702 340 700
                </motion.a>
                
                <motion.a
                  href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 sm:px-10 py-4 sm:py-5 bg-accent text-accent-foreground font-bold text-base sm:text-lg rounded-lg shadow-wine touch-manipulation"
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
