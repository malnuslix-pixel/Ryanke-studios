import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const ContactSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Decorations */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-px bg-accent" />
                Get in Touch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Let's Create
                <span className="block text-accent italic mt-2">Something Beautiful</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Ready to bring your vision to life? We'd love to hear from you. 
                Reach out and let's discuss how we can capture your story.
              </p>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.3}>
              <div className="space-y-6 pt-8">
                <motion.a
                  href="mailto:hello@visualstorytellers.com"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-accent transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium group-hover:text-accent transition-colors">
                      hello@visualstorytellers.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+15551234567"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-accent transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium group-hover:text-accent transition-colors">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Studio</p>
                    <p className="font-medium">
                      123 Artisan Lane, Creative District
                    </p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Contact Form */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-accent/20 -rotate-1" />

              <form className="relative bg-card p-8 lg:p-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium tracking-wide">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium tracking-wide">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide">
                    Service Interest
                  </label>
                  <select className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Sessions</option>
                    <option value="commercial">Commercial</option>
                    <option value="events">Corporate Events</option>
                    <option value="video">Videography</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Share your vision with us..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full btn-luxury group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Inquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
