// Premium Homepage - High Engagement Design
// "If you want to be rich, stop acting poor." - Aesthetics

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Sparkles, Star, Gift, Play, ChevronRight, Trophy } from "lucide-react";
import { useState } from "react";
import { AnimatedTicker } from "@/components/AnimatedTicker";

export default function Home() {
  const [namasteClicked, setNamasteClicked] = useState(false);
  // ... existing code ...

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - "THE WAKE UP CALL"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">

        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface border border-border/50 mb-10 shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-background" />
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-background" />
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Used by 1,200+ Smart Indians this week</span>
          </div>

          {/* Animated Ticker - High Engagement */}
          <div className="mb-12 max-w-4xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <AnimatedTicker />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8">
            <span className="opacity-80">Stop</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-500 to-destructive bg-clip-text text-transparent drop-shadow-2xl">
              Struggling.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
            You are working too hard on things that <span className="text-foreground font-bold">don't matter.</span>
            <br className="hidden sm:block" />
            Let AI + Humans handle the grit. You handle the glory.
          </p>

          <p className="text-lg text-primary font-semibold mb-12 animate-pulse">
            ⚠️ Warning: Using this app gives you unfair leverage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/services">
              <Button size="lg" className="h-16 px-12 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:-translate-y-1">
                Automate My Life <Zap className="ml-2 h-6 w-6 fill-current" />
              </Button>
            </Link>
          </div>

          {/* Live Activity Strategy (Fake Ticker) */}
          <div className="inline-flex items-center gap-4 py-3 px-6 bg-surface/50 backdrop-blur-md rounded-xl border border-border/50 text-sm font-medium text-muted-foreground">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>Just now: <strong>Rahul (Mumbai)</strong> automated a Pitch Deck</span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM/SOLUTION - "THE SHIFT"
      ═══════════════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM/SOLUTION - "THE SHIFT"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="text-left">
              <div className="inline-block px-4 py-1 rounded bg-destructive/10 text-destructive font-bold text-xs tracking-widest uppercase mb-6">
                The Old Way
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                "I'll just do it myself."
              </h2>
              <ul className="space-y-6 text-lg text-muted-foreground">
                <li className="flex items-start gap-4 opacity-70">
                  <div className="p-2 rounded-lg bg-muted text-foreground">❌</div>
                  <span>Spend 4 hours formatting a resume.</span>
                </li>
                <li className="flex items-start gap-4 opacity-70">
                  <div className="p-2 rounded-lg bg-muted text-foreground">❌</div>
                  <span>Watch 10 tutorials on "How to use ChatGPT".</span>
                </li>
                <li className="flex items-start gap-4 opacity-70">
                  <div className="p-2 rounded-lg bg-muted text-foreground">❌</div>
                  <span>Get generic, robotic results everyone ignores.</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-background p-8 sm:p-12 rounded-3xl border border-primary/20 shadow-2xl">
                <div className="inline-block px-4 py-1 rounded bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6">
                  The Sage Do Way
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  "I'll Sage It."
                </h2>
                <ul className="space-y-6 text-xl">
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary text-primary-foreground"><CheckCircle2 className="w-6 h-6" /></div>
                    <span className="font-medium">You submit a voice note.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary text-primary-foreground"><CheckCircle2 className="w-6 h-6" /></div>
                    <span className="font-medium">Our AI + Pros do the work.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary text-primary-foreground"><CheckCircle2 className="w-6 h-6" /></div>
                    <span className="font-medium">You get <span className="text-primary font-bold">Top 1% Quality</span> results.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POPULAR SERVICES - "INSTANT ACCESS"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Most Popular <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground">Don't browse. Just choose what you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Manual curation of Top Services to ensure high engagement */}
            {[
              { title: "ATS Resume Optimization", price: "₹199", desc: "Get past the bots. Recruiter ready.", icon: "📄", link: "/orders?service=Resume%20Optimization%20(ATS-Friendly)&price=199&id=21" },
              { title: "Research Paper Outline", price: "₹199", desc: "From chaos to structure in minutes.", icon: "🎓", link: "/orders?service=Research%20Paper%20Outline&price=199&id=13" },
              { title: "Viral Reel Script", price: "₹99", desc: "Hook, copy, and hashtags included.", icon: "📱", link: "/orders?service=Complete%20Reel%20Script&price=99&id=31" },
              { title: "Pitch Deck & Design", price: "₹999", desc: "Raise capital with a pro deck.", icon: "💼", link: "/orders?service=Complete%20Presentation%20Design&price=999&id=17" },
              { title: "Personal Diet Plan", price: "₹299", desc: "Eat right, live better. 30 Days.", icon: "🥗", link: "/orders?service=Personalized%20Monthly%20Diet%20Plan&price=299&id=32" },
              { title: "Assignment Writing", price: "₹599", desc: "Complete done-for-you writing.", icon: "✍️", link: "/orders?service=Assignment%20Writing%20(Complete)&price=599&id=18" },
            ].map((s, i) => (
              <Link href={s.link} key={i}>
                <div className="group p-6 rounded-2xl border border-border/40 bg-card hover:bg-surface/50 hover:border-primary/50 transition-all cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">{s.price}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-primary">
                    Order Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-xl px-8 border-primary/20 hover:bg-primary/5">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF - "NOT DRY TESTIMONIALS"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Real Winners <span className="text-primary">Win.</span>
            </h2>
            <p className="text-lg text-muted-foreground">The lazy ones are still scrolling.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border ${t.bg} hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Trophy className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm font-medium opacity-70">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA - "GET RICH OR GET LOST"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 border-t border-border/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">
            Stop Watching.<br />
            <span className="text-primary">Start Building.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            150+ Founders are already scaling with Sage Do.
            <br />
            Are you going to let them win?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?register=true">
              <Button size="lg" className="h-16 px-12 text-xl font-bold bg-foreground text-background hover:opacity-90 rounded-2xl shadow-xl transition-all hover:scale-105">
                Join the Top 1% Free <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground font-medium">
            🎁 Includes: 50+ Free AI Templates + 1 Service Credit
          </p>
        </div>
      </section>

    </div>
  );
}
