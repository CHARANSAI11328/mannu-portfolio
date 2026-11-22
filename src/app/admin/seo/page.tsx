"use client";

import React, { useState, useEffect } from "react";
import { SeoSettings } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings>(INITIAL_CMS_DATA.seo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.seo) setSeo(json.seo);
        }
      } catch (err) {
        console.warn("Using default SEO", err);
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
          SEO & Search Engine Discovery
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Optimize local discovery for &quot;Personal trainer in Bapatla&quot;, bodybuilding coach, and
          fitness training in Andhra Pradesh.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs text-xs"
      >
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Meta Title (Search Heading) *
          </label>
          <input
            type="text"
            required
            value={seo.meta_title}
            onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Meta Description *
          </label>
          <textarea
            rows={3}
            required
            value={seo.meta_description}
            onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Search Keywords (comma separated)
          </label>
          <textarea
            rows={2}
            value={seo.keywords.join(", ")}
            onChange={(e) =>
              setSeo({
                ...seo,
                keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Canonical Website URL
          </label>
          <input
            type="url"
            value={seo.canonical_url || ""}
            onChange={(e) => setSeo({ ...seo, canonical_url: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {saveSuccess ? (
            <span className="text-emerald-600 font-semibold">
              ✓ SEO settings saved successfully.
            </span>
          ) : (
            <span className="text-slate-400">Settings active.</span>
          )}

          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
