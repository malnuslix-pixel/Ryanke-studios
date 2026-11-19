'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';

// Ultra Modern Instagram Icon
const InstagramIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Ultra Modern TikTok Icon
const TikTokIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
  </svg>
);

// Ultra Modern WhatsApp Icon
const WhatsAppIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.25zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/>
  </svg>
);

// Ultra Modern Facebook Icon
const FacebookIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
  </svg>
);

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  mainLink: string;
  color: string;
  hoverColor: string;
  glowColor: string;
  subLinks: { name: string; url: string }[];
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <InstagramIcon className="w-8 h-8" />,
    mainLink: 'https://www.instagram.com/ryankey_studios?igsh=NTZ2bXdjc3JwY240',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    hoverColor: 'group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-orange-300',
    glowColor: 'shadow-pink-500/50',
    subLinks: [
      { name: 'Family Session', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODk3NzA0ODUzMzY2NzM0?story_media_id=3454716158944991217_37072457765&igsh=MXBvaHRwZmdrOGh5' },
      { name: 'Baby Shoot', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc1MzAxNTY0MTkyMzkw?story_media_id=2962457443208578238_37072457765&igsh=MXNtMng5M2c1OGNuNg==' },
      { name: 'Corporate Events', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODYwMjQ4MDk1NDY3NDMy?story_media_id=3454724536614053263_37072457765&igsh=MWh2YTk0MWI1ZjBxYg==' },
      { name: 'Weddings', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI3OTI1MDExMjYyNzEz?story_media_id=3087957041271972433_37072457765&igsh=MWdrNzM3ejl5b214bg==' },
      { name: 'Portraits', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTMyMTMzMTExNDkwMDcz?story_media_id=2874283696442783612_37072457765&igsh=dnl0a2ttdmVpMnRv' },
    ],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-8 h-8" />,
    mainLink: 'https://wa.me/254718445264',
    color: 'from-green-400 to-green-600',
    hoverColor: 'group-hover:from-green-300 group-hover:to-green-500',
    glowColor: 'shadow-green-500/50',
    subLinks: [
      { name: 'View Catalogue', url: 'https://wa.me/c/254718445264' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <TikTokIcon className="w-8 h-8" />,
    mainLink: 'https://www.tiktok.com/@_ryankey_?_r=1&_t=ZM-92TLZOki7bw',
    color: 'from-gray-900 via-pink-500 to-cyan-400',
    hoverColor: 'group-hover:from-gray-800 group-hover:via-pink-400 group-hover:to-cyan-300',
    glowColor: 'shadow-cyan-500/50',
    subLinks: [
      { name: 'Studio Session', url: 'https://vm.tiktok.com/ZMHKPAmqwveTF-9OqJ3/' },
      { name: 'Weddings', url: 'https://vm.tiktok.com/ZMHKPAXLn7QF6-ZRVwZ/' },
      { name: 'Graduations', url: 'https://vm.tiktok.com/ZMHKPAbsMJfpG-3Xde7/' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <FacebookIcon className="w-8 h-8" />,
    mainLink: 'https://www.facebook.com/share/1BKdQC3xD3/',
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'group-hover:from-blue-400 group-hover:to-blue-600',
    glowColor: 'shadow-blue-500/50',
    subLinks: [],
  },
];

export const PortfolioSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section id="portfolio" ref={containerRef} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -left-20 bottom-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
      />

      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Portfolio
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Our Featured
              <span className="block text-accent mt-2">Work</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Explore our portfolio across different platforms. Click on any category to view our work.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Social Media Grid */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {socialPlatforms.map((platform, index) => (
            <ScrollReveal key={platform.name} delay={index * 0.1}>
              <motion.div
                id={platform.id}
                className="group relative scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Platform Card */}
                <div className="relative bg-card border border-border rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon with Ultra Modern Glow Effect */}
                  <motion.a
                    href={platform.mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br ${platform.color} text-white mb-6 transition-all duration-500 transform group-hover:scale-110 shadow-lg group-hover:shadow-2xl ${platform.glowColor} focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
                    whileHover={{ scale: 1.2, rotate: 8, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Visit ${platform.name}`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {platform.icon}
                    </motion.div>
                    {/* Pulse ring effect */}
                    <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-current" style={{ animationDuration: '2s' }} />
                  </motion.a>

                  {/* Platform Name */}
                  <h3 className="relative z-10 font-heading text-xl font-semibold text-center mb-4 group-hover:text-accent transition-colors">
                    {platform.name}
                  </h3>

                  {/* Sub Links */}
                  {platform.subLinks.length > 0 && (
                    <ul className="relative z-10 space-y-2">
                      {platform.subLinks.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + linkIndex * 0.1 }}
                        >
                          <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-all duration-300 py-2 px-3 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-accent/10"
                            whileHover={{ x: 5 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                            {link.name}
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* View All Link */}
                  <motion.a
                    href={platform.mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card rounded-lg py-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    View on {platform.name}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>

                  {/* Corner Decorations */}
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-lg" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
