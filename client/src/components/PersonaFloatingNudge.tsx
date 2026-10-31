import React, { useState, useEffect } from "react";
import { X, Sparkles, Factory, Store, Rocket, Stethoscope } from "lucide-react";
import { PersonaId } from "./PersonaCalibrationEngine";

export default function PersonaFloatingNudge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("sagedo_nudge_dismissed");
    if (isDismissed) return;

    // Timer to show after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: PersonaId) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sagedo_nudge_dismissed", "true");
      setIsVisible(false);

      // Dispatch event to calibrate page
      window.dispatchEvent(new CustomEvent("sagedo:set-persona", { detail: id }));

      // Smooth scroll to the calibration section
      const el = document.getElementById("what-do-you-run");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sagedo_nudge_dismissed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto max-w-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="p-3 sm:p-4 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-amber-500/40 shadow-[0_12px_45px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center gap-3 text-white">
        
        {/* Text Prompt */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold shrink-0 text-center sm:text-left">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 hidden sm:inline" />
          <span>Tailor SAGE DO for your business:</span>
        </div>

        {/* 4 Interactive Quick Pills */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => handleSelect("factory")}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-500 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Factory className="w-3.5 h-3.5" /> Factory
          </button>

          <button
            type="button"
            onClick={() => handleSelect("shop")}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-500 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" /> Shop
          </button>

          <button
            type="button"
            onClick={() => handleSelect("startup")}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-500 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5" /> Startup
          </button>

          <button
            type="button"
            onClick={() => handleSelect("practice")}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-500 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" /> Clinic
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-auto p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          title="Dismiss"
          aria-label="Dismiss personalization"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
