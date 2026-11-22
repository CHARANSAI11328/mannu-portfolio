import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
  ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const BASE_URL = "http://127.0.0.1:3000";
const SCREENSHOTS_DIR = path.resolve(process.cwd(), "docs", "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runVisualQA() {
  console.log("=== STARTING MANDATORY VISUAL QA & FUNCTIONAL FLOW VERIFICATION ===");
  console.log(`Using Browser: ${CHROME_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--mute-audio",
      "--window-size=1440,900"
    ],
  });

  const results = {
    checks: [],
    screenshots: []
  };

  function recordCheck(name, passed, details = "") {
    console.log(`[${passed ? "PASS" : "FAIL"}] ${name} ${details ? "- " + details : ""}`);
    results.checks.push({ name, passed, details });
    if (!passed) throw new Error(`Assertion failed: ${name}`);
  }

  const page = await browser.newPage();

  // ---------------------------------------------------------------------------
  // 1. DESKTOP VIEWPORT: 1440 x 900 (Homepage Hero & Navigation)
  // ---------------------------------------------------------------------------
  console.log("\n--- 1. Testing Desktop 1440 x 900 Viewport ---");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  // Visual Alignment Verifications
  const heroData = await page.evaluate(() => {
    const header = document.querySelector("header > div");
    const headerRect = header ? header.getBoundingClientRect() : null;
    const logo = document.querySelector("header a");
    const navItems = Array.from(document.querySelectorAll("header nav a")).map(a => a.textContent.trim());
    const pillBtn = document.querySelector("header nav button");
    const heroSec = document.querySelector("#hero");
    const heroBg = heroSec ? window.getComputedStyle(heroSec).backgroundColor : null;
    const headline = document.querySelector("#hero h1")?.innerText.trim();
    const primaryDesc = document.querySelector("#hero p")?.innerText.trim();
    const ctas = Array.from(document.querySelectorAll("#hero button, #hero a"))
      .map(el => el.textContent.trim())
      .filter(t => t === "GET IN TOUCH" || t === "PRICING");
    const bottomParagraph = document.querySelector("#hero div.border-t p, #hero div.lg\\:border-l p")?.innerText.trim();
    const video = document.querySelector("#hero video");
    const videoSrc = video ? video.querySelector("source")?.getAttribute("src") : null;

    return {
      headerHeight: headerRect ? Math.round(headerRect.height) : 0,
      logoText: logo?.textContent?.trim(),
      navItems,
      pillBtnText: pillBtn?.textContent?.trim(),
      heroBg,
      headline,
      primaryDesc,
      ctas,
      bottomParagraph,
      videoSrc
    };
  });

  recordCheck("86px Navbar Height", Math.abs(heroData.headerHeight - 86) <= 2, `Actual: ${heroData.headerHeight}px`);
  recordCheck("MANSOOR Logo Left", heroData.logoText === "MANSOOR", `Found: "${heroData.logoText}"`);
  recordCheck("Desktop Nav Items", JSON.stringify(heroData.navItems) === JSON.stringify(["ABOUT", "SERVICES", "RESULTS", "PRICING"]));
  recordCheck("Header White Pill Button Right", heroData.pillBtnText === "GET IN TOUCH");
  recordCheck("Pure Black Background #000000", heroData.heroBg === "rgb(0, 0, 0)");
  recordCheck("Lower-Left Headline Matches Exactly", heroData.headline.replace(/\s+/g, " ") === "TRAIN SMARTER. GET STRONGER.", `Found: "${heroData.headline}"`);
  recordCheck("Primary Description Present", Boolean(heroData.primaryDesc && heroData.primaryDesc.includes("Personal training programs")));
  recordCheck("Pill CTAs Present", heroData.ctas.includes("GET IN TOUCH") && heroData.ctas.includes("PRICING"));
  recordCheck("Bottom-Right Secondary Paragraph Present", Boolean(heroData.bottomParagraph && heroData.bottomParagraph.includes("No shortcuts")));
  recordCheck("Monochrome Athletic Video Attached", heroData.videoSrc === "/videos/mansoor-hero.mp4");

  // Capture Hero & Navigation Screenshot
  const heroShotPath = path.join(SCREENSHOTS_DIR, "01-desktop-hero-1440x900.png");
  await page.screenshot({ path: heroShotPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log(`Saved screenshot: ${heroShotPath}`);
  results.screenshots.push("01-desktop-hero-1440x900.png");

  // ---------------------------------------------------------------------------
  // 2. FULL HOMEPAGE DESKTOP (Services, Results, Pricing)
  // ---------------------------------------------------------------------------
  console.log("\n--- 2. Capturing Full Desktop Homepage ---");
  const fullPageShotPath = path.join(SCREENSHOTS_DIR, "02-desktop-fullpage-1440.png");
  await page.screenshot({ path: fullPageShotPath, fullPage: true });
  console.log(`Saved screenshot: ${fullPageShotPath}`);
  results.screenshots.push("02-desktop-fullpage-1440.png");

  // Verify Services, Results, Pricing Sections Exist and Have Content
  const sectionContent = await page.evaluate(() => {
    const services = Boolean(document.querySelector("#services"));
    const resultsSec = Boolean(document.querySelector("#results"));
    const pricing = Boolean(document.querySelector("#pricing"));
    const pricingPlans = Array.from(document.querySelectorAll("#pricing h3")).map(h => h.textContent.trim());
    return { services, resultsSec, pricing, pricingPlans };
  });

  recordCheck("Services Section Rendered", sectionContent.services);
  recordCheck("Results Section Rendered", sectionContent.resultsSec);
  recordCheck("Pricing Section Rendered", sectionContent.pricing);
  recordCheck("Pricing Plans Rendered", sectionContent.pricingPlans.length >= 3, `Plans: ${sectionContent.pricingPlans.join(", ")}`);

  // ---------------------------------------------------------------------------
  // 3. MOBILE VIEWPORT: 390 x 844 (Mobile Hero & Navigation Drawer)
  // ---------------------------------------------------------------------------
  console.log("\n--- 3. Testing Mobile 390 x 844 Viewport ---");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  // Capture Mobile Hero
  const mobileHeroShotPath = path.join(SCREENSHOTS_DIR, "03-mobile-hero-390x844.png");
  await page.screenshot({ path: mobileHeroShotPath, clip: { x: 0, y: 0, width: 390, height: 844 } });
  console.log(`Saved screenshot: ${mobileHeroShotPath}`);
  results.screenshots.push("03-mobile-hero-390x844.png");

  // Open Navigation Drawer
  console.log("Opening mobile navigation drawer...");
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Navigation Menu"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400)); // drawer transition

  const drawerVisible = await page.evaluate(() => {
    const drawer = document.querySelector("header div.space-y-4");
    return Boolean(drawer);
  });
  recordCheck("Mobile Drawer Opened", drawerVisible);

  // Capture Mobile Drawer
  const mobileDrawerShotPath = path.join(SCREENSHOTS_DIR, "04-mobile-drawer-390x844.png");
  await page.screenshot({ path: mobileDrawerShotPath, clip: { x: 0, y: 0, width: 390, height: 844 } });
  console.log(`Saved screenshot: ${mobileDrawerShotPath}`);
  results.screenshots.push("04-mobile-drawer-390x844.png");

  // ---------------------------------------------------------------------------
  // 4. WHATSAPP INQUIRY MODAL & FORM VERIFICATION
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. Testing WhatsApp Inquiry Modal ---");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  // Intercept window.open to test URL generation
  await page.evaluate(() => {
    window.__lastOpenedUrl = null;
    window.open = (url) => {
      window.__lastOpenedUrl = url;
      return null;
    };
  });

  // Click "GET IN TOUCH" in header
  await page.evaluate(() => {
    const btn = document.querySelector("header nav button");
    if (btn) btn.click();
  });
  await page.waitForSelector('[role="dialog"]', { visible: true });

  // Fill in Form
  await page.type('input[placeholder*="Rahul Sharma"]', "Karthik Sharma");
  await page.type('textarea', "Interested in strength progression and posture alignment.");

  // Capture WhatsApp Modal Open
  const modalShotPath = path.join(SCREENSHOTS_DIR, "05-whatsapp-modal-open.png");
  await page.screenshot({ path: modalShotPath });
  console.log(`Saved screenshot: ${modalShotPath}`);
  results.screenshots.push("05-whatsapp-modal-open.png");

  // Submit modal form
  await page.evaluate(() => {
    const submitBtn = document.querySelector('[role="dialog"] button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });

  await new Promise(r => setTimeout(r, 300));
  const generatedUrl = await page.evaluate(() => window.__lastOpenedUrl);
  console.log(`Generated WhatsApp URL: ${generatedUrl}`);

  recordCheck("WhatsApp URL Generated", Boolean(generatedUrl && generatedUrl.startsWith("https://wa.me/919876543210")));
  recordCheck("WhatsApp URL Contains Client Name", generatedUrl.includes("Karthik+Sharma") || generatedUrl.includes("Karthik%20Sharma"));
  recordCheck("WhatsApp URL Contains Training Plan", generatedUrl.includes("Transformation") || generatedUrl.includes("₹1,999"));

  // ---------------------------------------------------------------------------
  // 5. ADMIN AUTHENTICATION FLOW
  // ---------------------------------------------------------------------------
  console.log("\n--- 5. Testing Admin Authentication Flow ---");
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "networkidle0" });

  // Capture Login Screen
  const adminLoginShotPath = path.join(SCREENSHOTS_DIR, "06-admin-login.png");
  await page.screenshot({ path: adminLoginShotPath });
  console.log(`Saved screenshot: ${adminLoginShotPath}`);
  results.screenshots.push("06-admin-login.png");

  // Fill Credentials
  await page.type('input[type="email"]', "mansoor@fitness.com");
  await page.type('input[type="password"]', "MansoorFitness@2026");
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click('button[type="submit"]')
  ]);

  const currentUrl = page.url();
  recordCheck("Admin Login Succeeded & Redirected", currentUrl.includes("/admin"), `Current URL: ${currentUrl}`);

  // Capture Admin Dashboard
  const adminDashShotPath = path.join(SCREENSHOTS_DIR, "07-admin-dashboard.png");
  await page.screenshot({ path: adminDashShotPath });
  console.log(`Saved screenshot: ${adminDashShotPath}`);
  results.screenshots.push("07-admin-dashboard.png");

  // ---------------------------------------------------------------------------
  // 6. ADMIN HERO VIDEO EDITOR & CMS PUBLISHING FLOW
  // ---------------------------------------------------------------------------
  console.log("\n--- 6. Testing Admin Hero Editor & Publishing Workflow ---");
  await page.goto(`${BASE_URL}/admin/editor`, { waitUntil: "networkidle0" });

  const editorLoaded = await page.evaluate(() => {
    const videoInput = document.querySelector('input[placeholder="/videos/mansoor-hero.mp4"]');
    const headlineTextarea = document.querySelector("textarea");
    return Boolean(videoInput || headlineTextarea);
  });
  recordCheck("Admin Hero Editor Page Loaded", editorLoaded);

  // Capture Admin Hero Editor
  const adminEditorShotPath = path.join(SCREENSHOTS_DIR, "08-admin-hero-editor.png");
  await page.screenshot({ path: adminEditorShotPath });
  console.log(`Saved screenshot: ${adminEditorShotPath}`);
  results.screenshots.push("08-admin-hero-editor.png");

  // E2E CMS Publishing Verification:
  // 1. Get initial published headline
  const initialPubRes = await fetch(`${BASE_URL}/api/cms/published`);
  const initialPubData = await initialPubRes.json();
  const originalHeadline = initialPubData.hero.headline;

  // 2. Mutate draft via API
  const testDraftHeadline = "TEST E2E DRAFT HEADLINE";
  const updatedHero = { ...initialPubData.hero, headline: testDraftHeadline };
  const cookies = await page.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ");

  const draftRes = await fetch(`${BASE_URL}/api/cms/hero`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify(updatedHero),
  });
  recordCheck("Draft Hero Update Accepted", draftRes.ok);

  // 3. Verify public endpoint is NOT updated yet (Draft isolation)
  const duringPubRes = await fetch(`${BASE_URL}/api/cms/published`);
  const duringPubData = await duringPubRes.json();
  recordCheck("Draft Isolation Maintained Before Publish", duringPubData.hero.headline === originalHeadline);

  // 4. Publish changes
  const pubRes = await fetch(`${BASE_URL}/api/cms/publish`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
  });
  recordCheck("CMS Publish API Succeeded", pubRes.ok);

  // 5. Verify published endpoint reflects the change
  const afterPubRes = await fetch(`${BASE_URL}/api/cms/published`);
  const afterPubData = await afterPubRes.json();
  recordCheck("Published Endpoint Updated After Publish", afterPubData.hero.headline === testDraftHeadline);

  // 6. Restore original headline and re-publish for clean state
  const restoreHero = { ...afterPubData.hero, headline: originalHeadline };
  await fetch(`${BASE_URL}/api/cms/hero`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify(restoreHero),
  });
  await fetch(`${BASE_URL}/api/cms/publish`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
  });

  const finalPubRes = await fetch(`${BASE_URL}/api/cms/published`);
  const finalPubData = await finalPubRes.json();
  recordCheck("Restored Original Published State Cleanly", finalPubData.hero.headline === originalHeadline);

  await browser.close();

  console.log("\n=======================================================");
  console.log("ALL MANDATORY VISUAL QA & E2E CHECKS PASSED SUCCESSFULLY!");
  console.log(`Captured ${results.screenshots.length} Screenshots into docs/screenshots/`);
  console.log("=======================================================\n");
}

runVisualQA().catch((err) => {
  console.error("Visual QA Failed:", err);
  process.exit(1);
});
