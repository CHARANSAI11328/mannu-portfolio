"use client";

import React, { useState } from "react";
import { ContactInfo } from "@/types";

interface ContactSectionProps {
  contact?: ContactInfo;
  onOpenInquiry?: () => void;
}

export function ContactSection({ contact, onOpenInquiry }: ContactSectionProps) {
  const [trainingMode, setTrainingMode] = useState<"online" | "in-person">("online");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const phone = contact?.whatsapp_number || "+91 96763 93689";
  const normalizedPhone = (phone || "").replace(/[^\d]/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modeText = trainingMode === "online" ? "Online Coaching" : "In-Person (Bapatla)";
    const text = `Hi Mansoor! I'd like to book fitness coaching.\n\nName: ${
      fullName.trim() || "[Not provided]"
    }\nPhone: ${phoneNumber.trim() || "[Not provided]"}\nEmail: ${
      emailAddress.trim() || "[Not provided]"
    }\nMode: ${modeText}\nGoals: ${message.trim() || "Discussing training program"}`;

    const waUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
    setSubmitted(true);
    window.open(waUrl, "_blank");
  };

  const handleDirectWhatsApp = () => {
    const text = `Hi Mansoor! I'm interested in starting personal fitness coaching with you. Could we discuss availability, training format, and pricing?`;
    window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="section-pad relative overflow-hidden" id="contact" style={{ backgroundColor: "#09090b" }}>
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full blur-[180px] -z-0 opacity-20"
        style={{ background: "radial-gradient(circle, #FF9F00 0%, transparent 70%)" }}
      />

      <div className="proto-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Highlights & Mode Selector */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#FF9F00]" />
              <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
                CONTACT / BOOK YOUR COACHING
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase mb-4 leading-[1.05]">
              START YOUR{" "}
              <span className="bg-gradient-to-r from-[#FFB300] via-[#FF9F00] to-[#FF5722] bg-clip-text text-transparent">
                TRANSFORMATION.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Get expert personal training, a clear plan, and consistent support from Shaik Mansoor.
            </p>

            {/* 3 Feature Highlights */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="text-[#FF9F00]">⚡</span>
                <span>Personalized Training Plan</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="text-[#FF9F00]">📊</span>
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="text-[#FF9F00]">🏆</span>
                <span>Goal-Focused Coaching</span>
              </div>
            </div>

            {/* Training Mode Selector Cards */}
            <div>
              <div className="mono text-[11px] text-slate-400 uppercase tracking-wider mb-3">
                TRAINING MODE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTrainingMode("online")}
                  className={`p-4 rounded-xl text-left transition-all ${
                    trainingMode === "online"
                      ? "bg-gradient-to-r from-[#FFB300] to-[#FF5722] text-black shadow-[0_4px_20px_rgba(255,140,0,0.4)]"
                      : "bg-[#141418] border border-white/10 text-white hover:border-[#FF9F00]/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs uppercase mb-1">
                    <span>💻 ONLINE COACHING</span>
                    {trainingMode === "online" && <span>✓</span>}
                  </div>
                  <div className={`text-[11px] ${trainingMode === "online" ? "text-black/80 font-medium" : "text-slate-400"}`}>
                    Train from anywhere with personalized guidance.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTrainingMode("in-person")}
                  className={`p-4 rounded-xl text-left transition-all ${
                    trainingMode === "in-person"
                      ? "bg-gradient-to-r from-[#FFB300] to-[#FF5722] text-black shadow-[0_4px_20px_rgba(255,140,0,0.4)]"
                      : "bg-[#141418] border border-white/10 text-white hover:border-[#FF9F00]/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs uppercase mb-1">
                    <span>📍 IN-PERSON (BAPATLA)</span>
                    {trainingMode === "in-person" && <span>✓</span>}
                  </div>
                  <div className={`text-[11px] ${trainingMode === "in-person" ? "text-black/80 font-medium" : "text-slate-400"}`}>
                    One-on-one coaching in Bapatla, India.
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Glassmorphism Booking Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#141418] border border-white/10 p-6 sm:p-8 shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-1">
                BOOK YOUR COACHING
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Send an inquiry and I&apos;ll get back to you with the right plan for your goals.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] mono text-slate-300 uppercase mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 text-sm">👤</span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-[#1b1b22] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF9F00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] mono text-slate-300 uppercase mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 text-sm">📞</span>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 96763 93689"
                        className="w-full bg-[#1b1b22] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF9F00] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] mono text-slate-300 uppercase mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 text-sm">✉️</span>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full bg-[#1b1b22] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF9F00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Training Mode Dropdown */}
                  <div>
                    <label className="block text-[11px] mono text-slate-300 uppercase mb-1.5">
                      Training Mode
                    </label>
                    <div className="relative">
                      <select
                        value={trainingMode}
                        onChange={(e) => setTrainingMode(e.target.value as "online" | "in-person")}
                        className="w-full bg-[#1b1b22] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF9F00] transition-colors"
                      >
                        <option value="online">Online Coaching</option>
                        <option value="in-person">In-Person (Bapatla)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Goals / Message */}
                <div>
                  <label className="block text-[11px] mono text-slate-300 uppercase mb-1.5">
                    Your Goals / Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Mansoor about your fitness targets..."
                    className="w-full bg-[#1b1b22] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF9F00] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFB300] to-[#FF5722] hover:from-[#FFA000] hover:to-[#F4511E] text-black font-black text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(255,140,0,0.45)] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{submitted ? "INQUIRY PREPARED ✓" : "SEND INQUIRY"}</span>
                  <span className="text-base font-black leading-none">+</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-2">
                  <div className="h-[1px] bg-white/10 flex-1" />
                  <span className="mono text-[10px] text-slate-500 uppercase">OR</span>
                  <div className="h-[1px] bg-white/10 flex-1" />
                </div>

                {/* Direct WhatsApp Action */}
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3 rounded-full border border-white/15 hover:border-[#25D366] text-white hover:text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>💬 BOOK ON WHATSAPP</span>
                  <span className="text-sm">↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
