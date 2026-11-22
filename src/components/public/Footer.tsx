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

  return (
    <footer className="site-footer">
      <div className="proto-container">
        {/* Footer Top */}
        <div className="footer-top">
          <a href="#home" className="footer-logo">
            {brandName}
            <span>.</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href={`tel:${contact?.phone_number?.replace(/\s+/g, "") || "+919676393689"}`}
              className="mono text-xs text-[#919b8e] hover:text-[#d7f16a] transition-colors"
              title="Call Shaik Mansoor"
            >
              📞 {contact?.phone_number || "+91 96763 93689"}
            </a>
            <span className="mono text-[#919b8e] hidden sm:inline">·</span>
            <span className="mono">PERSONAL FITNESS COACHING · BAPATLA, INDIA</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="flex items-center gap-2">
            <span>
              © {currentYear} SHAIK MANSOOR. {tagline}
            </span>
            {/* Subtle discreet lock icon linking to admin portal */}
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity p-1 text-[11px] text-[#919b8e] hover:text-[#d7f16a]"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              🔒
            </Link>
          </div>

          <div>
            <a href="#about">ABOUT</a>
            <a href="#programs">PROGRAMS</a>
            <a href="#pricing">PRICING</a>
            <button
              type="button"
              id="openPreviewSettings"
              onClick={() => onOpenPreviewSettings?.()}
            >
              PREVIEW SETTINGS ⚙
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
