import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, Clock, Phone, CheckCircle, ArrowRight, 
  MessageCircle, Zap, Shield, Star, ShieldCheck, Sparkles, 
  Lock, ExternalLink, HelpCircle, Building2, User 
} from 'lucide-react';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

const TIME_SLOTS = [
  '10:30 AM - 11:00 AM',
  '12:00 PM - 12:30 PM',
  '02:30 PM - 03:00 PM',
  '04:30 PM - 05:00 PM',
  '06:30 PM - 07:00 PM',
  '08:00 PM - 08:30 PM',
];

const INTENTS = [
  { id: 'whatsapp', label: '⚡ Direct WhatsApp (Fastest)', sub: 'Sub-45s response time directly from founder' },
  { id: 'call', label: '📅 15-Min Scoping Call', sub: 'Interactive technical architecture review' },
  { id: 'lock', label: '🔒 Lock 48h Sprint (10% Off)', sub: 'Upfront slot lock with 90% SLA money-back guarantee' },
  { id: 'rfp', label: '🤝 Enterprise / Partner RFP', sub: 'For mid-market systems & CA/Legal bilateral partnerships' },
];

export default function BookCall() {
  const [location] = useLocation();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialService = searchParams.get('service') || 'General Architecture Scoping';

  const [activeIntent, setActiveIntent] = useState<'whatsapp' | 'call' | 'lock' | 'rfp'>('whatsapp');
  const [selectedService, setSelectedService] = useState(initialService);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [projectBrief, setProjectBrief] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Tomorrow's date min limit
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      businessName: businessName.trim() || 'Not specified',
      intent: activeIntent,
      service: selectedService,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      brief: projectBrief.trim()
    };

    try {
      await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      }).catch(console.error);
    } catch (err) {
      console.error('Booking submission error:', err);
    }

    // Direct WhatsApp redirect with populated context
    const waText = encodeURIComponent(
      `Hi Mukul! I am requesting a ${activeIntent === 'call' ? '15-Min Strategy Call' : activeIntent === 'lock' ? '48h Sprint Lock (10% Discount)' : 'Project Review'} on SAGE DO.\n\n` +
      `• Name: ${name || 'Founder'}\n` +
      `• Business: ${businessName || 'MSME'}\n` +
      `• Selected Need: ${selectedService}\n` +
      (selectedDate ? `• Scheduled Slot: ${selectedDate} at ${selectedTime}\n` : '') +
      (projectBrief ? `• Scope Details: ${projectBrief}\n` : '') +
      `\nLooking forward to your technical assessment!`
    );

    window.open(`https://wa.me/916284925684?text=${waText}`, '_blank');
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <Helmet>
        <title>Intake Terminal & Strategy Scoping | SAGE DO</title>
        <meta name="description" content="Talk directly to Mukul Dhiman, founder of SAGE DO. Guaranteed 48-Hour functional prototype with 90% SLA money-back warranty." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-20 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Founder Intake Terminal · Direct To Lead Engineer
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Scoping, Sprints & Sovereign Infrastructure
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              No junior account managers. No 10-day proposal delays. Choose your intake path below for an immediate technical assessment directly from our founder.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* ───────────────────────────────────────────────────────────── */}
            {/* LEFT RAIL: TRUST, FOUNDER GUARANTEE & SLA MISS RULE (5 Cols)   */}
            {/* ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-5 space-y-6">

              {/* Founder Assurance Card */}
              <div className="p-6 rounded-3xl bg-[#12141c]/90 border border-white/10 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5 shrink-0">
                    <img
                      src="/founder-mukul.jpg"
                      alt="Mukul Dhiman"
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<div class="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center font-black text-white text-xl">M</div>';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Mukul Dhiman</h3>
                    <p className="text-xs text-amber-400 font-semibold">Founder & Chief Architect</p>
                    <p className="text-[11px] text-neutral-400">Ex-Aerospace Engineer · Chandigarh</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4 italic">
                  “I personally review every technical architecture before a single line of code is committed. If a custom build does not deliver tangible ROI for your balance sheet, I will bluntly tell you not to build it.”
                </p>

                {/* Operational Status */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-neutral-300">
                    Live Status: <strong className="text-emerald-400">48h Sprints Active</strong>
                  </span>
                </div>
              </div>

              {/* THE 90% SLA MISS REFUND GUARANTEE */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                  <h4 className="font-black text-white text-base">
                    90% Money-Back SLA Guarantee
                  </h4>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Every commissioned sprint includes an agreed 48-Hour Functional Prototype milestone. If we fail to deliver a live, functional preview on your agreed schedule:
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-amber-300 font-bold mb-3">
                  👉 90% of your advance fee is refunded immediately. Zero excuses. Zero lock-in.
                </div>
                <p className="text-[10px] text-neutral-500 italic">
                  (10% covers raw third-party infrastructure and Cloud API provisioning costs).
                </p>
              </div>

              {/* Verified Institutional Proof (Generalized) */}
              <div className="p-6 rounded-3xl bg-[#12141c]/90 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Engineering Benchmarks
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300">
                      <strong>42s Auto-RFQ:</strong> Deployed for a Ludhiana metal forging enterprise.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300">
                      <strong>3.4x Lead Capture:</strong> Custom CRM pipeline for a premier Ed-Tech institute.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300">
                      <strong>Zero Per-Seat Tax:</strong> Own your code and database outright forever.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ───────────────────────────────────────────────────────────── */}
            {/* RIGHT COLUMN: 4-INTENT DYNAMIC ROUTER TERMINAL (7 Cols)        */}
            {/* ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12141c]/95 border border-white/10 shadow-2xl backdrop-blur-xl">

                {/* Intent Selector Tabs */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Select Your Intake Channel:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTENTS.map((intent) => {
                      const isSelected = activeIntent === intent.id;
                      return (
                        <button
                          key={intent.id}
                          type="button"
                          onClick={() => setActiveIntent(intent.id as any)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                              : 'bg-white/5 border-white/5 text-neutral-400 hover:border-white/10 hover:text-white'
                          }`}
                        >
                          <p className="font-extrabold text-xs sm:text-sm text-white mb-0.5">{intent.label}</p>
                          <p className="text-[10px] text-neutral-400 line-clamp-1">{intent.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────── */}
                {/* TAB 1: DIRECT WHATSAPP (FASTEST - 45s)                      */}
                {/* ─────────────────────────────────────────────────────────── */}
                {activeIntent === 'whatsapp' && (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in duration-200">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Direct WhatsApp Triage</h3>
                      <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">
                        Skip forms entirely. Message founder Mukul directly on WhatsApp. Average response time is under 45 seconds during business hours.
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://wa.me/916284925684?text=Hi%20Mukul!%20I'm%20exploring%20a%20project%20with%20SAGE%20DO%20and%20want%20to%20discuss%20pricing%20and%20timeline."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('book_call_direct_wa')}
                        className="inline-block w-full sm:w-auto"
                      >
                        <Button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 cursor-pointer">
                          <MessageCircle className="w-4 h-4 mr-2" /> Open WhatsApp Chat (+91 6284925684)
                        </Button>
                      </a>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-mono">Verified WhatsApp Business Direct Line</p>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────── */}
                {/* TAB 2, 3 & 4: STRUCTURED INTAKE FORM                        */}
                {/* ─────────────────────────────────────────────────────────── */}
                {activeIntent !== 'whatsapp' && (
                  <form onSubmit={handleBookingSubmit} className="space-y-4 animate-in fade-in duration-200">

                    {activeIntent === 'lock' && (
                      <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>10% Instant Advance Discount unlocked. Protected by our 90% SLA money-back warranty.</span>
                      </div>
                    )}

                    {activeIntent === 'rfp' && (
                      <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-2">
                        <Building2 className="w-4 h-4 shrink-0 text-blue-400" />
                        <span>Enterprise / Partner RFP mode. We will prepare an architectural breakdown and commercial proposal.</span>
                      </div>
                    )}

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        System or Need to Scope *
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-neutral-950/80 border border-neutral-800 text-white text-xs sm:text-sm h-11 rounded-xl px-3 outline-none focus:border-amber-500"
                      >
                        <option value="Website Design & Development">Website Design & Development (₹10k–₹30k)</option>
                        <option value="Lead Generation & Custom CRM">Lead Generation & Custom CRM (₹30k–₹1.20L)</option>
                        <option value="Google Business Profile & SEO / GEO">Google Business Profile & Local SEO (₹3,999–₹5,999)</option>
                        <option value="WhatsApp Automation Bot">WhatsApp Automation Bot (₹8k–₹15k)</option>
                        <option value="Complete Business Launchpad Combo">Complete Business Launchpad Combo (₹19,999)</option>
                        <option value="Revenue Command Center Combo">Revenue Command Center Combo (₹59,999)</option>
                        <option value="Enterprise Sovereign Suite">Enterprise Sovereign Suite (₹1,49,999+)</option>
                        <option value="Statutory CA / Legal Partnership">Statutory CA / Legal Partnership Inquiry</option>
                        <option value="Custom Architecture Scoping">Other Custom Architecture Scoping</option>
                      </select>
                    </div>

                    {/* Name & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          required
                          className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                          WhatsApp Number *
                        </label>
                        <Input
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          required
                          className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Business / Organization Name
                      </label>
                      <Input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Company or Startup Name"
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                      />
                    </div>

                    {/* Date & Time if Call Selected */}
                    {activeIntent === 'call' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                            Preferred Date *
                          </label>
                          <Input
                            type="date"
                            min={minDate}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                            className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                            Preferred Time *
                          </label>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full bg-neutral-950/80 border border-neutral-800 text-white text-xs sm:text-sm h-11 rounded-xl px-3 outline-none focus:border-amber-500"
                          >
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Project Brief */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Brief Scope or Key Bottleneck (Optional)
                      </label>
                      <Textarea
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="e.g. Currently tracking leads manually on Excel sheets. Need a custom CRM with WhatsApp routing for 6 salespeople."
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white min-h-[80px] text-xs sm:text-sm rounded-xl"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? 'Connecting...'
                          : activeIntent === 'lock'
                          ? 'Lock 48-Hour Sprint (10% Discount)'
                          : activeIntent === 'rfp'
                          ? 'Submit Enterprise RFP'
                          : 'Confirm 15-Minute Scoping Call'}
                      </span>
                    </Button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
