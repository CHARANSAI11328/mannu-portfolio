"use client";

import React, { useRef } from "react";
import { PricingPlan } from "@/types";

interface PricingSectionProps {
  plans?: PricingPlan[];
  onSelectPlan: (planName: string, price: number) => void;
}

export function PricingSection({ plans, onSelectPlan }: PricingSectionProps) {
  // 3D tilt interaction matching prototype
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg) translateY(-7px)`;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  // Default plans if none from CMS
  const foundationPrice = plans?.find((p) => p.name.includes("Foundation"))?.price_inr || 999;
  const transformationPrice =
    plans?.find((p) => p.name.includes("Transformation"))?.price_inr || 1999;
  const elitePrice = plans?.find((p) => p.name.includes("Elite"))?.price_inr || 3999;

  return (
    <section className="pricing dark-section section-pad" id="pricing">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline section-topline-dark reveal is-visible">
          <span className="section-index mono">05 / THE INVESTMENT</span>
          <span className="section-line" />
          <span className="mono section-context">MONTHLY TRAINING</span>
        </div>

        {/* Section Heading */}
        <div className="pricing-head reveal is-visible">
          <div>
            <p className="small-kicker">NO COMPLICATED PACKAGES.</p>
            <h2 className="display-big">
              PUT IN THE
              <br />
              <em>WORK.</em>
            </h2>
          </div>
          <p>
            Three ways to begin. Every plan starts with a conversation, because your training
            schedule should fit your actual life.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="pricing-grid">
          {/* Level 01: Foundation */}
          <article
            className="price-card reveal is-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="price-top">
              <span className="mono">LEVEL 01 / ENTRY</span>
              <span className="price-symbol">✳</span>
            </div>
            <h3>FOUNDATION</h3>
            <p>Build your routine. Learn the fundamentals. Get moving with direction.</p>
            <div className="price-amount">
              ₹{foundationPrice.toLocaleString("en-IN")}{" "}
              <span>/ MONTH</span>
            </div>
            <div className="price-rule" />
            <ul>
              <li>Basic workout guidance</li>
              <li>Beginner exercise routines</li>
              <li>Fundamental form guidance</li>
              <li>General fitness support</li>
            </ul>
            <button
              className="price-button"
              type="button"
              onClick={() => onSelectPlan("Foundation", foundationPrice)}
            >
              CHOOSE FOUNDATION <span>↗</span>
            </button>
          </article>

          {/* Level 02: Transformation (Featured) */}
          <article
            className="price-card featured reveal is-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="price-top">
              <span className="mono">LEVEL 02 / MOST POPULAR</span>
              <span className="featured-tag mono">FOCUSED PROGRESS</span>
            </div>
            <h3>TRANSFORMATION</h3>
            <p>Training with intent, built around the change you&apos;re working toward.</p>
            <div className="price-amount">
              ₹{transformationPrice.toLocaleString("en-IN")}{" "}
              <span>/ MONTH</span>
            </div>
            <div className="price-rule" />
            <ul>
              <li>Personalized workout structure</li>
              <li>Muscle gain or fat loss focus</li>
              <li>Exercise form reviews</li>
              <li>Progress discussions</li>
              <li>Individual fitness guidance</li>
            </ul>
            <button
              className="price-button"
              type="button"
              onClick={() => onSelectPlan("Transformation", transformationPrice)}
            >
              CHOOSE TRANSFORMATION <span>↗</span>
            </button>
          </article>

          {/* Level 03: Elite Coaching */}
          <article
            className="price-card reveal is-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="price-top">
              <span className="mono">LEVEL 03 / PERSONAL</span>
              <span className="price-symbol">↗</span>
            </div>
            <h3>ELITE COACHING</h3>
            <p>More personal attention for people ready to go all in.</p>
            <div className="price-amount">
              ₹{elitePrice.toLocaleString("en-IN")}{" "}
              <span>/ MONTH</span>
            </div>
            <div className="price-rule" />
            <ul>
              <li>Individualized training approach</li>
              <li>Personal fitness assessment</li>
              <li>Agreed one-to-one sessions</li>
              <li>Priority communication</li>
              <li>Closer progress monitoring</li>
            </ul>
            <button
              className="price-button"
              type="button"
              onClick={() => onSelectPlan("Elite Coaching", elitePrice)}
            >
              CHOOSE ELITE <span>↗</span>
            </button>
          </article>
        </div>

        {/* Pricing Footnote */}
        <p className="pricing-footnote mono">
          * SESSION FREQUENCY, SCHEDULE, MODE AND INCLUSIONS ARE DISCUSSED DIRECTLY WITH
          MANSOOR BEFORE ENROLLMENT. GYM MEMBERSHIP MAY BE SEPARATE.
        </p>
      </div>
    </section>
  );
}
