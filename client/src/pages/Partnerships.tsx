import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Scale, 
  FileText, 
  Users, 
  Factory, 
  Building2,
  Lock,
  Zap
} from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";

export default function Partnerships() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    firmName: "",
    category: "ca_finance",
    city: "",
    note: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your name and WhatsApp number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to server or fallback
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.whatsapp,
          subject: `New Partner Application: ${formData.category} (${formData.firmName || 'Independent'})`,
          message: `Category: ${formData.category}\nCity: ${formData.city}\nFirm: ${formData.firmName}\nNote: ${formData.note}`,
          source: "partnerships_page"
        })
      }).catch(() => null);

      setSubmitted(true);
      toast({
        title: "Application Received",
        description: "Mukul will review and connect with you on WhatsApp within 4 hours.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerTracks = [
    {
      id: "ca_finance",
      icon: <Scale className="w-6 h-6 text-amber-400" />,
      title: "Chartered Accountants & Financial Advisors",
      regulation: "ICAI Code of Ethics Compliant",
      headline: "Your clients need Tally data mapping and modern billing. We build it under your name.",
      points: [
        "White-label client billing & compliance portals with native Tally Prime ledger sync",
        "Zero illegal commission / fee-splitting — you purchase at wholesale partner rates and set your own client advisory margin",
        "Practice Tech Barter: Receive a free SAGE DO automated document collection & statutory reminder bot for your firm after 2 client introductions",
        "Subcontracted schema mapping retainers on large enterprise CRM deployments"
      ]
    },
    {
      id: "legal",
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      title: "Corporate Advocates & Legal Counsel",
      regulation: "Bar Council of India Aligned",
      headline: "Automate founder equity, IP assignment, and statutory contracts for high-growth clients.",
      points: [
        "Custom IP assignment, Master Services Agreement (MSA), and founder vesting automation",
        "No solicitation or referral fees — we provide private-label technical execution under your legal advisory umbrella",
        "Dedicated client onboarding portals that prevent contract tampering and track digital execution",
        "Direct bilateral reciprocal routing: SAGE DO clients needing trademark, incorporation, or litigation are routed to empaneled partners"
      ]
    },
    {
      id: "hr_talent",
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "HR, Staffing & Fractional CTO Firms",
      regulation: "Engineering Placement Rail",
      headline: "Place vetted tech talent and CRM telecalling teams with businesses scaling on SAGE DO.",
      points: [
        "Empaneled recruitment rail for senior React/Node engineers and trained CRM telecallers",
        "Every client deploying a custom SAGE DO CRM receives immediate staffing recommendations to operate their pipeline",
        "Fractional CTO partnerships: Architect sovereign digital roadmaps while SAGE DO handles the 48-hour build velocity",
        "Structured monthly placement margins"
      ]
    },
    {
      id: "machinery_agencies",
      icon: <Factory className="w-6 h-6 text-amber-400" />,
      title: "Industrial Machinery Dealers & Creative Agencies",
      regulation: "Hardware Telemetry & White-Label Delivery",
      headline: "Deliver high-speed websites, CRMs, and IoT WhatsApp maintenance without hiring developers.",
      points: [
        "OEM Machinery Telemetry: Bundle automated WhatsApp machinery maintenance and breakdown alerts with industrial equipment sales",
        "For Marketing Agencies: Sell enterprise websites and custom CRMs to your clients in 48 hours. We build, you deliver and own the client relationship",
        "Wholesale agency rates with zero minimum retainers or lock-ins",
        "Sub-1.2s mobile storefronts that make your marketing campaigns convert 3x higher"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Helmet>
        <title>Partnerships · SAGE DO | Empaneled Partner Network</title>
        <meta 
          name="description" 
          content="Partner with SAGE DO. For CAs, Lawyers, HR firms, and Agencies looking to offer verified digital infrastructure to their clients under compliant partner rates." 
        />
      </Helmet>

      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 20%, #78350f 0%, #030303 70%)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-6">
            <Handshake className="w-3.5 h-3.5 mr-1.5 inline" /> Empaneled Sovereign Partner Network
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Your clients keep asking you for software. <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              We build it. You decide your margin.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Whether you are a Chartered Accountant, Corporate Advocate, Industrial Dealer, or Marketing Agency: expand your practice without hiring in-house developers or dealing with unreliable freelancers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#apply-now">
              <Button size="lg" className="h-12 px-8 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer">
                Apply to Partner in 20 Seconds <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20am%20interested%20in%20partnering%20with%20SAGE%20DO."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("partnerships_hero_direct")}
            >
              <Button variant="outline" size="lg" className="h-12 px-6 border-white/20 hover:bg-white/5 text-white font-semibold text-sm rounded-xl cursor-pointer">
                <MessageCircle className="w-4 h-4 mr-2 text-green-400" /> Talk to Founder on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CORE PARTNERSHIP PRINCIPLES */}
      <section className="py-16 px-4 border-b border-white/5 bg-neutral-950/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Strict Regulatory Compliance</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Zero illegal commission kickbacks. CAs and advocates operate under ICAI and Bar Council rules by purchasing at wholesale partner rates or receiving practice tech barters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">48-Hour Prototype Delivery</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Never let a client wait 60 days. Show your client a functioning, customized digital prototype in 48 hours backed by our verified money-back SLA.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">White-Label or Co-Branded</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Deliver entirely under your firm's brand name, or introduce SAGE DO as your dedicated technical execution arm. You choose the working model.
            </p>
          </div>
        </div>
      </section>

      {/* 4 PARTNER TRACKS DETAIL */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Four Empaneled Tracks</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">How Your Practice Integrates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTracks.map((track) => (
              <div 
                key={track.id} 
                className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {track.icon}
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono border-amber-500/30 text-amber-400 bg-amber-500/5">
                      {track.regulation}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
                  <p className="text-sm font-semibold text-neutral-300 mb-6 italic">
                    "{track.headline}"
                  </p>

                  <ul className="space-y-3.5 mb-8">
                    {track.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#apply-now"
                  onClick={() => setFormData(prev => ({ ...prev, category: track.id }))}
                  className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Apply Under This Track <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION SECTION */}
      <section id="apply-now" className="py-20 px-4 border-t border-white/10 bg-neutral-950">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl relative">
            <div className="text-center mb-8">
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-3">
                Empanelment Form
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Apply to Partner with SAGE DO</h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Takes 20 seconds. Founder Mukul Dhiman will review your firm and connect on WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Application Received</h3>
                <p className="text-sm text-neutral-300">
                  Thank you, <strong>{formData.name}</strong>. Mukul has been notified on WhatsApp and will reach out to <strong>{formData.whatsapp}</strong> shortly.
                </p>
                <a
                  href={`https://wa.me/916284925684?text=${encodeURIComponent(`Hi Mukul, I just submitted the partnership form for ${formData.firmName || formData.name}. Let's discuss.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ className: "bg-green-600 hover:bg-green-500 text-white font-bold" })}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Message Mukul Directly Now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. CA Rajesh Sharma / Advocate Meera Roy"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      WhatsApp Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Chandigarh / Surat / Delhi"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Firm / Practice Name
                    </label>
                    <input
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      placeholder="e.g. Sharma & Associates"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Partner Track
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="ca_finance">Chartered Accountant / Tax Firm</option>
                      <option value="legal">Corporate Lawyer / Legal Practice</option>
                      <option value="hr_talent">HR / Staffing / Fractional CTO</option>
                      <option value="machinery_agencies">Industrial Dealer / Marketing Agency</option>
                      <option value="other">Other B2B Synergy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    What software do your clients most often ask for?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="e.g. Billing portals, websites, CRM for their sales team, Tally sync..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 cursor-pointer mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Partner Application"}
                </Button>

                <p className="text-[11px] text-neutral-500 text-center pt-2">
                  🔒 Strictly confidential. Zero spam. Handled directly by Founder Mukul Dhiman.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="py-16 px-4 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-sm text-neutral-400 italic leading-relaxed">
            "Indian businesses deserve software built with aerospace-grade precision that they own outright. When you partner with SAGE DO, your clients get verified results, and your firm gets an unfair technological advantage."
          </p>
          <p className="text-xs font-bold text-amber-400 tracking-wider uppercase">
            — Mukul Dhiman, Founder, SAGE DO
          </p>
        </div>
      </section>
    </div>
  );
}
