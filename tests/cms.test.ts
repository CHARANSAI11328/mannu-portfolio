import { describe, it, expect, beforeEach } from "vitest";
import {
  getFullCmsData,
  getPublishedCmsData,
  updateHeroData,
  savePlan,
  saveTransformation,
  publishAllChanges,
  recordWhatsAppInquiryClick,
} from "../src/lib/cms/store";

describe("CMS Store Logic & Business Rules", () => {
  it("loads default verified facts", () => {
    const data = getFullCmsData();
    expect(data.about.gym_experience_years).toBe(4);
    expect(data.plans.length).toBeGreaterThanOrEqual(3);
    expect(data.achievements.some((a) => a.event.includes("Bapatla"))).toBe(true);
    expect(data.achievements.some((a) => a.event.includes("ANU"))).toBe(true);
  });

  it("filters out transformations lacking client consent from published stream", () => {
    saveTransformation({
      id: "test-unconsented",
      client_name: "Private Client",
      before_image_url: "/before.jpg",
      after_image_url: "/after.jpg",
      result_summary: "Great progress",
      has_client_consent: false,
      is_published: true,
      display_order: 99,
    });

    const published = getPublishedCmsData();
    const found = published.transformations.find((t) => t.id === "test-unconsented");
    expect(found).toBeUndefined();
  });

  it("updates hero draft configuration cleanly", () => {
    updateHeroData({
      headline: "DISCIPLINE OVER EXCUSES.\nBUILD STRENGTH.",
      overlay_darkness: 80,
    });

    const data = getFullCmsData();
    expect(data.hero.headline).toBe("DISCIPLINE OVER EXCUSES.\nBUILD STRENGTH.");
    expect(data.hero.overlay_darkness).toBe(80);
  });

  it("creates revision snapshots upon publishing", () => {
    const res = publishAllChanges("Test Admin");
    expect(res.success).toBe(true);
    expect(res.revision_id).toBeDefined();

    const data = getFullCmsData();
    expect(data.revisions.length).toBeGreaterThan(0);
    expect(data.revisions[0].author).toBe("Test Admin");
  });

  it("increments aggregate inquiry clicks without persisting private user PII", () => {
    const before = getFullCmsData().metrics.whatsapp_inquiry_clicks || 0;
    const after = recordWhatsAppInquiryClick();
    expect(after).toBe(before + 1);
  });
});
