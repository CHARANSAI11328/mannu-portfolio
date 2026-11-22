# TASKS.md — Shaik Mansoor Platform Master Checklist

## Phase 1: Architecture and Product Blueprint
- [x] Inspect workspace and initialize project
- [x] Create architecture blueprint (`docs/ARCHITECTURE.md`)
- [x] Define database schemas and RLS policies (`docs/DATABASE.md`)
- [x] Define product specification and verified brand guidelines (`docs/PRODUCT_SPEC.md`)
- [x] Define task checklist (`TASKS.md`) and tracking (`docs/PROGRESS.md`)

## Phase 2: UI/UX Design System & Core Layouts
- [x] Configure Tailwind CSS with the authoritative reference color palette:
  - Background: `#000000`
  - Section background: `#101010`
  - Text Primary: `#FFFFFF`
  - Text Secondary: `#B5B5B5`
  - Borders: `#353535`
  - Buttons: `#FFFFFF` background with `#000000` text (pill-shaped)
- [x] Build Reference-Matched Public Navigation (~86px height, pure black, dark grey border, "MANSOOR" wordmark, menu items, white pill CTA)
- [x] Build Cinematic Hero Component:
  - Center-right video framing, full-bleed
  - Dark gradient blend into pure black
  - Grayscale + high contrast styling
  - Lower-left headline: "TRAIN SMARTER. GET STRONGER."
  - Primary description & dual pill CTAs ("GET IN TOUCH", "PRICING")
  - Lower-right description: "No shortcuts. No guesswork..."
  - Video poster & fallback handling
- [x] Build Public Sections:
  - About Section (4 years experience, 7 Eleven Fitness Studio, ANU & Bapatla results)
  - Services Section (6 core fitness programs with detail modal/pages)
  - Results Section (1st Place Bapatla, 2nd Place ANU, verified transformations only)
  - Pricing Section (Foundation ₹999, Transformation ₹1,999 [highlighted], Elite Coaching ₹3,999 + flexible session disclaimer)
  - How Training Works (6-step process)
  - Location & Contact (7 Eleven Fitness Studio, Google Maps link, WhatsApp form)
  - FAQ Accordion (8 standard fitness/enrollment questions)
  - Footer (Brand, links, location, copyright)
- [x] Build Admin Layout Shell:
  - Clean light-mode SaaS UI
  - Professional sidebar navigation (14 menu items)
  - Header with publish status indicator & quick actions
  - Responsive drawer for mobile admin usage

## Phase 3: Backend & Admin CMS
- [x] Supabase migrations and SQL setup (`supabase/migrations/0001_initial_schema.sql`)
- [x] Seed data scripts with verified Mansoor facts (`supabase/seed/seed.sql`)
- [x] Dual-mode repository layer (`src/lib/cms/store.ts`) supporting live Supabase and local persistence fallback
- [x] Admin Authentication & Session Management (Login, Logout, Route protection)
- [x] Dedicated Website & Hero Video Editor (`/admin/editor`):
  - Desktop & mobile video file/URL management
  - Poster image selection
  - Focal point, darkness overlay, contrast/brightness adjustments
  - Headline, subheadline, CTAs
  - Section order & visibility toggles
  - Draft preview & instant publishing
- [x] Training Programs Manager (`/admin/programs`) — CRUD, order, publish status
- [x] Pricing Manager (`/admin/pricing`) — Prices, features, highlight toggle, disclaimer
- [x] Trainer Profile Manager (`/admin/profile`) — Bio, credentials, photo
- [x] Achievements Manager (`/admin/achievements`) — Title, ranking, event, certificate
- [x] Transformations Manager (`/admin/transformations`) — Before/after photos, client consent validation
- [x] Contact & Socials Manager (`/admin/contact`) — WhatsApp number, address, social links
- [x] Media Library (`/admin/media`) — Upload, filter, preview, delete
- [x] FAQ Manager (`/admin/faqs`) — Add/edit questions & answers
- [x] Appearance & SEO Settings (`/admin/appearance`, `/admin/seo`)
- [x] Revision History & Rollback (`/admin/security`)

## Phase 4: Public Website CMS Integration & WhatsApp Booking
- [x] Connect public homepage to CMS repository (published data stream)
- [x] Connect Programs, Pricing, Achievements, and FAQs to dynamic data
- [x] Connect Contact coordinates and WhatsApp action
- [x] Build WhatsApp Modal & Booking Workflow:
  - Name, Fitness Goal, Training Type (Online/Offline), Plan, Schedule preferences, Message
  - International number normalization
  - Pre-filled URL-encoded message generation
  - Disabled state if WhatsApp not configured
  - Aggregate inquiry click counter
- [x] Ensure empty transformations section hides completely without blank spaces
- [x] Connect Program Detail routes (`/programs/[slug]`)
- [x] Privacy Policy and Terms of Service pages (`/privacy`, `/terms`)

## Phase 5: Verification, Hardening & Deployment Docs
- [x] Execute TypeScript syntax, module audit, and Next.js Webpack production build (Exit Code 0, 37/37 static routes generated)
- [x] Execute Unit & Integration Tests (`tests/runner.mjs` - 32/32 tests passing)
- [x] Test Mobile and Desktop responsiveness (1440x900 and 390x844 viewport compatibility)
- [x] Test Acceptance Criteria (Scenarios A through O fully validated)
- [x] Generate comprehensive documentation:
  - `.env.example`
  - `README.md`
  - `docs/DEPLOYMENT.md`
  - `docs/ADMIN_GUIDE.md`
  - `docs/TEST_REPORT.md`
