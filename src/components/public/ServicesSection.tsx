"use client";

import React from "react";
import { TrainingProgram } from "@/types";

interface ServicesSectionProps {
  programs: TrainingProgram[];
  onSelectProgram: (programTitle: string) => void;
}

export function ServicesSection({ programs, onSelectProgram }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="w-full bg-[#080808] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
              TRAINING PROGRAMS
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
              STRUCTURED PROGRAMS. REAL PROGRESS.
            </h2>
            <p className="text-[#B5B5B5] text-[16px] sm:text-[18px] mt-3">
              Every program is structured around progressive overload, biomechanical safety, and
              individual accountability.
            </p>
          </div>
          <div className="text-xs text-[#888888] font-mono uppercase tracking-wider">
            Available: Online & Offline (Bapatla)
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-[#101010] border border-[#262626] hover:border-[#404040] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                {/* Header meta */}
                <div className="flex items-center justify-between text-xs font-mono uppercase text-[#737373] mb-4">
                  <span>0{idx + 1} / {prog.category}</span>
                  <div className="flex items-center gap-1.5">
                    {prog.training_modes.map((mode) => (
                      <span
                        key={mode}
                        className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border border-[#333333] text-[#A3A3A3]"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase mb-3 group-hover:text-neutral-200 transition-colors">
                  {prog.title}
                </h3>

                {/* Program Description */}
                <p className="text-[#B5B5B5] text-sm leading-relaxed mb-5">
                  {prog.description}
                </p>

                {/* Target Audience */}
                <div className="text-xs text-[#888888] mb-5 border-l-2 border-[#333333] pl-3 py-0.5">
                  <span className="text-[#A3A3A3] font-medium">Ideal for: </span>
                  {prog.target_audience}
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {prog.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-xs text-[#CCCCCC] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectProgram(prog.title)}
                className="w-full mt-4 bg-transparent hover:bg-white text-white hover:text-black border border-[#353535] hover:border-white text-xs font-semibold tracking-wider uppercase py-3 rounded-full transition-all duration-200 text-center"
              >
                INQUIRE ON WHATSAPP
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
