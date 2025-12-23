import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Instagram, MessageCircle, Facebook } from 'lucide-react';

// TikTok SVG Icon Component
const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  mainLink: string;
  color: string;
  hoverColor: string;
  subLinks: { name: string; url: string }[];
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8" />,
    mainLink: 'https://www.instagram.com/ryankey_studios?igsh=NTZ2bXdjc3JwY240',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    hoverColor: 'group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-orange-300',
    subLinks: [
      { name: 'Family Session', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODk3NzA0ODUzMzY2NzM0?story_media_id=3454716158944991217_37072457765&igsh=MXBvaHRwZmdrOGh5' },
      { name: 'Baby Shoot', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc1MzAxNTY0MTkyMzkw?story_media_id=2962457443208578238_37072457765&igsh=MXNtMng5M2c1OGNuNg==' },
      { name: 'Corporate Events', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODYwMjQ4MDk1NDY3NDMy?story_media_id=3454724536614053263_37072457765&igsh=MWh2YTk0MWI1ZjBxYg==' },
      { name: 'Weddings', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI3OTI1MDExMjYyNzEz?story_media_id=3087957041271972433_37072457765&igsh=MWdrNzM3ejl5b214bg==' },
      { name: 'Portraits', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTMyMTMzMTExNDkwMDcz?story_media_id=2874283696442783612_37072457765&igsh=dnl0a2ttdmVpMnRv' },
    ],
  },
  {
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-8 h-8" />,
    mainLink: 'https://wa.me/254718445264',
    color: 'from-green-500 to-green-600',
    hoverColor: 'group-hover:from-green-400 group-hover:to-green-500',
    subLinks: [
      { name: 'View Catalogue', url: 'https://wa.me/c/254718445264' },
    ],
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon className="w-8 h-8" />,
    mainLink: 'https://www.tiktok.com/@_ryankey_?_r=1&_t=ZM-92TLZOki7bw',
    color: 'from-black via-pink-500 to-cyan-400',
    hoverColor: 'group-hover:from-gray-800 group-hover:via-pink-400 group-hover:to-cyan-300',
    subLinks: [
      { name: 'Studio Session', url: 'https://vm.tiktok.com/ZMHKPAmqwveTF-9OqJ3/' },
      { name: 'Weddings', url: 'https://vm.tiktok.com/ZMHKPAXLn7QF6-ZRVwZ/' },
      { name: 'Graduations', url: 'https://vm.tiktok.com/ZMHKPAbsMJfpG-3Xde7/' },
    ],
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-8 h-8" />,
    mainLink: 'https://www.facebook.com/share/1BKdQC3xD3/',
    color: 'from-blue-600 to-blue-700',
    hoverColor: 'group-hover:from-blue-500 group-hover:to-blue-600',
    subLinks: [],
  },
];

export const PortfolioSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="portfolio" ref={containerRef} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        style={{ y: y1 }}
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
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Platform Card */}
                <div className="relative bg-card border border-border rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.a
                    href={platform.mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br ${platform.color} text-white mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit ${platform.name}`}
                  >
                    {platform.icon}
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
