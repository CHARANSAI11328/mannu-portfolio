"use client";

import React, { useState, useEffect } from "react";
import { ContactSettings } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactSettings>(INITIAL_CMS_DATA.contact);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          if (json.contact) setContact(json.contact);
        }
      } catch (err) {
        console.warn("Using default contact data", err);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/cms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save contact settings.");
      }
    } catch {
      alert("Error saving contact settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Contact & Offline Studio Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure Mansoor&apos;s verified WhatsApp number for bookings, contact channels, and 7
          Eleven studio information.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs text-xs"
      >
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            WhatsApp & Communication Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              WhatsApp Number (with country code) *
            </label>
            <input
              type="text"
              required
              value={contact.whatsapp_number}
              onChange={(e) => setContact({ ...contact, whatsapp_number: e.target.value })}
              placeholder="+91 96763 93689"
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono text-sm font-bold"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              All website CTA buttons and inquiry forms open this number.
            </span>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              value={contact.phone_number || ""}
              onChange={(e) => setContact({ ...contact, phone_number: e.target.value })}
              placeholder="+91 96763 93689"
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={contact.email || ""}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              placeholder="contact@mansoorfitness.com"
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Instagram Handle (Optional)
            </label>
            <input
              type="text"
              value={contact.instagram_handle || ""}
              onChange={(e) => setContact({ ...contact, instagram_handle: e.target.value })}
              placeholder="mansoor_fitness"
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 pb-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Offline Training Studio Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Gym Name *</label>
            <input
              type="text"
              required
              value={contact.gym_name}
              onChange={(e) => setContact({ ...contact, gym_name: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Google Maps URL
            </label>
            <input
              type="text"
              value={contact.google_maps_url || ""}
              onChange={(e) => setContact({ ...contact, google_maps_url: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full border border-slate-300 rounded px-3 py-2 outline-none font-mono text-[11px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Studio Physical Address *
          </label>
          <input
            type="text"
            required
            value={contact.gym_address}
            onChange={(e) => setContact({ ...contact, gym_address: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Availability & Slots Notes *
          </label>
          <input
            type="text"
            required
            value={contact.availability_notes}
            onChange={(e) => setContact({ ...contact, availability_notes: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {saveSuccess ? (
            <span className="text-emerald-600 font-semibold">
              ✓ Contact settings updated! Publish live to apply to website.
            </span>
          ) : (
            <span className="text-slate-400">Settings saved to draft store.</span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg"
          >
            {isSaving ? "Saving..." : "Save Contact Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
