import React, { useState } from "react";
import { 
  Building2, 
  Stethoscope, 
  ShoppingBag, 
  Laptop, 
  Zap, 
  MessageSquare, 
  Database, 
  Layers, 
  ArrowRight, 
  Check, 
  Clock, 
  Sparkles 
} from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

type BusinessType = "clinic" | "manufacturing" | "d2c" | "saas";
type SystemType = "website" | "bot" | "crm" | "fullstack";
type BudgetTier = "starter" | "growth" | "custom";

interface PreviewData {
  title: string;
  subtitle: string;
  themeStyle: "light" | "industrial" | "retail" | "dark";
  features: string[];
  mockupImage?: string;
  metrics: string;
}

const previewProfiles: Record<BusinessType, PreviewData> = {
  clinic: {
    title: "Dr. Apex Multispecialty & Dental Care",
    subtitle: "Sunlit Patient Portal · 0.8s Mobile Booking · HIPAA/Indian Telemed Compliance",
    themeStyle: "light",
    features: [
      "Instant 1-Click WhatsApp Doctor Booking",
      "Automated Patient Recall & SMS/WhatsApp Reminders",
      "Zero-Lag Mobile Loading on 4G (Under 0.9s)",
      "Google Maps 5-Star Reputation Engine"
    ],
    mockupImage: "/sample_dental_desktop.png",
    metrics: "+42% appointment conversions vs. old slow WordPress site"
  },
  manufacturing: {
    title: "Bharat Precision Industrial Forge",
    subtitle: "B2B Product Catalog · Instant RFQ Engine · Dealer Portal",
    themeStyle: "industrial",
    features: [
      "Dynamic CAD & Spec Sheet Instant Downloader",
      "Automated WhatsApp Quotation Dispatch to Sales Team",
      "Distributor Lead Routing by City/Pincode",
      "Zero SaaS Fees: Replaces Zoho/HubSpot with Custom CRM"
    ],
    mockupImage: "/sample_sagedo_calculator.png",
    metrics: "42-second response to factory procurement tenders"
  },
  d2c: {
    title: "Aura Essentials Organic Skincare",
    subtitle: "High-Velocity Headless Store · Sub-1s Mobile Checkout · Meta Ad Optimized",
    themeStyle: "retail",
    features: [
      "WhatsApp Cart Abandonment Recovery Bot (42s trigger)",
      "Zero-Friction 1-Tap UPI Payment Checkout",
      "98+ Google Lighthouse Performance Score",
      "Native Meta Conversion API (CAPI) Integration"
    ],
    mockupImage: "/sample_sagedo_home.png",
    metrics: "Zero ad budget wasted on bounce — 98 Lighthouse speed"
  },
  saas: {
    title: "Kizen Enterprise Revenue & Pipeline Engine",
    subtitle: "Custom Zero-Seat CRM · Kanban Deal Flow · Live Webhooks",
    themeStyle: "dark",
    features: [
      "100% Code & Database Ownership (No ₹1,500/seat/mo fee)",
      "PostgreSQL + React Kanban Pipeline with Live WhatsApp Alerts",
      "Full REST & Webhook APIs for Seamless Tally/ERP Sync",
      "Self-Hosted on your own ₹800/mo VPS or Cloud Server"
    ],
    mockupImage: "/sample_sagedo_calculator.png",
    metrics: "Saves ₹1,80,000/year on recurring per-seat SaaS taxes"
  }
};

export default function VisualConceptStudio() {
  const [businessType, setBusinessType] = useState<BusinessType>("clinic");
  const [systemType, setSystemType] = useState<SystemType>("website");
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("growth");

  const currentPreview = previewProfiles[businessType];

  const getSystemLabel = (s: SystemType) => {
    switch (s) {
      case "website": return "0.8s High-Conversion Website";
      case "bot": return "24/7 WhatsApp Auto-Qualifier";
      case "crm": return "Zero-Seat Custom CRM";
      case "fullstack": return "Full Revenue Stack (Site + Bot + CRM)";
    }
  };

  const getTierLabel = (b: BudgetTier) => {
    switch (b) {
      case "starter": return "₹15,000 Starter (7 Days)";
      case "growth": return "₹35,000 Growth Stack (10 Days)";
      case "custom": return "₹95,000+ Sovereign Suite (24h Concept First)";
    }
  };

  const whatsAppText = `Hi Mukul! I configured a system for my business on SAGE DO:
• Business Type: ${businessType.toUpperCase()}
• System Needed: ${getSystemLabel(systemType)}
• Target Investment: ${getTierLabel(budgetTier)}

Please send me my personalized 24-hour concept preview.`;

  const waLink = `https://wa.me/916284925684?text=${encodeURIComponent(whatsAppText)}`;

  return (
    <section className="py-20 sm:py-28 bg-[#090b10] border-b border-white/[0.08] relative overflow-hidden text-white" id="visual-studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Concept Studio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            See Your System <span className="text-primary">Before You Spend ₹1</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Select your industry and needed architecture. We dynamically render your real design blueprint, 
            technical stack, and delivery milestones.
          </p>
        </div>

        {/* 3-Step Configurator & Live Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Revenue Clicks (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Business Type */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#12151e] border border-white/[0.07] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Step 1 of 3</span>
                <span className="text-xs font-semibold text-primary">Your Industry</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">What kind of business do you run?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "clinic", label: "Clinic / Health", icon: Stethoscope },
                  { id: "manufacturing", label: "B2B / Industrial", icon: Building2 },
                  { id: "d2c", label: "D2C / Retail", icon: ShoppingBag },
                  { id: "saas", label: "Startup / Tech", icon: Laptop },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = businessType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBusinessType(item.id as BusinessType)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all border text-left ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-[0_0_16px_rgba(239,68,68,0.4)]"
                          : "bg-neutral-900/60 text-neutral-300 border-white/[0.06] hover:border-white/20 hover:bg-neutral-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: System Needed */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#12151e] border border-white/[0.07] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Step 2 of 3</span>
                <span className="text-xs font-semibold text-primary">System Architecture</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">What do you need built?</h3>
              <div className="space-y-2">
                {[
                  { id: "website", label: "0.8s High-Conversion Website", sub: "Hand-coded, 98+ Lighthouse, zero plugin bloat", icon: Zap },
                  { id: "bot", label: "24/7 WhatsApp Auto-Qualifier", sub: "42-second lead triage + appointment sync", icon: MessageSquare },
                  { id: "crm", label: "Zero-Seat Custom CRM", sub: "No ₹1,500/seat/mo fee · Own your code forever", icon: Database },
                  { id: "fullstack", label: "Full Revenue Stack (All 3)", sub: "Complete end-to-end growth infrastructure", icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = systemType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSystemType(item.id as SystemType)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border ${
                        isSelected
                          ? "bg-neutral-800 border-primary/60 text-white shadow-sm"
                          : "bg-neutral-900/60 border-white/[0.06] text-neutral-300 hover:border-white/20 hover:bg-neutral-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-neutral-400"}`} />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">{item.label}</p>
                          <p className="text-[11px] text-neutral-400">{item.sub}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Investment & Speed Tier (The Filter) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#12151e] border border-white/[0.07] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Step 3 of 3</span>
                <span className="text-xs font-semibold text-emerald-400">Fixed Milestone Pricing</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Target Investment &amp; Speed</h3>
              <div className="space-y-2">
                {[
                  { id: "starter", tier: "₹15,000", name: "Starter Launch", days: "7 Days Delivery", sub: "Core 0.8s website + WhatsApp lead routing" },
                  { id: "growth", tier: "₹35,000", name: "Growth Stack", days: "10 Days Delivery", sub: "Website + WhatsApp RAG Bot + Lead Calculator" },
                  { id: "custom", tier: "₹95,000+", name: "Sovereign Suite", days: "24h Concept Preview", sub: "Full custom CRM + Web + Omnichannel visibility" },
                ].map((item) => {
                  const isSelected = budgetTier === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBudgetTier(item.id as BudgetTier)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border ${
                        isSelected
                          ? "bg-emerald-950/40 border-emerald-500/60 text-white shadow-sm"
                          : "bg-neutral-900/60 border-white/[0.06] text-neutral-300 hover:border-white/20 hover:bg-neutral-800/60"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-emerald-400">{item.tier}</span>
                          <span className="text-xs font-semibold text-white">• {item.name}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">{item.sub}</p>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-neutral-400" /> {item.days}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Responsive Blueprint Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#12151e] border border-white/[0.08] p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              
              {/* Mockup Browser Window Frame */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-neutral-400 hidden sm:inline">
                    preview.sagedo.in/{businessType}-{systemType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ⚡ 0.8s Mobile Target
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    100% Code Ownership
                  </span>
                </div>
              </div>

              {/* Dynamic Mockup Body (Switches light/dark according to persona) */}
              <div 
                className={`rounded-xl p-5 sm:p-6 transition-all duration-300 border ${
                  currentPreview.themeStyle === "light"
                    ? "bg-[#f8fafc] text-neutral-900 border-neutral-200 shadow-md"
                    : currentPreview.themeStyle === "industrial"
                    ? "bg-[#181a20] text-neutral-100 border-amber-500/20 shadow-md"
                    : currentPreview.themeStyle === "retail"
                    ? "bg-[#0f1118] text-white border-rose-500/20 shadow-md"
                    : "bg-[#0c0e14] text-white border-primary/20 shadow-md"
                }`}
              >
                {/* Header in Mockup */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                      currentPreview.themeStyle === "light"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-primary/20 text-primary"
                    }`}>
                      Live Blueprint Spec
                    </span>
                    <h4 className="text-lg sm:text-2xl font-black mt-2 leading-tight">
                      {currentPreview.title}
                    </h4>
                    <p className={`text-xs mt-1 ${currentPreview.themeStyle === "light" ? "text-neutral-600" : "text-neutral-400"}`}>
                      {currentPreview.subtitle}
                    </p>
                  </div>
                </div>

                {/* Screenshot Frame (if image available) */}
                {currentPreview.mockupImage && (
                  <div className="mb-5 rounded-lg overflow-hidden border border-black/10 shadow-sm relative group">
                    <img 
                      src={currentPreview.mockupImage} 
                      alt={currentPreview.title} 
                      className="w-full h-44 sm:h-56 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-mono text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                        Verified Build Architecture: {currentPreview.metrics}
                      </span>
                    </div>
                  </div>
                )}

                {/* Architecture Feature Grid */}
                <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${currentPreview.themeStyle === "light" ? "text-neutral-700" : "text-neutral-300"}`}>
                    Integrated Capabilities Included:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPreview.features.map((feat, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-2 p-2 rounded-lg text-xs font-medium ${
                          currentPreview.themeStyle === "light" 
                            ? "bg-white border border-slate-200/80 text-neutral-800" 
                            : "bg-white/[0.04] border border-white/[0.06] text-neutral-200"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commercial Safeguard Callout */}
                <div className={`mt-4 p-3 rounded-lg text-xs flex items-center justify-between ${
                  currentPreview.themeStyle === "light"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    : "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                }`}>
                  <span className="font-semibold">
                    🛡️ Guarantee: 50% Upfront, 50% only after 30-Point QA Pass
                  </span>
                  <span className="font-bold underline text-[11px]">
                    {getTierLabel(budgetTier).split(" ")[0]}
                  </span>
                </div>

              </div>

              {/* The Direct 1-Click WhatsApp CTA */}
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs text-neutral-400">Selected Blueprint Ready:</p>
                  <p className="text-sm font-bold text-white">
                    {getSystemLabel(systemType)} · {getTierLabel(budgetTier).split(" ")[0]}
                  </p>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("visual_studio_cta")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm shadow-[0_0_24px_rgba(16,185,129,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Claim My 24-Hour Concept Preview on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
