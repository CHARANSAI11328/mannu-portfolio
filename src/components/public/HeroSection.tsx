"use client";

import React, { useRef, useEffect, useState } from "react";
import { HeroSectionData } from "@/types";

interface HeroSectionProps {
  data: HeroSectionData;
  onOpenInquiry: (planName?: string) => void;
  onOpenPreviewSettings?: () => void;
}

export function HeroSection({
  data,
  onOpenInquiry,
  onOpenPreviewSettings,
}: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Parallax effect matching the prototype
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 700 && parallaxRef.current) {
        const y = window.scrollY;
        parallaxRef.current.style.setProperty(
          "--parallax",
          `${Math.min(y * 0.13, 100)}px`
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const videoSrc = data.video_url || "/videos/mansoor-hero.mp4";
  const posterSrc =
    data.poster_url ||
    data.fallback_image_url ||
    "/assets/hero-reference-placeholder.webp";

  return (
    <section className="hero" id="home" aria-label="Shaik Mansoor fitness coaching">
      {/* Background Visual Layer with Parallax */}
      <div className="hero-photo-layer" id="heroParallax" ref={parallaxRef}>
        <img
          id="heroPoster"
          src={posterSrc}
          alt="Shaik Mansoor athlete visual"
        />
        <video
          ref={videoRef}
          id="heroVideo"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          src={videoSrc}
          className={hasVideo ? "has-video" : ""}
          onLoadedData={() => setHasVideo(true)}
          onError={() => setHasVideo(false)}
        />
        <div className="hero-photo-vignette" />
      </div>

      {/* Watermark Ghost 'M' */}
      <div className="hero-ghost" aria-hidden="true">
        M
      </div>

      {/* Vertical Edge Label */}
      <div className="hero-edge-label" aria-hidden="true">
        DISCIPLINE / EVERY DAY
      </div>

      {/* Hero Topline */}
      <div className="hero-topline mono">
        <span className="status-dot" /> BAPATLA, INDIA{" "}
        <span className="topline-divider" /> ONLINE & IN-PERSON COACHING
      </div>

      {/* Main Copy */}
      <div className="hero-copy">
        <div className="eyebrow reveal is-visible">
          <span className="eyebrow-bar" /> PERSONAL FITNESS COACHING BY SHAIK MANSOOR
        </div>
        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line-inner">TRAIN SMARTER.</span>
          </span>
          <span className="line-mask">
            <span className="line-inner">
              GET <em>STRONGER.</em>
            </span>
          </span>
        </h1>
        <div className="hero-copy-bottom reveal is-visible">
          <p>
            Personal training built around <strong>real work</strong>, clear direction,
            and a stronger version of you.
          </p>
          <div className="hero-ctas">
            <button
              type="button"
              className="btn btn-light btn-xl"
              onClick={() => onOpenInquiry()}
            >
              START YOUR JOURNEY{" "}
              <span className="circle-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
            <a href="#programs" className="btn btn-outline btn-xl">
              EXPLORE PROGRAMS <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Standard Note */}
      <div className="hero-right-note reveal is-visible">
        <span className="mono small-index">01 / THE STANDARD</span>
        <p>No shortcuts. No guesswork. Just focused training built around your goals.</p>
      </div>

      {/* Bottom Cue & Highlights */}
      <div className="hero-bottom">
        <div className="scroll-cue">
          <span className="scroll-cue-line" />
          <span>SCROLL TO DISCOVER</span>
        </div>
        <div className="hero-counter mono">
          4 YEARS IN FITNESS <span className="hero-counter-spark">✳</span> 02 COMPETITION PODIUMS
        </div>
        <button
          className="hero-image-note mono"
          id="openHeroMedia"
          type="button"
          aria-label="Open video preview controls"
          onClick={() => onOpenPreviewSettings?.()}
        >
          REFERENCE VISUAL · REPLACE WITH MANSOOR VIDEO ↗
        </button>
      </div>
    </section>
  );
}
