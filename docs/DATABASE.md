# Database Schema & Data Models: Shaik Mansoor Platform

## 1. Relational Database Design (PostgreSQL / Supabase)

### Table: `admin_users`
Stores provisioned administrative accounts.
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `website_sections`
Houses modular section configuration, order, visibility, and structured content for draft & published states.
```sql
CREATE TABLE website_sections (
  id TEXT PRIMARY KEY, -- 'hero', 'about', 'services', 'results', 'pricing', 'process', 'contact', 'faq'
  title TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  draft_data JSONB NOT NULL,
  published_data JSONB NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `training_programs`
Manages personal fitness offerings.
```sql
CREATE TABLE training_programs (
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
```

### Table: `monthly_plans`
Stores monthly personal training tiers with flexible session disclaimers.
```sql
CREATE TABLE monthly_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- Foundation, Transformation, Elite Coaching
  tagline TEXT,
  price_inr NUMERIC(10, 2) NOT NULL,
  billing_period TEXT NOT NULL DEFAULT 'month',
  target_audience TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_highlighted BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  session_disclaimer TEXT NOT NULL DEFAULT 'Session counts, frequency, and schedules are flexible and agreed directly with Mansoor. Gym membership fees may be separate.',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `achievements`
Verified bodybuilding and competitive credentials.
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  ranking TEXT NOT NULL, -- e.g. "1st Place", "2nd Place"
  event TEXT NOT NULL,   -- e.g. "Bodybuilding Competition, Bapatla", "Bodybuilding Competition, ANU"
  year TEXT,
  description TEXT,
  image_url TEXT,
  certificate_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `transformations`
Client progress records with strict consent checks.
```sql
CREATE TABLE transformations (
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
```

### Table: `contact_settings`
Single row configuration for Mansoor's verified contact coordinates.
```sql
CREATE TABLE contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  whatsapp_number TEXT NOT NULL DEFAULT '+919876543210',
  phone_number TEXT,
  email TEXT,
  instagram_handle TEXT,
  gym_name TEXT NOT NULL DEFAULT '7 Eleven Fitness Studio',
  gym_address TEXT NOT NULL DEFAULT '7 Eleven Fitness Studio, Bapatla, Andhra Pradesh, India',
  google_maps_url TEXT,
  availability_notes TEXT NOT NULL DEFAULT 'Monday to Saturday, Morning & Evening slots',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `faq_items`
Frequently asked questions.
```sql
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `media_assets`
Catalog of media files (hero videos, posters, trainer photos, certs).
```sql
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- video/mp4, image/webp, image/jpeg
  file_size INT NOT NULL,
  alt_text TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `content_revisions`
Version history for rollback and audit trail.
```sql
CREATE TABLE content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  published_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `aggregate_analytics`
Privacy-preserving aggregate metrics.
```sql
CREATE TABLE aggregate_analytics (
  id DATE PRIMARY KEY DEFAULT CURRENT_DATE,
  whatsapp_clicks INT NOT NULL DEFAULT 0,
  program_views INT NOT NULL DEFAULT 0,
  pricing_views INT NOT NULL DEFAULT 0
);
```

---

## 2. Row Level Security (RLS) Policies
- `website_sections`, `training_programs`, `monthly_plans`, `achievements`, `faq_items`, `contact_settings`:
  - `SELECT`: Public access allowed where `is_published = TRUE` (or `is_enabled = TRUE`).
  - `INSERT`, `UPDATE`, `DELETE`: Restricted to authenticated administrators (`auth.role() = 'authenticated'`).
- `transformations`:
  - `SELECT`: Public access only where `has_client_consent = TRUE AND is_published = TRUE`.
  - `INSERT`, `UPDATE`, `DELETE`: Restricted to authenticated administrators.
- `content_revisions`, `admin_users`, `aggregate_analytics`:
  - Access restricted to authenticated administrators only.
