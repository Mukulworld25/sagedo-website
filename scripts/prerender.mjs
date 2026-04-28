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
        <li>Website Design &amp; Development — from ₹15,000</li>
        <li>SEO Setup &amp; Monthly Maintenance</li>
        <li>WhatsApp Sales Bot — from ₹4,999</li>
        <li>CRM &amp; Lead Automation</li>
        <li>Logo &amp; Brand Identity — from ₹1,999</li>
        <li>GST, MSME &amp; Trademark Registration</li>
        <li>Mobile App Development — ₹95,000</li>
        <li>Social Media Management — from ₹4,999/mo</li>
      </ul>
      <h2>Launch Packages</h2>
      <p><strong>Starter Launch — ₹15,000:</strong> AI Landing Page, Brand Identity, Domain Setup, SEO Basics. Delivered in 7 days.</p>
      <p><strong>Full Launch — ₹35,000:</strong> Full Website + Content, Social Media Kit, Analytics, CRM + WhatsApp Bot. Delivered in 10-12 days.</p>
      <p><strong>VIP Launch — ₹95,000:</strong> Web + Mobile App, Complete Branding, Admin Dashboard, 1-Month Support. Delivered in 15 days.</p>
      <h2>How It Works</h2>
      <ol>
        <li>Submit Your Problem — Describe your challenge in plain English or Hindi.</li>
        <li>AI Analysis — Our system instantly analyzes and finds the best solution.</li>
        <li>Receive Your Answer — Get a clear, actionable solution sent right back to you.</li>
      </ol>
      <h2>Meet the Founder — Mukul Dhiman</h2>
      <p>Ex-Aerospace engineer (Tata Lockheed Martin) turned AI builder. Mukul started SAGE DO because Indian businesses were getting ripped off by agencies charging ₹5 Lakhs for what AI can do in 48 hours. He personally oversees every project.</p>
      <h2>Testimonials</h2>
      <p>"Sagedo is an easy-to-use and efficient platform that helps simplify tasks and save time." — Priya Siingh, Verified Trustpilot Review</p>
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
    description: "SAGEDO offers 20+ business services for Indian SMBs — Website Design, SEO, WhatsApp Bot, CRM, GST Registration, Logo Design, Mobile App & more. Starting ₹499. Delivered in 24-48 hours.",
    content: `
      <h1>SAGEDO Services — Build Your Legacy</h1>
      <p>Precision-engineered services for founders, leaders, and visionaries who refuse to settle for average. Over 20 services across two tracks: LaunchPad (build from zero) and ScaleOps (operations that scale).</p>
      <h2>The Founder's Stack — Launch Packages</h2>
      <h3>Starter Launch — ₹15,000</h3>
      <p>Everything a new business needs to exist online: Logo + Brand Identity, 5-Page Website, Google Business Profile, GST Registration, Business Email. Delivered in 7 days.</p>
      <h3>Full Launch — ₹35,000 (Most Popular)</h3>
      <p>Complete execution: Everything in Starter + SEO Setup + 4 Blog Posts, WhatsApp Sales Bot, CRM + Lead Automation, 30 Days Social Content. Delivered in 10-12 days.</p>
      <h3>VIP Launch — ₹95,000</h3>
      <p>Enterprise infrastructure: Enterprise Web + Native App, Admin Dashboard, Dedicated Growth Engineer, Legal &amp; IP Contracts. Delivered in 15 days.</p>
      <h2>Smart Combos — Save More</h2>
      <ul>
        <li>Brand Starter Combo — Logo + Brand Colors + Business Email: ₹2,999 – ₹3,499</li>
        <li>Google Presence Combo — Website + SEO + Google Business Profile: ₹16,999 – ₹19,999</li>
        <li>Legal Foundation Combo — GST + MSME + Trademark Filing: ₹3,999 – ₹5,999</li>
        <li>Growth Engine Combo — SEO + 4 Blog Posts + Social Media: ₹7,999 – ₹9,999/mo</li>
        <li>Sales Machine Combo — CRM + WhatsApp Bot + Lead Automation: ₹12,999 – ₹14,999</li>
      </ul>
      <h2>Individual Services (LaunchPad)</h2>
      <ul>
        <li>Website Design &amp; Development</li>
        <li>SEO Setup &amp; Optimization</li>
        <li>Logo &amp; Brand Identity Design</li>
        <li>Google Business Profile Setup</li>
        <li>WhatsApp Sales Bot</li>
        <li>CRM &amp; Lead Automation</li>
        <li>GST Registration</li>
        <li>MSME Registration</li>
        <li>Trademark Filing</li>
        <li>Business Email Setup</li>
        <li>Mobile App Development</li>
        <li>Social Media Content Creation</li>
      </ul>
      <h2>ScaleOps — Ongoing Operations</h2>
      <h3>Expert Guidance</h3>
      <ul>
        <li>First Chat FREE — 30 min (New signup offer)</li>
        <li>Chat Session — 30 min: ₹499</li>
        <li>Strategy Call — 30 min with Mukul: ₹999</li>
        <li>Monthly Retainer — 2 calls + unlimited chat: ₹2,999/mo</li>
      </ul>
      <h3>Maintenance Plans</h3>
      <ul>
        <li>SEO Maintenance — ₹2,999/mo: 1 blog post/mo + rank monitoring + competitor check</li>
        <li>Website Maintenance — ₹1,499/mo: Speed + security updates + bug fixes + uptime</li>
        <li>Social Media Management — ₹4,999/mo: 8 posts/month + engagement + analytics</li>
        <li>Full Stack Plan — ₹7,999/mo: Everything above + priority support + monthly strategy call</li>
      </ul>
      <p>Contact: WhatsApp +91 6284925684 | Email hello@sagedo.in</p>
    `,
  },

  // ── ABOUT ───────────────────────────────────────────────────────────
  {
    path: '/about',
    title: "About SAGEDO — India's First AI + Human Hybrid Execution Team",
    description: "Learn about SAGEDO, founded by Mukul Dhiman (ex-Tata Lockheed Martin). We combine AI speed with human precision to deliver 30+ digital services across India. Based in Chandigarh.",
    content: `
      <h1>About SAGE DO</h1>
      <p>SAGE DO is India's first AI + Human hybrid service platform. We combine the speed and scale of artificial intelligence with the precision and creativity of human experts to deliver professional-grade digital services — from websites and apps to content creation, marketing, and business automation.</p>
      <p>With 30+ services across Startup Launch, Marketing, Design, and Engineering categories, we serve visionary founders, high-growth startups, and elite enterprises. Every task is analyzed by AI, verified by humans, and delivered within 24-48 hours.</p>
      <h2>Founder — Mukul Dhiman</h2>
      <p>Ex-Aerospace engineer (Tata Lockheed Martin — C130J/F16 programs), Operations Manager (25-person teams, 40% efficiency improvement), Full-stack Developer (SaaS, mobile apps, AI automation), AI Engineer (Built 30+ AI-powered services from scratch).</p>
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
      <p>Individual services start from ₹199. Startup launch packages range from ₹15,000 (Starter) to ₹95,000 (VIP). We are 10x cheaper than traditional agencies.</p>
      <h2>How fast does SAGE DO deliver?</h2>
      <p>Most services are delivered within 24-48 hours. Starter Launch package in 7 days, Full Launch in 10-12 days.</p>
      <h2>Who founded SAGE DO?</h2>
      <p>Mukul Dhiman, ex-Tata Lockheed Martin aerospace engineer turned AI founder. He personally oversees every project.</p>
      <h2>Is SAGE DO available in my city?</h2>
      <p>Yes! SAGE DO serves all of India remotely. Based in Chandigarh, we work with clients across Delhi, Mumbai, Bangalore, Hyderabad, and all other cities via WhatsApp.</p>
      <h2>How much does an AI website cost in India?</h2>
      <p>At SAGE DO, a professional AI-powered website starts at ₹15,000 with our Starter Launch package — delivered in just 7 days. Traditional agencies charge ₹2-5 Lakhs.</p>
      <h2>What is the best budget CRM setup for Indian small businesses?</h2>
      <p>SAGE DO offers affordable CRM setup starting from ₹4,999. We configure HubSpot Free, Zoho, or custom solutions optimized for Indian SMBs with WhatsApp integration.</p>
      <h2>How much does a WhatsApp sales bot cost in India?</h2>
      <p>SAGE DO builds WhatsApp sales bots starting at ₹4,999. Setup takes 24-48 hours and includes integration with your existing business workflow.</p>
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
    title: "How Much Does a Website Cost in India in 2026? Complete Breakdown — SAGEDO",
    description: "Honest breakdown of website development costs in India 2026. Compare DIY (₹3K-8K), freelancers (₹10K-30K), agencies (₹50K-10L), and AI-hybrid teams (₹15K-35K).",
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
    title: "Mukul Dhiman — Founder of SAGEDO | Ex-Tata Lockheed Martin",
    description: "Meet Mukul Dhiman, founder of SAGEDO. Ex-Aerospace Engineer at Tata Lockheed Martin, Operations Manager, Full-stack Developer, AI Engineer.",
    content: `<h1>Mukul Dhiman — Founder &amp; CEO, SAGE DO</h1><p>Ex-Aerospace Engineer at Tata Lockheed Martin (C130J/F16 programs). Operations Manager who led 25-person teams. Full-stack developer who built 30+ AI-powered services. Founded SAGEDO to bring agency-quality execution to Indian businesses at startup-friendly prices.</p>`,
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
    content: `<h1>Book a Free Strategy Call with the Founder</h1><p>Talk directly to Mukul Dhiman — ex-Tata Lockheed Martin engineer turned AI builder. Get a brutally honest assessment of where your business stands digitally and exactly what to fix first.</p><h2>What You'll Get</h2><ul><li>5-Point Digital Health Check — Website, SEO, Social, Automation, Lead Capture scored honestly</li><li>Custom Execution Roadmap — Exactly what to build first, how long, and what it costs</li><li>Competitor Analysis — Quick scan of your top 3 competitors</li><li>No-BS Pricing — Transparent quote on the spot</li></ul><p>Book your slot now at sagedo.in/book-call or WhatsApp +91 6284925684</p>`,
  },

  // ── CAREERS ───────────────────────────────────────────────────────
  {
    path: '/careers',
    title: "Careers at SAGEDO — Join India's First AI + Human Execution Team",
    description: "Join SAGE DO and work at the intersection of AI and human execution. Open roles in engineering, design, SEO, sales, and AI prompt engineering. Remote-first, founder-led.",
    content: `<h1>Careers at SAGE DO — Build the Future of Execution</h1><p>SAGE DO isn't just another agency. We're building India's first AI + Human hybrid execution engine. If you want to ship real work for real businesses — not sit in meetings — this is your place.</p><h2>Open Positions</h2><ul><li>AI Prompt Engineer — Full-time / Remote</li><li>Full-Stack Developer — Full-time / Remote</li><li>Brand & Graphic Designer — Contract / Remote</li><li>SEO & Content Strategist — Full-time / Remote</li><li>Sales & Outreach Executive — Full-time / Chandigarh</li><li>Digital Marketing Intern — Internship / Remote</li></ul><h2>Why Join?</h2><ul><li>Founder-led — Work directly with Mukul, no middle management</li><li>Remote-first — Work from anywhere in India</li><li>Real impact — Every project ships, you see your work live within 48 hours</li></ul><p>Apply at sagedo.in/careers or WhatsApp +91 6284925684</p>`,
  },
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
      const articleSchema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${articleTitle.replace(/"/g, '\\"')}",
    "description": "${route.description.replace(/"/g, '\\"')}",
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
      "@id": "https://sagedo.in${route.path}"
    },
    "url": "https://sagedo.in${route.path}",
    "image": "https://sagedo.in/sagedo_logo_pro_clean.png",
    "inLanguage": "en"
  }
  </script>`;
      // Inject before </head>
      html = html.replace('</head>', `${articleSchema}\n</head>`);
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
