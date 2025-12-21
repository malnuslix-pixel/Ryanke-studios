import { motion } from 'framer-motion';
import { Instagram, Facebook, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import ryankeyLogo from '@/assets/ryankey-logo.png';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/ryankeystudios', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/RyankeyStudios', label: 'Facebook' },
];

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Corporate Photography', href: '#services' },
      { name: 'Family Photoshoots', href: '#services' },
      { name: 'Event Coverage', href: '#services' },
      { name: 'Product Photography', href: '#services' },
      { name: 'Videography', href: '#services' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Contact', href: '#contact' },
    ],
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <img 
              src={ryankeyLogo} 
              alt="Ryankey Studios" 
              className="h-14 w-auto"
            />
            <p className="text-sm font-semibold text-accent tracking-wider uppercase">
              Your Dream Studios
            </p>
            <p className="text-primary-foreground/70 leading-relaxed max-w-sm text-sm">
              Ryankey Studios is a creative photography and videography studio 
              specializing in high-quality visual storytelling. Established 2021.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
              {/* TikTok */}
              <motion.a
                href="https://www.tiktok.com/@ryankeystudios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent transition-colors text-sm font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                TT
              </motion.a>
              {/* YouTube */}
              <motion.a
                href="https://www.youtube.com/@RyankeyStudios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent transition-colors text-sm font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                YT
              </motion.a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-semibold text-sm tracking-[0.2em] uppercase mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold text-sm tracking-[0.2em] uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:0702340700" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  0702 340 700
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:ryankeyimages@gmail.com" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  ryankeyimages@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Nexus Business Centre,<br />
                  Ruiru Bypass (Kamakis)
                </span>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/254702340700"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book via WhatsApp
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Ryankey Studios. All rights reserved.
            </p>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent transition-colors"
              whileHover={{ y: -2 }}
            >
              Back to top
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
