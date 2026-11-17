import { m } from 'framer-motion';
import { 
  Search, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  MapPin
} from 'lucide-react';

interface VisibilityHeroProps {
  onConfigureClick?: () => void;
  onExplorePersonasClick?: () => void;
}

export default function VisibilityHero({
  onConfigureClick,
  onExplorePersonasClick
}: VisibilityHeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill / Badge */}
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 border border-neutral-800 text-zinc-300 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-primary font-bold">Multi-Engine Search Architecture</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">SEO + AEO + GEO</span>
          </m.div>

          {/* Primary Headline */}
          <m.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            Modern Search Visibility — <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-primary to-amber-500">
              SEO + AEO + GEO
            </span>
          </m.h1>

          {/* Subheading */}
          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Build your local search presence across Google Maps 3-Pack, Answer Engines (Perplexity, Claude), and Generative Search (ChatGPT Search, Google Gemini). Engineered specifically for North Indian local businesses, workshops, and healthcare clinics.
          </m.p>

          {/* CTA Group */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              type="button"
              onClick={() => {
                if (onConfigureClick) onConfigureClick();
                else scrollTo('chooser');
              }}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-lg shadow-primary/25 min-h-[44px] cursor-pointer"
            >
              <span>Configure Your Visibility Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onExplorePersonasClick) onExplorePersonasClick();
                else scrollTo('personas');
              }}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-zinc-200 border border-neutral-700 font-medium text-sm transition-colors min-h-[44px] cursor-pointer"
            >
              <span>Explore Tailored Personas</span>
            </button>
          </m.div>

          {/* Trust Standard Banner */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Governed by our 10-point visibility checklist</span>
            </div>
          </m.div>
        </div>

        {/* 3 Pillars Overview Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
          {/* Pillar 1 */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Pillar 1: Local SEO</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Google Maps 3-Pack Visibility
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Localized NAP alignment, high-relevance proximity signals, and GeoCoordinates schema to capture immediate neighborhood footfall.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4" />
              <span>Pillar 2: AEO Citations</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Answer Engine Optimization
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Structured entity knowledge graphs for Perplexity and Claude, answering technical buyer and clinical questions with direct citations.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Pillar 3: GEO Grounding</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Generative Engine Optimization
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Context-grounded knowledge sets and conversational prompt alignment for ChatGPT Search and Google Gemini recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
