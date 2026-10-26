import React from "react";
import { MousePointerClick, Zap, MessageSquare, Database, ArrowRight, ArrowDown } from "lucide-react";

export default function SpeedToLeadInfographic() {
  const nodes = [
    {
      step: "01",
      icon: MousePointerClick,
      title: "Ad Click on 4G",
      sub: "Visitor taps your ad on Instagram / Google",
      badge: "Peak Intent",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10"
    },
    {
      step: "02",
      icon: Zap,
      title: "0.8s Instant Paint",
      sub: "Hand-coded site opens before they can blink",
      badge: "Zero Bounce Loss",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "42s WhatsApp Triage",
      sub: "Auto-qualifies budget, need & city in chat",
      badge: "Conversational Hook",
      color: "border-green-500/40 text-green-400 bg-green-500/10"
    },
    {
      step: "04",
      icon: Database,
      title: "Custom CRM Sync",
      sub: "Pushed to your phone · Zero monthly SaaS tax",
      badge: "100% Code Ownership",
      color: "border-primary/40 text-primary bg-primary/10"
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#0a0c12] border-b border-white/[0.08] relative overflow-hidden text-white" id="speed-to-lead-flow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            ⚡ 42-Second Conversion Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            The Speed-to-Lead <span className="text-emerald-400">Architecture</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            How we eliminate the two biggest killers of Indian B2B sales: 4-second website lag and 12-hour delayed callback.
          </p>
        </div>

        {/* Desktop View: Horizontal 4-Node Pipeline (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={idx} className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#12151e] border border-white/[0.08] shadow-lg group hover:border-primary/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-500">{node.step}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${node.color}`}>
                      {node.badge}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{node.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{node.sub}</p>
                </div>

                {/* Horizontal Arrow between cards */}
                {idx < nodes.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-neutral-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View: Vertical Animated Timeline (Shown only <1024px) */}
        <div className="lg:hidden space-y-4 max-w-md mx-auto">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full p-5 rounded-2xl bg-[#12151e] border border-white/[0.08] shadow-md flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-neutral-500">Node {node.step}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${node.color}`}>
                        {node.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{node.title}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{node.sub}</p>
                  </div>
                </div>

                {/* Downward Pulse Arrow between nodes */}
                {idx < nodes.length - 1 && (
                  <div className="py-2 text-neutral-500 animate-bounce">
                    <ArrowDown className="w-4 h-4 text-neutral-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
