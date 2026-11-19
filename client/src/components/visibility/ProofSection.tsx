import { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  AlertCircle
} from 'lucide-react';

interface ChecklistItem {
  itemNumber: number;
  name: string;
  focus: string;
  criteria: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    itemNumber: 1,
    name: 'Search Engine Markup',
    focus: 'Search engines',
    criteria: 'Business details marked up so search engines read them correctly'
  },
  {
    itemNumber: 2,
    name: 'Crawler Access',
    focus: 'AI & Google crawlers',
    criteria: 'Your site can be read by Google and AI crawlers'
  },
  {
    itemNumber: 3,
    name: 'Mobile Speed',
    focus: 'Phone performance',
    criteria: 'Loads fast and works on a phone'
  },
  {
    itemNumber: 4,
    name: 'Consistent Details',
    focus: 'Name, address, phone',
    criteria: 'Same name, address and phone everywhere'
  },
  {
    itemNumber: 5,
    name: 'Customer Questions',
    focus: 'Clear answers',
    criteria: 'Clear answers to common customer questions'
  },
  {
    itemNumber: 6,
    name: 'Natural Content',
    focus: 'Customer phrasing',
    criteria: 'Content written the way customers actually ask'
  },
  {
    itemNumber: 7,
    name: 'Contact Pathways',
    focus: 'Call & WhatsApp',
    criteria: 'Call and WhatsApp buttons tested and working'
  },
  {
    itemNumber: 8,
    name: 'Privacy & Consent',
    focus: 'Cookie choice',
    criteria: 'Visitor tracking only after they accept cookies'
  },
  {
    itemNumber: 9,
    name: 'Layout Stability',
    focus: 'Visual comfort',
    criteria: "Page doesn't jump while loading"
  },
  {
    itemNumber: 10,
    name: 'Full Handover',
    focus: 'Asset delivery',
    criteria: 'At the end, you get your files and logins'
  }
];

export default function ProofSection() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'prototypes'>('checklist');

  return (
    <div id="proof" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Checklist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Our 10-point checklist
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every visibility system deployed by SAGEDO is verified through an objective 10-point inspection checklist.
          </p>
        </div>

        {/* Quality Checklist Callout Box */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FileCheck className="w-4 h-4" />
                <span>Verification</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Verified Before Handover
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                All visibility infrastructure is checked against our 10-point checklist before handover to ensure complete setup compliance.
              </p>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 shrink-0 text-left md:text-right space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Standard
              </span>
              <span className="text-sm font-bold text-emerald-400 block">
                Our 10-point checklist
              </span>
            </div>
          </div>

          {/* Honest Disclaimer Notice */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex items-start gap-3 text-xs text-zinc-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-zinc-200">Honest note:</strong> We don't promise #1 rankings or that AI tools will name you. Nobody honestly can. We do the groundwork: correct details everywhere, clean data, a site that can be read, and a working WhatsApp path.
            </p>
          </div>
        </div>

        {/* Tab Toggle: Checklist vs Sample Prototypes */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-neutral-900'
            }`}
          >
            Our 10-point checklist
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
            Sample Searches
          </button>
        </div>

        {/* TAB 1: 10 Checklist Points Grid */}
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CHECKLIST_ITEMS.map((item) => (
              <div
                key={item.itemNumber}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                      {item.itemNumber}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {item.name}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-950 text-zinc-400 border border-neutral-800">
                    {item.focus}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-8">
                  {item.criteria}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Sample Searches Preview */}
        {activeTab === 'prototypes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prototype 1 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Search
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Retail Shop</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Google Maps Search
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "Hardware store near me Sector 22"</div>
                  <div className="text-emerald-400 font-semibold">Result: Maps Listing #1</div>
                  <div className="text-zinc-400 text-[11px]">Includes verified opening hours &amp; direct WhatsApp quote button.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Sample search layout for illustration only.
              </div>
            </div>

            {/* Prototype 2 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Search
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Workshop</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  AI Search Answer
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "CNC machining workshop in Ludhiana"</div>
                  <div className="text-sky-400 font-semibold">Result: Verified Profile</div>
                  <div className="text-zinc-400 text-[11px]">Direct details of workshop machinery and WhatsApp enquiry.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Sample search layout for illustration only.
              </div>
            </div>

            {/* Prototype 3 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sample Search
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Clinic</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  AI Recommendation
                </h4>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-zinc-300 font-mono space-y-1.5 mb-3">
                  <div className="text-zinc-500">Query: "Dental clinic Panchkula evening hours"</div>
                  <div className="text-amber-400 font-semibold">Recommended Practice: Verified Profile</div>
                  <div className="text-zinc-400 text-[11px]">Displays timings, address, and 1-tap WhatsApp consultation.</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-3 border-t border-neutral-800">
                Sample search layout for illustration only.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
