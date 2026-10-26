import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  Factory, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  ShieldCheck, 
  Database, 
  Clock, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  MessageCircle, 
  Quote, 
  ChevronRight,
  Server,
  Layers,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

interface TeardownData {
  id: string;
  tag: string;
  client: string;
  title: string;
  industry: string;
  sprint: string;
  primaryMetric: { value: string; label: string; sub: string };
  secondaryMetrics: { value: string; label: string }[];
  summary: string;
  before: {
    headline: string;
    points: string[];
    costOrLatency: string;
  };
  after: {
    headline: string;
    points: string[];
    costOrLatency: string;
  };
  architecture: {
    frontend: string;
    database: string;
    backend: string;
    automation: string;
    security: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
  whatsappText: string;
}

const TEARDOWNS: TeardownData[] = [
  {
    id: 'kizen-crm',
    tag: 'Sovereign CRM & Admissions',
    client: 'Kizen Educational Institute',
    title: 'Slashing Lead Latency from 6 Hours to 45 Seconds & Eliminating ₹3.6L/Yr SaaS Tax',
    industry: 'Higher Education & Multi-Branch Admissions',
    sprint: '14–21 Day Production Sprint',
    primaryMetric: {
      value: '45s',
      label: 'Lead Latency (Down from 6h)',
      sub: '99.8% reduction in student drop-off'
    },
    secondaryMetrics: [
      { value: '₹18,00,000+', label: 'Salvaged Admissions' },
      { value: '29 Migrations', label: 'PostgreSQL DB Upgrades' },
      { value: '₹3,60,000/yr', label: 'Permanent SaaS Tax Saved' }
    ],
    summary: 'A multi-campus educational institution was losing prospective students to aggressive competitors due to 6-hour email follow-up delays and bleeding ₹3.6L/year on 20 Zoho One seats. SAGE DO deployed a bespoke sovereign CRM with WhatsApp Cloud API round-robin dispatch and full database ownership.',
    before: {
      headline: 'The Legacy State (Zoho One + Email Forms)',
      costOrLatency: '6-Hour Latency · ₹3.6L/Year Recurring SaaS Fee',
      points: [
        'Prospective students waited an average of 6 hours for initial counselor contact',
        'Zoho One subscription cost ₹1,500/seat/month across 20 counselors (₹3.6L/yr software tax)',
        'Zero unified lead deduplication—leads were frequently assigned to multiple staff or dropped',
        'No direct WhatsApp integration; manual telecalling resulted in 44% unanswered calls'
      ]
    },
    after: {
      headline: 'The Sovereign SAGE DO Architecture',
      costOrLatency: '45-Second WhatsApp Response · ₹0 Per-Seat Fee Forever',
      points: [
        'Automated WhatsApp Cloud API triage qualifies student course intent in sub-45 seconds',
        'Sovereign PostgreSQL database on client-owned VPS with 100% full source code handover',
        'Intelligent round-robin telecaller allocation with instant counselor WhatsApp push notifications',
        '29 Drizzle database migrations with automated daily WAL snapshots and disaster recovery'
      ]
    },
    architecture: {
      frontend: 'React 18 + Vite SPA, Tailwind CSS, sub-0.8s responsive counselor dashboard',
      database: 'PostgreSQL with Row-Level Security (RLS) & 29 automated Drizzle migrations',
      backend: 'Node.js Express microservice with idempotent webhook processing queue',
      automation: 'Meta WhatsApp Cloud API direct integration with custom qualification trees',
      security: 'HMAC SHA-256 webhook signatures, zero third-party telemetry, full root handover'
    },
    quote: {
      text: 'Moving off Zoho saved us ₹3.6 Lakhs every year in software licenses alone. But the true commercial triumph was the 45-second WhatsApp response—we salvaged over ₹18 Lakhs in admissions that previously would have enrolled with competing institutes.',
      author: 'Admissions Director',
      role: 'Kizen Educational Network (Chandigarh & Punjab)'
    },
    whatsappText: "Hi Mukul, I read the Kizen CRM teardown. Can we audit our admissions / sales pipeline for a sovereign CRM?"
  },
  {
    id: 'healthcare-clinic',
    tag: 'High-Performance Web Gateway',
    client: 'Specialist Medical & Dental Practice',
    title: 'Sub-0.8s Mobile Booking Engine Delivering +42% Patient Appointment Conversions',
    industry: 'Specialist Healthcare & Dental Surgery',
    sprint: '7–10 Day Rapid Sprint',
    primaryMetric: {
      value: '+42%',
      label: 'Appointment Conversions',
      sub: 'Measured over 90 days post-launch'
    },
    secondaryMetrics: [
      { value: '0.74s LCP', label: 'Mobile Largest Contentful Paint' },
      { value: '100 / 100', label: 'Google Lighthouse Performance' },
      { value: '< 4% Drop', label: 'Patient Booking Abandonment' }
    ],
    summary: 'A premier dental and surgical practice suffered from a bloated WordPress website (4.8s mobile load time) where 43% of prospective patients bounced before seeing the doctor profiles. SAGE DO re-engineered the complete web booking flow into an ultra-fast React app with instant WhatsApp confirmations.',
    before: {
      headline: 'The Legacy State (Bloated WordPress + Plugin Hell)',
      costOrLatency: '4.8s Mobile Load · 43% Mobile Bounce Rate',
      points: [
        'WordPress theme with 32 unvetted plugins took nearly 5 seconds to render on 4G networks',
        'Receptionist telephone bottleneck caused 35% unanswered patient calls during surgical hours',
        'Clunky third-party iframe booking widget had a 62% abandonment rate on mobile devices',
        'Zero structured MedicalBusiness schema—invisible in ChatGPT, Perplexity, and AI Overviews'
      ]
    },
    after: {
      headline: 'The Sovereign SAGE DO Architecture',
      costOrLatency: '0.74s Mobile LCP · 100/100 Core Web Vitals',
      points: [
        'Sub-0.8s mobile load time with pre-rendered static HTML and responsive WebP image pipeline',
        '1-tap frictionless WhatsApp appointment triage that confirms doctor slots automatically',
        'Fully responsive 360px–1440px layout tested across 20+ real mobile screen viewports',
        'Server-rendered JSON-LD schema graphs for MedicalWebPage, Physician, and LocalBusiness'
      ]
    },
    architecture: {
      frontend: 'React 18, Vite static pre-rendering, modern CSS container queries, Tailwind',
      database: 'High-availability Supabase PostgreSQL database with encrypted patient records',
      backend: 'Edge API routes with sub-30ms global response time via Vercel Edge Network',
      automation: 'Automated 24h & 2h pre-appointment WhatsApp reminders, slashing no-shows to 3.8%',
      security: 'HIPAA-grade data hygiene, zero third-party cookie trackers, strict CSP headers'
    },
    quote: {
      text: 'Our patient appointment conversion jumped 42% in the very first month. The booking experience on mobile is instantaneous—patients repeatedly tell us it feels faster than any app on their phone.',
      author: 'Lead Practice Partner & Oral Surgeon',
      role: 'Specialist Dental Practice (Mohali City Centre)'
    },
    whatsappText: "Hi Mukul, I read the Healthcare Clinic teardown (+42% bookings). Can we build a high-speed web gateway for our practice?"
  },
  {
    id: 'industrial-forge',
    tag: 'Industrial RFQ & ERP Bridge',
    client: 'Industrial Precision Forge & Forgings',
    title: '42-Second Response to Factory Procurement Tenders Saving ₹12L/Yr vs SAP / Zoho',
    industry: 'Heavy Precision Engineering & Manufacturing',
    sprint: '14-Day Production Sprint',
    primaryMetric: {
      value: '42s',
      label: 'Factory RFQ Latency',
      sub: 'Automated CAD & spec dispatch'
    },
    secondaryMetrics: [
      { value: '₹12,00,000/yr', label: 'Saved vs SAP / Zoho Enterprise' },
      { value: '100% Auto', label: 'Tally Prime Ledger Bridge' },
      { value: '₹14.2L PO', label: 'Closed in Week 2 Post-Handover' }
    ],
    summary: 'A precision metal forging exporter was losing high-ticket global procurement tenders because technical CAD drawings and rough estimates took 24–48 hours to assemble. SAGE DO engineered an automated WhatsApp RFQ triage engine paired with a bi-directional Tally Prime ledger bridge.',
    before: {
      headline: 'The Legacy State (Manual Email Estimations + Disconnected Tally)',
      costOrLatency: '24–48h RFQ Latency · Disconnected Factory Silos',
      points: [
        'Overseas buyers in Germany and USA waited up to 48 hours for raw material grade estimates',
        'Enterprise SaaS vendors (SAP/Zoho) quoted ₹12L/year with 6-month consulting integration overhead',
        'Factory floor engineers manually re-entered approved orders into desktop Tally Prime',
        'High-value confidential CAD drawings were shared insecurely over unsecured personal emails'
      ]
    },
    after: {
      headline: 'The Sovereign SAGE DO Architecture',
      costOrLatency: '42-Second WhatsApp RFQ · Bi-Directional Tally Sync',
      points: [
        'Automated WhatsApp RFQ triage dispatches dynamic technical CAD spec sheets in 42 seconds',
        'Direct Tally Prime XML bridge auto-generates customer sales vouchers and GST ledgers on deal close',
        'Encrypted private asset vault with expiring pre-signed URLs protects proprietary engineering IP',
        'Sovereign one-time CapEx build with zero per-user software taxes for shop-floor supervisors'
      ]
    },
    architecture: {
      frontend: 'React 18 Enterprise portal with role-based dispatch and RFQ tracking console',
      database: 'PostgreSQL with composite B-Tree indexes handling 100,000+ item catalog SKUs',
      backend: 'Node.js microservices with XML transformer engine for desktop Tally Prime integration',
      automation: 'Meta WhatsApp Cloud API with document message payloads for automated PDF/CAD delivery',
      security: 'Cryptographic HMAC idempotency keys preventing duplicate Tally accounting vouchers'
    },
    quote: {
      text: 'When a European procurement team submits an RFQ at 2 AM, our system dispatches technical CAD specs and rough quotes to their WhatsApp in 42 seconds. They assumed we have a 50-person night shift. We closed a ₹14.2 Lakh purchase order in our second week.',
      author: 'Managing Director',
      role: 'Industrial Precision Forgings (Ludhiana Industrial Area)'
    },
    whatsappText: "Hi Mukul, I read the Industrial Precision Forge teardown. Can we build an automated WhatsApp RFQ and Tally bridge for our factory?"
  }
];

export function CaseStudyTeardowns() {
  const [activeTab, setActiveTab] = useState<string>('kizen-crm');
  const current = TEARDOWNS.find((t) => t.id === activeTab) || TEARDOWNS[0];

  return (
    <section id="case-studies" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#030303] via-[#080808] to-[#030303] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Forensic Architectural Teardowns</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-orbitron">
            Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">Execution</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto font-inter">
            Deep technical breakdowns of real production systems built, verified, and deployed by SAGE DO across Indian enterprise and healthcare leaders.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {TEARDOWNS.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 border-red-500/60 text-white shadow-lg shadow-red-500/10'
                    : 'bg-neutral-950/60 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {item.id === 'kizen-crm' && <Building2 className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-neutral-500'}`} />}
                {item.id === 'healthcare-clinic' && <Stethoscope className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-500'}`} />}
                {item.id === 'industrial-forge' && <Factory className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />}
                <span>{item.client}</span>
              </button>
            );
          })}
        </div>

        {/* Active Teardown Container */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative">
          
          {/* Header Row: Badge & Sprint SLA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <Badge className="bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-mono uppercase tracking-wider">
                  {current.tag}
                </Badge>
                <span className="text-xs text-neutral-500">·</span>
                <span className="text-xs text-neutral-400 font-mono">{current.industry}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-orbitron">
                {current.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Handover SLA: {current.sprint}</span>
            </div>
          </div>

          {/* Primary & Secondary Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-white/10">
            {/* Primary Hero Metric */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent border border-red-500/30">
              <span className="text-xs font-mono uppercase tracking-wider text-red-400 block mb-1">
                {current.primaryMetric.label}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white font-orbitron tracking-tight mb-1">
                {current.primaryMetric.value}
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {current.primaryMetric.sub}
              </p>
            </div>

            {/* 3 Secondary Metrics */}
            {current.secondaryMetrics.map((sec, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  {sec.label}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-orbitron tracking-tight">
                  {sec.value}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-2 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Independently Audited</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Paragraph */}
          <div className="py-6 border-b border-white/10">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-inter">
              <strong className="text-white">Commercial Context: </strong>
              {current.summary}
            </p>
          </div>

          {/* Before vs After Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8 border-b border-white/10">
            {/* Before (Legacy State) */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-red-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>The Broken Status Quo</span>
                  </div>
                  <Badge variant="outline" className="border-red-500/30 text-red-400 text-[11px] font-mono">
                    Legacy Agency / SaaS
                  </Badge>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-orbitron">
                  {current.before.headline}
                </h4>
                <div className="text-xs font-mono text-red-400/90 mb-4 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                  {current.before.costOrLatency}
                </div>
                <ul className="space-y-3">
                  {current.before.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed font-inter">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* After (SAGE DO Architecture) */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-emerald-500/30 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>The SAGE DO Sovereign Architecture</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono">
                    Verified Production
                  </Badge>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-orbitron">
                  {current.after.headline}
                </h4>
                <div className="text-xs font-mono text-emerald-400 mb-4 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20 font-bold">
                  {current.after.costOrLatency}
                </div>
                <ul className="space-y-3">
                  {current.after.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-200 leading-relaxed font-inter">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Architectural Breakdown Matrix */}
          <div className="py-8 border-b border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Technical Stack & Architectural Hardening
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-red-400" />
                  <span>Frontend Client</span>
                </div>
                <p className="text-xs text-white font-medium">{current.architecture.frontend}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Database & Schema</span>
                </div>
                <p className="text-xs text-white font-medium">{current.architecture.database}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>API & Queues</span>
                </div>
                <p className="text-xs text-white font-medium">{current.architecture.backend}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                  <span>Speed-to-Lead Webhook</span>
                </div>
                <p className="text-xs text-white font-medium">{current.architecture.automation}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Security & Ownership Standards</span>
                </div>
                <p className="text-xs text-white font-medium">{current.architecture.security}</p>
              </div>
            </div>
          </div>

          {/* Client Quote Strip */}
          <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <Quote className="w-8 h-8 text-red-500/60 shrink-0 mt-1" />
              <div>
                <p className="text-sm sm:text-base text-neutral-200 italic leading-relaxed mb-2 font-inter">
                  "{current.quote.text}"
                </p>
                <div className="text-xs font-mono">
                  <span className="font-bold text-white">{current.quote.author}</span>
                  <span className="text-neutral-500"> — </span>
                  <span className="text-neutral-400">{current.quote.role}</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={`https://wa.me/916284925684?text=${encodeURIComponent(current.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`case_study_${current.id}`)}
                className="w-full sm:w-auto"
              >
                <Button className="w-full h-11 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss Similar Build</span>
                </Button>
              </a>
              <Link href="/free-demo">
                <Button variant="outline" className="w-full h-11 border-white/20 text-neutral-200 hover:text-white hover:bg-white/10 text-xs font-bold rounded-xl cursor-pointer">
                  <span>Get 48h Preview</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CaseStudyTeardowns;
