"use client";

import React, { useState, useEffect } from "react";
import { AppStoreData, ContentRevision } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";

export default function AdminSecurityPage() {
  const [data, setData] = useState<AppStoreData>(INITIAL_CMS_DATA);
  const [isRollingBack, setIsRollingBack] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cms/full");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn("Using default store data", err);
      }
    }
    load();
  }, []);

  const handleRollback = async (revId: string) => {
    if (!confirm("Are you sure you want to restore this prior snapshot?")) return;
    setIsRollingBack(true);

    try {
      const res = await fetch("/api/cms/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revision_id: revId }),
      });

      if (res.ok) {
        alert("Snapshot restored successfully!");
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.error || "Rollback failed.");
      }
    } catch {
      alert("Failed to rollback.");
    } finally {
      setIsRollingBack(false);
    }
  };

  const revisions: ContentRevision[] = data.revisions || [];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Security, Access & Content Version History
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review authenticated administrator provisioning, Row Level Security (RLS) enforcement,
          and rollback prior published snapshots.
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Provisioned Administrator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-slate-400 block font-mono text-[10px] uppercase">
              Full Name
            </span>
            <span className="font-semibold text-slate-900">Shaik Mansoor</span>
          </div>
          <div>
            <span className="text-slate-400 block font-mono text-[10px] uppercase">
              Assigned Role
            </span>
            <span className="font-semibold text-emerald-700">Super Administrator</span>
          </div>
          <div>
            <span className="text-slate-400 block font-mono text-[10px] uppercase">
              Database Row Level Security
            </span>
            <span className="font-semibold text-slate-900">Enabled on all 11 tables</span>
          </div>
        </div>
      </div>

      {/* Content Version History & Rollback */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Content Revision History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Snapshots created whenever &quot;Publish Live Changes&quot; is executed.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {revisions.length} Snapshots Saved
          </span>
        </div>

        {revisions.length === 0 ? (
          <div className="text-xs text-slate-400 py-4">No revisions recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {revisions.map((rev) => (
              <div
                key={rev.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900">{rev.summary}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    ID: {rev.id} • Author: {rev.author} •{" "}
                    {new Date(rev.timestamp).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => handleRollback(rev.id)}
                  disabled={isRollingBack}
                  className="self-start sm:self-auto px-3 py-1 text-[11px] font-semibold border border-slate-300 rounded hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  Restore Snapshot
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
