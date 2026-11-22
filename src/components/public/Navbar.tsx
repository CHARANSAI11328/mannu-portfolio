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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "programs", "achievements", "pricing"];
    const handleIntersection = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleIntersection, { passive: true });
    handleIntersection();
    return () => window.removeEventListener("scroll", handleIntersection);
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

      {/* Desktop Navigation */}
      <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`} aria-label="Main navigation" id="mainNav">
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
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
