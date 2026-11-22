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

  // Calmer, silky smooth RAF-throttled parallax effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.innerWidth > 768 && parallaxRef.current) {
          const y = window.scrollY;
          // Calmed multiplier from 0.13 to 0.05 for a slow, gentle, smooth cinematic feel
          const offset = Math.min(y * 0.05, 60);
          parallaxRef.current.style.setProperty("--parallax", `${offset}px`);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const videoSrc = data.video_url || "/videos/mansoor-hero.mp4";
  const posterSrc =
    data.poster_url ||
    data.fallback_image_url ||
    "/images/hero-amber-coach.jpg";

  return (
    <section className="hero" id="home" aria-label="Shaik Mansoor fitness coaching">
      {/* Background Visual Layer with Gentle Parallax */}
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

      {/* Vertical Edge Label (Desktop only) */}
      <div className="hero-edge-label" aria-hidden="true">
        DISCIPLINE / EVERY DAY
      </div>

      {/* Hero Topline */}
      <div className="hero-topline mono">
        <span className="status-dot" style={{ backgroundColor: "#FF9F00", boxShadow: "0 0 10px #FF9F00" }} /> BAPATLA, INDIA{" "}
        <span className="topline-divider" /> ONLINE & IN-PERSON COACHING
      </div>

      {/* Main Copy */}
      <div className="hero-copy">
        <div className="eyebrow reveal is-visible flex items-center gap-2">
          <span className="eyebrow-bar" style={{ backgroundColor: "#FF9F00" }} /> PERSONAL FITNESS COACHING BY SHAIK MANSOOR
        </div>
        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line-inner">TRAIN SMARTER.</span>
          </span>
          <span className="line-mask">
            <span className="line-inner">
              GET <em style={{
                background: "linear-gradient(90deg, #FFB300 0%, #FF5722 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0px",
                fontStyle: "normal",
                opacity: 1
              }}>STRONGER.</em>
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
              style={{
                background: "linear-gradient(135deg, #FFB300 0%, #FF5722 100%)",
                boxShadow: "0 4px 25px rgba(255, 140, 0, 0.45)",
                borderRadius: "9999px",
                color: "#000",
                fontWeight: 800,
                padding: "0 28px",
              }}
              onClick={() => onOpenInquiry()}
            >
              START YOUR JOURNEY <span style={{ fontSize: "16px", fontWeight: "900", marginLeft: "4px" }}>+</span>
            </button>
            <a
              href="#programs"
              className="btn btn-outline btn-xl"
              style={{
                border: "1px solid rgba(255, 150, 0, 0.4)",
                background: "rgba(0,0,0,0.35)",
                borderRadius: "9999px",
                padding: "0 24px",
              }}
            >
              EXPLORE PROGRAMS <span style={{ color: "#FF9F00", fontWeight: "bold", marginLeft: "4px" }}>+</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Standard Note (Desktop only) */}
      <div className="hero-right-note reveal is-visible">
        <span className="mono small-index" style={{ color: "#FF9F00" }}>01 / THE STANDARD</span>
        <p>No shortcuts. No guesswork. Just focused training built around your goals.</p>
      </div>

      {/* Bottom Cue & Highlights */}
      <div className="hero-bottom">
        <div className="scroll-cue">
          <span className="scroll-cue-line" style={{ background: "#FF9F00" }} />
          <span>SCROLL TO DISCOVER</span>
        </div>
        <div className="hero-counter mono">
          4 YEARS IN FITNESS <span className="hero-counter-spark" style={{ color: "#FF9F00" }}>✳</span> 02 COMPETITION PODIUMS
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
