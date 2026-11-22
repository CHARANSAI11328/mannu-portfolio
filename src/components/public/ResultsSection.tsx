"use client";

import React from "react";
import { Achievement, Transformation } from "@/types";

interface ResultsSectionProps {
  achievements?: Achievement[];
  transformations?: Transformation[];
  onOpenInquiry?: () => void;
}

export function ResultsSection({ onOpenInquiry }: ResultsSectionProps) {
  return (
    <section className="achievements cream-section section-pad" id="achievements">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline reveal is-visible">
          <span className="section-index mono">03 / THE PROOF</span>
          <span className="section-line" />
          <span className="mono section-context">COMPETITION EXPERIENCE</span>
        </div>

        {/* Section Heading */}
        <div className="achieve-heading reveal is-visible">
          <div>
            <p className="small-kicker">HARD WORK IS VISIBLE.</p>
            <h2 className="display-big">
              PROVEN
              <br />
              <em>ON STAGE.</em>
            </h2>
          </div>
          <p>
            Not promises. Real competitive experience and the discipline that comes with
            preparing for the stage.
          </p>
        </div>

        {/* 2-Column Achievement Cards Grid */}
        <div className="achievement-grid">
          {/* Card 1: 1st Place Bapatla */}
          <article
            className="achievement-card reveal is-visible cursor-pointer"
            onClick={() => onOpenInquiry?.()}
          >
            <div className="achievement-graphic">
              <span className="achievement-background-number">01</span>
              <div className="trophy-icon" aria-hidden="true">
                ✦
              </div>
              <span className="trophy-rank">
                1<span>ST</span>
              </span>
              <span className="graphic-corner mono">BAPATLA / COMPETITION</span>
            </div>
            <div className="achievement-card-footer">
              <span className="mono">BODYBUILDING COMPETITION</span>
              <h3>
                FIRST PLACE <span>↗</span>
              </h3>
              <p>Bapatla · Official 1st place award in regional competitive bodybuilding.</p>
            </div>
          </article>

          {/* Card 2: 2nd Place ANU */}
          <article
            className="achievement-card reveal is-visible cursor-pointer"
            onClick={() => onOpenInquiry?.()}
          >
            <div className="achievement-graphic second">
              <span className="achievement-background-number">02</span>
              <div className="trophy-icon" aria-hidden="true">
                ✦
              </div>
              <span className="trophy-rank">
                2<span>ND</span>
              </span>
              <span className="graphic-corner mono">ANU / COMPETITION</span>
            </div>
            <div className="achievement-card-footer">
              <span className="mono">BODYBUILDING COMPETITION</span>
              <h3>
                SECOND PLACE <span>↗</span>
              </h3>
              <p>ANU · Acharya Nagarjuna University bodybuilding championship silver medal.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
