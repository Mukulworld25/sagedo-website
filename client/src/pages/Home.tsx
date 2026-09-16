// Premium Homepage - Bhindi-style clean design
// Like a jeweler engraving a diamond ✨

import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Star, Gift, ChevronRight, Briefcase, GraduationCap, User, Sparkles, MessageCircle, Phone, ExternalLink, Shield, Clock, Handshake, CreditCard, Globe, Smartphone, Store, AlertOctagon, ShieldCheck } from "lucide-react";
import React, { useState, Suspense, lazy } from "react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import { useCurrency } from "@/contexts/CurrencyContext";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const RevenueLeakageCalculator = lazy(() => import("@/components/RevenueLeakageCalculator"));

export default function Home() {
  const { formatAmount } = useCurrency();
  const [activeStep, setActiveStep] = useState(1);

  const categories = [
    { name: "Business Growth", count: "12", description: "Websites, ads, landing pages & funnels", icon: <Briefcase className="w-6 h-6 text-primary" /> },
    { name: "Startup Launch", count: "6", description: "MVP development, pitches & wireframing", icon: <Zap className="w-6 h-6 text-primary" /> },
    { name: "Executive Branding", count: "8", description: "LinkedIn branding, executive bios & PR", icon: <User className="w-6 h-6 text-primary" /> },
    { name: "AI Automation", count: "6", description: "CRM setup, workflow bots & scraping", icon: <Sparkles className="w-6 h-6 text-primary" /> }
  ];

  const steps = [
    { step: 1, title: "Submit Your Problem", description: "Describe your challenge in plain English or Hindi.", demo: "Tell us what you need..." },
    { step: 2, title: "AI Analysis", description: "Our system instantly analyzes and finds the best solution.", demo: "Processing with AI + Human expertise..." },
    { step: 3, title: "Receive Your Answer", description: "Get a clear, actionable solution sent right back to you.", demo: "Your solution is ready! ✅" }
  ];

  const testimonials = [
    { name: "Priya Singh", role: "Verified Trustpilot Review ⭐", text: "Sagedo is an easy-to-use and efficient platform that helps simplify tasks and save time. It has a clean interface and smooth onboarding. I've had a great experience with Sagedo.", rating: 5 },
    { name: "Akshit Kashyap", role: "Verified Trustpilot Review ⭐", text: "Why AI is important. Everything is fine, nice service, very good behaviour. What a cool and knowledgeable experience to know about AI.", rating: 5 },
    { name: "Arushi Vashist", role: "Verified Trustpilot Review ⭐", text: "Very reliable. Their service and everything were good.", rating: 4 },
    { name: "Tahira War", role: "Verified Trustpilot Review ⭐", text: "Everything was good overall. Good service provider.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - V13 Arc Reactor / AI Tech Design
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#030303' }}>

        {/* Background radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #1a0505 0%, #030303 70%)' }} />

        {/* Center Logo (background, visible, responsive WebP + fetchpriority high) */}
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

        {/* HUD Rings */}
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

        {/* Foreground Content */}
        <div className="relative z-10 text-center flex flex-col items-center px-4">

          {/* LINE 1: SPEED OF AI */}
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

          {/* Supporting text */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto" style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: '2px' }}>
            AI-Powered · Human-Crafted · India
          </p>

          {/* CTA Buttons - 3 Systematic Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a 
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20book%20a%20call%20to%20discuss%20my%20project." 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero_cta')}
            >
              <div className={buttonVariants({ size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-base sm:text-lg font-semibold bg-red-600 hover:bg-red-500 rounded-xl transition-all hover:scale-[1.02] hover:-translate-y-0.5 group cursor-pointer" })}
                style={{ boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)', fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
              >
                <Phone className="mr-2 h-5 w-5" /> BOOK A CALL
              </div>
            </a>
            <Link href="/services">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-base sm:text-lg font-semibold rounded-xl border-white/20 hover:border-white/50 hover:bg-white/5 text-white transition-all cursor-pointer" })}
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
              >
                <ArrowRight className="mr-2 h-5 w-5" /> SERVICES
              </div>
            </Link>
            <Link href="/free-audit">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 sm:h-13 px-6 sm:px-7 text-base sm:text-lg font-semibold rounded-xl border-green-500/40 hover:border-green-400 hover:bg-green-500/10 text-green-400 hover:text-green-300 transition-all cursor-pointer" })}
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
              >
                <Zap className="mr-2 h-5 w-5" /> FREE AUDIT
              </div>
            </Link>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ELITE TRUST STRIP - Safe Positioning (Built For, Not Used By)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-white/5 bg-black py-4 overflow-hidden relative z-20">
        <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-20" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-neutral-500">
            Engineered for the Top 1% of
          </p>
          <div className="flex items-center gap-4 md:gap-12 flex-wrap justify-center">
            <span className="text-sm md:text-base font-black text-white uppercase tracking-widest opacity-80">Visionary Founders</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-700" />
            <span className="text-sm md:text-base font-black text-white uppercase tracking-widest opacity-80">High-Growth Startups</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-700" />
            <span className="text-sm md:text-base font-black text-white uppercase tracking-widest opacity-80">Elite Creators</span>
          </div>
        </div>
      </div>

      {/* NEW: The Execution Gap Section - Redesigned Center Comparison */}
      <section className="py-24 bg-neutral-900 border-y border-neutral-800 relative overflow-hidden">
        {/* Static Ambient background glow (Reduced Blur) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              The Execution Gap
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Why most projects fail before they launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way (Problem) */}
            <RevealOnScroll delay={0} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-950/50 border border-neutral-800/80 backdrop-blur-sm relative group overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-50" />
                <div>
                  <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                      <AlertOctagon className="w-5 h-5 text-red-400" />
                    </div>
                    The Old Way
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-neutral-200">Agencies</h4>
                        <p className="text-neutral-400">Expensive (₹2-5L), slow (60-90 days), and endless meetings.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-neutral-200">Freelancers</h4>
                        <p className="text-neutral-400">Unreliable, ghost mid-project, inconsistent quality.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-neutral-200">DIY & AI Tools</h4>
                        <p className="text-neutral-400">Steep learning curve, spent hours prompting, mediocre results.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* The SAGE DO Way (Solution) */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-900 border border-primary/30 relative group shadow-2xl shadow-primary/10 overflow-hidden transform md:-translate-y-4 h-full flex flex-col justify-between">
                {/* Glowing border effect */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    The SAGE DO Way
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-white">Hybrid Speed</h4>
                        <p className="text-neutral-300">AI speed + Human oversight = Agency quality in <span className="text-primary font-bold">24-48 hours</span>.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-white">Reliability</h4>
                        <p className="text-neutral-300">Dedicated project manager, daily updates, guaranteed delivery.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-white">Affordability</h4>
                        <p className="text-neutral-300">Prices that make sense (starting ₹0), pay only for results.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button inside card */}
                <div className="mt-8 pt-6 border-t border-primary/10 relative z-10">
                  <Link href="/services">
                    <div className={buttonVariants({ className: "w-full min-h-[44px] sm:min-h-0 bg-primary text-primary-foreground hover:bg-primary/90 font-bold hover:scale-[1.01] transition-all duration-200" })}>
                      Bridge the Gap Now <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          AI + HUMAN SECTION - Clean Institutional Positioning
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              Engineering Discernment
            </p>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl text-foreground font-medium leading-relaxed mb-6">
              "Why hire an execution partner when raw AI models are everywhere?"
            </blockquote>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Raw AI produces statistically plausible drafts; human systems engineers deliver verified revenue infrastructure.
              We prompt, architect, audit, and harden every deliverable so your business receives <span className="text-foreground font-medium">zero-defect, production-grade assets</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-semibold text-neutral-300">
              <span className="text-primary font-bold">Autonomous AI Speed</span>
              <span className="text-muted-foreground/50">+</span>
              <span className="text-white font-bold">Sovereign Human Verification</span>
              <span className="text-muted-foreground/50">=</span>
              <span className="text-emerald-400 font-bold">Zero Hallucination Delivery</span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SELECTED WORK / PORTFOLIO - Trust Builder
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 px-6 border-t border-border/30 bg-gradient-to-b from-neutral-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Our Work
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Built by Us. Trusted by Founders.
            </h2>
            <p className="text-lg text-muted-foreground">
              Real projects. Real results. See what we ship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Project 1 - SAGE DO Website */}
            <RevealOnScroll delay={0} className="h-full">
              <div className="group relative rounded-2xl border border-border/30 bg-background/50 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                    {/* Browser-chrome mockup frame */}
                    <div className="w-full h-full rounded-lg border border-red-500/20 bg-zinc-900/80 flex flex-col overflow-hidden shadow-sm">
                      {/* Top chrome bar */}
                      <div className="h-6 bg-zinc-900/95 border-b border-red-500/10 px-2.5 flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                        </div>
                        <div className="flex-1 max-w-[130px] mx-auto h-3.5 rounded bg-zinc-800/80 border border-white/5 flex items-center justify-center px-1.5">
                          <span className="text-[9px] text-zinc-400 font-mono tracking-tight truncate">sagedo.in</span>
                        </div>
                      </div>
                      {/* Mockup Screen (roughly 16:10, real screenshot) */}
                      <div className="flex-1 w-full bg-gradient-to-br from-red-950/20 via-zinc-900 to-neutral-950 relative overflow-hidden flex items-center justify-center">
                        <img
                          src="/portfolio-sagedo-prod.webp"
                          alt="sagedo.in SaaS Platform preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">SaaS Platform</span>
                    <h3 className="text-lg font-bold text-foreground mt-2">SAGE DO — AI Service Platform</h3>
                    <p className="text-sm text-muted-foreground mt-2">Full-stack AI + Human hybrid platform with 10 specialized execution engines, payment integration, and real-time tracking.</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <a href="https://sagedo.in" target="_blank" rel="noopener noreferrer" className="tap-inline inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                    View Live <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Project 2 - Mobile App */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="group relative rounded-2xl border border-border/30 bg-background/50 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
                    {/* Phone-frame mockup */}
                    <div className="h-full aspect-[9/19.5] rounded-[16px] border border-blue-400/20 bg-zinc-900/80 p-1 flex flex-col shadow-sm">
                      {/* Phone notch / camera dot */}
                      <div className="w-2.5 h-1 bg-zinc-700/70 rounded-full mx-auto my-0.5 flex-shrink-0" />
                      {/* Phone screen container */}
                      <div className="rounded-[12px] overflow-hidden flex-1 bg-gradient-to-b from-blue-950/40 via-zinc-900 to-neutral-950 flex items-center justify-center relative">
                        <img
                          src="/portfolio-android-app.webp"
                          alt="SAGE DO Android Mobile App Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Mobile App</span>
                    <h3 className="text-lg font-bold text-foreground mt-2">SAGE DO Mobile — Android</h3>
                    <p className="text-sm text-muted-foreground mt-2">Native Android app with push notifications, AI chat, order tracking, and admin dashboard.</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-400">
                    Available on Android
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Project 3 - Client Work */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="group relative rounded-2xl border border-border/30 bg-background/50 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 h-full flex flex-col justify-between">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                {/* Browser-chrome mockup frame */}
                <div className="w-full h-full rounded-lg border border-emerald-400/20 bg-zinc-900/80 flex flex-col overflow-hidden shadow-sm">
                  {/* Top chrome bar */}
                  <div className="h-6 bg-zinc-900/95 border-b border-emerald-400/10 px-2.5 flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600/70" />
                    </div>
                    <div className="flex-1 max-w-[130px] mx-auto h-3.5 rounded bg-zinc-800/80 border border-white/5 flex items-center justify-center px-1.5">
                      <span className="text-[9px] text-zinc-400 font-mono tracking-tight truncate">localbusiness.in</span>
                    </div>
                  </div>
                  {/* Designed placeholder mockup for Local Business */}
                  <div className="flex-1 w-full bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-neutral-950 relative overflow-hidden flex items-center justify-center">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='eg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f1f16'/%3E%3Cstop offset='50%25' stop-color='%23101412'/%3E%3Cstop offset='100%25' stop-color='%23090d0b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23eg)'/%3E%3Crect x='20' y='16' width='40' height='8' rx='2' fill='%2310b981' fill-opacity='0.6'/%3E%3Crect x='280' y='17' width='30' height='6' rx='2' fill='%2371717a' fill-opacity='0.4'/%3E%3Crect x='320' y='17' width='30' height='6' rx='2' fill='%2371717a' fill-opacity='0.4'/%3E%3Crect x='360' y='14' width='24' height='12' rx='3' fill='%2310b981' fill-opacity='0.3'/%3E%3Crect x='20' y='42' width='160' height='14' rx='3' fill='%23e4e4e7' fill-opacity='0.7'/%3E%3Crect x='20' y='62' width='220' height='7' rx='2' fill='%23a1a1aa' fill-opacity='0.4'/%3E%3Crect x='20' y='73' width='180' height='7' rx='2' fill='%23a1a1aa' fill-opacity='0.3'/%3E%3Crect x='20' y='88' width='60' height='14' rx='4' fill='%2310b981' fill-opacity='0.5'/%3E%3Crect x='20' y='116' width='110' height='110' rx='6' fill='%2318181b' fill-opacity='0.7' stroke='%2310b981' stroke-opacity='0.2' stroke-width='1'/%3E%3Ccircle cx='40' cy='136' r='8' fill='%2310b981' fill-opacity='0.2'/%3E%3Crect x='32' y='154' width='70' height='7' rx='2' fill='%23d4d4d8' fill-opacity='0.5'/%3E%3Crect x='32' y='167' width='85' height='5' rx='2' fill='%2371717a' fill-opacity='0.3'/%3E%3Crect x='145' y='116' width='110' height='110' rx='6' fill='%2318181b' fill-opacity='0.7' stroke='%2310b981' stroke-opacity='0.2' stroke-width='1'/%3E%3Ccircle cx='165' cy='136' r='8' fill='%2310b981' fill-opacity='0.2'/%3E%3Crect x='157' y='154' width='70' height='7' rx='2' fill='%23d4d4d8' fill-opacity='0.5'/%3E%3Crect x='157' y='167' width='85' height='5' rx='2' fill='%2371717a' fill-opacity='0.3'/%3E%3Crect x='270' y='116' width='110' height='110' rx='6' fill='%2318181b' fill-opacity='0.7' stroke='%2310b981' stroke-opacity='0.2' stroke-width='1'/%3E%3Ccircle cx='290' cy='136' r='8' fill='%2310b981' fill-opacity='0.2'/%3E%3Crect x='282' y='154' width='70' height='7' rx='2' fill='%23d4d4d8' fill-opacity='0.5'/%3E%3Crect x='282' y='167' width='85' height='5' rx='2' fill='%2371717a' fill-opacity='0.3'/%3E%3C/svg%3E"
                      alt="Local Business Starter Pack website preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Business Website</span>
                <h3 className="text-lg font-bold text-foreground mt-2">Local Business Starter Pack</h3>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <a 
                      href="https://wa.me/916284925684?text=Hi!%20I%20want%20to%20see%20more%20of%20your%20work." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackWhatsAppClick('portfolio_demo_cta')}
                      className="tap-inline inline-flex items-center gap-1 text-sm font-bold text-emerald-400 hover:underline"
                    >
                      Ask for Demo <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/about#wall-of-fame">
              <div className={buttonVariants({ variant: "outline", className: "font-bold px-6 h-12 rounded-xl cursor-pointer border-border/50 hover:bg-muted/50 gap-2 shadow-sm text-foreground hover:text-primary transition-colors" })}>
                See our delivered work →
              </div>
            </Link>
            <a 
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20discuss%20a%20project%20similar%20to%20what%20I%20saw%20on%20your%20portfolio." 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('portfolio_discuss_cta')}
            >
              <div className={buttonVariants({ className: "bg-green-600 hover:bg-green-500 text-white font-bold px-8 h-12 rounded-xl cursor-pointer" })}>
                <MessageCircle className="mr-2 h-5 w-5" /> Discuss Your Project on WhatsApp
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VALUE COMPARISON MATRIX - The "No-Brainer" Table
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500 mb-4">
              Stop Overpaying
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              The "Sovereign AI" Advantage
            </h2>
            <p className="text-lg text-muted-foreground">
              See why we are 10x faster and cheaper than the competition.
            </p>
          </div>

          {/* Desktop & Tablet Table (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-sm font-bold text-red-400 uppercase tracking-wider bg-red-500/5 rounded-t-xl">Freelancer (₹15k)</th>
                  <th className="p-4 text-sm font-bold text-orange-400 uppercase tracking-wider">Agency (₹5 Lakhs+)</th>
                  <th className="p-4 text-xl font-black text-primary uppercase tracking-wider bg-primary/10 rounded-t-xl border-t-2 border-primary">SAGE DO (From ₹45k)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Speed to Launch</td>
                  <td className="p-4 text-muted-foreground">30 Days (If lucky)</td>
                  <td className="p-4 text-muted-foreground">3-6 Months</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">⚡ 48 Hours</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Tech Stack</td>
                  <td className="p-4 text-muted-foreground">Basic Templates</td>
                  <td className="p-4 text-muted-foreground">Custom Code</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">💎 Enterprise AI Stack</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Strategy</td>
                  <td className="p-4 text-muted-foreground">None (Just Code)</td>
                  <td className="p-4 text-muted-foreground">₹1 Lakh+ Retainer</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🚀 Viral Launch Kit Included</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Risk</td>
                  <td className="p-4 text-red-400">High (Ghosting)</td>
                  <td className="p-4 text-orange-400">Low (Slow)</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🛡️ Zero (Guaranteed)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Support</td>
                  <td className="p-4 text-muted-foreground">Email Only</td>
                  <td className="p-4 text-muted-foreground">Account Manager</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20 rounded-b-xl border-b-2">🤝 AI + Founder Access</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards (Shown only below sm: 640px) */}
          <div className="block sm:hidden space-y-4">
            {/* SAGE DO Highlight Card */}
            <div className="p-5 rounded-2xl border-2 border-primary bg-primary/10 shadow-lg shadow-primary/10 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/20 px-2.5 py-1 rounded-full inline-block mb-1">
                    ★ Sovereign AI Advantage
                  </span>
                  <h3 className="text-xl font-black text-white">SAGE DO</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">From ₹45,000</span>
                </div>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-muted-foreground">Speed to Launch</span>
                  <span className="font-bold text-green-400">⚡ 48 Hours</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-muted-foreground">Tech Stack</span>
                  <span className="font-bold text-green-400">💎 Enterprise AI Stack</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-muted-foreground">Strategy</span>
                  <span className="font-bold text-green-400">🚀 Viral Launch Kit Included</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="font-bold text-green-400">🛡️ Zero (Guaranteed)</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-muted-foreground">Support</span>
                  <span className="font-bold text-green-400">🤝 AI + Founder Access</span>
                </div>
              </div>
            </div>

            {/* Freelancer Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/40">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-bold text-neutral-300">Freelancer</h3>
                <span className="text-xs font-medium text-red-400">₹15,000</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Speed to Launch</span>
                  <span className="text-neutral-400">30 Days (If lucky)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Tech Stack</span>
                  <span className="text-neutral-400">Basic Templates</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Strategy</span>
                  <span className="text-neutral-400">None (Just Code)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="text-red-400 font-medium">High (Ghosting)</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-muted-foreground">Support</span>
                  <span className="text-neutral-400">Email Only</span>
                </div>
              </div>
            </div>

            {/* Traditional Agency Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/40">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-bold text-neutral-300">Traditional Agency</h3>
                <span className="text-xs font-medium text-orange-400">₹5 Lakhs+</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Speed to Launch</span>
                  <span className="text-neutral-400">3-6 Months</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Tech Stack</span>
                  <span className="text-neutral-400">Custom Code</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Strategy</span>
                  <span className="text-neutral-400">₹1 Lakh+ Retainer</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="text-orange-400 font-medium">Low (Slow)</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-muted-foreground">Support</span>
                  <span className="text-neutral-400">Account Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Duplicate tables removed — keeping only the first one above */}

      <section className="py-24 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Pricing Options
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the package to launch or scale your business. Fixed pricing, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Digital Presence Engine */}
            <RevealOnScroll delay={0} className="h-full">
              <div className="relative p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Inbound Suite</span>
                  <h3 className="text-2xl font-bold mt-2 mb-1">Digital Presence Engine</h3>
                  <p className="text-xs text-muted-foreground mb-6">Delivered in 14 days</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black">{formatAmount(45000)}</span>
                    <span className="text-muted-foreground text-xs">one-time</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-6">
                    <CreditCard className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>3 milestone installments available (from {formatAmount(15000)}/mo)</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Custom Mobile Web Storefront (Sub-1.2s LCP)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>WhatsApp Cloud API Lead Webhook</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Interactive Dynamic Calculator / Quoter</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Automated Founder WhatsApp Lead Alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>SSL + High-Performance Edge Setup</span>
                    </li>
                  </ul>
                </div>
                <Link href="/orders?service=Digital%20Presence%20Engine&price=45000">
                  <div className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl text-md font-semibold cursor-pointer hover:scale-[1.01] transition-all duration-200" })}>
                    Deploy Now
                  </div>
                </Link>
              </div>
            </RevealOnScroll>

            {/* Sovereign Revenue Engine™ Package */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="relative p-8 rounded-3xl border-2 border-amber-500/70 bg-gradient-to-b from-amber-500/[0.08] via-amber-500/[0.03] to-transparent backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(245,158,11,0.22)] flex flex-col justify-between transform md:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.32)] h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/25 whitespace-nowrap">
                  MOST POPULAR
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Flagship Asset</span>
                  <h3 className="text-2xl font-bold mt-2 mb-1 text-white">Sovereign Revenue Engine™</h3>
                  <p className="text-xs text-amber-300/80 mb-6 font-medium">Delivered in 28 days</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black text-white">{formatAmount(150000)}</span>
                    <span className="text-muted-foreground text-xs">one-time</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium mb-6">
                    <CreditCard className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                    <span>3 milestone installments available (from {formatAmount(50000)}/mo)</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Full Custom CRM (Zero Per-Seat Fees)</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Unlimited Seats & Role-Based Access (RBAC)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Automated WhatsApp Lead Routing & Tracking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Native Tally Prime / ERP Bridge Integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Real-Time Margin & Sales Velocity Dashboard</span>
                    </li>
                  </ul>
                </div>
                <Link href="/orders?service=Sovereign%20Revenue%20Engine%E2%84%A2&price=150000">
                  <div className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-black rounded-xl text-md shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                    Hire Your Team
                  </div>
                </Link>
              </div>
            </RevealOnScroll>

            {/* Enterprise Infrastructure Package */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="relative p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Enterprise Suite</span>
                  <h3 className="text-2xl font-bold mt-2 mb-1">Enterprise Infrastructure</h3>
                  <p className="text-xs text-muted-foreground mb-6">Delivered in 45–60 days</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black">{formatAmount(350000)}</span>
                    <span className="text-muted-foreground text-xs">one-time</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-6">
                    <CreditCard className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>3 milestone installments available (from {formatAmount(116667)}/mo)</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span><strong>Deep Bi-directional Tally Prime & Ledger Sync</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Multi-Branch Quotation & Dispatch Workflows</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Custom AI OCR Document Processing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Sovereign VPS Deployment (Zero-Data-Retention)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Priority 2-Hour P1 Dedicated Server SLA</span>
                    </li>
                  </ul>
                </div>
                <Link href="/orders?service=Enterprise%20Infrastructure&price=350000">
                  <div className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl text-md font-semibold cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors hover:scale-[1.01] duration-200" })}>
                    Become a Titan
                  </div>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Revenue Leakage Calculator (Category C Feature) */}
      <Suspense fallback={<div className="py-16 text-center text-xs text-muted-foreground/60">Loading calculator...</div>}>
        <RevenueLeakageCalculator />
      </Suspense>


      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS - Interactive Steps (Bhindi Style)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Get Your Solution in 3 Clicks
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, fast, done... like you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Steps */}
            <div className="space-y-4">
              {steps.map((item) => (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${activeStep === item.step
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-colors ${activeStep === item.step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 transition-colors ${activeStep === item.step ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-all ${activeStep === item.step ? 'text-primary rotate-90' : 'text-muted-foreground'
                      }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Right - Demo Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-destructive/20 rounded-3xl blur-2xl opacity-30" />
              <div className="relative bg-slate-900 rounded-3xl border border-border/50 p-8 overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-muted-foreground font-mono">SAGE DO AI</span>
                </div>

                {/* Demo Content */}
                <div className="font-mono text-sm space-y-3">
                  <div className="text-green-400">$ sagedo process --input</div>
                  <div className="text-muted-foreground pl-4 animate-pulse">
                    {steps.find(s => s.step === activeStep)?.demo}
                  </div>
                  {activeStep === 3 && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <p className="text-green-400 font-semibold">✓ Task completed successfully!</p>
                      <p className="text-muted-foreground text-xs mt-1">Delivered in 23 hours</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CATEGORIES - Clean Grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Most In-Demand Services
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              What Indian Businesses Are Buying Right Now
            </h2>
            <p className="text-lg text-muted-foreground">
              Backed by 2025–26 search demand data across 500M+ Indian users.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Google Listing & SEO / GEO / AEO",
                sub: "Local 3-Pack · Maps · AI Search Engines",
                desc: "Get found on Google Maps & recommended by ChatGPT, Perplexity & AI Search. Dominate local search.",
                icon: "📍",
                color: "from-amber-500/20 via-amber-500/10 to-transparent",
                border: "border-amber-500/50 shadow-[0_0_35px_-8px_rgba(245,158,11,0.35)] md:-translate-y-2 group-hover:border-amber-500/80",
                text: "text-amber-400 group-hover:text-amber-300",
                badge: "High Demand",
                badgeClass: "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold",
                sample: "/sample-seo-google-maps.png",
                cite: "Source: BrightLocal 2026 — 97% search locally first"
              },
              {
                name: "Business Website",
                sub: "Sub-1.2s Fast · Mobile-First · SEO / AEO Ready",
                desc: "Your 24/7 high-converting storefront. Designed to turn visitors into paying customers from day one.",
                icon: "🌐",
                color: "from-blue-500/10 to-blue-600/5",
                border: "group-hover:border-blue-500/50",
                text: "group-hover:text-blue-500",
                badge: "High Demand",
                badgeClass: "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold",
                sample: "/sample-business-website.png",
                cite: "Source: Google SMB 2026 — 88% research before buying"
              },
              {
                name: "Lead Generation & Custom CRM",
                sub: "Zero Per-Seat Taxes · Auto Follow-Up · Tally Sync",
                desc: "Never lose a lead again. Instant WhatsApp lead routing, unlimited seats & automated pipeline tracking.",
                icon: "📈",
                color: "from-orange-500/10 to-orange-600/5",
                border: "group-hover:border-orange-500/50",
                text: "group-hover:text-orange-500",
                badge: "High Demand",
                badgeClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold",
                sample: "/sample-crm-lead-automation.png",
                cite: "Source: HubSpot 2026 — CRM delivers 29% more closes"
              },
              {
                name: "WhatsApp Automation Bot",
                sub: "24/7 AI Sales · Instant Lead Reply · Auto-Qualify",
                desc: "98% open rate. Engage every incoming customer inquiry in under 45 seconds while you sleep.",
                icon: "💬",
                color: "from-emerald-500/10 to-emerald-600/5",
                border: "group-hover:border-emerald-500/50",
                text: "group-hover:text-emerald-400",
                badge: "Popular",
                badgeClass: "bg-primary/15 text-primary",
                sample: "/sample-whatsapp-automation.png",
                cite: "Source: Meta India 2026 — 500M+ active users"
              }
            ].map((category, idx) => (
              <RevealOnScroll key={category.name} delay={idx * 80} className="h-full">
                <Link href="/services">
                  <div className={`group h-full relative overflow-hidden rounded-3xl border border-border/40 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${category.border} cursor-pointer`}>
                    {/* Hover Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative p-8 z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-5xl transform group-hover:scale-110 transition-transform duration-500">{category.icon}</div>
                        {(category as any).badge && <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${(category as any).badgeClass || "bg-primary/15 text-primary"}`}>{(category as any).badge}</span>}
                      </div>

                      {/* Sample Preview */}
                      {(category as any).sample && (
                        <div className="mb-4 rounded-xl overflow-hidden border border-border/20 aspect-video">
                          <img src={(category as any).sample} alt={`${category.name} sample`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        </div>
                      )}

                      <h3 className="text-2xl font-black text-foreground mb-2 leading-tight">
                        {category.name}
                      </h3>

                      <p className={`text-sm font-bold uppercase tracking-wider mb-3 text-muted-foreground ${category.text} transition-colors`}>
                        {category.sub}
                      </p>

                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        {category.desc}
                      </p>

                      {/* Citation */}
                      {(category as any).cite && (
                        <p className="text-[10px] text-muted-foreground/50 italic mb-4">{(category as any).cite}</p>
                      )}

                      <div className="mt-auto">
                        <div className={`inline-flex items-center text-sm font-bold text-foreground border-b-2 border-transparent ${category.border} pb-1 transition-all group-hover:pl-2`}>
                          View Solutions <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-8 rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer" })}>
                Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MEET THE FOUNDER - Human Connection
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Founder Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary via-red-500 to-orange-500 p-1">
                <img
                  src="/founder-mukul.jpg"
                  alt="Mukul Dhiman — Founder, SAGE DO"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center"><span class="text-5xl md:text-6xl font-black text-white">M</span></div>';
                  }}
                />
              </div>
            </div>
            {/* Founder Info */}
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Meet the Founder</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Mukul Dhiman</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Ex-Aerospace engineer turned AI builder. I started SAGE DO because I saw Indian businesses getting ripped off by agencies charging ₹5 Lakhs for what AI can do in 48 hours. I personally oversee every project.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a 
                  href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20saw%20your%20profile%20on%20SAGE%20DO.%20Can%20we%20discuss%20my%20project%3F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('founder_section_cta')}
                >
                  <div className={buttonVariants({ className: "bg-green-600 hover:bg-green-500 text-white font-bold px-6 h-11 rounded-xl cursor-pointer" })}>
                    <MessageCircle className="mr-2 h-4 w-4" /> Message Me Directly
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/mukul-dhiman" target="_blank" rel="noopener noreferrer" className="tap-inline text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  View LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY FOUNDERS CHOOSE SAGEDO - Trust Pillars
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              The Unfair Advantage
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Why Founders Choose SAGEDO
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="relative group p-8 rounded-3xl border border-border/30 bg-background/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3">Defence-Grade Quality Process</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every deliverable goes through a rigorous verification process built on mission-critical engineering standards. Zero bugs. Clean code. Nothing ships without passing our 30-point quality check.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="relative group p-8 rounded-3xl border border-border/30 bg-background/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3">48-Hour SLA Guarantee</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every service ships within 48 hours or your money back. No exceptions. While agencies take 30–60 days, we deliver at 10x speed using AI-native workflows.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="relative group p-8 rounded-3xl border border-border/30 bg-background/50 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3">No-Contract. Pay Per Result.</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No long-term lock-ins. No retainer traps. You pay for what you need, when you need it. Cancel anytime. Your money, your choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FREE AUDIT - Lead Capture CTA (Transitional CTA)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-border/30 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 p-8 md:p-12">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  <Zap className="w-3 h-3" /> 100% FREE — No strings attached
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                  Get a Free AI Business Audit
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Discover exactly what's holding your business back online. Our AI scans your digital presence and delivers a personalized roadmap — in under 24 hours.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Website & SEO / GEO / AEO health check</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Competitor comparison snapshot</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Top 3 quick-win opportunities</li>
                </ul>
              </div>

              {/* Right: Form */}
              <div>
                <form
                  id="free-audit-form"
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const businessName = (form.elements.namedItem('businessName') as HTMLInputElement).value;
                    const whatsappNumber = (form.elements.namedItem('whatsappNumber') as HTMLInputElement).value;
                    const btn = form.querySelector('button[type=submit]') as HTMLButtonElement;
                    btn.textContent = 'Sending...';
                    btn.disabled = true;
                    try {
                      const res = await fetch('/api/free-audit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ businessName, whatsappNumber }),
                      });
                      if (res.ok) {
                        btn.textContent = '✅ Request Sent!';
                        btn.className = btn.className.replace('bg-primary', 'bg-green-600');
                        form.reset();
                        setTimeout(() => { btn.textContent = 'Get My Free Audit →'; btn.disabled = false; btn.className = btn.className.replace('bg-green-600', 'bg-primary'); }, 3000);
                      } else {
                        btn.textContent = 'Get My Free Audit →';
                        btn.disabled = false;
                        alert('Could not submit audit. Please message us on WhatsApp directly at +91 6284925684.');
                      }
                    } catch {
                      btn.textContent = 'Get My Free Audit →';
                      btn.disabled = false;
                      alert('Network connection error. Please message us on WhatsApp directly at +91 6284925684.');
                    }
                  }}
                >
                  <div>
                    <label htmlFor="audit-business" className="block text-sm font-medium text-foreground mb-1">Business Name</label>
                    <input
                      id="audit-business"
                      name="businessName"
                      type="text"
                      required
                      placeholder="e.g. Sharma Electronics"
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-whatsapp" className="block text-sm font-medium text-foreground mb-1">WhatsApp Number</label>
                    <input
                      id="audit-whatsapp"
                      name="whatsappNumber"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
                  >
                    Get My Free Audit →
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll send your audit report via WhatsApp within 24 hours. No spam, ever.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS - Clean Cards (Bhindi Style)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Early Feedback
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              What Founders Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-background border border-border/30 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-destructive flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA - Clean Banner
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30 bg-gradient-to-t from-green-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Let's Talk About Your Business
          </h2>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            No sales pitch. No pressure. Just a real conversation about what you need and how we can help.
          </p>
          <p className="text-sm text-green-400 font-bold mb-10">
            ⚡ Average response time: Under 5 minutes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20discuss%20my%20business%20needs.%20What's%20the%20best%20way%20to%20get%20started%3F" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('final_bottom_cta')}
            >
              <div className={buttonVariants({ size: "lg", className: "h-14 px-10 text-lg font-semibold bg-green-600 hover:bg-green-500 rounded-xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 cursor-pointer" })}>
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us Now
              </div>
            </a>
            <a href="tel:+916284925684">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-10 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer" })}>
                <Phone className="mr-2 h-5 w-5" /> Call Directly
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
