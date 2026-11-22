"use client";

import React from "react";
import { AboutSectionData } from "@/types";

interface AboutSectionProps {
  data: AboutSectionData;
  onOpenInquiry?: () => void;
}

export function AboutSection({ data, onOpenInquiry }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full bg-[#000000] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-18">
          <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
            {data.badge || "ATHLETE & COACH"}
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
            {data.title || "BUILT BY DISCIPLINE."}
          </h2>
          <p className="text-[#B5B5B5] text-[17px] sm:text-[19px] mt-3 font-normal">
            {data.tagline ||
              "Dedicated to purposeful training, progressive overload, and structured physique development."}
          </p>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Trainer Bio & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-[#CCCCCC] text-[15px] sm:text-[16px] leading-[1.75]">
              {data.bio_paragraphs && data.bio_paragraphs.length > 0 ? (
                data.bio_paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <>
                  <p>
                    Shaik Mansoor is a competitive bodybuilder and dedicated fitness trainer based in Bapatla, Andhra Pradesh. With four years of focused gym experience, his coaching approach is grounded in discipline, consistent effort, and proven exercise mechanics.
                  </p>
                  <p>
                    Having competed at collegiate and district bodybuilding levels, Mansoor has earned 1st place at a regional bodybuilding competition in Bapatla and 2nd place at the Acharya Nagarjuna University (ANU) bodybuilding championship.
                  </p>
                  <p>
                    As an official trainer at 7 Eleven Fitness Studio in Bapatla, Mansoor works directly with men aiming to build muscle, reduce body fat, and establish lasting strength through honest, structured coaching.
                  </p>
                </>
              )}
            </div>

            {/* Training Philosophy Pillars */}
            <div className="pt-6 border-t border-[#222222]">
              <h3 className="text-white text-[13px] font-mono tracking-[0.16em] uppercase mb-4 text-[#AAAAAA]">
                CORE COACHING PRINCIPLES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.training_philosophy || []).map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#0e0e0e] border border-[#222222] flex items-start gap-3"
                  >
                    <span className="text-white text-xs font-mono font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-[#B5B5B5] text-xs leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-colors"
              >
                DISCUSS WITH MANSOOR
              </button>
              <a
                href="#pricing"
                className="text-[#999999] hover:text-white text-xs font-medium tracking-wider uppercase underline underline-offset-4"
              >
                VIEW MONTHLY PLANS
              </a>
            </div>
          </div>

          {/* Right Column: Key Credentials / Stats Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#0D0D0D] border border-[#282828] rounded-2xl p-6 sm:p-8">
              <span className="text-[#888888] text-[11px] font-mono tracking-[0.18em] uppercase block mb-6">
                VERIFIED CREDENTIALS
              </span>

              <div className="grid grid-cols-2 gap-6">
                {(data.stats || []).map((stat, idx) => (
                  <div key={idx} className="border-b border-[#222222] pb-5 last:border-b-0">
                    <div className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white text-xs font-medium tracking-wide uppercase">
                      {stat.label}
                    </div>
                    {stat.subtext && (
                      <div className="text-[#777777] text-[11px] mt-1 leading-snug">
                        {stat.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Offline Location Footnote */}
              <div className="mt-6 pt-5 border-t border-[#222222] flex items-center justify-between text-xs text-[#888888]">
                <span>Training Facility</span>
                <span className="text-white font-medium">7 Eleven Fitness Studio, Bapatla</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
