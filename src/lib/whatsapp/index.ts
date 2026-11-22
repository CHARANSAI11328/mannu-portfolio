import type { WhatsAppInquiryPayload } from "../../types/index.ts";

export function normalizeWhatsAppNumber(rawNumber?: string): string | null {
  if (!rawNumber) return null;
  // Remove all non-numeric characters
  const digits = rawNumber.replace(/\D/g, "");
  if (digits.length < 10) return null;

  // If 10 digits (standard Indian mobile without country code), prepend 91
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // If already prefixed with 0, replace 0 with 91 if length is 11
  if (digits.length === 11 && digits.startsWith("0")) {
    return `91${digits.slice(1)}`;
  }

  return digits;
}

export function buildWhatsAppMessage(payload: WhatsAppInquiryPayload): string {
  const trainingModeFormatted =
    payload.training_type === "online" ? "Online Coaching" : "Offline (7 Eleven Fitness Studio, Bapatla)";

  const lines = [
    "Hello Mansoor!",
    "",
    "I am interested in your personal fitness coaching.",
    "",
    `*Name:* ${payload.client_name}`,
    `*Fitness Goal:* ${payload.goal}`,
    `*Training Type:* ${trainingModeFormatted}`,
    `*Selected Plan:* ${payload.selected_plan}`,
    `*Preferred Schedule:* ${payload.preferred_days || "Flexible"}, ${payload.preferred_time || "Flexible"}`,
  ];

  if (payload.message && payload.message.trim().length > 0) {
    lines.push(`*Notes / Details:* ${payload.message.trim()}`);
  }

  lines.push("");
  lines.push("Please let me know your availability and how we can get started.");

  return lines.join("\n");
}

export function buildWhatsAppInquiryUrl(
  whatsappNumber: string | undefined,
  payload: WhatsAppInquiryPayload
): { url: string | null; error?: string } {
  const normalized = normalizeWhatsAppNumber(whatsappNumber);
  if (!normalized) {
    return {
      url: null,
      error: "WhatsApp contact number is currently not configured by the trainer.",
    };
  }

  const message = buildWhatsAppMessage(payload);
  const encodedMessage = encodeURIComponent(message);
  return {
    url: `https://wa.me/${normalized}?text=${encodedMessage}`,
  };
}

export function buildDirectWhatsAppContactUrl(
  whatsappNumber: string | undefined,
  customIntro: string = "Hello Mansoor! I'd like to ask a few questions about your personal training coaching."
): { url: string | null; error?: string } {
  const normalized = normalizeWhatsAppNumber(whatsappNumber);
  if (!normalized) {
    return {
      url: null,
      error: "WhatsApp contact number is not available.",
    };
  }
  return {
    url: `https://wa.me/${normalized}?text=${encodeURIComponent(customIntro)}`,
  };
}
