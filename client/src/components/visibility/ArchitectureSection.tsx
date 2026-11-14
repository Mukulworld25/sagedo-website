import { 
  Layers, 
  MapPin, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Network,
  Share2
} from 'lucide-react';

interface EnginePillar {
  number: string;
  badge: string;
  badgeColor: string;
  icon: typeof MapPin;
  title: string;
  subtitle: string;
  description: string;
  targetPlatforms: string[];
  protocolSteps: {
    title: string;
    detail: string;
  }[];
  schemaArtifacts: string[];
}

const PILLARS: EnginePillar[] = [
  {
    number: '01',
    badge: 'Local Proximity Engine',
    badgeColor: 'text-primary bg-primary/10 border-primary/20',
    icon: MapPin,
    title: 'Google Maps 3-Pack & Local SEO',
    subtitle: 'Neighborhood Catchment & Proximity Intent',
    description: 'When potential customers search for services "near me" or within your city sector, Google prioritizes the Maps 3-Pack before organic listings. We build an airtight physical footprint that signals immediate proximity, verified business legitimacy, and active operational hours.',
    targetPlatforms: ['Google Maps', 'Google Search (Local Pack)', 'Apple Maps', 'Local Voice Search'],
    protocolSteps: [
      {
        title: 'Rigid NAP Synchronization',
        detail: 'Name, Address, and Phone standardization across Google Business Profile, Apple Business Connect, and top regional directories to eliminate citation ambiguity.'
      },
      {
        title: 'LocalBusiness Schema & GeoCoordinates',
        detail: 'Microdata and JSON-LD markup embedding latitude/longitude bounding polygons, neighborhood service areas, and localized opening schedules directly into page source.'
      },
      {
        title: 'Localized Mobile Action Pipeline',
        detail: 'Zero-friction tap-to-call and click-to-WhatsApp routing engineered to capture high-intent buyers ready to visit or call within the hour.'
      }
    ],
    schemaArtifacts: ['LocalBusiness', 'PostalAddress', 'GeoCoordinates', 'OpeningHoursSpecification']
  },
  {
    number: '02',
    badge: 'Factual Citation Engine',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    icon: Bot,
    title: 'Answer Engine Optimization (AEO)',
    subtitle: 'Direct Citations on Perplexity & Claude',
    description: 'Answer engines do not return 10 blue links; they synthesize a single, direct, factual answer with cited references. If your website lacks structured entity relationships, AI answer engines ignore your business. We engineer authoritative knowledge datasets so your company is directly cited as the definitive source.',
    targetPlatforms: ['Perplexity AI', 'Anthropic Claude', 'You.com', 'SearchGPT Synthesis'],
    protocolSteps: [
      {
        title: 'Semantic Entity Relationship Graphing',
        detail: 'Mapping your commercial capabilities, machinery, certifications, and medical specializations into unambiguous Schema.org entity graphs.'
      },
      {
        title: 'Structured Factual Q&A Matrices',
        detail: 'Authoring concise, fact-dense data blocks that match the exact syntax patterns used by retrieval-augmented generation (RAG) pipelines.'
      },
      {
        title: 'Multi-Engine Crawler Allowlisting',
        detail: 'Auditing robots.txt and serverless headers to ensure PerplexityBot, ClaudeBot, and research crawlers can ingest your structured data without blocking.'
      }
    ],
    schemaArtifacts: ['Service', 'FAQPage', 'Organization', 'MedicalSpecialty / TechnicalSpecification']
  },
  {
    number: '03',
    badge: 'Generative Synthesis Engine',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    icon: Sparkles,
    title: 'Generative Engine Optimization (GEO)',
    subtitle: 'Conversational Grounding on ChatGPT Search & Gemini',
    description: 'Conversational search engines evaluate context, intent, and multi-modal relevance when answering user recommendations. We optimize your digital presence for generative engines, ensuring your offerings are selected and recommended during complex multi-turn inquiries.',
    targetPlatforms: ['ChatGPT Search', 'Google Gemini', 'Microsoft Copilot', 'Meta AI'],
    protocolSteps: [
      {
        title: 'Conversational Prompt Alignment',
        detail: 'Anticipating real-world buyer prompts (e.g. "recommend an ISO-certified CNC workshop in Punjab that does titanium machining") and structuring context nodes to match.'
      },
      {
        title: 'Brand Entity Validation & Grounding',
        detail: 'Connecting external authority signals (certifications, trade portals, press citations) to establish high-confidence entity resolution.'
      },
      {
        title: 'Real-Time Content Freshness Architecture',
        detail: 'Pre-rendered static HTML with dynamic update pipelines ensuring conversational models read current pricing brackets and active capacity.'
      }
    ],
    schemaArtifacts: ['DefinedTermSet', 'AboutPage', 'Brand', 'OfferCatalog']
  }
];

export default function ArchitectureSection() {
  return (
    <div id="architecture" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tri-Engine Search Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            The Three Pillars of Modern Search Visibility
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Old-school SEO targeted keyword density and backlink volume. Modern visibility requires a unified tri-engine architecture designed simultaneously for geographic proximity, AI citation synthesis, and generative conversation.
          </p>
        </div>

        {/* 3 Pillar Cards Stack */}
        <div className="space-y-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-xl transition-all hover:border-neutral-700/80"
              >
                {/* Pillar Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl sm:text-3xl font-mono font-extrabold text-zinc-600">
                      {pillar.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded border ${pillar.badgeColor}`}>
                          {pillar.badge}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{pillar.title}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Platforms Supported */}
                  <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                    {pillar.targetPlatforms.map((plat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-950 text-zinc-400 border border-neutral-800 font-medium"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed my-6 max-w-4xl">
                  {pillar.description}
                </p>

                {/* Technical Protocol Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                  {pillar.protocolSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-950/70 border border-neutral-800/70 rounded-xl p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Protocol {idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Schema Artifacts Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span>Injected Schema Structures:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.schemaArtifacts.map((schema, sIdx) => (
                        <code
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-neutral-950 text-zinc-300 font-mono text-[10px] border border-neutral-800"
                        >
                          {schema}
                        </code>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Validated against Schema.org standards
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
