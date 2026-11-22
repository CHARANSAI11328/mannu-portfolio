"use client";

import React from "react";

interface ProcessSectionProps {
  onOpenInquiry?: () => void;
}

export function ProcessSection({ onOpenInquiry }: ProcessSectionProps) {
  const steps = [
    {
      step: "01",
      title: "Choose Fitness Goal",
      description: "Identify your primary target: muscle hypertrophy, fat loss, raw strength, or competition readiness.",
    },
    {
      step: "02",
      title: "Select Monthly Plan",
      description: "Pick between Foundation (₹999), Transformation (₹1,999), or Elite Coaching (₹3,999).",
    },
    {
      step: "03",
      title: "Choose Training Mode",
      description: "Decide whether you want offline sessions at 7 Eleven Fitness Studio or remote online programming.",
    },
    {
      step: "04",
      title: "Send WhatsApp Inquiry",
      description: "Submit the inquiry form to generate a structured, pre-filled WhatsApp message directly to Mansoor.",
    },
    {
      step: "05",
      title: "Discuss Schedule & Slots",
      description: "Speak directly with Mansoor to agree on weekly frequency, workout times, and start dates.",
    },
    {
      step: "06",
      title: "Confirm & Begin Training",
      description: "Finalize your arrangement, conduct initial movement assessments, and begin executing your program.",
    },
  ];

  return (
    <section
      id="process"
      className="w-full bg-[#000000] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-16">
          <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
            SIMPLE 6-STEP ONBOARDING
          </h2>
          <p className="text-[#B5B5B5] text-[16px] sm:text-[18px] mt-3">
            No convoluted portals or automated bookings. You talk directly with your coach from day one.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-[#0b0b0b] border border-[#222222] hover:border-[#383838] rounded-xl p-6 sm:p-7 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-white text-sm font-mono font-bold tracking-widest block mb-4 border-b border-[#222222] pb-3">
                  STEP {item.step}
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#737373]">
            Ready to discuss your goals with Mansoor?
          </span>
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase px-7 py-3 rounded-full transition-colors"
          >
            START STEP 01 ON WHATSAPP
          </button>
        </div>
      </div>
    </section>
  );
}
