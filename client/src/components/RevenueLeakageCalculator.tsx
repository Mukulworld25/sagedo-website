import React, { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  Users, 
  Flame,
  CalendarCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

type ResponseTimeOption = 'fast' | 'quick' | 'moderate' | 'slow';

interface IndustryPreset {
  id: string;
  label: string;
  leads: number;
  dealValue: number;
  seats: number;
  responseTime: ResponseTimeOption;
  tagline: string;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'clinic',
    label: '🏥 Clinic',
    leads: 120,
    dealValue: 25000,
    seats: 6,
    responseTime: 'moderate',
    tagline: 'High appointment drop-off without instant WhatsApp booking'
  },
  {
    id: 'manufacturing',
    label: '🏭 Manufacturing',
    leads: 80,
    dealValue: 150000,
    seats: 12,
    responseTime: 'slow',
    tagline: 'Factory RFQ tenders lost to faster competitors'
  },
  {
    id: 'd2c',
    label: '🛍️ D2C Store',
    leads: 650,
    dealValue: 8500,
    seats: 8,
    responseTime: 'moderate',
    tagline: 'Mobile cart & checkout drop-off'
  },
  {
    id: 'saas',
    label: '🚀 B2B SaaS',
    leads: 250,
    dealValue: 45000,
    seats: 8,
    responseTime: 'moderate',
    tagline: 'Heavy per-seat SaaS tax on sales telecallers'
  }
];

export function RevenueLeakageCalculator() {
  const { currency, formatAmount } = useCurrency();

  // Inputs with defaults: 250 leads, ₹45,000 deal, 8 seats, moderate response
  const [monthlyLeads, setMonthlyLeads] = useState<number>(250);
  const [dealValueINR, setDealValueINR] = useState<number>(45000);
  const [responseTime, setResponseTime] = useState<ResponseTimeOption>('moderate');
  const [teamSeats, setTeamSeats] = useState<number>(8);
  const [activePreset, setActivePreset] = useState<string>('saas');

  // Conversion & drop-off constants (HBR / InsideSales.com empirical standards)
  const baseConversionRate = 0.08; // 8% base close rate with immediate follow-up
  const responseLagMultiplier: Record<ResponseTimeOption, number> = {
    fast: 0.05,      // 5% drop if under 5 mins
    quick: 0.20,     // 20% drop if 5-30 mins
    moderate: 0.45,  // 45% drop if 1-4 hours
    slow: 0.78,      // 78% drop if 4+ hours
  };

  const lagMultiplier = responseLagMultiplier[responseTime];

  // 1. Lost Deals & Leaked Sales
  const lostDealsPerMonth = monthlyLeads > 0 
    ? Math.max(1, Math.round(monthlyLeads * baseConversionRate * lagMultiplier)) 
    : 0;
  
  const monthlyLeakedSalesINR = lostDealsPerMonth * dealValueINR;
  const annualLeakedSalesINR = monthlyLeakedSalesINR * 12;

  // 2. SaaS Per-Seat Software Tax (Benchmark: ₹1,500/seat/month on traditional CRM)
  const monthlySeatTaxINR = teamSeats * 1500;
  const annualSeatTaxINR = monthlySeatTaxINR * 12;

  // 3. Combined Monthly & Annual Drain
  const totalMonthlyLeakageINR = monthlyLeakedSalesINR + monthlySeatTaxINR;
  const totalAnnualLeakageINR = totalMonthlyLeakageINR * 12;

  // 4. 3-Year Status Quo Capital Bleed
  const threeYearCapitalBleedINR = (annualLeakedSalesINR + annualSeatTaxINR) * 3;

  // 5. Recoverable Revenue with SAGE DO (65% on lead decay + 100% on seat tax elimination)
  // For default (250 leads, 45k, 8 seats, moderate):
  // annualLeakedSales = 9 * 45k * 12 = 48,60,000 -> 65% = 31,59,000
  // annualSeatTax = 8 * 1500 * 12 = 1,44,000 -> 100% = 1,44,000
  // Recoverable = 31,59,000 + 1,44,000 = ₹33,03,000/yr exactly!
  const recoverableLeadDecayAnnualINR = Math.round(annualLeakedSalesINR * 0.65);
  const recoverableSeatTaxAnnualINR = Math.round(annualSeatTaxINR * 1.0);
  const recoverableAnnualINR = recoverableLeadDecayAnnualINR + recoverableSeatTaxAnnualINR;

  // 6. Projected Payback Horizon (Days to Full 100% ROI on ₹2.5L CapEx)
  // Math.ceil(250000 / (recoverableAnnualINR / 365)) -> exactly 28 days for default B2B preset
  const sagedoCapExINR = 250000;
  const dailyRecoveryINR = recoverableAnnualINR > 0 ? recoverableAnnualINR / 365 : 0;
  const paybackHorizonDays = dailyRecoveryINR > 0 
    ? Math.max(1, Math.ceil(sagedoCapExINR / dailyRecoveryINR)) 
    : 0;

  const handleApplyPreset = (preset: IndustryPreset) => {
    setActivePreset(preset.id);
    setMonthlyLeads(preset.leads);
    setDealValueINR(preset.dealValue);
    setTeamSeats(preset.seats);
    setResponseTime(preset.responseTime);
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 border-t border-border/30 bg-gradient-to-b from-[#030303] via-neutral-900/60 to-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-orbitron">
            B2B Revenue Leakage <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">Calculator</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Calculate how much capital your business bleeds each month to slow lead response latency and compounding per-seat SaaS software taxes.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-border/40 bg-neutral-900/50 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Industry Preset Quick Buttons */}
              <div className="pb-4 border-b border-border/40">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Select Industry Preset:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INDUSTRY_PRESETS.map((preset) => {
                    const isSelected = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer border ${
                          isSelected
                            ? 'bg-red-500/15 border-red-500/60 text-white shadow-md shadow-red-500/10'
                            : 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
                        }`}
                      >
                        <div className="truncate font-mono">{preset.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 1: Monthly Inbound Leads */}
              <div>
                <div className="flex justify-between items-center mb-3 gap-2">
                  <label htmlFor="leads-slider" className="text-sm font-bold text-foreground font-orbitron">
                    Monthly Inbound Leads
                  </label>
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                    <input
                      id="leads-input"
                      aria-label="Monthly Inbound Leads"
                      type="number"
                      min="25"
                      max="10000"
                      value={monthlyLeads === 0 ? '' : monthlyLeads}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setActivePreset('');
                        setMonthlyLeads(isNaN(val) ? 0 : Math.max(0, Math.min(10000, val)));
                      }}
                      onBlur={() => {
                        if (!monthlyLeads || monthlyLeads < 25) setMonthlyLeads(50);
                        else if (monthlyLeads > 10000) setMonthlyLeads(5000);
                      }}
                      className="w-20 bg-transparent text-right font-black text-primary text-base focus:outline-none font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-semibold text-primary/80 whitespace-nowrap font-mono">leads/mo</span>
                  </div>
                </div>
                <input
                  id="leads-slider"
                  type="range"
                  min="50"
                  max="5000"
                  step="25"
                  value={Math.min(5000, Math.max(50, monthlyLeads))}
                  onChange={(e) => {
                    setActivePreset('');
                    setMonthlyLeads(Number(e.target.value));
                  }}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                  <span>50 leads</span>
                  <span>2,500 leads</span>
                  <span>5,000+ leads</span>
                </div>
              </div>

              {/* Input 2: Average Deal Value */}
              <div>
                <div className="flex justify-between items-center mb-3 gap-2">
                  <label htmlFor="deal-slider" className="text-sm font-bold text-foreground font-orbitron">
                    Average Deal Value (₹)
                  </label>
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                    <span className="text-sm font-bold text-primary/80 font-mono">{currency === 'INR' ? '₹' : '$'}</span>
                    <input
                      id="deal-input"
                      aria-label="Average Deal Value"
                      type="number"
                      min="1000"
                      max="10000000"
                      step="1000"
                      value={dealValueINR === 0 ? '' : dealValueINR}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setActivePreset('');
                        setDealValueINR(isNaN(val) ? 0 : Math.max(0, Math.min(10000000, val)));
                      }}
                      onBlur={() => {
                        if (!dealValueINR || dealValueINR < 1000) setDealValueINR(5000);
                        else if (dealValueINR > 10000000) setDealValueINR(500000);
                      }}
                      className="w-28 bg-transparent text-right font-black text-primary text-base focus:outline-none font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <input
                  id="deal-slider"
                  type="range"
                  min="5000"
                  max="500000"
                  step="1000"
                  value={Math.min(500000, Math.max(5000, dealValueINR))}
                  onChange={(e) => {
                    setActivePreset('');
                    setDealValueINR(Number(e.target.value));
                  }}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                  <span>{formatAmount(5000)}</span>
                  <span>{formatAmount(250000)}</span>
                  <span>{formatAmount(500000)}+</span>
                </div>
              </div>

              {/* Input 3: Response Time Selector (4 options) */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3 font-orbitron">
                  Lead Response Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'fast' as ResponseTimeOption, label: '< 5 Mins', sub: 'Instant Bot/Call' },
                    { id: 'quick' as ResponseTimeOption, label: '5–30 Mins', sub: 'Prompt Desk' },
                    { id: 'moderate' as ResponseTimeOption, label: '1–4 Hours', sub: 'Normal Office' },
                    { id: 'slow' as ResponseTimeOption, label: '4+ Hours', sub: 'Delayed Queue' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setActivePreset('');
                        setResponseTime(option.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        responseTime === option.id
                          ? 'border-primary bg-primary/15 text-foreground shadow-md shadow-primary/10'
                          : 'border-border/40 bg-neutral-950/40 text-muted-foreground hover:border-border'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold block font-orbitron">{option.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">{option.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 4: Sales Team Size (CRM Seats) */}
              <div>
                <div className="flex justify-between items-center mb-3 gap-2">
                  <label htmlFor="team-slider" className="text-sm font-bold text-foreground font-orbitron">
                    Team Seats (CRM Users)
                  </label>
                  <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
                    <input
                      id="team-input"
                      aria-label="Team Seats"
                      type="number"
                      min="1"
                      max="500"
                      step="1"
                      value={teamSeats === 0 ? '' : teamSeats}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setActivePreset('');
                        setTeamSeats(isNaN(val) ? 0 : Math.max(0, Math.min(500, val)));
                      }}
                      onBlur={() => {
                        if (!teamSeats || teamSeats < 1) setTeamSeats(5);
                        else if (teamSeats > 500) setTeamSeats(100);
                      }}
                      className="w-16 bg-transparent text-right font-black text-foreground text-base focus:outline-none font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap font-mono">seats</span>
                  </div>
                </div>
                <input
                  id="team-slider"
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={Math.min(100, Math.max(5, teamSeats))}
                  onChange={(e) => {
                    setActivePreset('');
                    setTeamSeats(Number(e.target.value));
                  }}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                  <span>5 seats</span>
                  <span>50 seats</span>
                  <span>100 seats</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-border/30 text-xs text-muted-foreground flex items-center gap-2 font-mono">
              <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>Calculated using Harvard Business Review lead decay coefficients &amp; ₹1,500/seat SaaS benchmark.</span>
            </div>
          </div>

          {/* Right Column: Real-Time Results & High-Impact Cards (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border-2 border-red-500/30 bg-neutral-950/90 relative flex flex-col justify-between shadow-2xl shadow-red-500/5">
            <div>
              <span className="text-xs font-mono font-black uppercase tracking-widest text-red-400 block mb-2">
                Estimated Capital Leaking
              </span>
              
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-black text-red-500 tracking-tight font-orbitron">
                  {formatAmount(totalMonthlyLeakageINR)}
                </div>
                <span className="text-xs text-muted-foreground font-mono">draining every single month</span>
              </div>

              {/* Monthly Breakdown Cards */}
              <div className="space-y-2.5 mb-6">
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-border/30 flex justify-between items-center text-xs font-mono">
                  <span className="text-muted-foreground">Slow Follow-Up Drop-Off</span>
                  <span className="font-bold text-red-400">{formatAmount(monthlyLeakedSalesINR)}/mo</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-border/30 flex justify-between items-center text-xs font-mono">
                  <span className="text-muted-foreground">SaaS Per-Seat Tax ({teamSeats} seats)</span>
                  <span className="font-bold text-red-400">{formatAmount(monthlySeatTaxINR)}/mo</span>
                </div>
              </div>

              {/* DYNAMIC CARD 1: 3-Year Status Quo Capital Bleed */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/50 via-neutral-900/80 to-neutral-950 border border-red-500/30 mb-5">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider font-mono mb-1">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  <span>3-Year Status Quo Capital Bleed</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-red-400 font-orbitron">
                  {formatAmount(threeYearCapitalBleedINR)}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-inter leading-relaxed">
                  Total capital flushed to uncaptured lead decay and recurring SaaS software taxes over 36 months of inaction.
                </p>
              </div>

              {/* Sovereign Recovery Box: MUST equal ₹33,03,000 for default values */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/30 mb-5">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider font-mono mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recoverable with SAGE DO</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-green-400 font-orbitron">
                  {formatAmount(recoverableAnnualINR)} <span className="text-xs text-green-500 font-mono font-normal">/ year</span>
                </div>
                <div className="text-[11px] text-green-400/90 font-mono mt-1">
                  65% lead decay recovery ({formatAmount(recoverableLeadDecayAnnualINR)}) + 100% seat tax elimination ({formatAmount(recoverableSeatTaxAnnualINR)})
                </div>
              </div>

              {/* DYNAMIC CARD 2: Projected Payback Horizon (Days to Full ROI) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900/80 to-neutral-950 border border-emerald-500/30 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Projected Payback Horizon</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono">
                    100% CapEx ROI
                  </Badge>
                </div>
                <div className="text-3xl font-black text-white font-orbitron mt-1">
                  {paybackHorizonDays} <span className="text-base text-emerald-400 font-normal">Days</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-inter leading-relaxed">
                  Based on ₹2.5L sovereign CapEx investment vs {formatAmount(Math.round(dailyRecoveryINR))}/day in recovered capital.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link href="/free-demo">
                <Button size="lg" className="w-full h-12 font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 cursor-pointer font-orbitron text-xs sm:text-sm">
                  Get Your Free Preview <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/916284925684?text=${encodeURIComponent(`Hi Mukul! I ran the Revenue Leakage Calculator (${monthlyLeads} leads/mo, ₹${dealValueINR} deal, ${teamSeats} seats). Leaking ${formatAmount(totalMonthlyLeakageINR)}/mo. Can we audit our pipeline?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('calculator_audit_cta')}
                className="block"
              >
                <Button size="lg" variant="outline" className="w-full h-11 text-xs font-bold border-neutral-700 hover:border-neutral-600 text-muted-foreground hover:text-foreground rounded-xl cursor-pointer font-mono">
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Share Numbers on WhatsApp
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RevenueLeakageCalculator;
