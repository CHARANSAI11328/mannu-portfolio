"use client";

import React, { useState } from "react";

interface PreviewSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  onUpdateWhatsapp: (num: string) => void;
  onUpdateVideo?: (url: string | null) => void;
  onUpdatePoster?: (url: string | null) => void;
}

export function PreviewSettingsModal({
  isOpen,
  onClose,
  whatsappNumber,
  onUpdateWhatsapp,
  onUpdateVideo,
  onUpdatePoster,
}: PreviewSettingsModalProps) {
  const [darkness, setDarkness] = useState(42);

  if (!isOpen) return null;

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      onUpdateVideo?.(url);
    }
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      onUpdatePoster?.(url);
    }
  };

  const handleDarknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDarkness(val);
    document.documentElement.style.setProperty(
      "--hero-darkness",
      (val / 100).toFixed(2)
    );
  };

  const handleReset = () => {
    onUpdateVideo?.(null);
    onUpdatePoster?.(null);
    setDarkness(42);
    document.documentElement.style.setProperty("--hero-darkness", "0.42");
  };

  return (
    <div
      className="sheet-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="previewTitle"
    >
      <div className="preview-dialog">
        <div className="preview-header">
          <div>
            <span className="mono">PROTOTYPE CONTROLS</span>
            <h2 id="previewTitle">Make it yours.</h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close preview settings"
          >
            ×
          </button>
        </div>

        <p>
          Try Mansoor&apos;s own video and a WhatsApp number directly in this browser.
          These are temporary local preview settings, not the production admin portal.
        </p>

        <label>
          Upload hero video (local preview)
          <input
            type="file"
            id="videoUpload"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideoUpload}
          />
        </label>

        <label>
          Upload hero poster image (local preview)
          <input
            type="file"
            id="posterUpload"
            accept="image/*"
            onChange={handlePosterUpload}
          />
        </label>

        <label>
          WhatsApp number with country code
          <input
            type="tel"
            id="whatsappSetting"
            placeholder="e.g. 919676393689"
            value={whatsappNumber}
            onChange={(e) => onUpdateWhatsapp(e.target.value)}
          />
        </label>

        <label>
          Hero darkness ({darkness}%)
          <input
            type="range"
            id="darknessSetting"
            min="15"
            max="80"
            value={darkness}
            onChange={handleDarknessChange}
          />
        </label>

        <div className="preview-actions">
          <button
            type="button"
            id="resetPreview"
            className="btn btn-outline-dark"
            onClick={handleReset}
          >
            RESET VISUAL
          </button>
          <button type="button" className="btn btn-dark" onClick={onClose}>
            DONE ✓
          </button>
        </div>

        <small>
          Footage stays local to your browser session. The production CMS uses
          authenticated uploads and permanent media storage.
        </small>
      </div>
    </div>
  );
}
