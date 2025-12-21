import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const footerLinks = [
  {
    title: 'Services',
    links: ['Wedding Photography', 'Portrait Sessions', 'Commercial', 'Events', 'Videography'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Team', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Contact', 'FAQ', 'Privacy Policy', 'Terms of Service'],
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="font-serif text-2xl font-medium tracking-tight inline-block">
              Visual<span className="text-accent">.</span>Storytellers
            </a>
            <p className="text-primary-foreground/70 leading-relaxed max-w-sm">
              Crafting visual narratives that inspire, connect, and leave lasting impressions. 
              Your story deserves to be told beautifully.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-primary-foreground/20 hover:border-accent hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-medium text-sm tracking-[0.2em] uppercase mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-medium text-sm tracking-[0.2em] uppercase mb-6">
              Newsletter
            </h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Subscribe for updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-transparent border border-primary-foreground/20 focus:border-accent focus:outline-none text-sm transition-colors"
              />
              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-charcoal text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Visual Storytellers. All rights reserved.
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
