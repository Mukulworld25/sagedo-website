import React from "react";
import { Phone, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export default function FounderTrustBar() {
  return (
    <section className="relative z-20 border-b border-white/[0.08] bg-[#0c0e14] py-8 sm:py-10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#12151e] border border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          
          {/* Founder Identity & Credibility */}
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            <div className="relative shrink-0">
              <img
                src="/founder_mukul.png"
                alt="Mukul Dhiman - Founder, SAGE DO"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-primary/40 shadow-lg"
                loading="eager"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#12151e] flex items-center justify-center text-[10px]" title="Directly Available on WhatsApp">
                ⚡
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">Mukul Dhiman</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                  Founder &amp; Systems Architect
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Direct Engineering Accountability · SCO-38 Aerocity, Mohali (Tricity)
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 150+ Systems Delivered
                </span>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <span className="flex items-center gap-1 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> 30-Point QA Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Direct Human Contact Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20am%20looking%20to%20build%20a%20fast%20website%20or%20custom%20CRM."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('founder_bar_whatsapp')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to Mukul on WhatsApp</span>
            </a>

            <a
              href="tel:+916284925684"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-sm border border-neutral-700 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>+91 62849 25684</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
