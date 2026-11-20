'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight } from 'lucide-react';

// Ultra Modern Instagram Icon
const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Ultra Modern TikTok Icon
const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
  </svg>
);

// Ultra Modern WhatsApp Icon
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.25zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/>
  </svg>
);

// Ultra Modern Facebook Icon
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
  </svg>
);

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  coloredIcon: React.ReactNode;
  portfolioLink: string;
  color: string;
  glowColor: string;
}

// Colored Icons for branding
const InstagramColoredIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#FCAF45" />
        <stop offset="50%" stopColor="#F77737" />
        <stop offset="75%" stopColor="#F56040" />
        <stop offset="100%" stopColor="#FD1D1D" />
      </linearGradient>
      <linearGradient id="instagram-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#C13584" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5" />
    <circle cx="18" cy="6" r="1.2" fill="white" />
  </svg>
);

const TikTokColoredIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" fill="#25F4EE"/>
    <path d="M15.54 3h-2.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-.5 0-.97-.14-1.37-.39a2.59 2.59 0 0 0 2.37 1.39c1.43 0 2.59-1.16 2.59-2.5V3.5h1.09z" fill="#FE2C55"/>
  </svg>
);

const WhatsAppColoredIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.25zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" fill="#25D366"/>
  </svg>
);

const FacebookColoredIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#1877F2"/>
  </svg>
);

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Instagram',
    icon: <InstagramIcon className="w-6 h-6" />,
    coloredIcon: <InstagramColoredIcon className="w-7 h-7" />,
    portfolioLink: '/portfolio#instagram',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    glowColor: 'shadow-pink-500/50',
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon className="w-6 h-6" />,
    coloredIcon: <TikTokColoredIcon className="w-7 h-7" />,
    portfolioLink: '/portfolio#tiktok',
    color: 'from-gray-900 via-pink-500 to-cyan-400',
    glowColor: 'shadow-cyan-500/50',
  },
  {
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-6 h-6" />,
    coloredIcon: <WhatsAppColoredIcon className="w-7 h-7" />,
    portfolioLink: '/portfolio#whatsapp',
    color: 'from-green-400 to-green-600',
    glowColor: 'shadow-green-500/50',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon className="w-6 h-6" />,
    coloredIcon: <FacebookColoredIcon className="w-7 h-7" />,
    portfolioLink: '/portfolio#facebook',
    color: 'from-blue-500 to-blue-700',
    glowColor: 'shadow-blue-500/50',
  },
];

// Duplicate for seamless marquee loop
const doubledPlatforms = [...socialPlatforms, ...socialPlatforms, ...socialPlatforms, ...socialPlatforms];

export const PortfolioPreview = () => {
  return (
    <section className="relative z-20 py-12 sm:py-16 lg:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent">
                <span className="w-6 sm:w-8 h-0.5 bg-accent" />
                Portfolio
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-4 sm:mt-6">
                Our Featured
                <span className="text-accent ml-2 sm:ml-3">Work</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 sm:mt-6 max-w-xl">
                Connect with us across all platforms. Explore our work, get inspired, and stay updated with our latest projects.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <Link href="/portfolio" className="inline-block">
              <motion.span
                className="inline-flex items-center gap-2 btn-outline-luxury"
                whileTap={{ scale: 0.98 }}
              >
                View Full Portfolio
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Social Media Marquee */}
        <ScrollReveal delay={0.25}>
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Marquee container */}
            <div className="overflow-hidden py-3 sm:py-4">
              <motion.div
                className="flex gap-3 sm:gap-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {doubledPlatforms.map((platform, index) => (
                  <Link
                    key={`${platform.name}-${index}`}
                    href={platform.portfolioLink}
                    className="touch-manipulation"
                  >
                    <motion.div
                      className="group relative flex-shrink-0"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`relative flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3 sm:py-5 bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl ${platform.glowColor}`}>
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                        
                        {/* Colored Icon */}
                        <motion.div
                          className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-background/80 shadow-lg"
                        >
                          <span className="scale-75 sm:scale-100">{platform.coloredIcon}</span>
                          {/* Pulse effect */}
                          <span className={`absolute inset-0 rounded-lg sm:rounded-xl animate-ping opacity-20 bg-gradient-to-br ${platform.color}`} style={{ animationDuration: '2s' }} />
                        </motion.div>
                        
                        {/* Platform name */}
                        <div className="relative z-10">
                          <span className="font-heading text-sm sm:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                            {platform.name}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent/80 transition-colors">
                            <span className="hidden sm:inline">View Portfolio</span>
                            <span className="sm:hidden">View</span>
                            <span>→</span>
                          </div>
                        </div>
                        
                        {/* Corner decorations - hidden on mobile */}
                        <div className="hidden sm:block absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg" />
                        <div className="hidden sm:block absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-lg" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Second marquee row - reverse direction */}
        <ScrollReveal delay={0.3}>
          <div className="relative mt-3 sm:mt-4">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Reverse marquee */}
            <div className="overflow-hidden py-3 sm:py-4">
              <motion.div
                className="flex gap-3 sm:gap-6"
                animate={{ x: ['-50%', '0%'] }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {doubledPlatforms.map((platform, index) => (
                  <Link
                    key={`reverse-${platform.name}-${index}`}
                    href={platform.portfolioLink}
                    className="touch-manipulation"
                  >
                    <motion.div
                      className="group relative flex-shrink-0"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`relative flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3 sm:py-5 bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl ${platform.glowColor}`}>
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                        
                        {/* Colored Icon */}
                        <motion.div
                          className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-background/80 shadow-lg"
                        >
                          <span className="scale-75 sm:scale-100">{platform.coloredIcon}</span>
                          <span className={`absolute inset-0 rounded-lg sm:rounded-xl animate-ping opacity-20 bg-gradient-to-br ${platform.color}`} style={{ animationDuration: '2.5s' }} />
                        </motion.div>
                        
                        {/* Platform name */}
                        <div className="relative z-10">
                          <span className="font-heading text-sm sm:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                            {platform.name}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent/80 transition-colors">
                            <span>Explore</span>
                            <span>→</span>
                          </div>
                        </div>
                        
                        {/* Corner decorations - hidden on mobile */}
                        <div className="hidden sm:block absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg" />
                        <div className="hidden sm:block absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-lg" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
