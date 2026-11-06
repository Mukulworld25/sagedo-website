import React, { useState, useEffect } from "react";
import SovereignHero from "@/components/SovereignHero";
import SovereignEngineShowcase from "@/components/SovereignEngineShowcase";
import SovereignProofViewports from "@/components/SovereignProofViewports";
import PhoneSpeedAuditSection from "@/components/PhoneSpeedAuditSection";
import StudioReleaseCertificate from "@/components/StudioReleaseCertificate";
import SovereignPricingSection from "@/components/SovereignPricingSection";
import EliteTestimonialsSection from "@/components/EliteTestimonialsSection";

export default function Home() {
  const [approvedTestimonials, setApprovedTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials/approved')
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          return res.json();
        }
        return [];
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setApprovedTestimonials(data);
        }
      })
      .catch(() => {
        // Fallback gracefully without console error
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 01: THE HERO HOOK & INTEGRATED PERSONA CALIBRATION
      ═══════════════════════════════════════════════════════════════════ */}
      <SovereignHero />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 02: THE SOVEREIGN ENGINE CONSOLE (3D POINTER-TILT MACHINE)
      ═══════════════════════════════════════════════════════════════════ */}
      <SovereignEngineShowcase />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 03: THE 3 DEFINITIVE PROOF VIEWPORTS (TITANIUM VIEWPORTS)
      ═══════════════════════════════════════════════════════════════════ */}
      <SovereignProofViewports />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 04: THE 60-SECOND SPEED AUDIT (SOFT DIAGNOSTIC CTA)
      ═══════════════════════════════════════════════════════════════════ */}
      <PhoneSpeedAuditSection />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 05: STUDIO CHAIN OF CUSTODY & SIGNED RELEASE CERTIFICATE
      ═══════════════════════════════════════════════════════════════════ */}
      <StudioReleaseCertificate />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 06: TRANSPARENT COMMERCIAL PRICING & COMMERCIAL DESK
      ═══════════════════════════════════════════════════════════════════ */}
      <SovereignPricingSection />

      {/* ═══════════════════════════════════════════════════════════════════
          VERIFIED SOCIAL PROOF
      ═══════════════════════════════════════════════════════════════════ */}
      <EliteTestimonialsSection approvedTestimonials={approvedTestimonials} />

    </div>
  );
}
