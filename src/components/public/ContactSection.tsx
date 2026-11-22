"use client";

import React from "react";
import { ContactInfo } from "@/types";

interface ContactSectionProps {
  contact?: ContactInfo;
  onOpenInquiry?: () => void;
}

export function ContactSection({ onOpenInquiry }: ContactSectionProps) {
  return (
    <section className="closing" id="contact">
      <div className="closing-grid" />
      <div className="proto-container closing-content reveal is-visible">
        <span className="mono">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          LET&apos;S GET
          <br />
          <em>TO WORK.</em>
        </h2>
        <div className="closing-bottom">
          <p>Online or in person. Beginner or experienced. The next move is yours.</p>
          <button
            className="btn btn-light btn-xl"
            type="button"
            onClick={() => onOpenInquiry?.()}
          >
            START A CONVERSATION <span className="circle-arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
