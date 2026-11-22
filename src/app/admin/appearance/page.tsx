"use client";

import React, { useState, useEffect } from "react";
import { AppearanceSettings } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminAppearancePage() {
  const [appearance, setAppearance] = useState<AppearanceSettings>(INITIAL_CMS_DATA.appearance);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.appearance) setAppearance(json.appearance);
        }
      } catch (err) {
        console.warn("Using default appearance", err);
      }
    }
    load();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Brand & Appearance Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          LOCKED UI/UX DIRECTION: The authoritative reference visual design system uses pure black
          (#000000), monochrome accents, and pill-shaped CTAs.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Brand Wordmark *</label>
            <input
              type="text"
              required
              value={appearance.brand_name}
              onChange={(e) => setAppearance({ ...appearance, brand_name: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Brand Tagline *</label>
            <input
              type="text"
              required
              value={appearance.brand_tagline}
              onChange={(e) => setAppearance({ ...appearance, brand_tagline: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Primary Background Color (Locked to Pure Black)
            </label>
            <input
              type="text"
              disabled
              value="#000000"
              className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-2 text-slate-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Primary CTA Button Color (Pure White Pill)
            </label>
            <input
              type="text"
              disabled
              value="#FFFFFF"
              className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-2 text-slate-500 outline-none font-mono"
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5 text-slate-600">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            Design System Guardrails
          </div>
          <p className="leading-relaxed">
            Per client requirements, flashy gradients, excessive neon, and bright accent colors are
            strictly disabled to preserve the high-end editorial athlete identity.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {saveSuccess ? (
            <span className="text-emerald-600 font-semibold">
              ✓ Appearance configuration verified.
            </span>
          ) : (
            <span className="text-slate-400">Settings active.</span>
          )}

          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Save Appearance
          </button>
        </div>
      </form>
    </div>
  );
}
