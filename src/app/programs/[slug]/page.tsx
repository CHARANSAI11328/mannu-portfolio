import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedCmsData } from "@/lib/cms/store";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const cms = getPublishedCmsData();
  const program = cms.programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      <header className="h-[86px] border-b border-[#222222] px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase">
          MANSOOR
        </Link>
        <Link
          href="/#services"
          className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
        >
          ← ALL PROGRAMS
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 flex-1">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              {program.category}
            </span>
            <span className="text-neutral-600">•</span>
            <div className="flex gap-2">
              {program.training_modes.map((m) => (
                <span
                  key={m}
                  className="text-[10px] uppercase font-mono tracking-wider border border-[#333333] px-2 py-0.5 rounded text-neutral-400"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight">
            {program.title}
          </h1>

          <p className="text-lg text-[#B5B5B5] mt-4 max-w-2xl leading-relaxed">
            {program.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#222222]">
          <div className="space-y-4 bg-[#0d0d0d] border border-[#222222] rounded-xl p-6">
            <h2 className="text-xs font-mono tracking-widest uppercase text-white">
              CORE PROGRAM GOALS
            </h2>
            <ul className="space-y-2.5">
              {program.goals.map((g, i) => (
                <li key={i} className="text-xs text-[#CCCCCC] flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 bg-[#0d0d0d] border border-[#222222] rounded-xl p-6">
            <h2 className="text-xs font-mono tracking-widest uppercase text-white">
              KEY BENEFITS
            </h2>
            <ul className="space-y-2.5">
              {program.benefits.map((b, i) => (
                <li key={i} className="text-xs text-[#CCCCCC] flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0"></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              READY TO TRAIN WITH MANSOOR?
            </h3>
            <p className="text-xs text-[#888888] mt-1 max-w-md">
              Target Audience: {program.target_audience}. Offline sessions at 7 Eleven Fitness
              Studio, Bapatla or online remote coaching.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full transition-colors shrink-0"
          >
            INQUIRE ON WHATSAPP
          </Link>
        </div>
      </main>

      <footer className="h-16 border-t border-[#1c1c1c] px-6 sm:px-12 flex items-center justify-between text-xs text-neutral-600">
        <span>© {new Date().getFullYear()} Shaik Mansoor</span>
        <Link href="/" className="hover:text-white">Home</Link>
      </footer>
    </div>
  );
}
