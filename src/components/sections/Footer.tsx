'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import ryankeyLogo from '@/assets/ryankey-logo.png';

// Colored Icons
const InstagramColoredIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <defs>
      <linearGradient id="footer-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#FCAF45" />
        <stop offset="50%" stopColor="#F77737" />
        <stop offset="75%" stopColor="#F56040" />
        <stop offset="100%" stopColor="#FD1D1D" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#footer-ig-gradient)" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5" />
    <circle cx="18" cy="6" r="1.2" fill="white" />
  </svg>
);

const FacebookColoredIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#1877F2"/>
  </svg>
);

const TikTokColoredIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" fill="#25F4EE"/>
    <path d="M15.54 3h-2.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-.5 0-.97-.14-1.37-.39a2.59 2.59 0 0 0 2.37 1.39c1.43 0 2.59-1.16 2.59-2.5V3.5h1.09z" fill="#FE2C55"/>
  </svg>
);

const WhatsAppColoredIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.25zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" fill="#25D366"/>
  </svg>
);

const socialLinks = [
  { icon: InstagramColoredIcon, href: 'https://www.instagram.com/ryankey_studios?igsh=NTZ2bXdjc3JwY240', label: 'Instagram' },
  { icon: FacebookColoredIcon, href: 'https://www.facebook.com/share/1BKdQC3xD3/', label: 'Facebook' },
  { icon: TikTokColoredIcon, href: 'https://www.tiktok.com/@_ryankey_', label: 'TikTok' },
  { icon: WhatsAppColoredIcon, href: 'https://wa.me/254718445264', label: 'WhatsApp' },
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
      { name: 'Gallery', href: '/gallery' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

export const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.phone_call || data.email)) {
          setSiteSettings(data);
        }
      })
      .catch(() => {});
  }, []);

  const phoneCall = siteSettings?.phone_call || '+254 702 340 700';
  const email = siteSettings?.email || 'ryankeyimages@gmail.com';
  const address1 = siteSettings?.address_line1 || 'Nexus Business Centre,';
  const address2 = siteSettings?.address_line2 || 'Ruiru Bypass (Kamakis)';
  const whatsappUrl = siteSettings?.whatsapp_url || 'https://wa.me/254718445264';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          <div className="lg:col-span-4 space-y-6">
            <img 
              src={(ryankeyLogo as any)?.src || ryankeyLogo} 
              alt="Ryankey Studios" 
              className="h-14 w-auto"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallback = (ryankeyLogo as any)?.src || ryankeyLogo;
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
            />
            <p className="text-sm font-semibold text-accent tracking-wider uppercase">Your Dream Studios</p>
            <p className="text-primary-foreground/70 leading-relaxed max-w-sm text-sm">
              Ryankey Studios is a creative photography and videography studio specializing in high-quality visual storytelling. Established 2021.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center border-2 border-primary-foreground/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  whileHover={{ scale: 1.1, y: -2 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-semibold text-sm tracking-[0.2em] uppercase mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}
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
                <a href={`tel:${phoneCall.replace(/\s/g, '')}`} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{phoneCall} (Calls)</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href={`mailto:${email}`} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">{address1}<br />{address2}</span>
              </li>
            </ul>
            <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors rounded-lg"
              whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <WhatsAppColoredIcon className="w-4 h-4" />
              Book via WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Ryankey Studios. All rights reserved.
            </p>
            <motion.button onClick={scrollToTop} className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent transition-colors" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              Back to top <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};