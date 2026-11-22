"use client";

import React, { useState, useEffect } from "react";
import { Transformation } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminTransformationsPage() {
  const [transformations, setTransformations] = useState<Transformation[]>(
    INITIAL_CMS_DATA.transformations
  );
  const [editingItem, setEditingItem] = useState<Transformation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.transformations) setTransformations(json.transformations);
        }
      } catch (err) {
        console.warn("Using default transformations", err);
      }
    }
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      id: `trans-${Date.now()}`,
      client_name: "Client Name",
      before_image_url: "/images/transform-before.jpg",
      after_image_url: "/images/transform-after.jpg",
      story: "Consistent training and progressive overload.",
      duration: "16 Weeks",
      result_summary: "Lean muscle gain with form mastery.",
      has_client_consent: false,
      is_published: false,
      display_order: transformations.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: Transformation) => {
    setEditingItem({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transformation?")) return;
    try {
      const res = await fetch(`/api/cms/transformations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const json = await res.json();
        setTransformations(json.transformations);
      }
    } catch {
      alert("Failed to delete transformation.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.is_published && !editingItem.has_client_consent) {
      alert("Validation Error: Cannot publish client transformation without explicit consent.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/cms/transformations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        const json = await res.json();
        setTransformations(json.transformations);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save transformation.");
      }
    } catch {
      alert("Failed to save transformation.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Client Transformations & Consent
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Display before/after results only with verified client permission. The public section is
            automatically hidden when empty.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
        >
          + Add Client Transformation
        </button>
      </div>

      {transformations.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <div className="text-3xl">🛡️</div>
          <h3 className="font-bold text-slate-900 text-sm">
            Zero Client Transformations Uploaded Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Per the Master Directive, no fake transformation photos or fabricated client testimonials
            are created. The transformations section on the public homepage is currently cleanly
            hidden.
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-2 text-xs font-semibold text-slate-900 underline"
          >
            Upload verified client result →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transformations.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-slate-900">{t.client_name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      t.has_client_consent
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {t.has_client_consent ? "Consent Verified" : "Consent Pending"}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-2">Duration: {t.duration}</div>
                <p className="text-xs text-slate-600 mb-4">{t.result_summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                <button
                  onClick={() => handleEdit(t)}
                  className="text-slate-700 hover:text-slate-900 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
              Edit Transformation
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Client Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_name: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Duration (e.g. 16 Weeks)
                  </label>
                  <input
                    type="text"
                    value={editingItem.duration || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, duration: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Before Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.before_image_url}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, before_image_url: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    After Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.after_image_url}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, after_image_url: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Result Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.result_summary}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, result_summary: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              {/* Strict Consent Gate */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.has_client_consent}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        has_client_consent: e.target.checked,
                      })
                    }
                    className="accent-slate-900"
                  />
                  <span className="font-bold text-amber-900 text-xs">
                    Client Written Consent Form Verified & On File *
                  </span>
                </label>
                <p className="text-[11px] text-amber-800 leading-tight">
                  Mandatory security check: Images cannot be published to the public website without
                  confirmed authorization.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pub-trans"
                  checked={editingItem.is_published}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_published: e.target.checked })
                  }
                  className="accent-slate-900"
                />
                <label htmlFor="pub-trans" className="font-semibold text-slate-700 cursor-pointer">
                  Publish to Live Transformations Showcase
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
                  {isSaving ? "Saving..." : "Save Transformation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
