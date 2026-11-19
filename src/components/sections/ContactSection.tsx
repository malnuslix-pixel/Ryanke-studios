'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ScrollReveal } from '../ScrollReveal';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Sparkles, CalendarIcon, AlertCircle, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
}

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
    date: undefined as Date | undefined,
    duration: '',
    details: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const validateField = (name: string, value: string | Date | undefined): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Name must be at least 2 characters';
        }
        if (typeof value === 'string' && value.trim().length > 50) {
          return 'Name must be less than 50 characters';
        }
        break;
      case 'phone':
        if (!value || (typeof value === 'string' && !/^[\d\s+()-]{10,15}$/.test(value.replace(/\s/g, '')))) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'service':
        if (!value) {
          return 'Please select a service';
        }
        break;
      case 'date':
        if (!value) {
          return 'Please select a date';
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = formData[name as keyof typeof formData];
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
    setIsCalendarOpen(false);
    if (touched.date || date) {
      setTouched(prev => ({ ...prev, date: true }));
      const error = validateField('date', date);
      setErrors(prev => ({ ...prev, date: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.service = validateField('service', formData.service);
    newErrors.date = validateField('date', formData.date);

    setErrors(newErrors);
    setTouched({ name: true, phone: true, service: true, date: true });

    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formattedDate = formData.date ? format(formData.date, 'EEEE, MMMM do, yyyy') : 'Flexible';

    // Persist booking to Supabase database via API
    try {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: formData.name,
          client_phone: formData.phone,
          service: formData.service,
          preferred_date: formData.date ? formData.date.toISOString() : null,
          duration: formData.duration,
          details: formData.details,
          source: 'form',
        }),
      }).catch((e) => console.error('Booking sync notice:', e));
    } catch (e) {
      // Non-blocking for WhatsApp redirection
    }
    
    const message = `Hello Ryankey Studios!

*New Booking Request*

*Client Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}

*Session Details:*
- Service: ${formData.service}
- Date: ${formattedDate}
- Duration: ${formData.duration || 'Not selected'}

*Additional Details:*
${formData.details || 'No additional details'}

Looking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254718445264?text=${encodedMessage}`, '_blank');
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 lg:py-40 overflow-hidden"
    >
      {/* Morphing Gradient Background */}
      <div className="absolute inset-0 bg-gradient-morph opacity-50" />
      
      {/* Background Decorations */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-slow"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <motion.span 
                className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] uppercase text-accent"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <span className="w-8 h-0.5 bg-accent" />
                <Sparkles className="w-4 h-4 text-accent" />
                Get in Touch
              </motion.span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Let's Create
                <motion.span 
                  className="block text-accent mt-2"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Something Beautiful
                </motion.span>
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
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent group-hover:border-accent transition-all duration-300 group-hover:shadow-glow"
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
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent group-hover:border-accent transition-all group-hover:shadow-glow"
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
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent/20 transition-colors"
                  >
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
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent/20 transition-colors"
                  >
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
                className="btn-cta group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.span>
                <span>Chat on WhatsApp</span>
              </motion.a>
            </ScrollReveal>
          </div>

          {/* Right Content - Premium Booking Form */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-wine-light to-accent rounded-2xl opacity-30 blur-sm animate-gradient-border" />
              
              {/* Glass Background Form */}
              <motion.div 
                className="relative glass-form p-8 lg:p-12 space-y-6 rounded-2xl"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="text-accent">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">Book a Session</h3>
                </div>
                
                {/* Glowing Input - Name */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground flex items-center gap-2">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <motion.div 
                    className={cn("input-glow-wrapper", errors.name && touched.name && "ring-2 ring-red-500/50")}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      className="input-glow w-full"
                      placeholder="Alex Johnson"
                    />
                  </motion.div>
                  {errors.name && touched.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Glowing Input - Phone */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground flex items-center gap-2">
                    Phone / WhatsApp <span className="text-accent">*</span>
                  </label>
                  <motion.div 
                    className={cn("input-glow-wrapper", errors.phone && touched.phone && "ring-2 ring-red-500/50")}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('phone')}
                      className="input-glow w-full"
                      placeholder="+254 712 345 678"
                    />
                  </motion.div>
                  {errors.phone && touched.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Service Select */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground flex items-center gap-2">
                    Event / Project Type <span className="text-accent">*</span>
                  </label>
                  <motion.div 
                    className={cn("input-glow-wrapper", errors.service && touched.service && "ring-2 ring-red-500/50")}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('service')}
                      className="input-glow w-full appearance-none cursor-pointer"
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
                  {errors.service && touched.service && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.service}
                    </motion.p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Modern Calendar Date Picker */}
                  <div className="space-y-2">
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground flex items-center gap-2">
                      Preferred Date <span className="text-accent">*</span>
                    </label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <motion.button
                          type="button"
                          className={cn(
                            "input-glow w-full flex items-center justify-between gap-2 text-left",
                            !formData.date && "text-muted-foreground",
                            errors.date && touched.date && "ring-2 ring-red-500/50"
                          )}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-accent" />
                            {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                          </span>
                          {formData.date && <Check className="w-4 h-4 text-green-500" />}
                        </motion.button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-accent/20" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && touched.date && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.date}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                      Duration
                    </label>
                    <motion.div className="input-glow-wrapper" whileFocus={{ scale: 1.01 }}>
                      <select 
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="input-glow w-full appearance-none cursor-pointer"
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
                </div>

                {/* Details Textarea */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium tracking-wide text-foreground">
                    Additional Details
                  </label>
                  <motion.div className="input-glow-wrapper" whileFocus={{ scale: 1.01 }}>
                    <textarea
                      rows={3}
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="input-glow w-full resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  className="w-full btn-cta group flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 60px -10px hsl(345 65% 35% / 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span>Send Booking Request</span>
                </motion.button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  *Form opens WhatsApp with your details. 50% deposit required to confirm booking.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
