"use client";

import React from "react";
import { ContactSettings } from "@/types";

interface ContactSectionProps {
  contact: ContactSettings;
  onOpenInquiry: () => void;
}

export function ContactSection({ contact, onOpenInquiry }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="w-full bg-[#080808] border-t border-[#222222] py-20 lg:py-28 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline and WhatsApp Action */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#888888] text-[12px] font-mono tracking-[0.2em] uppercase block">
              LOCATION & DIRECT INQUIRY
            </span>
            <h2 className="text-[36px] sm:text-[46px] lg:text-[54px] font-bold tracking-tight uppercase leading-[1.08]">
              READY TO COMMIT TO YOUR DISCIPLINE?
            </h2>
            <p className="text-[#B5B5B5] text-[17px] sm:text-[19px] max-w-xl leading-relaxed">
              Inquire directly on WhatsApp to check coaching slot availability, discuss your
              timeline, and choose the plan that aligns with your physique goals.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-200 shadow-md active:scale-95"
              >
                OPEN WHATSAPP INQUIRY
              </button>

              {contact.google_maps_url && (
                <a
                  href={contact.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-transparent text-white hover:bg-white/10 text-xs font-semibold tracking-wider uppercase px-6 py-4 rounded-full border border-[#353535] hover:border-white transition-colors"
                >
                  GOOGLE MAPS DIRECTIONS
                </a>
              )}
            </div>

            <p className="text-xs text-[#737373] pt-2">
              • Submitting generates an instant pre-formatted WhatsApp chat with Mansoor.
            </p>
          </div>

          {/* Right Column: Physical Location & Studio Details */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[#888888] text-[11px] font-mono tracking-[0.18em] uppercase block mb-2">
                OFFLINE COACHING STUDIO
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                {contact.gym_name || "7 Eleven Fitness Studio"}
              </h3>
              <p className="text-xs text-[#CCCCCC] mt-2 leading-relaxed">
                {contact.gym_address ||
                  "7 Eleven Fitness Studio, Bapatla, Andhra Pradesh, India"}
              </p>
            </div>

            <div className="border-t border-[#222222] pt-5 space-y-4 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-[#737373] uppercase font-mono">Availability</span>
                <span className="text-white text-right font-medium max-w-[220px]">
                  {contact.availability_notes || "Monday to Saturday | Morning & Evening Slots"}
                </span>
              </div>

              {contact.whatsapp_number && (
                <div className="flex justify-between items-center">
                  <span className="text-[#737373] uppercase font-mono">WhatsApp</span>
                  <span className="text-white font-mono">{contact.whatsapp_number}</span>
                </div>
              )}

              {contact.phone_number && (
                <div className="flex justify-between items-center">
                  <span className="text-[#737373] uppercase font-mono">Phone</span>
                  <span className="text-white font-mono">{contact.phone_number}</span>
                </div>
              )}

              {contact.email && (
                <div className="flex justify-between items-center">
                  <span className="text-[#737373] uppercase font-mono">Email</span>
                  <span className="text-white">{contact.email}</span>
                </div>
              )}

              {contact.instagram_handle && (
                <div className="flex justify-between items-center">
                  <span className="text-[#737373] uppercase font-mono">Instagram</span>
                  <span className="text-white">@{contact.instagram_handle}</span>
                </div>
              )}
            </div>

            <div className="border-t border-[#222222] pt-4 text-[11px] text-[#666666] leading-tight">
              Shaik Mansoor personally manages inquiries and onboarding. Offline training sessions
              require adherence to studio conduct rules.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
