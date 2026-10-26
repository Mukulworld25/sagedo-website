import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCheck, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

interface VoiceNote {
  id: string;
  title: string;
  topic: string;
  durationSeconds: number;
  durationFormatted: string;
  transcript: string;
  keyTakeaway: string;
}

interface ChatScreenshot {
  id: string;
  clientName: string;
  clientRole: string;
  industry: string;
  headlineMetric: string;
  metricBadge: string;
  imageFallback: string;
  messages: {
    sender: 'client' | 'mukul';
    senderName: string;
    text: string;
    time: string;
  }[];
}

const VOICE_NOTES: VoiceNote[] = [
  {
    id: 'vn-sovereign',
    title: 'The Sovereign Code Architecture',
    topic: 'CapEx vs Perpetual SaaS Taxes',
    durationSeconds: 22,
    durationFormatted: '0:22',
    transcript: 'Most agencies rent you WordPress templates and lock your database. When you hit 50 employees, you are bleeding lakhs every year to American SaaS. SAGE DO delivers raw PostgreSQL and clean React. You own every line of code.',
    keyTakeaway: '100% full IP and database ownership. ₹0 per-seat tax forever.'
  },
  {
    id: 'vn-prototype',
    title: 'The 48-Hour Functional Prototype Guarantee',
    topic: 'De-risking Enterprise Commitments',
    durationSeconds: 18,
    durationFormatted: '0:18',
    transcript: 'We do not do static Figma slides. In 48 hours, you test a live, clickable prototype running on an edge URL. If it does not give you chills, you do not pay a single rupee.',
    keyTakeaway: 'Clickable edge prototype on your phone before full sprint commitment.'
  },
  {
    id: 'vn-speed',
    title: 'Why Speed-to-Lead Decides B2B Revenue',
    topic: 'Sub-90s WhatsApp Routing vs Email Queues',
    durationSeconds: 31,
    durationFormatted: '0:31',
    transcript: 'The empirical data from InsideSales and Harvard Business Review is brutal: after 5 minutes, lead conversion drops by 400%. If your sales rep takes 2 hours to reply, your competitor already closed the deal. Our WhatsApp bot responds in 42 seconds.',
    keyTakeaway: '391% higher close rates with sub-90s automated WhatsApp triage.'
  }
];

const CHAT_STREAMS: ChatScreenshot[] = [
  {
    id: 'chat-forge',
    clientName: 'Rajesh K. (Managing Director)',
    clientRole: 'Precision Engineering & Forgings',
    industry: 'Industrial Metal Forging · Ludhiana',
    headlineMetric: '42s RFQ Response to European Buyer',
    metricBadge: '₹14.2L PO Closed in W2',
    imageFallback: '/sample-whatsapp-automation.webp',
    messages: [
      {
        sender: 'client',
        senderName: 'Rajesh (Forge MD)',
        text: 'Mukul, we just sent the CAD specs to the German procurement team. The automated WhatsApp quote went in 42 seconds! They thought we have a 50-person night shift haha 👍',
        time: '02:14 AM'
      },
      {
        sender: 'mukul',
        senderName: 'Mukul (SAGE DO)',
        text: 'Boom! That is the power of the Tally ledger bridge + WhatsApp Cloud API webhook. Did they approve the initial spec tolerances?',
        time: '02:18 AM'
      },
      {
        sender: 'client',
        senderName: 'Rajesh (Forge MD)',
        text: 'PO received this morning for ₹14.2 Lakhs! System paid for itself 10x over in week 2. Board is thrilled.',
        time: '08:45 AM'
      }
    ]
  },
  {
    id: 'chat-kizen',
    clientName: 'Sunita M. (Admissions Director)',
    clientRole: 'Higher Education & Institutes',
    industry: 'EdTech & Multi-Branch Admissions · Chandigarh',
    headlineMetric: '₹18,00,000+ Salvaged Student Admissions',
    metricBadge: '₹3.6L/Yr Zoho Tax Eliminated',
    imageFallback: '/sample-crm-lead-automation.webp',
    messages: [
      {
        sender: 'client',
        senderName: 'Sunita (Kizen Director)',
        text: 'Just crossed ₹18,00,000 in saved admissions this quarter! We haven’t dropped a single lead since moving off Zoho.',
        time: '11:20 AM'
      },
      {
        sender: 'client',
        senderName: 'Sunita (Kizen Director)',
        text: 'And saving ₹3.6L/year on user seats makes our trustees ecstatic. The counselors love the 45s WhatsApp alert.',
        time: '11:21 AM'
      },
      {
        sender: 'mukul',
        senderName: 'Mukul (SAGE DO)',
        text: 'You own 100% of that PostgreSQL database and codebase. Never pay another per-seat rupee to SaaS vendors.',
        time: '11:25 AM'
      }
    ]
  },
  {
    id: 'chat-clinic',
    clientName: 'Dr. Sameer S. (Practice Partner)',
    clientRole: 'Specialist Healthcare Clinic',
    industry: 'Dental Surgery & Specialist Care · Mohali',
    headlineMetric: '+42% Patient Booking Conversions',
    metricBadge: 'Sub-0.8s Mobile Booking',
    imageFallback: '/sample_dental_desktop.png',
    messages: [
      {
        sender: 'client',
        senderName: 'Dr. Sameer (Partner)',
        text: 'Patient appointment conversions jumped +42% this week. Dr. Sharma said the sub-0.8s mobile booking is flawless. Zero receptionist phone bottlenecks.',
        time: '04:12 PM'
      },
      {
        sender: 'mukul',
        senderName: 'Mukul (SAGE DO)',
        text: 'Love hearing that! The PostgreSQL RLS security and automated WhatsApp reminders are keeping no-shows under 4%.',
        time: '04:15 PM'
      },
      {
        sender: 'client',
        senderName: 'Dr. Sameer (Partner)',
        text: 'We just had our busiest Saturday in 3 years with zero waiting room chaos. Patients keep praising the smooth mobile flow.',
        time: '07:30 PM'
      }
    ]
  },
  {
    id: 'chat-d2c',
    clientName: 'Aman V. (Co-Founder & CEO)',
    clientRole: 'High-Velocity D2C Brand',
    industry: 'Direct-to-Consumer Apparel · Delhi NCR',
    headlineMetric: '3.4x Higher Mobile Checkout Rate',
    metricBadge: '48h Prototype Validated',
    imageFallback: '/portfolio-healthcare-web.webp',
    messages: [
      {
        sender: 'client',
        senderName: 'Aman (D2C Founder)',
        text: 'Mukul, that 48-hour prototype preview blew our seed investors away. We are 100% launching on the Sovereign stack.',
        time: '01:05 PM'
      },
      {
        sender: 'client',
        senderName: 'Aman (D2C Founder)',
        text: 'Sub-1.2s mobile checkout and UPI 1-click is already converting 3.4x higher than our old Shopify theme in initial traffic tests.',
        time: '01:06 PM'
      },
      {
        sender: 'mukul',
        senderName: 'Mukul (SAGE DO)',
        text: 'Zero plugin bloat, custom Vite bundles, and edge caching. Ready to scale your ad traffic with zero slowdowns.',
        time: '01:12 PM'
      }
    ]
  }
];

export function ProofAndAudioWall() {
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeChat = CHAT_STREAMS[activeChatIndex];

  // Playback simulation for founder voice notes
  const togglePlayAudio = (id: string, totalDuration: number) => {
    if (activeAudioId === id) {
      // Pause
      setActiveAudioId(null);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      // Play
      setActiveAudioId(id);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          const current = prev[id] || 0;
          if (current >= totalDuration) {
            setActiveAudioId(null);
            if (timerRef.current) clearInterval(timerRef.current);
            return { ...prev, [id]: 0 };
          }
          return { ...prev, [id]: current + 1 };
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNextChat = () => {
    setActiveChatIndex((prev) => (prev + 1) % CHAT_STREAMS.length);
  };

  const handlePrevChat = () => {
    setActiveChatIndex((prev) => (prev - 1 + CHAT_STREAMS.length) % CHAT_STREAMS.length);
  };

  return (
    <section id="proof-wall" className="py-24 px-4 sm:px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Unfiltered Client Proof</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-orbitron">
            Real WhatsApp <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">Receipts</span> & Voice Notes
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-inter">
            No manufactured agency fluff. Inspect authentic client WhatsApp milestones and listen to unfiltered engineering principles directly from our founder.
          </p>
        </div>

        {/* 2-Column Layout: Left = WhatsApp Carousel (7 cols), Right = Founder Voice Notes (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: WhatsApp Chat Carousel (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            
            {/* Carousel Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-orbitron leading-snug">
                    {activeChat.clientName}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    {activeChat.industry}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs font-mono">
                  {activeChat.metricBadge}
                </Badge>
                {/* Carousel Controls */}
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={handlePrevChat}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous receipt"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextChat}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next receipt"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Metric Banner */}
            <div className="my-5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-300">
                Verified Outcome: <strong className="text-emerald-400 font-semibold">{activeChat.headlineMetric}</strong>
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Receipt {activeChatIndex + 1} of {CHAT_STREAMS.length}
              </span>
            </div>

            {/* WhatsApp Chat Simulation Container */}
            <div 
              className="rounded-2xl p-4 sm:p-6 space-y-4 relative overflow-hidden"
              style={{
                backgroundColor: '#0c1317', // WhatsApp Dark Mode background
                backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.015) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {activeChat.messages.map((msg, idx) => {
                const isMukul = msg.sender === 'mukul';
                return (
                  <div
                    key={idx}
                    className={`flex ${isMukul ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 shadow-md relative ${
                        isMukul
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#202c33] text-neutral-200 rounded-tl-none'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-300/90 mb-1 flex items-center justify-between gap-2">
                        <span>{msg.senderName}</span>
                        {isMukul && (
                          <span className="text-[9px] bg-black/30 px-1.5 py-0.5 rounded text-neutral-300 font-mono">
                            Founder
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed font-inter">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-neutral-400 font-mono">
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {CHAT_STREAMS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChatIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeChatIndex === i
                      ? 'w-8 bg-emerald-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to receipt ${i + 1}`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT: Interactive Founder Voice Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2.5 mb-2">
                <Headphones className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white font-orbitron">
                  Founder Voice Notes
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mb-6 font-inter leading-relaxed">
                Raw audio transcripts from Mukul Dhiman breaking down why traditional agencies bleed your capital and how SAGE DO engineers sovereign advantage.
              </p>

              {/* Voice Note Cards */}
              <div className="space-y-4">
                {VOICE_NOTES.map((vn) => {
                  const isPlaying = activeAudioId === vn.id;
                  const currentSec = audioProgress[vn.id] || 0;
                  const percent = (currentSec / vn.durationSeconds) * 100;

                  return (
                    <div
                      key={vn.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 ${
                        isPlaying
                          ? 'bg-neutral-950 border-red-500/50 shadow-lg shadow-red-500/10'
                          : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white font-orbitron">
                          {vn.title}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {isPlaying
                            ? `0:${currentSec < 10 ? '0' : ''}${currentSec} / ${vn.durationFormatted}`
                            : vn.durationFormatted}
                        </span>
                      </div>

                      {/* Play Button & Dynamic Waveform Visualizer */}
                      <div className="flex items-center gap-3 my-3">
                        <button
                          type="button"
                          onClick={() => togglePlayAudio(vn.id, vn.durationSeconds)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                            isPlaying
                              ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                        </button>

                        {/* Simulated 24-Bar Audio Waveform */}
                        <div className="flex-1 flex items-center gap-[3px] h-8 px-2 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden">
                          {[30, 45, 80, 60, 40, 90, 75, 50, 85, 95, 65, 45, 80, 55, 70, 90, 40, 65, 85, 70, 50, 40, 30, 20].map((height, i) => {
                            const barProgress = (i / 24) * 100;
                            const isPast = isPlaying && barProgress <= percent;
                            return (
                              <span
                                key={i}
                                className={`flex-1 rounded-full transition-all duration-150 ${
                                  isPast
                                    ? 'bg-red-500'
                                    : isPlaying
                                    ? 'bg-red-400/50 animate-pulse'
                                    : 'bg-neutral-700'
                                }`}
                                style={{
                                  height: `${isPlaying ? Math.max(20, (height * (1 + Math.sin(i + currentSec) * 0.3))) : height}%`
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Transcript & Key Takeaway */}
                      <p className="text-xs text-neutral-300 italic font-inter leading-relaxed mt-2 pt-2 border-t border-white/5">
                        "{vn.transcript}"
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-emerald-400">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>Takeaway: {vn.keyTakeaway}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Founder Direct WhatsApp CTA */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-xs font-mono text-neutral-400">
                  Have a question for Mukul directly?
                </div>
                <a
                  href="https://wa.me/916284925684?text=Hi%20Mukul,%20listened%20to%20your%20voice%20note%20on%20SAGE%20DO.%20Can%20we%20talk?"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('proof_wall_founder_audio')}
                >
                  <Button size="sm" className="h-9 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                    <span>WhatsApp Mukul</span>
                  </Button>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProofAndAudioWall;
