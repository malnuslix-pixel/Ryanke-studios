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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary/95 backdrop-blur-xl border-b border-accent/20 py-3 shadow-lg'
            : 'bg-primary/60 backdrop-blur-md py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={ryankeyLogo} 
                  alt="Ryankey Studios" 
                  className="h-10 md:h-12 w-auto"
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
              className="lg:hidden p-3 rounded-lg text-pure-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.85 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Full screen overlay with dark background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-primary lg:hidden"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <motion.nav
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full gap-8 px-6"
            >
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="overflow-hidden"
                  >
                    <motion.span
                      className={`font-heading text-4xl md:text-5xl font-bold tracking-tight transition-colors block ${
                        isActive ? 'text-accent' : 'text-pure-white hover:text-accent'
                      }`}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, x: 20, color: 'hsl(345 65% 45%)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {link.label}
                    </motion.span>
                  </a>
                );
              })}
              
              <motion.div
                className="flex flex-col items-center gap-5 mt-10 pt-10 border-t border-accent/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.a
                  href="tel:+254702340700"
                  className="flex items-center gap-3 text-accent font-semibold text-lg"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Phone size={22} />
                  </motion.span>
                  +254 702 340 700
                </motion.a>
                
                <motion.a
                  href="https://wa.me/254718445264?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-5 bg-accent text-accent-foreground font-bold text-lg rounded-lg shadow-wine"
                  whileHover={{ scale: 1.08, boxShadow: '0 20px 60px -10px hsl(345 65% 35% / 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                  <motion.span
                    animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
