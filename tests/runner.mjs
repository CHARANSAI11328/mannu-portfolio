import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Ensure clean test store before test execution
try {
  if (fs.existsSync(".cms-store.json")) {
    fs.unlinkSync(".cms-store.json");
  }
} catch {}

import {
  normalizeWhatsAppNumber,
  buildWhatsAppMessage,
  buildWhatsAppInquiryUrl,
} from "../src/lib/whatsapp/index.ts";
import {
  getFullCmsData,
  getPublishedCmsData,
  updateHeroData,
  savePlan,
  saveTransformation,
  saveProgram,
  publishAllChanges,
  rollbackToRevision,
  recordWhatsAppInquiryClick,
  getMediaAssets,
  saveMediaAsset,
  deleteMediaAsset,
  resetMemoryStoreForTesting,
} from "../src/lib/cms/store.ts";
import { INITIAL_CMS_DATA } from "../src/lib/cms/initial-data.ts";
import {
  verifyAdminCredentials,
  generateSessionToken,
  verifySessionToken,
} from "../src/lib/auth/index.ts";

test("WhatsApp Number Normalization", async (t) => {
  await t.test("formats standard 10-digit Indian numbers", () => {
    assert.equal(normalizeWhatsAppNumber("9876543210"), "919876543210");
  });

  await t.test("normalizes spaced and dashed numbers with +91 prefix", () => {
    assert.equal(normalizeWhatsAppNumber("+91 98765-43210"), "919876543210");
  });

  await t.test("normalizes numbers with leading zero", () => {
    assert.equal(normalizeWhatsAppNumber("09876543210"), "919876543210");
  });

  await t.test("returns null for empty, undefined or invalid strings", () => {
    assert.equal(normalizeWhatsAppNumber(""), null);
    assert.equal(normalizeWhatsAppNumber(undefined), null);
    assert.equal(normalizeWhatsAppNumber("123"), null);
    assert.equal(normalizeWhatsAppNumber("abcdefg"), null);
  });
});

test("WhatsApp Message & Link Generation", async (t) => {
  await t.test("generates structured inquiry text with all verified fields", () => {
    const payload = {
      client_name: "Rahul Sharma",
      goal: "Muscle Building",
      training_type: "offline",
      selected_plan: "Transformation (₹1,999/mo)",
      preferred_days: "Mon-Sat",
      preferred_time: "Morning 6 AM",
      message: "Focus on hypertrophy and chest development.",
    };

    const msg = buildWhatsAppMessage(payload);
    assert.match(msg, /Hello Mansoor!/);
    assert.match(msg, /\*Name:\* Rahul Sharma/);
    assert.match(msg, /\*Fitness Goal:\* Muscle Building/);
    assert.match(msg, /\*Training Type:\* Offline \(7 Eleven Fitness Studio, Bapatla\)/);
    assert.match(msg, /\*Selected Plan:\* Transformation \(₹1,999\/mo\)/);
    assert.match(msg, /\*Preferred Schedule:\* Mon-Sat, Morning 6 AM/);
    assert.match(msg, /\*Notes \/ Details:\* Focus on hypertrophy and chest development\./);
  });

  await t.test("generates valid wa.me URL when phone is provided", () => {
    const payload = {
      client_name: "Kiran",
      goal: "Fat Loss",
      training_type: "online",
      selected_plan: "Foundation (₹999/mo)",
      preferred_days: "Flexible",
      preferred_time: "Flexible",
    };

    const { url, error } = buildWhatsAppInquiryUrl("+919876543210", payload);
    assert.equal(error, undefined);
    assert.ok(url);
    assert.match(url, /^https:\/\/wa\.me\/919876543210\?text=/);
  });

  await t.test("returns graceful unavailable state if WhatsApp is unconfigured", () => {
    const payload = {
      client_name: "Kiran",
      goal: "Fat Loss",
      training_type: "online",
      selected_plan: "Foundation (₹999/mo)",
      preferred_days: "Flexible",
      preferred_time: "Flexible",
    };

    const { url, error } = buildWhatsAppInquiryUrl("", payload);
    assert.equal(url, null);
    assert.ok(error && error.includes("not configured"));
  });
});

test("CMS Store Initial Verified Credentials", async (t) => {
  const data = getFullCmsData();

  await t.test("adheres strictly to 4 years gym experience fact", () => {
    assert.equal(data.about.gym_experience_years, 4);
    assert.match(data.about.gym_experience_statement, /Four years of gym experience/);
  });

  await t.test("includes verified bodybuilding competition honors", () => {
    const bapatla = data.achievements.find((a) => a.event.includes("Bapatla"));
    assert.ok(bapatla);
    assert.equal(bapatla.ranking, "1st Place");

    const anu = data.achievements.find((a) => a.event.includes("ANU"));
    assert.ok(anu);
    assert.equal(anu.ranking, "2nd Place");
  });

  await t.test("seeds exactly three initial monthly pricing tiers", () => {
    assert.equal(data.plans.length, 3);
    const foundation = data.plans.find((p) => p.name === "FOUNDATION");
    const transformation = data.plans.find((p) => p.name === "TRANSFORMATION");
    const elite = data.plans.find((p) => p.name === "ELITE COACHING");

    assert.ok(foundation && foundation.price_inr === 999);
    assert.ok(transformation && transformation.price_inr === 1999);
    assert.ok(elite && elite.price_inr === 3999);
    assert.equal(transformation.is_highlighted, true);
  });

  await t.test("enforces session flexibility disclaimer on all plans", () => {
    for (const plan of data.plans) {
      assert.match(
        plan.session_disclaimer,
        /Session counts, frequency, and schedules are flexible and (discussed|agreed) directly/
      );
    }
  });

  await t.test("starts with zero fake transformations", () => {
    assert.equal(data.transformations.length, 0);
  });
});

test("CMS Privacy & Consent Gates", async (t) => {
  await t.test("strictly prevents unconsented transformations from appearing on public site even when published", () => {
    saveTransformation({
      id: "unconsented-test-1",
      client_name: "Private User",
      before_image_url: "/images/transform-before.jpg",
      after_image_url: "/images/transform-after.jpg",
      result_summary: "Progress report",
      has_client_consent: false,
      is_published: true,
      display_order: 1,
    });

    publishAllChanges("Admin");

    const published = getPublishedCmsData();
    const found = published.transformations.find((t) => t.id === "unconsented-test-1");
    assert.equal(found, undefined, "Unconsented transformation must never be published");
  });

  await t.test("allows consented transformation to be published", () => {
    saveTransformation({
      id: "consented-test-1",
      client_name: "Approved Client",
      before_image_url: "/images/transform-before.jpg",
      after_image_url: "/images/transform-after.jpg",
      result_summary: "Approved result",
      has_client_consent: true,
      is_published: true,
      display_order: 1,
    });

    publishAllChanges("Admin");

    const published = getPublishedCmsData();
    const found = published.transformations.find((t) => t.id === "consented-test-1");
    assert.ok(found, "Consented and published transformation must appear");
  });
});

test("CMS Draft vs Published Isolation (Test K Verification)", async (t) => {
  await t.test("draft hero updates stay private and do not change published site before publishing", () => {
    const publishedBefore = getPublishedCmsData().hero.headline;

    updateHeroData({
      headline: "NEW UNPUBLISHED DRAFT HEADLINE",
      overlay_darkness: 88,
    });

    // Admin/Draft view sees draft changes
    const draftAfter = getFullCmsData().hero.headline;
    assert.equal(draftAfter, "NEW UNPUBLISHED DRAFT HEADLINE");

    // Public published view still sees previously published headline
    const publishedAfter = getPublishedCmsData().hero.headline;
    assert.equal(publishedAfter, publishedBefore);
    assert.notEqual(publishedAfter, "NEW UNPUBLISHED DRAFT HEADLINE");
  });

  await t.test("draft updates become public only after publishAllChanges()", () => {
    publishAllChanges("Shaik Mansoor");

    const published = getPublishedCmsData().hero;
    assert.equal(published.headline, "NEW UNPUBLISHED DRAFT HEADLINE");
    assert.equal(published.overlay_darkness, 88);
  });
});

test("CMS Publishing, Rollback & Aggregate Metrics", async (t) => {
  await t.test("creates version snapshots upon publishing", () => {
    updateHeroData({
      headline: "BUILT BY DISCIPLINE.\nOWN YOUR PROGRESS.",
      overlay_darkness: 70,
    });

    const pubResult = publishAllChanges("Mansoor");
    assert.equal(pubResult.success, true);
    assert.ok(pubResult.revision_id);

    const store = getFullCmsData();
    assert.ok(store.revisions.length > 0);
    assert.equal(store.revisions[0].author, "Mansoor");
  });

  await t.test("restores previous snapshot on rollback", () => {
    const store = getFullCmsData();
    const revId = store.revisions[0]?.id;
    assert.ok(revId);

    const rollbackResult = rollbackToRevision(revId);
    assert.equal(rollbackResult.success, true);
  });

  await t.test("tracks privacy-conscious aggregate inquiry CTA clicks", () => {
    const count1 = recordWhatsAppInquiryClick();
    const count2 = recordWhatsAppInquiryClick();
    assert.equal(count2, count1 + 1);
  });
});

test("Admin Authentication & Security (Test A & Test B Verification)", async (t) => {
  await t.test("valid admin credentials authenticate successfully", () => {
    const user = verifyAdminCredentials("mansoor@fitness.com", "MansoorFitness@2026");
    assert.ok(user);
    assert.equal(user.email, "mansoor@fitness.com");
    assert.equal(user.role, "admin");
  });

  await t.test("invalid password or email is rejected", () => {
    const badPass = verifyAdminCredentials("mansoor@fitness.com", "WrongPassword123");
    assert.equal(badPass, null);

    const badEmail = verifyAdminCredentials("impostor@random.com", "MansoorFitness@2026");
    assert.equal(badEmail, null);
  });

  await t.test("session token generation and verification works", () => {
    const user = { email: "mansoor@fitness.com", name: "Shaik Mansoor", role: "admin" };
    const token = generateSessionToken(user);
    assert.ok(token);

    const verified = verifySessionToken(token);
    assert.ok(verified);
    assert.equal(verified.email, "mansoor@fitness.com");

    const tampered = token.slice(0, -4) + "abcd";
    assert.equal(verifySessionToken(tampered), null);
  });
});

test("Media Library Store Operations (Test F Verification)", async (t) => {
  await t.test("allows saving and retrieving uploaded media assets", () => {
    const asset = {
      id: "test-media-1",
      name: "mansoor-posing.jpg",
      url: "/uploads/mansoor-posing.jpg",
      type: "image/jpeg",
      size: "820 KB",
      category: "Trainer Photography",
      uploaded_at: new Date().toISOString(),
    };

    saveMediaAsset(asset);
    const assets = getMediaAssets();
    const found = assets.find((a) => a.id === "test-media-1");
    assert.ok(found);
    assert.equal(found.url, "/uploads/mansoor-posing.jpg");
  });

  await t.test("allows deleting media assets from library", () => {
    deleteMediaAsset("test-media-1");
    const assets = getMediaAssets();
    const found = assets.find((a) => a.id === "test-media-1");
    assert.equal(found, undefined);
  });

  // Teardown: Restore clean canonical CMS data so tests do not leave dirty state
  try {
    if (fs.existsSync(".cms-store.json")) {
      fs.unlinkSync(".cms-store.json");
    }
  } catch {}
  resetMemoryStoreForTesting();
});
