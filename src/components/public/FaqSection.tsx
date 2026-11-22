"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#000000] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-16">
          <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-[#B5B5B5] text-[16px] sm:text-[18px] mt-3">
            Clear facts regarding online and offline training, schedules, and gym memberships.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="border border-[#262626] rounded-xl overflow-hidden bg-[#0c0c0c] transition-colors"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#121212] transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                    {faq.question}
                  </span>
                  <span className="text-xl font-mono text-neutral-400 shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#B5B5B5] leading-relaxed border-t border-[#1a1a1a] animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
