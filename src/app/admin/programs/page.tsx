"use client";

import React, { useState, useEffect } from "react";
import { TrainingProgram } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>(INITIAL_CMS_DATA.programs);
  const [editingProg, setEditingProg] = useState<TrainingProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.programs) setPrograms(json.programs);
        }
      } catch (err) {
        console.warn("Using default programs", err);
      }
    }
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingProg({
      id: `prog-${Date.now()}`,
      slug: "new-program",
      title: "New Program",
      category: "Hypertrophy",
      description: "Description of program goals and structure.",
      target_audience: "Men seeking targeted coaching.",
      goals: ["Goal 1", "Goal 2"],
      benefits: ["Benefit 1", "Benefit 2"],
      features: ["Feature 1", "Feature 2"],
      training_modes: ["online", "offline"],
      display_order: programs.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (p: TrainingProgram) => {
    setEditingProg({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`/api/cms/programs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const json = await res.json();
        setPrograms(json.programs);
      }
    } catch {
      alert("Failed to delete program.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/cms/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProg),
      });

      if (res.ok) {
        const json = await res.json();
        setPrograms(json.programs);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save program.");
      }
    } catch {
      alert("Failed to save program.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Training Programs Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update, and manage published personal training programs and categories.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
        >
          + Add New Program
        </button>
      </div>

      {/* Programs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Program</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Modes</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {programs.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  <div>{p.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">/programs/{p.slug}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{p.category}</td>
                <td className="py-3.5 px-4">
                  <div className="flex gap-1">
                    {p.training_modes.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-slate-100 text-slate-600"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      p.is_published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-slate-700 hover:text-slate-900 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
              Edit Program: {editingProg.title}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProg.title}
                    onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProg.slug}
                    onChange={(e) => setEditingProg({ ...editingProg, slug: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingProg.category}
                  onChange={(e) => setEditingProg({ ...editingProg, category: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProg.description}
                  onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Audience</label>
                <input
                  type="text"
                  required
                  value={editingProg.target_audience}
                  onChange={(e) =>
                    setEditingProg({ ...editingProg, target_audience: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProg.features.join(", ")}
                  onChange={(e) =>
                    setEditingProg({
                      ...editingProg,
                      features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProg.is_published}
                    onChange={(e) =>
                      setEditingProg({ ...editingProg, is_published: e.target.checked })
                    }
                    className="accent-slate-900"
                  />
                  <span className="font-semibold text-slate-700">Published to Live Site</span>
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
                  {isSaving ? "Saving..." : "Save Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
