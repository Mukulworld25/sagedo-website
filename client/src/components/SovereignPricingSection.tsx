import React from "react";
import { CheckCircle2, CreditCard, MessageCircle, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useCurrency } from "@/contexts/CurrencyContext";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import { buttonVariants } from "@/components/ui/button";

export default function SovereignPricingSection() {
  const { formatAmount } = useCurrency();

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#04060A] border-t border-b border-white/[0.08] relative overflow-hidden text-white font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Chapter 06 Header — Claude B2B Plain Wording */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>06 / 06 · Commercial Terms</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Three prices. No surprises. Half after it works.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 mt-4 leading-relaxed font-light">
            50% to start. 50% after you've tested it and Mukul has signed the release certificate. Hosting is about ₹800 a month on your own server.
          </p>
        </div>

        {/* 3 Pricing Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          
          {/* Tier 1: ₹45,000 · Fix one problem */}
          <div className="p-8 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                INBOUND SUITE
              </span>
              <h3 className="text-2xl font-bold mt-2 mb-1 text-white">Digital Presence Engine</h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono">Delivered in 14 days · Fix one problem</p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black text-white">{formatAmount(45000)}</span>
                <span className="text-neutral-400 text-xs font-mono">one-time</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-6">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>3 milestone installments available</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-neutral-300 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Mobile Web Storefront (Sub-1.2s 4G LCP)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Cloud API Lead Webhook</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive Dynamic Calculator / Quoter</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated Founder WhatsApp Lead Alerts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SSL + High-Performance Edge Hosting Setup</span>
                </li>
              </ul>
            </div>

            <Link href="/orders?service=Digital%20Presence%20Engine&price=45000">
              <div className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl text-xs font-bold font-mono tracking-wider uppercase cursor-pointer hover:bg-white/10 border-white/20 text-white" })}>
                Deploy Now
              </div>
            </Link>
          </div>

          {/* Tier 2: ₹1,50,000 · Run your sales (FLAGSHIP ASSET) */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-amber-500/[0.08] via-[#0B0F17] to-[#0B0F17] border-2 border-amber-500/60 shadow-[0_0_60px_-15px_rgba(245,158,11,0.25)] flex flex-col justify-between transform md:-translate-y-3">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-black px-4 py-0.5 rounded-full text-[11px] font-mono font-black uppercase tracking-wider shadow-md">
              MOST POPULAR · FLAGSHIP
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                SALES OPERATING SYSTEM
              </span>
              <h3 className="text-2xl font-bold mt-2 mb-1 text-white">Sovereign Revenue Engine™</h3>
              <p className="text-xs text-amber-300/80 mb-6 font-mono font-medium">Delivered in 28 days · Run your sales</p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black text-white">{formatAmount(150000)}</span>
                <span className="text-neutral-400 text-xs font-mono">one-time</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mb-6">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>3 milestone installments available</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-neutral-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Full Custom CRM (Zero Per-Seat Monthly Fees)</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Unlimited Seats &amp; Role-Based Access (RBAC)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Automated WhatsApp Lead Routing &amp; Tracking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Native Tally Prime / ERP Bridge Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Real-Time Margin &amp; Sales Velocity Dashboard</span>
                </li>
              </ul>
            </div>

            <Link href="/orders?service=Sovereign%20Revenue%20Engine%E2%84%A2&price=150000">
              <div className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black font-mono tracking-wider uppercase rounded-xl text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer">
                Hire Your Team
              </div>
            </Link>
          </div>

          {/* Tier 3: ₹3,50,000 · Run your operations */}
          <div className="p-8 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                ENTERPRISE SUITE
              </span>
              <h3 className="text-2xl font-bold mt-2 mb-1 text-white">Enterprise Infrastructure</h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono">Delivered in 45–60 days · Run your operations</p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black text-white">{formatAmount(350000)}</span>
                <span className="text-neutral-400 text-xs font-mono">one-time</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-6">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>3 milestone installments available</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-neutral-300 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Deep Bi-directional Tally Prime &amp; Ledger Sync</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-Branch Quotation &amp; Dispatch Workflows</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom AI OCR Document Processing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sovereign VPS Deployment (Zero Data Retention)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority 2-Hour P1 Dedicated Server SLA</span>
                </li>
              </ul>
            </div>

            <Link href="/orders?service=Enterprise%20Infrastructure&price=350000">
              <div className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl text-xs font-bold font-mono tracking-wider uppercase cursor-pointer hover:bg-white/10 border-white/20 text-white" })}>
                Become a Titan
              </div>
            </Link>
          </div>

        </div>

        {/* Claude's Closer Box & Commercial Hotline Trigger */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-500/[0.08] via-[#0B0F17] to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Not sure which one? Send us one problem.
            </h4>
            <p className="text-sm text-neutral-300 max-w-xl font-light">
              You get a straight answer on WhatsApp, even if the honest answer is "buy Zoho." No sales pressure, no junior reps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a 
              href="https://wa.me/916284925684?text=Hi%20SAGE%20DO!%20I%20have%20a%20specific%20business%20bottleneck.%20Can%20you%20give%20me%20a%20straight%20answer%20on%20what%20I%20need%3F" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('pricing_bottom_cta')}
              className="inline-flex items-center justify-center gap-2 h-13 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider whitespace-nowrap w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Commercial Desk</span>
            </a>
            <a 
              href="tel:+916284925684"
              className="inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl border border-white/20 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs cursor-pointer whitespace-nowrap w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 62849 25684</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
