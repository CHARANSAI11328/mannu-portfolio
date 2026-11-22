"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types";

interface FaqSectionProps {
  faqs?: FaqItem[];
}

const DEFAULT_FAQS = [
  {
    question: "Can I train online or in person?",
    answer:
      "Both are available as coaching options. Offline training is based in Bapatla, and online coaching can be discussed directly with Mansoor.",
  },
  {
    question: "Are the session timings fixed?",
    answer:
      "No fixed timetable is promised on the website. Mansoor discusses availability, frequency, and times with each client before enrollment.",
  },
  {
    question: "Are gym fees included?",
    answer:
      "Gym membership fees may be separate. Confirm the complete package and any venue costs with Mansoor before payment.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "The Foundation plan is designed as a starting point. Mansoor can discuss your current experience and suggest an appropriate approach.",
  },
];

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items =
    faqs && faqs.length > 0
      ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : DEFAULT_FAQS;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-pad relative overflow-hidden" id="faq" style={{ backgroundColor: "#09090b" }}>
      <div className="proto-container relative z-10">
        {/* Section Topline */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[2px] bg-[#FF9F00]" />
          <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
            06 / GOOD TO KNOW
          </span>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase mb-4">
              QUESTIONS?<br />
              <span className="bg-gradient-to-r from-[#FFB300] to-[#FF5722] bg-clip-text text-transparent">
                GOOD.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Clear expectations. No confusing commitments. Here is everything you need to know before getting started.
            </p>
          </div>

          {/* Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-[#121215] border transition-all duration-300 overflow-hidden ${
                    isOpen ? "border-[#FF9F00]/60 shadow-[0_4px_20px_rgba(255,140,0,0.15)]" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-sm font-bold transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-[#FF9F00] text-black border-transparent" : "text-[#FF9F00]"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
