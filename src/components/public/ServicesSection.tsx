"use client";

import React, { useState } from "react";
import { TrainingProgram } from "@/types";

interface ServicesSectionProps {
  programs?: TrainingProgram[];
  onSelectProgram: (programTitle: string) => void;
}

interface ProgramCardItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

const PROGRAM_ITEMS: ProgramCardItem[] = [
  {
    id: "muscle-building",
    name: "MUSCLE BUILDING",
    icon: "💪",
    description:
      "Build lean, quality muscle with a structured, progressive plan tailored to your body and goals.",
    image: "/images/program-muscle.jpg",
  },
  {
    id: "fat-loss",
    name: "FAT LOSS",
    icon: "🔥",
    description:
      "Lose fat, improve body composition, and feel lighter, stronger, and more confident.",
    image: "/images/program-fatloss.jpg",
    isFeatured: true,
  },
  {
    id: "strength-training",
    name: "STRENGTH TRAINING",
    icon: "🏋️",
    description:
      "Build real-world strength, power, and resilience with proven, structured training.",
    image: "/images/program-strength.jpg",
  },
  {
    id: "bodybuilding-prep",
    name: "BODYBUILDING PREPARATION",
    icon: "🏆",
    description:
      "Competition-focused training, conditioning, and guidance to help you show up at your best.",
    image: "/images/program-bodybuilding.jpg",
  },
  {
    id: "beginner-fitness",
    name: "BEGINNER FITNESS",
    icon: "🌱",
    description:
      "A clear, supportive, and effective start to your fitness journey — no experience needed.",
    image: "/images/program-beginner.jpg",
  },
  {
    id: "general-fitness",
    name: "GENERAL FITNESS",
    icon: "⚡",
    description:
      "Build a stronger, healthier, and more energetic version of yourself with a balanced, sustainable plan.",
    image: "/images/program-general.jpg",
  },
];

export function ServicesSection({ onSelectProgram }: ServicesSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="section-pad relative overflow-hidden" id="programs" style={{ backgroundColor: "#09090b" }}>
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none rounded-full blur-[160px] -z-0 opacity-15"
        style={{ background: "radial-gradient(circle, #FF9F00 0%, transparent 70%)" }}
      />

      <div className="proto-container relative z-10">
        {/* Section Topline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#FF9F00]" />
              <span className="mono text-xs tracking-wider text-[#94a3b8] uppercase font-bold">
                SERVICES / PROGRAMS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              TRAINING{" "}
              <span className="bg-gradient-to-r from-[#FFB300] via-[#FF9F00] to-[#FF5722] bg-clip-text text-transparent">
                PROGRAMS
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Targeted training programs built for real results. Whether you&apos;re building muscle,
            losing fat, getting stronger, or starting fresh — there&apos;s a program for you.
          </p>
        </div>

        {/* 6 Program Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAM_ITEMS.map((item) => {
            const isHighlighted = item.isFeatured || hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-2xl bg-[#121215] p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 group cursor-pointer ${
                  isHighlighted
                    ? "border border-[#FF9800] shadow-[0_0_30px_rgba(255,140,0,0.35)]"
                    : "border border-white/10 hover:border-[#FF9F00]/50"
                }`}
                onClick={() => onSelectProgram(item.name)}
              >
                {/* Background visual image right side */}
                <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#121215] via-[#121215]/60 to-transparent" />
                </div>

                {/* Card Content (Left 65%) */}
                <div className="relative z-10 max-w-[65%] mb-8">
                  <div className="text-2xl mb-3 text-[#FF9F00]">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="relative z-10">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      background: isHighlighted
                        ? "linear-gradient(135deg, #FFB300 0%, #FF5722 100%)"
                        : "transparent",
                      color: isHighlighted ? "#000" : "#fff",
                      border: isHighlighted
                        ? "none"
                        : "1px solid rgba(255, 150, 0, 0.4)",
                      boxShadow: isHighlighted
                        ? "0 4px 15px rgba(255, 140, 0, 0.4)"
                        : "none",
                    }}
                  >
                    <span>EXPLORE PROGRAM</span>
                    <span className={isHighlighted ? "text-black font-extrabold" : "text-[#FF9F00]"}>+</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
