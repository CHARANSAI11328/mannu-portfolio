"use client";

import React, { useState, useEffect } from "react";
import { Achievement } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_CMS_DATA.achievements);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.achievements) setAchievements(json.achievements);
        }
      } catch (err) {
        console.warn("Using default achievements", err);
      }
    }
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      id: `ach-${Date.now()}`,
      title: "New Achievement",
      ranking: "1st Place",
      event: "Bodybuilding Championship",
      description: "Description of verified competitive placement.",
      display_order: achievements.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (a: Achievement) => {
    setEditingItem({ ...a });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const res = await fetch(`/api/cms/achievements?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const json = await res.json();
        setAchievements(json.achievements);
      }
    } catch {
      alert("Failed to delete achievement.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/cms/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        const json = await res.json();
        setAchievements(json.achievements);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save achievement.");
      }
    } catch {
      alert("Failed to save achievement.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Athlete Achievements & Honors
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified bodybuilding competition records. Do not invent unverified competitions or
            awards.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
        >
          + Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase bg-slate-100 text-slate-800 px-2.5 py-1 rounded">
                  {ach.ranking}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                    ach.is_published
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {ach.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 uppercase mb-1">
                {ach.title}
              </h3>
              <div className="text-xs text-slate-600 font-medium mb-3">{ach.event}</div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{ach.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
              <button
                onClick={() => handleEdit(ach)}
                className="text-slate-700 hover:text-slate-900 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ach.id)}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 text-slate-900 shadow-2xl">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
              Edit Achievement
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ranking</label>
                  <input
                    type="text"
                    required
                    value={editingItem.ranking}
                    onChange={(e) => setEditingItem({ ...editingItem, ranking: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Year (Optional)</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Event Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.event}
                  onChange={(e) => setEditingItem({ ...editingItem, event: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-ach"
                  checked={editingItem.is_published}
                  onChange={(e) => setEditingItem({ ...editingItem, is_published: e.target.checked })}
                  className="accent-slate-900"
                />
                <label htmlFor="pub-ach" className="font-semibold text-slate-700 cursor-pointer">
                  Published to Live Website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
