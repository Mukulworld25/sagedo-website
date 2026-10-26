import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Search,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Globe,
  Zap,
  Bot,
  Lock,
  ArrowRight,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";

export type QACategory =
  | "All Inspection Points"
  | "Perimeter Security"
  | "Core Web Vitals"
  | "Sovereign Database"
  | "SPA Routing & Fallbacks"
  | "Speed-to-Lead SLAs"
  | "AI Guardrails & GEO";

export interface QAPoint {
  id: string;
  category: QACategory;
  categoryNumber: number;
  title: string;
  standard: string;
  benchmark: string;
  command: string;
  failureConsequence: string;
  hardening: string;
  iconType: "security" | "performance" | "database" | "routing" | "lead" | "ai";
}

export const QA_CHECKLIST_POINTS: QAPoint[] = [
  // CATEGORY 1: Perimeter & Application Security (01-05)
  {
    id: "SEC-01",
    category: "Perimeter Security",
    categoryNumber: 1,
    title: "CWE-472 Server-Side Price & SKU Hardening",
    standard: "Zero Client-Side Price Tampering",
    benchmark: "Client-tampered ?price=0 or invalid SKU rejected with HTTP 400 Bad Request",
    command: `curl -X POST https://sagedo.in/api/orders -H "Content-Type: application/json" -d '{"package_id":"smb_scale","price":0}'`,
    failureConsequence:
      "Vulnerable checkout state where malicious actors manipulate DOM inputs or URL query params to submit orders at ₹0 or negative values.",
    hardening:
      "Prices strictly resolved from server-side src/config/pricing.ts dictionary via getPackagePrice(id). Direct editable price inputs permanently eliminated.",
    iconType: "security",
  },
  {
    id: "SEC-02",
    category: "Perimeter Security",
    categoryNumber: 1,
    title: "Defence-Grade HTTP Security Headers",
    standard: "A+ Security Grade on securityheaders.com",
    benchmark: "HSTS preload, strict CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff",
    command: `curl -I https://sagedo.in | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|Content-Security-Policy)"`,
    failureConsequence:
      "Clickjacking attacks, MIME-type sniffing vulnerabilities, downgrade attacks to insecure HTTP, and unauthorized third-party iframe embedding.",
    hardening:
      "Enforces Strict-Transport-Security: max-age=63072000; includeSubDomains; preload, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, and strict CSP policies.",
    iconType: "security",
  },
  {
    id: "SEC-03",
    category: "Perimeter Security",
    categoryNumber: 1,
    title: "Injection & Input Sanitization",
    standard: "Zero Raw SQL Queries; 100% Parameterized Binding",
    benchmark: "Parameterized Drizzle SQL queries + DOMPurify verification on user-submitted text",
    command: `grep -rn "execute(" server/ | grep -v "sql\`"`,
    failureConsequence:
      "SQL injection (SQLi) data leakage, database drop risks, and stored Cross-Site Scripting (XSS) in internal administrative feeds.",
    hardening:
      "Drizzle ORM parameterized queries (sql tagged templates); DOMPurify sanitization before rendering any rich user input in administrative views.",
    iconType: "security",
  },
  {
    id: "SEC-04",
    category: "Perimeter Security",
    categoryNumber: 1,
    title: "Rate Limiting & DoS Mitigation",
    standard: "Strict Token-Bucket IP Limits on Public Endpoints",
    benchmark: "Public POST routes limited to 15 requests per 15 minutes per IP",
    command: `ab -n 100 -c 10 https://sagedo.in/api/orders`,
    failureConsequence:
      "Lead queue flooding, fake orders, spam bots exhausting email/SMS credits, and Denial of Service (DoS) outages during marketing campaigns.",
    hardening:
      "In-memory / Redis token bucket limiting public POST routes to 15 requests per 15 minutes per IP; prevents lead queue flooding.",
    iconType: "security",
  },
  {
    id: "SEC-05",
    category: "Perimeter Security",
    categoryNumber: 1,
    title: "Cryptographic Secret Boundary Isolation",
    standard: "Zero .env or Service-Role Keys in Client Bundles",
    benchmark: "Client bundle AST inspection confirms zero private credentials or service keys",
    command: `grep -rn "SUPABASE_SERVICE_ROLE" dist/assets/ || echo "PASS: Zero Leakage"`,
    failureConsequence:
      "Total database compromise through leaked service role API keys exposed to public web browser DevTools inspection.",
    hardening:
      "Serverless edge function isolation; client receives only public anon keys; sensitive webhooks authenticated via HMAC SHA-256 signatures.",
    iconType: "security",
  },

  // CATEGORY 2: Performance, Core Web Vitals & Sub-0.8s LCP (06-10)
  {
    id: "PERF-06",
    category: "Core Web Vitals",
    categoryNumber: 2,
    title: "Sub-0.8s Largest Contentful Paint (LCP) on 4G",
    standard: "LCP ≤ 0.8s on Simulated 4G Mobile",
    benchmark: "LCP ≤ 0.8s on Chrome DevTools Slow 4G / 4x CPU throttle benchmark",
    command: `npx lighthouse https://sagedo.in --preset=mobile --throttling-method=devtools --only-categories=performance`,
    failureConsequence:
      "53% of mobile visitors bounce if page takes over 3 seconds to load on Indian cellular networks, destroying paid traffic ROI.",
    hardening:
      "Hero critical path CSS inlined; high-priority image preloaded via <picture> with fetchpriority=\"high\" and WebP/AVIF modern formats.",
    iconType: "performance",
  },
  {
    id: "PERF-07",
    category: "Core Web Vitals",
    categoryNumber: 2,
    title: "Zero Cumulative Layout Shift (CLS ≤ 0.01)",
    standard: "Visual Stability During Full Hydration",
    benchmark: "CLS < 0.01 across all desktop and mobile viewports down to 360px",
    command: `npx lighthouse-ci collect --url=https://sagedo.in --assert.assertions.cumulative-layout-shift=0.01`,
    failureConsequence:
      "Elements jumping as images and web fonts load, causing accidental clicks on wrong buttons and frustrating high-ticket buyers.",
    hardening:
      "Explicit aspect-ratio defined on all media containers; reserved skeleton dimensions for dynamic widgets and custom font-display: swap.",
    iconType: "performance",
  },
  {
    id: "PERF-08",
    category: "Core Web Vitals",
    categoryNumber: 2,
    title: "First Input Delay / INP Responsiveness",
    standard: "Interaction to Next Paint (INP) < 50ms",
    benchmark: "Zero main thread JavaScript tasks exceeding 50ms duration",
    command: `Chrome DevTools Performance Profiler → Total Blocking Time (TBT) < 50ms`,
    failureConsequence:
      "Tapping buttons, sliders, or modals feels frozen and unresponsive on Android devices, driving prospects to bounce.",
    hardening:
      "Zero long tasks (>50ms) on main thread; heavy math memoized with React.useMemo; non-critical third-party analytics deferred.",
    iconType: "performance",
  },
  {
    id: "PERF-09",
    category: "Core Web Vitals",
    categoryNumber: 2,
    title: "Modern Compression & Edge Caching",
    standard: "Brotli (br) Level 11 + 1-Year Immutable Cache",
    benchmark: "content-encoding: br, cache-control: public, max-age=31536000, immutable",
    command: `curl -H "Accept-Encoding: br" -I https://sagedo.in/assets/index.js | grep -E "(content-encoding|cache-control)"`,
    failureConsequence:
      "Repeat visitors re-download megabytes of unchanged code, wasting mobile bandwidth and increasing server latency.",
    hardening:
      "Vite build asset hashing with Cache-Control: public, max-age=31536000, immutable; HTML files served with must-revalidate.",
    iconType: "performance",
  },
  {
    id: "PERF-10",
    category: "Core Web Vitals",
    categoryNumber: 2,
    title: "JavaScript Bundle Tree-Shaking & Splitting",
    standard: "Initial JS Load < 65KB Gzipped",
    benchmark: "Route-level code splitting via React.lazy() and granular Lucide imports",
    command: `npx rollup-plugin-visualizer dist/stats.html --open=false`,
    failureConsequence:
      "Monolithic 2MB bundle downloaded on initial load, blocking low-end Android mobile devices during parse/compile.",
    hardening:
      "Route-level code splitting via React.lazy(); granular Lucide icon imports; vendor chunk separation in vite.config.ts.",
    iconType: "performance",
  },

  // CATEGORY 3: Sovereign Database Architecture & Zero Data Leakage (11-15)
  {
    id: "DAT-11",
    category: "Sovereign Database",
    categoryNumber: 3,
    title: "PostgreSQL Composite & B-Tree Indexing",
    standard: "Query Latency < 15ms on 50,000+ Lead Rows",
    benchmark: "EXPLAIN ANALYZE confirms zero sequential full-table scans",
    command: `psql -c "EXPLAIN ANALYZE SELECT * FROM leads WHERE status='pending' ORDER BY created_at DESC LIMIT 50;"`,
    failureConsequence:
      "Database CPU spikes to 100% as table grows beyond 5,000 leads, crashing the CRM during peak marketing campaigns.",
    hardening:
      "Explicit B-Tree indexes on (status, created_at), leads(phone, email), and foreign keys; zero sequential full-table scans.",
    iconType: "database",
  },
  {
    id: "DAT-12",
    category: "Sovereign Database",
    categoryNumber: 3,
    title: "Row-Level Security (RLS) Multi-Tenant Guard",
    standard: "Cross-Tenant Data Access Strictly Impossible",
    benchmark: "Cross-role SQL queries return empty sets without explicit session permissions",
    command: `psql -c "SET ROLE counselor; SELECT * FROM student_fees;" -- returns 0 rows`,
    failureConsequence:
      "Counselors or external staff can view entire company revenue, executive salaries, or competitor lead assignments.",
    hardening:
      "Strict Postgres RLS policies (auth.uid() = user_id) on all client-accessible tables; admin access gated by service-role bypass.",
    iconType: "database",
  },
  {
    id: "DAT-13",
    category: "Sovereign Database",
    categoryNumber: 3,
    title: "Zero Third-Party SaaS Data Escrow",
    standard: "Customer PII Never Routed Through Unvetted Hubs",
    benchmark: "Direct client-to-PostgreSQL/Supabase pipeline with zero data leakage",
    command: `mitmproxy --listen-host 127.0.0.1 -p 8080 --view-filter "~s sagedo"`,
    failureConsequence:
      "Customer phone numbers and deal values stored in insecure Zapier / Make logs, vulnerable to third-party data breaches.",
    hardening:
      "Direct client-to-PostgreSQL/Supabase pipeline; zero data escrow in Zapier, Make, or unmonitored third-party servers.",
    iconType: "database",
  },
  {
    id: "DAT-14",
    category: "Sovereign Database",
    categoryNumber: 3,
    title: "Automated Point-in-Time Database Recovery",
    standard: "Automated WAL Backups with 30-Day Retention",
    benchmark: "Tested disaster recovery script restores database in under 8 minutes",
    command: `pg_restore -d test_recovery backup_wal_snapshot.dump --verbose`,
    failureConsequence:
      "Accidental deletion or database corruption results in total unrecoverable loss of customer transaction histories.",
    hardening:
      "Automated daily snapshots + continuous WAL archiving; tested disaster recovery script restores database in under 8 minutes.",
    iconType: "database",
  },
  {
    id: "DAT-15",
    category: "Sovereign Database",
    categoryNumber: 3,
    title: "Sovereign Root Handover & Zero Vendor Lock-In",
    standard: "100% Source Code, Schema Migrations & Root Keys Delivered",
    benchmark: "Complete drizzle/ migrations and pg_dump export scripts delivered",
    command: `docker-compose up --build -d && npm run db:migrate`,
    failureConsequence:
      "Client locked into proprietary vendor ecosystem with exorbitant exit fees and impossible data exports.",
    hardening:
      "Complete drizzle/ migrations and pg_dump export scripts delivered to client on Day 28 handover; self-hostable anywhere.",
    iconType: "database",
  },

  // CATEGORY 4: Routing Resilience, SPA Fallbacks & Offline Reliability (16-20)
  {
    id: "ROU-16",
    category: "SPA Routing & Fallbacks",
    categoryNumber: 4,
    title: "Zero-404 Fallback SPA Routing",
    standard: "Deep Link Refreshes Return HTTP 200 Clean UI",
    benchmark: "Browser direct navigation to subpaths returns HTTP 200 clean UI",
    command: `curl -I https://sagedo.in/ai-automation-agency-india | grep "HTTP/2 200"`,
    failureConsequence:
      "Shared links and social media traffic land on generic 404 Not Found pages when user refreshes browser.",
    hardening:
      "Vercel rewrite rules (\"source\": \"/(.*)\", \"destination\": \"/index.html\") preventing server-side 404 errors on client routes.",
    iconType: "routing",
  },
  {
    id: "ROU-17",
    category: "SPA Routing & Fallbacks",
    categoryNumber: 4,
    title: "Static Pre-Rendering for Bot Crawlers",
    standard: "Complete Visible HTML Present in Raw Response Without JS",
    benchmark: "Headless curl contains full semantic page content and JSON-LD schema",
    command: `curl -s https://sagedo.in/services | grep -o "<h1.*</h1>"`,
    failureConsequence:
      "Search engines and AI models see blank empty div id=\"root\" shells and fail to index business services.",
    hardening:
      "scripts/prerender.mjs generates complete <noscript> visible fallbacks and meta tags for all 48 canonical routes.",
    iconType: "routing",
  },
  {
    id: "ROU-18",
    category: "SPA Routing & Fallbacks",
    categoryNumber: 4,
    title: "React Error Boundaries with Local Isolation",
    standard: "Component Failures Never Trigger Whole-Page White Screen",
    benchmark: "Nested <ErrorBoundary> catches fatal exceptions gracefully without breaking surrounding shell",
    command: `React Test Renderer: throw new Error() in child -> renders fallback card with reload trigger`,
    failureConsequence:
      "A minor runtime bug in a calculator or chat widget crashes the entire webpage into an empty white screen.",
    hardening:
      "Nested <ErrorBoundary> components isolating calculator, chat widget, and modal; graceful fallback card with reload trigger.",
    iconType: "routing",
  },
  {
    id: "ROU-19",
    category: "SPA Routing & Fallbacks",
    categoryNumber: 4,
    title: "Form State Recovery & Offline Cache",
    standard: "Unfinished Form Inputs Preserved Across Accidental Tab Reloads",
    benchmark: "Input state mirrored to localStorage with TTL expiration",
    command: `localStorage.getItem("sagedo_demo_survey_draft")`,
    failureConsequence:
      "User accidentally closes mobile browser tab mid-survey and loses 5 minutes of typed inquiry data.",
    hardening:
      "Input state mirrored to localStorage with TTL expiration; user returns to pre-populated fields with zero lost work.",
    iconType: "routing",
  },
  {
    id: "ROU-20",
    category: "SPA Routing & Fallbacks",
    categoryNumber: 4,
    title: "360px Mobile Viewport Layout Integrity",
    standard: "Zero Horizontal Scroll (overflow-x: hidden) on Compact Screens",
    benchmark: "Zero layout breakage or horizontal overflow at width: 360px",
    command: `npx playwright test tests/mobile-viewport.spec.ts --viewport="360,640"`,
    failureConsequence:
      "Awkward horizontal wobbling and cut-off text on budget Indian Android devices (Redmi, Samsung Galaxy M).",
    hardening:
      "Strict max-w-full overflow-hidden, defensive CSS flex/grid wrapping, and tap targets ≥ 48px on all interactive elements.",
    iconType: "routing",
  },

  // CATEGORY 5: High-Velocity Lead Pipeline & Speed-to-Lead (21-25)
  {
    id: "LEAD-21",
    category: "Speed-to-Lead SLAs",
    categoryNumber: 5,
    title: "Sub-90s WhatsApp Cloud API Webhook Dispatch",
    standard: "Trigger-to-Lead Message Delivery Latency ≤ 45 Seconds",
    benchmark: "Webhook timestamp log confirms form_submit to wa_sent < 45s",
    command: `curl -X POST https://sagedo.in/api/demo-request -d '{"phone":"9876543210"}'`,
    failureConsequence:
      "Leads wait hours for a reply; 78% of enterprise buyers choose the vendor who responds first.",
    hardening:
      "Asynchronous background dispatch worker triggering Meta Graph API directly; automated template delivery with 1-tap reply.",
    iconType: "lead",
  },
  {
    id: "LEAD-22",
    category: "Speed-to-Lead SLAs",
    categoryNumber: 5,
    title: "Exponential Backoff Webhook Retry Queue",
    standard: "0% Dropped Leads Even During Meta API Downtime",
    benchmark: "Failed webhook messages retried at [1s, 5s, 30s, 5m] intervals",
    command: `simulate_network_failure() -> queue.inspect_retries() == 4`,
    failureConsequence:
      "Temporary Meta API outages or network glitches cause high-ticket customer inquiries to vanish forever.",
    hardening:
      "Idempotent message queue retrying failed webhooks at intervals of [1s, 5s, 30s, 5m] with alert escalations.",
    iconType: "lead",
  },
  {
    id: "LEAD-23",
    category: "Speed-to-Lead SLAs",
    categoryNumber: 5,
    title: "Strict Indian Regex Phone Number Validation",
    standard: "Rejects Invalid Numbers; Standardizes to E.164 (+91)",
    benchmark: "Matches /^(?:\\+91|0)?[6-9]\\d{9}$/ and strips non-digits",
    command: `node -e 'console.log(/^(?:\\+91|0)?[6-9]\\d{9}$/.test("+91 98140-12345".replace(/\\D/g,"")))'`,
    failureConsequence:
      "Sales team receives junk phone numbers with 9 digits or foreign codes, wasting telecaller hours.",
    hardening:
      "Strict regex /^(?:\\+91|0)?[6-9]\\d{9}$/ stripping spaces/dashes; automatically normalizes to +91XXXXXXXXXX.",
    iconType: "lead",
  },
  {
    id: "LEAD-24",
    category: "Speed-to-Lead SLAs",
    categoryNumber: 5,
    title: "Dual Founder & Telecaller Instant Alerts",
    standard: "Parallel Notification to Business Owner Within 10 Seconds",
    benchmark: "Instant push notification with 1-tap call-back URL",
    command: `watch -n 1 "curl -s https://sagedo.in/api/health/lead-queue"`,
    failureConsequence:
      "Inquiries sit in an unread admin portal dashboard until someone remembers to log in hours later.",
    hardening:
      "Instant dual push to founder WhatsApp + SMS alert containing lead name, business type, and 1-tap call-back URL.",
    iconType: "lead",
  },
  {
    id: "LEAD-25",
    category: "Speed-to-Lead SLAs",
    categoryNumber: 5,
    title: "Tally Prime & Ledger Bridge Idempotency",
    standard: "Zero Duplicate Sales Vouchers or Customer Ledgers",
    benchmark: "Cryptographic idempotency key (sha256(order_id + timestamp))",
    command: `curl -X POST /api/tally-sync -H "Idempotency-Key: abc123" --data-binary @voucher.xml`,
    failureConsequence:
      "Accidental double-submits create duplicate revenue records, corrupting company GST returns and accounts.",
    hardening:
      "Cryptographic idempotency key (idempotency_key = sha256(order_id + timestamp)) verified by XML bridge before insertion.",
    iconType: "lead",
  },

  // CATEGORY 6: AI-Native Systems & Zero-Hallucination Guardrails (26-30)
  {
    id: "AI-26",
    category: "AI Guardrails & GEO",
    categoryNumber: 6,
    title: "Context-Grounded Prompt Guardrails",
    standard: "AI Strictly Restricted to Verified Business Context",
    benchmark: "Adversarial out-of-domain prompt injections return verified fallback",
    command: `python tests/adversarial_prompt_injection.py --target=sagedo_rag`,
    failureConsequence:
      "AI bot makes false promises, hallucinates non-existent discounts, or dispenses unauthorized legal/medical advice.",
    hardening:
      "Strict system prompt instruction: 'If information is not explicitly stated in verified context chunks, reply with verified fallback.'",
    iconType: "ai",
  },
  {
    id: "AI-27",
    category: "AI Guardrails & GEO",
    categoryNumber: 6,
    title: "Semantic Confidence Gating & Human Triage",
    standard: "Cosine Similarity Threshold ≥ 0.82 Required for Auto-Reply",
    benchmark: "Low-confidence queries (<0.82) seamlessly routed to human agent queue",
    command: `vector_db.query("unclear inquiry", min_similarity=0.82)`,
    failureConsequence:
      "AI guesses answers to ambiguous client inquiries, frustrating users and ruining brand credibility.",
    hardening:
      "Inquiries falling below confidence threshold automatically route to human telecaller queue with context transcript.",
    iconType: "ai",
  },
  {
    id: "AI-28",
    category: "AI Guardrails & GEO",
    categoryNumber: 6,
    title: "Automated PII Redaction Pipeline",
    standard: "Sensitive Customer Data Stripped Prior to Vector Embedding",
    benchmark: "Regex & NER scrubbing of Aadhaar, PAN, and credit cards",
    command: `python tests/pii_scrubber.py --input="Card: 4111222233334444"`,
    failureConsequence:
      "Customer financial information or government IDs leaked into shared third-party model training sets.",
    hardening:
      "Regex and NER redaction pipeline scrubs financial identifiers and personal credentials before transmission to external LLMs.",
    iconType: "ai",
  },
  {
    id: "AI-29",
    category: "AI Guardrails & GEO",
    categoryNumber: 6,
    title: "Full AI Crawler Visibility (robots.txt & llms.txt)",
    standard: "All 8 Frontier Crawlers Permitted; Markdown Docs Served",
    benchmark: "GPTBot, ClaudeBot, PerplexityBot allowed; /llms.txt HTTP 200",
    command: `curl -s https://sagedo.in/robots.txt | grep -E "(GPTBot|ClaudeBot|PerplexityBot)"`,
    failureConsequence:
      "Frontier AI search engines (Perplexity, ChatGPT Search) cannot cite your company in conversational queries.",
    hardening:
      "Unrestricted permissions for GPTBot, ClaudeBot, PerplexityBot, Google-Extended; machine-readable architecture summary at /llms.txt.",
    iconType: "ai",
  },
  {
    id: "AI-30",
    category: "AI Guardrails & GEO",
    categoryNumber: 6,
    title: "Validated Nested JSON-LD Schema Graphs",
    standard: "Zero Syntax or Schema Warnings on Google Rich Results",
    benchmark: "Server-rendered @graph with Organization, ProfessionalService, FAQPage",
    command: `curl -s https://sagedo.in | grep -o '{"@context":"https://schema.org"'`,
    failureConsequence:
      "Search engines misunderstand company entity data, dropping Google 3-Pack and rich snippet eligibility.",
    hardening:
      "Server-rendered @graph containing nested Organization, ProfessionalService, FAQPage, and BreadcrumbList schemas.",
    iconType: "ai",
  },
];

const CATEGORIES: QACategory[] = [
  "All Inspection Points",
  "Perimeter Security",
  "Core Web Vitals",
  "Sovereign Database",
  "SPA Routing & Fallbacks",
  "Speed-to-Lead SLAs",
  "AI Guardrails & GEO",
];

export function QAChecklistSection() {
  const [activeCategory, setActiveCategory] = useState<QACategory>("All Inspection Points");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["SEC-01", "PERF-06", "DAT-11", "LEAD-21"])
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPoints = useMemo(() => {
    return QA_CHECKLIST_POINTS.filter((point) => {
      const matchesCategory =
        activeCategory === "All Inspection Points" || point.category === activeCategory;
      const matchesQuery =
        !searchQuery ||
        point.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.benchmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.hardening.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredPoints.map((p) => p.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const copyCommand = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case "security":
        return <Lock className="w-4 h-4 text-cyan-400" />;
      case "performance":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "database":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "routing":
        return <Globe className="w-4 h-4 text-blue-400" />;
      case "lead":
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case "ai":
        return <Bot className="w-4 h-4 text-pink-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="qa-inspection-matrix" className="relative z-20 py-20 sm:py-28 bg-[#07090e] text-white border-b border-white/[0.08] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header & Badges */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>30 / 30 DEFENCE-GRADE POINTS VERIFIED · ZERO-DEFECT STANDARD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            The 30-Point{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-400">
              Defence-Grade QA Protocol
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every system delivered by SAGE DO passes an uncompromising 30-point engineering audit across security, performance, database sovereignty, routing resilience, and AI guardrails.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-[#0f131d] border border-white/[0.08] text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">6</div>
              <div className="text-[11px] text-neutral-400 font-medium">Core Categories</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0f131d] border border-white/[0.08] text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">30 / 30</div>
              <div className="text-[11px] text-neutral-400 font-medium">Verified Hardened</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0f131d] border border-white/[0.08] text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400">&lt; 0.8s</div>
              <div className="text-[11px] text-neutral-400 font-medium">LCP Mobile SLA</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0f131d] border border-white/[0.08] text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-400">100%</div>
              <div className="text-[11px] text-neutral-400 font-medium">Code Sovereignty</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Horizontal Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((category) => {
              const count =
                category === "All Inspection Points"
                  ? QA_CHECKLIST_POINTS.length
                  : QA_CHECKLIST_POINTS.filter((p) => p.category === category).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : "bg-[#11141e] text-neutral-400 hover:text-white hover:bg-[#181d2a] border border-white/[0.06]"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-cyan-400/20 text-cyan-300" : "bg-white/[0.06] text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Expand/Collapse Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search benchmark or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#11141e] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <Button
              onClick={expandedIds.size > 0 ? collapseAll : expandAll}
              variant="outline"
              size="sm"
              className="text-xs h-8 px-3 border-white/[0.1] bg-[#11141e] hover:bg-[#181d2a] text-neutral-300 cursor-pointer"
            >
              {expandedIds.size > 0 ? "Collapse All" : "Expand All"}
            </Button>
          </div>
        </div>

        {/* 30-Point Expandable Matrix Grid */}
        <div className="space-y-3">
          {filteredPoints.map((point) => {
            const isExpanded = expandedIds.has(point.id);

            return (
              <div
                key={point.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-[#0d1018] border-cyan-500/35 shadow-[0_4px_25px_rgba(6,182,212,0.08)]"
                    : "bg-[#0b0e15] border-white/[0.07] hover:border-white/[0.15]"
                }`}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => toggleExpand(point.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* ID Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded-md bg-white/[0.06] text-cyan-300 border border-white/[0.08]">
                        {point.id}
                      </span>
                      <div className="hidden sm:flex">{getCategoryIcon(point.iconType)}</div>
                    </div>

                    {/* Title and Benchmark */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {point.title}
                        </h4>
                        <span className="text-[11px] font-medium text-neutral-400 hidden md:inline">
                          · {point.standard}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {point.benchmark}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges & Toggle Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>PASS</span>
                    </span>

                    <button
                      className="p-1 rounded-lg text-neutral-400 hover:text-white"
                      aria-label={isExpanded ? "Collapse item" : "Expand item"}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Inspection Card */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-white/[0.06] bg-[#090b11] mt-2 space-y-4">
                    {/* Technical Benchmark */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Technical Benchmark:
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-200 font-medium">
                        {point.benchmark}
                      </div>
                    </div>

                    {/* Monospace Terminal Verification Command */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          Terminal Verification Command:
                        </span>
                        <button
                          onClick={() => copyCommand(point.id, point.command)}
                          className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer"
                        >
                          {copiedId === point.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Command</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-[#06070a] border border-white/[0.1] font-mono text-xs text-cyan-300 overflow-x-auto select-all flex items-start gap-2">
                        <span className="text-neutral-500 select-none">$</span>
                        <code className="break-all">{point.command}</code>
                      </div>
                    </div>

                    {/* Consequence of Failure vs Hardening Mechanism */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Red Consequence Box */}
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                        <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          Consequence of Failure in Legacy Builds
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {point.failureConsequence}
                        </p>
                      </div>

                      {/* Green Hardening Box */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25">
                        <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          SAGE DO Hardening Implementation
                        </div>
                        <p className="text-xs text-neutral-200 leading-relaxed">
                          {point.hardening}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Audit Warranty CTA Footer */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0e121b] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">
                Require audit attestation for your enterprise build?
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Every client delivery includes a signed 30-point human engineering verification certificate and full terminal audit logs.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/916284925684?text=Hi%20Mukul,%20I'm%20interested%20in%20learning%20more%20about%20the%2030-Point%20QA%20Checklist%20and%20engineering%20warranty."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("qa_checklist_cta")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Verify QA Protocol on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default QAChecklistSection;
