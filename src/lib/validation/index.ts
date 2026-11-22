import { z } from "zod";

export const heroSectionSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  headline: z.string().min(1, "Headline is required"),
  description: z.string().min(1, "Description is required"),
  secondary_description: z.string().min(1, "Secondary description is required"),
  primary_cta_label: z.string().min(1, "Primary CTA label is required"),
  primary_cta_target: z.string().min(1, "Primary CTA target is required"),
  secondary_cta_label: z.string().min(1, "Secondary CTA label is required"),
  secondary_cta_target: z.string().min(1, "Secondary CTA target is required"),
  video_url: z.string().min(1, "Video URL is required"),
  mobile_video_url: z.string().optional(),
  poster_url: z.string().min(1, "Poster URL is required"),
  fallback_image_url: z.string().optional(),
  overlay_darkness: z.number().min(0).max(100),
  video_brightness: z.number().min(30).max(180),
  video_contrast: z.number().min(50).max(200),
  focal_point: z.enum(["center", "center-right", "right", "center-left"]),
  grayscale: z.boolean(),
});

export const aboutSectionSchema = z.object({
  badge: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  bio_paragraphs: z.array(z.string()).min(1),
  gym_experience_years: z.number().int().min(1),
  gym_experience_statement: z.string().min(1),
  coaching_experience: z.string().min(1),
  primary_gym_location: z.string().min(1),
  training_philosophy: z.array(z.string()).min(1),
  trainer_image_url: z.string().optional(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      subtext: z.string().optional(),
    })
  ),
});

export const programSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  target_audience: z.string().min(1, "Target audience is required"),
  goals: z.array(z.string()).min(1, "At least one goal required"),
  benefits: z.array(z.string()).min(1, "At least one benefit required"),
  features: z.array(z.string()).min(1, "At least one feature required"),
  training_modes: z.array(z.enum(["online", "offline"])).min(1, "At least one mode required"),
  image_url: z.string().optional(),
  display_order: z.number().int(),
  is_published: z.boolean(),
});

export const monthlyPlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Plan name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  price_inr: z.number().positive("Price must be a positive number"),
  billing_period: z.string().default("month"),
  target_audience: z.string().min(1, "Target audience is required"),
  features: z.array(z.string()).min(1, "At least one feature required"),
  is_highlighted: z.boolean().default(false),
  is_active: z.boolean().default(true),
  session_disclaimer: z.string().min(1, "Session disclaimer is required"),
  display_order: z.number().int(),
});

export const achievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  ranking: z.string().min(1, "Ranking is required"),
  event: z.string().min(1, "Event name is required"),
  year: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().optional(),
  certificate_url: z.string().optional(),
  display_order: z.number().int(),
  is_published: z.boolean().default(true),
});

export const transformationSchema = z.object({
  id: z.string().min(1),
  client_name: z.string().min(1, "Client name is required"),
  before_image_url: z.string().min(1, "Before image URL is required"),
  after_image_url: z.string().min(1, "After image URL is required"),
  story: z.string().optional(),
  duration: z.string().optional(),
  result_summary: z.string().min(1, "Result summary is required"),
  has_client_consent: z.boolean(),
  is_published: z.boolean(),
  display_order: z.number().int(),
});

export const contactSettingsSchema = z.object({
  whatsapp_number: z.string().min(8, "Valid phone/WhatsApp number is required"),
  phone_number: z.string().optional(),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  instagram_handle: z.string().optional(),
  gym_name: z.string().min(1, "Gym name is required"),
  gym_address: z.string().min(1, "Gym address is required"),
  google_maps_url: z.string().url("Valid URL required").optional().or(z.literal("")),
  availability_notes: z.string().min(1, "Availability notes required"),
});

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
  display_order: z.number().int(),
  is_published: z.boolean().default(true),
});

export const whatsappInquirySchema = z.object({
  client_name: z.string().min(2, "Please enter your name"),
  goal: z.string().min(2, "Please select or enter your fitness goal"),
  training_type: z.enum(["online", "offline"]),
  selected_plan: z.string().min(1, "Please select a plan"),
  preferred_days: z.string().min(1, "Please specify your preferred days"),
  preferred_time: z.string().min(1, "Please specify your preferred time"),
  message: z.string().optional(),
});
