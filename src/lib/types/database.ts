// Database types matching the Supabase schema

export interface SiteSettings {
  id: string;
  studio_name: string;
  tagline: string;
  phone_call: string;
  phone_whatsapp: string;
  email: string;
  address_line1: string;
  address_line2: string;
  google_maps_embed_url: string | null;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  whatsapp_url: string;
  logo_url: string | null;
  favicon_url: string | null;
  meta_description: string;
  og_image_url: string | null;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  hero_image_url: string | null;
  cta_text: string;
  cta_link: string;
  badge_texts: string[];
  updated_at: string;
}

export interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  ceo_name: string;
  ceo_title: string;
  ceo_image_url: string | null;
  stats: { value: string; label: string }[];
  unique_points: string[];
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  tags: string[];
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  subtitle: string | null;
  features: string[];
  tag: string | null;
  whatsapp_message: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandClient {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  icon: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  client_name: string;
  client_phone: string;
  service: string | null;
  preferred_date: string | null;
  duration: string | null;
  details: string | null;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface PageSEO {
  id: string;
  page_path: string;
  title: string | null;
  description: string | null;
  hero_image_url: string | null;
  hero_subtitle: string | null;
  updated_at: string;
}
