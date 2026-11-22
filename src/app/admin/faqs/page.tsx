"use client";

import React, { useState, useEffect } from "react";
import { FaqItem } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_CMS_DATA.faqs);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.faqs) setFaqs(json.faqs);
        }
      } catch (err) {
        console.warn("Using default FAQs", err);
      }
    }
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      id: `faq-${Date.now()}`,
      question: "New Question?",
      answer: "Answer to client question.",
      category: "General",
      display_order: faqs.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (f: FaqItem) => {
    setEditingItem({ ...f });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/cms/faqs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const json = await res.json();
        setFaqs(json.faqs);
      }
    } catch {
      alert("Failed to delete FAQ.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/cms/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        const json = await res.json();
        setFaqs(json.faqs);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save FAQ.");
      }
    } catch {
      alert("Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage public FAQs covering online/offline training, flexible scheduling, and gym fees.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
        >
          + Add FAQ
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-xs">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="p-5 flex items-start justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  #{idx + 1} • {faq.category}
                </span>
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                    faq.is_published
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {faq.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs pt-1">
              <button
                onClick={() => handleEdit(faq)}
                className="text-slate-700 hover:text-slate-900 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
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
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 text-slate-900 shadow-2xl">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-4">Edit FAQ</h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.answer}
                  onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pub-faq"
                  checked={editingItem.is_published}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_published: e.target.checked })
                  }
                  className="accent-slate-900"
                />
                <label htmlFor="pub-faq" className="font-semibold text-slate-700 cursor-pointer">
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
                  {isSaving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
