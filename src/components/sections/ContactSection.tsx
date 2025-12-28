import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import brianAbuga2 from '@/assets/brian-abuga-2.png';

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
      className="relative py-24 lg:py-40 overflow-hidden"
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
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-0.5 bg-accent" />
                Get in Touch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Let's Create
                <span className="block text-accent mt-2">Something Beautiful</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base md:text-lg text-body-text leading-relaxed max-w-md">
                Ready to bring your vision to life? We'd love to hear from you. 
                Reach out via WhatsApp or call us to discuss your project.
              </p>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.3}>
              <div className="space-y-6 pt-4">
                <motion.a
                  href="tel:+254702340700"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Phone className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone (Calls Only)</p>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      +254 702 340 700
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:ryankeyimages@gmail.com"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all">
                    <Mail className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      ryankeyimages@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Studio Location</p>
                    <p className="font-semibold text-foreground">
                      Nexus Business Centre, Ruiru Bypass (Kamakis)
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Business Hours</p>
                    <p className="font-semibold text-foreground">
                      Mon – Sat | 8:00 AM – 6:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* WhatsApp CTA */}
            <ScrollReveal delay={0.4}>
              <motion.a
                href="https://wa.me/254718445264"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </motion.a>
            </ScrollReveal>
          </div>

          {/* Right Content - Booking Form */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-accent/20 -rotate-1" />

              <div className="relative bg-card p-8 lg:p-12 space-y-6 rounded-lg">
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground">Book a Session</h3>
                
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors rounded-md"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors rounded-md"
                    placeholder="0712 345 678"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Event / Project Type
                  </label>
                  <select className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer rounded-md">
                    <option value="">Select a service</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="family">Family Photoshoot</option>
                    <option value="corporate">Corporate Photography</option>
                    <option value="event">Event Coverage</option>
                    <option value="product">Product Photography</option>
                    <option value="video">Videography</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                      Duration
                    </label>
                    <select className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer rounded-md">
                      <option value="">Select duration</option>
                      <option value="45min">45 minutes</option>
                      <option value="1.5hr">1.5 hours</option>
                      <option value="2hr">2 hours</option>
                      <option value="3hr">3 hours</option>
                      <option value="full-day">Full Day</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Additional Details
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-colors resize-none rounded-md"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.a
                  href="https://wa.me/254718445264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-cta text-center block"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Send Booking Request
                </motion.a>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  *Form opens WhatsApp with your details. 50% deposit required to confirm booking.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
