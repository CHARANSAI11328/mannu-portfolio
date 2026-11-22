"use client";

import React, { useState, useEffect } from "react";
import { AboutSectionData } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminProfilePage() {
  const [about, setAbout] = useState<AboutSectionData>(INITIAL_CMS_DATA.about);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.about) setAbout(json.about);
        }
      } catch (err) {
        console.warn("Using default about data", err);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Failed to save profile changes.");
      }
    } catch {
      alert("Error saving profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Trainer Profile & Biography
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage Shaik Mansoor&apos;s verified background, gym experience, and coaching philosophy.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Badge / Subtitle</label>
            <input
              type="text"
              value={about.badge}
              onChange={(e) => setAbout({ ...about, badge: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Section Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
          <input
            type="text"
            value={about.tagline}
            onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Biography Paragraphs (one per line)
          </label>
          <textarea
            rows={5}
            value={about.bio_paragraphs.join("\n\n")}
            onChange={(e) =>
              setAbout({
                ...about,
                bio_paragraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean),
              })
            }
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Gym Experience Years (Verified)
            </label>
            <input
              type="number"
              value={about.gym_experience_years}
              onChange={(e) =>
                setAbout({
                  ...about,
                  gym_experience_years: parseInt(e.target.value) || 4,
                })
              }
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Coaching Facility Location
            </label>
            <input
              type="text"
              value={about.primary_gym_location}
              onChange={(e) =>
                setAbout({ ...about, primary_gym_location: e.target.value })
              }
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Training Philosophy Pillars (comma separated)
          </label>
          <textarea
            rows={3}
            value={about.training_philosophy.join(", ")}
            onChange={(e) =>
              setAbout({
                ...about,
                training_philosophy: e.target.value.split(",").map((p) => p.trim()).filter(Boolean),
              })
            }
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {saveSuccess ? (
            <span className="text-emerald-600 font-semibold">
              ✓ Profile saved! Publish live changes to update website.
            </span>
          ) : (
            <span className="text-slate-400">Updates saved to draft store.</span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
