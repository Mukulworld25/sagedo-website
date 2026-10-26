import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import {
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Zap,
  ArrowRight,
  Smartphone,
  Monitor,
  Database,
  Code,
  Server,
  MessageSquare,
  Layers,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

export type ProjectCategory =
  | "All Projects"
  | "Healthcare & MedTech"
  | "Enterprise & ERP"
  | "Consumer & D2C"
  | "Local SEO & Growth";

export interface PortfolioProject {
  id: string;
  title: string;
  shortTitle: string;
  client: string;
  industry: string;
  category: "Healthcare & MedTech" | "Enterprise & ERP" | "Consumer & D2C" | "Local SEO & Growth";
  sprint: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  secondaryMetrics: string[];
  statHighlight: string;
  summary: string;
  problem: string;
  solution: string;
  desktopImage: string;
  mobileImage: string;
  urlMockup: string;
  tags: string[];
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    speedToLead: string;
    sovereignty: string;
  };
  tcoSavings: string;
  whatsappMessage: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "kizen-crm",
    title: "Kizen Education — Zero-Seat Custom CRM & Lead Routing Pipeline",
    shortTitle: "Zero-Seat Custom CRM",
    client: "Kizen Education (crm.kizen.in)",
    industry: "Ed-Tech & Professional Institute",
    category: "Enterprise & ERP",
    sprint: "14–21 Days Sprint",
    primaryMetric: {
      value: "45s",
      label: "Lead Response Latency (Down from 6 Hours)",
    },
    secondaryMetrics: [
      "₹18,00,000+ Salvaged Admissions",
      "₹3.6L/yr SaaS Fees Slashed",
      "29 Hardened SQL Migrations",
    ],
    statHighlight: "29 SQL Migrations · 4-Tier RLS · 0 Lost Leads",
    summary:
      "Eliminated ₹3.6L/yr per-seat SaaS tax by replacing fragmented Google Sheets and expensive CRM licenses with a custom, high-velocity PostgreSQL lead triage system.",
    problem:
      "The client was hemorrhaging student leads due to a 6-hour inquiry response latency, fragmented Google Sheets data, and escalating per-seat software taxes from commercial SaaS CRM vendors quoting ₹3.6L/year.",
    solution:
      "Architected a custom, zero-seat PostgreSQL CRM with sub-60s WhatsApp cloud webhook intake, 2-way conflict-free Google Sheets sync, and 4-tier Row Level Security (Owner, Counselor, Accounts, Reception).",
    desktopImage: "/sample-crm-lead-automation.png",
    mobileImage: "/sample-crm-lead-automation.webp",
    urlMockup: "crm.kizen.in/admissions/pipeline",
    tags: [
      "PostgreSQL",
      "Supabase RLS",
      "Next.js 14",
      "WhatsApp Cloud API",
      "Google Sheets Sync",
      "Auto-PDF Invoices",
    ],
    features: [
      "Multi-Role Row Level Security (Owner, Counselor, Accounts, Reception)",
      "Sub-60s Inbound Lead Auto-Assignment via WhatsApp webhook",
      "29 Hardened Database Migrations with zero downtime",
      "Two-Way Realtime Google Sheets sync with conflict resolution",
      "Automated UPI Receipt & PDF Generation with student ID tracking",
      "100% Code & Database Ownership hosted on sovereign VPS",
    ],
    architecture: {
      frontend: "Next.js 14 / React 18, Tailwind CSS, Radix UI",
      backend: "PostgreSQL on Supabase, 29 SQL Migrations, 4-Tier RLS",
      speedToLead: "Meta Cloud WhatsApp Webhook (Sub-45s Ingestion)",
      sovereignty: "100% Client-Owned VPS, Zero Per-Seat SaaS License",
    },
    tcoSavings: "Saved ₹3,60,000/yr vs Zoho / LeadSquared",
    whatsappMessage:
      "Hi Mukul, I saw the Kizen Education Zero-Seat CRM on sagedo.in and want a custom CRM prototype for my business.",
  },
  {
    id: "proactive-dental",
    title: "Proactive Dental Surgery — Specialist Patient Booking Portal",
    shortTitle: "Healthcare Specialist Clinic",
    client: "Proactive Dental Surgery Burpengary (proactivedental.com.au)",
    industry: "Healthcare & Implant Surgery",
    category: "Healthcare & MedTech",
    sprint: "7–10 Days Sprint",
    primaryMetric: {
      value: "+42%",
      label: "Appointment Conversion Rate Surge",
    },
    secondaryMetrics: [
      "Sub-0.8s Mobile Booking",
      "100/100 Lighthouse Performance",
      "Zero Layout Shift (CLS 0.00)",
    ],
    statHighlight: "Zero CLS (0.00) · 1-Tap Emergency Triage · AHPRA Compliant",
    summary:
      "Rebuilt legacy sluggish WordPress clinic website into a lightning-fast clinical booking engine with instant WhatsApp triage and smile transformation gallery.",
    problem:
      "Legacy bloated WordPress website loaded in 4.8 seconds on mobile, leaking high-value dental implant and cosmetic dentistry patients to regional competitors and suffering from high mobile bounce rates.",
    solution:
      "Rebuilt as a zero-framework semantic HTML5/ES6+ web app with sub-0.8s load times, 1-tap emergency booking bar, and structured MedicalBusiness JSON-LD schema.",
    desktopImage: "/sample_dental_desktop.png",
    mobileImage: "/sample_dental_mobile.png",
    urlMockup: "proactivedental.com.au/booking",
    tags: [
      "Semantic HTML5",
      "ES6+ Vanilla",
      "Medical JSON-LD",
      "AHPRA Compliant",
      "1-Tap Booking",
      "WebP Media Pipeline",
    ],
    features: [
      "Sub-0.8s Mobile Booking Flow with zero layout shift (CLS: 0.00)",
      "1-Tap Emergency Dental Call & WhatsApp Triage routing",
      "Full Medical/Dentist JSON-LD structured schema graph for Google",
      "Responsive Before/After Smile Transformation visualizer",
      "100% Mobile Lighthouse Performance & Accessibility score",
      "Direct synchronization with clinic reception scheduling calendar",
    ],
    architecture: {
      frontend: "Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript",
      backend: "Static Edge Distribution, Zero-Bloat Asset Engine",
      speedToLead: "1-Tap Floating Mobile WhatsApp & Emergency Phone Bar",
      sovereignty: "100% Static Edge Self-Hosted, Zero WordPress Vulnerabilities",
    },
    tcoSavings: "Zero Plugin Fees, +42% Inbound Patient Bookings",
    whatsappMessage:
      "Hi Mukul, I saw the Proactive Dental Surgery clinic portal on sagedo.in and want a high-converting healthcare web app.",
  },
  {
    id: "joshi-tool-orbit",
    title: "Bharat Precision Industrial Forge — Instant CAD RFQ & Operations ERP",
    shortTitle: "Precision Industrial Forge & Tooling ERP",
    client: "Bharat Precision Forge / Joshi Tool Orbit",
    industry: "Heavy Industrial Manufacturing & Aerospace",
    category: "Enterprise & ERP",
    sprint: "21–28 Days Sprint",
    primaryMetric: {
      value: "42s",
      label: "Instant Factory RFQ Tender Turnaround",
    },
    secondaryMetrics: [
      "₹12,00,000/yr Saved vs SAP / Zoho",
      "3 Multi-Entity Business Divisions",
      "Sub-90s PR to PO to GRN",
    ],
    statHighlight: "Sub-90s PR to PO to GRN · Dynamic CAD Downloads · Multi-Warehouse",
    summary:
      "Replaced bloated multi-seat SAP/Zoho licenses with a unified TanStack Start sovereign ERP, automated quotation dispatch, and dynamic CAD downloads.",
    problem:
      "Factory procurement tenders were lost because sales took 24–48 hours to prepare engineering quotations, and CAD technical spec sheets were trapped in manual email threads.",
    solution:
      "Deployed a type-safe TanStack Start / React 19 ERP with Nitro server, sub-90s procurement lifecycle (PR → PO → GRN), multi-warehouse tracking, and automated 42-second WhatsApp quote dispatch.",
    desktopImage: "/portfolio-erp-system.webp",
    mobileImage: "/sample_sagedo_calculator.png",
    urlMockup: "orbit.joshitools.com/procurement/rfq",
    tags: [
      "TanStack Start",
      "React 19",
      "Zustand Multi-Tenant",
      "Nitro Server",
      "CAD Downloader",
      "PostgreSQL",
    ],
    features: [
      "Dynamic CAD & Technical Spec Sheet 1-Click Downloader",
      "42-Second Instant RFQ Dispatch to factory sales team via WhatsApp",
      "End-to-end Procurement Lifecycle: PR → PO → GRN with 3-way matching",
      "Multi-Warehouse Inventory Tracking with minimum-reorder alerts",
      "Role-Based Access for CEO, CFO, Plant Head, Vendor & Procurement Manager",
      "Zero Recurring SaaS Tax: Replaces SAP / Zoho with self-hosted VPS build",
    ],
    architecture: {
      frontend: "TanStack Start / React 19, Tailwind CSS, TanStack Router",
      backend: "Nitro Generic Server Adapter, PostgreSQL, Multi-Tenant Store",
      speedToLead: "Automated WhatsApp Engineering Quotation Webhook (42s)",
      sovereignty: "100% Self-Hosted Enterprise VPS, Displaces ₹12L/yr SAP/Zoho",
    },
    tcoSavings: "Saved ₹12,00,000/yr vs Multi-Seat SAP & Zoho",
    whatsappMessage:
      "Hi Mukul, I saw the Industrial Forge ERP & CAD RFQ system on sagedo.in and want an enterprise operations system for manufacturing.",
  },
  {
    id: "pause-with-sk",
    title: "Pause With SK — Somatic Wellness & Member Portal Web App",
    shortTitle: "Somatic Healing & Coaching App",
    client: "Pause With SK / Sahil Kapoor",
    industry: "Executive Wellness & High-Ticket Coaching",
    category: "Consumer & D2C",
    sprint: "10–14 Days Sprint",
    primaryMetric: {
      value: "84%",
      label: "Course & Practice Completion Rate",
    },
    secondaryMetrics: [
      "1,200+ Active Coaching Members",
      "Sub-0.9s Audio Playback Buffer",
      "₹0 Recurring Platform Tax",
    ],
    statHighlight: "Web Audio Calming Engine · Gated Member Portal · ₹0 Platform Taxes",
    summary:
      "Custom web app with low-latency Web Audio ambient engine, video streaming container, and gated member curriculum bypassing Kajabi/Teachable seat fees.",
    problem:
      "High drop-off rate on generic course platforms (Teachable / Kajabi costing ₹8,000/mo), poor audio experience for nervous system regulation sessions, and disconnected booking calendar.",
    solution:
      "Built a customized wellness web app featuring low-latency Web Audio background loops, row-gated progression in Supabase, and frictionless 1-on-1 WhatsApp session scheduling.",
    desktopImage: "/portfolio-android-app.webp",
    mobileImage: "/portfolio-android-app.webp",
    urlMockup: "app.pausewithsk.com/practice/breathwork",
    tags: [
      "React 18",
      "TypeScript",
      "Web Audio API",
      "Supabase PostgreSQL",
      "Tailwind CSS",
      "DNS Prefetching",
    ],
    features: [
      "Ambient Sound Engine (Web Audio API) for instant nervous system regulation",
      "Gated Member Portal with private video/audio practice modules",
      "1-Click WhatsApp & Private Session Calendar Scheduling",
      "Mobile-First Somatic Practice Tracker with daily progress streaks",
      "Zero-Buffering Media Streaming with DNS prefetch optimizations",
      "100% Private Client Data Isolation in dedicated Supabase instance",
    ],
    architecture: {
      frontend: "React 18, TypeScript, Tailwind CSS, Web Audio API",
      backend: "Supabase PostgreSQL, Row-Gated Content Security",
      speedToLead: "1-Click WhatsApp Direct Mentorship Triage",
      sovereignty: "Zero Teachable/Kajabi Platform Fees, 100% Member Data Privacy",
    },
    tcoSavings: "Saved ₹96,000/yr vs Kajabi/Teachable, 84% Completion Rate",
    whatsappMessage:
      "Hi Mukul, I saw the Pause With SK member app on sagedo.in and want a custom mobile web app for coaching.",
  },
  {
    id: "aura-essentials",
    title: "Aura Essentials — Headless Storefront & 42s Abandoned Cart Recovery",
    shortTitle: "High-Velocity D2C Storefront",
    client: "Aura Essentials Organic Skincare",
    industry: "Clean Beauty & D2C E-Commerce",
    category: "Consumer & D2C",
    sprint: "10–14 Days Sprint",
    primaryMetric: {
      value: "3.2x",
      label: "Mobile Checkout Completion Multiplier",
    },
    secondaryMetrics: [
      "38% Abandoned Carts Recovered in 42s",
      "98 Mobile Lighthouse Performance",
      "Zero Shopify App Taxes",
    ],
    statHighlight: "1-Tap Native UPI · Meta CAPI Server-Side · Zero Shopify App Bloat",
    summary:
      "Headless e-commerce storefront with 1-tap native UPI checkout and automated WhatsApp cart recovery triggers recovering 38% of lost checkouts.",
    problem:
      "70%+ of mobile shoppers abandoned cart on Shopify due to multi-step checkout friction and slow mobile load times, while retargeting ads failed to recover lost revenue.",
    solution:
      "Engineered headless React storefront with sub-1s checkout, server-side Meta Conversions API (CAPI), and automated Meta Cloud WhatsApp abandoned cart recovery at 42 seconds.",
    desktopImage: "/sample-business-website.png",
    mobileImage: "/sample-whatsapp-automation.png",
    urlMockup: "auraessentials.store/checkout/one-tap",
    tags: [
      "Next.js / Headless React",
      "Razorpay UPI",
      "Meta Cloud WhatsApp API",
      "Server Meta CAPI",
      "Tailwind CSS",
    ],
    features: [
      "Sub-1s Mobile Page Load with 98 Lighthouse Score",
      "1-Tap Native UPI Checkout (eliminates 4-step Shopify forms)",
      "42-Second WhatsApp Abandoned Cart Recovery Trigger",
      "Server-Side Meta CAPI tracking to eliminate attribution loss",
      "Automated COD Verification to reduce return-to-origin fraud",
      "Zero Monthly App Subscription Fees (No Shopify app bloat)",
    ],
    architecture: {
      frontend: "Next.js / React Headless UI, Tailwind CSS, Radix primitives",
      backend: "Razorpay 1-Tap UPI, Edge Webhook Handlers",
      speedToLead: "Automated WhatsApp Abandoned Cart Triage at 42s & 3h",
      sovereignty: "Bypasses Shopify 2% Transaction Taxes & App Bloat",
    },
    tcoSavings: "Recovered 38% Lost Carts, Zero Recurring Shopify App Fees",
    whatsappMessage:
      "Hi Mukul, I saw the Aura Essentials D2C Storefront on sagedo.in and want a high-speed storefront with WhatsApp cart recovery.",
  },
  {
    id: "local-domination",
    title: "Local Domination Engine — Hyperlocal SEO & Google 3-Pack Infrastructure",
    shortTitle: "Local SEO & Hyperlocal Infrastructure",
    client: "Multi-Location Healthcare & MSME Retail Network",
    industry: "Local Search & High-Ticket MSME",
    category: "Local SEO & Growth",
    sprint: "7–14 Days Sprint",
    primaryMetric: {
      value: "Top 3",
      label: "Google Maps 3-Pack Rank Achieved in 28 Days",
    },
    secondaryMetrics: [
      "+210% Inbound Phone Calls",
      "4.9★ Across 180+ Google Reviews",
      "Zero Monthly PPC Ad Spend",
    ],
    statHighlight: "Prerendered HTML · Geo JSON-LD @graph · Automated Review Gating",
    summary:
      "Engineered localized programmatic landing pages and automated review triage funnels that drove top-3 Google Maps rankings without monthly PPC ad spend.",
    problem:
      "Businesses relied entirely on expensive Google Ads bidding against aggregators (Practo / JustDial), losing organic local map pack visibility and paying ₹150–₹400 per click.",
    solution:
      "Deployed prerendered geo-targeted landing pages with deep JSON-LD @graph schemas and automated WhatsApp review gating funnel filtering 5-star reviews to Google Maps.",
    desktopImage: "/sample-seo-google-maps.png",
    mobileImage: "/portfolio-sagedo-local.webp",
    urlMockup: "sagedo.in/digital-marketing-chandigarh.html",
    tags: [
      "Prerendered HTML",
      "Geo JSON-LD @graph",
      "WhatsApp Review Gating",
      "AI Crawler Ready",
      "3-Pack Maps",
    ],
    features: [
      "Geo-Targeted JSON-LD Schema Graph with verified latitude/longitude coordinates",
      "Automated WhatsApp Review Gating Funnel (filters 5-star reviews to Google)",
      "Sub-0.8s Static HTML Delivery on 4G networks",
      "Frontier AI Crawler permissions (GPTBot, ClaudeBot, PerplexityBot)",
      "Google Business Profile Category & Citation Architecture",
      "High-Intent Keyword Optimization for local surgical/commercial procedures",
    ],
    architecture: {
      frontend: "Prerendered Semantic HTML5, Zero Hydration Lag",
      backend: "Static Multi-City Edge Infrastructure, Structured JSON-LD",
      speedToLead: "Automated WhatsApp Post-Service Review Gating Webhook",
      sovereignty: "Permanent Organic Google Dominance, Zero Ongoing PPC Ad Spend",
    },
    tcoSavings: "Saved ₹1,20,000/mo in Google Ads PPC click costs",
    whatsappMessage:
      "Hi Mukul, I saw the Local SEO & Google 3-Pack Engine on sagedo.in and want to dominate local search for my business.",
  },
  {
    id: "financial-tracker",
    title: "Corporate Treasury Engine — Automated Reconciliation & Cashflow Visualizer",
    shortTitle: "Corporate Treasury & Financial Engine",
    client: "Corporate Treasury & High-Volume Wholesalers",
    industry: "FinTech & Corporate Operations",
    category: "Enterprise & ERP",
    sprint: "14–21 Days Sprint",
    primaryMetric: {
      value: "100%",
      label: "Automated Bank Statement Reconciliation",
    },
    secondaryMetrics: [
      "15 Hours/Week Labor Saved",
      "Sub-Second Queries on 50k+ Rows",
      "0 Reconciliation Errors",
    ],
    statHighlight: "D3.js Trend Charts · Supabase PostgreSQL · 0 Reconciliation Errors",
    summary:
      "Replaced messy, error-prone multi-account Excel ledgers with an automated bank statement CSV parser, D3.js trend visualizer, and double-entry PostgreSQL ledger.",
    problem:
      "Businesses managed cashflow across 4 bank accounts using messy Excel spreadsheets, taking 15 hours every week to manually reconcile statements and constantly suffering from formula errors.",
    solution:
      "Architected a double-entry accounting engine with instant CSV bank statement parsing, automated duplicate detection, interactive D3.js runway curves, and immutable audit logs.",
    desktopImage: "/sample_sagedo_calculator.png",
    mobileImage: "/sample-crm-lead-automation.webp",
    urlMockup: "treasury.internal/cashflow/runway-projection",
    tags: [
      "React 18",
      "D3.js Trend Charts",
      "Supabase PostgreSQL",
      "CSV Bank Parser",
      "Double-Entry Ledger",
    ],
    features: [
      "Automated CSV & Bank Statement Parsing with intelligent payee auto-categorization",
      "Interactive D3.js Cashflow Runway and Trend Projection charts",
      "Double-Entry Bookkeeping Ledger with immutable audit log",
      "Multi-Account Bank Reconciliation with automated duplicate detection",
      "Zero-Lag Supabase PostgreSQL backend with sub-second queries",
      "100% Local/Sovereign Hosting with zero overseas data sharing",
    ],
    architecture: {
      frontend: "React 18, Vite, TypeScript, D3.js Visualizations",
      backend: "Supabase PostgreSQL, Double-Entry Accounting Schema",
      speedToLead: "Instant Transaction Reconciliation & Alert Webhook",
      sovereignty: "100% On-Premises or Private Cloud, Zero Data Escrow",
    },
    tcoSavings: "Eliminated 15 hrs/wk manual accounting labor (₹10L/yr value)",
    whatsappMessage:
      "Hi Mukul, I saw the Financial Operations & Treasury engine on sagedo.in and want an automated cashflow and ledger system.",
  },
  {
    id: "sagedo-platform",
    title: "SAGE DO Sovereign AI Operating Platform — Production Core",
    shortTitle: "Sovereign AI Operating Platform",
    client: "SAGE DO AI Service & Commercial Engine (sagedo.in)",
    industry: "Autonomous AI Web & Automation Systems",
    category: "Enterprise & ERP",
    sprint: "Continuous Live Production",
    primaryMetric: {
      value: "150+",
      label: "Enterprise & SMB Systems Delivered",
    },
    secondaryMetrics: [
      "24–48h Prototype Guarantee",
      "Sub-0.8s LCP on 4G",
      "48 Prerendered Routes",
    ],
    statHighlight: "48 Prerendered Routes · Zero Seat Tax · CWE-472 Server-Side SKU Protection",
    summary:
      "Commercial platform delivering enterprise sovereign code, sub-0.8s page loads, AI search crawler architecture, and instantaneous speed-to-lead routing.",
    problem:
      "Indian founders and SMBs were trapped between slow, expensive agencies charging ₹2–5L retainers and unreliable freelancers who ghosted midway, with zero speed-to-lead automation.",
    solution:
      "Engineered an AI-native execution platform combining 24-48h functional prototype delivery, 100% source code ownership, server-side validated orders, and multi-crawler GEO/AEO visibility.",
    desktopImage: "/portfolio-sagedo-prod.webp",
    mobileImage: "/sample_sagedo_home.png",
    urlMockup: "sagedo.in/portfolio/overview",
    tags: [
      "React 18 + Vite",
      "Node.js Express",
      "Drizzle ORM",
      "PostgreSQL",
      "Razorpay SKU Locked",
      "GEO/AEO AI Crawlers",
    ],
    features: [
      "Sub-0.8s LCP on 4G networks with 48 prerendered static routes",
      "24–48 Hour Functional Prototype Guarantee with zero upfront risk",
      "Hardened Server-Side SKU Validation with zero price tampering",
      "Multi-Crawler GEO/AEO Architecture (robots.txt + llms.txt)",
      "Razorpay UPI/Cards Payment Flow with instant webhook triage",
      "100% Sovereign Code & Database Ownership with zero recurring seat taxes",
    ],
    architecture: {
      frontend: "React 18, Vite, TypeScript, Tailwind CSS, Radix UI",
      backend: "Node.js Express API, Drizzle ORM, Supabase PostgreSQL",
      speedToLead: "Sub-45s WhatsApp Webhook Alert to Founder Mobile",
      sovereignty: "100% Source Code & Database Handover, Zero Lock-In",
    },
    tcoSavings: "Zero Recurring Seat Tax, 93% Capital Savings vs Status Quo",
    whatsappMessage:
      "Hi Mukul, I want to discuss building a custom sovereign AI website or CRM for my company under the 24-48h guarantee.",
  },
];

const CATEGORIES: ProjectCategory[] = [
  "All Projects",
  "Healthcare & MedTech",
  "Enterprise & ERP",
  "Consumer & D2C",
  "Local SEO & Growth",
];

export function InteractivePortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Projects");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const filteredProjects =
    activeCategory === "All Projects"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio-gallery" className="relative z-20 py-20 sm:py-28 bg-[#08090d] text-white border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>VERIFIED FIELD PRODUCTION · REAL CODE &amp; DELIVERIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            The Sovereign Portfolio:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-primary">
              8 Real Systems, Zero Facades
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Inspect real production builds engineered by SAGE DO. Every card features verified client metrics, production screenshots, delivery timelines, and full architecture blueprints.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((category) => {
            const count =
              category === "All Projects"
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter((p) => p.category === category).length;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-primary/50 scale-[1.02]"
                    : "bg-[#12151e] text-neutral-400 hover:text-white hover:bg-[#1a1f2c] border border-white/[0.08]"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-white/[0.06] text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 8-Project Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl bg-[#0f1118] border border-white/[0.08] hover:border-primary/40 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Media Container with Browser Mock Header */}
              <div className="relative bg-[#090b10] border-b border-white/[0.08] overflow-hidden">
                {/* Browser top chrome */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#141824] border-b border-white/[0.06] text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 truncate max-w-[190px] px-2 py-0.5 rounded bg-black/40">
                    https://{project.urlMockup}
                  </span>
                  <div className="w-8 flex justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Screenshot Image with Hover Zoom */}
                <div
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.desktopImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-transparent opacity-80" />

                  {/* Overlay Quick Inspect Pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      Inspect System Blueprint
                    </span>
                  </div>
                </div>

                {/* Badges Floating on Media */}
                <div className="absolute top-10 left-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white border border-white/15">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.sprint}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  {/* Client & Short Title */}
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {project.shortTitle}
                  </h3>

                  {/* Primary Metric Banner */}
                  <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/25 flex items-center gap-3">
                    <div className="text-2xl font-black text-emerald-400 shrink-0 tracking-tight">
                      {project.primaryMetric.value}
                    </div>
                    <div className="text-xs text-neutral-200 font-medium leading-snug">
                      {project.primaryMetric.label}
                    </div>
                  </div>

                  {/* Stat Highlight Pill */}
                  <div className="mt-3 text-[11px] font-mono text-neutral-400 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/[0.06] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{project.statHighlight}</span>
                  </div>

                  {/* Summary */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#171c28] text-neutral-300 border border-white/[0.07]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/[0.05] text-neutral-400">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2">
                  <Button
                    onClick={() => setSelectedProject(project)}
                    variant="outline"
                    className="flex-1 text-xs font-semibold py-2 h-9 bg-white/[0.04] hover:bg-white/[0.08] border-white/15 text-white justify-center cursor-pointer"
                  >
                    <span>Inspect Blueprint</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>

                  <a
                    href={`https://wa.me/916284925684?text=${encodeURIComponent(
                      project.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(`portfolio_card_${project.id}`)
                    }
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-emerald-600/90 hover:bg-emerald-500 text-white transition-colors cursor-pointer shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    title="Discuss this build directly with Mukul on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Assurance */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0f121b] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">
                Require a custom architecture not listed here?
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                We deliver a clickable, functional prototype of your exact business workflow within 24–48 hours — with 100% code sovereignty.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/916284925684?text=Hi%20Mukul,%20I'm%20looking%20for%20a%20custom%20software%20architecture%20prototype."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("portfolio_footer_cta")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request 24-48h Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 1-Click Modal: Radix Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
            setPreviewMode("desktop");
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0a0c12] border-white/[0.12] text-white p-0 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {selectedProject && (
            <div className="flex flex-col">
              {/* Modal Top Bar */}
              <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-[#0e111a] flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 text-xs">
                    {selectedProject.category}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedProject.sprint}
                  </Badge>
                  <span className="text-xs text-neutral-400">· {selectedProject.client}</span>
                </div>

                <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedProject.title}
                </DialogTitle>

                <DialogDescription className="text-xs sm:text-sm text-neutral-300">
                  {selectedProject.summary}
                </DialogDescription>
              </div>

              {/* Viewport Switcher & High-Res Screenshot Canvas */}
              <div className="p-6 sm:p-8 bg-[#07080c] border-b border-white/[0.08]">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Interactive Preview Mode:
                    </span>
                  </div>

                  <div className="flex items-center p-1 rounded-xl bg-[#121520] border border-white/[0.08]">
                    <button
                      onClick={() => setPreviewMode("desktop")}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        previewMode === "desktop"
                          ? "bg-primary text-white shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop 16:9</span>
                    </button>

                    <button
                      onClick={() => setPreviewMode("mobile")}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        previewMode === "mobile"
                          ? "bg-primary text-white shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile 390px</span>
                    </button>
                  </div>
                </div>

                {/* Screenshot Display Frame */}
                {previewMode === "desktop" ? (
                  <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-[#10131d] shadow-2xl">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#181d2a] border-b border-white/[0.08] text-[11px] text-neutral-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      <span className="ml-2 font-mono text-[10px] text-neutral-300 bg-black/40 px-3 py-0.5 rounded flex-1 truncate">
                        https://{selectedProject.urlMockup}
                      </span>
                    </div>
                    <div className="max-h-[460px] overflow-y-auto">
                      <img
                        src={selectedProject.desktopImage}
                        alt={`${selectedProject.title} Desktop View`}
                        className="w-full h-auto object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[340px] mx-auto rounded-[32px] overflow-hidden border-[6px] border-[#1f2433] bg-[#10131d] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <div className="h-5 bg-[#1f2433] flex items-center justify-center">
                      <div className="w-16 h-3 bg-black/70 rounded-full" />
                    </div>
                    <div className="max-h-[440px] overflow-y-auto">
                      <img
                        src={selectedProject.mobileImage}
                        alt={`${selectedProject.title} Mobile View`}
                        className="w-full h-auto object-cover object-top"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Problem vs Sovereign Solution Breakdown */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/[0.08] bg-[#0b0e15]">
                <div className="p-5 rounded-xl bg-red-950/15 border border-red-500/20">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    The Operational Bottleneck
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/25">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    SAGE DO Sovereign Architecture
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* 6-Point Verifiable Feature Checklist */}
              <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-[#090b10]">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  6-Point Verifiable Production Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11141e] border border-white/[0.06] text-xs text-neutral-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture & Sovereign Stack Matrix */}
              <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-[#0c0f17]">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Technical Stack &amp; Sovereign Moats
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#131722] border border-white/[0.06]">
                    <div className="text-[10px] font-semibold text-neutral-400 uppercase flex items-center gap-1 mb-1">
                      <Code className="w-3 h-3 text-primary" />
                      Frontend Engine
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedProject.architecture.frontend}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#131722] border border-white/[0.06]">
                    <div className="text-[10px] font-semibold text-neutral-400 uppercase flex items-center gap-1 mb-1">
                      <Database className="w-3 h-3 text-emerald-400" />
                      Database &amp; RLS
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedProject.architecture.backend}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#131722] border border-white/[0.06]">
                    <div className="text-[10px] font-semibold text-neutral-400 uppercase flex items-center gap-1 mb-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Speed-to-Lead
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedProject.architecture.speedToLead}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#131722] border border-white/[0.06]">
                    <div className="text-[10px] font-semibold text-neutral-400 uppercase flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      Sovereign Moat
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      {selectedProject.architecture.sovereignty}
                    </div>
                  </div>
                </div>

                {/* TCO Moat Box */}
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-neutral-200">
                    Empirical Moat / Recurring Software Tax Elimination:
                  </span>
                  <span className="text-xs font-black text-emerald-400 tracking-wide shrink-0">
                    {selectedProject.tcoSavings}
                  </span>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 bg-[#0e1119] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  Ready to deploy a sovereign system with 100% code ownership?
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] text-xs h-10 px-4 cursor-pointer"
                  >
                    Close Preview
                  </Button>

                  <a
                    href={`https://wa.me/916284925684?text=${encodeURIComponent(
                      selectedProject.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(`modal_cta_${selectedProject.id}`)
                    }
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Prototype Like This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default InteractivePortfolioGallery;
