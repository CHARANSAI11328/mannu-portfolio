"use client";

import React from "react";
import { AboutSectionData, Achievement } from "@/types";

interface AboutSectionProps {
  data?: AboutSectionData;
  achievements?: Achievement[];
  onOpenInquiry?: () => void;
}

export function AboutSection({ data, onOpenInquiry }: AboutSectionProps) {
  const athleteImage =
    data?.trainer_image_url || "/images/mansoor-portrait.jpg";

  return (
    <section className="section-pad relative overflow-hidden" id="about" style={{ backgroundColor: "#09090b" }}>
      {/* Background atmospheric ambient amber glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none rounded-full blur-[140px] -z-0 opacity-20"
        style={{ background: "radial-gradient(circle, #FF9F00 0%, transparent 70%)" }}
      />

      <div className="proto-container relative z-10">
        {/* Top Part: The Coach Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#FF9F00]" />
              <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
                ABOUT MANSOOR
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 uppercase">
              THE{" "}
              <span className="bg-gradient-to-r from-[#FFB300] via-[#FF9F00] to-[#FF5722] bg-clip-text text-transparent italic">
                COACH.
              </span>
            </h2>

            {/* Body */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl">
              I&apos;m Shaik Mansoor, a personal fitness coach with <strong>4 years</strong> of
              gym experience, dedicated to helping people train with purpose,
              build strength, and perform at their best. I currently serve as an
              official trainer at <strong>7 Eleven Fitness Studio</strong>, where I coach individuals
              of all levels with a structured, results-driven approach.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#FF9F00] mb-1">
                  4<span className="text-[#FF5722]">+</span>
                </div>
                <div className="mono text-[10px] sm:text-xs text-[#94a3b8] uppercase leading-tight font-medium">
                  YEARS OF<br />GYM EXPERIENCE
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#FF9F00] mb-1">
                  100<span className="text-[#FF5722]">+</span>
                </div>
                <div className="mono text-[10px] sm:text-xs text-[#94a3b8] uppercase leading-tight font-medium">
                  CLIENTS<br />TRAINED
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#FF9F00] mb-1">
                  7 ELEVEN
                </div>
                <div className="mono text-[10px] sm:text-xs text-[#94a3b8] uppercase leading-tight font-medium">
                  OFFICIAL TRAINER<br />AT 7 ELEVEN FITNESS STUDIO
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group">
              <img
                src={athleteImage}
                alt="Shaik Mansoor, Coach at 7 Eleven Fitness Studio"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs mono text-[#94a3b8]">
                <span>FOCUS · FORM · DISCIPLINE</span>
                <span className="text-[#FF9F00]">↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part: Competition Highlights (Screenshot 2 lower half) */}
        <div id="achievements" className="pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">🏆</span>
                <span className="mono text-xs tracking-wider text-[#FF9F00] uppercase font-bold">
                  ACHIEVEMENTS
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
                COMPETITION <span className="text-[#FF9F00]">HIGHLIGHTS.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Proven performance on the competitive stage, with top finishes at key bodybuilding events.
              </p>
            </div>

            {/* 2 Competition Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: 1st Place Bapatla */}
              <div
                className="relative rounded-2xl bg-[#121215] border border-white/10 p-5 overflow-hidden flex flex-col justify-between hover:border-[#FF9F00]/50 transition-all duration-300 group cursor-pointer"
                onClick={() => onOpenInquiry?.()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#FFB300] mb-1">
                      <span className="text-lg">👑</span>
                      <span className="text-xl font-black tracking-tight">1<sup className="text-xs">ST</sup> PLACE</span>
                    </div>
                    <div className="mono text-[10px] tracking-wider text-slate-400 uppercase">
                      BAPATLA
                    </div>
                    <div className="text-xs font-bold text-white uppercase mt-0.5">
                      BODYBUILDING CHAMPIONSHIP
                    </div>
                  </div>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden mt-2">
                  <img
                    src="/images/achievement-bapatla.jpg"
                    alt="Bapatla Bodybuilding Championship 1st Place"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Card 2: 2nd Place ANU */}
              <div
                className="relative rounded-2xl bg-[#121215] border border-white/10 p-5 overflow-hidden flex flex-col justify-between hover:border-[#FF9F00]/50 transition-all duration-300 group cursor-pointer"
                onClick={() => onOpenInquiry?.()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#FFB300] mb-1">
                      <span className="text-lg">🥈</span>
                      <span className="text-xl font-black tracking-tight">2<sup className="text-xs">ND</sup> PLACE</span>
                    </div>
                    <div className="mono text-[10px] tracking-wider text-slate-400 uppercase">
                      ANU
                    </div>
                    <div className="text-xs font-bold text-white uppercase mt-0.5">
                      BODYBUILDING COMPETITION
                    </div>
                  </div>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden mt-2">
                  <img
                    src="/images/achievement-anu.jpg"
                    alt="ANU Bodybuilding Competition 2nd Place"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
