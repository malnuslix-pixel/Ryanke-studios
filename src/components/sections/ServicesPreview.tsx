import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { Camera, Users, Building, Film, ArrowRight } from 'lucide-react';

const services = [
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
  return (
    <section className="relative py-24 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Our Services
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Professional Services for
              <span className="block text-accent mt-2">Every Vision</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                className="group card-luxury p-8 h-full text-center"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300 mb-6">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-text text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <Link to="/services">
              <motion.span
                className="inline-flex items-center gap-2 btn-outline-luxury"
                whileHover={{ scale: 1.02, gap: '12px' }}
                whileTap={{ scale: 0.98 }}
              >
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
