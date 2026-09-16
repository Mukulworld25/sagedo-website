/**
 * SAGE DO — Post-build Pre-render Script (v2.0 — Complete Rewrite)
 * 
 * WHY: The site is a React SPA. Google receives an empty index.html with a 
 * spinner for EVERY route. This script generates real HTML for every public 
 * route so Google can index content without executing JavaScript.
 * 
 * HOW: After `vite build`, this script:
 *   1. Reads the built dist/index.html
 *   2. For each route, creates a copy with route-specific:
 *      - <title>, <meta description>, <link canonical>, OG tags
 *      - A <noscript> block with REAL, VISIBLE page content
 *   3. Google reads the noscript content; real users get the React app
 * 
 * Run: node scripts/prerender.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE DEFINITIONS — Every public route with SEO content
// ═══════════════════════════════════════════════════════════════════════════

const routes = [
  // ── HOMEPAGE ─────────────────────────────────────────────────────────
  {
    path: '/',
    title: "SAGEDO — India's First AI + Human Hybrid Execution Team",
    description: "SAGEDO combines AI speed with human precision to deliver agency-quality websites, apps, branding, and automation in 24-48 hours at freelancer prices. Based in Chandigarh, serving all India.",
    content: `
      <h1>SAGE DO — Speed of AI. Precision of Humans.</h1>
      <p>SAGE DO is India's first AI + Human hybrid execution team. We deliver agency-quality websites, apps, branding, CRM, SEO, and business automation — in 24-48 hours at freelancer prices.</p>
      <h2>Why Choose SAGE DO?</h2>
      <p>Every AI needs a human in the loop. We're the best AI generalists in the game. We prompt it right, verify the output, and polish it until it's not just good — it's perfect.</p>
      <h2>Our Services</h2>
      <ul>
        <li>3 Delivery Tiers — Digital Presence Engine, Sovereign Revenue Engine™, Enterprise Infrastructure</li>
        <li>SAGEDO Revenue Infrastructure Blueprint — ₹25,000, 100% credited against any tier build</li>
        <li>AI Agent Development, AI Voice Agents &amp; Mobile App Development</li>
        <li>Recurring Add-Ons — Google &amp; Meta Ads Management, AI Content Engine, SEO Content Retainer</li>
      </ul>
      <h2>Delivery Tiers</h2>
      <p><strong>Digital Presence Engine — ₹45,000–₹75,000:</strong> Logo + Brand Identity, 5-Page Website, Google Business Profile, SEO Basics, Business Email. Live in 14 days or full refund. AMC ₹15,000/month.</p>
      <p><strong>Sovereign Revenue Engine™ — ₹1,50,000–₹2,50,000 (Most Popular):</strong> Everything in Digital Presence Engine + CRM + Lead Automation, WhatsApp Sales Bot, SEO Setup + 4 Blog Posts, 30 Days Social Content. Live in 28 days, 10-gate QA certified. AMC ₹25,000/month.</p>
      <p><strong>Enterprise Infrastructure — Starting at ₹3,50,000:</strong> Enterprise Web + Native App, Admin Dashboard, Dedicated Growth Engineer, Legal &amp; IP Contracts. AMC ₹35,000/month.</p>
      <h2>How It Works</h2>
      <ol>
        <li>Submit Your Problem — Describe your challenge in plain English or Hindi.</li>
        <li>AI Analysis — Our system instantly analyzes and finds the best solution.</li>
        <li>Receive Your Answer — Get a clear, actionable solution sent right back to you.</li>
      </ol>
      <h2>Meet the Founder — Mukul Dhiman</h2>
      <p>Ex-Aerospace systems engineer turned AI builder. Mukul started SAGE DO because Indian businesses were getting ripped off by agencies charging ₹5 Lakhs for what AI can do in 48 hours. He personally oversees every project.</p>
      <h2>Testimonials</h2>
      <p>"Sagedo is an easy-to-use and efficient platform that helps simplify tasks and save time." — Priya Singh, Verified Trustpilot Review</p>
      <p>"Nice service, very good behaviour. What a cool and knowledgeable experience." — Akshit Kashyap, Verified Trustpilot Review</p>
      <h2>Get a Free AI Business Audit</h2>
      <p>Discover exactly what's holding your business back online. Our AI scans your digital presence and delivers a personalized roadmap — in under 24 hours. 100% free, no strings attached.</p>
      <p>Contact: WhatsApp +91 6284925684 | Email hello@sagedo.in | Visit sagedo.in</p>
    `,
  },

  // ── SERVICES ────────────────────────────────────────────────────────
  {
    path: '/services',
    title: "Services | SAGEDO — AI + Human Business Services India",
    description: "SAGEDO delivers 3 execution tiers from ₹45,000 — Digital Presence Engine, Sovereign Revenue Engine™, Enterprise Infrastructure — plus the ₹25,000 Revenue Infrastructure Blueprint (100% credited) and recurring growth add-ons.",
    content: `
      <h1>SAGEDO Services — Build Your Legacy</h1>
      <p>Precision-engineered services for founders, leaders, and visionaries who refuse to settle for average. One consolidated catalog: 3 delivery tiers, the Blueprint audit, standalone AI builds, and recurring add-ons.</p>
      <h2>The Founder's Stack — Delivery Tiers</h2>
      <h3>Digital Presence Engine — ₹45,000–₹75,000</h3>
      <p>Everything a serious business needs to exist online: Logo + Brand Identity, 5-Page Website + SEO Basics, Google Business Profile, Business Email, Social Media Setup, GST + MSME Registration. Live in 14 days or full refund. AMC ₹15,000/month.</p>
      <h3>Sovereign Revenue Engine™ — ₹1,50,000–₹2,50,000 (Most Popular)</h3>
      <p>Complete execution: Everything in Digital Presence Engine + CRM + Lead Automation, WhatsApp Sales Bot + AI Website Chatbot, Sales Automation, Analytics Dashboard, Missed-Call Text-Back, Review Automation, SEO Setup + 4 Blog Posts, 30 Days Social Content. Live in 28 days, 10-gate QA certified. AMC ₹25,000/month.</p>
      <h3>Enterprise Infrastructure — Starting at ₹3,50,000</h3>
      <p>Enterprise infrastructure: Enterprise Web + Native App, Admin Dashboard, Dedicated Growth Engineer, Legal &amp; IP Contracts + Trademark Filing, HR System Setup. AMC ₹35,000/month.</p>
      <h2>SAGEDO Revenue Infrastructure Blueprint — ₹25,000</h2>
      <p>A deep audit of your revenue infrastructure — website, SEO, funnel, CRM, automations, analytics — with a prioritized build blueprint. 100% of the fee is credited against any tier build within 90 days.</p>
      <h2>Standalone Builds &amp; Recurring Add-Ons</h2>
      <ul>
        <li>Mobile App Development — ₹59,999 – ₹95,000</li>
        <li>AI Agent Development &amp; Operations — ₹45,000 – ₹75,000</li>
        <li>AI Voice &amp; Telephony Agents — ₹45,000 – ₹55,000</li>
        <li>Google &amp; Meta Ads Management — ₹15,000 – ₹25,000/month</li>
        <li>AI Content Repurposing Engine — ₹15,000/month</li>
        <li>SEO Content Retainer — ₹15,000/month</li>
      </ul>
      <h2>AMC &amp; Expert Guidance</h2>
      <ul>
        <li>Tier AMCs — ₹15,000/mo (Tier 1), ₹25,000/mo (Tier 2), ₹35,000/mo (Tier 3)</li>
        <li>First Discovery Call — 15 min, FREE</li>
        <li>Growth Retainer — ₹15,000/mo: weekly sync calls + priority WhatsApp access</li>
      </ul>
      <p>Contact: WhatsApp +91 6284925684 | Email hello@sagedo.in</p>
    `,
  },

  // ── ABOUT ───────────────────────────────────────────────────────────
  {
    path: '/about',
    title: "About SAGEDO — India's First AI + Human Hybrid Execution Team",
    description: "Learn about SAGEDO, founded by Mukul Dhiman. Combining 5 years of aerospace precision engineering with modern AI speed to deliver 30+ digital services across India. Based in Chandigarh.",
    content: `
      <h1>About SAGE DO</h1>
      <p>SAGE DO is India's first AI + Human hybrid service platform. We combine the speed and scale of artificial intelligence with the precision and creativity of human experts to deliver professional-grade digital services — from websites and apps to content creation, marketing, and business automation.</p>
      <p>With 30+ services across Startup Launch, Marketing, Design, and Engineering categories, we serve visionary founders, high-growth startups, and elite enterprises. Every task is analyzed by AI, verified by humans, and delivered within 24-48 hours.</p>
      <h2>Founder — Mukul Dhiman</h2>
      <p>Aerospace systems engineer with 5 years in precision manufacturing and high-tolerance systems, Operations Manager (25-person teams, 40% efficiency improvement), Full-stack Developer (SaaS, mobile apps, AI automation), AI Engineer (Built 30+ AI-powered services from scratch).</p>
      <h2>Our Vision</h2>
      <p>To democratize access to world-class digital services for every Indian founder, executive, and forward-thinking business — making enterprise-quality work available at startup-friendly prices, delivered at AI speed.</p>
      <h2>Our Mission</h2>
      <p>To bridge the execution gap between ideas and reality. We help fast-growth startups and seasoned executives get their most difficult tasks done — faster, cheaper, and better than any alternative.</p>
      <h2>Service Categories</h2>
      <ul>
        <li>Scale Business — Ads, Landing Pages, Funnels</li>
        <li>Startup Launch — Go-to-Market, MVPs, Pitches</li>
        <li>Executive Branding — LinkedIn &amp; Thought Leadership</li>
        <li>AI Automation — Agents, Workflows, Scraping</li>
      </ul>
      <h2>Contact</h2>
      <p>Phone: +91 6284925684 | Email: hello@sagedo.in | WhatsApp: +91 6284925684</p>
      <p>Office: SAGE DO AI, Chandigarh, India, PIN 160014. Mon–Sat, 10:00 AM – 7:00 PM IST.</p>
    `,
  },

  // ── CONTACT ─────────────────────────────────────────────────────────
  {
    path: '/contact',
    title: "Contact SAGEDO — Get In Touch | WhatsApp, Email, Phone",
    description: "Contact SAGEDO for AI + Human business services. WhatsApp: +91 6284925684, Email: hello@sagedo.in. Based in Chandigarh, serving all India. We respond within 24 hours.",
    content: `
      <h1>Contact SAGEDO</h1>
      <p>Have a question or need help? We're here for you. Reach out and we'll get back to you within 24 hours.</p>
      <h2>Contact Information</h2>
      <ul>
        <li>Email: hello@sagedo.in</li>
        <li>Phone: +91 6284925684</li>
        <li>WhatsApp: +91 6284925684 (Quick responses, available 24/7)</li>
        <li>Address: SAGE DO, Chandigarh, India</li>
      </ul>
      <p>We typically respond within 24 hours. For urgent matters, reach out via WhatsApp for faster support.</p>
    `,
  },

  // ── FAQ ──────────────────────────────────────────────────────────────
  {
    path: '/faq',
    title: "FAQ — Frequently Asked Questions | SAGEDO",
    description: "Answers to common questions about SAGEDO services, pricing, delivery, payment, refunds, and support. AI + Human hybrid execution for Indian businesses.",
    content: `
      <h1>Frequently Asked Questions — SAGEDO</h1>
      <h2>What is SAGE DO?</h2>
      <p>SAGE DO is India's first AI + Human Hybrid Execution Team. We combine AI speed with human precision to deliver agency-quality websites, apps, branding, and automation in 24-48 hours at freelancer prices.</p>
      <h2>How much does SAGE DO cost?</h2>
      <p>SAGE DO pricing is structured in three tiers: Digital Presence Engine (₹45,000–₹75,000 one-time, AMC ₹15,000/month), Sovereign Revenue Engine™ (₹1,50,000–₹2,50,000 one-time, AMC ₹25,000/month), and Enterprise Infrastructure (starting at ₹3,50,000, AMC ₹35,000/month).</p>
      <h2>How fast does SAGE DO deliver?</h2>
      <p>The Digital Presence Engine is live in 14 days or you receive a full refund. Sovereign Revenue Engine™ goes live in 28 days, 10-gate QA certified. Enterprise Infrastructure timelines are scoped per engagement.</p>
      <h2>Who founded SAGE DO?</h2>
      <p>Mukul Dhiman, ex-aerospace systems engineer turned AI founder. He personally oversees every project.</p>
      <h2>Is SAGE DO available in my city?</h2>
      <p>Yes! SAGE DO serves all of India remotely. Based in Chandigarh, we work with clients across Delhi, Mumbai, Bangalore, Hyderabad, and all other cities via WhatsApp.</p>
      <h2>How much does an AI website cost in India?</h2>
      <p>At SAGE DO, a professional AI-powered website starts at ₹45,000 with the Digital Presence Engine — live in 14 days or full refund. Traditional agencies charge ₹2-5 Lakhs.</p>
      <h2>What is the best budget CRM setup for Indian small businesses?</h2>
      <p>CRM and revenue automation at SAGE DO is delivered through Sovereign Revenue Engine™ (₹1,50,000–₹2,50,000 one-time, AMC ₹25,000/month) — CRM setup, lead automation, and WhatsApp integration, live in 28 days with 10-gate QA certification.</p>
      <h2>How much does a WhatsApp sales bot cost in India?</h2>
      <p>WhatsApp sales automation at SAGE DO is included in the Sovereign Revenue Engine™ tier (₹1,50,000–₹2,50,000 one-time, AMC ₹25,000/month), live in 28 days with 10-gate QA certification.</p>
    `,
  },

  // ── FREE AUDIT ──────────────────────────────────────────────────────
  {
    path: '/free-audit',
    title: "Free AI Business Audit — SAGEDO | 24-Hour Delivery",
    description: "Get a free 5-point AI Audit for your business delivered via WhatsApp in 24 hours. Uncover visibility, automation, and revenue gaps. No sales pitch, 100% actionable.",
    content: `
      <h1>Free AI Business Audit — Stop Guessing. Find Your Execution Gap.</h1>
      <p>A perfect product that nobody sees is a dead product. We'll analyze your business and send you a brutal, 5-point execution plan to fix your visibility and revenue gaps in 24 hours.</p>
      <h2>What You Get in Your Custom PDF</h2>
      <ul>
        <li>Organic Visibility Score — See exactly why your competitors are found instead of you.</li>
        <li>Automation Opportunities — Where AI can replace your manual daily grind.</li>
        <li>Conversion Bottlenecks — Why your traffic isn't converting into revenue.</li>
      </ul>
      <p>No sales pressure. No generic fluff. Just 100% actionable advice we'd charge ₹25,000 for. Request your free audit at sagedo.in/free-audit or WhatsApp +91 6284925684.</p>
    `,
  },

  // ── BLOG INDEX ──────────────────────────────────────────────────────
  {
    path: '/blog',
    title: "SAGEDO Blog — AI Execution Tips for Indian Startups & Founders",
    description: "Learn how AI + human execution helps Indian startups grow faster. Case studies, pricing guides, SEO tips, and strategies from SAGEDO — India's first AI hybrid execution team.",
    content: `
      <h1>SAGEDO Blog — Insights &amp; Case Studies</h1>
      <p>Real stories from the frontlines of AI execution. No fluff. No theory. Just what works for Indian founders.</p>
      <h2><a href="/blog/custom-crm-vs-zoho-zero-seat-decision-indian-msmes">Custom CRM vs. Zoho: The Zero-Per-Seat Decision for Indian MSMEs</a></h2>
      <p>Pillar guide: Zoho costs ₹12 lakh/year at 100 users vs ₹3.6 lakh/year all-in for a SAGEDO custom CRM — full 5-year TCO table, crossover math, and FAQ.</p>
      <h2><a href="/blog/how-i-built-digital-ecosystem-jute-manufacturer-5-days">How I Built a Complete Digital Ecosystem for a Jute Manufacturer in 5 Days</a></h2>
      <p>A rural jute products business had zero online presence. I built their website, brand identity, social media, and Google listing from scratch in 5 days flat.</p>
      <h2><a href="/blog/how-much-website-cost-india-2026">How Much Does a Website Cost in India in 2026? Complete Breakdown</a></h2>
      <p>An honest, no-BS breakdown of what a business website actually costs in India — from free DIY tools to ₹10L agency builds.</p>
      <h2><a href="/blog/5-things-after-gst-registration">5 Things Every Business MUST Do After GST Registration</a></h2>
      <p>1.8 lakh Indians register for GST every month — and most of them stop there. Here are the 5 digital assets every new business needs.</p>
      <h2><a href="/blog/google-business-profile-setup-guide-india">Google Business Profile Setup Guide for Indian Businesses</a></h2>
      <p>Complete step-by-step guide to setting up your Google Business Profile so customers find you on Google Maps.</p>
      <h2><a href="/blog/best-app-development-company-india-2026">Best Affordable App Development Companies in India — 2026 Guide</a></h2>
      <p>Comparing app development options in India — agencies, freelancers, and AI-hybrid teams. Real cost comparisons and timelines.</p>
      <h2><a href="/blog/why-indian-startup-websites-get-zero-google-traffic">Why 96% of Indian Startup Websites Get Zero Traffic from Google</a></h2>
      <p>96% of them have the same 3 problems that guarantee zero Google traffic. Here is the full breakdown.</p>
      <h2><a href="/blog/how-i-fixed-sagedo-visibility-google-chatgpt">How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours</a></h2>
      <p>Over 90% of Indian startups are invisible to AI search engines. Here is exactly what was wrong and how I fixed it.</p>
      <h2><a href="/blog/fixed-1000-user-app-crash-2-hours">How I Fixed a 1000-User App Crash in 2 Hours Using AI</a></h2>
      <p>A startup's mobile app was showing a blank grey screen to every single user. I fixed it in 2 hours.</p>
      <h2><a href="/blog/indian-startups-need-ai-human-execution">Why Indian Startups Need AI + Human Execution (Not Just Freelancers)</a></h2>
      <p>The freelancer model is broken for growing startups. Here's why hybrid AI + human execution teams are the future.</p>
      <h2><a href="/blog/5-signs-business-needs-sagedo">5 Signs Your Business Needs SAGEDO Right Now</a></h2>
      <p>If any of these sound familiar — you're losing money every day you don't fix them.</p>
    `,
  },

  // ── BLOG POSTS (all 10) ────────────────────────────────────────────
  {
    path: '/blog/how-i-built-digital-ecosystem-jute-manufacturer-5-days',
    title: "How I Built a Complete Digital Ecosystem for a Jute Manufacturer in 5 Days — SAGEDO",
    description: "Case study: SAGEDO built a complete digital ecosystem — website, branding, social media, and Google Business Profile — for a rural jute manufacturer in just 5 days.",
    content: `<article><h1>How I Built a Complete Digital Ecosystem for a Jute Manufacturer in 5 Days</h1><p>By Mukul Dhiman | April 4, 2026 | 6 min read</p><p>A rural jute products business had zero online presence. No website. No social media. No Google listing. I built their website, brand identity, social media, and Google listing from scratch in 5 days flat.</p><h2>Day 1: Brand Identity and Strategy</h2><p>Deep-dive call with the founder. Designed complete brand identity: logo, color palette, typography. Created brand guidelines.</p><h2>Day 2-3: Website Development</h2><p>5-page responsive website. Product catalog. Contact form connected to WhatsApp. SEO foundation: meta tags, schema markup, sitemap. Mobile-first design.</p><h2>Day 4: Social Media and Content</h2><p>Instagram business account with 15 ready-to-post content pieces. Facebook business page. 30-day content calendar. WhatsApp Business with auto-replies.</p><h2>Day 5: Google Business Profile and Launch</h2><p>Created and optimized Google Business Profile. Submitted to Search Console. Set up Analytics. Final QA across devices.</p><h2>Results</h2><p>Full website + 3 social platforms + Google listing. Searchable on Google, Instagram, and WhatsApp. Lead capture via WhatsApp forms + Instagram DMs + Google Maps. Total investment: Under ₹20,000 in 5 days.</p><p>Want the same for your business? Visit sagedo.in/free-audit for a free assessment.</p></article>`,
  },
  {
    path: '/blog/how-much-website-cost-india-2026',
    title: "Website Design Cost in India (2026 Pricing Guide & Secrets) — SAGEDO",
    description: "How much does website design cost in India? Read the honest 2026 pricing guide comparing DIY, freelancers, agencies, and how to save up to 80% on development.",
    content: `<article><h1>How Much Does a Website Cost in India in 2026?</h1><p>By Mukul Dhiman | April 1, 2026 | 6 min read</p><h2>Quick Price Comparison</h2><p>DIY (Wix/WordPress): ₹3,000–₹8,000. Freelancer: ₹10,000–₹30,000 (2-4 weeks). Mid-tier Agency: ₹50,000–₹2,00,000 (4-8 weeks). Premium Agency: ₹2,00,000–₹10,00,000+ (2-6 months). AI + Human Hybrid (SAGEDO): ₹15,000–₹35,000 (7-12 days).</p><h2>The SAGEDO Approach</h2><p>Starter Launch (₹15,000): 5-page website + brand identity + SEO basics + domain setup. 7-day delivery. Full Launch (₹35,000): 10+ pages + blog + social + Google Business + CRM + WhatsApp bot. 10-12 days.</p><p>The result is agency-quality work at freelancer prices, delivered in days instead of weeks.</p><p>Get a free quote at sagedo.in/free-audit.</p></article>`,
  },
  {
    path: '/blog/5-things-after-gst-registration',
    title: "5 Things Every Business MUST Do After GST Registration — SAGEDO Blog",
    description: "Just got GST? Here are 5 digital assets every new Indian business must set up: Google listing, website, email, logo, WhatsApp Business.",
    content: `<article><h1>5 Things Every Business MUST Do After GST Registration</h1><p>By Mukul Dhiman | April 1, 2026 | 5 min read</p><p>1.8 lakh Indians register for GST every month — and most stop there. Here are the 5 essential digital assets:</p><h2>1. Google Business Profile (URGENT)</h2><p>46% of Google searches have local intent. Free to create. Professional setup by SAGEDO: ₹799.</p><h2>2. Professional Website</h2><p>88% of Indian consumers research online before buying. ₹15,000 with SAGEDO Starter Launch (7 days).</p><h2>3. Business Email</h2><p>Professional email like hello@yourbusiness.com. ₹75-200/month.</p><h2>4. Brand Identity</h2><p>Logo and brand colors. ₹1,999-₹2,499 with SAGEDO (3-5 days).</p><h2>5. WhatsApp Business</h2><p>Auto-replies and product catalog. Free app. Custom bot by SAGEDO from ₹4,999.</p><p>SAGEDO's Starter Package (₹15,000) covers ALL 5 in 7 days. Visit sagedo.in.</p></article>`,
  },
  {
    path: '/blog/google-business-profile-setup-guide-india',
    title: "Google Business Profile Setup Guide for Indian Businesses — SAGEDO Blog",
    description: "Complete step-by-step guide to setting up Google Business Profile in India. Includes service-area businesses, verification methods, and optimization checklist.",
    content: `<article><h1>Google Business Profile Setup Guide for Indian Businesses</h1><p>By Mukul Dhiman | April 1, 2026 | 7 min read</p><p>If your business doesn't show up on "near me" searches, you're losing 30-40 potential customers daily. Here's the complete setup guide.</p><h2>Steps</h2><p>1. Go to business.google.com. 2. Enter your exact business name. 3. Choose the right category (be specific). 4. Add your location or service area. 5. Add contact information. 6. Verify your business (phone, email, video, or postcard). 7. Optimize your profile.</p><h2>Optimization Tips</h2><p>Write 750-character description. Upload 10+ photos. Set accurate hours. List all services. Post weekly updates. Get 10+ reviews.</p><p>SAGEDO handles the entire process for ₹799. Contact us on WhatsApp +91 6284925684.</p></article>`,
  },
  {
    path: '/blog/best-app-development-company-india-2026',
    title: "Best Affordable App Development Companies in India 2026 — SAGEDO Blog",
    description: "Compare app development costs in India 2026. Top agencies ₹5L-50L, mid agencies ₹1L-10L, freelancers ₹20K-3L, AI-hybrid (SAGEDO) ₹15K-95K.",
    content: `<article><h1>Best Affordable App Development Companies in India — 2026 Guide</h1><p>By Mukul Dhiman | April 1, 2026 | 6 min read</p><h2>Cost Comparison</h2><p>Top Agency: ₹5L–50L, 4-8 months. Mid Agency: ₹1L–10L, 2-4 months. Freelancer: ₹20K–3L, 1-3 months. SAGEDO: ₹15K–95K, 7-15 days.</p><h2>What to Look For</h2><p>React Native for cross-platform. Check live portfolio on Play Store. Real-time communication via WhatsApp. Fixed pricing. Post-launch support included.</p><p>SAGEDO builds apps using React Native, Next.js, Node.js + PostgreSQL. Web app from ₹15K, full mobile app ₹95K. Get a free consultation at sagedo.in/free-audit.</p></article>`,
  },
  {
    path: '/blog/why-indian-startup-websites-get-zero-google-traffic',
    title: "Why 96% of Indian Startup Websites Get Zero Traffic from Google — SAGEDO Blog",
    description: "96% of Indian startup websites have 3 problems guaranteeing zero Google traffic: no technical SEO, no external signals, and wrong content strategy.",
    content: `<article><h1>Why 96% of Indian Startup Websites Get Zero Traffic from Google</h1><p>By Mukul Dhiman | March 12, 2026 | 4 min read</p><h2>Problem 1: No Technical SEO Foundation</h2><p>No Search Console, no sitemap, no meta tags. Google cannot index what it cannot find.</p><h2>Problem 2: No External Signals</h2><p>Zero backlinks, no Crunchbase profile, no Wikidata entry. Google has no reason to trust the domain.</p><h2>Problem 3: Content Nobody Searches For</h2><p>Startups write about features and vision. People search for problems. Write about their problems and you show up.</p><p>SAGEDO fixes all three for Indian startups in 48 hours. Visit sagedo.in.</p></article>`,
  },
  {
    path: '/blog/how-i-fixed-sagedo-visibility-google-chatgpt',
    title: "How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours — SAGEDO",
    description: "Over 90% of Indian startups are invisible to AI search engines. SAGEDO founder shares how he fixed visibility on Google, ChatGPT, and Perplexity in 24 hours.",
    content: `<article><h1>How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours</h1><p>By Mukul Dhiman | March 11, 2026 | 5 min read</p><h2>Fix 1: robots.txt Blocking AI Crawlers</h2><p>Updated to explicitly allow GPTBot, PerplexityBot, Googlebot, and all AI crawlers.</p><h2>Fix 2: Created Crunchbase Profile</h2><p>Created in 23 minutes. Growth Prediction score: 88/100.</p><h2>Fix 3: Created Wikidata Entry</h2><p>Created in 18 minutes. Permanent identity in the world's largest open knowledge database.</p><h2>Fix 4: Set Up Google Search Console</h2><p>Submitted sitemap. Google discovered 10 pages within 48 hours.</p><p>Total time: 3 hours of work. Result: SAGEDO now appears in AI chatbot responses and search results.</p></article>`,
  },
  {
    path: '/blog/fixed-1000-user-app-crash-2-hours',
    title: "How I Fixed a 1000-User App Crash in 2 Hours Using AI — SAGEDO Blog",
    description: "A startup app crashed for 1000+ users. Dev team stuck for 10 days. SAGEDO founder fixed it in 2 hours — a stale build file was the root cause.",
    content: `<article><h1>How I Fixed a 1000-User App Crash in 2 Hours Using AI</h1><p>By Mukul Dhiman | March 1, 2026 | 5 min read</p><p>A startup's mobile app was showing a blank grey screen to 1,000+ users. Dev team debugging for 10 days. Fixed in 2 hours.</p><h2>The Root Cause</h2><p>A stale index.html and broken JavaScript bundle in /public/app/ was overriding the live React app in the WebView.</p><h2>The Fix</h2><p>Deleted stale files, pushed to Vercel, auto-deployed in 3 minutes. 1,000+ users back online instantly.</p><p>This is what SAGEDO does. We execute what your team is stuck on. AI speed. Human precision. Visit sagedo.in.</p></article>`,
  },
  {
    path: '/blog/indian-startups-need-ai-human-execution',
    title: "Why Indian Startups Need AI + Human Execution — SAGEDO Blog",
    description: "Why the freelancer model is broken for Indian startups. AI + human hybrid execution teams deliver better results, faster, and cheaper.",
    content: `<article><h1>Why Indian Startups Need AI + Human Execution (Not Just Freelancers)</h1><p>By Mukul Dhiman | February 28, 2026 | 7 min read</p><h2>The Freelancer Problem</h2><p>Managing 5 different people, 5 timezones, 5 quality standards. Coordination cost exceeds actual work.</p><h2>The Agency Problem</h2><p>Paying for their overhead. 6-week timelines are a death sentence for startups.</p><h2>The SAGEDO Solution</h2><p>AI speed + Human precision + Indian pricing. Website: 7 days at ₹15K vs agency 6 weeks at ₹50K+. Same quality. WhatsApp support with 5-minute response time.</p></article>`,
  },
  {
    path: '/blog/5-signs-business-needs-sagedo',
    title: "5 Signs Your Business Needs SAGEDO Right Now — SAGEDO Blog",
    description: "5 warning signs your business execution is broken: unfinished website, freelancer chaos, dead social media, no analytics, doing everything yourself.",
    content: `<article><h1>5 Signs Your Business Needs SAGEDO Right Now</h1><p>By Mukul Dhiman | February 25, 2026 | 4 min read</p><ol><li>You're still "working on" your website after 2+ weeks</li><li>You're spending more time managing freelancers than building</li><li>Your social media looks like an afterthought</li><li>You don't know where your leads come from</li><li>You're doing everything yourself — CEO, designer, writer, tech support</li></ol><p>SAGEDO fixes all of these. Starter Launch ₹15,000. Social media from ₹4,999/mo. Get a free audit at sagedo.in/free-audit.</p></article>`,
  },

  // ── ALTERNATIVES PAGES ──────────────────────────────────────────────
  {
    path: '/alternatives/agency-alternative',
    title: "SAGEDO vs Agencies — Why We're the Better Alternative | India",
    description: "SAGEDO delivers agency-quality work at 10x lower cost in 48 hours instead of 6 weeks. Compare pricing, timelines, and quality.",
    content: `<h1>SAGEDO — The Smarter Agency Alternative</h1><p>Traditional agencies charge ₹50K-₹5L and take 4-8 weeks. SAGEDO delivers the same quality in 48 hours at 10x lower cost. AI speed + Human precision = no compromise.</p>`,
  },
  {
    path: '/alternatives/freelancer-alternative',
    title: "SAGEDO vs Freelancers — Reliable Execution Alternative | India",
    description: "Stop chasing freelancers who ghost you. SAGEDO provides reliable, guaranteed delivery of digital services with WhatsApp-first communication.",
    content: `<h1>SAGEDO — The Reliable Freelancer Alternative</h1><p>Freelancers ghost mid-project, have inconsistent quality, and provide zero post-delivery support. SAGEDO guarantees delivery in 24-48 hours with a dedicated project manager and full support.</p>`,
  },
  {
    path: '/alternatives/diy-ai-alternative',
    title: "SAGEDO vs DIY AI Tools — Expert-Guided AI Execution | India",
    description: "Stop spending hours fighting with ChatGPT. SAGEDO's experts use AI tools professionally to deliver polished, business-ready results.",
    content: `<h1>SAGEDO — Expert AI Execution (Not DIY)</h1><p>DIY AI tools have a steep learning curve and produce mediocre results without expertise. SAGEDO's team uses AI professionally — we prompt it right, verify the output, and polish it until it's perfect.</p>`,
  },

  // ── TOOLS ───────────────────────────────────────────────────────────
  {
    path: '/tools/ai-readiness-check',
    title: "AI Readiness Check — Is Your Business Ready for AI? | SAGEDO",
    description: "Free AI Readiness assessment for Indian businesses. Discover how AI can accelerate your operations, marketing, and customer service.",
    content: `<h1>AI Readiness Check — Is Your Business Ready for AI?</h1><p>Take this quick assessment to discover how AI can accelerate your business operations, marketing, and customer service. Free tool by SAGEDO.</p>`,
  },

  // ── REFER & PARTNER ─────────────────────────────────────────────────
  {
    path: '/refer',
    title: "Refer & Earn — SAGEDO Referral Program",
    description: "Refer businesses to SAGEDO and earn rewards. Share your referral link and earn when your contacts become SAGEDO clients.",
    content: `<h1>SAGEDO Referral Program — Refer &amp; Earn</h1><p>Know a business that needs help going digital? Refer them to SAGEDO and earn rewards when they become clients.</p>`,
  },
  {
    path: '/agency-partner',
    title: "Agency Partner Program — White-Label Services | SAGEDO",
    description: "Partner with SAGEDO to offer AI + Human execution services under your brand. White-label solutions for agencies and consultants.",
    content: `<h1>SAGEDO Agency Partner Program</h1><p>Offer SAGEDO's AI + Human execution services under your agency brand. White-label solutions for web development, SEO, branding, and automation.</p>`,
  },

  // ── ABOUT FOUNDER ───────────────────────────────────────────────────
  {
    path: '/about-founder',
    title: "Mukul Dhiman — Founder of SAGEDO | Aerospace Systems Engineer turned AI Founder",
    description: "Meet Mukul Dhiman, founder of SAGEDO. Aerospace systems engineer with 5 years in precision manufacturing, Operations Manager, Full-stack Developer, AI Systems Engineer.",
    content: `<h1>Mukul Dhiman — Founder &amp; CEO, SAGE DO</h1><p>Aerospace systems engineer with 5 years in high-tolerance precision manufacturing. Operations Manager who led 25-person engineering teams. Full-stack developer who built 30+ AI-powered services. Founded SAGEDO to bring aerospace-grade execution precision to Indian businesses at startup-friendly prices.</p>`,
  },

  // ── LEGAL PAGES ─────────────────────────────────────────────────────
  {
    path: '/privacy-policy',
    title: "Privacy Policy — SAGEDO",
    description: "SAGEDO privacy policy. Learn how we collect, use, and protect your personal information.",
    content: `<h1>Privacy Policy — SAGEDO</h1><p>This privacy policy explains how SAGE DO collects, uses, and protects your personal information when you use our services.</p>`,
  },
  {
    path: '/terms-of-service',
    title: "Terms of Service — SAGEDO",
    description: "SAGEDO terms of service. Read our terms and conditions for using SAGE DO services.",
    content: `<h1>Terms of Service — SAGEDO</h1><p>These terms govern your use of SAGE DO services. By using our platform, you agree to these terms.</p>`,
  },
  {
    path: '/refund-policy',
    title: "Refund Policy — SAGEDO",
    description: "SAGEDO refund and cancellation policy. 48-hour delivery guarantee with full refund if we miss it.",
    content: `<h1>Refund Policy — SAGEDO</h1><p>Every service has a 48-hour delivery guarantee. If we miss the deadline, you get a full refund. No questions asked.</p>`,
  },
  {
    path: '/grievance-officer',
    title: "Grievance Officer — SAGEDO",
    description: "Contact SAGEDO's Grievance Officer for complaints and dispute resolution.",
    content: `<h1>Grievance Officer — SAGEDO</h1><p>For complaints or grievances, contact our Grievance Officer. Email: hello@sagedo.in. Phone: +91 6284925684.</p>`,
  },

  // ── BOOK A CALL ──────────────────────────────────────────────────
  {
    path: '/book-call',
    title: "Book a Free Strategy Call — SAGEDO | Talk to the Founder",
    description: "Book a free 30-minute strategy call with Mukul Dhiman, founder of SAGEDO. Discuss your business challenges and get a tailored execution roadmap. No sales pitch.",
    content: `<h1>Book a Free Strategy Call with the Founder</h1><p>Talk directly to Mukul Dhiman — aerospace systems engineer turned AI founder. Get a brutally honest assessment of where your business stands digitally and exactly what to fix first.</p><h2>What You'll Get</h2><ul><li>5-Point Digital Health Check — Website, SEO, Social, Automation, Lead Capture scored honestly</li><li>Custom Execution Roadmap — Exactly what to build first, how long, and what it costs</li><li>Competitor Analysis — Quick scan of your top 3 competitors</li><li>No-BS Pricing — Transparent quote on the spot</li></ul><p>Book your slot now at sagedo.in/book-call or WhatsApp +91 6284925684</p>`,
  },

  // ── CAREERS ───────────────────────────────────────────────────────
  {
    path: '/careers',
    title: "Careers at SAGEDO — Join India's First AI + Human Execution Team",
    description: "Join SAGE DO and work at the intersection of AI and human execution. Open roles in systems engineering, architecture, copywriting, SEO, and performance marketing. Remote-first, founder-led.",
    content: `<h1>Careers at SAGE DO — Build the Future of Execution</h1><p>SAGE DO isn't just another agency. We're building India's first AI + Human hybrid execution engine. If you want to ship real work for real businesses — not sit in meetings — this is your place.</p><h2>Open Positions</h2><ul><li>Senior AI Prompt &amp; Systems Engineer — Full-time / Remote</li><li>Full-Stack Systems Architect (React / Node / Python) — Full-time / Remote</li><li>Conversion Copywriter &amp; Brand Strategist — Full-time / Remote</li><li>Technical SEO &amp; Programmatic Growth Specialist — Full-time / Remote</li><li>Growth Operations &amp; Client Delivery Manager — Full-time / Chandigarh</li><li>Performance Marketing Specialist (Google &amp; Meta Ads) — Full-time / Remote</li></ul><h2>Why Join?</h2><ul><li>Founder-led — Work directly with Mukul, no middle management</li><li>Remote-first — Work from anywhere in India</li><li>Real impact — Every project ships, you see your work live within 48 hours</li></ul><p>Apply at sagedo.in/careers or WhatsApp +91 6284925684</p>`,
  },

  // ── PILLAR: CUSTOM CRM VS ZOHO (Sept 2026) ──────────────────────────
  {
    path: '/blog/custom-crm-vs-zoho-zero-seat-decision-indian-msmes',
    title: 'Custom CRM vs. Zoho: The Zero-Per-Seat Decision for Indian MSMEs — SAGEDO',
    description: 'Zoho costs ₹12 lakh/year at 100 users (₹45 lakh over 5 years). A SAGEDO custom CRM is ₹2.5 lakh one-time plus ₹25,000/month (₹17.5 lakh over 5 years) with zero per-seat cost. Full 5-year TCO table, crossover math, and FAQ for Indian MSMEs.',
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "How much does custom CRM development cost in Chandigarh and Mohali?", "acceptedAnswer": {"@type": "Answer", "text": "In the Tri-City market, a production custom CRM with unlimited seats, WhatsApp lead routing, GST/Tally flows, and dashboards costs ₹1,50,000–₹2,50,000 one-time from SAGEDO (delivered in 28 days, source code included). Metro agencies quote ₹8–15 lakh for equivalent scope. Zoho's alternative is roughly ₹12,000/seat/year, ongoing."}},
    {"@type": "Question", "name": "Is Zoho CRM cheaper than a custom-built CRM?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, up to roughly 8–25 users depending on growth. For a business scaling from 25 to 100 users, cumulative Zoho licence spend passes the one-time custom build cost around year 2–3; after the crossover the custom CRM is cheaper every year — about ₹3.6 lakh/year all-in versus ₹12 lakh/year for 100 Zoho seats."}},
    {"@type": "Question", "name": "What does zero per seat mean in CRM pricing?", "acceptedAnswer": {"@type": "Answer", "text": "A zero-per-seat custom CRM carries no per-user licence. Adding users has zero marginal software cost; the only recurring cost is a flat maintenance contract — ₹25,000/month at SAGEDO — covering hosting, security patching, backups, and support, which does not scale with headcount."}},
    {"@type": "Question", "name": "How long does a SAGEDO custom CRM take to build?", "acceptedAnswer": {"@type": "Answer", "text": "SAGEDO's published Sovereign Revenue Engine delivery window is 28 calendar days: discovery and blueprint in days 1–3, the core build sprint in days 4–21, and handover with staff training and a monitored SLA in days 22–28. Full source code and database credentials transfer at handover."}},
    {"@type": "Question", "name": "Do we own our CRM data and code with a custom build?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The PostgreSQL database and full source code are handed over, and unaided export in documented formats should be a contractual requirement with any vendor. With Zoho, data remains in Zoho's multi-tenant cloud, accessible via APIs and export tools but never self-hosted."}},
    {"@type": "Question", "name": "Can a custom CRM integrate with WhatsApp, Tally, and Razorpay?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — that integration is the core value. SAGEDO builds ship with WhatsApp Business API lead capture and routing, GST-aware Tally handoff, and Razorpay/UPI payment capture as core scope rather than paid add-on modules, which is where per-seat SaaS bills typically expand."}}
  ]
}
</script>`,
    content: `<article>
<h1>Custom CRM vs. Zoho: The Zero-Per-Seat Decision for Indian MSMEs</h1>
<p>By Mukul Dhiman | September 10, 2026 | 10 min read | SAGEDO — SCO-38, Mohali City Centre, serving Chandigarh, Panchkula, and all India.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>At 100 users, Zoho CRM costs ₹12 lakh a year — ₹45 lakh over five years. A SAGEDO custom CRM is ₹2.5 lakh one-time plus ₹25,000/month, or ₹17.5 lakh over five years, with zero per-seat cost. Custom wins after crossover.</p>
<h2>Why per-seat pricing is the wrong unit for a growing business</h2>
<p>Zoho CRM's India list price is roughly ₹1,000/user/month (mid-plan, annual billing, before GST). At 25 users that is ₹3,00,000/year; at 50 users ₹6,00,000/year; at 100 users ₹12,00,000/year. The licence compounds with every headcount you add — and you own nothing at the end.</p>
<h2>Zoho vs SAGEDO: 5-year TCO (25 users scaling to 100)</h2>
<table>
<tr><th>Line item</th><th>Zoho (per-seat SaaS)</th><th>SAGEDO custom CRM (Sovereign Revenue Engine)</th></tr>
<tr><td>Build / setup (Year 0)</td><td>₹1,50,000 partner setup + migration</td><td>₹2,50,000 one-time — 28-day build, unlimited seats</td></tr>
<tr><td>Years 1–2 (25 users)</td><td>₹3,00,000/year licences</td><td>₹3,00,000/year flat AMC</td></tr>
<tr><td>Years 3–5 (100 users)</td><td>₹12,00,000/year licences</td><td>₹3,00,000/year flat AMC</td></tr>
<tr><td><strong>5-year total</strong></td><td><strong>₹43,50,000</strong></td><td><strong>₹17,50,000 (≈60% cheaper)</strong></td></tr>
<tr><td>Cost of the 100th seat</td><td>₹12,000/year, forever</td><td>₹0</td></tr>
<tr><td>Data ownership</td><td>Vendor-hosted, API export only</td><td>Own PostgreSQL + full source code</td></tr>
<tr><td>WhatsApp / Tally / Razorpay</td><td>Paid add-on modules + glue</td><td>Built into the core build</td></tr>
</table>
<h2>The honest crossover point</h2>
<p>Below ~8 users, Zoho is cheaper — stay on it. For a business scaling from 25 to 100 users, cumulative licence spend passes the one-time build cost around year 2–3. After the crossover the custom CRM is cheaper every single year, because 100 Zoho seats cost ₹12 lakh annually while 100 custom seats cost ₹0.</p>
<h2>What a SAGEDO Sovereign Revenue Engine build includes (28-day delivery)</h2>
<p>Custom CRM with unlimited seats and role-based access control; WhatsApp Business API lead capture with routing under 60-second speed-to-lead; GST-aware Tally handoff; Razorpay/UPI payment capture; revenue dashboards with no per-report charges; full source-code and database handover. One-time ₹1,50,000–₹2,50,000 by scope, then a flat ₹25,000/month AMC covering hosting, SSL, security patching, backups, and support. For comparison, metro system-integration agencies typically quote ₹8–15 lakh for equivalent scope with 4–6 month timelines.</p>
<h2>FAQ — Custom CRM vs Zoho for Indian MSMEs</h2>
<p><strong>How much does custom CRM development cost in Chandigarh and Mohali?</strong> ₹1,50,000–₹2,50,000 one-time from SAGEDO (28 days, source code included); ₹8–15 lakh at metro agencies; the Zoho alternative is roughly ₹12,000/seat/year, ongoing.</p>
<p><strong>Is Zoho CRM cheaper than a custom-built CRM?</strong> Yes below roughly 8–25 users. Above the crossover (year 2–3 for a 25→100 user trajectory), the custom CRM is cheaper every year — ₹3.6 lakh/year all-in vs ₹12 lakh/year at 100 seats.</p>
<p><strong>What does zero per seat mean?</strong> No per-user licence at all; the only recurring cost is the flat ₹25,000/month AMC, which does not scale with headcount.</p>
<p><strong>How long does a SAGEDO custom CRM take?</strong> 28 calendar days: discovery (days 1–3), build sprint (days 4–21), handover with training and SLA (days 22–28).</p>
<p><strong>Do we own our data and code?</strong> Yes — PostgreSQL database and full source code are handed over; Zoho data stays in Zoho's multi-tenant cloud.</p>
<p><strong>Can it integrate WhatsApp, Tally, and Razorpay?</strong> Yes — as core scope, not paid add-ons.</p>
    <p>Request the free 72-hour Revenue-Leak Audit at sagedo.in/free-audit or WhatsApp +91-6284925684. Pricing figures are face-value estimates as of September 2026; verify vendor sheets before signing.</p>
</article>`,
  },

  // ── AEO / GEO PILLAR PAGES (September 2026) ────────────────────────
  {
    path: '/ai-automation-agency-india',
    title: 'AI Automation Agency in India | Custom AI Agents & Workflows — SAGEDO',
    description: "India's premier AI automation agency. Autonomous AI agents, WhatsApp sales bots, CRM integrations, and workflow automation in 14-28 days. Zero per-seat fees.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "What does an AI automation agency in India do?", "acceptedAnswer": {"@type": "Answer", "text": "An AI automation agency audits repetitive operational bottlenecks and develops custom AI systems—like autonomous lead qualification bots, document extractors, and CRM sync engines—that reduce manual work by 70–80%."}},
    {"@type": "Question", "name": "How much does custom AI automation cost in India?", "acceptedAnswer": {"@type": "Answer", "text": "At SAGEDO, standalone automation modules start at ₹15,000–₹45,000, while complete end-to-end operational automation suites (Sovereign Revenue Engine™) range from ₹1,50,000 to ₹2,50,000 with source code handover."}},
    {"@type": "Question", "name": "Will the AI hallucinate or give wrong pricing to my clients?", "acceptedAnswer": {"@type": "Answer", "text": "No. SAGEDO implements deterministic guardrails, structured JSON schema validations, and human-in-the-loop review layers so the AI never quotes unauthorized discounts or fabricated terms."}},
    {"@type": "Question", "name": "How long does implementation take?", "acceptedAnswer": {"@type": "Answer", "text": "Our published delivery window is 14 to 28 calendar days depending on whether you need a single automated workflow or a full operational pipeline."}},
    {"@type": "Question", "name": "Can the AI integrate with our existing ERP or Tally?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. We build bi-directional connectors for Tally Prime, custom SQL databases, Google Sheets, Razorpay, and proprietary legacy systems."}}
  ]
}
</script>`,
    content: `<article>
<h1>AI Automation Agency in India: Autonomous Systems Built for High-Growth MSMEs</h1>
<p>By Mukul Dhiman | September 2026 | 8 min read | SAGEDO — SCO-38, Mohali City Centre, serving Chandigarh, Delhi NCR, Mumbai, Bangalore, and all India.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Indian businesses waste 15–25 hours weekly per employee on manual data entry and follow-ups. SAGEDO builds custom AI agents, WhatsApp bots, and autonomous pipeline workflows in 14–28 days with zero recurring per-user software taxes.</p>
<h2>Why Indian Companies Are Replacing Fragile Zapier Glue With Sovereign AI</h2>
<p>Most Indian enterprises attempting AI automation end up with a brittle maze of no-code tools that break whenever an unformatted message arrives. SAGEDO engineers sovereign, self-hosted AI automation engines with PostgreSQL and human-in-the-loop review guards.</p>
<h2>Zapier / No-Code Tools vs SAGEDO Sovereign Automation</h2>
<table>
<tr><th>Feature</th><th>DIY / No-Code Tools</th><th>SAGEDO Sovereign Automation</th></tr>
<tr><td>Delivery Timeline</td><td>Weeks of trial &amp; error</td><td>14–28 Days Full Handover</td></tr>
<tr><td>Recurring Task Taxes</td><td>₹15,000–₹60,000/mo</td><td>₹0 Per-Task Software Tax</td></tr>
<tr><td>Complex Logic &amp; OCR</td><td>Fails on unstructured PDFs</td><td>Custom Fine-Tuned AI + Human QA</td></tr>
<tr><td>WhatsApp Cloud API</td><td>Third-party markup per msg</td><td>Direct Meta Cloud API Integration</td></tr>
<tr><td>Data Sovereignty</td><td>Overseas multi-tenant cloud</td><td>100% Owned Database &amp; VPS</td></tr>
</table>
<h2>FAQ — AI Automation Agency in India</h2>
<p><strong>What does an AI automation agency in India do?</strong> Audits operational bottlenecks and develops custom AI systems that reduce manual work by 70–80%.</p>
<p><strong>How much does custom AI automation cost in India?</strong> ₹15,000–₹45,000 for standalone modules; ₹1,50,000–₹2,50,000 for complete end-to-end suites.</p>
<p><strong>Will the AI hallucinate?</strong> No. Deterministic schema validation and human review prevent hallucinations.</p>
<p><strong>How long does implementation take?</strong> 14 to 28 calendar days guaranteed.</p>
<p><strong>Can the AI integrate with ERP or Tally?</strong> Yes, native bi-directional sync included.</p>
<p>Claim your free 72-hour Revenue Leak Audit at sagedo.in/free-audit or WhatsApp +91-6284925684.</p>
</article>`
  },

  {
    path: '/b2b-lead-generation-systems',
    title: 'B2B Lead Generation Systems India | Automated Inbound & CRM — SAGEDO',
    description: "Modern B2B lead generation systems for Indian founders. Combine sub-second web speed, WhatsApp speed-to-lead, and automated CRM tracking to 3x your deal pipeline.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Why are traditional lead generation agencies failing in B2B?", "acceptedAnswer": {"@type": "Answer", "text": "They focus on raw impression volume rather than conversion mechanics. B2B buyers require instant validation, clear pricing transparency, and immediate WhatsApp communication."}},
    {"@type": "Question", "name": "How quickly can a custom B2B lead system be deployed?", "acceptedAnswer": {"@type": "Answer", "text": "SAGEDO delivers complete inbound systems—including landing pages, interactive calculators, and WhatsApp CRM pipelines—in 14 to 28 calendar days."}},
    {"@type": "Question", "name": "Do you manage our ad spend or just build the system?", "acceptedAnswer": {"@type": "Answer", "text": "We build the foundational conversion infrastructure first, and offer optional recurring Google & Meta B2B ad management retainers starting at ₹25,000/month."}},
    {"@type": "Question", "name": "Can the system filter out spam leads?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. We integrate phone number validation, corporate email verification, and qualification questions that filter low-intent inquiries before they hit your sales team."}},
    {"@type": "Question", "name": "What ROI can we expect?", "acceptedAnswer": {"@type": "Answer", "text": "By cutting lead response time from 4 hours to 45 seconds, our clients typically observe a 40% to 150% increase in qualified sales conversations within 60 days of launch."}}
  ]
}
</script>`,
    content: `<article>
<h1>B2B Lead Generation Systems: Engineering Predictable Revenue Without Agency Retainers</h1>
<p>By Mukul Dhiman | September 2026 | 9 min read | SAGEDO — SCO-38, Mohali City Centre, serving businesses across India.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Cold email spray-and-pray is dead. Modern B2B lead generation in India requires high-intent programmatic landing pages, sub-60-second WhatsApp response mechanics, and zero-leakage CRM routing that turns anonymous traffic into signed purchase orders.</p>
<h2>The Fatal Flaw in Traditional Indian B2B Lead Gen</h2>
<p>Most B2B companies in India pay agencies ₹50,000 to ₹1,50,000 monthly retainers for generic ads with slow WordPress pages. Leads wait 24 to 48 hours for a callback, by which time intent has evaporated. SAGEDO deploys sub-1.2s LCP React storefronts with instant WhatsApp webhooks.</p>
<h2>Traditional Lead Agency vs SAGEDO Sovereign Lead System</h2>
<table>
<tr><th>Dimension</th><th>Traditional Lead Agency</th><th>SAGEDO Sovereign Lead System</th></tr>
<tr><td>Speed to Lead</td><td>4 to 24 Hours (Email / Manual call)</td><td>Under 45 Seconds via WhatsApp API</td></tr>
<tr><td>Asset Ownership</td><td>Rented landing pages &amp; locked accounts</td><td>100% Owned Source Code &amp; Assets</td></tr>
<tr><td>Pricing Model</td><td>Monthly retainer forever (₹60k–1.5L/mo)</td><td>One-Time Build + Optional Flat AMC</td></tr>
<tr><td>Conversion Infrastructure</td><td>Generic web form with high drop-off</td><td>Interactive Calculators + WhatsApp Webhook</td></tr>
<tr><td>Lead Qualification</td><td>Junk phone numbers &amp; tire-kickers</td><td>Verified Phone OTP + Pre-Screening</td></tr>
</table>
<h2>FAQ — B2B Lead Generation Systems</h2>
<p><strong>Why are traditional agencies failing?</strong> They prioritize vanity clicks over speed-to-lead and conversion mechanics.</p>
<p><strong>How fast can it launch?</strong> 14 to 28 calendar days for full deployment.</p>
<p><strong>Can we filter spam leads?</strong> Yes, verified phone and company email validation are built-in.</p>
<p>Request your free 72-hour Revenue Leak Audit at sagedo.in/free-audit or WhatsApp +91-6284925684.</p>
</article>`
  },

  {
    path: '/custom-crm-development-chandigarh',
    title: 'Custom CRM Development Chandigarh & Mohali | Zero Per-Seat — SAGEDO',
    description: "Leading custom CRM development in Chandigarh & Mohali. Build a zero-per-seat CRM with WhatsApp lead routing, Tally Prime sync, and 28-day delivery. From ₹1,50,000.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Where is SAGEDO located in Chandigarh/Mohali?", "acceptedAnswer": {"@type": "Answer", "text": "Our engineering headquarters is located at SCO-38, Mohali City Centre, Aerocity, serving clients across Chandigarh, Mohali, Panchkula, and Zirakpur."}},
    {"@type": "Question", "name": "How much does custom CRM development cost in Chandigarh?", "acceptedAnswer": {"@type": "Answer", "text": "A production custom CRM with unlimited seats, WhatsApp routing, and Tally integration costs ₹1,50,000 to ₹2,50,000 one-time at SAGEDO, compared to ₹8–15 Lakhs quoted by metro agencies."}},
    {"@type": "Question", "name": "Is custom CRM really cheaper than Zoho for small teams?", "acceptedAnswer": {"@type": "Answer", "text": "For teams under 8 users, Zoho is cost-effective. However, once your team reaches 15–25 users, a custom CRM crosses over to become dramatically cheaper, saving up to ₹25+ Lakhs over 5 years."}},
    {"@type": "Question", "name": "Can our staff be trained on the custom system easily?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Days 22–28 of our delivery sprint include comprehensive staff training and clean, intuitive interfaces that telecallers master in less than 30 minutes."}},
    {"@type": "Question", "name": "What happens if we need changes after launch?", "acceptedAnswer": {"@type": "Answer", "text": "We offer a flat ₹25,000/month AMC that covers hosting, security patches, automated backups, and ongoing feature updates without headcount penalties."}}
  ]
}
</script>`,
    content: `<article>
<h1>Custom CRM Development in Chandigarh: Zero-Per-Seat Software for Tricity Businesses</h1>
<p>By Mukul Dhiman | September 2026 | 9 min read | SAGEDO — SCO-38, Mohali City Centre, serving Chandigarh Sector 17/34/IT Park, Panchkula, and Zirakpur.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Zoho and Salesforce cost ₹12 Lakhs/year at 100 seats. SAGEDO builds custom, unlimited-seat CRMs right here in Chandigarh &amp; Mohali for ₹1,50,000–₹2,50,000 one-time with zero per-user licensing fees and native Tally + WhatsApp integration in 28 days.</p>
<h2>Why Tricity Enterprises Are Ditching Generic SaaS Platforms</h2>
<p>Chandigarh, Mohali, and Panchkula house over 5,000 thriving manufacturing, pharma, and IT businesses. Per-seat SaaS software compounds exponentially and fails to integrate natively with Tally Prime or GST workflows without expensive add-ons.</p>
<h2>Zoho CRM vs SAGEDO Sovereign CRM (Tricity)</h2>
<table>
<tr><th>Feature</th><th>Zoho CRM (50 Seats)</th><th>SAGEDO Sovereign CRM</th></tr>
<tr><td>5-Year Software Cost</td><td>₹25,00,000+ compounding per seat</td><td>₹2,50,000 one-time + flat AMC (≈60% savings)</td></tr>
<tr><td>Per-User License Fee</td><td>₹800–₹3,000/seat/month</td><td>₹0 / User (Unlimited Team Seats)</td></tr>
<tr><td>Tally Prime Integration</td><td>Paid third-party connector ($50/mo)</td><td>Native Bi-directional Ledger Sync</td></tr>
<tr><td>Delivery SLA</td><td>3–6 Months customization delay</td><td>28 Calendar Days Handover Guarantee</td></tr>
<tr><td>Local Support</td><td>Global ticketing queue</td><td>In-person Tricity founder access &amp; training</td></tr>
</table>
<h2>FAQ — Custom CRM Development Chandigarh</h2>
<p><strong>Where is SAGEDO located?</strong> SCO-38, Mohali City Centre, Aerocity, serving Chandigarh, Mohali, Panchkula, and Zirakpur.</p>
<p><strong>How much does it cost?</strong> ₹1,50,000 to ₹2,50,000 one-time (28-day SLA, full source code included).</p>
<p><strong>Is it cheaper than Zoho?</strong> Yes, once teams grow beyond 15–25 users, saving up to ₹25+ Lakhs over 5 years.</p>
<p>Visit us at SCO-38 Mohali City Centre or WhatsApp +91-6284925684.</p>
</article>`
  },

  {
    path: '/custom-crm-development-ludhiana',
    title: 'Custom CRM Development in Ludhiana | Industrial & Manufacturing — SAGEDO',
    description: "Industrial-grade custom CRM development for Ludhiana manufacturers, textile mills, and exporters. Unlimited seats, Tally Prime sync, 28-day delivery.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "How does SAGEDO support Ludhiana clients from Chandigarh/Mohali?", "acceptedAnswer": {"@type": "Answer", "text": "Ludhiana is just 90 minutes from our Mohali headquarters. We conduct discovery calls, kick-offs, and final staff training sessions directly at your factory or office."}},
    {"@type": "Question", "name": "Can the CRM integrate with our Tally Prime setup at Focal Point?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. We build secure local bridges that sync transactions directly with your on-premise or cloud-hosted Tally Prime server."}},
    {"@type": "Question", "name": "What is the pricing for an industrial custom CRM?", "acceptedAnswer": {"@type": "Answer", "text": "Our Sovereign Revenue Engine™ packages range from ₹1,50,000 to ₹2,50,000 one-time, delivered in 28 days with zero recurring per-user fees."}},
    {"@type": "Question", "name": "Can our sales reps book orders from remote dealer visits?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The system includes a mobile-optimized PWA that allows sales reps to book orders offline and sync automatically upon reconnecting."}},
    {"@type": "Question", "name": "Do we own the software completely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. We transfer 100% source code ownership and full database rights upon project handover."}}
  ]
}
</script>`,
    content: `<article>
<h1>Custom CRM Development in Ludhiana: Industrial-Grade Software for Manufacturing Hubs</h1>
<p>By Mukul Dhiman | September 2026 | 8 min read | SAGEDO — Serving Focal Point, Industrial Area A/B, Miller Ganj, and Punjab exporters.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Ludhiana's bicycle, auto-part, knitwear, and steel manufacturers require specialized quotation tracking, raw material rate indexing, and Tally ledger handoffs that off-the-shelf SaaS cannot handle. SAGEDO builds custom, zero-per-seat CRMs in 28 days from ₹1,50,000.</p>
<h2>Why Generic Cloud CRMs Break in Ludhiana Manufacturing Plants</h2>
<p>Ludhiana manufacturers deal with multi-tier dealer pricing, batch numbers, fluctuating raw material costs, and credit hold rules. Standard SaaS tools like HubSpot or Zoho require dozens of expensive workarounds. SAGEDO builds tailored manufacturing engines with automated dealer credit holds and Tally sync.</p>
<h2>Legacy Tally-Only vs SAGEDO Industrial CRM</h2>
<table>
<tr><th>Operational Need</th><th>Legacy Desktop / Tally Alone</th><th>SAGEDO Industrial CRM</th></tr>
<tr><td>Field Sales Visibility</td><td>Paper order sheets &amp; late WhatsApp calls</td><td>Real-Time Mobile Order Booking with Dealer Limits</td></tr>
<tr><td>Quotation Generation</td><td>Manual Excel sheets prone to rate errors</td><td>Automated Cost-Index Quotation Builder</td></tr>
<tr><td>Dealer Credit Control</td><td>Manual check in Tally by accountant</td><td>Automated Dispatch Hold on Overdue Accounts</td></tr>
<tr><td>Multi-User Licensing</td><td>Expensive per-seat Tally/SaaS add-on fees</td><td>Unlimited Factory, Office &amp; Field Users</td></tr>
</table>
<h2>FAQ — Custom CRM Development Ludhiana</h2>
<p><strong>Can it integrate with our Tally Prime at Focal Point?</strong> Yes, automated bi-directional ledger and dispatch sync.</p>
<p><strong>What is the delivery timeline?</strong> 28 calendar days guaranteed.</p>
<p><strong>Do we own the code?</strong> Yes, 100% source code and database ownership transferred.</p>
<p>Contact Mukul Dhiman via WhatsApp at +91-6284925684 or visit sagedo.in/free-audit.</p>
</article>`
  },

  {
    path: '/custom-crm-development-panchkula',
    title: 'Custom CRM Development in Panchkula | Pharma & Healthcare — SAGEDO',
    description: "Custom CRM software for Panchkula pharmaceutical companies, diagnostics, and service businesses. Unlimited seats, compliance-ready, 28-day delivery.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Can SAGEDO handle pharmaceutical compliance requirements?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. We structure audit logs, role-based permissions, and data integrity safeguards to ensure compliant record-keeping for healthcare and pharma distributors."}},
    {"@type": "Question", "name": "How close is your team to Panchkula?", "acceptedAnswer": {"@type": "Answer", "text": "We are located across the border at Mohali City Centre, less than 20 minutes from Panchkula Industrial Area and MDC."}},
    {"@type": "Question", "name": "How much does a Panchkula custom CRM cost?", "acceptedAnswer": {"@type": "Answer", "text": "Our complete Sovereign Revenue Engine™ builds range between ₹1,50,000 and ₹2,50,000 one-time, with zero recurring per-user license fees."}},
    {"@type": "Question", "name": "Can our Medical Representatives use this on Android smartphones?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The system is 100% mobile-responsive and functions as an installable Progressive Web App (PWA) on any Android or iOS device."}},
    {"@type": "Question", "name": "Do we own the data?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. All databases and source code are deployed directly to your private server with zero vendor lock-in."}}
  ]
}
</script>`,
    content: `<article>
<h1>Custom CRM Development in Panchkula: Zero-License Software for Pharma &amp; Services</h1>
<p>By Mukul Dhiman | September 2026 | 8 min read | SAGEDO — Serving Industrial Area Phase 1 &amp; 2, MDC Sector 5, and Panchkula.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Panchkula's pharmaceutical distributors, diagnostic labs, and professional consultancies lose margin paying for multi-seat CRM subscriptions. SAGEDO builds custom, zero-per-seat CRMs with doctor/dealer tracking and GST invoicing in 28 days from ₹1,50,000.</p>
<h2>Why Panchkula Pharma Companies Need Custom Systems</h2>
<p>Panchkula pharma enterprises manage PCD franchise networks, MR field reporting, physician sample allocations, and chemist order flows. Standard CRM platforms charge ₹1,500/seat/month and lack pharmaceutical territory safeguards. SAGEDO builds compliant, unlimited-seat platforms.</p>
<h2>Generic Commercial SaaS vs SAGEDO Tailored Panchkula CRM</h2>
<table>
<tr><th>Feature</th><th>Off-The-Shelf SaaS</th><th>SAGEDO Custom CRM</th></tr>
<tr><td>Pharma / PCD Workflows</td><td>Not supported without complex code</td><td>Pre-built Territory, Sample &amp; Franchise Modules</td></tr>
<tr><td>License Cost for 30 MRs</td><td>₹30,000–₹60,000 every single month</td><td>₹0 (Unlimited Field Medical Reps)</td></tr>
<tr><td>WhatsApp Order Capture</td><td>Requires separate subscriptions</td><td>Native WhatsApp Cloud API Integrated</td></tr>
<tr><td>Deployment Time</td><td>2 to 4 months setup</td><td>28-Day Guaranteed Delivery SLA</td></tr>
</table>
<h2>FAQ — Custom CRM Development Panchkula</h2>
<p><strong>Can Medical Reps use this on mobile?</strong> Yes, lightweight mobile PWA works on any Android or iPhone.</p>
<p><strong>Are doctor visit records secure?</strong> Yes, sovereign database hosted on private VPS.</p>
<p><strong>How much does it cost?</strong> ₹1,50,000 to ₹2,50,000 one-time build.</p>
<p>Connect on WhatsApp at +91-6284925684 or request an audit at sagedo.in/free-audit.</p>
</article>`
  },

  {
    path: '/ai-automation-agency-zirakpur',
    title: 'AI Automation Agency in Zirakpur | Real Estate & Retail Bots — SAGEDO',
    description: "Zirakpur's top AI automation agency. Sub-60s WhatsApp bots, real estate lead capture, and CRM automation for high-velocity local businesses.",
    jsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Why is AI automation critical for Zirakpur businesses?", "acceptedAnswer": {"@type": "Answer", "text": "Zirakpur is a high-velocity transit and residential market where customers demand immediate answers. AI automation ensures no inquiry is missed during evenings, weekends, or holidays."}},
    {"@type": "Question", "name": "How much does real estate AI automation cost?", "acceptedAnswer": {"@type": "Answer", "text": "Standalone WhatsApp bots and lead-routing setups start from ₹15,000 to ₹45,000, while complete end-to-end sales engines are ₹1,50,000 one-time."}},
    {"@type": "Question", "name": "Can the bot speak both Hindi and English?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our AI models understand conversational Hinglish, formal Hindi, and English seamlessly, catering to all buyer demographics in Northern India."}},
    {"@type": "Question", "name": "Can we route leads to specific sales executives on PR7 or VIP Road?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The system automatically rotates leads or assigns them based on project type, unit size, or agent availability."}},
    {"@type": "Question", "name": "How fast can this be live for our current campaign?", "acceptedAnswer": {"@type": "Answer", "text": "We deploy and test production WhatsApp AI automation engines in 7 to 14 business days."}}
  ]
}
</script>`,
    content: `<article>
<h1>AI Automation Agency in Zirakpur: 24/7 WhatsApp Lead Engines for High-Velocity Hubs</h1>
<p>By Mukul Dhiman | September 2026 | 7 min read | SAGEDO — Serving VIP Road, PR7 Airport Road, and Zirakpur businesses.</p>
<h2>BLUF — the answer in 40 words</h2>
<p>Zirakpur real estate developers, hospitality venues, and retail businesses lose up to 45% of potential buyers who inquire after business hours. SAGEDO builds 24/7 autonomous WhatsApp sales bots and lead routers that engage prospects under 60 seconds from ₹45,000.</p>
<h2>The 60-Second Rule in Zirakpur's Hyper-Competitive Market</h2>
<p>When buyers click ads for properties on PR7 or VIP Road, they simultaneously click 3 competitor projects. Inquiries that wait 3 hours for a sales callback lose to whoever responds first. SAGEDO deploys conversational AI bots that greet buyers in under 45 seconds with floor plans and booking invites.</p>
<h2>Human Telecallers Alone vs SAGEDO AI Sales Engine</h2>
<table>
<tr><th>Metric</th><th>Traditional Telecalling Team</th><th>SAGEDO AI Sales Engine</th></tr>
<tr><td>Night &amp; Weekend Inquiries</td><td>Unanswered until Monday morning</td><td>Instant Conversational Reply in &lt;45s</td></tr>
<tr><td>Monthly Payroll Expense</td><td>₹45,000–₹1,00,000/mo in staff</td><td>One-Time Setup with Zero Per-Lead Fees</td></tr>
<tr><td>Catalog / Brochure Delivery</td><td>Manual typing or delayed email</td><td>Instant Automated PDF &amp; Video Delivery</td></tr>
<tr><td>Site Visit Scheduling</td><td>Back-and-forth phone tagging</td><td>Direct Calendar &amp; Google Maps Invite</td></tr>
</table>
<h2>FAQ — AI Automation Agency Zirakpur</h2>
<p><strong>Can the bot speak Hindi/Hinglish?</strong> Yes, fluent multilingual understanding.</p>
<p><strong>How fast can it launch?</strong> 7 to 14 business days for active ad campaigns.</p>
<p><strong>What is the cost?</strong> Modular setups from ₹15,000 to ₹45,000; complete sales engines ₹1,50,000.</p>
<p>WhatsApp Mukul Dhiman directly at +91-6284925684 or visit sagedo.in/free-audit.</p>
</article>`
  },

  // ── PUBLIC UTILITY ROUTES (pre-render shells for crawlers) ─────────

  {
    path: '/orders',
    title: 'Checkout | SAGEDO — Secure Payment',
    description: 'Complete your SAGEDO order securely. Fast checkout for AI business services, automation packages, and digital solutions.',
    content: `<h1>Checkout | SAGEDO</h1><p>Complete your order for AI business services, automation packages, and digital solutions.</p><p>Secure payment processing available.</p>`,
  },
  {
    path: '/login',
    title: 'Login | SAGEDO',
    description: 'Log in to your SAGEDO account to access your projects and orders.',
    content: `<h1>Login | SAGEDO</h1><p>Log in to access your account, projects, and order history.</p>`,
  },
  {
    path: '/forgot-password',
    title: 'Forgot Password | SAGEDO',
    description: 'Enter your email to reset your password and regain access to your account.',
    content: `<h1>Forgot Password | SAGEDO</h1><p>Enter your email address to receive a password reset link.</p>`,
  },
  {
    path: '/reset-password',
    title: 'Reset Password | SAGEDO',
    description: 'Set a new password for your SAGEDO account.',
    content: `<h1>Reset Password | SAGEDO</h1><p>Set a new password for your SAGEDO account.</p>`,
  },
  {
    path: '/dashboard',
    title: 'Dashboard | SAGEDO',
    description: 'Your SAGEDO dashboard — view projects, orders, and analytics.',
    content: `<h1>Dashboard | SAGEDO</h1><p>View your projects, orders, and analytics dashboard.</p>`,
  },
  {
    path: '/verify-email',
    title: 'Verify Email | SAGEDO',
    description: 'Verify your email address to complete your SAGEDO account setup.',
    content: `<h1>Verify Email | SAGEDO</h1><p>Click the verification link sent to your email to complete your account setup.</p>`,
  },
  {
    path: '/settings',
    title: 'Settings | SAGEDO',
    description: 'Update your account settings and profile information.',
    content: `<h1>Settings | SAGEDO</h1><p>Update your account settings and profile information.</p>`,
  },
  {
    path: '/order-success',
    title: 'Order Successful | SAGEDO',
    description: 'Your order has been completed successfully. Thank you for your purchase!',
    content: `<h1>Order Successful | SAGEDO</h1><p>Thank you for your purchase! Your order has been completed successfully.</p>`,
  },
  {
    path: '/pay',
    title: 'Payment | SAGEDO',
    description: 'Payment page for SAGEDO services.',
    content: `<h1>Payment | SAGEDO</h1><p>Complete payment for SAGEDO services.</p>`,
  },
  {
    path: '/shipping-policy',
    title: 'Shipping Policy | SAGEDO',
    description: 'SAGEDO shipping policy and delivery information.',
    content: `<h1>Shipping Policy | SAGEDO</h1><p>SAGEDO ships digital deliverables (source code, credentials, design assets) electronically. Physical goods, where applicable, are dispatched within 3-5 business days via standard courier with tracking. For delivery questions contact hello@sagedo.in or WhatsApp +91-6284925684.</p>`,
  },
  {
    path: '/locations',
    title: 'Regional Service Locations & Hubs | SAGEDO',
    description: "Explore SAGE DO's regional hubs, local SEO landing pages, and specialized AI automation infrastructure across Bangalore, Chandigarh, Delhi NCR, Mumbai, and nationwide.",
    content: `<h1>Regional Service Locations &amp; Hubs | SAGEDO</h1><p>Headquartered at Mohali City Centre, SAGE DO deploys sovereign revenue engines, AI agent workflows, and digital infrastructure for businesses across every major Indian metro.</p><h2>Major Metro Hubs</h2><ul><li><a href="/digital-marketing-bangalore.html">Bangalore</a></li><li><a href="/digital-marketing-chandigarh.html">Chandigarh Tri-City</a></li><li><a href="/digital-marketing-delhi.html">Delhi NCR</a></li><li><a href="/digital-marketing-hyderabad.html">Hyderabad</a></li><li><a href="/digital-marketing-mumbai.html">Mumbai</a></li><li><a href="/digital-marketing-pune.html">Pune</a></li></ul><h2>Regional Tri-City &amp; Industrial Pillars</h2><ul><li><a href="/custom-crm-development-chandigarh">Custom CRM Development Chandigarh</a></li><li><a href="/custom-crm-development-ludhiana">Custom CRM Development Ludhiana</a></li><li><a href="/custom-crm-development-panchkula">Custom CRM Development Panchkula</a></li><li><a href="/ai-automation-agency-zirakpur">AI Automation Agency Zirakpur</a></li></ul><h2>Nationwide Digital Solutions</h2><ul><li><a href="/website-development-india.html">Website Development India</a></li><li><a href="/app-development-india.html">Mobile App Development India</a></li><li><a href="/google-business-profile-setup.html">Google Business Profile Setup</a></li><li><a href="/new-business-setup-india.html">New Business Setup India</a></li><li><a href="/ai-automation-agency-india">AI Automation Agency India</a></li><li><a href="/b2b-lead-generation-systems">B2B Lead Generation Systems</a></li></ul>`,
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LOGIC
// ═══════════════════════════════════════════════════════════════════════════

function prerender() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  let successCount = 0;

  for (const route of routes) {
    // Build target path
    const routeDir = path.join(DIST_DIR, route.path === '/' ? '' : route.path);
    const targetFile = route.path === '/'
      ? path.join(DIST_DIR, 'index.html')
      : path.join(routeDir, 'index.html');

    // Create directories
    if (route.path !== '/') {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let html = indexHtml;

    // 1. Replace <title>
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(route.title)}</title>`
    );

    // 2. Replace first meta description
    html = html.replace(
      /<meta name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 3. Replace canonical
    const canonicalUrl = `https://sagedo.in${route.path === '/' ? '' : route.path}`;
    html = html.replace(
      /<link rel="canonical".*?\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 4. Replace first OG title and description
    html = html.replace(
      /<meta property="og:title".*?\/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta property="og:url".*?\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // 5. Inject Article JSON-LD schema for blog posts
    //    This gives Google rich snippet data (author, date, reading time)
    if (route.path.startsWith('/blog/') && route.path !== '/blog') {
      const articleTitle = route.title.split(' — ')[0] || route.title;
      const articleSchemaObj = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleTitle,
        "description": route.description,
        "author": {
          "@type": "Person",
          "name": "Mukul Dhiman",
          "url": "https://sagedo.in/about-founder"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SAGE DO",
          "url": "https://sagedo.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sagedo.in/sagedo_logo_pro_clean.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://sagedo.in${route.path}`
        },
        "url": `https://sagedo.in${route.path}`,
        "image": "https://sagedo.in/sagedo_logo_pro_clean.png",
        "inLanguage": "en"
      };
      const articleSchema = `<script type="application/ld+json">\n${JSON.stringify(articleSchemaObj, null, 2)}\n</script>`;
      // Inject before </head>
      html = html.replace('</head>', `${articleSchema}\n</head>`);
    }

    // 5b. Inject optional route-specific JSON-LD (e.g., FAQPage on pillar posts)
    if (route.jsonLd) {
      html = html.replace('</head>', `${route.jsonLd}\n</head>`);
    }

    // 6. Replace the existing noscript block with route-specific content
    //    The noscript block is VISIBLE to crawlers that don't execute JS
    //    Real users with JS enabled see the React app instead
    const seoBlock = `<!-- Pre-rendered SEO content for: ${route.path} -->
    <noscript>
      <div style="max-width:800px;margin:40px auto;padding:20px;font-family:system-ui,sans-serif;color:#333;line-height:1.6">
        ${route.content}
      </div>
    </noscript>`;

    // Try to replace existing noscript block
    const noscriptRegex = /<noscript>[\s\S]*?<\/noscript>/;
    if (noscriptRegex.test(html)) {
      html = html.replace(noscriptRegex, seoBlock);
    } else {
      // Fallback: inject before </div></body> or </body>
      html = html.replace('</body>', `${seoBlock}\n</body>`);
    }

    // Write file
    fs.writeFileSync(targetFile, html, 'utf-8');
    successCount++;
    console.log(`  ✓ ${route.path}`);
  }
  console.log(`\n✅ Pre-rendered ${successCount}/${routes.length} routes in dist/`);
  console.log('   Each page now has unique title, meta, canonical, OG tags, and body content.');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

prerender();
