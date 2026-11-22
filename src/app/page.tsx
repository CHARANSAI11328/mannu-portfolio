"use client";

import React, { useState, useEffect } from "react";
import { AppStoreData } from "@/types";
import { INITIAL_CMS_DATA } from "@/lib/cms/initial-data";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { ResultsSection } from "@/components/public/ResultsSection";
import { PricingSection } from "@/components/public/PricingSection";
import { ProcessSection } from "@/components/public/ProcessSection";
import { ContactSection } from "@/components/public/ContactSection";
import { FaqSection } from "@/components/public/FaqSection";
import { Footer } from "@/components/public/Footer";
import { WhatsAppModal, FloatingWhatsAppButton } from "@/components/public/WhatsAppModal";

export default function HomePage() {
  const [data, setData] = useState<AppStoreData>(INITIAL_CMS_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultPlan, setModalDefaultPlan] = useState<string | undefined>(undefined);

  // Fetch published CMS content
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms/published");
        if (res.ok) {
          const json = await res.json();
          if (json && json.hero) {
            setData(json);
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

  // Section visibility helpers
  const isSectionEnabled = (id: string) => {
    const sec = data.sections.find((s) => s.id === id);
    return sec ? sec.is_enabled : true;
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-white selection:text-black">
      {/* 1. Authoritative Top Navbar */}
      <Navbar
        brandName={data.appearance?.brand_name || "MANSOOR"}
        onOpenInquiry={() => openInquiryModal()}
      />

      {/* 2. Hero Section */}
      {isSectionEnabled("hero") && (
        <HeroSection data={data.hero} onOpenInquiry={openInquiryModal} />
      )}

      {/* 3. About Section */}
      {isSectionEnabled("about") && (
        <AboutSection data={data.about} onOpenInquiry={() => openInquiryModal()} />
      )}

      {/* 4. Services / Training Programs */}
      {isSectionEnabled("services") && (
        <ServicesSection
          programs={data.programs}
          onSelectProgram={(title) => openInquiryModal(`${title} Program`)}
        />
      )}

      {/* 5. Results & Achievements */}
      {isSectionEnabled("results") && (
        <ResultsSection
          achievements={data.achievements}
          transformations={data.transformations}
          onOpenInquiry={() => openInquiryModal()}
        />
      )}

      {/* 6. Monthly Pricing Plans */}
      {isSectionEnabled("pricing") && (
        <PricingSection
          plans={data.plans}
          onSelectPlan={(name, price) => openInquiryModal(`${name} (₹${price}/mo)`)}
        />
      )}

      {/* 7. How Training Works */}
      {isSectionEnabled("process") && (
        <ProcessSection onOpenInquiry={() => openInquiryModal()} />
      )}

      {/* 8. Location & WhatsApp Contact */}
      {isSectionEnabled("contact") && (
        <ContactSection contact={data.contact} onOpenInquiry={() => openInquiryModal()} />
      )}

      {/* 9. FAQs */}
      {isSectionEnabled("faqs") && <FaqSection faqs={data.faqs} />}

      {/* 10. Footer */}
      <Footer
        contact={data.contact}
        brandName={data.appearance?.brand_name || "MANSOOR"}
        tagline={data.appearance?.brand_tagline || "BUILT BY DISCIPLINE."}
      />

      {/* WhatsApp Inquiry Modal */}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappNumber={data.contact?.whatsapp_number}
        defaultPlan={modalDefaultPlan}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton onClick={() => openInquiryModal()} />
    </div>
  );
}
