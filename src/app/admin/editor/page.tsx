"use client";

import React, { useState, useEffect } from "react";
import { HeroSectionData, SectionVisibilityItem } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function WebsiteEditorPage() {
  const [hero, setHero] = useState<HeroSectionData>(INITIAL_CMS_DATA.hero);
  const [sections, setSections] = useState<SectionVisibilityItem[]>(INITIAL_CMS_DATA.sections);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleUploadForField = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "video_url" | "mobile_video_url" | "poster_url" | "fallback_image_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", field.includes("video") ? "Hero Video" : "Hero Image");

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        setHero((prev) => ({ ...prev, [field]: json.url }));
      } else {
        alert(json.error || "Upload failed");
      }
    } catch {
      alert("Network error uploading file");
    } finally {
      setUploadingField(null);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.hero) setHero(json.hero);
          if (json.sections) setSections(json.sections);
        }
      } catch (err) {
        console.warn("Using default hero data", err);
      }
    }
    loadData();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/cms/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Failed to save hero changes.");
      }
    } catch {
      alert("Error saving hero settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSection = async (id: string) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, is_enabled: !s.is_enabled } : s
    );
    setSections(updated);

    try {
      await fetch("/api/cms/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch {
      alert("Failed to update section visibility.");
    }
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Website & Hero Video Editor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure the authoritative cinematic hero background video, typography, and section
            visibility.
          </p>
        </div>

        <button
          onClick={() => setPreviewActive(!previewActive)}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          {previewActive ? "Hide Live Hero Preview" : "Show Live Hero Preview 👁️"}
        </button>
      </div>

      {/* Live Preview Panel */}
      {previewActive && (
        <div className="bg-black border border-slate-700 rounded-2xl overflow-hidden p-6 text-white space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>PREVIEW: AUTHORITATIVE REFERENCE HERO (1440x900 viewport simulation)</span>
            <span className="text-emerald-400">● Live rendering</span>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-end p-6 bg-black">
            {/* Background Simulation */}
            <div
              className="absolute inset-0 bg-cover bg-right"
              style={{
                backgroundImage: hero.fallback_image_url
                  ? `url(${hero.fallback_image_url})`
                  : "radial-gradient(ellipse at 70% 40%, #2a2a2a 0%, #0d0d0d 60%, #000000 90%)",
                filter: `${hero.grayscale ? "grayscale(100%)" : ""} brightness(${
                  hero.video_brightness || 90
                }%) contrast(${hero.video_contrast || 120}%)`,
              }}
            />
            {/* Gradient Mask */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
              style={{ opacity: (hero.overlay_darkness || 75) / 100 }}
            />

            <div className="relative z-10 max-w-lg space-y-2">
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                {hero.badge}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight text-white whitespace-pre-line">
                {hero.headline}
              </h3>
              <p className="text-xs text-neutral-300 leading-snug">{hero.description}</p>
              <div className="pt-2 flex items-center gap-3">
                <span className="bg-white text-black text-[10px] font-bold uppercase px-4 py-1.5 rounded-full">
                  {hero.primary_cta_label}
                </span>
                <span className="border border-neutral-600 text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-full">
                  {hero.secondary_cta_label}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Hero Video & Copy Settings Form */}
      <form
        onSubmit={handleSaveHero}
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8 shadow-xs"
      >
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            1. Hero Background Video & Visual Art Direction
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real gym footage of Shaik Mansoor positioned center-right with high contrast monochrome
            styling.
          </p>
        </div>

        {/* Video URLs & Poster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Desktop Video (.mp4) *
              </label>
              <label className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                {uploadingField === "video_url" ? "Uploading..." : "+ Upload File"}
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  disabled={uploadingField === "video_url"}
                  onChange={(e) => handleUploadForField(e, "video_url")}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              required
              value={hero.video_url}
              onChange={(e) => setHero({ ...hero, video_url: e.target.value })}
              placeholder="/videos/mansoor-hero.mp4"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-slate-900 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              1920x1080 horizontal loopable footage of Mansoor.
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Mobile Video (.mp4) (Optional)
              </label>
              <label className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                {uploadingField === "mobile_video_url" ? "Uploading..." : "+ Upload File"}
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  disabled={uploadingField === "mobile_video_url"}
                  onChange={(e) => handleUploadForField(e, "mobile_video_url")}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              value={hero.mobile_video_url || ""}
              onChange={(e) => setHero({ ...hero, mobile_video_url: e.target.value })}
              placeholder="/videos/mansoor-hero-mobile.mp4"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-slate-900 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              1080x1920 vertical format for mobile devices.
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Video Poster Image *
              </label>
              <label className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                {uploadingField === "poster_url" ? "Uploading..." : "+ Upload File"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingField === "poster_url"}
                  onChange={(e) => handleUploadForField(e, "poster_url")}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              required
              value={hero.poster_url}
              onChange={(e) => setHero({ ...hero, poster_url: e.target.value })}
              placeholder="/images/hero-poster.jpg"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-slate-900 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              High-contrast monochrome frame loaded while video buffers.
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Fallback Image
              </label>
              <label className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                {uploadingField === "fallback_image_url" ? "Uploading..." : "+ Upload File"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingField === "fallback_image_url"}
                  onChange={(e) => handleUploadForField(e, "fallback_image_url")}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              value={hero.fallback_image_url || ""}
              onChange={(e) => setHero({ ...hero, fallback_image_url: e.target.value })}
              placeholder="/images/hero-fallback.jpg"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-slate-900 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Displayed if video is blocked by client power-saving mode.
            </span>
          </div>
        </div>

        {/* Video Focal Point & Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Video Focal Point
            </label>
            <select
              value={hero.focal_point}
              onChange={(e) =>
                setHero({
                  ...hero,
                  focal_point: e.target.value as HeroSectionData["focal_point"],
                })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
            >
              <option value="center-right">Center-Right (Recommended)</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="center-left">Center-Left</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-1.5">
              <span>Darkness Overlay</span>
              <span className="font-mono">{hero.overlay_darkness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              value={hero.overlay_darkness}
              onChange={(e) =>
                setHero({ ...hero, overlay_darkness: parseInt(e.target.value) })
              }
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-1.5">
              <span>Video Brightness</span>
              <span className="font-mono">{hero.video_brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={hero.video_brightness}
              onChange={(e) =>
                setHero({ ...hero, video_brightness: parseInt(e.target.value) })
              }
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-1.5">
              <span>Video Contrast</span>
              <span className="font-mono">{hero.video_contrast}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="180"
              value={hero.video_contrast}
              onChange={(e) =>
                setHero({ ...hero, video_contrast: parseInt(e.target.value) })
              }
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Hero Headlines & Text */}
        <div className="border-t border-slate-200 pt-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            2. Hero Editorial Typography & CTAs
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Small Header Identifier Badge
            </label>
            <input
              type="text"
              value={hero.badge}
              onChange={(e) => setHero({ ...hero, badge: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Main Lower-Left Headline (supports line breaks) *
            </label>
            <textarea
              rows={2}
              required
              value={hero.headline}
              onChange={(e) => setHero({ ...hero, headline: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none font-sans font-bold text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Primary Supporting Description *
            </label>
            <textarea
              rows={2}
              required
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Lower-Right Secondary Description (Authoritative Reference Placement) *
            </label>
            <textarea
              rows={2}
              required
              value={hero.secondary_description}
              onChange={(e) => setHero({ ...hero, secondary_description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                Primary CTA Label
              </label>
              <input
                type="text"
                value={hero.primary_cta_label}
                onChange={(e) => setHero({ ...hero, primary_cta_label: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                Secondary CTA Label
              </label>
              <input
                type="text"
                value={hero.secondary_cta_label}
                onChange={(e) => setHero({ ...hero, secondary_cta_label: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {saveSuccess ? (
            <span className="text-xs text-emerald-600 font-semibold">
              ✓ Hero configuration saved! Click &quot;Publish Live Changes&quot; to push live.
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Changes are saved as drafts until published.
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs uppercase px-6 py-2.5 rounded-lg transition-colors"
          >
            {isSaving ? "Saving..." : "Save Hero Settings"}
          </button>
        </div>
      </form>

      {/* Section Order & Visibility Toggles */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            3. Public Website Section Visibility Controls
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Instantly show or hide entire sections on the public website.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {sections.map((sec, idx) => (
            <div key={sec.id} className="py-3.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-slate-900 block">
                  {sec.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Target anchor: #{sec.id} • Order: 0{idx + 1}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleToggleSection(sec.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                  sec.is_enabled
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-500 border border-slate-300"
                }`}
              >
                {sec.is_enabled ? "Enabled (Visible)" : "Hidden"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
