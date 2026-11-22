-- ==============================================================================
-- SHAIK MANSOOR PERSONAL FITNESS PLATFORM
-- DATABASE SCHEMA MIGRATION 0001
-- PostgreSQL / Supabase with Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. WEBSITE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS website_sections (
  id TEXT PRIMARY KEY, -- 'hero', 'about', 'services', 'results', 'pricing', 'process', 'contact', 'faqs'
  title TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  draft_data JSONB NOT NULL,
  published_data JSONB NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TRAINING PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  goals TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  training_modes TEXT[] NOT NULL DEFAULT '{"online", "offline"}',
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. MONTHLY PRICING PLANS TABLE
CREATE TABLE IF NOT EXISTS monthly_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT,
  price_inr NUMERIC(10, 2) NOT NULL,
  billing_period TEXT NOT NULL DEFAULT 'month',
  target_audience TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_highlighted BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  session_disclaimer TEXT NOT NULL DEFAULT 'Session counts, frequency, and schedules are flexible and agreed directly between the client and Mansoor. Training mode and included sessions are finalized prior to enrollment. Gym membership fees may be separate.',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  ranking TEXT NOT NULL,
  event TEXT NOT NULL,
  year TEXT,
  description TEXT NOT NULL,
  image_url TEXT,
  certificate_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TRANSFORMATIONS TABLE (STRICT CONSENT GATED)
CREATE TABLE IF NOT EXISTS transformations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  story TEXT,
  duration TEXT,
  result_summary TEXT NOT NULL,
  has_client_consent BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. CONTACT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  whatsapp_number TEXT NOT NULL DEFAULT '+919876543210',
  phone_number TEXT,
  email TEXT,
  instagram_handle TEXT,
  gym_name TEXT NOT NULL DEFAULT '7 Eleven Fitness Studio',
  gym_address TEXT NOT NULL DEFAULT '7 Eleven Fitness Studio, Bapatla, Andhra Pradesh, India',
  google_maps_url TEXT,
  availability_notes TEXT NOT NULL DEFAULT 'Monday to Saturday | Morning & Evening Slots Available',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. FAQ ITEMS TABLE
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT NOT NULL,
  alt_text TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONTENT REVISIONS TABLE (AUDIT HISTORY)
CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  published_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. AGGREGATE ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS aggregate_analytics (
  record_date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
  whatsapp_inquiry_clicks INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE aggregate_analytics ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public read published sections" ON website_sections
  FOR SELECT USING (is_enabled = TRUE);

CREATE POLICY "Public read published programs" ON training_programs
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public read active plans" ON monthly_plans
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read published achievements" ON achievements
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public read consented transformations" ON transformations
  FOR SELECT USING (is_published = TRUE AND has_client_consent = TRUE);

CREATE POLICY "Public read contact settings" ON contact_settings
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read published faqs" ON faq_items
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public record aggregate whatsapp click" ON aggregate_analytics
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public update aggregate whatsapp click" ON aggregate_analytics
  FOR UPDATE USING (TRUE);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin full access admin_users" ON admin_users
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access website_sections" ON website_sections
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access training_programs" ON training_programs
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access monthly_plans" ON monthly_plans
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access achievements" ON achievements
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access transformations" ON transformations
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access contact_settings" ON contact_settings
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access faq_items" ON faq_items
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access media_assets" ON media_assets
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access content_revisions" ON content_revisions
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access aggregate_analytics" ON aggregate_analytics
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
