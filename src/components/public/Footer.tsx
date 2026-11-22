"use client";

import React from "react";
import { ContactInfo } from "@/types";

interface FooterProps {
  contact?: ContactInfo;
  brandName?: string;
  tagline?: string;
  onOpenPreviewSettings?: () => void;
}

export function Footer({
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
          <span className="mono">PERSONAL FITNESS COACHING · BAPATLA, INDIA</span>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>
            © {currentYear} SHAIK MANSOOR. {tagline}
          </span>
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
