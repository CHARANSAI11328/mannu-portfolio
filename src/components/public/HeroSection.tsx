"use client";

import React, { useRef, useEffect, useState } from "react";
import { HeroSectionData } from "@/types";

interface HeroSectionProps {
  data: HeroSectionData;
  onOpenInquiry: (planName?: string) => void;
}

export function HeroSection({ data, onOpenInquiry }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy or video not ready
      });
    }
  }, [data.video_url, data.mobile_video_url]);

  const focalPointClass =
    data.focal_point === "center-right"
      ? "object-[75%_center]"
      : data.focal_point === "right"
      ? "object-right"
      : data.focal_point === "center-left"
      ? "object-[25%_center]"
      : "object-center";

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-86px)] lg:min-h-[814px] bg-black bg-[#000000] overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: "#000000" }}
      aria-label="Shaik Mansoor Personal Training"
    >
      {/* =====================================================================
          CINEMATIC BACKGROUND VIDEO / FALLBACK
          ===================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Background Video */}
        {!videoError && data.video_url ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            poster={data.poster_url || data.fallback_image_url || "/images/mansoor-hero-poster.jpg"}
            onError={() => setVideoError(true)}
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover ${focalPointClass} transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: `${data.grayscale ? "grayscale(100%)" : ""} brightness(${
                data.video_brightness || 90
              }%) contrast(${data.video_contrast || 120}%)`,
            }}
          >
            {data.mobile_video_url && (
              <source src={data.mobile_video_url} media="(max-width: 768px)" type="video/mp4" />
            )}
            {data.video_url && <source src={data.video_url} type="video/mp4" />}
          </video>
        ) : null}

        {/* Fallback Static Visual / Silhouette Graphic */}
        {(videoError || !data.video_url || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-right-top transition-opacity duration-700"
            style={{
              backgroundImage: (data.poster_url || data.fallback_image_url)
                ? `url(${data.poster_url || data.fallback_image_url})`
                : "radial-gradient(ellipse at 70% 40%, #1e1e1e 0%, #0d0d0d 45%, #000000 80%)",
              filter: `${data.grayscale ? "grayscale(100%)" : ""} brightness(85%) contrast(120%)`,
            }}
          >
            {/* Subtle athletic silhouette rendering in CSS if no photo uploaded */}
            <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full opacity-20 pointer-events-none flex items-center justify-end pr-12 lg:pr-24">
              <svg
                viewBox="0 0 400 600"
                className="h-[85%] max-h-[700px] text-neutral-600 fill-current"
                aria-hidden="true"
              >
                <path d="M200 80c25 0 45-20 45-45s-20-45-45-45-45 20-45 45 20 45 45 45zm80 40c-25-10-55-15-80-15s-55 5-80 15c-30 12-50 40-50 75v120c0 15 12 25 25 25s25-10 25-25v-90h15v320c0 20 15 35 35 35s35-15 35-35V380h20v185c0 20 15 35 35 35s35-15 35-35V205h15v90c0 15 12 25 25 25s25-10 25-25V195c0-35-20-63-50-75z" />
              </svg>
            </div>
          </div>
        )}

        {/* =====================================================================
            SEAMLESS GRADIENT MASKS (Merging video into pure black #000000)
            ===================================================================== */}
        {/* Left directional vignette for maximum text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent"
          style={{ width: "100%", maxWidth: "900px" }}
        />

        {/* Heavy bottom-to-top gradient so lower CTAs and descriptions are crisp */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-transparent" />

        {/* Top subtle fade from navbar */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent" />

        {/* Dynamic darkness overlay configured from CMS */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: (data.overlay_darkness || 75) / 100 }}
        />
      </div>

      {/* =====================================================================
          FOREGROUND CONTENT COMPOSITION (Desktop 1440x900 viewport match)
          ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* LOWER-LEFT REGION: Headline, Subheading, CTAs */}
          <div className="lg:col-span-8 space-y-6 max-w-[680px]">
            {/* Optional Small Identifier */}
            {data.badge && (
              <div className="inline-block text-[#9E9E9E] text-[11px] font-mono tracking-[0.2em] uppercase border-l border-[#444444] pl-3">
                {data.badge}
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-white text-[38px] sm:text-[46px] lg:text-[52px] font-bold tracking-tight leading-[1.08] uppercase whitespace-pre-line drop-shadow-sm">
              {data.headline || "TRAIN SMARTER. GET\nSTRONGER."}
            </h1>

            {/* Primary Description */}
            <p className="text-[#B5B5B5] text-[18px] sm:text-[21px] lg:text-[22px] font-normal leading-[1.45] max-w-[620px]">
              {data.description ||
                "Personal training programs and coaching built around proven methods, clear structure, and sustainable progress."}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary CTA (White Pill) */}
              <button
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center bg-white text-black hover:bg-[#E5E5E5] text-[14px] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95"
              >
                {data.primary_cta_label || "GET IN TOUCH"}
              </button>

              {/* Secondary CTA (Outlined Pill) */}
              <a
                href={data.secondary_cta_target || "#pricing"}
                className="inline-flex items-center justify-center bg-transparent text-white hover:bg-white/10 text-[14px] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-full border border-[#353535] hover:border-white transition-all duration-200"
              >
                {data.secondary_cta_label || "PRICING"}
              </a>
            </div>
          </div>

          {/* LOWER-RIGHT REGION: Secondary Description (Matching Reference Layout) */}
          <div className="lg:col-span-4 lg:text-left flex flex-col justify-end pt-4 lg:pt-0">
            <div className="border-t lg:border-t-0 lg:border-l border-[#262626] pt-4 lg:pt-0 lg:pl-6">
              <p className="text-[#B5B5B5] text-[14px] sm:text-[15px] leading-[1.6] max-w-[340px]">
                {data.secondary_description ||
                  "No shortcuts. No guesswork. Just focused training designed to fit your goals and your lifestyle."}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#737373] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                <span>Bapatla • 7 Eleven Fitness Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
