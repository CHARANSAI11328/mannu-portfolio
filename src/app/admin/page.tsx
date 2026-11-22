"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppStoreData } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminOverviewPage() {
  const [data, setData] = useState<AppStoreData>(INITIAL_CMS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFull() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn("Failed to load CMS data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFull();
  }, []);

  const publishedPrograms = data.programs.filter((p) => p.is_published).length;
  const activePlans = data.plans.filter((p) => p.is_active).length;
  const publishedTransformations = data.transformations.filter(
    (t) => t.is_published && t.has_client_consent
  ).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Admin Dashboard Overview
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Welcome, Shaik Mansoor. Monitor content status, manage programs, and track client
          inquiries.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Published Programs</span>
            <span className="text-slate-400">🏋️</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {publishedPrograms} / {data.programs.length}
          </div>
          <Link
            href="/admin/programs"
            className="text-[11px] text-slate-600 hover:text-slate-900 underline mt-2 block"
          >
            Manage Programs →
          </Link>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Active Monthly Plans</span>
            <span className="text-slate-400">💳</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {activePlans} Tiers
          </div>
          <Link
            href="/admin/pricing"
            className="text-[11px] text-slate-600 hover:text-slate-900 underline mt-2 block"
          >
            Adjust Pricing →
          </Link>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>WhatsApp Inquiries</span>
            <span className="text-slate-400">💬</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {data.metrics?.whatsapp_inquiry_clicks || 0}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Aggregate CTA interactions
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Consented Transformations</span>
            <span className="text-slate-400">🔄</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {publishedTransformations}
          </div>
          <Link
            href="/admin/transformations"
            className="text-[11px] text-slate-600 hover:text-slate-900 underline mt-2 block"
          >
            Review Consents →
          </Link>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Quick Management Workflows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/editor"
            className="p-4 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold text-xs text-slate-900">
                Hero Background Video
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Upload new footage of Mansoor, adjust brightness, contrast, and darkness.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-900 mt-4 block">
              Open Hero Editor →
            </span>
          </Link>

          <Link
            href="/admin/pricing"
            className="p-4 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold text-xs text-slate-900">
                Update Monthly Prices
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Modify Foundation (₹999), Transformation (₹1,999) or Elite Coaching (₹3,999).
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-900 mt-4 block">
              Manage Pricing →
            </span>
          </Link>

          <Link
            href="/admin/contact"
            className="p-4 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold text-xs text-slate-900">
                WhatsApp & Studio Details
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Verify phone number, studio location in Bapatla, and hours.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-900 mt-4 block">
              Update Contact →
            </span>
          </Link>
        </div>
      </div>

      {/* Verified Client Data Guardrails Reminder */}
      <div className="bg-slate-100 border border-slate-300 rounded-xl p-5 text-xs text-slate-700 space-y-2">
        <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px] flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Verified Client Fact Guardrails</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>
            <strong>Gym Experience:</strong> 4 years of gym experience. Not automatically 4 years of professional coaching.
          </li>
          <li>
            <strong>Competitive Records:</strong> 1st place in Bapatla Bodybuilding; 2nd place at ANU. Do not fabricate unverified competition years or additional titles.
          </li>
          <li>
            <strong>Training Studio:</strong> 7 Eleven Fitness Studio, Bapatla, Andhra Pradesh.
          </li>
          <li>
            <strong>Scheduling:</strong> Session counts, frequency, and schedules are flexible and agreed directly with Mansoor.
          </li>
        </ul>
      </div>
    </div>
  );
}
