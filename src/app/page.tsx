"use client";

import React, { useState, useEffect } from "react";
import { AppStoreData } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { KineticTicker } from "@/components/public/KineticTicker";
import { AboutSection } from "@/components/public/AboutSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { PhilosophyBreak } from "@/components/public/PhilosophyBreak";
import { ResultsSection } from "@/components/public/ResultsSection";
import { ProcessSection } from "@/components/public/ProcessSection";
import { PricingSection } from "@/components/public/PricingSection";
import { FaqSection } from "@/components/public/FaqSection";
import { ContactSection } from "@/components/public/ContactSection";
import { Footer } from "@/components/public/Footer";
import { WhatsAppModal, FloatingWhatsAppButton } from "@/components/public/WhatsAppModal";
import { PreviewSettingsModal } from "@/components/public/PreviewSettingsModal";

export default function HomePage() {
  const [data, setData] = useState<AppStoreData>(INITIAL_CMS_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultPlan, setModalDefaultPlan] = useState<string | undefined>(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(
    INITIAL_CMS_DATA.contact?.whatsapp_number || "919876543210"
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (y / max) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch published CMS content
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms/published");
        if (res.ok) {
          const json = await res.json();
          if (json && json.hero) {
            setData(json);
            if (json.contact?.whatsapp_number) {
              setWhatsappNumber(json.contact.whatsapp_number);
            }
          }
        }
      } catch (err) {
        console.warn("Using bundled initial data", err);
      }
    }
    loadData();
  }, []);

  const openInquiryModal = (planName?: string) => {
    setModalDefaultPlan(planName);
    setModalOpen(true);
  };

  const isSectionEnabled = (id: string) => {
    const sec = data.sections?.find((s) => s.id === id);
    return sec ? sec.is_enabled : true;
  };

  return (
    <div className="min-h-screen bg-[#080909] text-[#f6f6f0] flex flex-col selection:bg-[#d7f16a] selection:text-black">
      {/* 1. Scroll-driven progress bar */}
      <div
        id="scrollProgress"
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 2. Ambient Film Noise Filter */}
      <div className="noise" aria-hidden="true" />

      {/* 3. Site Navigation Header */}
      <Navbar
        brandName="SHAIK MANSOOR"
        onOpenInquiry={() => openInquiryModal()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 4. Hero Section */}
        {isSectionEnabled("hero") && (
          <HeroSection
            data={data.hero}
            onOpenInquiry={openInquiryModal}
            onOpenPreviewSettings={() => setPreviewOpen(true)}
          />
        )}

        {/* 5. Animated Kinetic Ticker */}
        <KineticTicker />

        {/* 6. About Athlete Section (Cream Section) */}
        {isSectionEnabled("about") && (
          <AboutSection
            data={data.about}
            onOpenInquiry={() => openInquiryModal()}
          />
        )}

        {/* 7. Programs Interactive Workbench (Dark Section) */}
        {isSectionEnabled("services") && (
          <ServicesSection
            programs={data.programs}
            onSelectProgram={(title) => openInquiryModal(`${title} Program`)}
          />
        )}

        {/* 8. Philosophy Quote Break */}
        <PhilosophyBreak />

        {/* 9. Results & Achievements Section (Cream Section) */}
        {isSectionEnabled("results") && (
          <ResultsSection
            achievements={data.achievements}
            transformations={data.transformations}
            onOpenInquiry={() => openInquiryModal()}
          />
        )}

        {/* 10. Process / The Approach Section (Dark Section) */}
        {isSectionEnabled("process") && (
          <ProcessSection onOpenInquiry={() => openInquiryModal()} />
        )}

        {/* 11. Monthly Pricing Plans (Dark Section) */}
        {isSectionEnabled("pricing") && (
          <PricingSection
            plans={data.plans}
            onSelectPlan={(name, price) =>
              openInquiryModal(`${name} (₹${price}/mo)`)
            }
          />
        )}

        {/* 12. FAQ Section (Cream Section) */}
        {isSectionEnabled("faqs") && <FaqSection faqs={data.faqs} />}

        {/* 13. Closing Call to Action (Dark Section) */}
        {isSectionEnabled("contact") && (
          <ContactSection
            contact={data.contact}
            onOpenInquiry={() => openInquiryModal()}
          />
        )}
      </main>

      {/* 14. Footer */}
      <Footer
        contact={data.contact}
        brandName="MANSOOR"
        tagline="BUILT BY DISCIPLINE."
        onOpenPreviewSettings={() => setPreviewOpen(true)}
      />

      {/* 15. Mobile Sticky Bottom CTA */}
      <FloatingWhatsAppButton onClick={() => openInquiryModal()} />

      {/* 16. WhatsApp Inquiry Sheet Dialog */}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappNumber={whatsappNumber}
        defaultPlan={modalDefaultPlan}
      />

      {/* 17. Live Prototype Preview Settings Modal */}
      <PreviewSettingsModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        whatsappNumber={whatsappNumber}
        onUpdateWhatsapp={setWhatsappNumber}
        onUpdateVideo={(url) => {
          if (url) {
            setData((prev) => ({
              ...prev,
              hero: { ...prev.hero, video_url: url },
            }));
          }
        }}
        onUpdatePoster={(url) => {
          if (url) {
            setData((prev) => ({
              ...prev,
              hero: { ...prev.hero, poster_url: url },
            }));
          }
        }}
      />
    </div>
  );
}
