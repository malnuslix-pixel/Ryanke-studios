-- ============================================
-- Ryankey Studios Admin Dashboard Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Site Settings (singleton row)
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  studio_name TEXT NOT NULL DEFAULT 'Ryankey Studios',
  tagline TEXT DEFAULT 'Your Dream Studios',
  phone_call TEXT DEFAULT '+254 702 340 700',
  phone_whatsapp TEXT DEFAULT '254718445264',
  email TEXT DEFAULT 'ryankeyimages@gmail.com',
  address_line1 TEXT DEFAULT 'Nexus Business Centre',
  address_line2 TEXT DEFAULT 'Ruiru Bypass (Kamakis)',
  google_maps_embed_url TEXT,
  instagram_url TEXT DEFAULT 'https://www.instagram.com/ryankey_studios',
  facebook_url TEXT DEFAULT 'https://www.facebook.com/share/1BKdQC3xD3/',
  tiktok_url TEXT DEFAULT 'https://www.tiktok.com/@_ryankey_',
  whatsapp_url TEXT DEFAULT 'https://wa.me/254718445264',
  logo_url TEXT,
  favicon_url TEXT,
  meta_description TEXT DEFAULT 'Ryankey Studios is Nairobi''s premier creative photography and videography studio.',
  og_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Hero Section
-- ============================================
CREATE TABLE hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  headline TEXT NOT NULL DEFAULT 'Your Vision, Our Lens',
  subheadline TEXT DEFAULT 'Your Dream Studios',
  description TEXT DEFAULT 'We capture moments that last forever.',
  hero_image_url TEXT,
  cta_text TEXT DEFAULT 'Book Now',
  cta_link TEXT DEFAULT 'https://wa.me/254718445264',
  badge_texts JSONB DEFAULT '["Professional Photography", "Videography", "Creative Direction"]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. About Content
-- ============================================
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT DEFAULT 'About Us',
  subtitle TEXT DEFAULT 'Where Vision Meets Artistry',
  story TEXT DEFAULT '',
  ceo_name TEXT DEFAULT 'Brian Abuga',
  ceo_title TEXT DEFAULT 'Founder & Lead Photographer',
  ceo_image_url TEXT,
  stats JSONB DEFAULT '[{"value": "5000+", "label": "Clients Served"}, {"value": "1000+", "label": "Projects"}, {"value": "100+", "label": "Brands"}]',
  unique_points JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. Services
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Camera',
  features JSONB DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Gallery Items
-- ============================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'All',
  tags JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. Testimonials
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. Pricing Packages
-- ============================================
CREATE TABLE pricing_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  subtitle TEXT,
  features JSONB DEFAULT '[]',
  tag TEXT,
  whatsapp_message TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. Brand Clients
-- ============================================
CREATE TABLE brand_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. Process Steps
-- ============================================
CREATE TABLE process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'MessageCircle',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. Bookings
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service TEXT,
  preferred_date DATE,
  duration TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  source TEXT DEFAULT 'whatsapp',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. Page SEO
-- ============================================
CREATE TABLE page_seo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  hero_image_url TEXT,
  hero_subtitle TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Public read access" ON gallery_items FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Public read access" ON pricing_packages FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Public read access" ON brand_clients FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Public read access" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON page_seo FOR SELECT USING (true);

-- Authenticated admin full access
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON hero_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON pricing_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON brand_clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON page_seo FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Storage Bucket
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to media bucket
CREATE POLICY "Public media read" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated users to upload/delete
CREATE POLICY "Admin media upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin media update" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin media delete" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- ============================================
-- Seed initial data
-- ============================================

-- Settings singleton
INSERT INTO site_settings (studio_name, tagline) VALUES ('Ryankey Studios', 'Your Dream Studios');

-- Hero
INSERT INTO hero_section (headline, subheadline, description)
VALUES ('Your Vision, Our Lens', 'Your Dream Studios', 'We capture moments that last forever.');

-- About
INSERT INTO about_content (ceo_name, ceo_title, stats)
VALUES (
  'Brian Abuga',
  'Founder & Lead Photographer',
  '[{"value": "5000+", "label": "Clients Served"}, {"value": "1000+", "label": "Projects"}, {"value": "100+", "label": "Brands"}]'
);

-- Services
INSERT INTO services (title, description, icon, features, sort_order) VALUES
('Corporate & Brand Photography', 'Elevate your brand with professional corporate imagery that commands attention and builds trust.', 'Building', '["Brand Campaigns", "Team Portraits", "Office Photography"]', 1),
('Family & Lifestyle', 'Capture the warmth and connection of your family with natural, vibrant photography.', 'Users', '["Family Photoshoots", "Lifestyle Sessions", "Maternity Shoots"]', 2),
('Event Photography', 'Document your special events with professional precision and creative storytelling.', 'Camera', '["Baby Showers", "Birthday Events", "Corporate Events"]', 3),
('Product Photography', 'Showcase your products in their best light with clean, high-quality images.', 'Sparkles', '["E-commerce Photos", "Catalog Shots", "Creative Product"]', 4),
('Videography Services', 'Professional video production that tells your story with cinematic quality.', 'Film', '["Music Videos", "Event Coverage", "Brand Videos"]', 5),
('Drone Services', 'Capture breathtaking aerial perspectives with our professional drone photography.', 'Plane', '["Aerial Photos", "Event Flyovers", "Real Estate"]', 6),
('Photo Retouching', 'Expert post-production editing to make your images truly exceptional.', 'Palette', '["Color Correction", "Beauty Retouch", "Background Removal"]', 7),
('Video Editing', 'Professional video editing with color grading, effects, and seamless transitions.', 'Video', '["Color Grading", "Motion Graphics", "Social Media Edits"]', 8);

-- Testimonials
INSERT INTO testimonials (name, role, content, rating, sort_order) VALUES
('Grace Wanjiku', 'Brand Client', 'Ryankey Studios captured our brand essence perfectly. Their attention to detail and creative vision elevated our visual identity to new heights. Professional, reliable, and exceptional quality.', 5, 1),
('Dr. Peter Ochieng', 'Corporate Client - BSR Hospital', 'Outstanding corporate photography services. They understood our needs and delivered beyond expectations. The team portraits and facility shots were exactly what we needed for our marketing materials.', 5, 2),
('David Kamau', 'Brand Client - Finest Mazda Garage', 'The product photography for our automotive services was top-notch. Clean, vibrant images that truly showcase our work. Fast turnaround and great communication throughout.', 5, 3),
('Faith Akinyi', 'Brand Client - Vapella Spur & Salon', 'Brian and his team brought our salon to life through stunning visuals. The photos capture the luxury and care we put into our services. Highly recommend for any business.', 5, 4),
('James Hassan', 'Hospitality Client - Opal Luxurious Suites', 'The real estate and hospitality photography exceeded all expectations. Every shot tells a story of luxury and comfort. Our bookings increased significantly after using these images.', 5, 5),
('Mary Nyambura', 'Family Client', 'We had the most beautiful family photoshoot! Brian made everyone feel comfortable, especially the children. The photos are now treasured memories we will keep forever.', 5, 6);

-- Pricing Packages
INSERT INTO pricing_packages (name, price, subtitle, features, tag, sort_order) VALUES
('Basic Package', 'Ksh 2,500', 'Studio Shoot', '["1 Hour Session", "10 Edited Photos", "1 Outfit Change", "Basic Retouching", "Digital Delivery"]', NULL, 1),
('Standard Package', 'Ksh 4,500', 'Studio / Outdoor', '["2 Hour Session", "20 Edited Photos", "2 Outfit Changes", "Advanced Retouching", "Digital + Print Ready", "1 Location"]', 'Popular', 2),
('Premium Package', 'Ksh 6,500', 'Studio / Outdoor', '["3 Hour Session", "30 Edited Photos", "3 Outfit Changes", "Premium Retouching", "Digital + Print Ready", "2 Locations", "Same-day Preview"]', NULL, 3),
('Family Fun Package', 'Ksh 8,500', 'Studio / Outdoor', '["3 Hour Session", "40 Edited Photos", "Up to 6 People", "Multiple Outfit Changes", "Premium Retouching", "Digital + Print Ready", "Family Portrait Print"]', NULL, 4),
('Grand Luxe Package', 'Ksh 15,000', 'Studio / Outdoor', '["Full Day Session", "50+ Edited Photos", "Unlimited Outfits", "Premium Retouching", "Digital + Print Ready", "3+ Locations", "Behind the Scenes Video", "Priority Delivery"]', 'Best Value', 5),
('Normal Events', 'Ksh 15,000', 'Events Coverage', '["Full Event Coverage", "100+ Edited Photos", "Event Highlights Video", "Same-day Previews", "Online Gallery", "Digital Delivery"]', NULL, 6);

-- Process Steps
INSERT INTO process_steps (step_number, title, description, icon) VALUES
(1, 'Consultation', 'We start with a detailed consultation to understand your vision, goals, and creative preferences.', 'MessageCircle'),
(2, 'Planning', 'Our team crafts a customized shoot plan including location scouting, mood boards, and scheduling.', 'Calendar'),
(3, 'The Shoot', 'Our experienced team brings your vision to life with professional equipment and creative direction.', 'Camera'),
(4, 'Delivery', 'Receive your professionally edited photos and videos, delivered digitally with prints available.', 'Package');

-- ============================================
-- 12. Documentaries & Video Projects
-- ============================================
CREATE TABLE documentaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  drive_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT DEFAULT '15 min',
  client_or_topic TEXT DEFAULT 'Documentary',
  year TEXT DEFAULT '2025',
  cta_label TEXT DEFAULT 'Watch Documentary',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE documentaries ENABLE ROW LEVEL SECURITY;

-- Public can view active documentaries
CREATE POLICY "Public can view active documentaries"
  ON documentaries FOR SELECT
  USING (is_active = TRUE);

-- Authenticated admins have full CRUD
CREATE POLICY "Admins have full access to documentaries"
  ON documentaries FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- Documentaries Seed Data
INSERT INTO documentaries (title, description, drive_url, thumbnail_url, duration, client_or_topic, year, cta_label, is_featured, sort_order) VALUES
('Voices of Impact: Grassroots Transformation', 'A cinematic deep-dive documentary covering community resilience, conservation, and human connection in rural and metropolitan Kenya.', 'https://drive.google.com', '/gallery/corporate.jpg', '18 min', 'Community & NGO Storytelling', '2025', 'Watch Documentary', TRUE, 1),
('Borders of Elegance: Architectural & Aerial Kenya', 'Capturing landmark architectural developments and breathtaking 4K aerial cinematography from Rift Valley to Nairobi skies.', 'https://drive.google.com', '/gallery/creative.jpg', '12 min', 'Commercial & Aerial', '2025', 'Watch on Google Drive', FALSE, 2);

-- ============================================
-- 13. Explicit Table Privileges & Grants
-- (Required by PostgreSQL so PostgREST roles anon, authenticated, & service_role can access tables)
-- ============================================
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;


