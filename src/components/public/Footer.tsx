"use client";

import React from "react";
import Link from "next/link";
import { ContactSettings } from "@/types";

interface FooterProps {
  contact?: ContactSettings;
  brandName?: string;
  tagline?: string;
}

export function Footer({
  contact,
  brandName = "MANSOOR",
  tagline = "BUILT BY DISCIPLINE.",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-[#1c1c1c] text-[#888888] text-xs py-14">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-white text-xl font-bold tracking-[0.16em] uppercase block">
              {brandName}
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#737373] uppercase mt-1 block">
              {tagline}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#AAAAAA] uppercase tracking-wider text-[11px]">
            <a href="#hero" className="hover:text-white transition-colors">
              HOME
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              ABOUT
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              SERVICES
            </a>
            <a href="#results" className="hover:text-white transition-colors">
              RESULTS
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              PRICING
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              CONTACT
            </a>
            <Link href="/admin/login" className="hover:text-white text-[#666666] transition-colors">
              ADMIN CMS
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#666666]">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Shaik Mansoor. All rights reserved.</span>
            <span>•</span>
            <span>7 Eleven Fitness Studio, Bapatla, AP</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
