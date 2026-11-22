export type TrainingMode = "online" | "offline";

export interface HeroSectionData {
  badge: string;
  headline: string;
  description: string;
  secondary_description: string;
  primary_cta_label: string;
  primary_cta_target: string;
  secondary_cta_label: string;
  secondary_cta_target: string;
  video_url: string;
  mobile_video_url?: string;
  poster_url: string;
  fallback_image_url?: string;
  overlay_darkness: number; // 0 to 100
  video_brightness: number; // 50 to 150
  video_contrast: number; // 50 to 150
  focal_point: "center" | "center-right" | "right" | "center-left";
  grayscale: boolean;
}

export interface AboutSectionData {
  badge: string;
  title: string;
  tagline: string;
  bio_paragraphs: string[];
  gym_experience_years: number;
  gym_experience_statement: string;
  coaching_experience: string;
  primary_gym_location: string;
  training_philosophy: string[];
  trainer_image_url?: string;
  stats: Array<{
    value: string;
    label: string;
    subtext?: string;
  }>;
}

export interface TrainingProgram {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  target_audience: string;
  goals: string[];
  benefits: string[];
  features: string[];
  training_modes: TrainingMode[];
  image_url?: string;
  display_order: number;
  is_published: boolean;
}

export interface MonthlyPlan {
  id: string;
  name: string;
  tagline: string;
  price_inr: number;
  billing_period: string;
  target_audience: string;
  features: string[];
  is_highlighted: boolean;
  is_active: boolean;
  session_disclaimer: string;
  display_order: number;
}

export interface Achievement {
  id: string;
  title: string;
  ranking: string;
  event: string;
  year?: string;
  description: string;
  image_url?: string;
  certificate_url?: string;
  display_order: number;
  is_published: boolean;
}

export interface Transformation {
  id: string;
  client_name: string;
  before_image_url: string;
  after_image_url: string;
  story?: string;
  duration?: string;
  result_summary: string;
  has_client_consent: boolean;
  is_published: boolean;
  display_order: number;
}

export interface ContactSettings {
  whatsapp_number: string;
  phone_number?: string;
  email?: string;
  instagram_handle?: string;
  gym_name: string;
  gym_address: string;
  google_maps_url?: string;
  availability_notes: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
}

export interface SectionVisibilityItem {
  id: string;
  name: string;
  is_enabled: boolean;
  display_order: number;
}

export interface AppearanceSettings {
  brand_name: string;
  logo_text: string;
  brand_tagline: string;
  primary_color: string;
  accent_color: string;
  hero_overlay_style: string;
}

export interface SeoSettings {
  meta_title: string;
  meta_description: string;
  keywords: string[];
  og_image_url?: string;
  canonical_url?: string;
}

export interface WhatsAppInquiryPayload {
  client_name: string;
  goal: string;
  training_type: TrainingMode;
  selected_plan: string;
  preferred_days: string;
  preferred_time: string;
  message?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  category: string;
  uploaded_at: string;
  alt_text?: string;
}

export interface ContentRevision {
  id: string;
  timestamp: string;
  author: string;
  section: string;
  summary: string;
  snapshot: any;
}

export interface AppStoreData {
  hero: HeroSectionData;
  about: AboutSectionData;
  programs: TrainingProgram[];
  plans: MonthlyPlan[];
  achievements: Achievement[];
  transformations: Transformation[];
  contact: ContactSettings;
  faqs: FaqItem[];
  sections: SectionVisibilityItem[];
  appearance: AppearanceSettings;
  seo: SeoSettings;
  media?: MediaAsset[];
  revisions: ContentRevision[];
  metrics: {
    whatsapp_inquiry_clicks: number;
    last_published_at: string;
  };
}
