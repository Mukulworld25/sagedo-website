// Premium Homepage - Bhindi-style clean design
// Like a jeweler engraving a diamond ✨

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Star, Gift, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);

  const categories = [
    { name: "Business", count: "10", description: "Landing pages, ads, automation & more", icon: "💼" },
    { name: "Student", count: "7", description: "Research, PPTs, photo editing & more", icon: "📚" },
    { name: "Professional", count: "8", description: "Resumes, LinkedIn, cover letters & more", icon: "👔" },
    { name: "Personal", count: "5", description: "Reels, diet plans, photo edits & more", icon: "✨" }
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
          HERO SECTION - 10/10 Redesign: Badge → Headline → Stats → CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Animated Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] animate-grid-move" style={{
          backgroundImage: 'linear-gradient(rgba(255,0,0,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Radial Red Gradient Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at top center, rgba(255,0,0,0.08) 0%, rgba(0,0,0,0) 70%)'
        }} />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-float-delayed" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">

          {/* 🏆 Pulsing Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 animate-badge-pulse"
            style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.6)',
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)'
            }}
          >
            <span className="text-sm">🏆</span>
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
              India's First AI + Human Hybrid Execution Team
            </span>
          </div>

          {/* 🔥 3-Line Stagger Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            <span className="block mb-2 text-foreground animate-hero-line-1">
              Speed of AI.
            </span>
            <span className="block mb-2 animate-hero-line-2"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Precision of Humans.
            </span>
            <span className="block relative inline-block text-foreground animate-hero-line-3">
              Excellence Guaranteed.
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF0000, #FF4444)' }}
              />
            </span>
          </h1>

          {/* Supporting Subheadline */}
          <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-[680px] mx-auto mb-10">
            We combine AI automation with human expertise to deliver what agencies can't:{' '}
            <span className="text-primary font-semibold">99.9% accuracy</span> in{' '}
            <span className="text-primary font-semibold">24-48 hours</span>{' '}
            at prices that make sense.
          </p>

          {/* 📊 Glassmorphism Stats Grid */}
          <div className="max-w-xl mx-auto mb-10 p-6 sm:p-8 rounded-2xl grid grid-cols-2 gap-4 sm:gap-5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
            }}
          >
            {[
              { number: '67+', label: 'Projects Delivered' },
              { number: '24-48h', label: 'Delivery' },
              { number: '99.9%', label: 'Accuracy' },
              { number: '₹10-50K', label: 'Packages' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3 text-left">
                <span className="text-primary font-bold text-lg">✓</span>
                <span className="text-white text-sm sm:text-base">
                  <strong className="text-primary font-bold">{stat.number}</strong>{' '}
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* 🔴 CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="https://calendly.com/sagedo-ai/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl transition-all hover:scale-[1.02] hover:-translate-y-0.5 group"
                style={{
                  boxShadow: '0 4px 16px rgba(255, 0, 0, 0.4)'
                }}
              >
                Book Free Consultation <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link href="/services">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold rounded-xl border-white/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Line */}
          <p className="text-sm text-neutral-500 italic">
            Trusted by founders, students, and professionals across India
          </p>
        </div>
      </section>

      {/* NEW: The Execution Gap Section */}
      <section className="py-20 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
            The Execution Gap
          </h2>
          <div className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto text-left space-y-4">
            <p className="text-center mb-6">Everyone faces the same problem:</p>
            <p>❌ <strong>Agencies:</strong> ₹2-5L, 60-90 days, slow communication</p>
            <p>❌ <strong>Freelancers:</strong> Unreliable, inconsistent, ghost mid-project</p>
            <p>❌ <strong>Pure AI tools:</strong> Fast but error-prone, no oversight</p>
            <p>❌ <strong>DIY:</strong> Time-consuming, steep learning curve</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 inline-block">
            <p className="text-lg font-medium text-primary">
              ✅ SAGE DO: Hybrid model = Speed + Quality + Affordability <br />
              <span className="text-foreground"> We combine AI automation with human oversight to deliver agency-quality work in days (not months).</span>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
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
          SAAS PRICING SECTION - Compliance & Conversion
      ═══════════════════════════════════════════════════════════════════ */}
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
                <Button className="w-full h-12 rounded-xl text-lg" variant="outline">
                  Get Started Free
                </Button>
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
                  <Button size="lg" className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold hover:opacity-90 rounded-xl shadow-lg shadow-amber-500/25 whitespace-normal h-auto py-3">
                    <Gift className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Claim FREE AI Templates</span>
                  </Button>
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
            {categories.map((category) => (
              <Link key={category.name} href="/services">
                <div className="group h-full p-6 rounded-2xl border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-2">{category.count} Services</p>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-border/50 hover:bg-muted/50">
                Explore All 30+ Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
              <Button size="lg" className="h-14 px-10 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
