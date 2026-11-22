"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenInquiry?: (planName?: string) => void;
  brandName?: string;
}

export function Navbar({ onOpenInquiry, brandName = "SHAIK MANSOOR" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // High-performance RAF throttle for navbar scrolled state
  useEffect(() => {
    let ticking = false;
    let isScrolled = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 35;
        if (nextScrolled !== isScrolled) {
          isScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // High-performance IntersectionObserver for active section (Zero layout thrashing!)
  useEffect(() => {
    const sectionIds = ["home", "about", "programs", "achievements", "pricing"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`} id="siteHeader">
      {/* Brand Wordmark */}
      <a href="#home" className="wordmark" aria-label="Shaik Mansoor, home" onClick={closeMenu}>
        <span>
          {brandName}
          <span className="wordmark-period">.</span>
        </span>
        <span className="wordmark-caption">FITNESS COACHING</span>
      </a>

      {/* Navigation (Desktop & Mobile drawer) */}
      <nav
        className={`main-nav ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Main navigation"
        id="mainNav"
      >
        <a
          href="#about"
          className={activeSection === "about" ? "active" : ""}
          onClick={closeMenu}
        >
          ABOUT
        </a>
        <a
          href="#programs"
          className={activeSection === "programs" ? "active" : ""}
          onClick={closeMenu}
        >
          PROGRAMS
        </a>
        <a
          href="#achievements"
          className={activeSection === "achievements" ? "active" : ""}
          onClick={closeMenu}
        >
          RESULTS
        </a>
        <a
          href="#pricing"
          className={activeSection === "pricing" ? "active" : ""}
          onClick={closeMenu}
        >
          PRICING
        </a>

        {/* CTA Button */}
        <button
          className="btn btn-light nav-cta"
          type="button"
          onClick={() => {
            closeMenu();
            onOpenInquiry?.();
          }}
        >
          GET IN TOUCH <span aria-hidden="true">↗</span>
        </button>
      </nav>

      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        className="menu-toggle"
        id="menuToggle"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="mainNav"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
