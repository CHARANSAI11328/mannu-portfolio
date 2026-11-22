"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types";

interface FaqSectionProps {
  faqs?: FaqItem[];
}

const DEFAULT_FAQS = [
  {
    question: "Can I train online or in person?",
    answer:
      "Both are available as coaching options. Offline training is based in Bapatla, and online coaching can be discussed directly with Mansoor.",
  },
  {
    question: "Are the session timings fixed?",
    answer:
      "No fixed timetable is promised on the website. Mansoor discusses availability, frequency, and times with each client before enrollment.",
  },
  {
    question: "Are gym fees included?",
    answer:
      "Gym membership fees may be separate. Confirm the complete package and any venue costs with Mansoor before payment.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "The Foundation plan is designed as a starting point. Mansoor can discuss your current experience and suggest an appropriate approach.",
  },
];

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = faqs && faqs.length > 0
    ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
    : DEFAULT_FAQS;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq cream-section section-pad" id="faq">
      <div className="proto-container">
        {/* Section Topline */}
        <div className="section-topline reveal is-visible">
          <span className="section-index mono">06 / GOOD TO KNOW</span>
          <span className="section-line" />
          <span className="mono section-context">BEFORE YOU BEGIN</span>
        </div>

        {/* FAQ Grid */}
        <div className="faq-grid">
          <div className="reveal is-visible">
            <h2 className="display-big">
              QUESTIONS?
              <br />
              <em>GOOD.</em>
            </h2>
            <p>Clear expectations. No confusing commitments.</p>
          </div>

          <div className="faq-list reveal is-visible">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="faq-item">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle">+</span>
                  </button>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
