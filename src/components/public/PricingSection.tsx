"use client";

import React from "react";
import { PricingPlan } from "@/types";

interface PricingSectionProps {
  plans?: PricingPlan[];
  onSelectPlan: (planName: string, price: number) => void;
}

export function PricingSection({ plans, onSelectPlan }: PricingSectionProps) {
  const foundationPrice = plans?.find((p) => p.name.includes("Foundation"))?.price_inr || 999;
  const transformationPrice =
    plans?.find((p) => p.name.includes("Transformation"))?.price_inr || 1999;
  const elitePrice = plans?.find((p) => p.name.includes("Elite"))?.price_inr || 3999;

  return (
    <section className="section-pad relative overflow-hidden" id="pricing" style={{ backgroundColor: "#09090b" }}>
      {/* Background radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none rounded-full blur-[160px] -z-0 opacity-20"
        style={{ background: "radial-gradient(circle, #FF9F00 0%, transparent 70%)" }}
      />

      <div className="proto-container relative z-10">
        {/* Section Topline */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#FF9F00]" />
            <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
              PRICING PLANS
            </span>
            <span className="w-5 h-[2px] bg-[#FF9F00]" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase mb-3">
            CHOOSE YOUR{" "}
            <span className="bg-gradient-to-r from-[#FFB300] via-[#FF9F00] to-[#FF5722] bg-clip-text text-transparent">
              TRAINING PLAN.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400">
            Personal coaching, real structure, and results that last.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {/* Card 1: Foundation */}
          <div className="rounded-2xl bg-[#121215] border border-white/10 p-8 flex flex-col justify-between hover:border-[#FF9F00]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mb-6">
                🏋️
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                FOUNDATION
              </h3>
              <div className="mono text-xs text-slate-400 uppercase tracking-wider mb-6">
                BUILD THE RIGHT BASE
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">
                  ₹{foundationPrice.toLocaleString("en-IN")}
                </span>
                <span className="mono text-xs text-slate-400 uppercase">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Personalized training plan",
                  "Basic nutrition guidance",
                  "Progress tracking & weekly check-in",
                  "Ongoing trainer support",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="text-[#FF9F00] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-full border border-white/15 hover:border-[#FF9F00] text-white hover:text-[#FF9F00] font-bold text-xs uppercase tracking-wider transition-all"
              onClick={() => onSelectPlan("Foundation", foundationPrice)}
            >
              GET FOUNDATION <span className="ml-1 text-base leading-none">+</span>
            </button>
          </div>

          {/* Card 2: Transformation (Featured / Most Popular) */}
          <div className="relative rounded-2xl bg-[#141418] border-2 border-[#FF9800] shadow-[0_0_40px_rgba(255,140,0,0.35)] p-8 flex flex-col justify-between transform lg:-translate-y-2">
            {/* Most Popular Floating Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FFB300] to-[#FF5722] text-black font-black text-[10px] tracking-wider uppercase px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </span>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF9F00]/10 border border-[#FF9F00]/40 flex items-center justify-center text-xl mb-6">
                ⚡
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                TRANSFORMATION
              </h3>
              <div className="mono text-xs text-[#FF9F00] uppercase tracking-wider mb-6">
                REAL CHANGE. VISIBLE RESULTS.
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black bg-gradient-to-r from-[#FFB300] to-[#FF5722] bg-clip-text text-transparent">
                  ₹{transformationPrice.toLocaleString("en-IN")}
                </span>
                <span className="mono text-xs text-slate-400 uppercase">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Customized training & workout progression",
                  "Detailed nutrition & habit plan",
                  "Weekly review & performance adjustments",
                  "Direct trainer support (WhatsApp/Call)",
                  "Goal-focused, results-driven coaching",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="text-[#FF9F00] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFB300] to-[#FF5722] hover:from-[#FFA000] hover:to-[#F4511E] text-black font-black text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(255,140,0,0.5)] transition-all"
              onClick={() => onSelectPlan("Transformation", transformationPrice)}
            >
              GET TRANSFORMATION <span className="ml-1 text-base leading-none font-black">+</span>
            </button>
          </div>

          {/* Card 3: Elite Coaching */}
          <div className="rounded-2xl bg-[#121215] border border-white/10 p-8 flex flex-col justify-between hover:border-[#FF9F00]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mb-6">
                👑
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                ELITE COACHING
              </h3>
              <div className="mono text-xs text-slate-400 uppercase tracking-wider mb-6">
                PREMIUM, HIGH-TOUCH COACHING
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">
                  ₹{elitePrice.toLocaleString("en-IN")}
                </span>
                <span className="mono text-xs text-slate-400 uppercase">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Fully personalized training & periodization",
                  "Advanced nutrition & lifestyle strategy",
                  "Priority, direct access to the trainer",
                  "Weekly reviews, tracking & refinements",
                  "Competition / performance preparation",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="text-[#FF9F00] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-full border border-white/15 hover:border-[#FF9F00] text-white hover:text-[#FF9F00] font-bold text-xs uppercase tracking-wider transition-all"
              onClick={() => onSelectPlan("Elite Coaching", elitePrice)}
            >
              GET ELITE COACHING <span className="ml-1 text-base leading-none">+</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400 max-w-xl mx-auto">
          <span className="text-[#FF9F00]">ⓘ</span>
          <span>
            Sessions and schedules are discussed directly with the trainer based on your goals,
            availability, and chosen plan.
          </span>
        </div>
      </div>
    </section>
  );
}
