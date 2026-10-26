import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Trophy,
  Zap,
  TrendingDown,
  Lock,
  Layers,
  ChevronRight,
} from "lucide-react";

export interface TCODimension {
  id: string;
  dimension: string;
  dimensionSubtitle: string;
  saas: {
    title: string;
    description: string;
    status: "terrible" | "poor";
    badgeText: string;
  };
  freelancers: {
    title: string;
    description: string;
    status: "poor" | "unreliable" | "terrible";
    badgeText: string;
  };
  sagedo: {
    title: string;
    description: string;
    status: "winner";
    badgeText: string;
    savingsHighlight?: string;
  };
}

export const TCO_DIMENSIONS: TCODimension[] = [
  {
    id: "upfront-investment",
    dimension: "1. Upfront Investment",
    dimensionSubtitle: "Initial setup & implementation capital",
    saas: {
      title: "₹0 to ₹3,00,000 Setup",
      description: "Low entry tier, but mandatory certified consultants charge ₹1.5L–₹3L to configure pipelines and custom fields.",
      status: "poor",
      badgeText: "Hidden Setup Fees",
    },
    freelancers: {
      title: "₹15,000 – ₹40,000 Bait",
      description: "Cheap upfront price on Upwork/Fiverr that explodes with add-on milestone scopes and broken dependencies.",
      status: "unreliable",
      badgeText: "Unreliable Scope",
    },
    sagedo: {
      title: "₹25,000 – ₹2,50,000 Flat CapEx",
      description: "Transparent, one-time engineering investment based on verified scope. Zero hidden consultant hours.",
      status: "winner",
      badgeText: "Fixed Price CapEx",
      savingsHighlight: "Zero Hidden Consulting Fees",
    },
  },
  {
    id: "software-tax",
    dimension: "2. Ongoing Software Tax",
    dimensionSubtitle: "Recurring per-seat licensing drain",
    saas: {
      title: "₹12L – ₹30L / Year",
      description: "Zoho One costs ₹12L–₹18L/yr for 100 seats. Salesforce exceeds ₹30L/yr. Hiring more staff directly inflates software bills.",
      status: "terrible",
      badgeText: "Compounding Tax",
    },
    freelancers: {
      title: "₹60,000 – ₹1.2L / Year",
      description: "Fragile WordPress plugins and hosting crash on version updates, requiring constant bugfix retainers.",
      status: "poor",
      badgeText: "Maintenance Bleed",
    },
    sagedo: {
      title: "₹0 / Seat Forever",
      description: "Unlimited telecallers, branch managers, and field staff. You pay zero recurring licensing tax to software vendors.",
      status: "winner",
      badgeText: "Zero Seat Tax Forever",
      savingsHighlight: "Save ₹12L–₹30L Every Year",
    },
  },
  {
    id: "code-ownership",
    dimension: "3. Code & DB Ownership",
    dimensionSubtitle: "Data sovereignty & repository handover",
    saas: {
      title: "0% Ownership (Proprietary Jail)",
      description: "Your business logic and client database are trapped in proprietary cloud servers. Disconnecting means losing your system.",
      status: "terrible",
      badgeText: "Zero IP Ownership",
    },
    freelancers: {
      title: "Partial / Fragile Codebase",
      description: "Messy zip files, hardcoded credentials, undocumented hacks. Freelancer ghosts when critical production bugs emerge.",
      status: "unreliable",
      badgeText: "Ghosting Risk",
    },
    sagedo: {
      title: "100% Full IP & DB Sovereignty",
      description: "Clean Git repo, PostgreSQL schemas, Drizzle migrations, and root VPS credentials handed over. Self-hostable anywhere.",
      status: "winner",
      badgeText: "100% Sovereign IP",
      savingsHighlight: "Self-Hostable Anywhere",
    },
  },
  {
    id: "speed-to-lead",
    dimension: "4. Speed-to-Lead & Automation",
    dimensionSubtitle: "Inquiry to response turnaround velocity",
    saas: {
      title: "2 to 6 Hours Manual Triage",
      description: "Clunky email notifications. Sales reps log in only during desk hours. After 5 minutes, conversion rates collapse by 400%.",
      status: "poor",
      badgeText: "Slow Desk Queues",
    },
    freelancers: {
      title: "12 to 48 Hours or Broken",
      description: "Standard web forms route to unmonitored email inboxes. Spam filters frequently swallow high-ticket inquiries.",
      status: "terrible",
      badgeText: "Lost Lead Danger",
    },
    sagedo: {
      title: "Sub-90s WhatsApp Webhook",
      description: "Automated Meta Cloud WhatsApp intake auto-qualifies inquiries and pings founder + telecallers in under 45 seconds.",
      status: "winner",
      badgeText: "Sub-90s Speed-to-Lead",
      savingsHighlight: "400% Higher Conversions",
    },
  },
  {
    id: "custom-logic",
    dimension: "5. Custom Logic & Agility",
    dimensionSubtitle: "Ability to adapt to unique operations",
    saas: {
      title: "Clunky Deluge Scripts",
      description: "Limited by proprietary platform constraints. Custom multi-entity ERP rules require slow, expensive workarounds.",
      status: "poor",
      badgeText: "Rigid Workarounds",
    },
    freelancers: {
      title: "Spaghetti Code & 35+ Plugins",
      description: "Cobbled together from incompatible third-party plugins that break when WordPress, PHP, or Node updates.",
      status: "unreliable",
      badgeText: "Brittle Collisions",
    },
    sagedo: {
      title: "Sovereign React & Node Architecture",
      description: "Engineered specifically around your exact operational workflows with zero plugin bloat, custom SQL views, and native Tally sync.",
      status: "winner",
      badgeText: "Bespoke Sovereign Stack",
      savingsHighlight: "Engineered For Your Exact Flow",
    },
  },
  {
    id: "three-year-tco",
    dimension: "6. 3-Year Total Cost of Ownership",
    dimensionSubtitle: "Comprehensive 36-month capital expenditure (100 seats)",
    saas: {
      title: "₹36,00,000 – ₹90,00,000+",
      description: "Compounding monthly software drain that escalates every time you add team members, plus consultant bills.",
      status: "terrible",
      badgeText: "Extreme Capital Bleed",
    },
    freelancers: {
      title: "₹2,50,000 – ₹5,00,000",
      description: "Low upfront cost followed by accumulating technical debt, recurring emergency fixes, and eventual total system rebuild.",
      status: "poor",
      badgeText: "Technical Debt Trap",
    },
    sagedo: {
      title: "₹2,50,000 Flat One-Time CapEx",
      description: "Flat one-time capital investment. You own the code forever. Net 3-year savings: ₹33,50,000 to ₹87,50,000+ (93% savings).",
      status: "winner",
      badgeText: "93% Verified Savings",
      savingsHighlight: "Save ₹33.5L – ₹87.5L+ Total",
    },
  },
];

export function TCOAsymmetryTable() {
  const [mobileCompareTarget, setMobileCompareTarget] = useState<"both" | "saas" | "freelancers">("both");

  return (
    <section id="tco-asymmetry" className="relative z-20 py-20 sm:py-28 bg-[#080a10] text-white border-b border-white/[0.08] overflow-hidden">
      {/* Background glow lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>EMPIRICAL COMMERCIAL MOATS · 93% 3-YEAR CAPITAL SAVINGS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            The Total Cost of Ownership{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              Asymmetry Matrix
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Why Indian enterprises and fast-growing SMBs are dumping recurring per-seat SaaS taxes in favor of SAGE DO Sovereign Architecture.
          </p>

          {/* Value Summary Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>₹0 Per-Seat Tax Forever</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Code &amp; DB Ownership</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Sub-90s WhatsApp Speed-to-Lead</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP VIEW (≥ 1024px): 6-Row High-Contrast Grid with Winner Column
           ========================================================================= */}
        <div className="hidden lg:block rounded-2xl border border-white/[0.1] bg-[#0c0e15] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 border-b border-white/[0.1] bg-[#121520] text-xs font-bold uppercase tracking-wider text-neutral-400">
            <div className="col-span-3 p-5 flex items-center">
              <span>Architectural Dimension</span>
            </div>
            <div className="col-span-3 p-5 border-l border-white/[0.08] flex items-center justify-between">
              <span>Status Quo SaaS</span>
              <span className="text-[10px] text-red-400 font-mono">Zoho / Salesforce</span>
            </div>
            <div className="col-span-3 p-5 border-l border-white/[0.08] flex items-center justify-between">
              <span>Commodity Freelancers</span>
              <span className="text-[10px] text-amber-400 font-mono">Upwork / Agencies</span>
            </div>
            <div className="col-span-3 p-5 border-l border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-black">SAGE DO Sovereign</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold tracking-wide">
                WINNER
              </span>
            </div>
          </div>

          {/* 6 Dimension Rows */}
          {TCO_DIMENSIONS.map((dim, idx) => {
            const isLast = idx === TCO_DIMENSIONS.length - 1;
            return (
              <div
                key={dim.id}
                className={`grid grid-cols-12 transition-colors hover:bg-white/[0.02] ${
                  !isLast ? "border-b border-white/[0.06]" : ""
                } ${dim.id === "three-year-tco" ? "bg-emerald-500/[0.03]" : ""}`}
              >
                {/* Dimension Column */}
                <div className="col-span-3 p-5 flex flex-col justify-center">
                  <div className="text-sm font-bold text-white tracking-tight">
                    {dim.dimension}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {dim.dimensionSubtitle}
                  </div>
                </div>

                {/* Status Quo SaaS Column */}
                <div className="col-span-3 p-5 border-l border-white/[0.06] bg-red-950/[0.05] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="text-sm font-bold text-red-300">
                        {dim.saas.title}
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20 shrink-0">
                        {dim.saas.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {dim.saas.description}
                    </p>
                  </div>
                </div>

                {/* Commodity Freelancers Column */}
                <div className="col-span-3 p-5 border-l border-white/[0.06] bg-amber-950/[0.05] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="text-sm font-bold text-amber-300">
                        {dim.freelancers.title}
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 shrink-0">
                        {dim.freelancers.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {dim.freelancers.description}
                    </p>
                  </div>
                </div>

                {/* SAGE DO Sovereign Column (Highlighted Winner) */}
                <div className="col-span-3 p-5 border-l border-emerald-500/30 bg-emerald-950/25 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="text-sm font-black text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{dim.sagedo.title}</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                        {dim.sagedo.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                      {dim.sagedo.description}
                    </p>
                  </div>

                  {dim.sagedo.savingsHighlight && (
                    <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>{dim.sagedo.savingsHighlight}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE VIEW (< 1024px, specifically 390px): Clean Stacked Dimensional Cards
           ========================================================================= */}
        <div className="lg:hidden space-y-5">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-[#11141e] border border-white/[0.08] text-xs">
            <button
              onClick={() => setMobileCompareTarget("both")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                mobileCompareTarget === "both"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Alternatives
            </button>
            <button
              onClick={() => setMobileCompareTarget("saas")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                mobileCompareTarget === "saas"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              vs. Zoho/Salesforce
            </button>
            <button
              onClick={() => setMobileCompareTarget("freelancers")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                mobileCompareTarget === "freelancers"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              vs. Freelancers
            </button>
          </div>

          {/* Stacked Dimension Cards */}
          {TCO_DIMENSIONS.map((dim) => (
            <div
              key={dim.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                dim.id === "three-year-tco"
                  ? "bg-[#0d121c] border-emerald-500/40 shadow-[0_4px_30px_rgba(16,185,129,0.15)]"
                  : "bg-[#0b0e15] border-white/[0.08]"
              }`}
            >
              {/* Card Header: Dimension Title */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#121520] flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {dim.dimension}
                  </h3>
                  <p className="text-xs text-neutral-400">{dim.dimensionSubtitle}</p>
                </div>
                {dim.id === "three-year-tco" && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                    KEY MOAT
                  </span>
                )}
              </div>

              {/* SAGE DO Highlight Card (Pinned Top Winner) */}
              <div className="p-4 sm:p-5 bg-emerald-950/25 border-b border-emerald-500/20">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      SAGE DO Sovereign Architecture
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {dim.sagedo.badgeText}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-black text-white mb-1">
                  {dim.sagedo.title}
                </div>

                <p className="text-xs text-neutral-200 leading-relaxed">
                  {dim.sagedo.description}
                </p>

                {dim.sagedo.savingsHighlight && (
                  <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{dim.sagedo.savingsHighlight}</span>
                  </div>
                )}
              </div>

              {/* Competitor Comparisons */}
              <div className="p-4 sm:p-5 space-y-3 bg-[#080a10]">
                {/* SaaS Card */}
                {(mobileCompareTarget === "both" || mobileCompareTarget === "saas") && (
                  <div className="p-3.5 rounded-xl bg-red-950/15 border border-red-500/20">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-red-400">
                        Status Quo SaaS (Zoho / Salesforce)
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                        {dim.saas.badgeText}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-neutral-200 mb-1">
                      {dim.saas.title}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {dim.saas.description}
                    </p>
                  </div>
                )}

                {/* Freelancer Card */}
                {(mobileCompareTarget === "both" || mobileCompareTarget === "freelancers") && (
                  <div className="p-3.5 rounded-xl bg-amber-950/15 border border-amber-500/20">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-400">
                        Commodity Freelancers
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        {dim.freelancers.badgeText}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-neutral-200 mb-1">
                      {dim.freelancers.title}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {dim.freelancers.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Commercial Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#0e121b] to-primary/10 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">
                Eliminate compounding software tax once and for all.
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                Invest one-time CapEx into an asset your company owns forever. Test a working prototype on an edge URL within 24–48 hours.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/916284925684?text=Hi%20Mukul,%20I%20reviewed%20the%20TCO%20Asymmetry%20Table%20on%20sagedo.in%20and%20want%20to%20replace%20our%20current%20SaaS%20tax%20with%20a%20Sovereign%20build."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("tco_table_cta")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Lock In Sovereign CapEx</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default TCOAsymmetryTable;
