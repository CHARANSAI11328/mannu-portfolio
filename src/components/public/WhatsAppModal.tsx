"use client";

import React, { useState, useEffect } from "react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
  defaultPlan?: string;
}

export function WhatsAppModal({
  isOpen,
  onClose,
  whatsappNumber = "919876543210",
  defaultPlan,
}: WhatsAppModalProps) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Muscle building");
  const [plan, setPlan] = useState("Transformation — ₹1,999/month");
  const [trainingMode, setTrainingMode] = useState("In person — Bapatla");
  const [schedule, setSchedule] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync plan if defaultPlan passed
  useEffect(() => {
    if (defaultPlan) {
      if (defaultPlan.includes("Foundation")) {
        setPlan("Foundation — ₹999/month");
      } else if (defaultPlan.includes("Transformation")) {
        setPlan("Transformation — ₹1,999/month");
      } else if (defaultPlan.includes("Elite")) {
        setPlan("Elite Coaching — ₹3,999/month");
      } else {
        // Might be a program goal
        setGoal(defaultPlan.replace(" Program", ""));
      }
    }
  }, [defaultPlan]);

  if (!isOpen) return null;

  const normalizedPhone = (whatsappNumber || "").replace(/[^\d]/g, "").replace(/^00/, "");
  const isValidPhone = /^[1-9]\d{8,14}$/.test(normalizedPhone);

  const inquiryText = `Hi Mansoor! I am interested in your personal fitness coaching.\n\nName: ${
    name.trim() || "[Your name]"
  }\nFitness goal: ${goal}\nTraining format: ${trainingMode}\nMonthly plan: ${plan}\nPreferred schedule: ${
    schedule.trim() || "Flexible — to discuss"
  }\n\nCould we discuss your availability, session frequency, fees, and how to start?`;

  const waUrl = isValidPhone
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(inquiryText)}`
    : "#";

  const handleCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(inquiryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = inquiryText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      className="sheet-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingTitle"
    >
      <div className="sheet-dialog">
        <div className="dialog-layout">
          {/* Left Dark Editorial Side */}
          <div className="dialog-side">
            <div className="dialog-side-top mono">M / TRAIN WITH PURPOSE</div>
            <div className="dialog-side-body">
              <span className="mono">YOUR NEXT STEP</span>
              <h2>
                LET&apos;S
                <br />
                BUILD
                <br />
                <em>YOUR PLAN.</em>
              </h2>
              <p>
                Tell Mansoor what you&apos;re working toward. He&apos;ll discuss training
                availability and the right next steps directly with you.
              </p>
            </div>
            <div className="dialog-side-bottom mono">NO ONLINE PAYMENT · PERSONAL SCHEDULING</div>
          </div>

          {/* Right Light Form Side */}
          <div className="dialog-main">
            <div className="dialog-header">
              <span className="mono">START A CONVERSATION / 01</span>
              <button
                className="dialog-close"
                type="button"
                onClick={onClose}
                aria-label="Close booking form"
              >
                ×
              </button>
            </div>

            <h3 id="bookingTitle">Tell us about yourself.</h3>
            <p className="dialog-subtitle">
              This prepares a WhatsApp inquiry. It does not confirm a booking.
            </p>

            <form onSubmit={handleCopy}>
              <label>
                Your name
                <input
                  required
                  id="clientName"
                  autoComplete="name"
                  placeholder="Your full name"
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <div className="form-cols">
                <label>
                  Fitness goal
                  <select
                    id="clientGoal"
                    required
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="Muscle building">Muscle building</option>
                    <option value="Fat loss">Fat loss</option>
                    <option value="Strength training">Strength training</option>
                    <option value="Bodybuilding prep">Bodybuilding prep</option>
                    <option value="Beginner fitness">Beginner fitness</option>
                    <option value="Conditioning">Conditioning</option>
                  </select>
                </label>

                <label>
                  Monthly plan
                  <select
                    id="clientPlan"
                    required
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
                    <option value="Foundation — ₹999/month">Foundation — ₹999/mo</option>
                    <option value="Transformation — ₹1,999/month">Transformation — ₹1,999/mo</option>
                    <option value="Elite Coaching — ₹3,999/month">Elite Coaching — ₹3,999/mo</option>
                  </select>
                </label>
              </div>

              <label>
                Preferred training style
                <div className="form-radio-row">
                  <span>
                    <input
                      type="radio"
                      name="trainingMode"
                      value="In person — Bapatla"
                      checked={trainingMode === "In person — Bapatla"}
                      onChange={() => setTrainingMode("In person — Bapatla")}
                    />{" "}
                    IN PERSON
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="trainingMode"
                      value="Online coaching"
                      checked={trainingMode === "Online coaching"}
                      onChange={() => setTrainingMode("Online coaching")}
                    />{" "}
                    ONLINE
                  </span>
                </div>
              </label>

              <label>
                Preferred schedule
                <input
                  id="clientSchedule"
                  placeholder="e.g. Mon–Fri, evenings (flexible)"
                  maxLength={120}
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </label>

              <div className="dialog-actions">
                <button className="btn btn-dark" type="submit">
                  {copied ? "COPIED ✓" : "COPY INQUIRY MESSAGE ↗"}
                </button>
                <a
                  className={`btn btn-outline-dark ${!isValidPhone ? "disabled-link" : ""}`}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!isValidPhone}
                >
                  OPEN WHATSAPP ↗
                </a>
              </div>

              <p className="form-note" role="status">
                {isValidPhone
                  ? "WhatsApp will open with the drafted message. Final schedule and enrollment are agreed directly with Mansoor."
                  : "WhatsApp number is not connected. Copy the inquiry, or enter a number in Preview Settings."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingWhatsAppButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="mobile-book-cta"
      type="button"
      onClick={onClick}
      aria-label="Start training inquiry"
    >
      <span>START TRAINING</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
