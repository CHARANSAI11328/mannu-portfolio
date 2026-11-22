import React from "react";
import Link from "next/link";

export default function TermsPage() {
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
            TERMS OF SERVICE
          </h1>
          <p className="text-xs text-neutral-500 mt-2 font-mono">
            Last Updated: November 2026
          </p>
        </div>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            1. Nature of Coaching Services
          </h2>
          <p>
            Shaik Mansoor provides online and offline personal fitness instruction, exercise mechanics coaching, and progressive resistance guidance. Personal training does not constitute medical diagnosis, physical therapy, or healthcare treatment.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            2. Flexible Schedules & Session Agreements
          </h2>
          <p>
            Monthly training plans cover direct instruction and programming as outlined. Session counts, weekly frequency, and specific training hours are not rigidly fixed on the website; they are flexible and mutually agreed directly between the client and Shaik Mansoor before enrollment. Coaching plans do not imply unlimited training hours.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            3. Gym Membership Fees
          </h2>
          <p>
            For offline training conducted at 7 Eleven Fitness Studio in Bapatla, facility access or standard gym membership fees are independent and managed directly with the gym administration.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            4. Physical Readiness & Assumption of Risk
          </h2>
          <p>
            Engaging in weight training, bodybuilding preparation, and intense exercise involves inherent physical exertion. Clients confirm they are physically capable of resistance training and assume responsibility for disclosing pre-existing injuries or health limitations.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#CCCCCC] leading-relaxed">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            5. Governing Location
          </h2>
          <p>
            These terms are governed by the laws applicable in Bapatla, Andhra Pradesh, India.
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
