import { useState } from 'react';
import { 
  Target, 
  IndianRupee, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  MapPin,
  Bot,
  Stethoscope,
  Briefcase
} from 'lucide-react';
import { 
  trackChooserCompleted, 
  trackAddToScope, 
  trackWhatsAppClick 
} from '@/lib/telemetry';
import type { PersonaId } from './PersonaSwitcher';

interface NeedOption {
  id: string;
  label: string;
  description: string;
  badge: string;
}

interface BudgetOption {
  id: string;
  label: string;
  amount: string;
  description: string;
  tier: string;
}

interface UrgencyOption {
  id: string;
  label: string;
  timeframe: string;
  description: string;
}

const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'local_footfall',
    label: 'Local Footfall & Inbound Calls',
    description: 'Optimize Google Maps 3-Pack and voice search for nearby local customers.',
    badge: 'Maps 3-Pack SEO'
  },
  {
    id: 'b2b_rfqs',
    label: 'High-Value B2B RFQs & Procurement',
    description: 'Get cited on Perplexity and Claude for technical buyer and RFP queries.',
    badge: 'AEO Citations'
  },
  {
    id: 'patient_bookings',
    label: 'Patient Consultations & Inquiries',
    description: 'Establish clinical authority and secure qualified patient appointments.',
    badge: 'Clinical Authority'
  },
  {
    id: 'omnichannel_search',
    label: 'Full Multi-Engine Search Engine',
    description: 'Combined SEO + AEO + GEO architecture across Google, Perplexity & ChatGPT.',
    badge: 'Complete SEO+AEO+GEO'
  }
];

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    id: 'starter',
    label: '₹15,000 Starter',
    amount: '₹15,000',
    description: 'Single-location foundation, Google Maps 3-Pack & core schema setup.',
    tier: 'Single-Location'
  },
  {
    id: 'growth',
    label: '₹35,000 Growth',
    amount: '₹35,000',
    description: 'Multi-engine SEO + AEO entity integration & localized citation network.',
    tier: 'Multi-Engine Growth'
  },
  {
    id: 'scale',
    label: '₹50,000 Scale',
    amount: '₹50,000',
    description: 'Complete enterprise GEO, custom knowledge graph & continuous citation monitoring.',
    tier: 'Enterprise Scale'
  }
];

const URGENCY_OPTIONS: UrgencyOption[] = [
  {
    id: 'urgent_7d',
    label: '7 Days (Immediate Sprint)',
    timeframe: '7 Days',
    description: 'Priority sprint with rapid deployment under the 10-Gate QA standard.'
  },
  {
    id: 'rapid_14d',
    label: '14 Days (Standard Deployment)',
    timeframe: '14 Days',
    description: 'Comprehensive multi-engine build, citation indexing, and entity audit.'
  },
  {
    id: 'planning_30d',
    label: 'Planning / Flexible Rollout',
    timeframe: 'Planning',
    description: 'Strategic discovery, technical audit, and phased deployment roadmap.'
  }
];

const PERSONA_LABELS: Record<PersonaId, string> = {
  local_shop: 'Local Shop / Retail / Services',
  workshop: 'Manufacturer / Workshop',
  clinic: 'Clinic / Professional Practice'
};

const WHATSAPP_CONTACT = '916284925684';

interface ChooserWidgetProps {
  activePersona: PersonaId;
}

export default function ChooserWidget({ activePersona }: ChooserWidgetProps) {
  const [selectedNeed, setSelectedNeed] = useState<string>('local_footfall');
  const [selectedBudget, setSelectedBudget] = useState<string>('growth');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('rapid_14d');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const activeNeedObj = NEED_OPTIONS.find((n) => n.id === selectedNeed) || NEED_OPTIONS[0];
  const activeBudgetObj = BUDGET_OPTIONS.find((b) => b.id === selectedBudget) || BUDGET_OPTIONS[1];
  const activeUrgencyObj = URGENCY_OPTIONS.find((u) => u.id === selectedUrgency) || URGENCY_OPTIONS[1];

  const handleSubmit = () => {
    setIsSubmitting(true);

    const payload = {
      chooser_need: activeNeedObj.label,
      chooser_budget: activeBudgetObj.label,
      chooser_urgency: activeUrgencyObj.label,
      persona: activePersona,
    };

    // Telemetry dispatches
    trackChooserCompleted(payload);
    trackAddToScope(payload);
    trackWhatsAppClick(payload);

    // Deep-link to WhatsApp with pre-filled structured text
    const personaTitle = PERSONA_LABELS[activePersona] || 'Modern SMB';
    const message = `Hi SAGEDO team, I am interested in building a Modern Search Visibility engine.

• Business Model: ${personaTitle}
• Core Need: ${activeNeedObj.label}
• Target Budget: ${activeBudgetObj.label}
• Timeline: ${activeUrgencyObj.label}

Please share the scope and prototype roadmap.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_CONTACT}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div id="chooser" className="w-full py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Scope Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            3-Tap Need, Budget &amp; Urgency Chooser
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your core growth requirement, investment bracket, and timeline to configure your custom scope. We package your parameters directly into WhatsApp for instant engineer triage.
          </p>
        </div>

        {/* Main Chooser Box */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl">
          {/* Active Model Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-neutral-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-zinc-500 font-medium">Selected Model:</span>
              <span className="font-semibold text-white px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-md">
                {PERSONA_LABELS[activePersona]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Governed by 10-Gate Quality Assurance Standard</span>
            </div>
          </div>

          <div className="space-y-10">
            {/* TAP 1: Core Need */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs border border-primary/30">
                  1
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Select Your Primary Growth Need
                  </h3>
                  <p className="text-xs text-zinc-400">
                    What outcome does your business need to unlock first?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {NEED_OPTIONS.map((opt) => {
                  const isSelected = selectedNeed === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedNeed(opt.id)}
                      className={`relative flex flex-col justify-between p-4 rounded-xl text-left transition-all min-h-[110px] cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-2 border-primary shadow-lg shadow-primary/10'
                          : 'bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {opt.badge}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                          {opt.label}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAP 2: Budget Bracket */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs border border-primary/30">
                  2
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Select Your Investment Bracket
                  </h3>
                  <p className="text-xs text-zinc-400">
                    [COMMERCIAL_TERMS_DESCRIPTION]
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {BUDGET_OPTIONS.map((opt) => {
                  const isSelected = selectedBudget === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedBudget(opt.id)}
                      className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-xl text-left transition-all min-h-[110px] cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-2 border-primary shadow-lg shadow-primary/10'
                          : 'bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-zinc-300 border border-neutral-700">
                            {opt.tier}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="text-lg sm:text-xl font-extrabold text-white mb-1">
                          {opt.amount}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAP 3: Operational Urgency */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs border border-primary/30">
                  3
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Select Your Operational Timeline
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Governed delivery sprints verified by the SAGEDO Release Certificate.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {URGENCY_OPTIONS.map((opt) => {
                  const isSelected = selectedUrgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedUrgency(opt.id)}
                      className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-xl text-left transition-all min-h-[100px] cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-2 border-primary shadow-lg shadow-primary/10'
                          : 'bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-zinc-300 border border-neutral-700">
                            Sprint Target
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                          {opt.label}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scope Summary & WhatsApp Submission Row */}
          <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-neutral-950/50 p-6 rounded-xl border border-neutral-800/80">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configured Scope Summary</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {activeNeedObj.label} • {activeBudgetObj.amount} • {activeUrgencyObj.timeframe}
              </div>
              <p className="text-xs text-zinc-400">
                Direct WhatsApp consultation with SAGEDO engineering leads. No sales reps, no endless discovery calls.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-lg shadow-primary/20 min-h-[44px] cursor-pointer disabled:opacity-75"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Opening WhatsApp...' : 'Add to Custom Scope & Connect on WhatsApp'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
