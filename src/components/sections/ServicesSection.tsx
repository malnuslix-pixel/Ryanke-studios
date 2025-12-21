import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { Camera, Heart, Users, Building, Film, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Wedding Photography',
    description: 'Capturing the magic of your special day with timeless elegance and emotional depth.',
    features: ['Full Day Coverage', 'Engagement Sessions', 'Album Design'],
  },
  {
    icon: Camera,
    title: 'Portrait Sessions',
    description: 'Professional portraits that reveal your authentic self with artistic sophistication.',
    features: ['Individual Portraits', 'Family Sessions', 'Creative Concepts'],
  },
  {
    icon: Building,
    title: 'Commercial',
    description: 'Elevate your brand with striking imagery that commands attention and drives results.',
    features: ['Product Photography', 'Brand Campaigns', 'Architectural'],
  },
  {
    icon: Users,
    title: 'Corporate Events',
    description: 'Document your corporate milestones with professional precision and creative flair.',
    features: ['Conferences', 'Team Portraits', 'Corporate Events'],
  },
  {
    icon: Film,
    title: 'Videography',
    description: 'Cinematic storytelling that brings your vision to life through the power of motion.',
    features: ['Wedding Films', 'Brand Videos', 'Documentary'],
  },
  {
    icon: Sparkles,
    title: 'Creative Direction',
    description: 'Full-service creative consultation to conceptualize and execute your visual narrative.',
    features: ['Concept Development', 'Art Direction', 'Styling'],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 lg:py-48 bg-secondary/30">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Our Services
              <span className="w-8 h-px bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mt-6">
              Exceptional Services for
              <span className="block text-accent italic mt-2">Every Vision</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
              From intimate moments to grand celebrations, we offer a comprehensive 
              suite of visual services tailored to bring your unique story to life.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <StaggerItem key={service.title}>
              <motion.div
                className="group card-luxury p-8 lg:p-10 h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 flex items-center justify-center border border-border group-hover:border-accent/50 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="absolute -inset-2 border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-medium mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li 
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Indicator */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <motion.span
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                  </motion.span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
