
import React, { useState, useEffect } from 'react';
import {
  ArrowRight, MessageCircle, Star, ShieldCheck, Zap,
  Clock, TrendingUp, CheckCircle2, Rocket, Crown, Users
} from 'lucide-react';
import { AppRoute } from '../mobile-types';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
  onOpenVision: () => void;
  onOpenVoice: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(1);

  const testimonials = [
    { name: "Ravi K.", role: "Restaurant Owner, Chandigarh", text: "I was paying a freelancer ₹30K for a basic website that took 2 months. SAGE DO built something 10x better in days.", rating: 5 },
    { name: "Priya S.", role: "Coaching Institute, Punjab", text: "SAGE DO took over the tech completely. Now I just teach and they handle everything else.", rating: 5 },
    { name: "Arjun T.", role: "E-commerce Startup", text: "I messaged on WhatsApp, explained what I needed, and had a working prototype the next day. No other agency works like this.", rating: 5 }
  ];

  const steps = [
    { step: 1, title: "Submit Your Problem", description: "Describe your challenge in plain English or Hindi.", icon: <MessageCircle className="w-5 h-5" /> },
    { step: 2, title: "AI Analysis", description: "Our system instantly analyzes and finds the best solution.", icon: <Zap className="w-5 h-5" /> },
    { step: 3, title: "Receive Your Answer", description: "Get a clear, actionable solution sent right back to you.", icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev >= 3 ? 1 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-32">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — Arc Reactor Design (matching website)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ background: '#030303' }}>

        {/* Background radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1a0505 0%, #030303 70%)' }} />

        {/* Center Logo (background, faded) */}
        <img
          src="/sagedo_logo_final_circle.png"
          alt=""
          className="absolute opacity-[0.06] pointer-events-none"
          style={{ width: '110vmin', height: '110vmin', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Animated ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <div className="w-[70vmin] h-[70vmin] rounded-full border border-red-500/10" style={{ animation: 'spin 30s linear infinite' }} />
          <div className="absolute w-[50vmin] h-[50vmin] rounded-full border border-red-500/5" style={{ animation: 'spin 20s linear infinite reverse' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center px-5">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[10px] font-black uppercase tracking-widest"
            style={{
              background: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#ef4444',
              boxShadow: '0 0 20px rgba(239,68,68,0.2)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
          >
            🏆 INDIA'S FIRST AI + HUMAN HYBRID TEAM
          </div>

          {/* Main headline — SPEED OF AI */}
          <h1
            className="font-black uppercase leading-none mb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(2.2rem, 10vw, 4rem)',
              letterSpacing: '0.05em',
              lineHeight: 0.9,
              background: 'linear-gradient(180deg, #fff 10%, #ccc 50%, #666 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
              animation: 'fadeInUp 0.6s ease-out 0.2s both',
            }}
          >
            SPEED OF{' '}
            <span style={{ color: '#ef4444', WebkitTextFillColor: '#ef4444', textShadow: '0 0 40px #ef4444' }}>
              AI
            </span>
          </h1>

          {/* Animated separator */}
          <div className="w-32 h-[2px] my-4 rounded-full overflow-hidden bg-neutral-800">
            <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: '60%', animation: 'shimmer 2s ease-in-out infinite alternate' }} />
          </div>

          {/* PRECISION OF HUMANS */}
          <p
            className="font-bold uppercase leading-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.2rem, 5vw, 2.4rem)',
              letterSpacing: '0.08em',
              lineHeight: 0.9,
              background: 'linear-gradient(180deg, #aaa 0%, #555 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
              animation: 'fadeInUp 0.6s ease-out 0.4s both',
            }}
          >
            PRECISION OF HUMANS
          </p>

          {/* Subtitle */}
          <p className="mt-5 text-xs text-neutral-500 max-w-xs mx-auto" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '1px', animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
            AI-Powered · Human-Crafted · India
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 mt-8 w-full max-w-xs" style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}>
            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20visited%20SAGE%20DO%20and%20I'm%20interested%20in%20your%20services.%20Can%20we%20talk%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white active:scale-95 transition-all"
              style={{ background: '#16a34a', boxShadow: '0 4px 20px rgba(22,163,74,0.4)', fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
            >
              <MessageCircle className="w-5 h-5" /> BOOK FREE CALL
            </a>
            <button
              onClick={() => onNavigate(AppRoute.SERVICES)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-white/80 active:scale-95 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.15)', fontFamily: "'Orbitron', sans-serif", letterSpacing: '2px' }}
            >
              SEE OUR WORK
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-white/5 bg-black py-4 px-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-600 text-center mb-2">
          Engineered for the Top 1% of
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-[11px] font-black text-white/80 uppercase tracking-widest">Visionary Founders</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="text-[11px] font-black text-white/80 uppercase tracking-widest">High-Growth Startups</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="text-[11px] font-black text-white/80 uppercase tracking-widest">Elite Creators</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          THE EXECUTION GAP — Old Way vs SAGE DO Way
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-5" style={{ background: '#0a0a0a' }}>
        <h2 className="text-2xl font-black text-white text-center mb-2">The Execution Gap</h2>
        <p className="text-sm text-neutral-500 text-center mb-8">Why most projects fail before they launch.</p>

        {/* Old Way */}
        <div className="p-6 rounded-3xl bg-neutral-950/50 border border-neutral-800/80 mb-4">
          <h3 className="text-lg font-bold text-red-400 mb-5 flex items-center gap-2">
            <span>❌</span> The Old Way
          </h3>
          <div className="space-y-4">
            {[
              { n: "1", title: "Agencies", desc: "Expensive (₹2-5L), slow (60-90 days), endless meetings." },
              { n: "2", title: "Freelancers", desc: "Unreliable, ghost mid-project, inconsistent quality." },
              { n: "3", title: "DIY & AI Tools", desc: "Steep learning curve, hours prompting, mediocre results." }
            ].map(item => (
              <div key={item.n} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-bold shrink-0">{item.n}</div>
                <div>
                  <h4 className="font-bold text-neutral-200 text-sm">{item.title}</h4>
                  <p className="text-neutral-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAGE DO Way */}
        <div className="p-6 rounded-3xl border border-red-500/30 relative overflow-hidden" style={{ background: '#111', boxShadow: '0 0 40px rgba(239,68,68,0.08)' }}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <h3 className="text-lg font-bold text-red-400 mb-5 flex items-center gap-2">
            <span>✅</span> The SAGE DO Way
          </h3>
          <div className="space-y-4">
            {[
              { n: "1", title: "Hybrid Speed", desc: "AI speed + Human oversight = Agency quality in 24-48 hours." },
              { n: "2", title: "Reliability", desc: "Dedicated project manager, daily updates, guaranteed delivery." },
              { n: "3", title: "Affordability", desc: "Prices that make sense (starting ₹0), pay only for results." }
            ].map(item => (
              <div key={item.n} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">{item.n}</div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-neutral-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate(AppRoute.SERVICES)}
            className="w-full mt-6 py-3.5 rounded-2xl bg-red-600 text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{ boxShadow: '0 4px 20px rgba(239,68,68,0.3)' }}
          >
            Bridge the Gap Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 3 Steps
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-5 border-t border-white/5" style={{ background: '#030303' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 text-center mb-2">How It Works</p>
        <h2 className="text-2xl font-black text-white text-center mb-8">3 Clicks to Excellence</h2>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.step}
              onClick={() => setActiveStep(step.step)}
              className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer active:scale-[0.98] ${activeStep === step.step
                  ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/10'
                  : 'bg-white/[0.02] border-white/5'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${activeStep === step.step ? 'bg-red-500 text-white' : 'bg-white/5 text-neutral-500'
                  }`}>
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${activeStep === step.step ? 'text-red-400' : 'text-neutral-600'}`}>
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS — Glassmorphism Grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 px-5 border-t border-white/5" style={{ background: '#050505' }}>
        <div
          className="grid grid-cols-2 gap-3 p-5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
          }}
        >
          {[
            { num: "67+", label: "Projects Delivered", icon: <Rocket className="w-4 h-4" /> },
            { num: "24-48h", label: "Delivery", icon: <Clock className="w-4 h-4" /> },
            { num: "99.9%", label: "Accuracy", icon: <ShieldCheck className="w-4 h-4" /> },
            { num: "₹10-50K", label: "Packages", icon: <Crown className="w-4 h-4" /> }
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3">
              <div className="text-red-500">{stat.icon}</div>
              <div>
                <p className="text-white font-black text-sm">{stat.num}</p>
                <p className="text-neutral-500 text-[10px] font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICE CATEGORIES — Quick Access
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 px-5 border-t border-white/5" style={{ background: '#030303' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 text-center mb-2">Our Services</p>
        <h2 className="text-xl font-black text-white text-center mb-6">An AI Assistant for Every Part of Your Life</h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "📈", name: "Scale Business", sub: "Ads, Funnels, Pages", color: "from-blue-500/10", border: "border-blue-500/20" },
            { icon: "🚀", name: "Startup Launch", sub: "MVPs, Pitches, GTM", color: "from-green-500/10", border: "border-green-500/20" },
            { icon: "💼", name: "Executive Brand", sub: "LinkedIn, Resume", color: "from-purple-500/10", border: "border-purple-500/20" },
            { icon: "⚡", name: "AI Automation", sub: "Chatbots, CRM, Scraping", color: "from-orange-500/10", border: "border-orange-500/20" }
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => onNavigate(AppRoute.SERVICES)}
              className={`p-5 rounded-2xl bg-gradient-to-br ${cat.color} to-transparent border ${cat.border} active:scale-95 transition-all cursor-pointer`}
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-sm font-black text-white mb-0.5">{cat.name}</h3>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">{cat.sub}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate(AppRoute.SERVICES)}
          className="w-full mt-5 py-3.5 rounded-2xl border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/5"
        >
          Explore All 30+ Services <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 px-5 border-t border-white/5" style={{ background: '#050505' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 text-center mb-2">Real Impact</p>
        <h2 className="text-xl font-black text-white text-center mb-6">What Founders Say</h2>

        <div className="space-y-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-[11px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 px-5 border-t border-white/5" style={{ background: '#030303' }}>
        <div className="p-8 rounded-3xl border border-white/5 text-center" style={{ background: 'linear-gradient(180deg, rgba(22,163,74,0.05), transparent)' }}>
          <h2 className="text-xl font-black text-white mb-3">Let's Build Something Together</h2>
          <p className="text-sm text-neutral-400 mb-2">No sales pitch. Just a real conversation about what you need.</p>
          <p className="text-xs text-green-400 font-bold mb-6">⚡ Average response time: Under 5 minutes</p>

          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20discuss%20my%20project.%20What's%20the%20best%20way%20to%20get%20started%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white active:scale-95 transition-all"
              style={{ background: '#16a34a', boxShadow: '0 6px 24px rgba(22,163,74,0.35)' }}
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
            </a>
            <a
              href="tel:+916284925684"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white/80 border border-white/10 active:scale-95 transition-all"
            >
              📞 Call Directly
            </a>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239,68,68,0.2); }
          50% { box-shadow: 0 0 35px rgba(239,68,68,0.4); }
        }
        @keyframes shimmer {
          0% { width: 30%; margin-left: 0; }
          100% { width: 70%; margin-left: 30%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
