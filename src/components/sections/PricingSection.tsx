import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { Check, Star } from 'lucide-react';

const packages = [
  {
    name: 'Basic Package',
    price: 'Ksh 2,500',
    description: 'Ideal for individuals',
    features: [
      '45 minutes studio session',
      '1 outfit change',
      'Digital delivery via email and online gallery',
      '5 high end retouched photos',
    ],
    popular: false,
  },
  {
    name: 'Standard Package',
    price: 'Ksh 4,500',
    description: 'Perfect for individual portraits/couple shoot',
    features: [
      '1.5 hours studio session',
      '3 outfit changes',
      'Delivery via email and online gallery',
      '10 high end resolution images',
    ],
    popular: false,
  },
  {
    name: 'Premium Package',
    price: 'Ksh 6,500',
    description: 'Perfect for birthday photoshoot',
    features: [
      '2 hour studio session',
      '10 high end resolution images',
      'Full make-up application',
      'Advanced editing',
      'Digital delivery via email or online gallery',
      'Gowns available at extra cost (Ksh 1,500 each)',
    ],
    popular: true,
  },
  {
    name: 'Family Fun Package',
    price: 'Ksh 8,500',
    description: 'Great for families and small groups',
    features: [
      '2 hour studio session',
      '15 high-resolution edited images',
      'Advanced editing',
      'Digital delivery via email or online gallery',
      'A3 photo mount included',
    ],
    popular: false,
  },
  {
    name: 'Grand Luxe Package',
    price: 'Ksh 15,000',
    description: 'The ultimate experience',
    features: [
      '3 hours studio session',
      '30 high-resolution edited images',
      '2 outfits/gowns provided by the studio',
      'Professional full make-up and hairstyling',
      'Premium editing',
      'Digital delivery via email or online gallery',
      'A2 photo mount included',
    ],
    popular: false,
  },
  {
    name: 'Normal Events',
    price: 'Ksh 15,000',
    description: 'Coverage for Baby showers, Birthdays, etc.',
    features: [
      'Full event photography coverage',
      'Professional photo retouching',
      'Digital delivery',
      '*Videography package available separately',
    ],
    popular: false,
  },
];

const notes = [
  'We request a redeemable, unrefundable 50% deposit on booking of a slot',
  'Extra photo from any package is charged Ksh 400',
  'We highly recommend punctuality',
  'Custom packages available upon request',
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 lg:py-40 bg-secondary/30">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
              <span className="w-8 h-0.5 bg-accent" />
              Pricing
              <span className="w-8 h-0.5 bg-accent" />
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
              Studio Rate
              <span className="block text-accent mt-2">Card</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
              Professional yet affordable packages tailored to your needs. 
              Custom packages are also available for brands and special requirements.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="container mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <StaggerItem key={pkg.name}>
              <motion.div
                className={`relative card-luxury p-8 h-full flex flex-col ${
                  pkg.popular ? 'border-accent ring-2 ring-accent/20' : ''
                }`}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-accent">
                      {pkg.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/254718445264?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full py-3 text-center font-semibold text-sm tracking-wider uppercase transition-all duration-300 block ${
                    pkg.popular
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'border-2 border-foreground/20 text-foreground hover:border-accent hover:text-accent'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book This Package
                </motion.a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Notes */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 p-8 bg-card border border-border/50">
            <h4 className="font-heading font-semibold text-lg mb-4 text-center">Please Note</h4>
            <ul className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Monthly Retainer CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for ongoing brand photography support?
            </p>
            <motion.a
              href="https://wa.me/254718445264?text=I'm%20interested%20in%20the%20Monthly%20Retainer%20package%20for%20my%20brand"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury inline-flex"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Inquire About Monthly Retainer</span>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
