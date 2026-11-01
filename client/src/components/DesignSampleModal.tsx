import React from "react";
import { X, Check, Clock, ArrowRight, MessageCircle, ExternalLink, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export interface DesignVariation {
  id: string;
  title: string;
  archetype: string;
  accentColor: string; // e.g. "amber", "blue", "emerald", "purple"
  timeline: string;
  price: string;
  description: string;
  features: string[];
  mockupType: "browser" | "mobile" | "kanban" | "chat";
}

export interface ShowroomModel {
  id: string;
  name: string;
  category: "websites" | "saas" | "automation" | "brand";
  categoryLabel: string;
  tagline: string;
  startingPrice: string;
  variations: DesignVariation[];
}

interface DesignSampleModalProps {
  model: ShowroomModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignSampleModal({ model, isOpen, onClose }: DesignSampleModalProps) {
  if (!model) return null;

  const getAccentBorder = (color: string) => {
    switch (color) {
      case "amber": return "border-amber-500/40 hover:border-amber-500 text-amber-400";
      case "emerald": return "border-emerald-500/40 hover:border-emerald-500 text-emerald-400";
      case "blue": return "border-blue-500/40 hover:border-blue-500 text-blue-400";
      case "purple": return "border-purple-500/40 hover:border-purple-500 text-purple-400";
      default: return "border-amber-500/40 hover:border-amber-500 text-amber-400";
    }
  };

  const renderMiniMockup = (type: string, title: string, color: string) => {
    if (type === "mobile") {
      return (
        <div className="w-full h-32 bg-black/60 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-white/20 transition-all">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9px] font-mono text-neutral-400">⚡ 0.8s LCP · 4G Fast</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-2/3 h-2.5 rounded bg-white/20"></div>
            <div className="w-full h-2 rounded bg-white/10"></div>
            <div className="flex gap-1.5 mt-1">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">1-Tap UPI</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">WhatsApp RFQ</span>
            </div>
          </div>
          <div className="w-full py-1 rounded bg-green-600/80 text-[10px] text-center font-bold text-white flex items-center justify-center gap-1">
            <MessageCircle className="w-2.5 h-2.5" /> Order via WhatsApp
          </div>
        </div>
      );
    }

    if (type === "kanban") {
      return (
        <div className="w-full h-32 bg-black/60 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-white/20 transition-all">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9px] font-mono text-neutral-400">CRM Deal Pipeline</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono">0 Seat Tax</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 my-1">
            <div className="bg-white/5 p-1 rounded border border-white/5 text-[8px] text-neutral-300">
              <span className="font-bold text-amber-400">New (12)</span>
              <div className="w-full h-1.5 bg-white/10 rounded mt-1"></div>
            </div>
            <div className="bg-white/5 p-1 rounded border border-white/5 text-[8px] text-neutral-300">
              <span className="font-bold text-cyan-400">Quote (4)</span>
              <div className="w-full h-1.5 bg-cyan-500/20 rounded mt-1"></div>
            </div>
            <div className="bg-white/5 p-1 rounded border border-white/5 text-[8px] text-neutral-300">
              <span className="font-bold text-emerald-400">Won (8)</span>
              <div className="w-full h-1.5 bg-emerald-500/20 rounded mt-1"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-neutral-400 border-t border-white/5 pt-1">
            <span>WhatsApp Follow-ups</span>
            <span className="text-emerald-400">● Live Auto-Sync</span>
          </div>
        </div>
      );
    }

    if (type === "chat") {
      return (
        <div className="w-full h-32 bg-black/60 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-white/20 transition-all">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9px] font-mono text-green-400 flex items-center gap-1">
              <MessageCircle className="w-2.5 h-2.5" /> 24/7 Cloud API Bot
            </span>
            <span className="text-[8px] text-neutral-400 font-mono">Active</span>
          </div>
          <div className="space-y-1.5 my-1">
            <div className="max-w-[80%] bg-white/10 p-1.5 rounded-lg text-[9px] text-neutral-200">
              Customer: "Need price for 500 units"
            </div>
            <div className="max-w-[85%] bg-green-600/20 border border-green-500/30 p-1.5 rounded-lg text-[9px] text-green-200 ml-auto">
              Bot: "PDF Quote sent in 45s. Telecaller assigned."
            </div>
          </div>
          <div className="text-[8px] text-neutral-500 text-center font-mono">
            Zero Lead Decay · Auto Tally Log
          </div>
        </div>
      );
    }

    // Default: Browser Window Preview
    return (
      <div className="w-full h-32 bg-black/60 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-white/20 transition-all">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <div className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-[9px] font-mono text-neutral-400 truncate max-w-[150px]">sagedo.in/{model.id}</span>
        </div>
        <div className="space-y-1.5 my-1">
          <div className="w-3/4 h-3 rounded bg-amber-500/20"></div>
          <div className="w-1/2 h-2 rounded bg-white/10"></div>
          <div className="grid grid-cols-2 gap-1 mt-1">
            <div className="h-6 rounded bg-white/5 border border-white/5"></div>
            <div className="h-6 rounded bg-white/5 border border-white/5"></div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[8px] text-neutral-400 border-t border-white/5 pt-1">
          <span className="text-amber-400 font-semibold">Verified Architecture</span>
          <span>48h Prototype</span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-neutral-950 border border-white/10 p-0 text-white overflow-hidden rounded-2xl max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-white/10 bg-neutral-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              {model.categoryLabel} Showroom
            </Badge>
            <span className="text-xs text-neutral-400">• 4 Custom Design Variations</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Choose Your {model.name} Style
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
            {model.tagline} — Explore 4 distinct design archetypes engineered for this build. Tap any variation to lock it in on WhatsApp.
          </DialogDescription>
        </div>

        {/* Scrollable Variations Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {model.variations.map((variation, index) => {
              const waText = encodeURIComponent(
                `Hi Mukul! I was browsing the SAGE DO Showroom and I like the "${variation.title}" style for "${model.name}". Let's discuss starting the 48-hour functional prototype!`
              );

              return (
                <div
                  key={variation.id}
                  className="group relative p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Visual Mockup Header */}
                    <div className="mb-4">
                      {renderMiniMockup(variation.mockupType, variation.title, variation.accentColor)}
                    </div>

                    {/* Metadata Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                        {variation.archetype}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {variation.timeline}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                      {variation.title}
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {variation.description}
                    </p>

                    {/* Feature Checkmarks */}
                    <div className="space-y-1.5 mb-5">
                      {variation.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Dock */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500 block">Fixed Price</span>
                      <span className="text-lg font-black text-amber-400">{variation.price}</span>
                    </div>

                    <a
                      href={`https://wa.me/916284925684?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(`showroom_sample_${model.id}_${variation.id}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs shadow-lg shadow-green-500/20 transition-all hover:scale-105 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Lock In This Style
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Strip */}
        <div className="p-4 bg-neutral-900/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All styles backed by our <strong>48-Hour Functional Prototype Guarantee</strong>.</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs border-neutral-700 hover:bg-white/5 cursor-pointer"
          >
            Close Showroom
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
