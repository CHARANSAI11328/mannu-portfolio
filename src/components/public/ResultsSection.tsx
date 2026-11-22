"use client";

import React from "react";
import { Achievement, Transformation } from "@/types";

interface ResultsSectionProps {
  achievements: Achievement[];
  transformations: Transformation[];
  onOpenInquiry?: () => void;
}

export function ResultsSection({
  achievements,
  transformations,
  onOpenInquiry,
}: ResultsSectionProps) {
  const consentedTransformations = transformations.filter(
    (t) => t.is_published && t.has_client_consent
  );

  return (
    <section
      id="results"
      className="w-full bg-[#000000] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-16">
          <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block mb-3">
            COMPETITION & PROVEN RESULTS
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight uppercase leading-[1.12]">
            VERIFIED PODIUM ACHIEVEMENTS
          </h2>
          <p className="text-[#B5B5B5] text-[16px] sm:text-[18px] mt-3">
            Real competitive credentials from official regional and university bodybuilding
            championships.
          </p>
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="bg-[#0c0c0c] border border-[#2a2a2a] hover:border-[#444444] rounded-2xl p-8 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest text-[#999999] uppercase">
                    OFFICIAL RECORD
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-black">
                    {ach.ranking}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white mb-2">
                  {ach.title}
                </h3>

                <div className="text-sm font-medium text-[#A3A3A3] mb-4">
                  {ach.event} {ach.year ? `• ${ach.year}` : ""}
                </div>

                <p className="text-sm text-[#B5B5B5] leading-relaxed mb-6">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#737373]">
                <span>Verified Competitive Honor</span>
                <span className="text-white font-mono">Bapatla / ANU</span>
              </div>
            </div>
          ))}
        </div>

        {/* TRANSFORMATIONS (Only rendered if genuine consented transformations exist) */}
        {consentedTransformations.length > 0 && (
          <div className="pt-12 border-t border-[#222222]">
            <div className="max-w-xl mb-10">
              <span className="text-[#888888] text-[11px] font-mono tracking-[0.2em] uppercase block mb-2">
                CLIENT TRANSFORMATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                REAL DISCIPLINE. REAL CHANGES.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {consentedTransformations.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#0e0e0e] border border-[#262626] rounded-xl overflow-hidden p-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative aspect-[3/4] bg-neutral-900 rounded overflow-hidden">
                        <img
                          src={t.before_image_url}
                          alt={`${t.client_name} Before`}
                          className="w-full h-full object-cover grayscale"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] uppercase font-mono">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-[3/4] bg-neutral-900 rounded overflow-hidden">
                        <img
                          src={t.after_image_url}
                          alt={`${t.client_name} After`}
                          className="w-full h-full object-cover grayscale"
                        />
                        <span className="absolute bottom-2 left-2 bg-white text-black px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold">
                          After
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-base uppercase">
                          {t.client_name}
                        </h4>
                        {t.duration && (
                          <span className="text-xs text-[#888888] font-mono">
                            {t.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#B5B5B5] mt-2 leading-relaxed">
                        {t.result_summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
