-- ==============================================================================
-- Ryankey Studios: Fix Supabase Table Grants & Permissions
-- ==============================================================================
-- Copy and run this entire script once in your Supabase Dashboard:
-- Supabase Dashboard -> Project (eoiwtgolwbbctvbgekop) -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Grant public schema usage to all API roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- 2. Grant full CRUD permissions on all existing tables to API roles
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 3. Set default privileges so any future tables automatically inherit full access
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

-- 4. Ensure seed data exists for singleton tables if they are empty
INSERT INTO site_settings (studio_name, tagline)
SELECT 'Ryankey Studios', 'Your Dream Studios'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

INSERT INTO hero_section (headline, subheadline, description)
SELECT 'Your Vision, Our Lens', 'Your Dream Studios', 'We capture moments that last forever.'
WHERE NOT EXISTS (SELECT 1 FROM hero_section);

INSERT INTO about_content (ceo_name, ceo_title, stats)
SELECT 'Brian Abuga', 'Founder & Lead Photographer', '[{"value": "5000+", "label": "Clients Served"}, {"value": "1000+", "label": "Projects"}, {"value": "100+", "label": "Brands"}]'
WHERE NOT EXISTS (SELECT 1 FROM about_content);
