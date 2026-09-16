import React, { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

export default function RevenueLeakageCalculator() {
  const { currency, formatAmount } = useCurrency();

  // Inputs
  const [monthlyLeads, setMonthlyLeads] = useState<number>(250);
  const [dealValueINR, setDealValueINR] = useState<number>(45000);
  const [responseTime, setResponseTime] = useState<'fast' | 'moderate' | 'slow'>('moderate');
  const [teamSeats, setTeamSeats] = useState<number>(8);

  // Conversion & drop-off constants (HBR / InsideSales.com empirical standards)
  const baseConversionRate = 0.08; // 8% base close rate with immediate follow-up
  const responseLagMultiplier = {
    fast: 0.05,      // 5% drop if under 5 mins
    moderate: 0.45,  // 45% drop if 1-4 hours
    slow: 0.78,      // 78% drop if >24 hours
  }[responseTime];

  // Calculations in INR
  const lostDealsPerMonth = Math.max(1, Math.round(monthlyLeads * baseConversionRate * responseLagMultiplier));
  const monthlyLeakedSalesINR = lostDealsPerMonth * dealValueINR;
  
  // SaaS per-seat tax: ~₹1,500/seat/month on traditional CRM
  const monthlySeatTaxINR = teamSeats * 1500;
  
  const totalMonthlyLeakageINR = monthlyLeakedSalesINR + monthlySeatTaxINR;
  const totalAnnualLeakageINR = totalMonthlyLeakageINR * 12;
  const recoverableAnnualINR = Math.round(totalAnnualLeakageINR * 0.65);

  return (
    <section className="py-24 px-6 border-t border-border/30 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> Interactive Diagnostic
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            B2B Revenue Leakage Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate how much money your business loses every month to slow response times and SaaS per-seat software taxes.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl border border-border/40 bg-neutral-900/50 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Slider 1: Monthly Inbound Leads */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="leads-slider" className="text-sm font-bold text-foreground">
                    Monthly Inbound Leads
                  </label>
                  <span className="text-lg font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {monthlyLeads.toLocaleString()} leads / mo
                  </span>
                </div>
                <input
                  id="leads-slider"
                  type="range"
                  min="25"
                  max="1500"
                  step="25"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>25 leads</span>
                  <span>750 leads</span>
                  <span>1,500+ leads</span>
                </div>
              </div>

              {/* Slider 2: Average Deal Size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="deal-slider" className="text-sm font-bold text-foreground">
                    Average Deal Value / Contract Size
                  </label>
                  <span className="text-lg font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {formatAmount(dealValueINR)}
                  </span>
                </div>
                <input
                  id="deal-slider"
                  type="range"
                  min="10000"
                  max="350000"
                  step="5000"
                  value={dealValueINR}
                  onChange={(e) => setDealValueINR(Number(e.target.value))}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>{formatAmount(10000)}</span>
                  <span>{formatAmount(150000)}</span>
                  <span>{formatAmount(350000)}+</span>
                </div>
              </div>

              {/* Selector: Average Response Time to Inbound Leads */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Current Lead Response Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'fast', label: '< 5 Minutes', desc: 'Instant WhatsApp/Call' },
                    { id: 'moderate', label: '1–4 Hours', desc: 'Typical Business Hours' },
                    { id: 'slow', label: '24+ Hours', desc: 'Manual Review' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setResponseTime(option.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        responseTime === option.id
                          ? 'border-primary bg-primary/15 text-foreground shadow-md shadow-primary/10'
                          : 'border-border/40 bg-neutral-950/40 text-muted-foreground hover:border-border'
                      }`}
                    >
                      <div className="text-xs md:text-sm font-bold block">{option.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Sales Reps / Team Seats */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="team-slider" className="text-sm font-bold text-foreground">
                    Sales Team Size (CRM Seats)
                  </label>
                  <span className="text-lg font-black text-foreground bg-neutral-800 px-3 py-1 rounded-lg">
                    {teamSeats} users
                  </span>
                </div>
                <input
                  id="team-slider"
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={teamSeats}
                  onChange={(e) => setTeamSeats(Number(e.target.value))}
                  className="calculator-slider w-full h-11 md:h-2 bg-transparent md:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>2 reps</span>
                  <span>25 reps</span>
                  <span>50 reps</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-border/30 text-xs text-muted-foreground flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>Calculated using Harvard Business Review lead-lag response decay &amp; standard per-seat SaaS benchmark formulas.</span>
            </div>
          </div>

          {/* Right Column: Real-Time Results & Recovery Plan (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl border-2 border-red-500/30 bg-neutral-950/90 relative flex flex-col justify-between shadow-2xl shadow-red-500/5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-400 block mb-3">
                Estimated Revenue Leaking
              </span>
              
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-black text-red-500 tracking-tight">
                  {formatAmount(totalMonthlyLeakageINR)}
                </div>
                <span className="text-xs text-muted-foreground font-medium">lost every single month</span>
              </div>

              {/* Breakdown Cards */}
              <div className="space-y-3 mb-8">
                <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-border/30 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Slow Follow-Up Drop-Off</span>
                  <span className="font-bold text-red-400">{formatAmount(monthlyLeakedSalesINR)}/mo</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-border/30 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">SaaS Per-Seat Tax ({teamSeats} seats)</span>
                  <span className="font-bold text-red-400">{formatAmount(monthlySeatTaxINR)}/mo</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-border/30 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Projected Annual Drain</span>
                  <span className="font-bold text-neutral-200">{formatAmount(totalAnnualLeakageINR)}/yr</span>
                </div>
              </div>

              {/* Sovereign Recovery Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/30 mb-8">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Recoverable with SAGEDO
                </div>
                <div className="text-2xl font-black text-green-400">
                  {formatAmount(recoverableAnnualINR)} <span className="text-xs text-green-500 font-normal">/ year</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1.5 leading-relaxed">
                  Sub-60s WhatsApp automated qualification + Sovereign CRM (Zero Per-Seat License Fees) stops lead drop-off immediately.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link href="/free-audit">
                <Button size="lg" className="w-full h-12 font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 cursor-pointer">
                  Claim Free 72-Hour Leakage Audit <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/916284925684?text=Hi%20Mukul!%20I%20ran%20the%20Revenue%20Leakage%20Calculator%20(${monthlyLeads}%20leads/mo,%20${teamSeats}%20seats).%20Can%20we%20audit%20our%20pipeline%3F`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('calculator_audit_cta')}
                className="block"
              >
                <Button size="lg" variant="outline" className="w-full h-11 text-xs font-bold border-neutral-700 hover:border-neutral-600 text-muted-foreground hover:text-foreground rounded-xl cursor-pointer">
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
