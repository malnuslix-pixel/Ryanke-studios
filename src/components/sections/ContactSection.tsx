import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export const ContactSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    duration: '',
    details: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp message
    const message = `*New Booking Request*%0A%0A` +
      `*Name:* ${formData.name || 'Not provided'}%0A` +
      `*Phone:* ${formData.phone || 'Not provided'}%0A` +
      `*Service:* ${formData.service || 'Not specified'}%0A` +
      `*Preferred Date:* ${formData.date || 'Not specified'}%0A` +
      `*Duration:* ${formData.duration || 'Not specified'}%0A` +
      `*Details:* ${formData.details || 'None'}`;
    
    window.open(`https://wa.me/254718445264?text=${message}`, '_blank');
  };

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent">
                <span className="w-8 h-0.5 bg-accent" />
                Get in Touch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
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
              <div className="space-y-4 sm:space-y-6 pt-4">
                <motion.a
                  href="tel:+254702340700"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <Phone className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </motion.div>
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
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all"
                    whileHover={{ rotate: -10 }}
                  >
                    <Mail className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      ryankeyimages@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Studio Location</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      Nexus Business Centre, Ruiru Bypass (Kamakis)
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8 }}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
              <motion.div 
                className="absolute -inset-4 border-2 border-accent/20 -rotate-1"
                whileHover={{ rotate: 0, borderColor: 'hsl(345 65% 35% / 0.4)' }}
                transition={{ duration: 0.3 }}
              />

              <form onSubmit={handleSubmit} className="relative bg-card p-6 sm:p-8 lg:p-12 space-y-5 sm:space-y-6 rounded-lg">
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground">Book a Session</h3>
                
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 rounded-md focus:shadow-lg focus:shadow-accent/10"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 rounded-md focus:shadow-lg focus:shadow-accent/10"
                    placeholder="0712 345 678"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Event / Project Type
                  </label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 appearance-none cursor-pointer rounded-md focus:shadow-lg focus:shadow-accent/10"
                  >
                    <option value="">Select a service</option>
                    <option value="Portrait Session">Portrait Session</option>
                    <option value="Family Photoshoot">Family Photoshoot</option>
                    <option value="Corporate Photography">Corporate Photography</option>
                    <option value="Event Coverage">Event Coverage</option>
                    <option value="Product Photography">Product Photography</option>
                    <option value="Videography">Videography</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 rounded-md focus:shadow-lg focus:shadow-accent/10"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                      Duration
                    </label>
                    <select 
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 appearance-none cursor-pointer rounded-md focus:shadow-lg focus:shadow-accent/10"
                    >
                      <option value="">Select duration</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="1.5 hours">1.5 hours</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="Full Day">Full Day</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Additional Details
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border-2 border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 resize-none rounded-md focus:shadow-lg focus:shadow-accent/10"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full btn-cta text-center flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Send Booking Request
                </motion.button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  *Form opens WhatsApp with your details. 50% deposit required to confirm booking.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
