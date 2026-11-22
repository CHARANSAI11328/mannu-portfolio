"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If user is on /admin/login, don't show the dashboard sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-100 text-slate-900">{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    window.location.href = "/admin/login";
  };

  const handlePublishAll = async () => {
    setIsPublishing(true);
    setPublishSuccess(false);
    try {
      const res = await fetch("/api/cms/publish", { method: "POST" });
      if (res.ok) {
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 4000);
      }
    } catch (err) {
      alert("Failed to publish changes.");
    } finally {
      setIsPublishing(false);
    }
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: "📊" },
    { label: "Website Editor & Hero", href: "/admin/editor", icon: "🎬" },
    { label: "Trainer Profile", href: "/admin/profile", icon: "👤" },
    { label: "Training Programs", href: "/admin/programs", icon: "🏋️" },
    { label: "Monthly Plans", href: "/admin/pricing", icon: "💳" },
    { label: "Achievements", href: "/admin/achievements", icon: "🏆" },
    { label: "Transformations", href: "/admin/transformations", icon: "🔄" },
    { label: "Contact & Studio", href: "/admin/contact", icon: "📍" },
    { label: "FAQs Manager", href: "/admin/faqs", icon: "❓" },
    { label: "Media Library", href: "/admin/media", icon: "🖼️" },
    { label: "Appearance", href: "/admin/appearance", icon: "🎨" },
    { label: "SEO & Meta", href: "/admin/seo", icon: "🔍" },
    { label: "Security & Account", href: "/admin/security", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm tracking-wider uppercase">
            MANSOOR CMS
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 text-slate-600 hover:text-slate-900 border rounded"
        >
          ☰
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileNavOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between`}
      >
        <div>
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <Link href="/admin" className="font-black text-slate-900 text-base tracking-widest uppercase">
                MANSOOR
              </Link>
              <div className="text-[11px] text-slate-500 font-mono">CONTROL PORTAL</div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded transition-colors"
            >
              LIVE SITE ↗
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Trainer: Shaik Mansoor</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-center py-1.5 text-xs text-red-600 hover:text-red-700 font-medium border border-red-200 rounded-md bg-white hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Operational Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-slate-500">
              STATUS:
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>

          <div className="flex items-center gap-4">
            {publishSuccess && (
              <span className="text-xs text-emerald-600 font-semibold animate-in fade-in">
                ✓ Published to Live Website!
              </span>
            )}
            <button
              onClick={handlePublishAll}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors active:scale-95"
            >
              {isPublishing ? "Publishing..." : "Publish Live Changes"}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
