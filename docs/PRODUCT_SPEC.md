# Product Specification: Shaik Mansoor — Personal Fitness Platform

## 1. Executive Summary
The platform represents the verified personal training practice of **Shaik Mansoor**, an athlete and competitive bodybuilder based in **Bapatla, Andhra Pradesh, India**, with offline coaching centered at **7 Eleven Fitness Studio, Bapatla**.

The project fulfills two interrelated mandates:
1. **The Reference-Driven Athlete Experience**: An authoritative visual reproduction of a cinematic, high-contrast, pure black (`#000000`) and monochrome aesthetic. Key features:
   - Fixed navigation bar (~86px height, dark border, white modern sans logo "MANSOOR", links: ABOUT, SERVICES, RESULTS, PRICING, and pill CTA: GET IN TOUCH).
   - Full-bleed background video hero featuring cinematic athletic footage of Mansoor with grayscale filter, side-lighting aesthetic, and dark gradient overlays.
   - Lower-left headline ("TRAIN SMARTER. GET STRONGER."), tight line height, max width ~600px.
   - Editorial description, primary pill CTA ("GET IN TOUCH"), secondary outlined pill CTA ("PRICING").
   - Lower-right description ("No shortcuts. No guesswork. Just focused training designed to fit your goals and your lifestyle.").
   - Detailed sections for About (4 years gym experience, 7 Eleven Fitness Studio, Bapatla, ANU competitions), Services (6 core programs), Results (1st Place Bapatla, 2nd Place ANU), Pricing (₹999, ₹1,999, ₹3,999), How Training Works (6-step process), Location & Contact (7 Eleven Fitness Studio), and FAQs.
   - WhatsApp-based booking flow with pre-filled message generator, international format normalizer, and graceful fallback when WhatsApp is unconfigured.
2. **Private Admin CMS**:
   - Predominantly light-mode, responsive SaaS dashboard.
   - Dedicated Website & Hero Video Editor with video upload, mobile video upload, poster image upload, video positioning/focal point, overlay darkness, brightness/contrast sliders, copy and CTA controls, real-time preview, and publishing.
   - Full CRUD managers for Programs, Pricing, Achievements, Transformations (with consent gates), FAQs, Contact Settings, Appearance, and SEO.
   - Version history and publishing workflow ensuring drafts never bleed into public view until explicitly published.

---

## 2. Verified Facts & Guardrails
- **Trainer Name**: Shaik Mansoor
- **Gym Experience**: Four years of gym experience. (Must not be stated as four years of professional coaching).
- **Competitions**:
  - 1st place at bodybuilding competition in Bapatla.
  - 2nd place at bodybuilding competition at ANU (Acharya Nagarjuna University).
- **Professional Coaching**: Has worked as an official trainer at 7 Eleven Fitness Studio, Bapatla.
- **Offline Training Facility**: 7 Eleven Fitness Studio, Bapatla, Andhra Pradesh.
- **Audience**: Men seeking personal fitness coaching (online and offline).
- **No Unverified Data**:
  - Do NOT invent certifications, years of competition, client counts, success rates, fake testimonials, fake transformation photos, awards, fake phone numbers, emails, or social accounts.
  - Pricing disclaimer is mandatory: Session counts, frequency, and schedules are flexible and agreed directly between client and Mansoor. Never imply unlimited training sessions. Gym membership fees may be separate.
  - Inquiries via WhatsApp are not bookings; do not create fake booking IDs or appointments.
