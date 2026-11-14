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
    label: 'Local Shop & Retail',
    sublabel: 'Retailers, Showrooms & Local Services',
    icon: Store,
    headline: 'Capture High-Intent Footfall & Direct Phone Calls Within Your Immediate Catchment',
    tagline: 'Engineered for neighborhood retailers, electronics showrooms, hardware stores, and local service providers in North India.',
    targetAudience: 'Local retail stores, boutique showrooms, distributors, and neighborhood service specialists.',
    primaryNeed: 'Local Footfall & Inbound Calls',
    vectors: {
      seo: {
        title: 'Google Maps 3-Pack & Local SEO',
        desc: 'Rigid NAP (Name, Address, Phone) consistency across major directories, localized geo-coordinates, verified photo syndication, and neighborhood landing page schema.'
      },
      aeo: {
        title: 'Answer Engine Optimization (Perplexity & Claude)',
        desc: 'Structured local business entity graphs and real-time inventory/service schemas ensuring AI answer engines cite your physical store for "near me" inquiries.'
      },
      geo: {
        title: 'Generative Engine Optimization (ChatGPT Search & Gemini)',
        desc: 'Semantic FAQ matrices and direct conversational citation grounding so AI agents recommend your shop when users ask for trusted local recommendations.'
      }
    },
    prototype: {
      query: 'Best electrical hardware and lighting showroom near Sector 22 Chandigarh with genuine warranty',
      engine: 'ChatGPT Search & Google Maps Preview',
      sampleTag: 'Sample Prototype — Retail Search Architecture',
      responseSnippet: 'SAGEDO-structured local catalog identified with verified physical address, current opening hours, and direct WhatsApp contact for stock availability.',
      keyDeliverables: [
        'Google Business Profile complete audit & local citation sync',
        'LocalBusiness Schema.org JSON-LD with geo-fencing coordinates',
        'Direct "Click-to-WhatsApp" and "Tap-to-Call" mobile action flow',
        'Neighborhood catchment page optimized for local voice search'
      ]
    }
  },
  workshop: {
    id: 'workshop',
    label: 'Manufacturer & Workshop',
    sublabel: 'Industrial Units, Fabrication & OEMs',
    icon: Wrench,
    headline: 'Win High-Value B2B RFQs and OEM Procurement Contracts Across Industrial Clusters',
    tagline: 'Engineered for CNC workshops, metal fabricators, packaging manufacturers, and industrial suppliers in Mohali, Ludhiana, and North Indian industrial belts.',
    targetAudience: 'Precision machining workshops, industrial component fabricators, auto parts vendors, and contract manufacturers.',
    primaryNeed: 'High-Value B2B RFQs & Procurement Inquiries',
    vectors: {
      seo: {
        title: 'Industrial Keyword & Cluster SEO',
        desc: 'Technical capability indexing targeting buyer intent keywords like "custom sheet metal stamping supplier Punjab" and "precision CNC turning job work".'
      },
      aeo: {
        title: 'Answer Engine Optimization (Perplexity & Claude)',
        desc: 'Machine specification tables, tolerance parameters (±0.01mm), and material grade documentation formatted for technical citation by procurement agents.'
      },
      geo: {
        title: 'Generative Engine Optimization (ChatGPT Search & Gemini)',
        desc: 'Structured entity relationships tying your factory certifications (ISO, MSME) directly into AI procurement intelligence searches.'
      }
    },
    prototype: {
      query: 'ISO certified CNC milling workshop in Ludhiana capable of titanium and stainless steel machining',
      engine: 'Perplexity AI & Claude Citation Preview',
      sampleTag: 'Sample Prototype — Industrial B2B Search Architecture',
      responseSnippet: 'Verified facility profile listing active machine capabilities, factory floor certifications, technical RFQ submission gateway, and engineering lead contact.',
      keyDeliverables: [
        'Technical Machine Capability Catalog with structured specs schema',
        'B2B RFQ capture interface with drawing upload and instant WhatsApp notification',
        'Industrial cluster citation syndication (IndiaMART, TradeIndia, Google Business)',
        'Engineering entity graph linking machine models to material processing tolerances'
      ]
    }
  },
  clinic: {
    id: 'clinic',
    label: 'Clinic & Practice',
    sublabel: 'Doctors, Dentists & Professional Practices',
    icon: Stethoscope,
    headline: 'Establish Clinical Authority & Secure High-Intent Patient Consultations',
    tagline: 'Engineered for dental clinics, diagnostic centers, eye specialists, and medical practitioners seeking qualified local patient appointments.',
    targetAudience: 'Specialist physicians, dental surgeons, physiotherapy clinics, and diagnostic centers.',
    primaryNeed: 'Patient Consultations & Inquiries',
    vectors: {
      seo: {
        title: 'Medical Authority & Maps 3-Pack',
        desc: 'Google Business Profile optimized for medical specializations, accepted insurance, verified clinic timings, and physician qualification credentials.'
      },
      aeo: {
        title: 'Answer Engine Optimization (Perplexity & Claude)',
        desc: 'Condition-specific patient education schemas and practitioner credibility matrices that answer medical query prompts with your clinic details.'
      },
      geo: {
        title: 'Generative Engine Optimization (ChatGPT Search & Gemini)',
        desc: 'Conversational symptom-to-specialist matching profiles grounded in verified clinical qualifications and direct appointment booking pathways.'
      }
    },
    prototype: {
      query: 'Experienced pediatric dentist in Panchkula with painless laser treatment for children',
      engine: 'ChatGPT Search & Perplexity Medical Entity Preview',
      sampleTag: 'Sample Prototype — Healthcare Clinical Architecture',
      responseSnippet: 'Verified medical specialist card displaying verified degrees, clinic address, hygiene protocols, and 1-tap WhatsApp consultation slot inquiry.',
      keyDeliverables: [
        'Physician & MedicalClinic Schema.org structured credentialing markup',
        'Treatment-specific landing architecture for specialized clinical services',
        'Frictionless patient appointment booking integration via WhatsApp',
        'Google Health & Local Maps compliance verification'
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
            <span>North India SMB Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Tailored For Your Exact Business Reality
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Search visibility is not one-size-fits-all. A local retail store needs physical footfall within 5 kilometers, while an industrial workshop requires high-value B2B procurement citations across North India.
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
                  <span>Configure for This Model</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-zinc-500 text-center flex items-center justify-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10-Gate Quality Assurance Standard</span>
                </div>
              </div>
            </div>

            {/* Tri-Engine Vector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
              {/* Vector 1: SEO */}
              <div className="bg-neutral-950/60 border border-neutral-800/60 rounded-xl p-5 hover:border-neutral-700/80 transition-colors">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Local SEO Pillar</span>
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
                  <span>AEO Answer Engine</span>
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
                  <span>GEO Generative AI</span>
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
                    <span className="text-primary font-bold shrink-0">User Query:</span>
                    <span className="text-zinc-200">"{current.prototype.query}"</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-neutral-800/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Synthesized Multi-Engine Citation Grounding</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {current.prototype.responseSnippet}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Architecture Model: SAGEDO Multi-Pillar Engine</span>
                  <span className="text-zinc-400 font-medium">Zero Hallucination Grounding</span>
                </div>
              </div>

              {/* Concrete Deliverables Checklist */}
              <div className="lg:col-span-5 bg-neutral-950/40 border border-neutral-800/60 rounded-xl p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Deployment Deliverables</span>
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
