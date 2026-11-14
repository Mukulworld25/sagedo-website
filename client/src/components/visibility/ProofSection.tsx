import { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Sparkles, 
  Bot, 
  MapPin, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface GateItem {
  gateNumber: number;
  name: string;
  focus: string;
  criteria: string;
}

const TEN_GATES: GateItem[] = [
  {
    gateNumber: 1,
    name: 'Schema.org & JSON-LD Validation',
    focus: 'Entity Syntax',
    criteria: 'Zero syntax errors or missing required fields in LocalBusiness, Service, and FAQPage schemas via validator tools.'
  },
  {
    gateNumber: 2,
    name: 'Multi-Engine Bot Crawler Emulation',
    focus: 'Crawl Accessibility',
    criteria: 'Verified 200 OK responses with unblocked access for Googlebot, PerplexityBot, ClaudeBot, and GPTBot in robots.txt.'
  },
  {
    gateNumber: 3,
    name: 'Mobile LCP & Viewport Layout Enforcement',
    focus: 'Core Web Vitals',
    criteria: 'Clean layout responsiveness down to 360px viewport width with zero horizontal overflow and swift mobile content render.'
  },
  {
    gateNumber: 4,
    name: 'Local NAP & Geo-Coordinates Sync',
    focus: 'Proximity Accuracy',
    criteria: 'Exact Name, Address, and Phone matching across Google Business Profile, Apple Maps, and local directory citations.'
  },
  {
    gateNumber: 5,
    name: 'AEO Factual Accuracy & Semantic Graphing',
    focus: 'Direct AI Citations',
    criteria: 'Unambiguous linking of machine models, pricing brackets, and clinical specialties into machine-readable knowledge nodes.'
  },
  {
    gateNumber: 6,
    name: 'GEO Conversational Intent Grounding',
    focus: 'Generative Context',
    criteria: 'Authoring context blocks that match high-intent conversational prompts in ChatGPT Search and Google Gemini.'
  },
  {
    gateNumber: 7,
    name: 'Conversion Action & WhatsApp Routing',
    focus: 'Inbound Inquiries',
    criteria: 'End-to-end verification of click-to-call, click-to-WhatsApp, and contact triggers with pre-filled structured parameters.'
  },
  {
    gateNumber: 8,
    name: 'DPDP Act 2023 Consent & First-Party Privacy',
    focus: 'Data Sovereignty',
    criteria: 'Strict affirmative consent gating before any telemetry dispatch; zero persistent IP storage, zero scroll tracking, zero third-party ads.'
  },
  {
    gateNumber: 9,
    name: 'Zero-CLS Layout Stabilization',
    focus: 'Visual Stability',
    criteria: 'Fixed min-height component containers preventing Cumulative Layout Shift during client-side state transitions.'
  },
  {
    gateNumber: 10,
    name: 'SAGEDO Release Certificate & Handover',
    focus: 'Sovereign Warranty',
    criteria: 'Formal inspection audit sign-off with full source code ownership and complete credential handover to the client.'
  }
];

export default function ProofSection() {
  const [activeTab, setActiveTab] = useState<'gates' | 'prototypes'>('gates');

  return (
    <div id="proof" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commercial Assurance Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            The 10-Gate Quality Assurance Standard
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every visibility system deployed by SAGEDO is verified through an objective 10-gate quality inspection checklist. [COMMERCIAL_DELIVERY_MODEL_CLAIM]
          </p>
        </div>

        {/* Commercial Guarantee Callout Box */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FileCheck className="w-4 h-4" />
                <span>Commercial Warranty &amp; Certificate</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                SAGEDO Release Certificate
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                All visibility infrastructure is delivered with a SAGEDO Release Certificate governed by the 10-Gate Quality Assurance Standard. If any gate fails inspection prior to handover, deployment is halted until compliance is verified.
              </p>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 shrink-0 text-left md:text-right space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Verification Standard
              </span>
              <span className="text-sm font-bold text-emerald-400 block">
                10-Gate QA Checklist
              </span>
              <span className="text-xs text-zinc-400 block">
                [RETAINER_TERMS]
              </span>
            </div>
          </div>

          {/* Honest Disclaimer Notice */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex items-start gap-3 text-xs text-zinc-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-zinc-200">Honest Engineering Commitment:</strong> Search engines and AI models evolve constantly. SAGEDO guarantees complete technical indexability, schema correctness, crawlability, and entity compliance. We do not make unprovable promises of guaranteed #1 rankings or synthetic AI citations.
            </p>
          </div>
        </div>

        {/* Tab Toggle: 10 Gates vs Sample Prototypes */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('gates')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'gates'
                ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-neutral-900'
            }`}
          >
            The 10 Verification Gates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prototypes')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'prototypes'
                ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-neutral-900'
            }`}
          >
            Sample Prototypes
          </button>
        </div>

        {/* TAB 1: 10 Gates Grid */}
        {activeTab === 'gates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {TEN_GATES.map((gate) => (
              <div
                key={gate.gateNumber}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                      {gate.gateNumber}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {gate.name}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-950 text-zinc-400 border border-neutral-800">
                    {gate.focus}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-8">
                  {gate.criteria}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Sample Prototypes Preview */}
        {activeTab === 'prototypes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prototype 1 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Prototype
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Retail Footfall</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Maps 3-Pack Catchment
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "Hardware store near me Sector 22"</div>
                  <div className="text-emerald-400 font-semibold">Result: Maps 3-Pack Pin #1</div>
                  <div className="text-zinc-400 text-[11px]">Includes verified opening hours &amp; direct WhatsApp quote button.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Simulated search layout for illustration only.
              </div>
            </div>

            {/* Prototype 2 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Prototype
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Industrial B2B</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Perplexity AEO Direct Citation
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "CNC machining tolerances Ludhiana"</div>
                  <div className="text-sky-400 font-semibold">Cited Source: [1] Technical Spec Catalog</div>
                  <div className="text-zinc-400 text-[11px]">Direct citation of factory machinery &amp; ISO certification credentials.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Simulated search layout for illustration only.
              </div>
            </div>

            {/* Prototype 3 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Prototype
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Healthcare Practice</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  ChatGPT Search Medical Specialist Card
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "Pediatric dentist Panchkula laser"</div>
                  <div className="text-amber-400 font-semibold">Recommended Clinic: Verified Profile</div>
                  <div className="text-zinc-400 text-[11px]">Displays degrees, treatment scope, and 1-tap WhatsApp consultation.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Simulated search layout for illustration only.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
