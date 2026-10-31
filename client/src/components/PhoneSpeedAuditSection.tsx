import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Send, MessageCircle, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";

export default function PhoneSpeedAuditSection() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { toast } = useToast();

  const handleAuditClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) {
      toast({
        title: "Website URL Required",
        description: "Please enter your business website link.",
        variant: "destructive"
      });
      return;
    }

    trackWhatsAppClick("phone_speed_audit_submit");
    const prefilledText = `Hi Mukul! Here is my website link: ${websiteUrl.trim()}. Can you check if it opens fast on mobile and send me the 60-second voice note teardown?`;
    window.open(`https://wa.me/916284925684?text=${encodeURIComponent(prefilledText)}`, "_blank");
  };

  return (
    <section className="py-20 px-4 bg-neutral-950 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Speed Audit</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Does your website open fast on your customer's phone?
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                60% of Indian buyers leave a website if it takes more than 3 seconds to load on mobile. Send us your link. Mukul will personally check it and reply with a <strong>60-second voice note</strong> on what's slowing it down.
              </p>

              <form onSubmit={handleAuditClick} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="e.g. yourbusiness.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <Button 
                  type="submit"
                  className="h-12 px-6 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shrink-0 shadow-lg shadow-red-600/20"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get 60s Voice Note
                </Button>
              </form>

              <p className="text-[11px] text-neutral-500">
                100% Free · No sales calls · Direct WhatsApp voice reply from founder Mukul Dhiman
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">The Reality Check</span>
                  <span className="text-xs font-mono text-red-400 font-bold">4G Benchmark</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-neutral-300">
                    <p className="font-bold text-red-400 mb-0.5">Average Agency Website:</p>
                    <p className="text-neutral-400 leading-relaxed">
                      Heavy templates, 4.8s load time on Indian 4G networks, 50%+ bounce rate before the hero image even appears.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-neutral-300">
                    <p className="font-bold text-emerald-400 mb-0.5">SAGE DO Standard:</p>
                    <p className="text-neutral-400 leading-relaxed">
                      Sub-1.2s mobile load time. Instant tap response. Zero bloated plugins. Customers start chatting immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
