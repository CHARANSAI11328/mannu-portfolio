"use client";

import React from "react";
import { Achievement, Transformation } from "@/types";

interface ResultsSectionProps {
  achievements?: Achievement[];
  transformations?: Transformation[];
  onOpenInquiry?: () => void;
}

interface ClientStory {
  id: string;
  name: string;
  role: string;
  duration: string;
  metric: string;
  metricLabel: string;
  quote: string;
  image: string;
}

const CLIENT_STORIES: ClientStory[] = [
  {
    id: "arjun",
    name: "ARJUN K.",
    role: "Software Engineer",
    duration: "16 Weeks",
    metric: "-14 kg",
    metricLabel: "BODY WEIGHT",
    quote:
      "The most structured and effective training I've ever followed. In 16 weeks, I'm leaner, stronger, and far more confident.",
    image: "/images/transform-arjun.jpg",
  },
  {
    id: "meera",
    name: "MEERA S.",
    role: "Marketing Lead",
    duration: "12 Weeks",
    metric: "-8 kg",
    metricLabel: "BODY FAT",
    quote:
      "A game-changer. The training, guidance, and accountability kept me consistent, and the results speak for themselves.",
    image: "/images/transform-meera.jpg",
  },
  {
    id: "rohan",
    name: "ROHAN P.",
    role: "Entrepreneur",
    duration: "20 Weeks",
    metric: "+9 kg",
    metricLabel: "LEAN MUSCLE",
    quote:
      "I didn't just get fitter — I built real strength, discipline, and a routine that fits my lifestyle. The results have been incredible.",
    image: "/images/transform-rohan.jpg",
  },
];

export function ResultsSection({ onOpenInquiry }: ResultsSectionProps) {
  return (
    <section className="section-pad relative overflow-hidden" id="results" style={{ backgroundColor: "#09090b" }}>
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[600px] pointer-events-none rounded-full blur-[180px] -z-0 opacity-15"
        style={{ background: "radial-gradient(circle, #FF5722 0%, transparent 70%)" }}
      />

      <div className="proto-container relative z-10">
        {/* Top Header & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9F00] shadow-[0_0_8px_#FF9F00]" />
              <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
                REAL CLIENT RESULTS / TRANSFORMATIONS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase mb-4">
              RESULTS THAT{" "}
              <span className="bg-gradient-to-r from-[#FFB300] to-[#FF5722] bg-clip-text text-transparent">
                SPEAK.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Real people. Real goals. Real transformations. A coaching system built for sustainable
              progress, both inside and outside the gym.
            </p>
          </div>

          {/* Top Right Stats Row */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 border-l border-white/10 pl-6">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#FFB300]">120+</div>
              <div className="mono text-[10px] sm:text-xs text-slate-400 uppercase mt-1">
                CLIENT<br />TRANSFORMATIONS
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#FFB300]">95%</div>
              <div className="mono text-[10px] sm:text-xs text-slate-400 uppercase mt-1">
                ACHIEVE<br />THEIR GOALS
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#FFB300]">4.9★</div>
              <div className="mono text-[10px] sm:text-xs text-slate-400 uppercase mt-1">
                AVERAGE<br />CLIENT RATING
              </div>
            </div>
          </div>
        </div>

        {/* 3 Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CLIENT_STORIES.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl bg-[#121215] border border-white/10 p-5 hover:border-[#FF9F00]/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => onOpenInquiry?.()}
            >
              <div>
                {/* Before / After Photo */}
                <div className="relative h-64 rounded-xl overflow-hidden mb-5">
                  <img
                    src={story.image}
                    alt={`${story.name} Transformation`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] mono text-white/90">
                    BEFORE
                  </div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFB300] to-[#FF5722] text-black font-extrabold px-2.5 py-1 rounded text-[10px] mono shadow-md">
                    AFTER
                  </div>
                </div>

                {/* Name & Metric Header */}
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      {story.name}
                    </h3>
                    <div className="mono text-[11px] text-slate-400">
                      {story.role} / {story.duration}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black text-[#FF9F00]">
                      {story.metric}
                    </div>
                    <div className="mono text-[9px] text-slate-400 uppercase">
                      {story.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-slate-300 italic leading-relaxed border-t border-white/5 pt-3">
                  <span className="text-[#FF9F00] font-bold text-sm mr-1.5">“</span>
                  {story.quote}
                  <span className="text-[#FF9F00] font-bold text-sm ml-1.5">”</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight Bar (Screenshot 4) */}
        <div className="rounded-xl bg-[#121215] border border-white/10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-5 h-[2px] bg-[#FF9F00]" />
            <span className="mono text-xs uppercase text-slate-300 font-bold tracking-wider">
              THE RESULTS GO BEYOND THE SCALE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[#FF9F00]">🏋️</span>
              <span className="text-white font-medium">LEANER, STRONGER BODIES</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF9F00]">⚡</span>
              <span className="text-white font-medium">HIGHER ENERGY & FOCUS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF9F00]">🛡️</span>
              <span className="text-white font-medium">BETTER HABITS & DISCIPLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF9F00]">♾️</span>
              <span className="text-white font-medium">LONG-TERM, SUSTAINABLE RESULTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
