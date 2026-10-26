import React from "react";
import { ShieldCheck, Check, Server, FileSpreadsheet, Lock } from "lucide-react";

export default function SovereignGuaranteeCard() {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#141722] border border-primary/25 shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-white">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white">The Sovereign Execution Guarantee</h4>
          <p className="text-xs text-neutral-400">Zero Blind Risk · Defense-Grade Commercial Terms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/[0.08] text-xs">
        
        {/* Term 1 */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
            <Check className="w-4 h-4 shrink-0" />
            <span>50% Milestone Gating</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            50% deposit to commence architecture. Remaining 50% paid strictly after passing our 30-point QA speed &amp; security audit.
          </p>
        </div>

        {/* Term 2 */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
          <div className="flex items-center gap-1.5 font-bold text-primary mb-1">
            <Lock className="w-4 h-4 shrink-0" />
            <span>100% Code &amp; Data Ownership</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Full GitHub repository and PostgreSQL database handover. No proprietary vendor lock-in. Zero monthly per-seat SaaS taxes.
          </p>
        </div>

        {/* Term 3 */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
          <div className="flex items-center gap-1.5 font-bold text-sky-400 mb-1">
            <Server className="w-4 h-4 shrink-0" />
            <span>Day-2 Operations Included</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Runs on your own ₹800/mo VPS or our managed ScaleOps care plan. Free Excel/Tally customer data import + staff onboarding included.
          </p>
        </div>

      </div>
    </div>
  );
}
