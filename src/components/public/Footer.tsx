"use client";

import React from "react";
import Link from "next/link";
import { ContactInfo } from "@/types";

interface FooterProps {
  contact?: ContactInfo;
  brandName?: string;
  tagline?: string;
  onOpenPreviewSettings?: () => void;
}

export function Footer({
  contact,
  brandName = "MANSOOR",
  tagline = "BUILT BY DISCIPLINE.",
  onOpenPreviewSettings,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone = contact?.phone_number || "+91 96763 93689";

  return (
    <footer className="border-t border-white/10 pt-16 pb-12 relative overflow-hidden" style={{ backgroundColor: "#060608" }}>
      <div className="proto-container">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight text-white">
                {brandName}<span className="text-[#FF9F00]">.</span>
              </span>
              <span className="block mono text-[10px] text-slate-400 tracking-widest uppercase">
                PERSONAL TRAINING
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              Personal training built around <strong>real work</strong>, clear direction, and a stronger version of you.
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <div className="mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              QUICK LINKS
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-[#FF9F00] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#FF9F00] transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-[#FF9F00] transition-colors">
                  Results
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#FF9F00] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FF9F00] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Location (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-1.5 mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              <span className="text-[#FF9F00]">📍</span>
              <span>BAPATLA, INDIA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              In-Person Coaching & Assessment<br />
              (By Appointment)
            </p>
            <p className="text-xs text-slate-400">
              7 Eleven Fitness Studio, Bapatla, Andhra Pradesh
            </p>
          </div>

          {/* Get In Touch & Socials (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              GET IN TOUCH
            </div>
            <ul className="space-y-2 text-xs text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@mansoorfit.com" className="hover:text-[#FF9F00] transition-colors">
                  hello@mansoorfit.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-[#FF9F00] transition-colors font-mono">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📅</span>
                <a href="#contact" className="hover:text-[#FF9F00] transition-colors">
                  Book a Free Consultation
                </a>
              </li>
            </ul>

            <div className="mono text-xs font-bold text-white uppercase tracking-wider mb-3">
              FOLLOW
            </div>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <a href="https://instagram.com/mansoor_fitness" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9F00] transition-colors">
                📷 Instagram
              </a>
              <span className="text-white/20">·</span>
              <button
                type="button"
                onClick={() => onOpenPreviewSettings?.()}
                className="text-slate-400 hover:text-[#FF9F00] text-xs mono transition-colors"
              >
                ⚙ Controls
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {currentYear} MANSOOR PERSONAL TRAINING. ALL RIGHTS RESERVED.</span>
            {/* Discreet admin portal lock */}
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity p-1 text-[11px] text-slate-400 hover:text-[#FF9F00]"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              🔒
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span>BAPATLA, INDIA</span>
            <span className="text-white/20">/</span>
            <span>ONLINE & IN-PERSON COACHING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
