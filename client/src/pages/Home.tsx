// Premium Homepage - Bhindi-style clean design
// Like a jeweler engraving a diamond ✨

import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Star, Gift, ChevronRight, Briefcase, GraduationCap, User, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);

  const categories = [
    { name: "Business", count: "10", description: "Landing pages, ads, automation & more", icon: <Briefcase className="w-6 h-6 text-primary" /> },
    { name: "Student", count: "7", description: "Research, PPTs, photo editing & more", icon: <GraduationCap className="w-6 h-6 text-primary" /> },
    { name: "Professional", count: "8", description: "Resumes, LinkedIn, cover letters & more", icon: <User className="w-6 h-6 text-primary" /> },
    { name: "Personal", count: "5", description: "Reels, diet plans, photo edits & more", icon: <Sparkles className="w-6 h-6 text-primary" /> }
  ];

  const steps = [
    { step: 1, title: "Submit Your Problem", description: "Describe your challenge in plain English or Hindi.", demo: "Tell us what you need..." },
    { step: 2, title: "AI Analysis", description: "Our system instantly analyzes and finds the best solution.", demo: "Processing with AI + Human expertise..." },
    { step: 3, title: "Receive Your Answer", description: "Get a clear, actionable solution sent right back to you.", demo: "Your solution is ready! ✅" }
  ];

  const testimonials = [
    { name: "Gurpreet S.", role: "Startup Founder, Punjab", text: "Most agencies quoted ₹3-5L and 3 months. SAGE DO delivered in 10 days for ₹35K. The quality exceeded expectations.", rating: 5 },
    { name: "Anjali M.", role: "Healthcare Entrepreneur", text: "I was doing everything myself and burning out. SAGE DO took over execution completely. Now I focus on customers while they handle the tech.", rating: 5 },
    { name: "Vikram R.", role: "Serial Entrepreneur", text: "As someone who's worked with 5+ agencies before, SAGE DO is different. No bullshit. Just execution.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - V13 Arc Reactor / AI Tech Design
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#030303' }}>

        {/* Background radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #1a0505 0%, #030303 70%)' }} />

        {/* Center Logo (background, visible, 110vmin) */}
        <img
          src="/sagedo_logo_final_circle.png"
          alt=""
          className="hero-logo-bg"
        />

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
              fontSize: 'clamp(3rem, 9vw, 11rem)',
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
              fontSize: 'clamp(1.8rem, 5.25vw, 6.4rem)',
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
          <p className="mt-6 text-sm sm:text-base text-neutral-500 max-w-xl mx-auto" style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: '2px' }}>
            AI-Powered · Human-Crafted · India
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/orders">
              <div className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl transition-all hover:scale-[1.02] hover:-translate-y-0.5 group cursor-pointer" })}
                style={{ boxShadow: '0 4px 16px rgba(255, 0, 0, 0.4)', fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
              >
                GET STARTED <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/services">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg font-semibold rounded-xl border-white/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer" })}
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
              >
                EXPLORE
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
            <div className="p-8 rounded-3xl bg-neutral-950/50 border border-neutral-800/80 backdrop-blur-sm relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-50" />
              <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-3">
                <span className="text-3xl">❌</span> The Old Way
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

            {/* The SAGE DO Way (Solution) */}
            <div className="p-8 rounded-3xl bg-neutral-900 border border-primary/30 relative group shadow-2xl shadow-primary/10 overflow-hidden transform md:-translate-y-4">
              {/* Glowing border effect */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3 relative z-10">
                <span className="text-3xl">✅</span> The SAGE DO Way
              </h3>
              <div className="space-y-6 relative z-10">
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

              {/* Button inside card */}
              <div className="mt-8 pt-6 border-t border-primary/10 relative z-10">
                <Link href="/services">
                  <div className={buttonVariants({ className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold" })}>
                    Bridge the Gap Now <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          AI + HUMAN SECTION - Clean Quote
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Why Choose SAGEDO?
          </p>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl text-foreground font-medium leading-relaxed mb-6">
            "Yeah I use AI too, why should I pay you?" 🤔
          </blockquote>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Here's the thing — <span className="text-foreground font-medium">every AI needs a human in the loop</span>.
            We're the best AI generalists in the game. We prompt it right, verify the output, and polish it
            until it's <span className="text-foreground font-medium">not just good — it's perfect</span>.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-muted-foreground">
            <span className="text-2xl">✨</span>
            <span>AI Power</span>
            <span className="text-muted-foreground/50">+</span>
            <span className="text-2xl">🧠</span>
            <span>Human Expertise</span>
            <span className="text-muted-foreground/50">=</span>
            <span className="text-2xl">💯</span>
            <span className="text-foreground font-semibold">Perfect Results</span>
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

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-sm font-bold text-red-400 uppercase tracking-wider bg-red-500/5 rounded-t-xl">Freelancer (₹15k)</th>
                  <th className="p-4 text-sm font-bold text-orange-400 uppercase tracking-wider">Agency (₹5 Lakhs+)</th>
                  <th className="p-4 text-xl font-black text-primary uppercase tracking-wider bg-primary/10 rounded-t-xl border-t-2 border-primary">SAGE DO (₹35k)</th>
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

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-sm font-bold text-red-400 uppercase tracking-wider bg-red-500/5 rounded-t-xl">Freelancer (₹15k)</th>
                  <th className="p-4 text-sm font-bold text-orange-400 uppercase tracking-wider">Agency (₹2 Lakhs+)</th>
                  <th className="p-4 text-xl font-black text-primary uppercase tracking-wider bg-primary/10 rounded-t-xl border-t-2 border-primary">SAGE DO (₹35k)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Speed to Launch</td>
                  <td className="p-4 text-muted-foreground">30 Days (If lucky)</td>
                  <td className="p-4 text-muted-foreground">60-90 Days</td>
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
                  <td className="p-4 text-muted-foreground">Extra Fee (₹50k+)</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🚀 Viral Launch Kit Included</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Risk</td>
                  <td className="p-4 text-red-400">High (Ghosting)</td>
                  <td className="p-4 text-orange-400">Medium (Scope Creep)</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🛡️ Zero (Guaranteed)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Support</td>
                  <td className="p-4 text-muted-foreground">Email Only</td>
                  <td className="p-4 text-muted-foreground">Dedicated PM</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20 rounded-b-xl border-b-2">🤝 AI + Founder Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SAAS PRICING SECTION - Compliance & Conversion
      ═══════════════════════════════════════════════════════════════════ */}
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

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-sm font-bold text-red-400 uppercase tracking-wider bg-red-500/5 rounded-t-xl">Freelancer (₹15k)</th>
                  <th className="p-4 text-sm font-bold text-orange-400 uppercase tracking-wider">Agency (₹2 Lakhs+)</th>
                  <th className="p-4 text-xl font-black text-primary uppercase tracking-wider bg-primary/10 rounded-t-xl border-t-2 border-primary">SAGE DO (₹35k)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Speed to Launch</td>
                  <td className="p-4 text-muted-foreground">30 Days (If lucky)</td>
                  <td className="p-4 text-muted-foreground">60-90 Days</td>
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
                  <td className="p-4 text-muted-foreground">Extra Fee (₹50k+)</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🚀 Viral Launch Kit Included</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Risk</td>
                  <td className="p-4 text-red-400">High (Ghosting)</td>
                  <td className="p-4 text-orange-400">Medium (Scope Creep)</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20">🛡️ Zero (Guaranteed)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Support</td>
                  <td className="p-4 text-muted-foreground">Email Only</td>
                  <td className="p-4 text-muted-foreground">Dedicated PM</td>
                  <td className="p-4 font-bold text-green-400 bg-primary/5 border-x border-primary/20 rounded-b-xl border-b-2">🤝 AI + Founder Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your workflow needs. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="relative p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">₹0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Access to Free AI Templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Basic Workflow Features</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Community Support</span>
                </li>
              </ul>
              <Link href="/login?register=true">
                <div className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl text-lg cursor-pointer" })}>
                  Get Started Free
                </div>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-5 sm:p-8 rounded-3xl border-2 border-primary bg-primary/5 backdrop-blur-sm shadow-xl shadow-primary/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">₹499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span><strong>Everything in Starter</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base"><strong className="text-foreground">Service Credit:</strong> Use it for ANY service delivered within <strong className="text-amber-500">24-48 hours</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base"><strong className="text-foreground">Fast Services:</strong> All eligible services are marked with a ⭐ badge</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/login?register=true">
                  <div className={buttonVariants({ size: "lg", className: "w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold hover:opacity-90 rounded-xl shadow-lg shadow-amber-500/25 whitespace-normal h-auto py-3 cursor-pointer" })}>
                    <Gift className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Claim FREE AI Templates</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Our Services
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              An AI Assistant for Every Part of Your Life
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your category and see what we can solve for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Scale Business",
                sub: "Ads, Landing Pages, Funnels",
                desc: "Stop burning cash. Get high-converting assets.",
                icon: "📈",
                color: "from-blue-500/10 to-blue-600/5",
                border: "group-hover:border-blue-500/50",
                text: "group-hover:text-blue-500"
              },
              {
                name: "Ace Academics",
                sub: "Research, PPTs, Theses",
                desc: "Top grades, zero stress. We do the heavy lifting.",
                icon: "🎓",
                color: "from-emerald-500/10 to-emerald-600/5",
                border: "group-hover:border-emerald-500/50",
                text: "group-hover:text-emerald-500"
              },
              {
                name: "Career Boost",
                sub: "Resumes, LinkedIn, Portfolios",
                desc: "Land your dream job with top-1% personal branding.",
                icon: "🚀",
                color: "from-purple-500/10 to-purple-600/5",
                border: "group-hover:border-purple-500/50",
                text: "group-hover:text-purple-500"
              },
              {
                name: "Viral Content",
                sub: "Reels, Edits, Scripts",
                desc: "Grow your audience with thumb-stopping content.",
                icon: "🔥",
                color: "from-orange-500/10 to-orange-600/5",
                border: "group-hover:border-orange-500/50",
                text: "group-hover:text-orange-500"
              }
            ].map((category) => (
              <Link key={category.name} href="/services">
                <div className={`group h-full relative overflow-hidden rounded-3xl border border-border/40 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${category.border} cursor-pointer`}>
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative p-8 z-10 flex flex-col h-full">
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{category.icon}</div>

                    <h3 className="text-2xl font-black text-foreground mb-2 leading-tight">
                      {category.name}
                    </h3>

                    <p className={`text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground ${category.text} transition-colors`}>
                      {category.sub}
                    </p>

                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                      {category.desc}
                    </p>

                    <div className="mt-auto">
                      <div className={`inline-flex items-center text-sm font-bold text-foreground border-b-2 border-transparent ${category.border} pb-1 transition-all group-hover:pl-2`}>
                        View Solutions <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-8 rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer" })}>
                Explore All 30+ Services <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
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
              Testimonials
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Voices Across India
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
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Ready to Get Things Done?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Trusted by 150+ Members for AI Automation.
            Start with FREE AI Workflow Templates + Welcome Bonus today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?register=true">
              <div className={buttonVariants({ size: "lg", className: "h-14 px-10 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105 cursor-pointer" })}>
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
            <Link href="/services">
              <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-10 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer" })}>
                Browse Services
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
