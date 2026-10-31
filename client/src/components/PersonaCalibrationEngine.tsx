import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Factory, 
  Store, 
  Rocket, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CreditCard 
} from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export type PersonaId = "factory" | "shop" | "startup" | "practice";

interface PersonaConfig {
  id: PersonaId;
  label: string;
  tag: string;
  icon: any;
  heroLine: string;
  subhead: string;
  priceBand: string;
  priceNote: string;
  whatsappPrefill: string;
  ctaText: string;
  servicesTab: string;
  deliverables: string[];
  simulationTitle: string;
  simulationSnippet: {
    badge: string;
    sender: string;
    time: string;
    message: string;
    reply: string;
    outcome: string;
  };
}

const PERSONAS: Record<PersonaId, PersonaConfig> = {
  factory: {
    id: "factory",
    label: "Factory & B2B",
    tag: "Manufacturing · Wholesale · OEM",
    icon: Factory,
    heroLine: "A customer sends an enquiry. You send the quote in 90 seconds, not 2 days.",
    subhead: "No enquiry lost in a salesman's phone. Every quote, ledger, and order in one place you own.",
    priceBand: "From ₹35,000",
    priceNote: "One-time build · Zero per-user monthly rent · Prototype in 48 hours",
    whatsappPrefill: "I make [product]. I lose enquiries. Show me how a quote system would work.",
    ctaText: "Send one enquiry, see it work",
    servicesTab: "smb",
    deliverables: [
      "Instant WhatsApp quotation generator (Send PDF estimates in 90 seconds)",
      "Native Tally Prime ledger & inventory reconciliation bridge",
      "Multi-warehouse order dispatch & dispatch pipeline tracking",
      "Sales team lead locking (Zero customer data leakage to competitors)"
    ],
    simulationTitle: "The 90-Second RFQ Workflow",
    simulationSnippet: {
      badge: "LIVE PIPELINE",
      sender: "Purchase Manager (Ludhiana)",
      time: "4:15 PM",
      message: "Need 500 units of Part #B-402, 12mm thickness with GST invoice.",
      reply: "Automated RFQ generated with tiered pricing & dispatch date: PDF Estimate sent (₹1,42,500).",
      outcome: "✓ Customer accepted quote. Tally sales order drafted automatically."
    }
  },
  shop: {
    id: "shop",
    label: "Shop & Retail",
    tag: "Retail Outlets · Salons · Showrooms",
    icon: Store,
    heroLine: "Be the shop people find first on Google Maps.",
    subhead: "Google listing, a fast site and instant WhatsApp replies, set up for you. From ₹4,999.",
    priceBand: "From ₹4,999",
    priceNote: "Fixed setup · No ongoing monthly retainer · Live in 48 hours",
    whatsappPrefill: "Hi, I run a [type] shop in [city]. I want more walk-ins from Google.",
    ctaText: "Send your shop name",
    servicesTab: "scaleops",
    deliverables: [
      "Google Maps Local 3-Pack setup (Rank #1 when customers search nearby)",
      "Sub-1.2s mobile digital storefront with your products & pricing",
      "24/7 automated WhatsApp catalog reply & lead capture",
      "Direct UPI QR codes & zero-commission payment collection"
    ],
    simulationTitle: "Local Walk-In & WhatsApp Capture",
    simulationSnippet: {
      badge: "NEARBY SEARCH",
      sender: "Local Buyer (2 km away)",
      time: "8:45 PM",
      message: "Do you have formal linen shirts in size 42 available tonight?",
      reply: "Yes! Here is our current in-store catalog with sizes and directions to our shop.",
      outcome: "✓ Directions opened on Google Maps. Walk-in customer converted."
    }
  },
  startup: {
    id: "startup",
    label: "Startup & Brand",
    tag: "D2C · Tech · Online Services",
    icon: Rocket,
    heroLine: "See your product working in 48 hours.",
    subhead: "Pay for the build once. No per-user fees afterwards. Full source handover.",
    priceBand: "From ₹25,000",
    priceNote: "Prototype in 48h · Zero monthly software tax · Full IP ownership",
    whatsappPrefill: "My idea: [one line]. Can you prototype it?",
    ctaText: "Tell Mukul the idea",
    servicesTab: "smb",
    deliverables: [
      "Working interactive web prototype delivered in 48 hours",
      "Zero-seat custom CRM (Eliminates ₹30,000/mo SaaS subscription taxes)",
      "Sub-second load speed optimized for high-converting ad traffic",
      "Private bank-grade database vault with complete source code handover"
    ],
    simulationTitle: "48-Hour Velocity Sprint",
    simulationSnippet: {
      badge: "PROTOTYPE SPRINT",
      sender: "Founder (Bangalore / Delhi)",
      time: "Day 1, 10 AM",
      message: "Need an automated booking platform with WhatsApp alerts and Razorpay.",
      reply: "Prototype architected and live on staging URL in 46 hours. Ready for user testing.",
      outcome: "✓ First 50 beta users onboarded. Zero recurring per-seat fees."
    }
  },
  practice: {
    id: "practice",
    label: "Clinic & Practice",
    tag: "Doctors · Architects · Consultants",
    icon: Stethoscope,
    heroLine: "Clients book you without calling your office.",
    subhead: "A professional page, online appointments and automatic reminders. From ₹15,000.",
    priceBand: "From ₹15,000",
    priceNote: "100% compliant with professional council regulations · Turnkey setup",
    whatsappPrefill: "I run a [practice]. How would online booking work for me?",
    ctaText: "Ask Mukul how it works",
    servicesTab: "scaleops",
    deliverables: [
      "24/7 automated online appointment scheduling (Syncs with Google Calendar)",
      "Automated WhatsApp booking confirmations and 2-hour reminder alerts",
      "Verified patient / client review showcase that builds organic authority",
      "Zero-solicitation regulatory compliance (Strictly appointments & reminders)"
    ],
    simulationTitle: "Automated Consultation Scheduling",
    simulationSnippet: {
      badge: "PATIENT GATEWAY",
      sender: "Client / Patient",
      time: "10:30 PM",
      message: "Need a consultation appointment for Wednesday afternoon.",
      reply: "Wednesday 3:30 PM slot reserved. Appointment confirmed. Clinic location pinned.",
      outcome: "✓ Appointment booked without staff intervention. Reminder scheduled."
    }
  }
};

export default function PersonaCalibrationEngine() {
  const [activePersona, setActivePersona] = useState<PersonaId>("factory");

  useEffect(() => {
    // Check URL parameter first (e.g. ?for=factory)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const forParam = params.get("for") as PersonaId;
      if (forParam && PERSONAS[forParam]) {
        setActivePersona(forParam);
        return;
      }

      // Check localStorage
      const saved = localStorage.getItem("sagedo_persona") as PersonaId;
      if (saved && PERSONAS[saved]) {
        setActivePersona(saved);
      }
    }
  }, []);

  const selectPersona = (id: PersonaId) => {
    setActivePersona(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("sagedo_persona", id);
      const url = new URL(window.location.href);
      url.searchParams.set("for", id);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const current = PERSONAS[activePersona];
  const IconComponent = current.icon;

  return (
    <section className="py-20 px-4 bg-[#050608] border-b border-white/10 relative overflow-hidden">
      {/* Background radial highlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Question */}
        <div className="text-center mb-10">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3">
            <Zap className="w-3.5 h-3.5 mr-1.5 inline" /> 1-Tap Experience Calibration
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What do you run?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl mx-auto">
            Tap your business type. SAGE DO instantly adapts to your daily operational reality.
          </p>
        </div>

        {/* 4 Interactive Selector Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {(Object.keys(PERSONAS) as PersonaId[]).map((key) => {
            const p = PERSONAS[key];
            const isSelected = activePersona === key;
            const TileIcon = p.icon;

            return (
              <button
                key={key}
                type="button"
                onClick={() => selectPersona(key)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border-amber-500 shadow-lg shadow-amber-500/10 -translate-y-1"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 m-2.5 shadow-sm shadow-amber-400" />
                )}
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-amber-500 text-black font-bold" : "bg-white/5 text-neutral-400"
                  }`}>
                    <TileIcon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold leading-tight ${
                    isSelected ? "text-white" : "text-neutral-300"
                  }`}>
                    {p.label}
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 leading-tight">
                  {p.tag}
                </p>
              </button>
            );
          })}
        </div>

        {/* Morphed Active State Display Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Customized Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <IconComponent className="w-3.5 h-3.5" />
                <span>Calibrated for {current.label}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {current.heroLine}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {current.subhead}
              </p>

              {/* Pricing Band Badge */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Pricing Anchor</span>
                  <div className="text-2xl font-black text-amber-400">{current.priceBand}</div>
                </div>
                <span className="text-xs text-neutral-400 sm:text-right font-medium">
                  {current.priceNote}
                </span>
              </div>

              {/* 4 Tangible Deliverables */}
              <ul className="space-y-3 pt-1">
                {current.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/916284925684?text=${encodeURIComponent(current.whatsappPrefill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`persona_${activePersona}_cta`)}
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto h-12 px-6 bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-green-600/20 cursor-pointer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {current.ctaText} →
                  </Button>
                </a>
                <Link href={`/services?tab=${current.servicesTab}`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto h-12 px-5 border-white/20 hover:bg-white/5 text-white font-semibold text-xs sm:text-sm rounded-xl cursor-pointer">
                    View Package Details
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Concrete Operational Simulation */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#090b10] border border-white/10 relative shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {current.simulationTitle}
                  </span>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                    {current.simulationSnippet.badge}
                  </Badge>
                </div>

                {/* Simulated Inquiry */}
                <div className="space-y-4 text-xs font-sans">
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/5 text-neutral-300">
                    <div className="flex justify-between items-center text-[10px] text-neutral-500 mb-1">
                      <span className="font-bold text-neutral-400">{current.simulationSnippet.sender}</span>
                      <span>{current.simulationSnippet.time}</span>
                    </div>
                    <p className="text-neutral-200">
                      "{current.simulationSnippet.message}"
                    </p>
                  </div>

                  {/* Automated SAGE DO Execution */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-neutral-200 pl-4 border-l-4 border-l-amber-500">
                    <div className="flex justify-between items-center text-[10px] text-amber-400 font-bold mb-1">
                      <span>⚡ SAGE DO SYSTEM RESPONSE</span>
                      <span>Under 45s</span>
                    </div>
                    <p className="text-neutral-200">
                      {current.simulationSnippet.reply}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                    {current.simulationSnippet.outcome}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-center">
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Zero manual effort · Custom built for your business
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
