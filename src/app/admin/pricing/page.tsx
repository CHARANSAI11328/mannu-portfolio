"use client";

import React, { useState, useEffect } from "react";
import { MonthlyPlan } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";
import { formatINR } from "@/lib/utils";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<MonthlyPlan[]>(INITIAL_CMS_DATA.plans);
  const [editingPlan, setEditingPlan] = useState<MonthlyPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.plans) setPlans(json.plans);
        }
      } catch (err) {
        console.warn("Using default plans", err);
      }
    }
    load();
  }, []);

  const handleEdit = (p: MonthlyPlan) => {
    setEditingPlan({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/cms/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlan),
      });

      if (res.ok) {
        const json = await res.json();
        setPlans(json.plans);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save plan.");
      }
    } catch {
      alert("Failed to save plan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Monthly Pricing Plans Manager
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust monthly rates, features, highlighted recommendation tier, and session
          disclaimers.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white border rounded-xl p-6 shadow-xs flex flex-col justify-between ${
              plan.is_highlighted ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-900 uppercase">{plan.name}</span>
                {plan.is_highlighted && (
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full uppercase">
                    RECOMMENDED
                  </span>
                )}
              </div>

              <div className="text-2xl font-bold text-slate-900 mb-2">
                {formatINR(plan.price_inr)}
                <span className="text-xs text-slate-500 font-normal"> / month</span>
              </div>

              <p className="text-xs text-slate-500 mb-4 min-h-[32px]">{plan.tagline}</p>

              <div className="border-t border-slate-100 pt-3 mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Key Features ({plan.features.length})
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-slate-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-[11px] text-slate-400 italic">
                      + {plan.features.length - 4} more
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleEdit(plan)}
              className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Edit Pricing & Features
            </button>
          </div>
        ))}
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Mandatory Session Flexibility Rule
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Session counts, frequency, and schedules are flexible and agreed directly between the
          client and Mansoor. Never imply unlimited training sessions. Gym membership fees for 7
          Eleven Fitness Studio are separate.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
              Edit Plan: {editingPlan.name}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Monthly Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPlan.price_inr}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, price_inr: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={editingPlan.tagline}
                  onChange={(e) => setEditingPlan({ ...editingPlan, tagline: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Audience</label>
                <input
                  type="text"
                  required
                  value={editingPlan.target_audience}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, target_audience: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Features (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={editingPlan.features.join(", ")}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Session Disclaimer
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingPlan.session_disclaimer}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, session_disclaimer: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none text-[11px]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.is_highlighted}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, is_highlighted: e.target.checked })
                    }
                    className="accent-slate-900"
                  />
                  <span className="font-semibold text-slate-700">
                    Highlight as Recommended Plan
                  </span>
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
                  {isSaving ? "Saving..." : "Save Pricing Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
