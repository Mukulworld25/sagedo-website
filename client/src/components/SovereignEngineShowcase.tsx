import React, { useState, useRef, useEffect } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  MessageSquareCode, 
  Lock, 
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { canRunRich } from "@/lib/capability";

export default function SovereignEngineShowcase() {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);
  const [isRich, setIsRich] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Activate pointer tilt only on capable hardware (desktop, mouse, no reduced motion)
  useEffect(() => {
    if (canRunRich()) {
      setIsRich(true);
    }
  }, []);

  // Hook directly updates CSS custom properties (--rx, --ry, --mx, --my) without React re-renders
  useTilt(isRich ? consoleRef : { current: null }, 6);

  return (
    <section id="sovereign-engine" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#04060A] border-t border-b border-white/[0.08] relative overflow-hidden text-white font-sans">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: activeLayer === 1 
            ? 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)' 
            : activeLayer === 2 
            ? 'radial-gradient(circle, rgba(239,68,68,0.35) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Chapter 02 Editorial Header — Claude B2B Plain Wording */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>02 / 06 · The Sovereign Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            It answers. It checks. It posts to your books.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed font-light">
            Tap a layer below to inspect how leads move through verified business rules into your accounts.
          </p>
        </div>

        {/* 3 Hardware Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { id: 1, label: "01 // SPEED-TO-LEAD", title: "Answers in 30 seconds", desc: "WhatsApp Meta Cloud API", activeColor: "border-emerald-500/60 bg-emerald-500/10 text-emerald-400" },
            { id: 2, label: "02 // VALIDATION GATES", title: "Checks before it acts", desc: "GST & Margin Rules", activeColor: "border-red-500/60 bg-red-500/10 text-red-400" },
            { id: 3, label: "03 // SOVEREIGN LEDGER", title: "Posts to your books", desc: "Tally Prime & PostgreSQL", activeColor: "border-sky-500/60 bg-sky-500/10 text-sky-400" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id as 1 | 2 | 3)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                activeLayer === tab.id
                  ? `${tab.activeColor} shadow-xl shadow-black/40`
                  : "bg-[#070A10] border-white/10 hover:border-white/20 text-neutral-400"
              }`}
            >
              <div className="text-[11px] font-mono tracking-wider font-bold mb-1 opacity-80">
                {tab.label}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mb-0.5">
                {tab.title}
              </div>
              <div className="text-xs text-neutral-400">
                {tab.desc}
              </div>
            </button>
          ))}
        </div>

        {/* The 3D Console Viewport */}
        <div
          ref={consoleRef}
          className="console-chassis relative rounded-3xl p-6 sm:p-10 bg-[#070A10] border border-white/10 shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-200"
        >
          {/* Real-time Specular Highlight Overlay */}
          <div className="console-specular" />

          {/* Titanium HUD Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-bold tracking-wider">SAGE DO CONSOLE v2.4</span>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <span className="hidden sm:inline text-emerald-400 font-semibold">● VERIFIED ENCLAVE</span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px]">
              <span>
                LATENCY: <strong className="text-emerald-400 font-bold">24s SLA</strong>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase font-semibold">
                100% Code Ownership
              </span>
            </div>
          </div>

          {/* Active Layer Screen Content */}
          <div className="mt-8">
            
            {/* LAYER 01: ANSWERS IN 30 SECONDS */}
            {activeLayer === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    <span>SUB-30s FIRST REPLY SLA</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    A customer messages at 11 PM and gets your price and catalogue before they message a competitor.
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    Official Meta Cloud API webhook connects directly to your live rate card and inventory. No manual typing, no lost midnight inquiries.
                  </p>

                  <div className="pt-2">
                    <a
                      href="#proof-viewports"
                      className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
                    >
                      <span>See it running on: Dental &amp; Specialty Clinic Portal (0.8s mobile load)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-5 rounded-2xl bg-[#0B0F19] border border-emerald-500/30 shadow-2xl space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 font-bold">● WHATSAPP META CLOUD API</span>
                      <span>11:04 PM</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] text-neutral-200 border border-white/5 space-y-1">
                      <span className="text-neutral-500 text-[10px] block font-mono">Incoming Buyer Inquiry:</span>
                      <p>"Hi, need urgent rate card and dispatch schedule for Ludhiana delivery."</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-200 border border-emerald-500/30 space-y-1">
                      <span className="text-emerald-400 text-[10px] block font-mono">SAGE DO Automated Reply (24s):</span>
                      <p>"Hello! Wholesale rate card attached. 200 units ready for 48-hour dispatch. Would you like our engineer to confirm specs tomorrow at 11 AM?"</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                      <span>Status: Auto-Qualified</span>
                      <span className="text-emerald-400 font-bold">✓ Pushed to CRM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAYER 02: CHECKS BEFORE IT ACTS */}
            {activeLayer === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DETERMINISTIC VALIDATION GATE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    AI drafts the quote. Fixed rules check price, stock and tax. A person approves anything unusual.
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    Raw AI chatbots hallucinate numbers and quote imaginary discounts. We build rigid mathematical constraints, margin floors, and GST verification gates before any quote reaches a client.
                  </p>

                  <div className="pt-2">
                    <a
                      href="#proof-viewports"
                      className="inline-flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                    >
                      <span>See it running on: Zero-Seat Sales CRM (Saved ₹3.6L/yr in SaaS rent)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-5 rounded-2xl bg-black border border-red-500/30 shadow-2xl space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-neutral-400">
                      <span>AUDIT_GATE // ORDER #8491</span>
                      <span className="text-emerald-400">PASSED</span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-neutral-300">
                      <div className="text-neutral-500">{">"} GST SAC 998313 (18% Verified) ✓</div>
                      <div className="text-emerald-400">{">"} MARGIN FLOOR: 32% Protected ✓</div>
                      <div className="text-emerald-400">{">"} STOCK ALLOCATION: 200 Units Reserved ✓</div>
                      <div className="text-sky-400 font-bold">{">"} VERDICT: APPROVED FOR DISPATCH</div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-[10px] text-neutral-500 flex items-center justify-between">
                      <span>Zero hallucination threshold</span>
                      <span className="text-white">100% Deterministic</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAYER 03: POSTS TO YOUR BOOKS */}
            {activeLayer === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider">
                    <Database className="w-3.5 h-3.5" />
                    <span>NATIVE TALLY PRIME LEDGER SYNC</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    The order lands in Tally with party and item details filled in. Your accountant stops retyping.
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    Direct XML ledger bridge writes sales orders and customer masters straight into your Tally Prime instance. Hosted on your own dedicated server costing ₹800/month.
                  </p>

                  <div className="pt-2">
                    <a
                      href="#proof-viewports"
                      className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 font-bold transition-colors cursor-pointer"
                    >
                      <span>See it running on: Industrial Manufacturing RFQ Quoter (₹1.4Cr processed)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-5 rounded-2xl bg-[#0A0D15] border border-sky-500/30 shadow-2xl space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-neutral-400">
                      <span>ERP_BRIDGE // TALLY PRIME</span>
                      <span className="text-sky-400">CONNECTED</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-300">Sales Voucher Auto-Created</span>
                        <span className="text-emerald-400 font-bold">● Synced</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-300">Party GSTIN Verified</span>
                        <span className="text-emerald-400 font-bold">● Validated</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-300">Monthly Software Rent</span>
                        <span className="text-white font-bold">₹0 / month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-500">
            <span>CHASSIS: AEROSPACE TITANIUM CHAMFER</span>
            <span className="text-neutral-400">POINTER PERSPECTIVE TILT ACTIVE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
