import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import ryankeyLogo from '@/assets/ryankey-logo.png';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/ryankey_studios?igsh=NTZ2bXdjc3JwY240', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/1BKdQC3xD3/', label: 'Facebook' },
];

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Corporate Photography', href: '/services' },
      { name: 'Family Photoshoots', href: '/services' },
      { name: 'Event Coverage', href: '/services' },
      { name: 'Product Photography', href: '/services' },
      { name: 'Videography', href: '/services' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
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
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-6">
            <img src={ryankeyLogo} alt="Ryankey Studios" className="h-14 w-auto" />
            <p className="text-sm font-semibold text-accent tracking-wider uppercase">Your Dream Studios</p>
            <p className="text-primary-foreground/70 leading-relaxed max-w-sm text-sm">
              Ryankey Studios is a creative photography and videography studio specializing in high-quality visual storytelling. Established 2021.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <social.icon size={18} />
                </motion.a>
              ))}
              <motion.a href="https://www.tiktok.com/@_ryankey_" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="w-11 h-11 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <TikTokIcon />
              </motion.a>
              <motion.a href="https://wa.me/254718445264" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-11 h-11 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <WhatsAppIcon />
              </motion.a>
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-semibold text-sm tracking-[0.2em] uppercase mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-4">
            <h4 className="font-semibold text-sm tracking-[0.2em] uppercase mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+254702340700" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">+254 702 340 700 (Calls)</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:ryankeyimages@gmail.com" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">ryankeyimages@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">Nexus Business Centre,<br />Ruiru Bypass (Kamakis)</span>
              </li>
            </ul>
            <motion.a href="https://wa.me/254718445264" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors rounded-lg"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Book via WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">© {new Date().getFullYear()} Ryankey Studios. All rights reserved.</p>
            <motion.button onClick={scrollToTop} className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent transition-colors" whileHover={{ y: -2 }}>
              Back to top <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
