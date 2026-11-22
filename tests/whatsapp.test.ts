import { describe, it, expect } from "vitest";
import {
  normalizeWhatsAppNumber,
  buildWhatsAppMessage,
  buildWhatsAppInquiryUrl,
} from "../src/lib/whatsapp";
import { WhatsAppInquiryPayload } from "../src/types";

describe("WhatsApp Utilities", () => {
  it("normalizes 10-digit Indian numbers to E.164 without plus", () => {
    expect(normalizeWhatsAppNumber("9876543210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("98765 43210")).toBe("919876543210");
  });

  it("preserves already country-coded numbers", () => {
    expect(normalizeWhatsAppNumber("+919876543210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("+91 98765 43210")).toBe("919876543210");
  });

  it("handles empty or invalid numbers gracefully", () => {
    expect(normalizeWhatsAppNumber("")).toBeNull();
    expect(normalizeWhatsAppNumber(undefined)).toBeNull();
    expect(normalizeWhatsAppNumber("12345")).toBeNull();
  });

  it("builds a structured inquiry message with all verified fields", () => {
    const payload: WhatsAppInquiryPayload = {
      client_name: "Kiran Kumar",
      goal: "Muscle Building",
      training_type: "offline",
      selected_plan: "Transformation (₹1,999/mo)",
      preferred_days: "Monday to Friday",
      preferred_time: "Morning 6 AM",
      message: "Looking to focus on chest and back symmetry.",
    };

    const message = buildWhatsAppMessage(payload);
    expect(message).toContain("Hello Mansoor!");
    expect(message).toContain("*Name:* Kiran Kumar");
    expect(message).toContain("*Fitness Goal:* Muscle Building");
    expect(message).toContain("*Training Type:* Offline (7 Eleven Fitness Studio, Bapatla)");
    expect(message).toContain("*Selected Plan:* Transformation (₹1,999/mo)");
    expect(message).toContain("*Preferred Schedule:* Monday to Friday, Morning 6 AM");
    expect(message).toContain("*Notes / Details:* Looking to focus on chest and back symmetry.");
  });

  it("generates a valid wa.me URL when configured", () => {
    const payload: WhatsAppInquiryPayload = {
      client_name: "Rahul",
      goal: "Fat Loss",
      training_type: "online",
      selected_plan: "Foundation (₹999/mo)",
      preferred_days: "Weekends",
      preferred_time: "Evening",
    };

    const { url, error } = buildWhatsAppInquiryUrl("+919876543210", payload);
    expect(error).toBeUndefined();
    expect(url).toBeDefined();
    expect(url).toContain("https://wa.me/919876543210?text=");
  });

  it("returns error and null URL when WhatsApp number is missing", () => {
    const payload: WhatsAppInquiryPayload = {
      client_name: "Rahul",
      goal: "Fat Loss",
      training_type: "online",
      selected_plan: "Foundation (₹999/mo)",
      preferred_days: "Weekends",
      preferred_time: "Evening",
    };

    const { url, error } = buildWhatsAppInquiryUrl("", payload);
    expect(url).toBeNull();
    expect(error).toContain("currently not configured");
  });
});
