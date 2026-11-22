# MANSOOR — Personal Fitness Coaching Platform

> **"Built by Discipline."**  
> Premium athletic personal training web platform and private administrative CMS for **Shaik Mansoor**, competitive bodybuilder and official personal trainer at **7 Eleven Fitness Studio, Bapatla, Andhra Pradesh**.

---

## 1. Overview & Visual Direction

The platform features an authoritative, high-contrast, pure black (`#000000`) and monochrome aesthetic matching the client-locked reference design:
- **Authoritative Top Navigation**: Fixed at ~86px height, pure black, bold "MANSOOR" wordmark, streamlined links (ABOUT, SERVICES, RESULTS, PRICING), and white pill CTA ("GET IN TOUCH").
- **Cinematic Hero**: Full-bleed background video featuring loopable gym footage of Mansoor with center-right framing, grayscale treatment, high contrast, and gradient vignette overlays. Lower-left headline ("TRAIN SMARTER. GET STRONGER."), dual pill CTAs, and reference-positioned lower-right secondary description.
- **Verified Facts & Background**: 4 years of gym experience, competitive honors (1st Place Bapatla, 2nd Place ANU), and official coaching at 7 Eleven Fitness Studio, Bapatla.
- **6 Core Programs**: Muscle Building, Fat Loss, Strength Training, Bodybuilding Preparation, Beginner Fitness, General Conditioning.
- **Transparent Pricing**: Foundation (₹999), Transformation (₹1,999 - highlighted), and Elite Coaching (₹3,999) with explicit flexible session scheduling disclaimers.
- **Direct WhatsApp Booking**: Validates input, formats structured inquiry, and opens pre-filled wa.me chat.
- **Private Admin CMS**: Predominantly light-mode SaaS dashboard with hero video controls, program CRUD, pricing editor, and content publishing workflows.

---

## 2. Tech Stack

- **Framework**: Next.js 14/15 (App Router, Server Components, Route Handlers)
- **Language**: TypeScript (Strict typing across domain models)
- **Styling**: Tailwind CSS (v4) with custom editorial design tokens
- **Validation**: Zod (Runtime validation for all CMS inputs and inquiries)
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth, Supabase Storage (with dual-mode zero-config fallback)
- **Testing**: Vitest unit & integration test suites

---

## 3. Getting Started

### Prerequisites
- Node.js v18.18+ or v20+
- npm v10+

### Installation & Run
```bash
# Clone the repository
git clone <repo-url> mannu-portfolio
cd mannu-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit:
- **Public Athlete Website**: `http://localhost:3000`
- **Admin Control Portal**: `http://localhost:3000/admin`
- **Admin Login**: `http://localhost:3000/admin/login`

---

## 4. Admin Management Capabilities

1. **Website & Hero Video Editor** (`/admin/editor`):
   - Upload desktop and mobile hero video footage (.mp4).
   - Set focal point (`center-right`, `center`, `right`).
   - Sliders for darkness overlay, video brightness, and contrast.
   - Edit headlines, descriptions, and CTA labels.
   - Reorder and toggle visibility of homepage sections.
   - Live hero preview before publishing.
2. **Monthly Pricing Plans** (`/admin/pricing`):
   - Modify rates for Foundation (₹999), Transformation (₹1,999), and Elite Coaching (₹3,999).
   - Add/remove included features.
   - Set recommended badge.
3. **Training Programs** (`/admin/programs`):
   - Full CRUD across all 6 fitness disciplines.
4. **Achievements & Credentials** (`/admin/achievements`):
   - Add or update competitive bodybuilding awards.
5. **Transformations** (`/admin/transformations`):
   - Strict client written consent gate.
   - Automatically hides from public site when empty.
6. **WhatsApp & Studio Settings** (`/admin/contact`):
   - Change trainer WhatsApp number, phone, email, and 7 Eleven Fitness Studio address.

---

## 5. Testing & Verification

Run the test suite:
```bash
npm test
```

Includes coverage for:
- WhatsApp number normalization and message building (`tests/whatsapp.test.ts`)
- CMS business logic, draft isolation, and consent gates (`tests/cms.test.ts`)
- Schema validation with Zod (`tests/validation.test.ts`)

---

## 6. License & Ownership
Created for **Shaik Mansoor — Personal Fitness Coaching**. All rights reserved.
