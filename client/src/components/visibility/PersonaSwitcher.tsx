import { useState } from 'react';
import { m } from 'framer-motion';
import { 
  Store, 
  Wrench, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Bot, 
  Sparkles, 
  MapPin, 
  ShieldCheck,
  Globe,
  FileCheck
} from 'lucide-react';
import { trackPersonaSelected } from '@/lib/telemetry';

export type PersonaId = 'local_shop' | 'workshop' | 'clinic';

interface PersonaData {
  id: PersonaId;
  label: string;
  sublabel: string;
  icon: typeof Store;
  headline: string;
  tagline: string;
  targetAudience: string;
  primaryNeed: string;
  vectors: {
    seo: {
      title: string;
      desc: string;
    };
    aeo: {
      title: string;
      desc: string;
    };
    geo: {
      title: string;
      desc: string;
    };
  };
  prototype: {
    query: string;
    engine: string;
    responseSnippet: string;
    keyDeliverables: string[];
    sampleTag: string;
  };
}

const PERSONAS: Record<PersonaId, PersonaData> = {
  local_shop: {
    id: 'local_shop',
    label: 'Shop / Retail / Services',
    sublabel: 'Shop / Retail / Services',
    icon: Store,
    headline: 'Be the shop people find when they search nearby',
    tagline: 'Customers search "near me" and call the first few names they see. We make sure yours is complete, correct and easy to call.',
    targetAudience: 'Local retail shops, showrooms and service businesses.',
    primaryNeed: 'More walk-ins and calls',
    vectors: {
      seo: {
        title: 'Google Maps',
        desc: 'Complete profile with photos, hours and categories. Same name, address and phone on every listing.'
      },
      aeo: {
        title: 'AI Search Answers',
        desc: 'Clear details on the web so Google AI and Perplexity can read your business info.'
      },
      geo: {
        title: 'ChatGPT and Gemini',
        desc: 'Organised details and content so conversational tools can find and recommend your shop.'
      }
    },
    prototype: {
      query: 'Electrical hardware and lighting shop near Sector 22 Chandigarh',
      engine: 'Google Maps & AI Search',
      sampleTag: 'Sample Search',
      responseSnippet: 'SAGEDO-verified business details with opening hours, address and direct WhatsApp contact for stock availability.',
      keyDeliverables: [
        'Complete Google profile with photos, hours and categories.',
        'Same name, address and phone on every listing.',
        'Call and WhatsApp buttons that reach you directly.'
      ]
    }
  },
  workshop: {
    id: 'workshop',
    label: 'Manufacturer / Workshop',
    sublabel: 'Manufacturer / Workshop',
    icon: Wrench,
    headline: 'Be the supplier buyers can find and check',
    tagline: 'Buyers look up suppliers online before they send an enquiry. We make what you make, where you are and how to reach you clear.',
    targetAudience: 'Manufacturers, industrial workshops and fabrication units.',
    primaryNeed: 'More business enquiries',
    vectors: {
      seo: {
        title: 'Google Maps & Search',
        desc: 'Clear location and business profile so buyers can verify your workshop.'
      },
      aeo: {
        title: 'AI Search Answers',
        desc: 'Product and capability details that answer technical buyer questions directly.'
      },
      geo: {
        title: 'ChatGPT and Gemini',
        desc: 'Structured details so AI search tools can find your capabilities when buyers ask.'
      }
    },
    prototype: {
      query: 'CNC milling and fabrication workshop in Ludhiana',
      engine: 'AI Search & Listings',
      sampleTag: 'Sample Search',
      responseSnippet: 'SAGEDO-verified workshop profile with capabilities, location and direct WhatsApp enquiry link.',
      keyDeliverables: [
        'Product and capability pages buyers can read.',
        'Business profile and listings that match.',
        'An enquiry button that goes to WhatsApp or phone.'
      ]
    }
  },
  clinic: {
    id: 'clinic',
    label: 'Clinic / Practice',
    sublabel: 'Clinic / Practice',
    icon: Stethoscope,
    headline: 'Be the practice people trust at first glance',
    tagline: 'People check reviews, timings and location before they call. We make sure the details are right and easy to find.',
    targetAudience: 'Clinics, dental practices, diagnostic centres and healthcare specialists.',
    primaryNeed: 'More patient enquiries',
    vectors: {
      seo: {
        title: 'Google Maps & Search',
        desc: 'Profile with services, timings and location so patients can find you easily.'
      },
      aeo: {
        title: 'AI Search Answers',
        desc: 'Pages that answer common patient questions directly.'
      },
      geo: {
        title: 'ChatGPT and Gemini',
        desc: 'Clear practice details and timings organised for AI search tools.'
      }
    },
    prototype: {
      query: 'Dental clinic in Panchkula with evening hours',
      engine: 'AI Search & Maps',
      sampleTag: 'Sample Search',
      responseSnippet: 'SAGEDO-verified clinic profile with services, timings, location and one-tap booking.',
      keyDeliverables: [
        'Profile with services, timings and location.',
        'Pages that answer common patient questions.',
        'One-tap call or WhatsApp booking.'
      ]
    }
  }
};

interface PersonaSwitcherProps {
  activePersona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  onConfigureClick?: (persona: PersonaId) => void;
}

export default function PersonaSwitcher({
  activePersona,
  onPersonaChange,
  onConfigureClick
}: PersonaSwitcherProps) {
  const current = PERSONAS[activePersona] || PERSONAS.local_shop;

  const handleSelect = (id: PersonaId) => {
    if (id !== activePersona) {
      onPersonaChange(id);
      trackPersonaSelected(id);
    }
  };

  return (
    <div id="personas" className="w-full py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pick your kind of business</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Pick your kind of business
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            When someone nearby searches for what you sell, your business should show up with the right name, phone and hours.
          </p>
        </div>

        {/* Persona Segmented Control Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 bg-neutral-900/80 border border-neutral-800 rounded-xl max-w-3xl mx-auto mb-8 backdrop-blur-sm">
          {(Object.keys(PERSONAS) as PersonaId[]).map((key) => {
            const persona = PERSONAS[key];
            const Icon = persona.icon;
            const isActive = activePersona === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className={`relative flex items-center justify-center gap-2.5 w-full sm:w-1/3 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-neutral-800/40'
                }`}
                aria-pressed={isActive}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-zinc-400'}`} />
                <span className="font-semibold text-xs sm:text-sm">{persona.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Persona Content Card with CLS-eliminating min-height container */}
        <div className="relative min-h-[580px] sm:min-h-[540px] md:min-h-[500px] w-full">
          <m.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-xl"
          >
            {/* Persona Hero Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/70">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <current.icon className="w-4 h-4" />
                  <span>{current.sublabel}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                  {current.headline}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {current.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onConfigureClick?.(current.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-colors min-h-[44px] shadow-sm shadow-primary/20"
                >
                  <span>See it for your business</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-zinc-500 text-center flex items-center justify-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Our 10-point checklist</span>
                </div>
              </div>
            </div>

            {/* Tri-Engine Vector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
              {/* Vector 1: SEO */}
              <div className="bg-neutral-950/60 border border-neutral-800/60 rounded-xl p-5 hover:border-neutral-700/80 transition-colors">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>01 Google Maps</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  {current.vectors.seo.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {current.vectors.seo.desc}
                </p>
              </div>

              {/* Vector 2: AEO */}
              <div className="bg-neutral-950/60 border border-neutral-800/60 rounded-xl p-5 hover:border-neutral-700/80 transition-colors">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Bot className="w-4 h-4" />
                  <span>02 AI search answers</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  {current.vectors.aeo.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {current.vectors.aeo.desc}
                </p>
              </div>

              {/* Vector 3: GEO */}
              <div className="bg-neutral-950/60 border border-neutral-800/60 rounded-xl p-5 hover:border-neutral-700/80 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>03 ChatGPT and Gemini</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  {current.vectors.geo.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {current.vectors.geo.desc}
                </p>
              </div>
            </div>

            {/* Prototype & Deliverables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-neutral-800/70">
              {/* Sample Prototype Mockup Card */}
              <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Search className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[11px] truncate">{current.prototype.engine}</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {current.prototype.sampleTag}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-neutral-900/90 rounded-lg p-3 text-xs text-zinc-300 font-mono flex items-start gap-2 border border-neutral-800">
                    <span className="text-primary font-bold shrink-0">Search query:</span>
                    <span className="text-zinc-200">"{current.prototype.query}"</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-neutral-800/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Search &amp; AI Result</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {current.prototype.responseSnippet}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>SAGEDO Search Visibility</span>
                </div>
              </div>

              {/* Concrete Deliverables Checklist */}
              <div className="lg:col-span-5 bg-neutral-950/40 border border-neutral-800/60 rounded-xl p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>What you get</span>
                </h4>
                <ul className="space-y-2.5">
                  {current.prototype.keyDeliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
