import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { Camera, Users, Building, Film, Sparkles, Plane, Palette, Video } from 'lucide-react';

const services = [
  {
    icon: Building,
    title: 'Corporate & Brand Photography',
    description: 'Elevate your brand with professional corporate imagery that commands attention and builds trust.',
    features: ['Brand Campaigns', 'Team Portraits', 'Office Photography'],
  },
  {
    icon: Users,
    title: 'Family & Lifestyle',
    description: 'Capture the warmth and connection of your family with natural, vibrant photography.',
    features: ['Family Photoshoots', 'Lifestyle Sessions', 'Maternity Shoots'],
  },
  {
    icon: Camera,
    title: 'Event Photography',
    description: 'Document your special events with professional precision and creative storytelling.',
    features: ['Baby Showers', 'Birthday Events', 'Corporate Events'],
  },
  {
    icon: Sparkles,
    title: 'Product Photography',
    description: 'Showcase your products with clean, vibrant images that drive sales and engagement.',
    features: ['E-commerce Shots', 'Catalog Images', 'Social Media Content'],
  },
  {
    icon: Film,
    title: 'Videography Services',
    description: 'Cinematic video production that brings your story to life through the power of motion.',
    features: ['Brand Videos', 'Social Media Reels', 'Documentary Style'],
  },
  {
    icon: Plane,
    title: 'Drone Services',
    description: 'Stunning aerial perspectives that add a breathtaking dimension to your visual content.',
    features: ['Aerial Photography', 'Drone Videography', 'Property Tours'],
  },
  {
    icon: Palette,
    title: 'Photo Retouching',
    description: 'Professional post-production that enhances your images to perfection.',
    features: ['Color Grading', 'Skin Retouching', 'Background Editing'],
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Cinematic editing that transforms raw footage into compelling visual stories.',
    features: ['Cinematic Editing', 'Color Grading', 'Social Media Formatting'],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-secondary/50">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
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

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
              From intimate family moments to grand corporate events, we offer comprehensive 
              photography and videography services tailored to bring your unique story to life.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={service.title}>
              <motion.div
                className="group card-luxury p-6 lg:p-8 h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <service.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
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
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Photography Style Note */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-16 p-8 bg-card border border-border/50">
            <p className="font-heading font-semibold text-lg mb-2">Our Photography Style</p>
            <p className="text-muted-foreground">
              Clean, vibrant, cinematic, natural-light focused, storytelling-driven visuals.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
