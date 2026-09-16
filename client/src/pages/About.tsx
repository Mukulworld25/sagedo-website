import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Linkedin,
  Mail,
  Youtube,
  MessageCircle,
  Phone,
  ArrowRight,
  Star,
  CheckCircle2,
  ExternalLink,
  Zap,
  ShieldCheck,
  Activity,
  BrainCircuit,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Target,
  Rocket,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  Compass,
  Check
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Gallery as GalleryType } from "@shared/schema";
import { samplePortfolio, sampleTestimonials } from "@/data/sampleData";

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "120px" }
    );
    if (ref.current) observer.observe(ref.current);
    const fallbackTimer = setTimeout(() => setIsVisible(true), 500);
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const { data: galleryItems = [] } = useQuery<GalleryType[]>({
    queryKey: ["/api/gallery"],
  });

  // Merge database items with sample data (samples only show if DB is empty)
  const allTestimonials = galleryItems.length > 0
    ? galleryItems.filter((item) => item.type === "testimonial" && item.isVisible)
    : sampleTestimonials;

  const allWorkShowcase = galleryItems.length > 0
    ? galleryItems.filter((item) => item.type === "work_showcase" && item.isVisible)
    : samplePortfolio;

  const socialMedia = [
    { name: "WhatsApp", icon: MessageCircle, handle: "+91 6284925684", color: "from-green-600 to-emerald-600", url: "https://wa.me/916284925684" },
    { name: "Instagram", icon: Instagram, handle: "@sagedoai00", color: "from-pink-600 to-purple-600", url: "https://www.instagram.com/sagedoai00/" },
    { name: "LinkedIn", icon: Linkedin, handle: "SAGE DO", color: "from-blue-600 to-blue-700", url: "https://www.linkedin.com/company/sagedo-in/" },
    { name: "YouTube", icon: Youtube, handle: "@SageDo-Ai", color: "from-red-600 to-red-700", url: "https://www.youtube.com/@SageDo-Ai" },
    { name: "Email", icon: Mail, handle: "hello@sagedo.in", color: "from-orange-600 to-red-600", url: "mailto:hello@sagedo.in" },
  ];

  const credentials = [
    {
      emoji: "✈️",
      title: "Aerospace Systems Engineering",
      subtitle: "5 Years High-Tolerance Systems",
      detail: "Precision manufacturing and high-tolerance systems work in the aerospace sector."
    },
    {
      emoji: "⚙️",
      title: "Operations Leadership",
      subtitle: "25+ Person Engineering Teams",
      detail: "Engineered zero-defect workflows achieving 40% operational efficiency gains."
    },
    {
      emoji: "💻",
      title: "Full-Stack System Architect",
      subtitle: "Web, Mobile & AI Pipelines",
      detail: "Architected reactive platforms, high-throughput data scrapers & custom systems."
    },
    {
      emoji: "🤖",
      title: "AI Systems Engineering",
      subtitle: "2 Years Building SAGE DO",
      detail: "Multi-agent workflows, brand execution, and advanced AI systems integration."
    },
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mukul Dhiman",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "SAGE DO",
      "url": "https://sagedo.in"
    },
    "description": "Founder & CEO of SAGE DO. Aerospace systems engineer with 5 years in high-tolerance precision systems turned AI founder.",
    "sameAs": [
      "https://www.linkedin.com/in/mukul-dhiman",
      "https://x.com/dhiman_muk17135"
    ]
  };

  const wallOfFameSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SAGE DO Wall of Fame - Delivered Projects",
    "description": "Real commercial deliverables engineered and shipped by SAGE DO across web, CRM, ERP, and AI systems.",
    "itemListElement": samplePortfolio.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.title,
        "description": item.content,
        "image": `https://sagedo.in${item.imageUrl}`,
        "creator": {
          "@type": "Organization",
          "name": "SAGE DO"
        }
      }
    }))
  };

  const getCategoryFromTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('voice') || t.includes('telephony') || t.includes('bot') || t.includes('automation') || t.includes('whatsapp')) return 'AI & Automation';
    if (t.includes('saas') || t.includes('mvp') || t.includes('startup')) return 'Startup Launch';
    if (t.includes('seo') || t.includes('gbp') || t.includes('ad') || t.includes('campaign') || t.includes('marketing') || t.includes('social') || t.includes('video') || t.includes('copy')) return 'Growth & Marketing';
    if (t.includes('deck') || t.includes('logo') || t.includes('brand')) return 'Design & Identity';
    if (t.includes('dashboard') || t.includes('bi') || t.includes('audit')) return 'Data & Analytics';
    return 'Digital Infrastructure';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(0 0% 3.9%) 0%, hsl(0 0% 4.8%) 50%, hsl(0 0% 3.5%) 100%)' }}>
      <Helmet>
        <title>About SAGE DO — India's First AI + Human Hybrid Execution Team</title>
        <meta name="description" content="Learn about SAGE DO, founded by Mukul Dhiman. Combining 5 years of aerospace precision engineering with modern AI speed to deliver 30+ digital services across India." />
        <meta property="og:title" content="About SAGE DO — What We've Already Delivered" />
        <meta property="og:description" content="Explore our Wall of Fame — custom CRMs, enterprise ERPs, dual-platform apps, and conversion infrastructure shipped across India." />
        <meta property="og:image" content="https://sagedo.in/portfolio-erp-system.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sagedo.in/portfolio-erp-system.webp" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(wallOfFameSchema)}
        </script>
      </Helmet>

      {/* Background Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[170px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-red-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: WHAT IS SAGE DO — Architectural Depth & The Hybrid Model
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us · Architecture & Origin</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight max-w-3xl mx-auto">
              What is <span className="text-primary">SAGE DO</span>?
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mt-4 font-normal">
              India's Sovereign Revenue &amp; AI Execution Partner. Speed of AI. Precision of Humans.
            </p>
          </div>

          <div className="rounded-3xl bg-neutral-900/60 border border-border/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary" />
            
            <div className="grid md:grid-cols-12 gap-8 items-center mb-8">
              <div className="md:col-span-8 space-y-4">
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                  <strong className="text-white font-bold">SAGE DO is India's first AI + Human hybrid execution platform.</strong> We eliminate the painful compromise between slow, overpriced traditional agencies and fragile, unverified DIY artificial intelligence.
                </p>
                <p className="text-base text-neutral-300 leading-relaxed">
                  Founded in Mohali (Chandigarh Tricity), India, SAGE DO was engineered around a simple, undeniable truth: <span className="text-primary font-semibold">ambitious Indian founders and modern enterprises deserve agency-caliber digital systems at startup-accessible pricing</span>. No more paying ₹5–15 Lakhs for 4 months of bloated agency meetings. No more chasing unreliable freelancers. No more wrestling with raw AI tools that hallucinate code and lack production finish.
                </p>
              </div>

              {/* Quick Institutional Credibility Box */}
              <div className="md:col-span-4 rounded-2xl bg-neutral-950/80 border border-border/50 p-6 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider pb-2 border-b border-border/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Institutional Credibility</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-400">Government MSME</span>
                    <span className="font-mono text-emerald-400 font-semibold">UDYAM-HP-04-0042175</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-400">Trustpilot Rating</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <span className="text-emerald-400">★</span> 4.0 Verified
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-400">Turnaround SLA</span>
                    <span className="font-semibold text-blue-400">24–48 Hours Prototype</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-400">Client Protection</span>
                    <span className="font-semibold text-emerald-400">90% Money-Back SLA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The 4-Step Hybrid Execution Pipeline */}
            <div className="pt-8 border-t border-border/30">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 text-center md:text-left flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>The Proprietary 4-Step Hybrid Execution Pipeline</span>
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">STAGE 01</span>
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm">AI Architecture &amp; Synthesis</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated code generation, data models, layout drafting, and initial synthesis executed in parallel in under 60 minutes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">STAGE 02</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm">Human Engineering &amp; QA</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Senior developers and designers manually review every line of code, design hierarchy, and business logic before staging.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">STAGE 03</span>
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm">24–48h Milestone Delivery</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Working prototypes and functional deployments released to your dedicated client tracker within 24 to 48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">STAGE 04</span>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm">Sovereign Asset Handover</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You retain 100% intellectual property, full GitHub source code, database access, and documentation with zero vendor lock-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: UNIFIED VISION, MISSION & THE HYBRID ADVANTAGE
            (Merged from duplicate Vision/Mission blocks into one cohesive master section)
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Purpose &amp; Comparative Edge
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Vision, Mission &amp; The Hybrid Advantage
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mt-3">
              Why the world's most ambitious operators choose hybrid execution over legacy alternatives.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Vision & Mission Matrix */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Vision Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-neutral-900/80 to-background border border-primary/25 relative overflow-hidden flex-1 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Core Horizon</span>
                    <h3 className="text-2xl font-black text-foreground">Our Vision</h3>
                  </div>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  To democratize access to world-class digital execution for every Indian founder, executive, and forward-thinking business — making enterprise-grade software, AI agents, and marketing architecture available at startup-friendly prices, delivered at AI speed. We envision a future where <strong className="text-white font-bold">no brilliant idea dies because of execution bottlenecks or predatory agency retainers</strong>.
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-neutral-900/80 to-background border border-emerald-500/25 relative overflow-hidden flex-1 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Rocket className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Daily Mandate</span>
                    <h3 className="text-2xl font-black text-foreground">Our Mission</h3>
                  </div>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  To bridge the execution gap between ambition and reality. We empower fast-growth startups and seasoned executives to <strong className="text-white font-bold">get their highest-stakes technical and commercial tasks done</strong> — faster, more cost-effectively, and with higher fidelity than any traditional agency or lone freelancer — by compounding the exponential power of AI with irreplaceable human discernment.
                </p>
              </div>
            </div>

            {/* Right: The 3-Way Comparative Benchmark (Why Hybrid Beats Everything) */}
            <div className="lg:col-span-6 rounded-3xl bg-neutral-900/80 border border-border/50 p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Market Comparison</span>
                    <h3 className="text-xl font-black text-foreground">Why Hybrid Beats Everything</h3>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs">
                    The SAGE DO Standard
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-background/60 border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 text-xs font-bold flex items-center justify-center shrink-0">✕</span>
                      <h4 className="text-sm font-bold text-foreground">Versus Pure AI (ChatGPT / Copilot alone)</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pl-8">
                      Raw AI hallucinates, breaks on edge cases, and produces generic boilerplate that fails in production. Our senior human engineers audit every output, write custom glue logic, and guarantee enterprise reliability.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-background/60 border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0">✕</span>
                      <h4 className="text-sm font-bold text-foreground">Versus Traditional Agencies</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pl-8">
                      Agencies charge ₹5–15 Lakh retainers, spend 6 weeks in discovery meetings, and hand your build off to junior interns. We deploy specialized AI pipelines to ship working prototypes in 24–48 hours at 80% lower cost.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-background/60 border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">✕</span>
                      <h4 className="text-sm font-bold text-foreground">Versus Freelancers &amp; Upwork</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pl-8">
                      Freelancers ghost midway, miss critical deadlines, and leave you with undocumented spaghetti code. SAGE DO operates under legally registered MSME governance with guaranteed milestone delivery and a 90% Money-Back SLA.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/20 flex items-center justify-between text-xs text-muted-foreground">
                <span>Result: Uncompromising speed, human taste, and institutional safety.</span>
              </div>
            </div>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: FOUNDER SECTION — Aerospace Precision to AI Execution
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="rounded-3xl bg-neutral-900/60 border border-border/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              {/* Founder Photo & Verified Chip */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-gradient-to-br from-primary via-red-500 to-amber-500 p-1 shadow-2xl shadow-primary/20 rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/founder-mukul.jpg"
                    alt="Mukul Dhiman — Founder, SAGE DO"
                    className="w-full h-full rounded-3xl object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="w-full h-full rounded-3xl bg-neutral-900 flex items-center justify-center"><span class="text-7xl font-black text-white">M</span></div>';
                    }}
                  />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Founder &amp; CEO</span>
                </div>
              </div>

              {/* Founder Bio Narrative */}
              <div className="space-y-6 text-center lg:text-left flex-1">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    <span>Engineering Leadership</span>
                    <span>•</span>
                    <span>Aerospace to Autonomous AI</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-foreground">
                    Mukul Dhiman
                  </h2>
                  <p className="text-base font-semibold text-primary/90 mt-1">
                    Aerospace Systems Engineer · Operations Manager · Founder, SAGE DO
                  </p>
                </div>

                <div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed">
                  <p>
                    With 5 years in aerospace engineering, Mukul specialized in precision manufacturing and high-tolerance systems work across the aerospace sector. His foundation was built on uncompromising zero-defect standards where precision is non-negotiable.
                  </p>
                  <p>
                    Over the past 2 years building SAGE DO, he has led brand-building, business development, and hands-on AI systems integration, backed by multiple advanced AI courses and certifications. Transitioning from leading 25+ person engineering teams to building modern AI hybrid infrastructure, he brings rigorous aerospace checklist discipline to everyday business execution.
                  </p>
                  <div className="p-4 rounded-2xl bg-neutral-950/80 border border-primary/20 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">The "0 to 100" Philosophy</p>
                    <p className="text-sm sm:text-base text-neutral-200 italic leading-relaxed">
                      "In aerospace engineering, a 99% part is a catastrophic failure. In business, Indian founders and executives lose months of critical runway and millions in revenue to sloppy, half-baked 80% agency work. At SAGE DO, we bring aerospace checklist discipline and zero-defect QA to the exponential speed of AI — taking ideas from 0 to 100 without the bloat."
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20saw%20your%20About%20page.%20Can%20we%20discuss%20my%20project%3F" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <div className={buttonVariants({ className: "w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold px-6 h-12 rounded-xl cursor-pointer shadow-lg shadow-green-600/20 flex items-center justify-center" })}>
                      <MessageCircle className="mr-2 h-5 w-5" /> Message Mukul on WhatsApp
                    </div>
                  </a>
                  <a href="tel:+916284925684" className="w-full sm:w-auto">
                    <div className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto font-bold px-6 h-12 rounded-xl cursor-pointer border-border/50 hover:bg-muted/50 flex items-center justify-center" })}>
                      <Phone className="mr-2 h-4 w-4" /> Call Direct: +91 6284925684
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Credential Cards Grid - 2x2 on mobile, 4 columns on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-10 pt-8 border-t border-border/30">
              {credentials.map((c, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/40 border border-border/40 hover:border-primary/30 transition-all space-y-1.5 sm:space-y-2">
                  <div className="text-xl sm:text-2xl">{c.emoji}</div>
                  <h4 className="font-bold text-foreground text-xs sm:text-sm leading-snug">{c.title}</h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-primary/80">{c.subtitle}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: WHAT WE DO — 4 Specialized Execution Engines
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Execution Architecture
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              An AI Execution Engine for Every Part of Your Business
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mt-3">
              Specialized infrastructure replacing months of agency retainers with 24–48 hour precision sprints.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📈",
                name: "Scale Business",
                sub: "Ads, Landing Pages & Funnels",
                desc: "High-converting responsive landing pages, conversion funnels, and precision ad campaigns engineered for immediate ROAS.",
                color: "from-blue-500/10 to-transparent",
                border: "border-blue-500/20",
                badge: "Digital Presence"
              },
              {
                icon: "🚀",
                name: "Startup Launch",
                sub: "Go-to-Market, MVPs & Pitches",
                desc: "Launch your MVP in under 18 days. Investor pitch decks, reactive web apps, and complete day-one brand infrastructure.",
                color: "from-green-500/10 to-transparent",
                border: "border-green-500/20",
                badge: "Sovereign Revenue"
              },
              {
                icon: "💼",
                name: "Executive Branding",
                sub: "LinkedIn Authority & C-Suite Presence",
                desc: "Establish undeniable executive authority. Ghostwritten thought leadership, optimized C-suite profiles, and digital positioning.",
                color: "from-purple-500/10 to-transparent",
                border: "border-purple-500/20",
                badge: "Growth Ops"
              },
              {
                icon: "⚡",
                name: "AI Automation",
                sub: "Agents, Workflows & Scraping",
                desc: "Autonomous WhatsApp sales bots, CRM synchronization pipelines, and missed-call text-back engines operating 24/7.",
                color: "from-orange-500/10 to-transparent",
                border: "border-orange-500/20",
                badge: "Enterprise Infra"
              },
            ].map((cat, i) => (
              <div key={i} className={`p-6 rounded-3xl bg-gradient-to-br ${cat.color} border ${cat.border} hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col justify-between shadow-lg`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <Badge variant="outline" className="text-[10px] border-border/50 text-neutral-400">
                      {cat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-black text-foreground mb-1">{cat.name}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{cat.sub}</p>
                  <p className="text-xs text-neutral-300 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/services" className="tap-inline">
              <div className={buttonVariants({ variant: "outline", className: "font-bold px-8 h-12 rounded-xl cursor-pointer border-border/50 hover:bg-muted/50 gap-2 shadow-sm" })}>
                Explore All 30+ Production Services <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: CASE STUDIES — THE EXECUTION VAULT (Prominent High-Caliber Redesign)
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Track Record</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Case Studies: The Execution Vault
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mt-3">
              Real commercial outcomes delivered through our hybrid AI + human engineering pipeline.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Genesis */}
            <div className="relative rounded-3xl bg-neutral-900/70 border border-primary/25 overflow-hidden p-8 md:p-10 shadow-2xl flex flex-col justify-between hover:border-primary/50 transition-all group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-primary" />
              
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-primary/15 text-primary">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-foreground">Project Genesis</h3>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">B2C Specialized Startup Launch</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary bg-primary/10 font-bold">
                    18-Day Sprints
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-background/50 border border-border/30 space-y-1">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                      The Challenge
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      A fast-moving founder needed to launch a digital platform within 3 weeks but lacked technical resources for the MVP app, landing page, and social media presence. Traditional dev agencies quoted 4 months and ₹8 Lakhs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-background/50 border border-border/30 space-y-1">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider text-primary">
                      <BrainCircuit className="w-3.5 h-3.5 text-primary" />
                      The Hybrid Execution
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      SAGE DO built a reactive web app with integrated Razorpay payment flows, designed the full brand identity, and generated a 30-day viral short-form content runway with scripted video hooks. Everything was orchestrated in parallel over 18 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome Highlight Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/15 via-neutral-950 to-neutral-950 border border-primary/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">Verified Outcome</span>
                  <p className="text-xl md:text-2xl font-black text-white">1,400+ Waitlist Signups</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Secured local angel funding based on polished MVP demo &amp; early traction.</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/20 text-primary shrink-0 hidden sm:block">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Project Elevate */}
            <div className="relative rounded-3xl bg-neutral-900/70 border border-emerald-500/25 overflow-hidden p-8 md:p-10 shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
              
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400">
                      <Activity className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-foreground">Project Elevate</h3>
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Premium Healthcare Digital Ecosystem</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-bold">
                    60-Day Takeover
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-background/50 border border-border/30 space-y-1">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                      The Challenge
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      An established regional specialist clinic chain was losing patient share to national aggregator platforms and desperately needed to re-establish premium authority online and drive direct bookings.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-background/50 border border-border/30 space-y-1">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider text-emerald-400">
                      <BrainCircuit className="w-3.5 h-3.5 text-emerald-400" />
                      The Hybrid Execution
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      SAGE DO deployed a dual-action takeover. We rebuilt a high-performance, conversion-optimized booking web app and simultaneously executed hyper-local SEO and high-intent Google Ads targeting high-ticket surgical and specialist procedures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome Highlight Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-neutral-950 to-neutral-950 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Verified Outcome</span>
                  <p className="text-xl md:text-2xl font-black text-emerald-400">+400% Booking Surge</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Generated ₹35L+ high-ticket revenue at a sub-₹50k total execution cost.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 hidden sm:block">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: EARLY FEEDBACK & VERIFIED TRUSTPILOT REVIEWS
        ═══════════════════════════════════════════════════════════════════ */}
        {allTestimonials.length > 0 && (
          <RevealSection className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 mb-3">
                <span className="text-emerald-400 font-bold">★ 4.0</span>
                <span>Verified TrustScore on Trustpilot</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Early Feedback &amp; Client Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-6 rounded-3xl bg-neutral-900/60 border border-border/30 hover:border-primary/40 transition-all flex flex-col justify-between shadow-lg"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <div className="space-y-3">
                    {testimonial.rating && (
                      <div className="flex gap-1 text-emerald-400">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-neutral-300 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-destructive flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {(testimonial.clientName || "C").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-xs truncate">{testimonial.clientName}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{testimonial.clientRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        )}


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7: WALL OF FAME — Real Deliverables Grid
        ═══════════════════════════════════════════════════════════════════ */}
        {allWorkShowcase.length > 0 && (
          <div id="wall-of-fame" className="scroll-mt-28">
            <RevealSection className="mb-24">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>Wall of Fame · Real Commercial Deliverables</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  What We've Already Delivered
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto mt-3">
                  A selection of digital platforms, custom business systems, and conversion infrastructure engineered and shipped by SAGE DO across India.
                </p>
              </div>

              {/* Wall of Fame Grid: Horizontal Swipeable Snap Carousel on Mobile (<sm), Grid on Desktop */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible scrollbar-none">
                {allWorkShowcase.map((work) => {
                  const category = getCategoryFromTitle(work.title || "");
                  return (
                    <div
                      key={work.id}
                      className="group rounded-2xl sm:rounded-3xl bg-neutral-900/60 border border-border/30 overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1 shadow-lg flex flex-col w-[82vw] max-w-[310px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
                      data-testid={`card-work-${work.id}`}
                    >
                      {work.imageUrl && (
                        <div className="relative h-40 sm:h-48 overflow-hidden bg-neutral-950">
                          <img
                            src={work.imageUrl}
                            alt={work.title || "Work showcase"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                            loading="eager"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 text-[10px] font-semibold">
                              {category}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                        <div>
                          <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                            {work.title}
                          </h3>
                          <p className="text-xs text-neutral-300 leading-relaxed mt-1.5 sm:mt-2 line-clamp-3 sm:line-clamp-none">
                            {work.content}
                          </p>
                        </div>

                        <div className="pt-2.5 sm:pt-3 border-t border-border/20 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                            <span>Delivered</span>
                          </span>
                          <span>SAGE DO Hybrid Sprint</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Carousel Swipe Indicator */}
              <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-muted-foreground mt-2">
                <ArrowRight className="w-3.5 h-3.5 animate-pulse text-primary" />
                <span>Swipe horizontally to view all 6 delivered systems</span>
              </div>
            </RevealSection>
          </div>
        )}


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 8: CONNECT & REACH OUT
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Channels
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Connect With Our Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${platform.name.toLowerCase()}`}
                className="group"
              >
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-border/30 hover:border-primary/40 transition-all hover:-translate-y-1 text-center space-y-3 shadow-md">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${platform.color} mx-auto w-fit shadow-md`}>
                    <platform.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{platform.name}</h3>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{platform.handle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact & Office Details Card */}
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-border/40 backdrop-blur-xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Direct Contact</h3>
                <div className="space-y-1 text-neutral-300 text-sm">
                  <p className="flex items-center">
                    <a href="tel:+916284925684" className="inline-flex items-center gap-2.5 py-2.5 min-h-[44px] hover:text-white transition-colors">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>+91 6284925684</span>
                    </a>
                  </p>
                  <p className="flex items-center">
                    <a href="mailto:hello@sagedo.in" className="inline-flex items-center gap-2.5 py-2.5 min-h-[44px] hover:text-white transition-colors">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>hello@sagedo.in</span>
                    </a>
                  </p>
                  <p className="flex items-center">
                    <a href="https://wa.me/916284925684" className="inline-flex items-center gap-2.5 py-2.5 min-h-[44px] hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                      <span>+91 6284925684 (WhatsApp)</span>
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:border-l md:border-border/30 md:pl-8">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Headquarters &amp; MSME</h3>
                <div className="space-y-2 text-neutral-300 text-sm">
                  <p className="font-semibold text-white">SAGE DO AI</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    SCO-38, Mohali City Centre, Aerocity<br />
                    Mohali, Punjab 140306, India
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono pt-1">
                    MSME Reg: UDYAM-HP-04-0042175
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Operating Hours: Mon – Sat, 10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>


        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9: FINAL HIGH-IMPACT CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <RevealSection className="text-center pb-4">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-t from-emerald-500/10 via-neutral-900/80 to-background border border-border/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary" />
            
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
              Let's Build Something Sovereign Together
            </h2>
            <p className="text-base md:text-lg text-neutral-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              No sales pitch. No high-pressure tactics. Just a direct conversation about your product, your technical bottlenecks, and how fast we can ship it.
            </p>
            <p className="text-sm text-emerald-400 font-bold mb-8 flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Average response time: Under 5 minutes</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20discuss%20my%20project.%20What's%20the%20best%20way%20to%20get%20started%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <div className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-14 px-10 text-lg font-semibold bg-green-600 hover:bg-green-500 rounded-xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 cursor-pointer flex items-center justify-center" })}>
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us Now
                </div>
              </a>
              <a href="tel:+916284925684" className="w-full sm:w-auto">
                <div className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto h-14 px-10 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer flex items-center justify-center" })}>
                  <Phone className="mr-2 h-4 w-4" /> Call Directly
                </div>
              </a>
            </div>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}
