import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Zap, Clock, ShieldAlert, Sparkles } from "lucide-react";

export default function DevToolsCrimeScene() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section className="py-20 sm:py-28 bg-[#0b0d13] border-b border-white/[0.08] relative overflow-hidden text-white" id="devtools-comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> DevTools Forensic Teardown
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Why 40% of Your Ad Budget Dies <br className="hidden sm:inline" />
            <span className="text-primary">Before Your Website Even Opens</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Compare a typical ₹50,000 bloated agency theme against SAGE DO's hand-coded architecture. 
            Drag the slider to inspect the network crime scene.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#12151e] border border-white/[0.08] p-4 sm:p-8 shadow-[0_12px_50px_rgba(0,0,0,0.6)]">
          
          {/* Top Rupee Business Translation (For Clinic & SMB Owners) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            
            {/* Left Business Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-red-950/25 border border-red-500/30">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldAlert className="w-4 h-4" /> The Agency Trap (₹50,000 Template)
              </div>
              <p className="text-lg sm:text-xl font-black text-white">
                "4 out of 10 ad visitors bounce before your phone number even loads."
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                Running ₹1,200/day in Meta ads? You lose ~₹14,400/month in wasted clicks on 4.8-second 4G load delays.
              </p>
            </div>

            {/* Right Business Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" /> The SAGE DO Standard (Hand-Coded)
              </div>
              <p className="text-lg sm:text-xl font-black text-white">
                "Opens faster than WhatsApp — captures 2.4x more inquiries from the exact same ad spend."
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                Sub-0.8s mobile paint on raw 4G. Zero bloated plugins. Every ad click is instantly converted.
              </p>
            </div>

          </div>

          {/* Interactive Drag Slider Visual */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-inner">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161922] border-b border-white/[0.08] text-xs font-mono text-neutral-400">
              <span>DevTools Network Waterfall &amp; Lighthouse Metrics</span>
              <span className="hidden sm:inline">Drag Slider Left / Right ↔</span>
            </div>

            {/* Dual Panel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
              
              {/* Left Panel: The Bloated Crime Scene */}
              <div className="p-5 sm:p-7 bg-[#160a0a]/90 border-r border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                      WordPress / Agency Theme
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      Score: 42 / 100
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-red-950/40 border border-red-500/20 text-red-200">
                      <span>Total HTTP Requests:</span>
                      <strong className="text-red-400 text-sm">118 requests</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-red-950/40 border border-red-500/20 text-red-200">
                      <span>Render-Blocking CSS/JS:</span>
                      <strong className="text-red-400 text-sm">14 heavy files</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-red-950/40 border border-red-500/20 text-red-200">
                      <span>Page Payload Weight:</span>
                      <strong className="text-red-400 text-sm">4.2 MB</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-red-950/40 border border-red-500/20 text-red-200">
                      <span>Mobile 4G Load Delay:</span>
                      <strong className="text-red-400 text-sm">4.8 seconds</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-500/20 text-[11px] text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>53% of mobile visitors abandon if load takes &gt; 3 seconds.</span>
                </div>
              </div>

              {/* Right Panel: SAGE DO Architecture */}
              <div className="p-5 sm:p-7 bg-[#0a1410]/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      SAGE DO Hand-Coded Architecture
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Score: 98 / 100
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-200">
                      <span>Total HTTP Requests:</span>
                      <strong className="text-emerald-400 text-sm">18 requests</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-200">
                      <span>Render-Blocking Files:</span>
                      <strong className="text-emerald-400 text-sm">0 (Zero bloat)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-200">
                      <span>Page Payload Weight:</span>
                      <strong className="text-emerald-400 text-sm">140 KB (Lean)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-200">
                      <span>Mobile 4G Load Delay:</span>
                      <strong className="text-emerald-400 text-sm">0.8 seconds</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Sub-second mobile delivery captures the buyer while intent is peak.</span>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Slider Control for Mobile / Desktop Touch */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>We audit and hand-code every kilobyte before your domain goes live.</span>
            </span>
            <a
              href="#calculator"
              className="font-semibold text-primary hover:text-red-400 transition-colors underline"
            >
              Test your revenue leakage on the calculator below ↓
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
