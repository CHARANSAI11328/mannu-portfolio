# System Architecture: Shaik Mansoor — Personal Fitness Platform

## 1. High-Level Overview
The Shaik Mansoor Personal Fitness Platform is an editorial, high-performance web application tailored for athlete branding, personal fitness coaching client acquisition, and dynamic content administration.

The system combines:
1. **Public Athletic Editorial Experience**: High-contrast, cinematic, pure black (`#000000`) and monochrome aesthetic matching the authoritative reference layout. Features full-bleed cinematic hero video background, structured program breakdown, verified bodybuilding credentials, transparent monthly pricing, and a WhatsApp-based direct client inquiry system.
2. **Private Admin Control Portal**: A clean, light-mode, responsive SaaS CMS interface for Shaik Mansoor to edit website content, hero video configurations, program listings, pricing plans, trainer bio, achievements, before/after transformations, media assets, FAQs, contact details, and SEO settings.
3. **Unified Backend & Persistence Layer**: Powered by Supabase PostgreSQL with Row Level Security (RLS), Supabase Storage for media (videos, images, certificates), Supabase Auth for admin access, and seamless zero-config fallback persistence for local/development environments.

---

## 2. Technology Stack

- **Framework**: Next.js 14/15 (App Router, Server Components, Route Handlers, Server Actions)
- **Language**: TypeScript (Strict typing across domain models and API schemas)
- **Styling**: Tailwind CSS with custom editorial design tokens (`#000000` background, `#101010` section surface, `#353535` borders, `#FFFFFF` text, `#B5B5B5` muted text)
- **Icons**: Lucide React
- **Animations & Transitions**: Framer Motion / Motion for React for smooth entrance reveals, restrained transitions, and accessible respect for `prefers-reduced-motion`
- **Validation**: Zod (Client and Server runtime schema enforcement)
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Supabase Storage) with dual-mode repository layer (Live Supabase + Local Resilience Fallback)
- **Testing**: Vitest, React Testing Library, Playwright for E2E

---

## 3. Directory Structure
```
d:/mannu-portfolio/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── PRODUCT_SPEC.md
│   ├── PROGRESS.md
│   ├── DEPLOYMENT.md
│   ├── ADMIN_GUIDE.md
│   └── TEST_REPORT.md
├── public/
│   ├── images/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── programs/[slug]/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (Dashboard Overview)
│   │   │   ├── login/page.tsx
│   │   │   ├── editor/page.tsx (Website & Hero Video Editor)
│   │   │   ├── profile/page.tsx (Trainer Profile)
│   │   │   ├── programs/page.tsx (Training Programs CRUD)
│   │   │   ├── pricing/page.tsx (Monthly Plans CRUD)
│   │   │   ├── achievements/page.tsx (Achievements CRUD)
│   │   │   ├── transformations/page.tsx (Transformations CRUD)
│   │   │   ├── media/page.tsx (Media Library)
│   │   │   ├── contact/page.tsx (Contact & Social Settings)
│   │   │   ├── faqs/page.tsx (FAQ Manager)
│   │   │   ├── appearance/page.tsx (Appearance Settings)
│   │   │   ├── seo/page.tsx (SEO & Metadata)
│   │   │   └── security/page.tsx (Account & Security)
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── cms/
│   │   │   ├── media/
│   │   │   └── analytics/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/ (Navbar, HeroVideo, AboutSection, ServicesSection, ResultsSection, PricingSection, ProcessSection, ContactSection, WhatsAppModal, FaqSection, Footer)
│   │   ├── admin/ (AdminSidebar, AdminHeader, MetricCards, DataTable, FormControls, MediaPicker, VersionHistoryModal)
│   │   └── shared/ (Button, Badge, Modal, Toast, Input)
│   ├── lib/
│   │   ├── cms/ (Repository layer: fetchPublishedContent, fetchDraftContent, publishContent, saveDraft)
│   │   ├── supabase/ (client.ts, server.ts, middleware.ts)
│   │   ├── validation/ (schemas for hero, programs, plans, contacts, faqs)
│   │   ├── whatsapp/ (message generator, international format normalizer)
│   │   └── utils.ts
│   └── types/ (CMS schemas, database types, public view models)
├── supabase/
│   ├── migrations/ (PostgreSQL RLS, schemas, triggers)
│   └── seed/ (Official seed data with Shaik Mansoor verified records)
├── tests/
└── TASKS.md
```

---

## 4. Key Architectural Patterns

### A. Dual-Mode CMS Repository Layer
The CMS repository abstracts data access. When Supabase environment variables are present and live, it queries PostgreSQL tables with Row Level Security. When operating in local development or standalone preview mode, it seamlessly persists and serves data from a structured local state store. This guarantees that:
- The site and admin portal are immediately testable, functional, and demonstrable.
- Connecting Supabase credentials instantly activates remote PostgreSQL queries and cloud file storage.

### B. Draft vs. Published State Flow
Content items (Website Sections, Programs, Pricing Plans, Achievements, FAQs, Appearance) maintain:
- `is_published`: boolean indicating live visibility.
- `draft_data` vs `published_data`: admins can edit drafts and preview them in real time without altering the live website until explicitly clicking **"Publish Changes"**.
- A content revision log (`content_revisions`) tracks author, timestamp, and snapshot for auditability and rollback.

### C. Direct WhatsApp Inquiry Protocol
1. Client selects a plan, fitness goal, and training mode (Online vs. Offline) or opens the WhatsApp booking dialog.
2. The system retrieves the verified trainer WhatsApp number from published contact settings.
3. Form fields are validated (Client Name, Goal, Training Type, Selected Plan, Preferred Days, Preferred Time).
4. A structured, polite inquiry template is generated and URL-encoded.
5. Client is redirected to `https://wa.me/{sanitized_number}?text={encoded_message}`.
6. Aggregate inquiry CTA clicks are recorded anonymously without collecting or persisting private health/inquiry personal data.
