import { 
  Layers, 
  MapPin, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Cpu
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
  whatWeDo: {
    title: string;
    detail: string;
  }[];
  schemaArtifacts: string[];
}

const PILLARS: EnginePillar[] = [
  {
    number: '01',
    badge: 'Google Maps',
    badgeColor: 'text-primary bg-primary/10 border-primary/20',
    icon: MapPin,
    title: 'Google Maps',
    subtitle: 'Show up when people search nearby',
    description: 'Google shows a few local businesses first. We fix the basics it looks at: a complete profile, correct details and consistent listings.',
    targetPlatforms: ['Google Maps', 'Google Search', 'Apple Maps', 'Local Voice Search'],
    whatWeDo: [
      {
        title: 'Complete Google profile',
        detail: 'Photos, hours, categories and business details set up properly.'
      },
      {
        title: 'Same details everywhere',
        detail: 'Same name, address and phone across directories and listings.'
      },
      {
        title: 'Direct call & WhatsApp links',
        detail: 'Tested buttons that connect customers directly to your phone or WhatsApp.'
      }
    ],
    schemaArtifacts: ['LocalBusiness', 'PostalAddress', 'GeoCoordinates', 'OpeningHoursSpecification']
  },
  {
    number: '02',
    badge: 'AI search answers',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    icon: Bot,
    title: 'AI search answers',
    subtitle: 'Be easy for AI to read',
    description: 'Tools like Google AI and Perplexity answer questions directly. They use businesses whose details are clear on the web. We make yours clear.',
    targetPlatforms: ['Google AI', 'Perplexity', 'SearchGPT', 'Answer Engines'],
    whatWeDo: [
      {
        title: 'Structured business details',
        detail: 'Products, services and details marked up so AI tools can read them without guessing.'
      },
      {
        title: 'Answers to customer questions',
        detail: 'Clear answers to common questions written the way customers actually ask.'
      },
      {
        title: 'Crawler access verified',
        detail: 'Your site can be read smoothly by Google and AI crawlers.'
      }
    ],
    schemaArtifacts: ['Service', 'FAQPage', 'Organization']
  },
  {
    number: '03',
    badge: 'ChatGPT and Gemini',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    icon: Sparkles,
    title: 'ChatGPT and Gemini',
    subtitle: 'Be easy to find when people ask',
    description: 'People now ask "best [your trade] near me". We organise your details and content so these tools can read them.',
    targetPlatforms: ['ChatGPT', 'Google Gemini', 'Microsoft Copilot', 'Conversational AI'],
    whatWeDo: [
      {
        title: 'Organised business content',
        detail: 'Clear information about what you sell, where you are and how to reach you.'
      },
      {
        title: 'Customer phrasing alignment',
        detail: 'Content written around how real customers search and ask for recommendations.'
      },
      {
        title: 'Fast and mobile-ready',
        detail: 'Pages load fast and work smoothly on any phone.'
      }
    ],
    schemaArtifacts: ['AboutPage', 'Brand', 'OfferCatalog']
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
            <span>Three Parts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            What we do
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            When someone nearby searches for what you sell, your business should show up with the right name, phone and hours across maps and AI search.
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

                {/* What We Do Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                  {pillar.whatWeDo.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-950/70 border border-neutral-800/70 rounded-xl p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>What we do</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Schema Artifacts Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span>Search engine markup:</span>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
