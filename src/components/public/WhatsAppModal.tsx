"use client";

import React, { useState } from "react";
import { TrainingMode, WhatsAppInquiryPayload } from "@/types";
import { buildWhatsAppInquiryUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
  defaultPlan?: string;
}

export function WhatsAppModal({
  isOpen,
  onClose,
  whatsappNumber,
  defaultPlan,
}: WhatsAppModalProps) {
  const [clientName, setClientName] = useState("");
  const [goal, setGoal] = useState("Muscle Building");
  const [trainingType, setTrainingType] = useState<TrainingMode>("offline");
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan || "Transformation (₹1,999/mo)");
  const [preferredDays, setPreferredDays] = useState("Monday to Saturday");
  const [preferredTime, setPreferredTime] = useState("Morning (6:00 AM - 9:00 AM)");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConfigured = Boolean(normalizeWhatsAppNumber(whatsappNumber));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!clientName.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    if (!isConfigured) {
      setFormError(
        "Shaik Mansoor's WhatsApp number is currently being updated in the admin settings. Please check back shortly."
      );
      return;
    }

    const payload: WhatsAppInquiryPayload = {
      client_name: clientName.trim(),
      goal,
      training_type: trainingType,
      selected_plan: selectedPlan,
      preferred_days: preferredDays,
      preferred_time: preferredTime,
      message: message.trim() || undefined,
    };

    const { url, error } = buildWhatsAppInquiryUrl(whatsappNumber, payload);

    if (error || !url) {
      setFormError(error || "Unable to generate WhatsApp link.");
      return;
    }

    // Record privacy-preserving aggregate click metric
    try {
      fetch("/api/analytics/inquiry-click", { method: "POST" }).catch(() => {});
    } catch {}

    // Open WhatsApp URL
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#121212] border border-[#2e2e2e] w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#888888] hover:text-white p-1 rounded-full focus:outline-none"
          aria-label="Close Modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase block mb-1">
            DIRECT COACHING INQUIRY
          </span>
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
            TRAIN WITH SHAIK MANSOOR
          </h3>
          <p className="text-xs text-[#AAAAAA] mt-1">
            Fill out your fitness preferences to send an instant, pre-filled WhatsApp inquiry.
          </p>
        </div>

        {formError && (
          <div className="mb-5 p-3 rounded-lg bg-neutral-900 border border-red-500/50 text-xs text-red-200">
            {formError}
          </div>
        )}

        {!isConfigured && (
          <div className="mb-5 p-3 rounded-lg bg-neutral-900 border border-[#333333] text-xs text-[#B5B5B5]">
            ⚠️ WhatsApp contact is currently unconfigured. You may still preview the message below.
          </div>
        )}

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Client Name */}
          <div>
            <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              YOUR NAME *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3.5 py-2.5 text-white placeholder-[#666666] outline-none transition-colors"
            />
          </div>

          {/* Goal & Training Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                FITNESS GOAL
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2.5 text-white outline-none"
              >
                <option value="Muscle Building">Muscle Building</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Bodybuilding Preparation">Bodybuilding Preparation</option>
                <option value="Beginner Fitness">Beginner Fitness</option>
                <option value="General Fitness & Mobility">General Fitness & Mobility</option>
              </select>
            </div>

            <div>
              <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                TRAINING MODE
              </label>
              <select
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value as TrainingMode)}
                className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2.5 text-white outline-none"
              >
                <option value="offline">Offline (7 Eleven Fitness Studio, Bapatla)</option>
                <option value="online">Online Personal Coaching</option>
              </select>
            </div>
          </div>

          {/* Selected Plan */}
          <div>
            <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              MONTHLY PLAN
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2.5 text-white outline-none"
            >
              <option value="Foundation (₹999/month)">Foundation — ₹999/month (Beginner)</option>
              <option value="Transformation (₹1,999/month)">Transformation — ₹1,999/month (Recommended)</option>
              <option value="Elite Coaching (₹3,999/month)">Elite Coaching — ₹3,999/month (1-on-1)</option>
              <option value="Undecided / Need Consultation">Undecided / Discuss with Mansoor</option>
            </select>
          </div>

          {/* Schedule Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                PREFERRED DAYS
              </label>
              <input
                type="text"
                value={preferredDays}
                onChange={(e) => setPreferredDays(e.target.value)}
                placeholder="e.g. Mon-Fri or Weekends"
                className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                PREFERRED TIME
              </label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="e.g. Morning 7 AM or Evening"
                className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2 text-white outline-none"
              />
            </div>
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-[#CCCCCC] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              ADDITIONAL NOTES / MEDICAL HISTORY (OPTIONAL)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Past gym experience, injuries, or specific targets..."
              className="w-full bg-[#1a1a1a] border border-[#333333] focus:border-white rounded-lg px-3 py-2 text-white placeholder-[#666666] outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!isConfigured}
              className="w-full bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs tracking-wider uppercase py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>SEND WHATSAPP INQUIRY</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-[10px] text-[#737373] text-center mt-2.5">
              Opens WhatsApp directly with Shaik Mansoor. No payment or booking is charged here.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FloatingWhatsAppButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Contact Shaik Mansoor on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-white text-black hover:bg-neutral-200 shadow-2xl p-3.5 rounded-full flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 border border-black/10"
    >
      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.948.825 3.011.826h.005c3.18 0 5.766-2.586 5.767-5.766.001-3.181-2.585-5.767-5.766-5.767zm7.55 5.765c-.002 4.161-3.388 7.545-7.548 7.546-1.309 0-2.593-.342-3.722-.988l-4.148 1.087 1.107-4.045c-.714-1.189-1.092-2.551-1.09-3.953.002-4.162 3.389-7.546 7.55-7.546 4.16 0 7.546 3.385 7.548 7.546l.003.353z" />
      </svg>
      <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase pr-1">
        INQUIRE NOW
      </span>
    </button>
  );
}
