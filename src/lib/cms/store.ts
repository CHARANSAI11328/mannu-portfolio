import fs from "fs";
import path from "path";
import type { AppStoreData, ContentRevision, SectionVisibilityItem } from "../../types/index.ts";
import { INITIAL_CMS_DATA } from "./initial-data.ts";

const STORE_FILE_PATH = path.join(process.cwd(), ".cms-store.json");

export interface CmsStoreState {
  draft: AppStoreData;
  published: AppStoreData;
}

let memoryStore: CmsStoreState | null = null;

export function resetMemoryStoreForTesting(): void {
  memoryStore = null;
}

function loadStore(): CmsStoreState {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.draft && parsed.published) {
        memoryStore = parsed;
        return memoryStore!;
      } else if (parsed && parsed.hero) {
        // Seamless migration from legacy single-store format
        memoryStore = {
          draft: parsed,
          published: JSON.parse(JSON.stringify(parsed)),
        };
        saveStore(memoryStore);
        return memoryStore!;
      }
    }
  } catch (err) {
    console.error("Failed to read CMS store file, initializing fresh store", err);
  }

  // Deep clone initial data for both draft and published
  const initial = JSON.parse(JSON.stringify(INITIAL_CMS_DATA));
  memoryStore = {
    draft: initial,
    published: JSON.parse(JSON.stringify(initial)),
  };
  saveStore(memoryStore);
  return memoryStore;
}

function saveStore(data: CmsStoreState) {
  memoryStore = data;
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist CMS store to disk", err);
  }
}

export function getFullCmsData(): AppStoreData {
  return loadStore().draft;
}

export function getPublishedCmsData(): AppStoreData {
  const store = loadStore();
  const pub = store.published;

  return {
    ...pub,
    programs: (pub.programs || [])
      .filter((p) => p.is_published)
      .sort((a, b) => a.display_order - b.display_order),
    plans: (pub.plans || [])
      .filter((p) => p.is_active)
      .sort((a, b) => a.display_order - b.display_order),
    achievements: (pub.achievements || [])
      .filter((a) => a.is_published)
      .sort((a, b) => a.display_order - b.display_order),
    transformations: (pub.transformations || [])
      .filter((t) => t.is_published && t.has_client_consent)
      .sort((a, b) => a.display_order - b.display_order),
    faqs: (pub.faqs || [])
      .filter((f) => f.is_published)
      .sort((a, b) => a.display_order - b.display_order),
    sections: [...(pub.sections || [])].sort((a, b) => a.display_order - b.display_order),
  };
}

export function updateHeroData(patch: Partial<AppStoreData["hero"]>): AppStoreData {
  const store = loadStore();
  store.draft.hero = { ...store.draft.hero, ...patch };
  saveStore(store);
  return store.draft;
}

export function updateAboutData(patch: Partial<AppStoreData["about"]>): AppStoreData {
  const store = loadStore();
  store.draft.about = { ...store.draft.about, ...patch };
  saveStore(store);
  return store.draft;
}

export function saveProgram(program: AppStoreData["programs"][number]): AppStoreData {
  const store = loadStore();
  const idx = store.draft.programs.findIndex((p) => p.id === program.id);
  if (idx >= 0) {
    store.draft.programs[idx] = program;
  } else {
    store.draft.programs.push(program);
  }
  saveStore(store);
  return store.draft;
}

export function deleteProgram(id: string): AppStoreData {
  const store = loadStore();
  store.draft.programs = store.draft.programs.filter((p) => p.id !== id);
  saveStore(store);
  return store.draft;
}

export function savePlan(plan: AppStoreData["plans"][number]): AppStoreData {
  const store = loadStore();
  const idx = store.draft.plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) {
    store.draft.plans[idx] = plan;
  } else {
    store.draft.plans.push(plan);
  }
  saveStore(store);
  return store.draft;
}

export function deletePlan(id: string): AppStoreData {
  const store = loadStore();
  store.draft.plans = store.draft.plans.filter((p) => p.id !== id);
  saveStore(store);
  return store.draft;
}

export function saveAchievement(item: AppStoreData["achievements"][number]): AppStoreData {
  const store = loadStore();
  const idx = store.draft.achievements.findIndex((a) => a.id === item.id);
  if (idx >= 0) {
    store.draft.achievements[idx] = item;
  } else {
    store.draft.achievements.push(item);
  }
  saveStore(store);
  return store.draft;
}

export function deleteAchievement(id: string): AppStoreData {
  const store = loadStore();
  store.draft.achievements = store.draft.achievements.filter((a) => a.id !== id);
  saveStore(store);
  return store.draft;
}

export function saveTransformation(item: AppStoreData["transformations"][number]): AppStoreData {
  const store = loadStore();
  const idx = store.draft.transformations.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    store.draft.transformations[idx] = item;
  } else {
    store.draft.transformations.push(item);
  }
  saveStore(store);
  return store.draft;
}

export function deleteTransformation(id: string): AppStoreData {
  const store = loadStore();
  store.draft.transformations = store.draft.transformations.filter((t) => t.id !== id);
  saveStore(store);
  return store.draft;
}

export function updateContactSettings(patch: Partial<AppStoreData["contact"]>): AppStoreData {
  const store = loadStore();
  store.draft.contact = { ...store.draft.contact, ...patch };
  saveStore(store);
  return store.draft;
}

export function saveFaq(item: AppStoreData["faqs"][number]): AppStoreData {
  const store = loadStore();
  const idx = store.draft.faqs.findIndex((f) => f.id === item.id);
  if (idx >= 0) {
    store.draft.faqs[idx] = item;
  } else {
    store.draft.faqs.push(item);
  }
  saveStore(store);
  return store.draft;
}

export function deleteFaq(id: string): AppStoreData {
  const store = loadStore();
  store.draft.faqs = store.draft.faqs.filter((f) => f.id !== id);
  saveStore(store);
  return store.draft;
}

export function updateSectionSettings(sections: SectionVisibilityItem[]): AppStoreData {
  const store = loadStore();
  store.draft.sections = sections;
  saveStore(store);
  return store.draft;
}

export function updateAppearanceSettings(patch: Partial<AppStoreData["appearance"]>): AppStoreData {
  const store = loadStore();
  store.draft.appearance = { ...store.draft.appearance, ...patch };
  saveStore(store);
  return store.draft;
}

export function updateSeoSettings(patch: Partial<AppStoreData["seo"]>): AppStoreData {
  const store = loadStore();
  store.draft.seo = { ...store.draft.seo, ...patch };
  saveStore(store);
  return store.draft;
}

export function getMediaAssets() {
  const store = loadStore();
  return store.draft.media || [];
}

export function saveMediaAsset(asset: any) {
  const store = loadStore();
  if (!store.draft.media) store.draft.media = [];
  const idx = store.draft.media.findIndex((m: any) => m.id === asset.id);
  if (idx >= 0) {
    store.draft.media[idx] = asset;
  } else {
    store.draft.media.unshift(asset);
  }
  if (!store.published.media) store.published.media = [];
  store.published.media = store.draft.media;
  saveStore(store);
  return store.draft.media;
}

export function deleteMediaAsset(id: string) {
  const store = loadStore();
  if (store.draft.media) {
    store.draft.media = store.draft.media.filter((m: any) => m.id !== id);
  }
  if (store.published.media) {
    store.published.media = store.published.media.filter((m: any) => m.id !== id);
  }
  saveStore(store);
  return store.draft.media || [];
}

export function recordWhatsAppInquiryClick(): number {
  const store = loadStore();
  store.draft.metrics.whatsapp_inquiry_clicks = (store.draft.metrics.whatsapp_inquiry_clicks || 0) + 1;
  store.published.metrics.whatsapp_inquiry_clicks = store.draft.metrics.whatsapp_inquiry_clicks;
  saveStore(store);
  return store.draft.metrics.whatsapp_inquiry_clicks;
}

export function publishAllChanges(author: string = "Shaik Mansoor"): {
  success: boolean;
  published_at: string;
  revision_id: string;
} {
  const store = loadStore();
  const timestamp = new Date().toISOString();
  const revisionId = `rev-${Date.now()}`;

  // Copy draft content to published
  store.published = JSON.parse(JSON.stringify(store.draft));

  const { revisions: _revs, ...contentSnapshot } = store.published;
  const revision: ContentRevision = {
    id: revisionId,
    timestamp,
    author,
    section: "all",
    summary: "Full site published snapshot",
    snapshot: JSON.parse(JSON.stringify(contentSnapshot)),
  };

  store.draft.revisions = [revision, ...(store.draft.revisions || [])].slice(0, 20);
  store.published.revisions = store.draft.revisions;
  store.draft.metrics.last_published_at = timestamp;
  store.published.metrics.last_published_at = timestamp;

  saveStore(store);

  return {
    success: true,
    published_at: timestamp,
    revision_id: revisionId,
  };
}

export function rollbackToRevision(revisionId: string): { success: boolean; error?: string } {
  const store = loadStore();
  const targetRev = store.draft.revisions?.find((r) => r.id === revisionId);
  if (!targetRev || !targetRev.snapshot) {
    return { success: false, error: "Revision not found or empty." };
  }

  const restoredContent = JSON.parse(JSON.stringify(targetRev.snapshot));
  store.draft = {
    ...store.draft,
    ...restoredContent,
    revisions: store.draft.revisions,
  };
  store.published = JSON.parse(JSON.stringify(store.draft));
  saveStore(store);
  return { success: true };
}
