'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, ExternalLink, Clock, Calendar, Sparkles, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export interface DocumentaryItem {
  id: string;
  title: string;
  description: string;
  drive_url: string;
  thumbnail_url: string;
  duration?: string;
  client_or_topic?: string;
  year?: string;
  cta_label?: string;
  is_featured?: boolean;
  is_active: boolean;
  sort_order: number;
}

const fallbackDocs: DocumentaryItem[] = [
  {
    id: 'doc-fallback-1',
    title: 'Voices of Impact: Grassroots Transformation',
    description: 'A cinematic deep-dive documentary covering community resilience, conservation, and human connection in rural and metropolitan Kenya.',
    drive_url: 'https://drive.google.com',
    thumbnail_url: '/gallery/corporate.jpg',
    duration: '18 min',
    client_or_topic: 'Community & NGO Storytelling',
    year: '2025',
    cta_label: 'Watch Documentary',
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'doc-fallback-2',
    title: 'Borders of Elegance: Architectural & Aerial Kenya',
    description: 'Capturing landmark architectural developments and breathtaking 4K aerial cinematography from Rift Valley to Nairobi skies.',
    drive_url: 'https://drive.google.com',
    thumbnail_url: '/gallery/creative.jpg',
    duration: '12 min',
    client_or_topic: 'Commercial & Aerial Cinema',
    year: '2025',
    cta_label: 'Watch on Google Drive',
    is_featured: false,
    is_active: true,
    sort_order: 2,
  },
];

export const DocumentaryShowcase = () => {
  const [docs, setDocs] = useState<DocumentaryItem[]>(fallbackDocs);

  useEffect(() => {
    fetch('/api/admin/documentaries')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((d: any) => d.is_active !== false);
          if (activeOnly.length > 0) {
            setDocs(activeOnly);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="documentaries" className="py-12 sm:py-20 lg:py-28 bg-secondary/30 border-y border-border/40 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-accent/10 text-accent border border-accent/20 mb-3 sm:mb-4">
              <Film className="w-3.5 h-3.5" />
              Documentaries & Aerial Cinema
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Stories That Resonate,{' '}
              <span className="text-accent">Visuals That Move</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2">
              Explore our full-length documentary films and cinematic aerial productions hosted directly on Google Drive. From NGO impact narratives to high-end commercial profiles.
            </p>
          </ScrollReveal>
        </div>

        {/* Documentary Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {docs.map((doc, idx) => (
            <ScrollReveal key={doc.id || idx} delay={idx * 0.1}>
              <div className="group relative rounded-3xl overflow-hidden border border-border/60 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-2xl hover:border-accent/50 transition-all duration-500 flex flex-col h-full">
                {/* 16:9 Thumbnail Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <img
                    src={doc.thumbnail_url || '/gallery/corporate.jpg'}
                    alt={doc.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/75 backdrop-blur-md text-white border border-white/10">
                      <Film className="w-3 h-3 text-accent" />
                      {doc.client_or_topic || 'Documentary'}
                    </span>

                    <div className="flex items-center gap-2">
                      {doc.duration && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 backdrop-blur-md text-white border border-white/10">
                          <Clock className="w-3 h-3 text-accent" />
                          {doc.duration}
                        </span>
                      )}
                      {doc.year && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent text-accent-foreground">
                          {doc.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <a
                    href={doc.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center z-10"
                    aria-label={`Watch ${doc.title} on Google Drive`}
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-accent/90 text-accent-foreground flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-accent transition-all duration-300 shadow-accent/40">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                    </div>
                  </a>
                </div>

                {/* Content & Action Area */}
                <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {doc.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3.5 border-t border-border/50 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                    <a
                      href={doc.drive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury w-full sm:flex-1 text-center py-3 sm:py-3.5 px-6 flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{doc.cta_label || 'Watch on Google Drive'}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <a
                      href="https://wa.me/254718445264?text=Hello%20Ryankey%20Studios%2C%20I%20am%20interested%20in%20commissioning%20a%20documentary%20or%20aerial%20film."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-luxury w-full sm:w-auto text-center py-3 sm:py-3.5 px-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span>Inquire / Commission</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
