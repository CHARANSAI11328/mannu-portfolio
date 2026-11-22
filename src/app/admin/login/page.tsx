"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!email.trim() || !password.trim()) {
        setError("Please enter both email and password.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Authentication failed. Please check your credentials.");
        return;
      }

      // Successful server authentication transition to admin portal
      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-2xl p-8 shadow-sm text-slate-900 space-y-6">
        <div className="text-center space-y-1">
          <Link
            href="/"
            className="font-black text-xl tracking-widest uppercase text-slate-900 block"
          >
            MANSOOR
          </Link>
          <span className="text-xs text-slate-500 font-mono block">
            ADMIN CONTROL PORTAL
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              ADMIN EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mansoor@fitness.com"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase py-3 rounded-lg transition-colors mt-2"
          >
            {isLoading ? "Signing in..." : "SIGN IN TO CMS"}
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center">
          <Link
            href="/"
            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
