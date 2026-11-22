"use client";

import React, { useState } from "react";

interface ProcessSectionProps {
  onOpenInquiry?: () => void;
}

export function ProcessSection({ onOpenInquiry }: ProcessSectionProps) {
  const [trainingMode, setTrainingMode] = useState<"offline" | "online">("offline");

  const stepTwoText =
    trainingMode === "online"
      ? "Discuss online coaching options, communication, and a schedule that works for your time zone."
      : "Discuss your training plan and agree on in-person sessions at the Bapatla training location.";

  return (
    <section className="process dark-section section-pad" id="process">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline section-topline-dark reveal is-visible">
          <span className="section-index mono">04 / THE APPROACH</span>
          <span className="section-line" />
          <span className="mono section-context">MADE AROUND YOU</span>
        </div>

        {/* Section Heading & Mode Picker */}
        <div className="process-head reveal is-visible">
          <h2 className="display-big">
            YOUR GOAL.
            <br />
            <em>YOUR GAME PLAN.</em>
          </h2>

          <div className="mode-picker" aria-label="Preferred coaching format">
            <span className="mono">CHOOSE YOUR MODE</span>
            <div className="segmented-control" role="group" aria-label="Training mode">
              <button
                className={trainingMode === "offline" ? "is-active" : ""}
                type="button"
                aria-pressed={trainingMode === "offline"}
                onClick={() => setTrainingMode("offline")}
              >
                IN PERSON
              </button>
              <button
                className={trainingMode === "online" ? "is-active" : ""}
                type="button"
                aria-pressed={trainingMode === "online"}
                onClick={() => setTrainingMode("online")}
              >
                ONLINE
              </button>
            </div>
          </div>
        </div>

        {/* 3 Process Steps */}
        <div className="process-steps">
          {/* Step 1 */}
          <div
            className="process-step reveal is-visible cursor-pointer"
            onClick={() => onOpenInquiry?.()}
          >
            <span className="process-step-index mono">STEP 01</span>
            <span className="step-symbol">↗</span>
            <h3>
              THE
              <br />
              CONVERSATION.
            </h3>
            <p>Tell us what you&apos;re working toward, where you&apos;re starting, and what fits your life.</p>
          </div>

          {/* Step 2 */}
          <div
            className="process-step reveal is-visible cursor-pointer"
            onClick={() => onOpenInquiry?.()}
          >
            <span className="process-step-index mono">STEP 02</span>
            <span className="step-symbol">⌁</span>
            <h3>
              THE
              <br />
              DIRECTION.
            </h3>
            <p id="stepTwoText">{stepTwoText}</p>
          </div>

          {/* Step 3 */}
          <div
            className="process-step reveal is-visible cursor-pointer"
            onClick={() => onOpenInquiry?.()}
          >
            <span className="process-step-index mono">STEP 03</span>
            <span className="step-symbol">✓</span>
            <h3>
              THE
              <br />
              WORK.
            </h3>
            <p>Start training with a clear focus. Reassess, refine, and keep building your consistency.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
