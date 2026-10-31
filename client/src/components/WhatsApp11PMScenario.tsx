import React from "react";
import { MessageCircle, Clock, CheckCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export default function WhatsApp11PMScenario() {
  return (
    <section className="py-20 px-4 bg-[#07080b] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Speed-to-Lead Reality</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              11 PM. A customer asks your price on WhatsApp.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              They get your price list in 30 seconds. You wake up to an enquiry, not a lost sale to a competitor who replied first.
            </p>

            <div className="space-y-3 pt-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>78% of B2B deals in India go to the vendor who responds first.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero manual typing needed during late nights or peak factory hours.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Connects directly to your products, inventory, and Google profile.</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/916284925684?text=Hi%20Mukul!%20Show%20me%20how%20the%20automated%20WhatsApp%20price%20responder%20works%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("11pm_scenario_cta")}
              >
                <Button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Test It On Your WhatsApp →
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Realistic WhatsApp Chat Simulator */}
          <div className="lg:col-span-6">
            <div className="max-w-md mx-auto rounded-3xl bg-[#0b141a] border border-neutral-800 shadow-2xl overflow-hidden font-sans">
              
              {/* WhatsApp Header */}
              <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between text-white border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                    SD
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight">SAGE DO Automated Pipeline</p>
                    <p className="text-[11px] text-emerald-400">● Online (24/7 Instant Responder)</p>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">11:04 PM</span>
              </div>

              {/* Chat Body */}
              <div className="p-4 space-y-3.5 text-xs bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* Incoming Buyer Inquiry */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#202c33] text-neutral-200 p-3 rounded-2xl rounded-tl-none shadow-sm relative">
                    <p className="font-semibold text-amber-400 text-[11px] mb-1">Incoming Lead</p>
                    <p className="leading-relaxed">
                      Hi, saw your listing. What is the price for bulk supply of 200 units with delivery to Ludhiana?
                    </p>
                    <span className="text-[9px] text-neutral-400 float-right mt-1 ml-2">11:04 PM</span>
                  </div>
                </div>

                {/* Instant Bot Reply in 24 seconds */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="font-semibold text-emerald-200 text-[11px] mb-1">⚡ SAGE DO Automated System</p>
                    <p className="leading-relaxed">
                      Hello! Thanks for reaching out. Here is our official product catalog and wholesale rate card:
                    </p>
                    <div className="mt-2 p-2 rounded-lg bg-black/30 border border-white/10 flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <div className="text-[10px]">
                        <p className="font-bold text-white">Wholesale_Catalog_2026.pdf</p>
                        <p className="text-neutral-300">Tier 2 Pricing · In Stock</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 mt-1.5">
                      <span>11:04 PM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Lead Captured */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#202c33] text-neutral-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <p className="leading-relaxed">
                      Great price. Can we schedule a brief call tomorrow morning at 10 AM to finalize?
                    </p>
                    <span className="text-[9px] text-neutral-400 float-right mt-1 ml-2">11:06 PM</span>
                  </div>
                </div>

                {/* Scheduled */}
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-400 text-[11px] font-semibold">
                  ✓ Lead captured & logged into your CRM. You wake up with a confirmed deal.
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
