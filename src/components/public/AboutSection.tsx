"use client";

import React from "react";
import { AboutSectionData } from "@/types";

interface AboutSectionProps {
  data?: AboutSectionData;
  onOpenInquiry?: () => void;
}

export function AboutSection({ data }: AboutSectionProps) {
  const athleteImage =
    data?.trainer_image_url || "/assets/about-reference-placeholder.webp";

  return (
    <section className="intro cream-section section-pad" id="about">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline reveal is-visible">
          <span className="section-index mono">01 / THE ATHLETE</span>
          <span className="section-line" />
          <span className="mono section-context">THE STORY BEHIND THE WORK</span>
        </div>

        {/* Section Headings */}
        <div className="intro-heading-wrap reveal is-visible">
          <p className="intro-lead">MORE THAN A ROUTINE.</p>
          <h2 className="display-giant">
            A STANDARD <em>TO LIVE BY.</em>
          </h2>
        </div>

        {/* Intro Grid */}
        <div className="intro-grid">
          {/* Visual with hover zoom */}
          <div className="intro-visual reveal is-visible">
            <div className="image-frame">
              <img
                src={athleteImage}
                alt="Shaik Mansoor portrait visual"
                loading="lazy"
              />
              <div className="image-frame-overlay">
                <span>FOCUS. FORM. FOLLOW-THROUGH.</span>
                <span>↗</span>
              </div>
            </div>
            <div className="photo-caption mono">ATHLETE PORTRAIT — BUILT BY DISCIPLINE</div>
          </div>

          {/* Narrative Content */}
          <div className="intro-content reveal is-visible">
            <span className="tiny-label mono">INTRODUCING SHAIK MANSOOR</span>
            <h3>
              THE STRENGTH TO
              <br />
              <em>GO FURTHER.</em>
            </h3>
            <p>
              Four years in the gym. Two bodybuilding podium finishes. Experience as a
              trainer at 7 Eleven Fitness Studio, Bapatla. This is coaching shaped by
              consistency, competition, and time under the bar.
            </p>
            <p>
              Whether you&apos;re starting from zero or ready to take your training
              seriously, the approach is personal: understand your goal, build your plan,
              and put in the work.
            </p>

            {/* Fact Counters */}
            <div className="fact-row">
              <div>
                <strong>
                  04<span>+</span>
                </strong>
                <small>
                  YEARS OF GYM
                  <br />
                  EXPERIENCE
                </small>
              </div>
              <div>
                <strong>02</strong>
                <small>
                  COMPETITION
                  <br />
                  PODIUM FINISHES
                </small>
              </div>
            </div>

            <a href="#achievements" className="text-link">
              SEE THE ACHIEVEMENTS <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
