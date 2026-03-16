// Services.tsx — SAGEDO Services Page
// Full rewrite: March 16, 2026
// Fixes: hero breathing room, big tabs, bigger combos, services hidden by default, SEO updated

import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  packages,
  combos,
  launchpadServices,
  scaleopsConsultancy,
  scaleopsMaintenance,
} from "../data/serviceData";

type TabType = "launchpad" | "scaleops" | null;

const WHATSAPP_NUMBER = "916284925684";

function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const tabSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTabs = () => {
    tabSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredServices = launchpadServices.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Services | SAGEDO — AI + Human Business Services in India</title>
        <meta name="description" content="SAGEDO offers 20+ business services for Indian SMBs — Website, SEO, WhatsApp Bot, CRM, GST, Logo, Mobile App and more. LaunchPad to build your business, ScaleOps to grow it. Starting ₹499." />
        <meta name="keywords" content="business services India, website design Chandigarh, SEO India, WhatsApp bot, CRM setup, GST registration, logo design, mobile app development, LaunchPad, ScaleOps, SAGEDO" />
        <link rel="canonical" href="https://sagedo.in/services" />
        <meta property="og:title" content="Services | SAGEDO — AI + Human Business Services" />
        <meta property="og:description" content="LaunchPad: Build your business from zero. ScaleOps: Operations that scale. 20 services, 5 combos, 3 packages. Starting ₹499." />
        <meta property="og:url" content="https://sagedo.in/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services | SAGEDO" />
        <meta name="twitter:description" content="20 business services for Indian SMBs. Website, SEO, WhatsApp Bot, CRM, GST, Logo — all in one place." />
        <script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "Service", "name": "SAGEDO Business Services", "provider": { "@type": "Organization", "name": "SAGEDO", "url": "https://sagedo.in" }, "areaServed": "IN", "serviceType": ["Website Design", "SEO Setup", "WhatsApp Bot", "CRM Setup", "Logo Design", "GST Registration", "Mobile App Development"] }`}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <section className="relative pt-24 pb-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" /></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">India's First AI + Human Hybrid Execution Team</span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Legacy</span></h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto">Every service your business needs — from zero to scaled. Choose your path below.</p>
            <div className="relative max-w-md mx-auto mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
              <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-all" />
            </div>
            <button onClick={scrollToTabs} className="text-amber-400 text-sm font-medium flex items-center gap-2 mx-auto hover:gap-3 transition-all">Explore services ↓</button>
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Everything, Bundled</h2><p className="text-gray-500">Pick a complete package or build your own below</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${pkg.highlight ? "bg-gradient-to-b from-amber-500/15 to-amber-500/5 border-amber-500/40 shadow-lg shadow-amber-500/10" : "bg-white/3 border-white/10 hover:border-white/20"}`}>
                {pkg.badge && <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider px-4 py-1 rounded-full ${pkg.highlight ? "bg-amber-400 text-black" : "bg-white/10 text-white/70 border border-white/20"}`}>{pkg.badge}</span>}
                <div className="mb-4 mt-2"><h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3><p className="text-gray-500 text-sm">{pkg.tagline}</p></div>
                <div className="mb-5"><div className="text-3xl font-black text-white mb-1">{pkg.price}</div><div className="text-sm text-gray-500">+ {pkg.maintenance} maintenance</div></div>
                <ul className="space-y-2 mb-6 flex-1">{pkg.features.map((f, i) => (<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><span className="text-amber-400 text-xs">✓</span>{f}</li>))}</ul>
                <p className="text-xs text-amber-400/80 italic mb-4">"{pkg.killerLine}"</p>
                <a href={whatsappLink(`Hi! I'm interested in the ${pkg.name} (${pkg.price}). Can we discuss?`)} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all ${pkg.highlight ? "bg-amber-400 text-black hover:bg-amber-300" : "bg-white/8 text-white border border-white/15 hover:bg-white/15"}`}>Get Started</a>
              </div>
            ))}
          </div>
        </section>

        <section ref={tabSectionRef} className="py-10 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-medium mb-4">Or build your own — pick your path</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button onClick={() => setActiveTab(activeTab === "launchpad" ? null : "launchpad")} className={`flex-1 py-5 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex flex-col items-center gap-1 border-2 ${activeTab === "launchpad" ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/30" : "bg-amber-400/10 text-amber-400 border-amber-400/30 hover:bg-amber-400/20 hover:border-amber-400/60"}`}>
                <span className="text-2xl">🚀</span><span className="text-lg font-black">LaunchPad</span><span className="text-xs font-normal opacity-80">Build your business from zero</span>
              </button>
              <button onClick={() => setActiveTab(activeTab === "scaleops" ? null : "scaleops")} className={`flex-1 py-5 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex flex-col items-center gap-1 border-2 ${activeTab === "scaleops" ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/60"}`}>
                <span className="text-2xl">⚙️</span><span className="text-lg font-black">ScaleOps</span><span className="text-xs font-normal opacity-80">Operations that scale</span>
              </button>
            </div>
          </div>
          {activeTab === null && (<div className="text-center py-12 select-none"><div className="text-4xl mb-3">👆</div><p className="text-lg font-medium text-gray-500">Choose your path above to see services</p></div>)}
        </section>

        {activeTab === "launchpad" && (
          <section className="pb-20 px-4 max-w-6xl mx-auto">
            <div className="mb-14">
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-white mb-1">⚡ Smart Combos</h3><p className="text-gray-500 text-sm">Bundled services at a better price</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {combos.map((combo) => (
                  <div key={combo.id} className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all hover:-translate-y-0.5">
                    <div className="text-3xl mb-3">{combo.icon}</div>
                    <h4 className="text-base font-bold text-white mb-1">{combo.name}</h4>
                    <p className="text-gray-500 text-xs mb-3">{combo.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">{combo.services.map((s, i) => (<span key={i} className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full px-2.5 py-0.5">{s}</span>))}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold text-sm">{combo.price}</span>
                      <a href={whatsappLink(`Hi! I'm interested in the ${combo.name} combo (${combo.price}). Can we discuss?`)} target="_blank" rel="noopener noreferrer" className="text-xs bg-amber-400 text-black font-bold px-3 py-1.5 rounded-lg hover:bg-amber-300 transition-colors">Ask Now</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-white mb-1">🛠️ Individual Services</h3><p className="text-gray-500 text-sm">Pick exactly what you need</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(searchQuery ? filteredServices : launchpadServices).map((service) => (
                  <div key={service.id} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-amber-400/30 hover:bg-white/5 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div className="flex gap-1">{service.tag === "FREE" && <span className="text-xs bg-green-400/15 text-green-400 border border-green-400/25 rounded-full px-2 py-0.5 font-bold">FREE</span>}<span className="text-xs bg-white/5 text-gray-500 rounded-full px-2 py-0.5">{service.category}</span></div>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5 leading-tight">{service.name}</h4>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-1 mb-4"><div className="text-amber-400 font-bold text-sm">{service.price}</div><div className="text-xs text-gray-600">{service.maintenance}</div></div>
                    <a href={whatsappLink(`Hi! I'm interested in ${service.name} (${service.price}). Can you tell me more?`)} target="_blank" rel="noopener noreferrer" className="w-full block text-center text-xs bg-white/5 border border-white/10 text-white py-2 rounded-lg group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all font-medium">💬 Ask on WhatsApp</a>
                  </div>
                ))}
              </div>
              {searchQuery && filteredServices.length === 0 && (<div className="text-center py-16 text-gray-600"><p>No services found for "{searchQuery}"</p><button onClick={() => setSearchQuery("")} className="mt-3 text-amber-400 text-sm hover:underline">Clear search</button></div>)}
            </div>
          </section>
        )}

        {activeTab === "scaleops" && (
          <section className="pb-20 px-4 max-w-6xl mx-auto">
            <div className="mb-14">
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-white mb-1">🎯 Consultancy</h3><p className="text-gray-500 text-sm">Book a direct session with Mukul</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {scaleopsConsultancy.map((option) => (
                  <div key={option.id} className={`relative rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${option.priceNumeric === 0 ? "bg-gradient-to-b from-green-500/15 to-transparent border-green-500/30" : option.badge === "BEST VALUE" ? "bg-gradient-to-b from-blue-500/15 to-transparent border-blue-500/30" : "bg-white/3 border-white/10 hover:border-blue-400/30"}`}>
                    {option.badge && <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wide px-3 py-1 rounded-full whitespace-nowrap ${option.priceNumeric === 0 ? "bg-green-400 text-black" : "bg-blue-500 text-white"}`}>{option.badge}</span>}
                    <div className="mt-2">
                      <h4 className="font-bold text-white mb-1">{option.name}</h4>
                      <p className="text-xs text-gray-500 mb-4">{option.description}</p>
                      <div className="mb-1 text-2xl font-black text-white">{option.price}</div>
                      <div className="text-xs text-gray-600 mb-5">{option.duration}</div>
                      <a href={whatsappLink(`Hi! I'd like to book a ${option.name} (${option.price}, ${option.duration}).`)} target="_blank" rel="noopener noreferrer" className={`w-full block text-center text-xs py-2.5 rounded-xl font-bold transition-all ${option.priceNumeric === 0 ? "bg-green-400 text-black hover:bg-green-300" : "bg-blue-500 text-white hover:bg-blue-400"}`}>Book Now</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-white mb-1">🔧 Maintenance Plans</h3><p className="text-gray-500 text-sm">Ongoing care so nothing breaks</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {scaleopsMaintenance.map((plan) => (
                  <div key={plan.id} className={`relative rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${plan.badge ? "bg-gradient-to-b from-blue-500/15 to-transparent border-blue-500/40" : "bg-white/3 border-white/10 hover:border-blue-400/30"}`}>
                    {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wide px-3 py-1 rounded-full bg-blue-500 text-white whitespace-nowrap">{plan.badge}</span>}
                    <h4 className="font-bold text-white mt-2 mb-1">{plan.name}</h4>
                    <div className="text-2xl font-black text-blue-400 mb-4">{plan.price}</div>
                    <ul className="space-y-2 mb-6">{plan.coverage.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs text-gray-400"><span className="text-blue-400 mt-0.5">✓</span>{item}</li>))}</ul>
                    <a href={whatsappLink(`Hi! I'd like to subscribe to the ${plan.name} (${plan.price}).`)} target="_blank" rel="noopener noreferrer" className="w-full block text-center text-xs py-2.5 rounded-xl font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all">Subscribe</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <a href={whatsappLink("Hi Mukul! I visited sagedo.in and want to discuss my business needs.")} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-sm px-5 py-3 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105">
          <span>💬</span><span>Message Mukul</span>
        </a>
      </div>
    </>
  );
};

export default Services;
