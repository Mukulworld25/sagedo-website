import { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { 
  trackChooserCompleted, 
  trackAddToScope, 
  trackWhatsAppClick 
} from '@/lib/telemetry';
import type { PersonaId } from './PersonaSwitcher';
import { WhatsAppIcon } from '@/components/icons/PlatformIcons';

interface NeedOption {
  id: string;
  label: string;
  description: string;
  badge: string;
}

interface BudgetOption {
  id: string;
  label: string;
}

interface UrgencyOption {
  id: string;
  label: string;
}

const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'local_footfall',
    label: 'More walk-ins and calls',
    description: 'When people nearby search for what you sell, show up first on Google Maps.',
    badge: 'Maps'
  },
  {
    id: 'b2b_rfqs',
    label: 'More business enquiries',
    description: 'Make what you make and how to reach you clear so buyers find and check you.',
    badge: 'Enquiries'
  },
  {
    id: 'patient_bookings',
    label: 'More patient enquiries',
    description: 'Verified clinic details, reviews, and one-tap booking for patients.',
    badge: 'Bookings'
  },
  {
    id: 'omnichannel_search',
    label: 'Everything: Maps and AI search',
    description: 'Complete setup across Google Maps, Google AI, Perplexity, ChatGPT and Gemini.',
    badge: 'Maps + AI'
  }
];

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    id: 'starter',
    label: 'Up to ₹15,000'
  },
  {
    id: 'growth',
    label: '₹15,000–₹35,000'
  },
  {
    id: 'scale',
    label: '₹35,000+'
  },
  {
    id: 'not_sure',
    label: 'Not sure yet'
  }
];

const URGENCY_OPTIONS: UrgencyOption[] = [
  {
    id: 'urgent_7d',
    label: 'This week'
  },
  {
    id: 'rapid_14d',
    label: 'This month'
  },
  {
    id: 'planning_30d',
    label: 'Just planning'
  }
];

const PERSONA_LABELS: Record<PersonaId, string> = {
  local_shop: 'Shop / Retail / Services',
  workshop: 'Manufacturer / Workshop',
  clinic: 'Clinic / Practice'
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
    const personaTitle = PERSONA_LABELS[activePersona] || 'Shop / Retail / Services';
    const message = `Hi SAGEDO team, I'd like help getting my business found on Google Maps and AI search.
• Business: ${personaTitle}
• Need: ${activeNeedObj.label}
• Budget: ${activeBudgetObj.label}
• Start: ${activeUrgencyObj.label}
Please send me a plan.`;

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
            <span>Tell us what you need</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Tell us what you need
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Three taps. Your choices come to us on WhatsApp and we reply there.
          </p>
        </div>

        {/* Main Chooser Box */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl">
          {/* Active Model Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-neutral-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-zinc-500 font-medium">Selected business type:</span>
              <span className="font-semibold text-white px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-md">
                {PERSONA_LABELS[activePersona]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Our 10-point checklist</span>
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
                    What do you want most?
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Pick what you want to unlock first.
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
                    Roughly what budget?
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Pick the closest. We'll quote within it.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {BUDGET_OPTIONS.map((opt) => {
                  const isSelected = selectedBudget === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedBudget(opt.id)}
                      className={`relative flex items-center justify-between p-4 sm:p-5 rounded-xl text-left transition-all min-h-[72px] cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-2 border-primary shadow-lg shadow-primary/10'
                          : 'bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-sm sm:text-base font-bold text-white">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      )}
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
                    When do you want to start?
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Pick your preferred start timing.
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
                      className={`relative flex items-center justify-between p-4 sm:p-5 rounded-xl text-left transition-all min-h-[72px] cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-2 border-primary shadow-lg shadow-primary/10'
                          : 'bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-sm sm:text-base font-bold text-white">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      )}
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
                <span>Your pick</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {activeNeedObj.label} · {activeBudgetObj.label} · {activeUrgencyObj.label}
              </div>
              <p className="text-xs text-zinc-400">
                You'll chat with the SAGEDO team on WhatsApp. No obligation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm transition-all shadow-lg shadow-[#25D366]/30 min-h-[44px] cursor-pointer disabled:opacity-75"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>
                  {isSubmitting ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
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
