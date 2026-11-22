"use client";

import React from "react";
import { MonthlyPlan } from "@/types";
import { formatINR } from "@/lib/utils";

interface PricingSectionProps {
  plans: MonthlyPlan[];
  onSelectPlan: (planName: string, price: number) => void;
}

export function PricingSection({ plans, onSelectPlan }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="w-full bg-[#0a0a0a] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-16">
          <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
            MONTHLY PRICING PLANS
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
            TRANSPARENT COACHING TIERS
          </h2>
          <p className="text-[#B5B5B5] text-[16px] sm:text-[18px] mt-3">
            Clear monthly pricing with personalized instruction. No hidden cancellation clauses.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            const isHighlighted = plan.is_highlighted;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 p-8 ${
                  isHighlighted
                    ? "bg-[#141414] border-2 border-white/80 shadow-2xl md:-translate-y-2"
                    : "bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#444444]"
                }`}
              >
                {/* Highlighted Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-8 bg-white text-black text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full shadow-md">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#999999] leading-relaxed min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-[#242424]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[34px] sm:text-[40px] font-extrabold text-white tracking-tight leading-none">
                        {formatINR(plan.price_inr)}
                      </span>
                      <span className="text-xs text-[#888888] font-mono uppercase">
                        / {plan.billing_period || "month"}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#777777] uppercase mt-2">
                      Audience: {plan.target_audience}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono text-[#888888] tracking-wider uppercase block mb-3">
                      INCLUDED GUIDANCE
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs text-[#CCCCCC] flex items-start gap-2.5">
                          <svg
                            className="w-4 h-4 text-white shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA & Disclaimer */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan.name, plan.price_inr)}
                    className={`w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 ${
                      isHighlighted
                        ? "bg-white text-black hover:bg-neutral-200 shadow-md font-bold"
                        : "bg-transparent text-white hover:bg-white hover:text-black border border-[#353535] hover:border-white"
                    }`}
                  >
                    SELECT {plan.name}
                  </button>

                  <p className="text-[10px] text-[#666666] leading-tight text-center mt-3">
                    Inquiry via WhatsApp • Final details agreed directly
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            IMPORTANT BUSINESS RULES & FLEXIBLE SESSIONS DISCLAIMER
            ===================================================================== */}
        <div className="bg-[#0e0e0e] border border-[#222222] rounded-xl p-6 lg:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-white text-xs font-mono font-bold tracking-wider uppercase">
                IMPORTANT COACHING ARRANGEMENT DETAILS
              </span>
              <p className="text-xs text-[#999999] leading-relaxed max-w-4xl">
                Session counts, weekly frequency, and specific time slots are flexible and discussed
                directly between you and Shaik Mansoor prior to enrollment. Plans do not imply
                unlimited sessions. Standard facility membership fees for 7 Eleven Fitness Studio in
                Bapatla are separate from coaching guidance.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 text-xs text-white underline underline-offset-4 font-mono tracking-wider uppercase hover:text-neutral-300"
            >
              HAVE QUESTIONS?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
