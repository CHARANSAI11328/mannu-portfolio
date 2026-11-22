"use client";

import React, { useState, useEffect, useRef } from "react";
import { MediaAsset } from "@/types";

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaAsset[]>([]);
  const [filter, setFilter] = useState<"all" | "video" | "image">("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadMedia = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const json = await res.json();
        if (json.assets) {
          setMediaItems(json.assets);
        }
      }
    } catch (err) {
      console.error("Failed to load media assets", err);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);
    const category = file.type.startsWith("video/")
      ? "Hero Video"
      : file.name.toLowerCase().includes("poster")
      ? "Hero Poster"
      : file.name.toLowerCase().includes("achievement")
      ? "Achievement"
      : "Trainer Photography";
    formData.append("category", category);

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error || "Failed to upload file.");
      } else {
        await loadMedia();
      }
    } catch (err: any) {
      setUploadError(err?.message || "Upload network error.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMediaItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete media asset.");
      }
    } catch {
      alert("Error deleting media asset.");
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaItems.filter((item) => {
    if (filter === "video") return item.type.startsWith("video");
    if (filter === "image") return item.type.startsWith("image");
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Media Library</h1>
          <p className="text-xs text-slate-500 mt-1">
            Store and manage cinematic hero videos, posters, trainer photographs, and competition
            certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,video/webm"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <span>{isUploading ? "Uploading..." : "+ Upload New Media Asset"}</span>
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          ⚠️ {uploadError}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Assets ({mediaItems.length})
        </button>
        <button
          onClick={() => setFilter("video")}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === "video" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Videos ({mediaItems.filter((m) => m.type.startsWith("video")).length})
        </button>
        <button
          onClick={() => setFilter("image")}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === "image" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Images ({mediaItems.filter((m) => m.type.startsWith("image")).length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500 text-xs">
          No media assets found in this view. Click "Upload New Media Asset" to add one.
        </div>
      ) : (
        /* Media Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden group">
                {item.type.startsWith("video") ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate max-w-[180px]" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.size}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="truncate max-w-[200px]">{item.url}</span>
                  <span>{item.uploaded_at ? new Date(item.uploaded_at).toLocaleDateString() : ""}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="text-slate-700 hover:text-slate-900 font-semibold text-[11px] flex items-center gap-1"
                  >
                    {copiedId === item.id ? "✓ Copied!" : "📋 Copy URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="text-red-500 hover:text-red-700 font-medium text-[11px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
