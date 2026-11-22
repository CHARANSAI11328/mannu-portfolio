# Deployment Guide: Shaik Mansoor — Personal Fitness Platform

## 1. Overview
The Shaik Mansoor Personal Fitness Platform is built using Next.js App Router, TypeScript, Tailwind CSS, and a resilient dual-mode persistence architecture:
- **Zero-Config Local Mode**: Runs out of the box with file-backed JSON state (`.cms-store.json`) without requiring external cloud accounts to be configured upfront.
- **Production Supabase Mode**: Connects directly to Supabase PostgreSQL, Supabase Auth, and Supabase Storage with Row Level Security (RLS) enforcement.

---

## 2. Prerequisites
- **Node.js**: v18.18+ or v20+ (tested on Node v24)
- **Package Manager**: npm 10+
- **Supabase Account**: (for production hosting) Free or Pro tier project at [supabase.com](https://supabase.com)

---

## 3. Local Development Setup

1. **Clone & Install**:
   ```bash
   git clone <repo-url> mannu-portfolio
   cd mannu-portfolio
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(If running locally without Supabase, the built-in local store automatically seeds and persists all changes).*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Public Website: `http://localhost:3000`
   - Admin CMS Portal: `http://localhost:3000/admin`
   - Admin Login: `http://localhost:3000/admin/login`

---

## 4. Supabase Production Database Setup

1. **Create Supabase Project**:
   - Log in to your Supabase dashboard and create a new project (e.g., `mansoor-fitness`).
   - Note the **Project URL** and **Anon Public Key**.

2. **Run Migrations**:
   - Navigate to **SQL Editor** in Supabase.
   - Open and execute `supabase/migrations/0001_initial_schema.sql`.
   - This creates all 11 tables with Row Level Security policies enabled.

3. **Run Seed Script**:
   - Open and execute `supabase/seed/seed.sql`.
   - This populates verified facts: 4 years gym experience, 7 Eleven studio coordinates, 1st place Bapatla, 2nd place ANU, 6 core programs, and 3 monthly pricing tiers.

4. **Configure Media Storage Bucket**:
   - Under **Storage**, create a public bucket named `media`.
   - Set public read permissions for website visitors.
   - Restrict upload/delete permissions to authenticated administrators.

---

## 5. Deploying to Vercel

1. Push the repository to GitHub / GitLab.
2. Log in to [Vercel](https://vercel.com) and import the repository.
3. Configure Environment Variables in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy. Vercel automatically runs `next build` and provisions edge and serverless functions for the API routes.

---

## 6. Post-Deployment Verification Checklist
- [ ] Visit `https://your-domain.com` — verify pure black (#000000) authoritative hero background, Mansoor branding, and lower-left typography.
- [ ] Click "GET IN TOUCH" or "SELECT PLAN" — verify WhatsApp modal opens with pre-selected fields.
- [ ] Test form submission — verify wa.me link generates correctly.
- [ ] Log in to `/admin` — update hero copy or monthly price and verify publishing updates the live site.
- [ ] Verify WCAG AA contrast and mobile responsiveness at 390px.
