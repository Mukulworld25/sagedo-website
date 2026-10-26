import React from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Database,
  Lock,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  detailedPoints: { title: string; desc: string }[];
  metricPill: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'capex-vs-saas',
    category: 'Commercial Architecture',
    question: 'CapEx vs. SaaS: Why invest a one-time CapEx of ₹2.5L instead of ₹1,500/month for Zoho or Salesforce?',
    shortAnswer: 'Monthly per-seat software taxes penalize company growth. At scale, American SaaS drains ₹12L–₹30L every year for generic features, while SAGE DO delivers sovereign architecture with zero seat fees forever.',
    metricPill: '₹36L–₹90L Saved Over 3 Years',
    detailedPoints: [
      {
        title: 'The Compounding Software Tax',
        desc: '₹1,500/seat/month seems harmless for 3 users. But at 25 sales reps, Zoho costs ₹4.5L/year. At 60 reps, it is ₹10.8L/year. At 100 seats on Salesforce, you are bleeding ₹30L+ every single year.'
      },
      {
        title: 'Unlimited Seats Forever',
        desc: 'With SAGE DO, your one-time CapEx investment covers unlimited telecallers, branch managers, and field staff. You never pay another per-seat rupee as your sales team scales.'
      },
      {
        title: 'Payback Within 6 to 9 Months',
        desc: 'By eliminating perpetual seat licenses and capturing 65% of decaying leads with sub-90s WhatsApp speed-to-lead, the system pays for itself entirely within 28 to 90 days.'
      }
    ]
  },
  {
    id: 'why-cheap-websites-fail',
    category: 'Engineering & Conversion',
    question: 'Why do ₹5,000–₹15,000 freelancer template websites consistently fail to generate enterprise revenue?',
    shortAnswer: 'Commodity templates rely on bloated themes with 30+ fragile plugins that crumble under mobile 4G latency, leak customer data, route leads into spam folders, and stay completely invisible on modern AI search engines.',
    metricPill: '4.8s vs 0.8s LCP Difference',
    detailedPoints: [
      {
        title: 'Core Web Vitals Catastrophe',
        desc: 'Freelancer WordPress themes average 4.5s–7.2s Largest Contentful Paint (LCP) on Indian mobile networks. Over 53% of mobile prospects bounce before reading your first sentence.'
      },
      {
        title: 'Zero Database Integration & Lead Silos',
        desc: 'Cheap sites use generic contact form plugins that email submissions to unmonitored inboxes. Leads sit for 12 to 24 hours, guaranteeing that 80%+ of prospective buyers purchase from competitors.'
      },
      {
        title: 'Complete AI Search Invisibility (AEO/GEO)',
        desc: 'Templates lack server-rendered JSON-LD schema graphs, valid entity nesting, and machine-readable llms.txt files. When prospects query ChatGPT, Perplexity, or Google AI Overviews, your business does not exist.'
      }
    ]
  },
  {
    id: 'prototype-guarantee',
    category: 'Risk Reversal Guarantee',
    question: 'How can SAGE DO genuinely guarantee a 48-Hour Functional Prototype without cutting corners?',
    shortAnswer: 'We combine proprietary AI code synthesis engines with senior systems engineering rigor. You test a real, clickable application on an edge URL within 48 hours—not static Figma mockups.',
    metricPill: 'Zero Financial Liability',
    detailedPoints: [
      {
        title: 'The AI-Native Flywheel',
        desc: 'Traditional agencies spend 4 weeks in discovery meetings and slide preparation. Our autonomous engines synthesize your requirements, build PostgreSQL schema migrations, and generate mobile-first layouts in the first 24 hours.'
      },
      {
        title: 'Human Systems Verification (Hours 24–48)',
        desc: 'Senior systems engineers review every API route, harden security headers, tune mobile typography down to 360px, and deploy a live interactive prototype to a private edge staging URL.'
      },
      {
        title: 'Walk Away with Zero Risk',
        desc: 'You test the clickable prototype on your own phone. If the engineering discernment and speed do not give you absolute conviction, you walk away with zero financial commitment.'
      }
    ]
  },
  {
    id: 'code-and-data-ownership',
    category: 'Sovereign IP & Security',
    question: 'What exact source code, database access, and IP rights does my business receive upon handover?',
    shortAnswer: '100% full, unrestricted sovereign ownership. You receive the complete Git repository, production Docker containers, raw PostgreSQL database migrations, and root server keys. Zero vendor lock-in.',
    metricPill: '100% Full IP Transfer',
    detailedPoints: [
      {
        title: 'Your Private Code Repository',
        desc: 'Full transfer of the GitHub repository containing clean React 18, Node.js microservices, and Drizzle ORM schemas. No encrypted proprietary blobs or obfuscated runtimes.'
      },
      {
        title: 'Direct PostgreSQL Root Access',
        desc: 'Your customer data lives in a sovereign PostgreSQL instance on your own VPS or cloud account. SAGE DO never retains an escrow copy of your customer PII or transaction ledgers.'
      },
      {
        title: 'Self-Hostable Anywhere',
        desc: 'Complete Docker Compose configuration and step-by-step handover documentation allows your in-house IT team to migrate, self-host, or extend the platform without SAGE DO.'
      }
    ]
  },
  {
    id: 'speed-to-lead-science',
    category: 'Lead Velocity Science',
    question: 'Why does a sub-90s WhatsApp response convert 391% higher than traditional email lead forms?',
    shortAnswer: 'Lead decay is immediate and exponential. Empirical studies from Harvard Business Review prove that waiting just 30 minutes decreases lead qualification odds by 21x. WhatsApp meets the buyer at peak commercial intent.',
    metricPill: '391% Higher Conversion Rate',
    detailedPoints: [
      {
        title: 'The 5-Minute Inversion Curve',
        desc: 'After 5 minutes, lead responsiveness drops by 400%. When an inquiry is submitted, the prospect is focused on their problem. By hour 2, they are in a meeting; by hour 24, your competitor closed them.'
      },
      {
        title: '98% WhatsApp Open Rates in India',
        desc: 'Email inboxes are congested with spam filters and promotions, yielding an 18% open rate. WhatsApp messages achieve a 98% open rate with median read times under 90 seconds.'
      },
      {
        title: 'Automated Intent Qualification',
        desc: 'Our WhatsApp Cloud API webhook qualifies the prospect’s budget, project timeline, and specific requirement in 45 seconds, then immediately routes warm leads to duty sales reps.'
      }
    ]
  }
];

export function B2BClinicalFAQ() {
  return (
    <section id="b2b-faq" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#030303] via-[#070707] to-[#030303] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Surgical Due Diligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-orbitron">
            B2B Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Objections</span> Decoded
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-inter">
            Direct mathematical and architectural answers to the top 5 questions visionary founders ask before commissioning SAGE DO systems.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl mb-12">
          <Accordion type="single" collapsible defaultValue="capex-vs-saas" className="space-y-4">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-white/10 rounded-2xl px-5 sm:px-6 py-2 bg-neutral-950/60 data-[state=open]:border-amber-500/40 data-[state=open]:bg-neutral-950 transition-all duration-200"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline cursor-pointer group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pr-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                        {faq.category}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-orbitron">
                        {faq.question}
                      </span>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[11px] font-mono shrink-0 self-start sm:self-auto">
                      {faq.metricPill}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2 pb-6 border-t border-white/5 text-neutral-300">
                  {/* Short Answer Summary */}
                  <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed mb-6 font-inter">
                    {faq.shortAnswer}
                  </p>

                  {/* Detailed Evidence Points */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {faq.detailedPoints.map((pt, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{pt.title}</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed font-inter">
                          {pt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom Founder Assistance Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Have an Edge Case or Custom Stack?</span>
            </div>
            <h4 className="text-xl font-bold text-white font-orbitron mb-1">
              Speak Directly with Lead Systems Architect
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-inter">
              Get an honest technical assessment on your current CRM, lead latency, and database architecture.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul,%20I%20have%20a%20technical%20question%20about%20SAGE%20DO%20architecture."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('b2b_faq_ask_founder')}
              className="w-full md:w-auto"
            >
              <Button className="w-full md:w-auto h-11 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>Ask Mukul on WhatsApp</span>
              </Button>
            </a>
            <Link href="/free-demo">
              <Button variant="outline" className="hidden sm:flex h-11 border-white/20 text-neutral-200 hover:text-white text-xs font-bold rounded-xl cursor-pointer">
                <span>Free Preview</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default B2BClinicalFAQ;
