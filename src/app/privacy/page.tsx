import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      <header className="h-[86px] border-b border-[#222222] px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase">
          MANSOOR
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
        >
          ← BACK TO HOME
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8 flex-1">
        <div>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-neutral-500 mt-2 font-mono">
            Last Updated: November 2026
          </p>
        </div>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            1. Overview
          </h2>
          <p>
            Shaik Mansoor (&quot;we&quot;, &quot;our&quot;, or &quot;coach&quot;) respects the privacy of every client and website visitor. This policy explains how information is handled when you interact with our website and personal training services.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            2. WhatsApp Inquiries & Data Collection
          </h2>
          <p>
            Our website uses direct WhatsApp communication for coaching inquiries. When you fill out the inquiry form, the information is compiled into a text message and delivered via WhatsApp. We do not store your private inquiry details or personal fitness notes in an external advertising database.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            3. Client Transformation Photos & Consent
          </h2>
          <p>
            Client progress photos, results, or testimonials are displayed on this platform exclusively after explicit, verified written consent from the client. No client images are published without authorization.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            4. Offline Training Privacy
          </h2>
          <p>
            Personal training sessions conducted offline at 7 Eleven Fitness Studio in Bapatla adhere to facility privacy guidelines. Confidential discussions regarding injuries or personal fitness metrics remain between the client and Shaik Mansoor.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            5. Contact
          </h2>
          <p>
            For questions regarding this policy, contact Shaik Mansoor directly at 7 Eleven Fitness Studio, Bapatla, Andhra Pradesh.
          </p>
        </section>
      </main>

      <footer className="h-16 border-t border-[#1c1c1c] px-6 sm:px-12 flex items-center justify-between text-xs text-neutral-600">
        <span>© {new Date().getFullYear()} Shaik Mansoor</span>
        <Link href="/" className="hover:text-white">Home</Link>
      </footer>
    </div>
  );
}
