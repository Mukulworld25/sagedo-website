import React, { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Linkedin, 
  QrCode, 
  Award, 
  Lock, 
  Zap,
  ArrowRight,
  GitBranch,
  Server
} from "lucide-react";
import { Link } from "wouter";

const CHECKLIST_DOMAINS = [
  {
    domain: "01 // SECURITY & SOVEREIGNTY",
    items: [
      "Zero vendor data retention enforced",
      "PostgreSQL isolated VPS schema & encryption",
      "API keys stored in hardware enclave",
      "Zero third-party tracking scripts",
      "Role-Based Access Control (RBAC) enforced",
      "Client ownership of GitHub & VPS root credentials"
    ]
  },
  {
    domain: "02 // DATA INTEGRITY & CALCULATIONS",
    items: [
      "GST 18% SAC 998313 calculation mathematically verified",
      "Margin protection floor hardcoded & audited",
      "Edge-case quotation inputs rejected",
      "Concurrency stress test passed (zero duplicate orders)",
      "Database rollback on failed webhook triggers",
      "Automated daily database backup cron verified"
    ]
  },
  {
    domain: "03 // INTEGRATIONS & ERP BRIDGES",
    items: [
      "Meta Cloud API webhook 24s reply latency verified",
      "Tally Prime bi-directional XML ledger sync tested",
      "WhatsApp customer media & PDF generation verified",
      "Automated founder WhatsApp alert triggered",
      "Failed message retry queue active",
      "CRM pipeline automatic status progression verified"
    ]
  },
  {
    domain: "04 // PERFORMANCE & MOBILE 4G SLA",
    items: [
      "Mobile LCP sub-1.2s on throttled Indian 4G",
      "Zero main-thread blocking JavaScript",
      "Images compressed with responsive AVIF/WebP",
      "Cumulative Layout Shift (CLS) < 0.05",
      "Touch target sizes compliant (>= 44px)",
      "SSL / TLS 1.3 edge certificates active"
    ]
  },
  {
    domain: "05 // HANDOVER & STAFF RUNBOOKS",
    items: [
      "Recorded video staff walkthrough delivered",
      "Complete server restart & backup runbook included",
      "Accountant training for Tally reconciliation complete",
      "Emergency 2-hour P1 server SLA active",
      "Client commercial MSA & Mutual NDA signed",
      "Founder signed release seal physically generated"
    ]
  }
];

export default function StudioReleaseCertificate() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <section id="studio-guarantee" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#070A10] border-t border-b border-white/[0.08] relative overflow-hidden text-white font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Chapter 05 Header — Claude B2B Wording */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>05 / 06 · The Sovereign Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Nothing goes live until Mukul has run it on your real data.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed font-light">
            He designs it. Our engineers build it. Our testers try to break it. Then he signs.
          </p>
        </div>

        {/* Chain of Custody Horizontal Flow */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0B0F17] border border-white/10 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>CHAIN OF CUSTODY // ZERO-DEFECT QUALITY GATES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold block">GATE 01 · ARCHITECTURE</span>
              <h4 className="text-sm font-bold text-white">Mukul Dhiman</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Designs system schema, WhatsApp webhooks, and Tally integration pipes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-sky-400 font-bold block">GATE 02 · ASSEMBLY</span>
              <h4 className="text-sm font-bold text-white">Engineering Studio</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Builds custom frontend, PostgreSQL models, and automated business logic.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-amber-400 font-bold block">GATE 03 · AUDIT</span>
              <h4 className="text-sm font-bold text-white">QA Testing Enclave</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Tests edge cases, bad inputs, concurrency spikes, and mobile 4G latency.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold block">GATE 04 · SIGN-OFF</span>
              <h4 className="text-sm font-bold text-white">Mukul Personal Sign-off</h4>
              <p className="text-xs text-emerald-200/80 leading-relaxed">Signs physical release certificate only after verifying on client live data.</p>
            </div>

          </div>
        </div>

        {/* The Physical Tactile Signed Release Certificate Component */}
        <div className="mb-14 flex justify-center">
          <div 
            className="w-full max-w-4xl p-6 sm:p-10 rounded-2xl bg-[#ECE9E1] text-[#0B0E14] shadow-2xl relative overflow-hidden transition-transform duration-500 hover:rotate-0 transform -rotate-[0.8deg] select-none border border-neutral-300"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.15)"
            }}
          >
            {/* Guilloche Security Watermark Pattern (SVG) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <svg width="600" height="600" viewBox="0 0 100 100" className="w-full h-full text-black">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
            </div>

            {/* Specimen Diagonal Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-6xl sm:text-9xl font-black uppercase tracking-widest text-black rotate-[-25deg]">
                SPECIMEN
              </span>
            </div>

            {/* Certificate Header Band */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-[#0B0E14]/20 gap-3">
              <div>
                <span className="text-xs font-mono font-black uppercase tracking-widest text-emerald-800 block">
                  SAGE DO · SOVEREIGN ENGINEERING STUDIO
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B0E14]">
                  SOFTWARE SYSTEM RELEASE CERTIFICATE
                </h3>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-[#0B0E14]/70">
                <p className="font-bold text-[#0B0E14]">DOC: SD-RC-2611-0042 · REV A</p>
                <p className="text-[11px]">GOVERNANCE: ISO / ZERO-DEFECT GATE</p>
              </div>
            </div>

            {/* Metadata Traceability Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#0B0E14]/15 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-[#0B0E14]/60 block font-bold">Client Build:</span>
                <span className="font-bold">Enterprise Client #42</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#0B0E14]/60 block font-bold">Environment:</span>
                <span className="font-bold text-emerald-800">Live Client Data</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#0B0E14]/60 block font-bold">Commit SHA:</span>
                <span className="font-bold">git a3f9c1e</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#0B0E14]/60 block font-bold">Warranty Period:</span>
                <span className="font-bold">30-Day Critical SLA</span>
              </div>
            </div>

            {/* 30-Point Granular Checklist (Desktop: 3-column / Mobile: domain toggle) */}
            <div className="py-5">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-[#0B0E14]/80">
                <span>30-POINT PHYSICAL QA CHECKLIST</span>
                <span className="text-emerald-800 bg-emerald-700/10 px-2 py-0.5 rounded font-black">
                  30 / 30 PASSED ✓
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                {CHECKLIST_DOMAINS.slice(0, 3).map((domain, i) => (
                  <div key={i} className="p-3 rounded-xl bg-black/[0.04] border border-black/10 space-y-1.5">
                    <p className="font-mono font-bold text-[10px] text-[#0B0E14]/70 tracking-wider">
                      {domain.domain}
                    </p>
                    <ul className="space-y-1 text-[11px] text-[#0B0E14]/85">
                      {domain.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold shrink-0">✓</span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Sign-off & Holographic Seal */}
            <div className="pt-4 border-t-2 border-[#0B0E14]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Left: Signatures */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="space-y-0.5">
                    <div className="font-mono text-base font-black italic tracking-wider text-emerald-900 border-b border-[#0B0E14]/40 pb-0.5">
                      Mukul Dhiman
                    </div>
                    <p className="text-[10px] font-mono uppercase text-[#0B0E14]/70">
                      Mukul Dhiman · Founder &amp; Systems Architect
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#0B0E14]/80 border-b border-[#0B0E14]/40 pb-0.5">
                      QA Enclave Verified
                    </div>
                    <p className="text-[10px] font-mono uppercase text-[#0B0E14]/70">
                      Lead Systems QA Engineer
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Holographic Verification Seal + QR Code */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 via-emerald-400 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#ECE9E1] flex flex-col items-center justify-center text-[8px] font-mono font-black text-emerald-950 text-center leading-none">
                    <span>SAGE DO</span>
                    <span className="text-emerald-700 my-0.5">★ ★ ★</span>
                    <span>SEALED</span>
                  </div>
                </div>

                <div className="p-1 rounded-lg bg-black/[0.06] border border-black/10">
                  <QrCode className="w-10 h-10 text-neutral-800" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Contractual Guarantee Terms Notice */}
        <div className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 mb-10 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Every deployment ships with this signed record: 30 verified checks, timestamp, and git commit hash. If it is not on the certificate, we did not test it.
            </span>
          </div>
          <Link href="/partnerships">
            <span className="font-semibold text-white hover:text-emerald-400 flex items-center gap-1 cursor-pointer shrink-0">
              Review commercial terms <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Mukul Dhiman Founder Accountability Card — STRICTLY ONLY LINKEDIN, ZERO PHONE NUMBER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/[0.07] via-white/[0.02] to-transparent border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src="/founder_mukul.png"
                alt="Mukul Dhiman — Founder & Systems Architect"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-emerald-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0D101A] flex items-center justify-center text-[10px]" title="Active Accountability">
                ⚡
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <h4 className="text-lg sm:text-xl font-black text-white">Mukul Dhiman</h4>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold tracking-wider uppercase">
                  Founder &amp; Systems Architect
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl font-light">
                "Before any deployment goes live or final milestone invoices are released, I personally test and verify every line of code, workflow, and webhook on your real business data. You work directly with an engineer who takes personal accountability for what ships."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-center md:justify-end">
            <a
              href="https://www.linkedin.com/in/mukul-dhiman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0077b5]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
