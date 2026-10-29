import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, ArrowRight, Crown, Rocket, Star, ShieldCheck, Zap, ChevronRight, TrendingUp, ChevronDown, Sparkles, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/contexts/CurrencyContext";
import { apiRequest } from "@/lib/queryClient";
import { allServices, ServiceDetail } from "@/data/serviceData";
import { SMB_LAUNCHPAD_PACKAGES, ENTERPRISE_SOVEREIGN_SUITES } from "@/config/pricing";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Helmet } from "react-helmet-async";
import { twMerge } from "tailwind-merge";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const COMBOS = [
  { name: "Brand Starter", desc: "Logo + Brand Colors + Business Email", price: "₹2,999 – ₹3,499", icon: "🎨", service: "Brand Starter Combo", price_val: 2999 },
  { name: "Google Presence", desc: "Website + SEO / GEO / AEO + Google Business Profile", price: "₹16,999 – ₹19,999", icon: "🌐", service: "Google Presence Combo", price_val: 16999 },
  { name: "Legal Foundation", desc: "GST + MSME + Trademark Filing", price: "₹3,999 – ₹5,999", icon: "📋", service: "Legal Foundation Combo", price_val: 3999 },
  { name: "Sales Machine", desc: "CRM + WhatsApp Bot + Lead Automation", price: "₹12,999 – ₹14,999", icon: "🤖", service: "Sales Machine Combo", price_val: 12999 },
];

const CONSULT_OPTIONS = [
  { type: "First Discovery Call", duration: "15 min", price: "₹0", desc: "15-minute scoping call on Zoom or WhatsApp", tag: "FREE", price_val: 0 },
  { type: "AI & Web Growth Audit", duration: "45 min", price: "₹1,999", desc: "Speed, SEO / GEO / AEO, conversion audit & tech roadmap", tag: "POPULAR LEAD IN", price_val: 1999 },
  { type: "Strategic Consultation", duration: "45 min", price: "₹3,499", desc: "One-on-one strategy call directly with Mukul", tag: "", price_val: 3499 },
  { type: "Growth Retainer", duration: "Ongoing", price: "₹9,999/mo", desc: "Weekly sync calls + priority WhatsApp access", tag: "BEST VALUE", price_val: 9999 },
];

const MAINTENANCE_PLANS = [
  { name: "SEO / GEO / AEO Maintenance", price: "₹2,999/mo", what: "1 post/mo + AI citation & rank monitoring + competitor check + fixes", icon: "🔍", price_val: 2999 },
  { name: "Website Maintenance", price: "₹1,499/mo", what: "Speed + security updates + bug fixes + uptime monitoring", icon: "🌐", price_val: 1499 },
  { name: "Full Stack Plan", price: "₹7,999/mo", what: "Everything above + priority support + monthly strategy call", icon: "⚡", price_val: 7999 },
];

const TABS = [
  {
    id: "smb",
    label: "SMB LaunchPad",
    sub: "₹15,000 / ₹35,000 / ₹95,000",
    icon: Rocket,
    color: "from-amber-400 to-yellow-600",
    activeColor: "text-amber-400",
  },
  {
    id: "enterprise",
    label: "Enterprise Sovereign Suites",
    sub: "₹45,000 / ₹1,50,000 / Starting at ₹3,50,000",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    activeColor: "text-amber-300",
  },
  {
    id: "scaleops",
    label: "ScaleOps & Combos",
    sub: "Retainers, Maintenance & Bundles",
    icon: TrendingUp,
    color: "from-blue-400 to-cyan-600",
    activeColor: "text-blue-400",
  },
];

export default function Services() {
  const { currency, toggleCurrency, formatAmount } = useCurrency();

  const formatPrice = (rangeStr: string) => {
    if (!rangeStr) return "";
    if (currency === 'INR') return rangeStr;
    return rangeStr.replace(/₹\s*([\d,]+)/g, (_, match) => {
      const num = parseInt(match.replace(/,/g, ''), 10);
      if (isNaN(num)) return _;
      return formatAmount(num);
    });
  };

  const getTabSub = (tabId: string) => {
    if (tabId === "smb") {
      return `${formatAmount(15000)} / ${formatAmount(35000)} / ${formatAmount(95000)}`;
    }
    if (tabId === "enterprise") {
      return `${formatAmount(45000)} / ${formatAmount(150000)} / Starting at ${formatAmount(350000)}`;
    }
    return "Retainers, Maintenance & Bundles";
  };
  const [activeTab, setActiveTab] = useState<string>("smb");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleCardClick = (service: ServiceDetail) => {
    apiRequest("POST", `/api/services/${service.id}/click`).catch(console.error);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const FEATURED_IDS = ["b03", "b02", "b05", "b04"];
  const featuredServices = FEATURED_IDS.map(id => allServices.find(s => s.id === id)).filter(Boolean) as ServiceDetail[];
  const specializedServices = allServices.filter(s =>
    ["Business", "Startup Launch", "Scale Business", "AI Automation"].includes(s.category) && !FEATURED_IDS.includes(s.id)
  );
  const launchpadServices = allServices.filter(s => ["Business", "Startup Launch", "Scale Business", "AI Automation"].includes(s.category));
  const getFiltered = (list: ServiceDetail[]) => searchQuery.trim() ? list.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())) : list;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-amber-500/30">
      <Helmet>
        <title>Services & Commercial Catalog | SAGE DO — Speed of AI. Precision of Humans.</title>
        <meta name="description" content="SAGE DO Commercial Catalog: SMB LaunchPad (₹15,000 / ₹35,000 / ₹95,000) and Enterprise Sovereign Suites (₹45,000 / ₹1,50,000 / ₹3,50,000). Backed by 48-Hour Functional Prototype Guarantee." />
        <meta name="keywords" content="business services India, website design Chandigarh, SEO GEO AEO India, Google Business Profile Chandigarh, WhatsApp bot setup, CRM setup India, GST registration, logo design India, mobile app development, LaunchPad, ScaleOps, SAGEDO, AI business services" />
        <link rel="canonical" href="https://sagedo.in/services" />
        <meta property="og:title" content="Services & Commercial Catalog | SAGE DO" />
        <meta property="og:description" content="SMB LaunchPad & Enterprise Sovereign Suites. High-impact websites, sovereign CRM architectures, WhatsApp sales bots, and ERP bridges." />
        <meta property="og:url" content="https://sagedo.in/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services & Commercial Catalog | SAGE DO" />
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Mohali, Punjab, India" />
        <meta name="geo.position" content="30.6558;76.7552" />
        <meta name="ICBM" content="30.6558, 76.7552" />
        <meta name="twitter:description" content="Institutional digital revenue infrastructure for Indian enterprises. High-conversion web gateways, Sovereign Revenue Engine™, and ERP bridges. From ₹15,000." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SAGEDO Business Services & Commercial Catalog",
          "provider": {
            "@type": "Organization",
            "name": "SAGEDO AI",
            "url": "https://sagedo.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "SCO-38, Mohali City Centre, Aerocity",
              "addressLocality": "Mohali",
              "addressRegion": "Punjab",
              "postalCode": "140306",
              "addressCountry": "IN"
            }
          },
          "areaServed": "IN",
          "serviceType": [
            "SMB LaunchPad",
            "Enterprise Sovereign Suites",
            "Digital Presence Engine",
            "Sovereign Revenue Engine™ Custom CRM",
            "Enterprise ERP Bridge",
            "WhatsApp Sales Automation",
            "Tally Prime Integration",
            "B2B Systems Architecture"
          ],
          "offers": [
            { "@type": "Offer", "name": "LaunchPad Starter", "price": "15000", "priceCurrency": "INR" },
            { "@type": "Offer", "name": "LaunchPad Growth", "price": "35000", "priceCurrency": "INR" },
            { "@type": "Offer", "name": "LaunchPad Scale", "price": "95000", "priceCurrency": "INR" },
            { "@type": "Offer", "name": "Digital Presence Engine", "price": "45000", "priceCurrency": "INR" },
            { "@type": "Offer", "name": "Sovereign Revenue Engine™", "price": "150000", "priceCurrency": "INR" },
            { "@type": "Offer", "name": "Enterprise Infrastructure", "price": "350000", "priceCurrency": "INR" }
          ]
        })}</script>
      </Helmet>
      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HERO SECTION */}
      <div className="relative pt-20 pb-6 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20 px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              SAGE DO • COMMERCIAL CATALOG
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight text-white">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Legacy</span>.
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Precision-engineered systems for founders, leaders, and growing businesses across India. Fast execution backed by ironclad engineering warranties.
            </p>

            {/* SLA & Trust Pillars */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 text-xs text-neutral-300 font-semibold">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>48-Hour Functional Prototype Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>30-Point Human Engineering Verification</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Milestone-Gated 90% Money-Back SLA</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-xl focus-within:border-amber-500/50">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Find a service, SKU, or package..."
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-2 font-medium outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Interactive Currency Switcher */}
            <div className="flex items-center justify-center mt-5">
              <div className="inline-flex items-center gap-1.5 p-1 bg-neutral-900/90 border border-white/10 rounded-full shadow-xl backdrop-blur-md">
                <span className="text-[11px] font-bold text-neutral-400 pl-3 pr-1 uppercase tracking-wider">Currency:</span>
                <button
                  type="button"
                  onClick={() => currency !== 'INR' && toggleCurrency()}
                  data-testid="services-currency-inr"
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-black transition-all cursor-pointer",
                    currency === 'INR'
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  ₹ INR (India)
                </button>
                <button
                  type="button"
                  onClick={() => currency !== 'USD' && toggleCurrency()}
                  data-testid="services-currency-usd"
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-black transition-all cursor-pointer",
                    currency === 'USD'
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  $ USD (Global)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY 3-TRACK TABS */}
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-6 overflow-x-auto py-3 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3.5 min-w-max group cursor-pointer",
                    isActive ? "bg-white/10 border-2" : "hover:bg-white/5 border-2 border-transparent",
                    isActive && tab.id === "smb" ? "border-amber-500/60 shadow-lg shadow-amber-500/10" : "",
                    isActive && tab.id === "enterprise" ? "border-amber-400/60 shadow-lg shadow-amber-400/10" : "",
                    isActive && tab.id === "scaleops" ? "border-blue-500/60 shadow-lg shadow-blue-500/10" : ""
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", tab.color)}
                      style={{ opacity: 0.08 }}
                    />
                  )}
                  <div
                    className={cn(
                      "p-2.5 rounded-xl",
                      isActive ? "bg-white/10 text-white" : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && tab.activeColor)} />
                  </div>
                  <div className="text-left">
                    <p
                      className={cn(
                        "font-black text-sm sm:text-base tracking-wide",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                      )}
                    >
                      {tab.label}
                    </p>
                    <p className={cn("text-[11px] font-medium tracking-wider", isActive ? "text-amber-400/90" : "text-gray-500")}>
                      {getTabSub(tab.id)}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBorder"
                      className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r", tab.color)}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEARCH VIEW (IF SEARCH QUERY PRESENT) */}
      {searchQuery.trim() && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Search Results for <span className="text-amber-400">"{searchQuery}"</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="text-xs border-white/20 text-gray-300 hover:text-white"
            >
              Clear Search
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFiltered(launchpadServices).map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="group relative bg-white/5 border border-white/5 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="font-bold text-white text-base leading-tight mb-1">{service.name}</h3>
                    <p className="text-amber-500 font-bold text-sm bg-black/50 px-2 py-0.5 rounded-md inline-block border border-amber-500/20">
                      {formatPrice(service.priceRange)}
                    </p>
                  </div>
                  {service.badge && (
                    <span className="absolute top-3 right-3 z-20 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-black px-2 py-0.5 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-amber-400/80 font-semibold mb-2 italic">{(service as any).whyBuy || ""}</p>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">{service.description}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/orders?package=${service.id}&service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="min-h-[44px] sm:min-h-0 w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none transition-colors font-semibold text-xs"
                      >
                        Start Build → {formatPrice(service.priceRange)}
                      </Button>
                    </Link>
                    <a
                      href={`https://wa.me/916284925684?text=${encodeURIComponent('Hi Mukul, I want to know more about: ' + service.name + ' (' + service.priceRange + ')')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackWhatsAppClick(`services_search_${service.id}`);
                      }}
                      className="min-h-[44px] sm:min-h-0 flex-shrink-0 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center transition-colors"
                    >
                      Ask
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {getFiltered(launchpadServices).length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No matching services found.</p>
              <Button onClick={() => setSearchQuery("")} className="bg-amber-500 text-black font-semibold">
                View All Services
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT (SHOWN WHEN NOT SEARCHING) */}
      {!searchQuery.trim() && (
        <div className="max-w-7xl mx-auto px-4 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 1: SMB LAUNCHPAD (₹15,000 / ₹35,000 / ₹95,000) */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "smb" && (
                <div className="pt-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs font-bold uppercase tracking-wider">
                          Track 1: SMB LaunchPad
                        </Badge>
                        <span className="text-xs text-neutral-400">One-Time Fixed Price Builds</span>
                      </div>
                      <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-amber-500" />
                        The LaunchPad Architecture
                      </h2>
                      <p className="text-gray-400 mt-1 max-w-2xl text-sm leading-relaxed">
                        Complete digital systems for growing businesses. Interactive functional prototype guaranteed in 48 hours, followed by rapid 7–21 day production deployment.
                      </p>
                    </div>
                    <Badge className="bg-amber-500 text-black font-extrabold border-none px-3.5 py-1.5 text-xs">
                      48-Hour Functional Prototype Guarantee
                    </Badge>
                  </div>

                  {/* 3 PRIMARY SMB CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* STARTER */}
                    <RevealOnScroll delay={0}>
                      <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Rocket className="w-24 h-24 text-amber-500" />
                          </div>
                          <div className="mb-4 p-2 bg-amber-500/10 w-fit rounded-lg text-amber-500">
                            <Zap className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">LaunchPad Starter</h3>
                          <p className="text-gray-400 text-sm mb-1">Essential market validation & digital foundation</p>
                          <p className="text-amber-400/80 text-xs font-semibold mb-4 italic">“Establish your digital presence in 7 days.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-black text-white">{formatAmount(15000)}</span>
                            <span className="text-xs text-gray-500">/ one-time</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium mb-6">Production delivery: 7 calendar days</p>
                          <ul className="space-y-3 mb-8">
                            {SMB_LAUNCHPAD_PACKAGES[0].features.map((feature) => (
                              <li key={feature} className="flex gap-3 text-sm text-gray-300">
                                <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=smb_starter&service=LaunchPad%20Starter&price=15000&id=smb_starter">
                            <Button className="min-h-[44px] sm:min-h-0 w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none font-semibold transition-all">
                              Start 48-Hr Build ({formatAmount(15000)}) <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I'm interested in the LaunchPad Starter package (₹15,000).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_smb_starter")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold flex items-center justify-center py-2 transition-colors"
                          >
                            Ask on WhatsApp
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* GROWTH */}
                    <RevealOnScroll delay={80}>
                      <div className="relative bg-[#0F0F0F] border border-amber-500/50 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
                            <span className="bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                              Most Popular — Top 1% Validated
                            </span>
                          </div>
                          <div className="mb-6 p-3 bg-amber-500 text-black w-fit rounded-xl">
                            <Crown className="w-8 h-8" />
                          </div>
                          <h3 className="text-2xl font-black text-white mb-2">LaunchPad Growth</h3>
                          <p className="text-gray-400 text-sm mb-1">Complete digital acquisition & automated sales engine</p>
                          <p className="text-amber-400 text-xs font-semibold mb-6 italic">“Full sales pipeline & custom CRM in 10-12 days.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-black text-white">{formatAmount(35000)}</span>
                            <span className="text-sm text-gray-500">/ one-time</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium mb-4">Production delivery: 10–12 calendar days</p>
                          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
                            <div className="h-full w-full bg-gradient-to-r from-amber-500 to-yellow-600"></div>
                          </div>
                          <ul className="space-y-3 mb-8">
                            {SMB_LAUNCHPAD_PACKAGES[1].features.map((feature) => (
                              <li key={feature} className="flex gap-3 text-sm font-medium text-white">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=smb_growth&service=LaunchPad%20Growth&price=35000&id=smb_growth">
                            <Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:to-amber-500 text-black font-black text-lg shadow-lg shadow-amber-500/20">
                              Start Growth Build ({formatAmount(35000)})
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I'm interested in the LaunchPad Growth package (₹35,000).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_smb_growth")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold flex items-center justify-center py-2 transition-colors"
                          >
                            Ask on WhatsApp
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* SCALE */}
                    <RevealOnScroll delay={160}>
                      <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-24 h-24 text-amber-500" />
                          </div>
                          <div className="mb-4 p-2 bg-amber-500/10 w-fit rounded-lg text-amber-500">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">LaunchPad Scale</h3>
                          <p className="text-gray-400 text-sm mb-1">Automated operations, multi-channel pipelines & full tech stack</p>
                          <p className="text-amber-400/80 text-xs font-semibold mb-4 italic">“Native mobile app + web + custom admin in 15–21 days.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-black text-white">{formatAmount(95000)}</span>
                            <span className="text-xs text-gray-500">/ one-time</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium mb-6">Production delivery: 15–21 calendar days</p>
                          <ul className="space-y-3 mb-8">
                            {SMB_LAUNCHPAD_PACKAGES[2].features.map((feature) => (
                              <li key={feature} className="flex gap-3 text-sm text-gray-300">
                                <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=smb_scale&service=LaunchPad%20Scale&price=95000&id=smb_scale">
                            <Button className="min-h-[44px] sm:min-h-0 w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none font-semibold transition-all">
                              Start Custom Build ({formatAmount(95000)}) <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I'm interested in the LaunchPad Scale package (₹95,000).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_smb_scale")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold flex items-center justify-center py-2 transition-colors"
                          >
                            Ask on WhatsApp
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* FEATURED B2B CORE SERVICES */}
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        B2B Core Solutions & Micro-Engagements
                      </h3>
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                      {featuredServices.map((service, i) => (
                        <RevealOnScroll key={service.id} delay={i * 80}>
                          <div
                            onClick={() => handleCardClick(service)}
                            className="group relative bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col md:flex-row h-full min-h-[300px]"
                          >
                            <div className="md:w-2/5 h-48 md:h-full relative overflow-hidden flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                              <img
                                src={service.imageUrl}
                                alt={service.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {service.badge && (
                                <span className="absolute top-4 left-4 z-20 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black px-3 py-1 rounded-full shadow-lg">
                                  {service.badge}
                                </span>
                              )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="font-extrabold text-white text-xl leading-snug group-hover:text-amber-400 transition-colors mb-1">
                                  {service.name}
                                </h3>
                                <p className="text-amber-500 font-extrabold text-base mb-3">
                                  {formatPrice(service.priceRange)}
                                </p>
                                <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
                                  {service.description}
                                </p>
                                <ul className="space-y-2 mb-6">
                                  {service.standardFeatures.slice(0, 3).map((f, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                                      <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                      <span>{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex gap-3 mt-auto">
                                <Link
                                  href={`/orders?package=${service.id}&service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1"
                                >
                                  <Button
                                    size="sm"
                                    className="min-h-[44px] sm:min-h-0 w-full h-10 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors rounded-xl shadow-md"
                                  >
                                    Start Build → {formatPrice(service.priceRange).split(' – ')[0]}
                                  </Button>
                                </Link>
                                <a
                                  href={`https://wa.me/916284925684?text=${encodeURIComponent('Hi Mukul, I want to know more about: ' + service.name + ' (' + service.priceRange + ')')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    trackWhatsAppClick(`services_featured_${service.id}`);
                                  }}
                                  className="min-h-[44px] sm:min-h-0 flex-shrink-0 bg-green-600 hover:bg-green-500 text-white px-3 h-10 rounded-xl text-xs font-extrabold flex items-center transition-colors"
                                >
                                  Ask
                                </a>
                              </div>
                            </div>
                          </div>
                        </RevealOnScroll>
                      ))}
                    </div>

                    {/* EXPANDABLE DRAWER BUTTON */}
                    <div className="mt-8 mb-4 flex justify-center">
                      <button
                        onClick={() => setShowAllServices(!showAllServices)}
                        className="group relative flex flex-col items-center justify-center w-full max-w-3xl py-5 px-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] cursor-pointer"
                      >
                        <div className="relative z-10 flex items-center justify-between w-full">
                          <div className="flex items-center gap-4 text-left">
                            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 group-hover:scale-110 transition-transform">
                              <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                                Explore 20+ Specialized Services
                              </h3>
                              <p className="text-xs text-gray-400">
                                GST, MSME, Trademark, Logos, Pitch Decks, SEO Blogs, and more
                              </p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: showAllServices ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-2 bg-white/5 rounded-full text-gray-400 group-hover:text-white"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </button>
                    </div>

                    {/* SPECIALIZED SERVICES DRAWER */}
                    <AnimatePresence initial={false}>
                      {showAllServices && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
                            {specializedServices.map((service) => (
                              <div
                                key={service.id}
                                onClick={() => handleCardClick(service)}
                                className="group relative bg-white/5 border border-white/5 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                              >
                                <div className="h-40 overflow-hidden relative">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                  <img
                                    src={service.imageUrl}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute bottom-4 left-4 z-20">
                                    <h3 className="font-bold text-white text-base leading-tight mb-1">{service.name}</h3>
                                    <p className="text-amber-500 font-bold text-sm bg-black/50 px-2 py-0.5 rounded-md inline-block border border-amber-500/20">
                                      {formatPrice(service.priceRange)}
                                    </p>
                                  </div>
                                  {service.badge && (
                                    <span className="absolute top-3 right-3 z-20 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-black px-2 py-0.5 rounded-full">
                                      {service.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="p-4">
                                  <p className="text-xs text-amber-400/80 font-semibold mb-2 italic">{(service as any).whyBuy || ""}</p>
                                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">{service.description}</p>
                                  <div className="flex gap-2">
                                    <Link
                                      href={`/orders?package=${service.id}&service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex-1"
                                    >
                                      <Button
                                        size="sm"
                                        className="min-h-[44px] sm:min-h-0 w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none transition-colors font-semibold text-xs"
                                      >
                                        Start Build → {formatPrice(service.priceRange)}
                                      </Button>
                                    </Link>
                                    <a
                                      href={`https://wa.me/916284925684?text=${encodeURIComponent('Hi Mukul, I want to know more about: ' + service.name + ' (' + service.priceRange + ')')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        trackWhatsAppClick(`services_drawer_${service.id}`);
                                      }}
                                      className="min-h-[44px] sm:min-h-0 flex-shrink-0 bg-green-600 hover:bg-green-500 text-white px-2 py-1.5 rounded-md text-xs font-semibold flex items-center transition-colors"
                                    >
                                      Ask
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 2: ENTERPRISE SOVEREIGN SUITES (₹45,000 / ₹1,50,000 / ₹3,50,000) */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "enterprise" && (
                <div className="pt-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-bold uppercase tracking-wider">
                          Track 2: Enterprise Sovereign Suites
                        </Badge>
                        <span className="text-xs text-neutral-400">Institutional Digital Infrastructure</span>
                      </div>
                      <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Crown className="w-8 h-8 text-amber-500" />
                        The Founder&#39;s Stack
                      </h2>
                      <p className="text-gray-400 mt-1 max-w-2xl text-sm leading-relaxed">
                        High-leverage infrastructure for rapid enterprise scaling. Bespoke CRM engines with zero per-seat software taxes, sovereign VPS hosting, and native ERP bridges.
                      </p>
                    </div>
                    <Badge className="bg-amber-500 text-black font-extrabold border-none px-3.5 py-1.5 text-xs">
                      48-Hour Prototype · 30-Point Verification
                    </Badge>
                  </div>

                  {/* 3 ENTERPRISE CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* DIGITAL PRESENCE ENGINE */}
                    <RevealOnScroll delay={0}>
                      <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Rocket className="w-24 h-24 text-amber-500" />
                          </div>
                          <div className="mb-4 p-2 bg-amber-500/10 w-fit rounded-lg text-amber-500">
                            <Zap className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">Digital Presence Engine</h3>
                          <p className="text-gray-400 text-sm mb-1">Inbound lead capture & WhatsApp gateway.</p>
                          <p className="text-amber-400/80 text-xs font-semibold mb-4 italic">“Stop being invisible. Start capturing demand.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-black text-white">{formatAmount(45000)}</span>
                            <span className="text-xs text-gray-500">/ one-time</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
                            <CreditCard className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>3-part milestone plan available (from {formatAmount(15000)}/mo)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium mb-6">Production delivery: 14 calendar days · + {formatAmount(15000)}/mo AMC</p>
                          <ul className="space-y-3 mb-8">
                            {ENTERPRISE_SOVEREIGN_SUITES[0].features.map((item) => (
                              <li key={item} className="flex gap-3 text-sm text-gray-300">
                                <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=launch_starter&service=Digital%20Presence%20Engine&price=45000&id=launch_starter">
                            <Button className="min-h-[44px] sm:min-h-0 w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none font-semibold transition-all">
                              Deploy Now ({formatAmount(45000)}) <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I want to discuss Digital Presence Engine (₹45,000).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_ent_starter")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold flex items-center justify-center py-2 transition-colors"
                          >
                            Speak with Lead Engineer
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* SOVEREIGN REVENUE ENGINE */}
                    <RevealOnScroll delay={80}>
                      <div className="relative bg-[#0F0F0F] border border-amber-500/50 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
                            <span className="bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                              Most Popular — 3 spots left
                            </span>
                          </div>
                          <div className="mb-6 p-3 bg-amber-500 text-black w-fit rounded-xl">
                            <Crown className="w-8 h-8" />
                          </div>
                          <h3 className="text-2xl font-black text-white mb-2">Sovereign Revenue Engine™</h3>
                          <p className="text-gray-400 text-sm mb-1">Custom CRM & automated WhatsApp pipeline.</p>
                          <p className="text-amber-400 text-xs font-semibold mb-6 italic">“Your sovereign revenue machine — in 28 days.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-black text-white">{formatAmount(150000)}</span>
                            <span className="text-sm text-gray-500">/ one-time</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
                            <CreditCard className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>3-part milestone plan available (from {formatAmount(50000)}/mo)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium mb-4">Production delivery: 28 calendar days (10-gate QA) · + {formatAmount(25000)}/mo AMC</p>
                          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
                            <div className="h-full w-full bg-gradient-to-r from-amber-500 to-yellow-600"></div>
                          </div>
                          <ul className="space-y-3 mb-8">
                            {ENTERPRISE_SOVEREIGN_SUITES[1].features.map((item) => (
                              <li key={item} className="flex gap-3 text-sm font-medium text-white">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=launch_full&service=Sovereign%20Revenue%20Engine%E2%84%A2&price=150000&id=launch_full">
                            <Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:to-amber-500 text-black font-black text-lg shadow-lg shadow-amber-500/20">
                              Hire Your Team ({formatAmount(150000)})
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I want to discuss the Sovereign Revenue Engine™ (₹1,50,000).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_ent_growth")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg text-xs font-semibold flex items-center justify-center py-2 transition-colors"
                          >
                            Schedule Architecture Scoping
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* ENTERPRISE INFRASTRUCTURE */}
                    <RevealOnScroll delay={160}>
                      <div className="group relative bg-gradient-to-br from-slate-100 via-white to-slate-200 border-2 border-white/50 rounded-2xl p-6 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-2 duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
                            <span className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
                              Royal Tier · Sovereign VPS
                            </span>
                          </div>
                          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Crown className="w-24 h-24 text-slate-300 rotate-12" />
                          </div>
                          <div className="mb-4 p-2 bg-black w-fit rounded-lg text-white shadow-xl">
                            <Crown className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Enterprise Infrastructure</h3>
                          <p className="text-slate-600 text-sm mb-1">Sovereign automation & ERP bridge. No compromises.</p>
                          <p className="text-slate-700 text-xs font-semibold mb-4 italic">“Built for businesses that refuse second place.”</p>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-black text-slate-900">{formatAmount(350000)}</span>
                            <span className="text-xs text-slate-500 font-bold">/ starting at</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold mb-1">
                            <CreditCard className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Custom milestone installments from {formatAmount(116667)}/mo</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>48-Hour Functional Prototype Guarantee</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium mb-6">Production delivery: 45–60 calendar days · + {formatAmount(35000)}/mo AMC</p>
                          <ul className="space-y-3 mb-8">
                            {ENTERPRISE_SOVEREIGN_SUITES[2].features.map((item) => (
                              <li key={item} className="flex gap-3 text-sm font-bold text-slate-800">
                                <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Link href="/orders?package=launch_vip&service=Enterprise%20Infrastructure&price=350000&id=launch_vip">
                            <Button className="w-full h-12 bg-black hover:bg-slate-900 text-white font-black text-lg shadow-2xl shadow-black/20 border border-slate-800">
                              Become a Titan ({formatAmount(350000)})
                            </Button>
                          </Link>
                          <a
                            href={`https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, I want to discuss Enterprise Infrastructure (₹3,50,000+).")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("services_ent_vip")}
                            className="min-h-[44px] sm:min-h-0 w-full bg-black/10 hover:bg-black/20 text-slate-900 border border-slate-400 rounded-lg text-xs font-bold flex items-center justify-center py-2 transition-colors"
                          >
                            Confidential Founder Discussion
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* SOVEREIGN ARCHITECTURE GUARANTEES */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
                    <div className="max-w-3xl mx-auto text-center">
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-3 text-xs uppercase font-bold tracking-widest">
                        Zero Vendor Lock-In
                      </Badge>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        The Sovereign Architecture Standard
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Most agencies lease you templates on shared SaaS setups. SAGE DO deploys sovereign software that your business owns outright forever.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">Zero Per-Seat Tax</p>
                          <p className="text-xs text-gray-400">Unlimited users, zero monthly licenses, zero software taxes.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">Full Source Handover</p>
                          <p className="text-xs text-gray-400">Complete code repository and database schema rights transferred upon completion.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">Tally / ERP Bridge</p>
                          <p className="text-xs text-gray-400">Native bi-directional sync with your accounting books and ledgers.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">30-Point Audit</p>
                          <p className="text-xs text-gray-400">Aerospace-grade engineering verification and 7-day technical warranty.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 3: SCALEOPS & COMBOS */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "scaleops" && (
                <div className="pt-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs font-bold uppercase tracking-wider">
                          Track 3: ScaleOps & Combos
                        </Badge>
                        <span className="text-xs text-neutral-400">Continuous Operations, Retainers & Strategic Bundles</span>
                      </div>
                      <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-blue-400" />
                        ScaleOps & Commercial Bundles
                      </h2>
                      <p className="text-gray-400 mt-1 max-w-2xl text-sm leading-relaxed">
                        Ready-to-deploy multi-service bundles, 1-on-1 strategic growth audits, and recurring monthly maintenance to keep your search ranks and systems operating at peak velocity.
                      </p>
                    </div>
                  </div>

                  {/* 1. TURNKEY COMBOS */}
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        Smart Combos — Turnkey Value Bundles
                      </h3>
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {COMBOS.map((combo, i) => (
                        <RevealOnScroll key={combo.name} delay={i * 60}>
                          <Link href={`/orders?package=combo_${i}&service=${encodeURIComponent(combo.service)}&price=${combo.price_val}&id=combo_${i}`}>
                            <div className="group bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/8 h-full flex flex-col justify-between">
                              <div>
                                <div className="text-3xl mb-4">{combo.icon}</div>
                                <p className="font-bold text-base text-white mb-2 leading-tight">{combo.name}</p>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{combo.desc}</p>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-amber-500 mb-3">{formatPrice(combo.price)}</p>
                                <Button size="sm" className="w-full bg-white/10 group-hover:bg-amber-500 group-hover:text-black text-white text-xs transition-colors">
                                  Start Combo Build <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </Link>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>

                  {/* 2. STRATEGIC CONSULTATION */}
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        Executive Guidance & Strategic Audits
                      </h3>
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {CONSULT_OPTIONS.map((opt, i) => (
                        <RevealOnScroll key={opt.type} delay={i * 50}>
                          <div
                            className={cn(
                              "bg-white/5 border rounded-xl p-5 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col justify-between",
                              opt.tag === "NEW SIGNUP OFFER"
                                ? "border-green-500/30 bg-green-500/5"
                                : opt.tag === "BEST VALUE"
                                ? "border-amber-500/30 bg-amber-500/5"
                                : "border-white/10 hover:border-white/20"
                            )}
                          >
                            <div>
                              {opt.tag && (
                                <span
                                  className={cn(
                                    "inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider",
                                    opt.tag === "NEW SIGNUP OFFER" ? "bg-green-500 text-black" : "bg-amber-500 text-black"
                                  )}
                                >
                                  {opt.tag}
                                </span>
                              )}
                              <p className="text-xs text-gray-500 mb-1">{opt.type}</p>
                              <p className="font-bold text-white text-base mb-1">{opt.duration}</p>
                              <p className={cn("font-black text-xl mb-2", opt.price_val === 0 ? "text-green-400" : "text-amber-500")}>
                                {opt.price_val === 0 ? "FREE" : (opt.price.endsWith('/mo') ? `${formatAmount(opt.price_val)}/mo` : formatAmount(opt.price_val))}
                              </p>
                              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{opt.desc}</p>
                            </div>
                            <Link href={`/orders?package=consult_${i}&service=${encodeURIComponent(opt.type)}&price=${opt.price_val}&id=consult_${i}`}>
                              <Button size="sm" className="w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none text-xs">
                                Book Now
                              </Button>
                            </Link>
                          </div>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>

                  {/* 3. MAINTENANCE PLANS */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        Monthly Maintenance & Upkeep Retainers
                      </h3>
                      <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                      {MAINTENANCE_PLANS.map((plan, i) => (
                        <RevealOnScroll key={plan.name} delay={i * 50}>
                          <div className="group bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-xl p-6 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col justify-between">
                            <div>
                              <div className="text-3xl mb-3">{plan.icon}</div>
                              <p className="font-bold text-white text-base mb-1">{plan.name}</p>
                              <p className="text-blue-400 font-black text-xl mb-2">{formatAmount(plan.price_val)}/mo</p>
                              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{plan.what}</p>
                              <p className="text-[11px] text-gray-500 mb-4 italic">No long lock-ins. Pause or cancel anytime.</p>
                            </div>
                            <Link href={`/orders?package=maint_${i}&service=${encodeURIComponent(plan.name)}&price=${plan.price_val}&id=maint_${i}`}>
                              <Button size="sm" className="w-full bg-white/10 hover:bg-blue-500 hover:text-white text-white border-none text-xs font-semibold">
                                Subscribe Monthly <ChevronRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
