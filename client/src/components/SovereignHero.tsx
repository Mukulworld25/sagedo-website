import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Zap, MessageCircle, Gauge, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

type PersonaKey = "default" | "factory" | "retail" | "startup" | "clinic";

const PERSONA_CONFIG: Record<PersonaKey, { sub: string }> = {
  default: {
    sub: "We build the software that answers, quotes and follows up for you. You own it. No monthly fee per employee."
  },
  factory: {
    sub: "Custom RFQ portals and WhatsApp dispatch pipes for Indian precision manufacturers and exporters. Enquiry in, quote out in 90 seconds."
  },
  retail: {
    sub: "Automated rate cards, catalog delivery, and order intake that turns late-night WhatsApp chats into morning bank deposits."
  },
  startup: {
    sub: "Custom MVPs, client portals, and zero-seat CRMs shipped in 48 hours. 100% code sovereignty."
  },
  clinic: {
    sub: "0.8s mobile patient booking webfronts with automated WhatsApp reminders and zero app download friction."
  }
};

export default function SovereignHero() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("default");

  const { sub } = PERSONA_CONFIG[activePersona];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#030303] text-white pt-24 pb-12 px-4 font-sans">
      
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, #150606 0%, #030303 75%)' }} 
      />

      {/* Center SAGE DO AI Core Logo */}
      <picture className="contents">
        <source media="(max-width: 767px)" srcSet="/sagedo_logo_mobile.webp" type="image/webp" />
        <source srcSet="/sagedo_logo_final_circle.webp" type="image/webp" />
        <img
          src="/sagedo_logo_final_circle.png"
          alt="SAGE DO Sovereign AI Core"
          className="hero-logo-bg"
          // @ts-ignore
          fetchpriority="high"
          loading="eager"
          decoding="async"
          width="600"
          height="600"
        />
      </picture>

      {/* Background HUD Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        <div className="hero-ring hero-ring-outer" />
        <div className="hero-ring hero-ring-target" />
        <div className="hero-ring hero-ring-data" />
      </div>

      {/* Corner Brackets */}
      <div className="hero-corner" style={{ top: 25, left: 25, borderWidth: '2px 0 0 2px' }} />
      <div className="hero-corner" style={{ top: 25, right: 25, borderWidth: '2px 2px 0 0' }} />
      <div className="hero-corner" style={{ bottom: 25, left: 25, borderWidth: '0 0 2px 2px' }} />
      <div className="hero-corner" style={{ bottom: 25, right: 25, borderWidth: '0 2px 2px 0' }} />

      {/* Main Foreground Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
        
        {/* LINE 1: SPEED OF AI (Mukul's Iconic Inviolable Tagline) */}
        <h1
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2.5rem, 7vw, 8.5rem)',
            letterSpacing: '0.05em',
            lineHeight: 0.85,
            background: 'linear-gradient(180deg, #fff 10%, #ccc 50%, #666 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
          }}
        >
          SPEED OF{' '}
          <span style={{ color: '#ef4444', WebkitTextFillColor: '#ef4444', textShadow: '0 0 40px #ef4444' }}>
            AI
          </span>
        </h1>

        {/* Animated Loading Bar Separator */}
        <div className="hero-sep" />

        {/* LINE 2: PRECISION OF HUMANS */}
        <p
          className="font-bold uppercase leading-none"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(1.5rem, 4.1vw, 4.8rem)',
            letterSpacing: '0.08em',
            lineHeight: 0.85,
            background: 'linear-gradient(180deg, #aaa 0%, #555 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
          }}
        >
          PRECISION OF HUMANS
        </p>

        {/* Supporting badge */}
        <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-mono tracking-widest uppercase">
          AI-Powered · Human-Crafted · India
        </p>

        {/* Value Proposition Description */}
        <p 
          key={sub}
          className="mt-5 text-sm sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-light animate-in fade-in duration-300"
        >
          {sub}
        </p>

        {/* 1-Tap Persona Calibration Strip */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 mb-2.5">
            Custom business systems engineered for:
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center max-w-2xl">
            {[
              { key: "factory", label: "🏭 Factory & B2B" },
              { key: "retail", label: "🏪 Shop & Retail" },
              { key: "startup", label: "🚀 Startup & D2C" },
              { key: "clinic", label: "🩺 Clinic & Practice" }
            ].map((persona) => (
              <button
                key={persona.key}
                type="button"
                onClick={() => setActivePersona(activePersona === persona.key ? "default" : (persona.key as PersonaKey))}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePersona === persona.key
                    ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/25"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                }`}
              >
                {persona.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Systematic Action Buttons (Book a Call, Services, Free Demo, Test Speed) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 flex-wrap">
          {/* 1. Book a Call / WhatsApp */}
          <a 
            href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20book%20a%20call%20to%20discuss%20my%20project." 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('hero_cta_book_call')}
          >
            <div 
              className={buttonVariants({ size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-sm sm:text-base font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] cursor-pointer" })}
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '1.5px' }}
            >
              <Phone className="mr-2 h-4 w-4" /> BOOK A CALL
            </div>
          </a>

          {/* 2. Services Link */}
          <Link href="/services">
            <div 
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-sm sm:text-base font-bold rounded-xl border-white/20 hover:border-white/50 hover:bg-white/5 text-white transition-all cursor-pointer" })}
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '1.5px' }}
            >
              <ArrowRight className="mr-2 h-4 w-4" /> SERVICES
            </div>
          </Link>

          {/* 3. Free Demo Link */}
          <Link href="/free-demo">
            <div 
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-sm sm:text-base font-bold rounded-xl border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 text-amber-400 hover:text-amber-300 transition-all cursor-pointer" })}
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '1.5px' }}
            >
              <Zap className="mr-2 h-4 w-4" /> FREE DEMO
            </div>
          </Link>

          {/* 4. Test Speed Anchor Link */}
          <a href="#speed-audit">
            <div 
              className={buttonVariants({ variant: "ghost", size: "lg", className: "h-12 sm:h-13 px-5 text-xs sm:text-sm font-mono text-neutral-400 hover:text-white transition-all cursor-pointer" })}
            >
              <Gauge className="mr-2 h-4 w-4 text-emerald-400" /> TEST SPEED
            </div>
          </a>
        </div>

      </div>

      {/* Bottom Proof Strip */}
      <div className="relative z-10 pt-8 border-t border-white/[0.06] max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>150+ Indian Systems Shipped</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100% Code &amp; Server Sovereignty</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Second Half Paid Only After Verification</span>
        </div>
      </div>

    </section>
  );
}
