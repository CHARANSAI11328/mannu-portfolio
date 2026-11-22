"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!password.trim()) {
        setError("Please enter the password.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Incorrect password. Access denied.");
        return;
      }

      // Successful server authentication
      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080909] text-[#f6f6f0] flex flex-col items-center justify-center p-6 selection:bg-[#d7f16a] selection:text-black">
      <div className="w-full max-w-md bg-[#101211] border border-[#252825] p-8 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle top lime glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#d7f16a]" />

        {/* Brand & Heading */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-wider uppercase text-white hover:text-[#d7f16a] transition-colors block"
          >
            MANSOOR<span className="text-[#d7f16a]">.</span>
          </Link>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#8b9089] uppercase block mt-2">
            ADMIN PORTAL ACCESS
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200 text-center font-mono">
            {error}
          </div>
        )}

        {/* Single Password Field Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-[#aeb5aa] uppercase mb-2">
              ACCESS PASSWORD
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#171a18] border border-[#3b433a] focus:border-[#d7f16a] text-white rounded-lg px-4 py-3.5 text-sm tracking-wider outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d7f16a] hover:bg-white text-black font-extrabold text-xs tracking-wider uppercase py-4 rounded-full transition-all duration-200 active:scale-98 cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? "AUTHENTICATING..." : "ENTER ADMIN PORTAL ↗"}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center border-t border-[#252825] pt-6">
          <Link
            href="/"
            className="text-xs font-mono text-[#7a8276] hover:text-[#d7f16a] transition-colors"
          >
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
