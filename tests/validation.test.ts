import { describe, it, expect } from "vitest";
import { monthlyPlanSchema, transformationSchema, contactSettingsSchema } from "../src/lib/validation";

describe("Schema Validation", () => {
  it("validates pricing plan accurately", () => {
    const valid = {
      id: "plan-test",
      name: "TRANSFORMATION",
      tagline: "Targeted coaching.",
      price_inr: 1999,
      billing_period: "month",
      target_audience: "Goal-oriented clients",
      features: ["Custom split", "Form reviews"],
      is_highlighted: true,
      is_active: true,
      session_disclaimer: "Flexible sessions agreed with trainer.",
      display_order: 2,
    };

    expect(() => monthlyPlanSchema.parse(valid)).not.toThrow();
  });

  it("rejects non-positive pricing", () => {
    const invalid = {
      id: "plan-test",
      name: "FREE",
      tagline: "Free coaching",
      price_inr: -100,
      target_audience: "Anyone",
      features: ["Feature"],
      session_disclaimer: "Disclaimer",
      display_order: 1,
    };

    expect(() => monthlyPlanSchema.parse(invalid)).toThrow();
  });

  it("validates contact settings with valid WhatsApp number", () => {
    const validContact = {
      whatsapp_number: "+919876543210",
      gym_name: "7 Eleven Fitness Studio",
      gym_address: "Bapatla, Andhra Pradesh",
      availability_notes: "Mon-Sat",
    };

    expect(() => contactSettingsSchema.parse(validContact)).not.toThrow();
  });
});
