'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { Camera, Users, Building, Film, ArrowRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  Building,
  Users,
  Camera,
  Film,
};

const defaultServices = [
  {
    icon: Building,
    title: 'Corporate & Brand',
    description: 'Professional corporate imagery that commands attention.',
  },
  {
    icon: Users,
    title: 'Family & Lifestyle',
    description: 'Capture warmth and connection with natural photography.',
  },
  {
    icon: Camera,
    title: 'Event Photography',
    description: 'Document your special events with creative storytelling.',
  },
  {
    icon: Film,
    title: 'Videography',
    description: 'Cinematic video production for your visual story.',
  },
];

export const ServicesPreview = () => {
  const [liveServices, setLiveServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/services')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((s: any) => s.is_active).slice(0, 4);
          if (activeOnly.length > 0) {
            setLiveServices(
              activeOnly.map((s: any) => ({
                icon: iconMap[s.icon] || Camera,
                title: s.title,
                description: s.description,
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  const services = liveServices.length > 0 ? liveServices : defaultServices;
  return (
    <section className="relative py-16 sm:py-24 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <ScrollReveal>
            <motion.span 
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="w-8 h-0.5 bg-accent"
                whileHover={{ width: 48 }}
              />
              Our Services
              <motion.span 
                className="w-8 h-0.5 bg-accent"
                whileHover={{ width: 48 }}
              />
            </motion.span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Professional Services for
              <motion.span 
                className="block text-accent mt-2"
                whileHover={{ scale: 1.02 }}
              >
                Every Vision
              </motion.span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {services.map((service, index) => (
            <StaggerItem key={service.title}>
              <motion.div
                className="group card-luxury p-4 sm:p-8 h-full text-center cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300 mb-4 sm:mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </motion.div>
                <h3 className="font-heading text-sm sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-text text-xs sm:text-sm leading-relaxed hidden sm:block">
                  {service.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <Link href="/services">
              <motion.span
                className="inline-flex items-center gap-2 btn-outline-luxury"
                whileHover={{ scale: 1.05, gap: '14px' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Services
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
