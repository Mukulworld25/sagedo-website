import React from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Trophy, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Crown
} from "lucide-react";
import { InteractivePortfolioGallery } from "@/components/InteractivePortfolioGallery";
import { CaseStudyTeardowns } from "@/components/CaseStudyTeardowns";
import { TCOAsymmetryTable } from "@/components/TCOAsymmetryTable";
import { QAChecklistSection } from "@/components/QAChecklistSection";
import ProofAndAudioWall from "@/components/ProofAndAudioWall";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export default function WallOfFame() {
  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 selection:bg-amber-500/30">
      <Helmet>
        <title>Wall of Fame | SAGE DO — Speed of AI. Precision of Humans. Portfolio & Case Studies</title>
        <meta
          name="description"
          content="Explore 150+ custom systems delivered across India. Hand-coded sub-second web platforms, zero-seat custom CRMs, WhatsApp AI sales gateways, and defence-grade engineering case studies. Mohali, Chandigarh, India."
        />
        <meta
          name="keywords"
          content="SAGE DO portfolio, AI case studies, custom CRM portfolio, website speed portfolio, Kizen CRM case study, healthcare web case study, ERP system Chandigarh, Mohali AI agency, Mukul Dhiman portfolio"
        />
        <link rel="canonical" href="https://sagedo.in/wall-of-fame" />
        <meta property="og:title" content="Wall of Fame | SAGE DO Sovereign Systems & Case Studies" />
        <meta
          property="og:description"
          content="Explore real production systems engineered and shipped by SAGE DO. Sub-second performance, 100% data sovereignty, and zero per-seat software taxes."
        />
        <meta property="og:url" content="https://sagedo.in/wall-of-fame" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wall of Fame | SAGE DO" />
        <meta
          name="twitter:description"
          content="150+ custom systems delivered across India. Hand-coded 0.8s websites, zero-seat CRMs, and WhatsApp sales bots."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "SAGE DO Wall of Fame",
            "url": "https://sagedo.in/wall-of-fame",
            "description": "Production case studies and live interactive portfolio of systems shipped by SAGE DO.",
            "provider": {
              "@type": "Organization",
              "name": "SAGE DO AI",
              "url": "https://sagedo.in"
            }
          })}
        </script>
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════════
          WALL OF FAME HERO HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden border-b border-white/[0.08]">
        {/* Glow Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>THE SOVEREIGN EXECUTION VAULT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.08]">
              The Wall of{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Fame
              </span>
              .
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Real systems. Verified metrics. Zero excuses. Explore production platforms engineered and shipped across India with <span className="text-white font-semibold">sub-second performance</span>, <span className="text-emerald-400 font-semibold">100% data sovereignty</span>, and <span className="text-amber-400 font-semibold">₹0 per-seat SaaS taxes</span>.
            </p>

            {/* Institutional Stat Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>DELIVERED</span>
                </div>
                <p className="text-3xl font-black text-white">150+</p>
                <p className="text-[11px] text-neutral-400 font-medium">Custom Systems Shipped</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>LATENCY</span>
                </div>
                <p className="text-3xl font-black text-white">0.8s</p>
                <p className="text-[11px] text-neutral-400 font-medium">Average Mobile LCP</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SOVEREIGNTY</span>
                </div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[11px] text-neutral-400 font-medium">Client Source Code Ownership</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VELOCITY SLA</span>
                </div>
                <p className="text-3xl font-black text-white">48h</p>
                <p className="text-[11px] text-neutral-400 font-medium">Interactive Prototype SLA</p>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <a
                href="#gallery"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-colors"
              >
                View 8 Systems ↓
              </a>
              <a
                href="#teardowns"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-colors"
              >
                Case Study Teardowns ↓
              </a>
              <a
                href="#qa-checklist"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-colors"
              >
                30-Point QA Protocol ↓
              </a>
              <a
                href="#tco"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-colors"
              >
                TCO Asymmetry ↓
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: THE 8 INTERACTIVE REAL-WORK SYSTEMS
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="gallery" className="scroll-mt-20">
        <InteractivePortfolioGallery />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: FLAGSHIP CASE STUDY TEARDOWNS
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="teardowns" className="scroll-mt-20">
        <CaseStudyTeardowns />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: 30-POINT DEFENCE-GRADE QA INSPECTION PROTOCOL
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="qa-checklist" className="scroll-mt-20">
        <QAChecklistSection />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: TOTAL COST OF OWNERSHIP (TCO) ASYMMETRY TABLE
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="tco" className="scroll-mt-20">
        <TCOAsymmetryTable />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: PROOF & AUDIO VERIFICATION WALL
      ═══════════════════════════════════════════════════════════════════ */}
      <ProofAndAudioWall />

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA: START YOUR SOVEREIGN BUILD
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-white/[0.08] bg-gradient-to-b from-[#0B0E17] to-[#07090E] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>48-Hour Functional Prototype Guarantee</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
              Ready to Claim Your{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Sovereign System
              </span>
              ?
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
              No bloated per-seat SaaS taxes. No outsourced agency fluff. Hand-coded architecture, milestone-gated delivery, and 100% source code ownership from day one.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-call">
                <Button className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Book Architecture Scoping Call</span>
                </Button>
              </Link>
              <a
                href="https://wa.me/916284925684?text=Hi%20Mukul,%20saw%20the%20Wall%20of%20Fame%20and%20want%20to%20discuss%20a%20sovereign%20build."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("wall_of_fame_bottom_cta")}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 bg-white/5 hover:bg-white/10 text-white border-white/15 font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
                  <span>WhatsApp Mukul Directly</span>
                </Button>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
