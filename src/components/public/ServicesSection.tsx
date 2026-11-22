"use client";

import React, { useState } from "react";
import { TrainingProgram } from "@/types";

interface ServicesSectionProps {
  programs?: TrainingProgram[];
  onSelectProgram: (programTitle: string) => void;
}

interface PrototypeProgramItem {
  number: string;
  name: string;
  type: string;
  title: string;
  description: string;
  goal: string;
}

const DEFAULT_PROGRAMS: PrototypeProgramItem[] = [
  {
    number: "01",
    name: "MUSCLE BUILDING",
    type: "BUILD SIZE WITH INTENT",
    title: "OWN THE<br/>NEXT REP.",
    description:
      "A purposeful path to adding muscle through structured training, exercise technique, and consistent progression.",
    goal: "Muscle building",
  },
  {
    number: "02",
    name: "FAT LOSS",
    type: "MOVE WITH CONFIDENCE",
    title: "BUILD A<br/>LEANER YOU.",
    description:
      "Create a sustainable approach to fat loss with training guidance that fits your schedule and starting point.",
    goal: "Fat loss",
  },
  {
    number: "03",
    name: "STRENGTH TRAINING",
    type: "POWER WITH PURPOSE",
    title: "GET<br/>STRONGER.",
    description:
      "Practice the fundamental lifts, improve movement quality, and build strength over time.",
    goal: "Strength training",
  },
  {
    number: "04",
    name: "BODYBUILDING PREP",
    type: "PREPARE FOR THE STAGE",
    title: "PRECISION.<br/>DISCIPLINE.",
    description:
      "Discuss structured bodybuilding preparation and competition-focused goals with a trainer who has stage experience.",
    goal: "Bodybuilding prep",
  },
  {
    number: "05",
    name: "BEGINNER FITNESS",
    type: "THE FIRST STEP MATTERS",
    title: "START<br/>STRONG.",
    description:
      "Learn foundational movement patterns and build the confidence to make training part of your routine.",
    goal: "Beginner fitness",
  },
  {
    number: "06",
    name: "CONDITIONING",
    type: "BETTER EVERY SESSION",
    title: "MOVE.<br/>ENDURE.",
    description:
      "Develop general fitness and work capacity through a thoughtfully balanced training approach.",
    goal: "Conditioning",
  },
];

export function ServicesSection({ onSelectProgram }: ServicesSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeProg = DEFAULT_PROGRAMS[selectedIndex];

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    setIsSwitching(true);
    setSelectedIndex(idx);
    setTimeout(() => setIsSwitching(false), 250);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % DEFAULT_PROGRAMS.length;
      handleSelect(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx + DEFAULT_PROGRAMS.length - 1) % DEFAULT_PROGRAMS.length;
      handleSelect(prev);
    }
  };

  return (
    <section className="programs dark-section section-pad" id="programs">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline section-topline-dark reveal is-visible">
          <span className="section-index mono">02 / WHAT WE BUILD</span>
          <span className="section-line" />
          <span className="mono section-context">CHOOSE YOUR DIRECTION</span>
        </div>

        {/* Section Heading */}
        <div className="section-head reveal is-visible">
          <div>
            <p className="small-kicker">TRAIN FOR THE PERSON YOU WANT TO BECOME.</p>
            <h2 className="display-big">
              CHOOSE
              <br />
              <em>YOUR EDGE.</em>
            </h2>
          </div>
          <p className="section-head-aside">
            A different goal deserves a different approach. Choose your focus to explore how
            we train.
          </p>
        </div>

        {/* Interactive Workbench */}
        <div className="program-workbench">
          {/* Left: Tab list */}
          <div
            className="program-list"
            role="tablist"
            aria-label="Training programs"
            id="programList"
          >
            {DEFAULT_PROGRAMS.map((prog, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={prog.number}
                  role="tab"
                  className={`program-row ${isSelected ? "is-selected" : ""}`}
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className="program-number mono">{prog.number}</span>
                  <span className="program-name">{prog.name}</span>
                  <span className="program-arrow">↗</span>
                </button>
              );
            })}
          </div>

          {/* Right: Stage with 3D rotating CSS weight plate */}
          <div
            className={`program-stage ${isSwitching ? "stage-switch" : ""}`}
            id="programStage"
            role="tabpanel"
            aria-live="polite"
          >
            <div className="stage-top">
              <span className="mono stage-tag">
                PROGRAM SPOTLIGHT / <span>{activeProg.number}</span>
              </span>
              <span className="stage-plus">+</span>
            </div>

            {/* 3D Barbell Weight Plate Graphic */}
            <div
              className="plate-graphic"
              aria-hidden="true"
              style={{
                transform: `translateX(-50%) rotate(${selectedIndex * 36}deg)`,
              }}
            >
              <div className="plate-rim plate-rim-outer">
                <div className="plate-rim plate-rim-mid">
                  <div className="plate-rim plate-rim-inner">
                    <span className="plate-center">M</span>
                  </div>
                </div>
              </div>
              <div className="plate-line" />
            </div>

            {/* Stage bottom copy and CTA */}
            <div className="stage-bottom">
              <span className="stage-type mono">{activeProg.type}</span>
              <h3 dangerouslySetInnerHTML={{ __html: activeProg.title }} />
              <p>{activeProg.description}</p>
              <button
                className="stage-cta"
                type="button"
                onClick={() => onSelectProgram(activeProg.goal)}
              >
                EXPLORE THIS COACHING <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
