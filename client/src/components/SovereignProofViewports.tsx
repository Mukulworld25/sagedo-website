import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

interface ProofItem {
  id: string;
  actLink: string;
  category: string;
  categoryColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  impactTag: string;
  description: string;
  image: string;
}

const PROOF_VIEWPORTS: ProofItem[] = [
  {
    id: "clinic-portal",
    actLink: "PROVES LAYER 01 // SPEED-TO-LEAD",
    category: "HEALTHCARE & CLINICS",
    categoryColor: "text-emerald-400",
    badge: "● 0.8s MOBILE LOAD",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-black/80",
    title: "Dental & Specialty Clinic Patient Booking Portal",
    impactTag: "+180% Bookings",
    description: "Opens in 0.8s on mobile 4G. Calendar booking wired directly to automated WhatsApp appointment confirmations. Front desk phone calls dropped by 65%.",
    image: "/sample_dental_desktop.png"
  },
  {
    id: "zero-seat-crm",
    actLink: "PROVES LAYER 02 // DETERMINISTIC RULES",
    category: "SALES & B2B OPERATIONS",
    categoryColor: "text-amber-400",
    badge: "● ZERO SEAT TAX",
    badgeColor: "text-amber-400 border-amber-500/30 bg-black/80",
    title: "Zero-Seat Sales CRM & Automated Pipeline",
    impactTag: "₹3.6L/yr Saved in Rent",
    description: "Eliminated recurring per-user fees to foreign SaaS platforms. WhatsApp and web leads flow directly into an unlimited-seat Kanban dashboard with strict margin verification.",
    image: "/sample-crm-lead-automation.png"
  },
  {
    id: "industrial-rfq",
    actLink: "PROVES LAYER 03 // TALLY BRIDGE",
    category: "MANUFACTURING & INDUSTRIAL B2B",
    categoryColor: "text-sky-400",
    badge: "● 90s RFQ DISPATCH",
    badgeColor: "text-sky-400 border-sky-500/30 bg-black/80",
    title: "Industrial Manufacturing RFQ & Tally Bridge",
    impactTag: "₹1.4Cr Deals Processed",
    description: "Automated RFQ intake for industrial exporters and precision factories. Instant CAD spec downloads, automated price estimations, and Tally-ready order manifests.",
    image: "/sample_rfq_quoter.jpg"
  }
];

export default function SovereignProofViewports() {
  return (
    <section id="proof-viewports" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#070A10] border-b border-white/[0.08] relative overflow-hidden text-white font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em] mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>03 / 06 · Physical Proof</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Real systems. Real Indian businesses.
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-400 mt-2 max-w-xl leading-relaxed font-light">
              Each build physically proves one layer of the Sovereign Engine. No conceptual mockups.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/wall-of-fame">
              <span className="inline-flex items-center gap-2 h-12 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/10 transition-all shadow-md group cursor-pointer">
                <span>View Full Wall of Fame →</span>
              </span>
            </Link>
          </div>
        </div>

        {/* 3 Definitive Titanium Proof Viewports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROOF_VIEWPORTS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1"
            >
              {/* Header Bar */}
              <div className="p-4 bg-black/40 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400 font-semibold">{item.actLink}</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>

              {/* Hardware Screen Frame */}
              <div className="relative h-60 overflow-hidden bg-black/80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />
                
                {/* Telemetry Badge */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold backdrop-blur-md shadow-lg ${item.badgeColor}`}>
                  {item.badge}
                </div>

                {/* Impact Metric */}
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-400 font-bold">
                  {item.impactTag}
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 space-y-2">
                <span className={`text-[11px] font-mono font-bold tracking-wider ${item.categoryColor}`}>
                  {item.category}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <Link href="/wall-of-fame#gallery">
                    <span className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 cursor-pointer">
                      <span>Inspect Deliverable</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <span className="text-[11px] font-mono text-neutral-500">Live Client Build</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
