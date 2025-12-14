// Premium Homepage - Bhindi-style clean design
// Like a jeweler engraving a diamond ✨

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Sparkles, Star, Gift, Play, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [namasteClicked, setNamasteClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleNamaste = () => {
    setNamasteClicked(true);
    setTimeout(() => setNamasteClicked(false), 2000);
  };

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
    { name: "Priya S.", role: "MBA Student", text: "Got my entire research paper done in 24 hours. Saved my semester!", rating: 5 },
    { name: "Rahul M.", role: "Startup Founder", text: "The LinkedIn optimization increased my profile views by 300%!", rating: 5 },
    { name: "Ananya K.", role: "Content Creator", text: "Best reels scripts I've ever used. My engagement doubled!", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Clean, Impactful, Minimal
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* ═══════════════════════════════════════════════════════════════
            LAYER 1: Large AI Brain Logo Background - Enhanced visibility with red glow
        ═══════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Red glow effect in center */}
          <div className="absolute w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
          <img
            src="/sagedo_logo_pro_clean.png"
            alt=""
            className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] object-contain opacity-[0.15]"
            style={{ filter: 'contrast(1.2)' }}
          />
        </div>

        {/* Subtle Gradient Orbs - Grey and red tones */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI + Human Excellence</span>
          </div>

          {/* Namaste Button - Subtle */}
          <div className="mb-8">
            <button
              onClick={handleNamaste}
              className={`
                px-8 py-3 rounded-full font-bold text-lg transition-all duration-500
                ${namasteClicked
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white scale-110 shadow-lg shadow-orange-500/30'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {namasteClicked ? '🙏' : 'Namaste'}
            </button>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
            <span className="text-foreground">Problem? Need Help?</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent">
              Afcoz!
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-4 max-w-3xl mx-auto">
            We Do Your Daily Grind, You Do Grand Things.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10">
            Stop wasting time on small problems. Let our AI handle the complex tasks while you focus on what matters most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/services">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105">
                Help Me! <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50 transition-all">
                <Play className="mr-2 h-5 w-5" /> See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Signals - Minimal Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>150+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>24-48 Hour Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.8 Average Rating</span>
            </div>
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
          GOLDEN TICKET SECTION - Premium Card
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-b from-amber-500/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 p-8 md:p-12 overflow-hidden">

            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-40 scale-110" />
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Star className="w-12 h-12 md:w-16 md:h-16 text-amber-950 fill-amber-950" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h2 className="text-2xl md:text-3xl font-black text-amber-500">
                    Golden Ticket System
                  </h2>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>

                <p className="text-xl md:text-2xl text-foreground font-semibold mb-6">
                  Get <span className="text-3xl text-amber-500 font-black">FREE GPT Prompts</span> + 1 Golden Ticket on Signup!
                </p>

                <div className="space-y-3 text-muted-foreground mb-8">
                  <p className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Earn Tokens:</strong> Complete tasks, refer friends, or top up anytime</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Golden Ticket:</strong> Use it for ANY service delivered within <strong className="text-amber-500">24-48 hours</strong></span>
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Fast Services:</strong> All Golden services are marked with a ⭐ badge</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Link href="/login?register=true">
                    <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold hover:opacity-90 rounded-xl shadow-lg shadow-amber-500/25">
                      <Gift className="mr-2 h-5 w-5" />
                      Claim FREE GPT Now
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="h-12 px-6 border-amber-500/50 hover:bg-amber-500/10 rounded-xl">
                      <Star className="mr-2 h-5 w-5 text-amber-500 fill-amber-500" />
                      View Golden Services
                    </Button>
                  </Link>
                </div>
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
            Join 150+ Indians who've already simplified their lives with SAGE DO.
            Start with FREE GPT Prompts + Golden Ticket today.
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
