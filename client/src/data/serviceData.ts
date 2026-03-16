// serviceData.ts — SAGEDO Complete Services Data
// Updated: March 16, 2026 — LaunchPad / ScaleOps redesign

export interface Package {
  id: string;
  name: string;
  price: string;
  maintenance: string;
  tagline: string;
  killerLine: string;
  features: string[];
  highlight: boolean;
  badge?: string;
}

export interface Combo {
  id: string;
  name: string;
  services: string[];
  price: string;
  icon: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  maintenance: string;
  category: string;
  icon: string;
  isGoldenEligible: boolean;
  tag?: string;
}

export interface ConsultancyOption {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNumeric: number;
  badge?: string;
  description: string;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  coverage: string[];
  badge?: string;
}

export const packages: Package[] = [
  {
    id: "pkg-starter",
    name: "Starter Launch",
    price: "\u20B915,000",
    maintenance: "\u20B91,999/mo",
    tagline: "Everything to get you started",
    killerLine: "Stop being invisible. Start being found.",
    features: ["Professional Logo Design","Website Design & Development","SEO Setup","Google Business Profile","Business Email Setup","1 Month Free Support"],
    highlight: false,
  },
  {
    id: "pkg-full",
    name: "Full Launch",
    price: "\u20B935,000",
    maintenance: "\u20B93,999/mo",
    tagline: "Your complete digital presence",
    killerLine: "Your entire digital business \u2014 in 30 days.",
    features: ["Everything in Starter","WhatsApp Sales Bot","CRM Setup","Social Media Setup","3 Blog Posts","Analytics Dashboard","3 Months Free Support"],
    highlight: true,
    badge: "MOST POPULAR",
  },
  {
    id: "pkg-vip",
    name: "VIP Launch",
    price: "\u20B995,000",
    maintenance: "\u20B97,999/mo",
    tagline: "For businesses that refuse second place",
    killerLine: "Built for businesses that refuse second place.",
    features: ["Everything in Full Launch","Mobile App Development","AI Website Chatbot","Sales Automation","LinkedIn Personal Branding","Monthly Strategy Call","Priority Support 24/7","6 Months Free Maintenance"],
    highlight: false,
    badge: "PREMIUM",
  },
];

export const combos: Combo[] = [
  { id: "combo-brand", name: "Brand Starter", services: ["Logo Design","Brand Colors","Business Email"], price: "\u20B92,999 \u2013 \u20B93,499", icon: "\uD83C\uDFA8", description: "Launch your brand identity from day one" },
  { id: "combo-google", name: "Google Presence", services: ["Website","SEO Setup","Google Business Profile"], price: "\u20B916,999 \u2013 \u20B919,999", icon: "\uD83D\uDD0D", description: "Get found on Google \u2014 fast" },
  { id: "combo-legal", name: "Legal Foundation", services: ["GST Registration","MSME Registration","Trademark Filing"], price: "\u20B93,999 \u2013 \u20B95,999", icon: "\u2696\uFE0F", description: "Make your business 100% legal" },
  { id: "combo-growth", name: "Growth Engine", services: ["SEO","4 Blog Posts/mo","Social Media"], price: "\u20B97,999 \u2013 \u20B99,999/mo", icon: "\uD83D\uDCC8", description: "Content and SEO that compounds over time" },
  { id: "combo-sales", name: "Sales Machine", services: ["CRM Setup","WhatsApp Bot","Lead Automation"], price: "\u20B912,999 \u2013 \u20B914,999", icon: "\uD83E\uDD16", description: "Automate your sales pipeline end to end" },
];

export const launchpadServices: Service[] = [
  { id: "svc-logo", name: "Professional Logo Design", description: "Custom logo that makes your brand unforgettable. 3 concepts, unlimited revisions.", price: "\u20B91,999 \u2013 \u20B92,499", maintenance: "One-time", category: "Branding", icon: "\u270F\uFE0F", isGoldenEligible: false },
  { id: "svc-website", name: "Website Design & Development", description: "Fast, mobile-first website built to convert visitors into customers.", price: "\u20B912,999 \u2013 \u20B917,999", maintenance: "\u20B91,499/mo", category: "Web", icon: "\uD83D\uDCBB", isGoldenEligible: false },
  { id: "svc-seo", name: "SEO Setup", description: "Full on-page SEO, Google Search Console setup, and keyword targeting.", price: "\u20B93,999 \u2013 \u20B95,999", maintenance: "\u20B92,999/mo", category: "Marketing", icon: "\uD83D\uDD0D", isGoldenEligible: false },
  { id: "svc-whatsapp", name: "WhatsApp Sales Bot", description: "Automated WhatsApp bot that qualifies leads and books appointments 24/7.", price: "\u20B96,999 \u2013 \u20B99,999", maintenance: "\u20B9999/mo", category: "Automation", icon: "\uD83D\uDCAC", isGoldenEligible: false },
  { id: "svc-crm", name: "CRM Setup", description: "Never lose a lead again. Full CRM setup with pipeline and automation.", price: "\u20B97,999 \u2013 \u20B911,999", maintenance: "\u20B91,499/mo", category: "Operations", icon: "\uD83D\uDCCA", isGoldenEligible: false },
  { id: "svc-social", name: "Social Media Setup", description: "Professional profiles on all major platforms with branded content templates.", price: "\u20B91,999 \u2013 \u20B92,999", maintenance: "\u20B94,999/mo", category: "Marketing", icon: "\uD83D\uDCF1", isGoldenEligible: false },
  { id: "svc-gst", name: "GST Registration", description: "Complete GST registration handled for you \u2014 fully compliant.", price: "\u20B9799 \u2013 \u20B91,299", maintenance: "One-time", category: "Legal", icon: "\uD83D\uDCCB", isGoldenEligible: false },
  { id: "svc-msme", name: "MSME Registration", description: "Get your Udyam MSME certificate and unlock government benefits.", price: "\u20B9499 \u2013 \u20B9799", maintenance: "One-time", category: "Legal", icon: "\uD83C\uDFDB\uFE0F", isGoldenEligible: false },
  { id: "svc-trademark", name: "Trademark Filing", description: "Protect your brand name and logo legally with trademark registration.", price: "\u20B92,499 \u2013 \u20B93,999", maintenance: "One-time", category: "Legal", icon: "\u2122\uFE0F", isGoldenEligible: false },
  { id: "svc-gbp", name: "Google Business Profile", description: "Optimised Google Maps listing so local customers find you first.", price: "\u20B9999 \u2013 \u20B91,499", maintenance: "\u20B9999/mo", category: "Marketing", icon: "\uD83D\uDCCD", isGoldenEligible: false },
  { id: "svc-email", name: "Business Email Setup", description: "Professional @yourbusiness.com email on Google Workspace or Zoho.", price: "\u20B9499 \u2013 \u20B9799", maintenance: "One-time", category: "Setup", icon: "\uD83D\uDCE7", isGoldenEligible: false },
  { id: "svc-chatbot", name: "AI Website Chatbot", description: "AI chatbot on your website that answers queries and captures leads round the clock.", price: "\u20B94,999 \u2013 \u20B97,999", maintenance: "\u20B9999/mo", category: "Automation", icon: "\uD83E\uDD16", isGoldenEligible: false },
  { id: "svc-pitch", name: "Pitch Deck Design", description: "Investor-ready pitch deck that tells your story and closes funding.", price: "\u20B92,499 \u2013 \u20B93,499", maintenance: "One-time", category: "Branding", icon: "\uD83C\uDFAF", isGoldenEligible: false },
  { id: "svc-sales-auto", name: "Sales Automation", description: "End-to-end sales pipeline automation \u2014 from lead capture to follow-up.", price: "\u20B98,999 \u2013 \u20B912,999", maintenance: "\u20B91,999/mo", category: "Automation", icon: "\u26A1", isGoldenEligible: false },
  { id: "svc-analytics", name: "Analytics Dashboard", description: "Real-time business dashboard \u2014 see your sales, traffic, and leads in one place.", price: "\u20B96,999 \u2013 \u20B99,999", maintenance: "\u20B91,499/mo", category: "Operations", icon: "\uD83D\uDCC8", isGoldenEligible: false },
  { id: "svc-hr", name: "HR System Setup", description: "Attendance, payroll, and leave management \u2014 digitise your HR in one week.", price: "\u20B95,999 \u2013 \u20B99,999", maintenance: "\u20B91,499/mo", category: "Operations", icon: "\uD83D\uDC65", isGoldenEligible: false },
  { id: "svc-blog", name: "SEO Blog Writing", description: "Keyword-optimised blog posts that rank on Google and drive organic traffic.", price: "\u20B9699 \u2013 \u20B9999/post", maintenance: "Per post", category: "Marketing", icon: "\u270D\uFE0F", isGoldenEligible: false },
  { id: "svc-audit", name: "Google Visibility Audit", description: "Free 1-page report showing exactly where your business is invisible online and how to fix it.", price: "FREE", maintenance: "One-time report", category: "Audit", icon: "\uD83D\uDD0E", isGoldenEligible: false, tag: "FREE" },
  { id: "svc-app", name: "Mobile App Development", description: "Custom Android & iOS app for your business \u2014 built in React Native.", price: "\u20B929,999 \u2013 \u20B959,999", maintenance: "\u20B92,999/mo", category: "Web", icon: "\uD83D\uDCF2", isGoldenEligible: false },
  { id: "svc-linkedin", name: "LinkedIn Personal Branding", description: "Turn your LinkedIn into a client magnet \u2014 full profile optimisation + content strategy.", price: "\u20B94,999 \u2013 \u20B97,498", maintenance: "\u20B92,999/mo", category: "Marketing", icon: "\uD83D\uDCBC", isGoldenEligible: false },
];

export const scaleopsConsultancy: ConsultancyOption[] = [
  { id: "consult-free", name: "First Chat FREE", duration: "30 min", price: "\u20B90", priceNumeric: 0, badge: "NEW SIGNUP OFFER", description: "One free strategy call for all new signups. No commitment, no pitch." },
  { id: "consult-chat", name: "Chat Session", duration: "30 min", price: "\u20B9499", priceNumeric: 499, description: "Focused Q&A session. Get clear answers on your business challenges." },
  { id: "consult-strategy", name: "Strategy Call", duration: "30 min", price: "\u20B9999", priceNumeric: 999, description: "Deep-dive with a roadmap and action plan you can execute immediately." },
  { id: "consult-retainer", name: "Monthly Retainer", duration: "Ongoing", price: "\u20B92,999/mo", priceNumeric: 2999, badge: "BEST VALUE", description: "On-demand advisor every month. Priority access, weekly check-ins included." },
];

export const scaleopsMaintenance: MaintenancePlan[] = [
  { id: "maint-seo", name: "SEO Maintenance", price: "\u20B92,999/mo", priceNumeric: 2999, coverage: ["1 optimised blog post/month","Rank monitoring & reporting","On-page fixes as needed","Google Search Console alerts"] },
  { id: "maint-web", name: "Website Maintenance", price: "\u20B91,499/mo", priceNumeric: 1499, coverage: ["Speed & performance tuning","Security patches","Bug fixes within 24 hrs","Monthly uptime report"] },
  { id: "maint-social", name: "Social Media Management", price: "\u20B94,999/mo", priceNumeric: 4999, coverage: ["8 branded posts/month","Engagement & reply management","Monthly analytics report","Hashtag & growth strategy"] },
  { id: "maint-fullstack", name: "Full Stack Plan", price: "\u20B97,999/mo", priceNumeric: 7999, badge: "ALL INCLUDED", coverage: ["Everything in all 3 plans","Monthly strategy call","Priority support 24/7","Quarterly business review"] },
];

// Backward-compat export for Orders.tsx
export const allServices = launchpadServices;
