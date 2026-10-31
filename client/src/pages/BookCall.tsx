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

export default function BookCall() {
  const [location] = useLocation();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialService = searchParams.get('service') || 'Website Design & Development';

  const [selectedService, setSelectedService] = useState(initialService);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [projectBrief, setProjectBrief] = useState('');
  const [isSprintLocked, setIsSprintLocked] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Tomorrow's date min limit
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    const s = searchParams.get('service');
    if (s) setSelectedService(s);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      businessName: businessName.trim() || 'Not specified',
      intent: isSprintLocked ? 'lock_10_percent_discount' : 'strategy_call',
      service: selectedService,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      brief: projectBrief.trim(),
      sprintLock: isSprintLocked
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
      `Hi Mukul! I've booked a strategy session on SAGE DO.\n\n` +
      `• Name: ${name || 'Founder'}\n` +
      `• WhatsApp: ${whatsapp}\n` +
      (email ? `• Email: ${email}\n` : '') +
      `• Business: ${businessName || 'MSME'}\n` +
      `• Selected System: ${selectedService}\n` +
      (selectedDate ? `• Scheduled Slot: ${selectedDate} at ${selectedTime}\n` : '') +
      (isSprintLocked ? `• 48h Sprint Lock: YES (10% Instant Advance Discount Applied)\n` : '') +
      (projectBrief ? `• Scope / Bottleneck: ${projectBrief}\n` : '') +
      `\nLooking forward to our technical scoping discussion!`
    );

    window.open(`https://wa.me/916284925684?text=${waText}`, '_blank');
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <Helmet>
        <title>Book a Strategy Call & Architecture Scoping | SAGE DO</title>
        <meta name="description" content="Talk directly to Mukul Dhiman, founder of SAGE DO. Guaranteed 48-Hour functional prototype with 90% SLA money-back warranty." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-20 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Founder Intake Terminal · Direct To Lead Engineer
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Book a Strategy Call & Architecture Scoping
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              No junior account managers. No 10-day proposal delays. Fill your details below to schedule an interactive technical review directly with our founder.
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
                      <strong>42s Auto-RFQ:</strong> Deployed for an industrial metal forge in Ludhiana.
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
            {/* RIGHT COLUMN: PERMANENT VISIBLE INTAKE FORM (7 Cols)          */}
            {/* ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12141c]/95 border border-white/10 shadow-2xl backdrop-blur-xl">

                {/* FAST TRACK WHATSAPP BANNER */}
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Prefer Immediate Chat?</p>
                      <p className="text-[11px] text-neutral-300">Direct WhatsApp with founder Mukul · Avg response &lt;45 seconds</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/916284925684?text=Hi%20Mukul!%20I'm%20exploring%20a%20project%20with%20SAGE%20DO%20and%20want%20to%20discuss%20pricing%20and%20timeline."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('book_call_fast_wa')}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      type="button"
                      size="sm"
                      className="w-full sm:w-auto h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </Button>
                  </a>
                </div>

                {/* FORM TITLE */}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>Schedule 15-Min Scoping Call</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Fill the details below. We review your requirements and share an architectural breakdown on the call.
                  </p>
                </div>

                {/* STRUCTURED INTAKE FORM (ALWAYS VISIBLE) */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">

                  {/* System or Service to Scope */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      System or Need to Scope *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-neutral-950/80 border border-neutral-800 text-white text-xs sm:text-sm h-11 rounded-xl px-3 outline-none focus:border-amber-500"
                    >
                      <optgroup label="Core Digital Engines">
                        <option value="Website Design & Development (₹10k–₹30k)">Website Design & Development (SMB ₹10k–₹20k | Enterprise ₹15k–₹30k)</option>
                        <option value="Lead Generation & Custom CRM (₹30k–₹1.20L)">Lead Generation & Custom CRM (SMB ₹30k–₹50k | Enterprise ₹50k–₹1.20L)</option>
                        <option value="Google Business Profile & Local SEO (₹3,999–₹5,999)">Google Business Profile & Local SEO / GEO (₹3,999–₹5,999)</option>
                        <option value="WhatsApp Automation Bot (₹8k–₹15k)">WhatsApp Automation Bot (₹8,000–₹15,000)</option>
                      </optgroup>
                      <optgroup label="Turnkey Combos">
                        <option value="Brand Starter Combo (₹2,999)">Brand Starter Combo (₹2,999 – ₹3,499)</option>
                        <option value="Legal Foundation Combo (₹3,999)">Legal Foundation Combo (₹3,999 – ₹5,999)</option>
                        <option value="Sales Machine Combo (₹12,999)">Sales Machine Combo (₹12,999 – ₹14,999)</option>
                        <option value="Complete Business Launchpad Combo (₹19,999)">Complete Business Launchpad Combo (₹19,999)</option>
                        <option value="Revenue Command Center Combo (₹59,999)">Revenue Command Center Combo (₹59,999)</option>
                        <option value="Enterprise Sovereign Suite (₹1,49,999+)">Enterprise Sovereign Suite (₹1,49,999+)</option>
                      </optgroup>
                      <optgroup label="Specialized Modular Builds">
                        <option value="Professional Logo Design (₹4,999–₹9,999)">Professional Logo Design (₹4,999–₹9,999)</option>
                        <option value="GST Registration (₹2,499)">GST Registration (₹2,499)</option>
                        <option value="MSME Registration (₹1,999)">MSME Udhyam Registration (₹1,999)</option>
                        <option value="Trademark Filing (₹5,999)">Trademark Filing (₹5,999)</option>
                        <option value="Pitch Deck Architecture (₹9,999)">Pitch Deck Architecture (₹9,999)</option>
                        <option value="Mobile App Development (₹35,000+)">Mobile App Development (₹35,000+)</option>
                        <option value="High-Authority SEO Blogs (₹1,499/blog)">High-Authority SEO Blogs (₹1,499/blog)</option>
                      </optgroup>
                      <optgroup label="Enterprise & Partnerships">
                        <option value="Statutory CA / Legal Partnership">Statutory CA / Legal Partnership Inquiry</option>
                        <option value="CapEx Machinery Telemetry Rail">Industrial CapEx Machinery Telemetry Rail</option>
                        <option value="Custom Architecture Scoping">Other Bespoke Architecture Scoping</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Name & WhatsApp Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
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
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
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

                  {/* Email & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Business / Company Name
                      </label>
                      <Input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Company or Startup Name"
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
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
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Preferred Time Slot *
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

                  {/* What is your biggest challenge / Brief */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      What is your biggest operational challenge right now?
                    </label>
                    <Textarea
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder="e.g. Leads are getting missed across WhatsApp chats. Need a centralized pipeline and automatic follow-up bot for our 5-person sales team."
                      className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white min-h-[85px] text-xs sm:text-sm rounded-xl leading-relaxed"
                    />
                  </div>

                  {/* 10% UPFRONT DISCOUNT SPRINT LOCK TOGGLE */}
                  <div 
                    onClick={() => setIsSprintLocked(!isSprintLocked)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSprintLocked
                        ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSprintLocked ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-600 bg-neutral-900'
                      }`}>
                        {isSprintLocked && <CheckCircle className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-white flex items-center gap-1.5">
                          <span>Lock 48h Sprint Upfront (10% Instant Discount Applied)</span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">SAVE 10%</span>
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          Priority slot reservation with guaranteed 48-Hour Functional Prototype & 90% SLA money-back warranty.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? 'Reserving Your Slot...'
                          : isSprintLocked
                          ? 'Lock 48-Hour Sprint (10% Discount Applied)'
                          : 'Book My Strategy Call & Confirm on WhatsApp'}
                      </span>
                    </Button>
                  </div>

                  <p className="text-[11px] text-center text-neutral-500 mt-2">
                    🔒 Zero spam guarantee. Your details are used strictly to coordinate your technical architecture session.
                  </p>
                </form>

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
