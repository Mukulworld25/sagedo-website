import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, ArrowRight, Crown, Rocket, Star, ShieldCheck, Zap, MessageCircle, X, Send, ChevronRight, TrendingUp, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { allServices, ServiceDetail } from "@/data/serviceData";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Helmet } from "react-helmet-async";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const COMBOS = [
  { name: "Brand Starter", desc: "Logo + Brand Colors + Business Email", price: "₹2,999 – ₹3,499", icon: "🎨", service: "Brand Starter Combo", price_val: 2999 },
  { name: "Google Presence", desc: "Website + SEO + Google Business Profile", price: "₹16,999 – ₹19,999", icon: "🌐", service: "Google Presence Combo", price_val: 16999 },
  { name: "Legal Foundation", desc: "GST + MSME + Trademark Filing", price: "₹3,999 – ₹5,999", icon: "📋", service: "Legal Foundation Combo", price_val: 3999 },
  { name: "Growth Engine", desc: "SEO + 4 Blog Posts + Social Media", price: "₹7,999 – ₹9,999/mo", icon: "📈", service: "Growth Engine Combo", price_val: 7999 },
  { name: "Sales Machine", desc: "CRM + WhatsApp Bot + Lead Automation", price: "₹12,999 – ₹14,999", icon: "🤖", service: "Sales Machine Combo", price_val: 12999 },
];

const CONSULT_OPTIONS = [
  { type: "First Chat FREE", duration: "30 min", price: "₹0", desc: "Free for new signups — no credit card", tag: "NEW SIGNUP OFFER", price_val: 0 },
  { type: "Chat Session", duration: "30 min", price: "₹499", desc: "Text-based strategic session", tag: "", price_val: 499 },
  { type: "Strategy Call", duration: "30 min", price: "₹999", desc: "Voice call with Mukul directly", tag: "", price_val: 999 },
  { type: "Monthly Retainer", duration: "Ongoing", price: "₹2,999/mo", desc: "2 calls + unlimited chat support", tag: "BEST VALUE", price_val: 2999 },
];

const MAINTENANCE_PLANS = [
  { name: "SEO Maintenance", price: "₹2,999/mo", what: "1 blog post/mo + rank monitoring + competitor check + fixes", icon: "🔍", price_val: 2999 },
  { name: "Website Maintenance", price: "₹1,499/mo", what: "Speed + security updates + bug fixes + uptime monitoring", icon: "🌐", price_val: 1499 },
  { name: "Social Media Mgmt", price: "₹4,999/mo", what: "8 posts/month + engagement + hashtag strategy + analytics", icon: "📱", price_val: 4999 },
  { name: "Full Stack Plan", price: "₹7,999/mo", what: "Everything above + priority support + monthly strategy call", icon: "⚡", price_val: 7999 },
];

const AUTO_REPLIES: Record<string, string> = {
  seo: "SEO setup keeps you on Google for 60–90 days. Our ₹2,999/mo maintenance publishes fresh content monthly to maintain and grow your ranking.",
  website: "We build on WordPress or React. 5-page website delivered in 7–10 days. ₹1,499/mo maintenance covers speed, security, and updates.",
  price: "All prices are just above freelancer rates but far below agency rates. Range pricing means basic to premium options.",
  maintenance: "Maintenance means we handle your service monthly — new content, updates, rank monitoring — so you never have to worry about it.",
  guarantee: "Every service has a 48-hour delivery guarantee. If we miss it, full refund. No questions asked.",
  gst: "GST registration takes 48 hours. ₹799–₹1,299 one-time. Required for all businesses.",
  logo: "Logo delivered in 3–5 days. Includes source files and 2 revision rounds. ₹1,999–₹2,499.",
  package: "The Full Launch at ₹35,000 covers website, SEO, CRM, sales bot, and 30 days of content.",
};

export default function Services() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string; link?: string }[]>([
    { from: "bot", text: "Hi! Ask me about any service, pricing, delivery time, or maintenance." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();



  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleCardClick = (service: ServiceDetail) => {
    apiRequest("POST", `/api/services/${service.id}/click`).catch(console.error);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setChatInput("");
    const lower = userMsg.toLowerCase();
    const key = Object.keys(AUTO_REPLIES).find(k => lower.includes(k));
    setTimeout(() => {
      if (key) {
        setChatMessages(prev => [...prev, { from: "bot", text: AUTO_REPLIES[key] }]);
      } else {
        setChatMessages(prev => [...prev, { from: "bot", text: "Let me connect you with Mukul directly on WhatsApp.", link: `https://wa.me/916284925684?text=${encodeURIComponent("Hi Mukul, question: " + userMsg)}` }]);
      }
    }, 600);
  };

  const launchpadServices = allServices.filter(s => s.category === "Business");
  const getFiltered = (list: ServiceDetail[]) => searchQuery.trim() ? list.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())) : list;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-amber-500/30">
      <Helmet>
        <title>Services | SAGEDO — AI + Human Business Services India</title>
        <meta name="description" content="SAGEDO offers 20+ business services for Indian SMBs — Website Design, SEO, WhatsApp Bot, CRM, GST Registration, Logo Design, Mobile App & more. LaunchPad to build your business. ScaleOps to grow it. Starting ₹499." />
        <meta name="keywords" content="business services India, website design Chandigarh, SEO India, WhatsApp bot setup, CRM setup India, GST registration, logo design India, mobile app development, LaunchPad, ScaleOps, SAGEDO, AI business services" />
        <link rel="canonical" href="https://sagedo.in/services" />
        <meta property="og:title" content="Services | SAGEDO — AI + Human Business Services" />
        <meta property="og:description" content="LaunchPad: Build your business from zero. ScaleOps: Operations that scale. 20 services, 5 combos, 3 packages. Starting ₹499." />
        <meta property="og:url" content="https://sagedo.in/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services | SAGEDO" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh, Punjab, India" />
        <meta name="geo.position" content="30.7333;76.7794" />
        <meta name="ICBM" content="30.7333, 76.7794" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh, Punjab, India" />
        <meta name="geo.position" content="30.7333;76.7794" />
        <meta name="ICBM" content="30.7333, 76.7794" />
        <meta name="twitter:description" content="20 business services for Indian SMBs. Website, SEO, WhatsApp Bot, CRM, GST, Logo — all in one place. Starting ₹499." />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","name":"SAGEDO Business Services","provider":{"@type":"Organization","name":"SAGEDO","url":"https://sagedo.in","address":{"@type":"PostalAddress","addressLocality":"Chandigarh","addressCountry":"IN"}},"areaServed":"IN","serviceType":["Website Design","SEO Setup","WhatsApp Bot","CRM Setup","Logo Design","GST Registration","Mobile App Development","Business Consultancy"],"offers":[{"@type":"Offer","name":"Starter Launch","price":"15000","priceCurrency":"INR"},{"@type":"Offer","name":"Full Launch","price":"35000","priceCurrency":"INR"},{"@type":"Offer","name":"VIP Launch","price":"95000","priceCurrency":"INR"}]}`}</script>
      </Helmet>
      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HERO + PACKAGES — ONE SECTION */}
      <div className="relative pt-20 pb-4 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20 px-4 py-1.5 text-sm uppercase tracking-widest font-bold">SAGE DO • EXCLUSIVE</Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight text-white">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Legacy</span>.
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-5 leading-relaxed">Precision-engineered services for founders, leaders, and visionaries who refuse to settle for average.</p>
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-xl focus-within:border-amber-500/50">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input type="text" placeholder="Find a service to accelerate your growth..." className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-2 font-medium outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>

          {/* 3 PACKAGES */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3"><Crown className="w-8 h-8 text-amber-500" />The Founder&#39;s Stack</h2>
                <p className="text-gray-400 mt-1">High-leverage infrastructure for rapid scaling. Pick one and we execute everything.</p>
              </div>
              <Badge className="bg-amber-500 text-black font-bold border-none px-3 py-1">top 1% validated</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* STARTER */}
              <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Rocket className="w-24 h-24 text-amber-500" /></div>
                <div className="mb-4 p-2 bg-amber-500/10 w-fit rounded-lg text-amber-500"><Zap className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-white mb-1">Starter Launch</h3>
                <p className="text-gray-400 text-sm mb-1">Everything a new business needs to exist online.</p>
                <p className="text-amber-400/80 text-xs font-semibold mb-4 italic">“Stop being invisible. Start being found.”</p>
                <div className="flex items-baseline gap-1 mb-1"><span className="text-3xl font-black text-white">₹15,000</span><span className="text-xs text-gray-500">/ one-time</span></div>
                <p className="text-sm text-gray-400 font-medium mb-6">+ ₹1,999/mo maintenance available</p>
                <ul className="space-y-3 mb-8">{["Logo + Brand Identity","5-Page Website","Google Business Profile","GST Registration","Business Email"].map(i=>(<li key={i} className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />{i}</li>))}</ul>
                <Link href="/orders?service=Starter%20Launch&price=15000"><Button className="w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none font-semibold transition-all">Deploy Now <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              </div>
              {/* FULL LAUNCH */}
              <div className="relative bg-[#0F0F0F] border border-amber-500/50 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)]">
                <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2"><span className="bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular — 3 spots left</span></div>
                <div className="mb-6 p-3 bg-amber-500 text-black w-fit rounded-xl"><Crown className="w-8 h-8" /></div>
                <h3 className="text-2xl font-black text-white mb-2">Full Launch</h3>
                <p className="text-gray-400 text-sm mb-1">Complete execution. You sell, we build everything.</p>
                <p className="text-amber-400 text-xs font-semibold mb-6 italic">“Your entire digital business — in 30 days.”</p>
                <div className="flex items-baseline gap-1 mb-1"><span className="text-5xl font-black text-white">₹35,000</span><span className="text-sm text-gray-500">/ one-time</span></div>
                <p className="text-sm text-gray-400 font-medium mb-6">+ ₹3,999/mo maintenance available</p>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-4"><div className="h-full w-full bg-gradient-to-r from-amber-500 to-yellow-600"></div></div>
                <ul className="space-y-3 mb-8">{["Everything in Starter","SEO Setup + 4 Blog Posts","WhatsApp Sales Bot","CRM + Lead Automation","30 Days Social Content"].map(i=>(<li key={i} className="flex gap-3 text-sm font-medium text-white"><Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />{i}</li>))}</ul>
                <Link href="/orders?service=Full%20Launch&price=35000"><Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:to-amber-500 text-black font-black text-lg shadow-lg shadow-amber-500/20">Hire Your Team</Button></Link>
              </div>
              {/* VIP */}
              <div className="group relative bg-gradient-to-br from-slate-100 via-white to-slate-200 border-2 border-white/50 rounded-2xl p-6 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-2 duration-300">
                <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2"><span className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">Royal Tier</span></div>
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity"><Crown className="w-24 h-24 text-slate-300 rotate-12" /></div>
                <div className="mb-4 p-2 bg-black w-fit rounded-lg text-white shadow-xl"><Crown className="w-6 h-6" /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">VIP Launch</h3>
                <p className="text-slate-600 text-sm mb-1">Enterprise infrastructure. No compromises.</p>
                <p className="text-slate-700 text-xs font-semibold mb-4 italic">“Built for businesses that refuse second place.”</p>
                <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black text-slate-900">₹95,000</span><span className="text-xs text-slate-500 font-bold">/ one-time</span></div>
                <p className="text-sm text-slate-500 font-medium mb-6">+ ₹7,999/mo maintenance available</p>
                <ul className="space-y-3 mb-8">{["Enterprise Web + Native App","Admin “God Mode” Dashboard","Dedicated Growth Engineer","Legal & IP Contracts Included"].map(i=>(<li key={i} className="flex gap-3 text-sm font-bold text-slate-800"><ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />{i}</li>))}</ul>
                <Link href="/orders?service=VIP%20Launch&price=95000"><Button className="w-full h-12 bg-black hover:bg-slate-900 text-white font-black text-lg shadow-2xl shadow-black/20 border border-slate-800">Become a Titan</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-8 overflow-x-auto py-4 scrollbar-hide">
            {[
              { id: "launchpad", label: "LaunchPad", sub: "Build your business from zero", icon: Rocket, color: "from-amber-400 to-yellow-600", activeColor: "text-amber-400" },
              { id: "scaleops", label: "ScaleOps", sub: "Operations that scale", icon: TrendingUp, color: "from-blue-400 to-cyan-600", activeColor: "text-blue-400" },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("relative px-10 py-5 rounded-2xl transition-all duration-300 flex items-center gap-4 min-w-max group", isActive ? "bg-white/8 border-2" : "hover:bg-white/5 border-2 border-transparent", isActive && tab.id === "launchpad" ? "border-amber-500/60 shadow-lg shadow-amber-500/10" : "", isActive && tab.id === "scaleops" ? "border-blue-500/60 shadow-lg shadow-blue-500/10" : "")}>
                  {isActive && <motion.div layoutId="activeTabGlow" className={cn("absolute inset-0 rounded-xl bg-gradient-to-r opacity-10", tab.color)} />}
                  <div className={cn("p-3 rounded-xl", isActive ? "bg-white/10 text-white" : "bg-white/5 text-gray-500 group-hover:text-gray-300")}><Icon className={cn("w-6 h-6", isActive && tab.activeColor)} /></div>
                  <div className="text-left">
                    <p className={cn("font-black text-base tracking-wide", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200")}>{tab.label}</p>
                    <p className={cn("text-xs font-medium uppercase tracking-wider", isActive ? "text-gray-400" : "text-gray-600")}>{tab.sub}</p>
                  </div>
                  {isActive && <motion.div layoutId="activeTabBorder" className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r", tab.color)} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* NO TAB SELECTED */}
      {!activeTab && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-2">Where do you stand today?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Pick your path. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">We execute.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => setActiveTab("launchpad")} className="group relative text-left bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-500/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4"><div className="p-3 bg-amber-500/20 rounded-2xl text-2xl">🚀</div><div><p className="font-black text-xl text-white">LaunchPad</p><p className="text-amber-400/80 text-xs font-semibold uppercase tracking-wider">Build from zero</p></div></div>
                <p className="text-gray-300 text-base font-medium mb-5 leading-relaxed">Starting a new business or going digital for the first time? We build everything — logo, website, SEO, CRM, WhatsApp bot — in 30 days.</p>
                <ul className="space-y-2 mb-6">{["Website + SEO + Google Business","WhatsApp Sales Bot + CRM","Logo, Branding & Business Email","GST, MSME & Trademark Filing"].map(item => (<li key={item} className="flex items-center gap-2 text-sm text-gray-400"><span className="text-amber-400 text-xs">✓</span>{item}</li>))}</ul>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:gap-3 transition-all">Explore LaunchPad <span>→</span></div>
              </div>
            </button>
            <button onClick={() => setActiveTab("scaleops")} className="group relative text-left bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent border border-blue-500/30 hover:border-blue-500/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4"><div className="p-3 bg-blue-500/20 rounded-2xl text-2xl">⚙️</div><div><p className="font-black text-xl text-white">ScaleOps</p><p className="text-blue-400/80 text-xs font-semibold uppercase tracking-wider">Operations that scale</p></div></div>
                <p className="text-gray-300 text-base font-medium mb-5 leading-relaxed">Already running a business? Book strategy sessions, maintain your SEO, keep your website fast, and automate operations every month.</p>
                <ul className="space-y-2 mb-6">{["1-on-1 Strategy Sessions with Mukul","Monthly SEO & Content Maintenance","Website Speed & Security Upkeep","Social Media & Growth Management"].map(item => (<li key={item} className="flex items-center gap-2 text-sm text-gray-400"><span className="text-blue-400 text-xs">✓</span>{item}</li>))}</ul>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">Explore ScaleOps <span>→</span></div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

              {/* LAUNCHPAD */}
              {activeTab === "launchpad" && (
                <div className="pt-12">
                  {!searchQuery && (
                    <>
                      <div className="mb-14">
                        <div className="flex items-center gap-4 mb-6"><div className="h-[1px] bg-white/10 flex-1"></div><h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Smart Combos — Save More</h2><div className="h-[1px] bg-white/10 flex-1"></div></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {COMBOS.map(combo => (
                            <Link key={combo.name} href={`/orders?service=${encodeURIComponent(combo.service)}&price=${combo.price_val}`}>
                              <div className="group bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/8">
                                <div className="text-3xl mb-4">{combo.icon}</div>
                                <p className="font-bold text-base text-white mb-2 leading-tight">{combo.name}</p>
                                <p className="text-xs text-gray-500 mb-3 leading-tight">{combo.desc}</p>
                                <p className="text-sm font-bold text-amber-500">{combo.price}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-8"><div className="h-[1px] bg-white/10 flex-1"></div><span className="text-xs font-bold uppercase tracking-widest text-gray-500">Individual Services</span><div className="h-[1px] bg-white/10 flex-1"></div></div>
                    </>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getFiltered(launchpadServices).map(service => (
                      <div key={service.id} onClick={() => handleCardClick(service)} className="group relative bg-white/5 border border-white/5 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="h-40 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute bottom-4 left-4 z-20">
                            <h3 className="font-bold text-white text-base leading-tight mb-1">{service.name}</h3>
                            <p className="text-amber-500 font-bold text-sm bg-black/50 px-2 py-0.5 rounded-md inline-block border border-amber-500/20">{service.priceRange}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-amber-400/80 font-semibold mb-2 italic">{(service as any).whyBuy || ""}</p>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4">{service.description}</p>
                          <div className="flex gap-2">
                            <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`} onClick={(e) => e.stopPropagation()} className="flex-1">
                              <Button size="sm" className="w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none transition-colors font-semibold text-xs">
                                Order → {service.priceRange}
                              </Button>
                            </Link>
                            <a href={`https://wa.me/916284925684?text=${encodeURIComponent('Hi Mukul, I want to know more about: ' + service.name + ' (' + service.priceRange + ')')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-shrink-0 bg-green-600 hover:bg-green-500 text-white px-2 py-1.5 rounded-md text-xs font-semibold flex items-center transition-colors">
                              Ask
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {getFiltered(launchpadServices).length === 0 && <div className="text-center py-20"><p className="text-gray-500">No services found.</p></div>}
                </div>
              )}

              {/* SCALEOPS */}
              {activeTab === "scaleops" && (
                <div className="pt-12">
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-6"><div className="h-[1px] bg-white/10 flex-1"></div><h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Expert Guidance — Book a Session</h2><div className="h-[1px] bg-white/10 flex-1"></div></div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {CONSULT_OPTIONS.map(opt => (
                        <div key={opt.type} className={cn("bg-white/5 border rounded-xl p-5 transition-all hover:-translate-y-1 duration-300", opt.tag === "NEW SIGNUP OFFER" ? "border-green-500/30 bg-green-500/5" : opt.tag === "BEST VALUE" ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 hover:border-white/20")}>
                          {opt.tag && <span className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider", opt.tag === "NEW SIGNUP OFFER" ? "bg-green-500 text-black" : "bg-amber-500 text-black")}>{opt.tag}</span>}
                          <p className="text-xs text-gray-500 mb-1">{opt.type}</p>
                          <p className="font-bold text-white text-base mb-1">{opt.duration}</p>
                          <p className={cn("font-black text-xl mb-2", opt.price_val === 0 ? "text-green-400" : "text-amber-500")}>{opt.price}</p>
                          <p className="text-xs text-gray-500 mb-4">{opt.desc}</p>
                          <Link href={`/orders?service=${encodeURIComponent(opt.type)}&price=${opt.price_val}`}><Button size="sm" className="w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white border-none text-xs">Book Now</Button></Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6"><div className="h-[1px] bg-white/10 flex-1"></div><h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Maintenance Plans — Stay on Top</h2><div className="h-[1px] bg-white/10 flex-1"></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {MAINTENANCE_PLANS.map(plan => (
                      <div key={plan.name} className="group bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-xl p-5 transition-all hover:-translate-y-1 duration-300">
                        <div className="text-2xl mb-3">{plan.icon}</div>
                        <p className="font-bold text-white text-sm mb-1">{plan.name}</p>
                        <p className="text-blue-400 font-black text-lg mb-2">{plan.price}</p>
                        <p className="text-xs text-gray-500 mb-2 leading-relaxed">{plan.what}</p>
                        <p className="text-[10px] text-gray-600 mb-4 italic">Stop anytime. Ranking holds 60–90 days.</p>
                        <Link href={`/orders?service=${encodeURIComponent(plan.name)}&price=${plan.price_val}`}><Button size="sm" className="w-full bg-white/10 hover:bg-blue-500 hover:text-white text-white border-none text-xs">Subscribe <ChevronRight className="w-3 h-3 ml-1" /></Button></Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="w-80 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-3 flex items-center justify-between">
                <div><p className="font-bold text-black text-sm">Ask SAGEDO</p><p className="text-black/70 text-xs">Instant answers. Complex → WhatsApp</p></div>
                <button onClick={() => setChatOpen(false)} className="text-black/70 hover:text-black"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3 h-52 overflow-y-auto space-y-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed", msg.from === "bot" ? "bg-white/10 text-gray-300" : "bg-amber-500/20 text-amber-200 ml-auto")}>
                    {msg.text}
                    {msg.link && <a href={msg.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-green-400 font-semibold hover:underline">Chat on WhatsApp →</a>}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="border-t border-white/5 p-2 flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Ask anything about services..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-amber-500/50" />
                <button onClick={sendChat} className="bg-amber-500 hover:bg-amber-400 text-black p-2 rounded-lg transition-colors"><Send className="w-3 h-3" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform">
          <MessageCircle className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
}
