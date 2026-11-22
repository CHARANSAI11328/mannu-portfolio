"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onOpenInquiry?: () => void;
  brandName?: string;
}

export function Navbar({ onOpenInquiry, brandName = "MANSOOR" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "RESULTS", href: "#results" },
    { label: "PRICING", href: "#pricing" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#000000] border-b border-[#222222] transition-colors"
      style={{ minHeight: "86px" }}
    >
      <div
        className="max-w-[1440px] mx-auto h-[86px] px-6 sm:px-10 lg:px-16 flex items-center justify-between"
        style={{ height: "86px" }}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="text-white text-[22px] sm:text-[24px] font-bold tracking-[0.18em] uppercase hover:opacity-90 transition-opacity select-none focus:outline-none focus:ring-1 focus:ring-white"
        >
          {brandName}
        </Link>

        {/* Right Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#E0E0E0] hover:text-white text-[13px] font-medium tracking-[0.12em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* White Pill CTA button */}
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center justify-center bg-white text-black hover:bg-[#E5E5E5] text-[13px] font-semibold tracking-[0.08em] uppercase px-7 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
          >
            GET IN TOUCH
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenInquiry}
            className="bg-white text-black text-[11px] font-semibold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full"
          >
            INQUIRE
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-neutral-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#222222] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#CCCCCC] hover:text-white text-sm font-medium tracking-[0.14em] uppercase py-2 border-b border-[#1c1c1c]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry();
              }}
              className="w-full bg-white text-black font-semibold text-xs tracking-[0.1em] uppercase py-3 rounded-full text-center"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
