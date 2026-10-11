import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle2, Shield, Sparkles, MessageCircle, AlertCircle, Eye, Search, Smartphone } from 'lucide-react';
import { trackDemoFormSubmit, trackWhatsAppClick } from '@/hooks/useAnalytics';
import { supabase } from '@/lib/supabase';

const INTEREST_OPTIONS = [
    "Get found on Google and AI",
    "New website",
    "WhatsApp and follow-up automation",
    "CRM",
    "Mobile app",
    "Not sure"
];

export default function FreeDemo() {
    const [, setLocation] = useLocation();

    // Form fields
    const [name, setName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [city, setCity] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [website, setWebsite] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [note, setNote] = useState('');
    const [consent, setConsent] = useState(false);

    // Anti-spam honeypot (hidden from real users)
    const [honeypot, setHoneypot] = useState('');

    // Tracking metadata
    const [utmParams, setUtmParams] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        referrer: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Optional slots banner driven by env var VITE_DEMO_SLOTS_LEFT
    const demoSlotsLeft = import.meta.env.VITE_DEMO_SLOTS_LEFT;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            setUtmParams({
                utm_source: searchParams.get('utm_source') || '',
                utm_medium: searchParams.get('utm_medium') || '',
                utm_campaign: searchParams.get('utm_campaign') || '',
                referrer: document.referrer || ''
            });
        }
    }, []);

    const toggleInterest = (option: string) => {
        setInterests(prev => 
            prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        // Honeypot spam check
        if (honeypot) {
            console.warn('Bot detected via honeypot');
            setLocation('/free-demo/thanks');
            return;
        }

        // Client-side rate limiting (prevent repeated clicks within 30s)
        const lastSubmit = sessionStorage.getItem('last_demo_submit_time');
        const now = Date.now();
        if (lastSubmit && now - parseInt(lastSubmit, 10) < 30000) {
            setErrorMessage('Please wait a moment before submitting another request.');
            return;
        }

        if (!consent) {
            setErrorMessage('Please accept the WhatsApp contact consent to proceed.');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            name: name.trim(),
            business_name: businessName.trim(),
            city: city.trim(),
            whatsapp: whatsapp.trim(),
            website: website.trim() || undefined,
            interests,
            note: note.trim() || undefined,
            consent,
            utm_source: utmParams.utm_source || undefined,
            utm_medium: utmParams.utm_medium || undefined,
            utm_campaign: utmParams.utm_campaign || undefined,
            referrer: utmParams.referrer || undefined
        };

        try {
            // 1. Submit to API backend (with rate-limiting, honeypot & admin email notification)
            const res = await fetch('/api/free-demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payload, honeypot })
            });

            if (!res.ok) {
                // If backend API isn't available or errored, try direct Supabase insert fallback
                const { error: sbError } = await supabase.from('demo_requests').insert([payload]);
                if (sbError) {
                    throw new Error(sbError.message || 'Failed to submit preview request.');
                }
            }

            sessionStorage.setItem('last_demo_submit_time', now.toString());

            // GA4 KEY EVENT: demo_form_submit marks primary lead conversion in Google Analytics 4
            trackDemoFormSubmit({
                business_name: payload.business_name,
                city: payload.city,
                interests_count: payload.interests.length
            });

            setLocation('/free-demo/thanks');
        } catch (error: any) {
            console.error('Free demo submission error:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again or chat with us on WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Get Your Free Preview | SAGE DO</title>
                <meta 
                    name="description" 
                    content="See your business the way Google and AI will show it. Free preview in 24 hours. Concept homepage, Google profile draft, and AI snapshot." 
                />
                <link rel="canonical" href="https://sagedo.in/free-demo" />
            </Helmet>

            <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-20 relative overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10">

                    {/* Optional Slots Banner driven by VITE_DEMO_SLOTS_LEFT */}
                    {demoSlotsLeft && (
                        <div className="max-w-xl mx-auto mb-8">
                            <div className="flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold text-center shadow-lg shadow-rose-500/5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                </span>
                                <span>Only {demoSlotsLeft} Free Preview Slots Left This Week</span>
                            </div>
                        </div>
                    )}

                    {/* Headline and Subline */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                            <span>Zero Cost • No Commitment</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-outfit tracking-tight leading-tight text-white mb-5">
                            See your business the way{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                                Google and AI will show it.
                            </span>
                            <br />
                            Free preview in 24 hours.
                        </h1>
                        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            Tell us about your business. We'll send a concept homepage, a Google profile draft and a snapshot of how AI could describe you. No payment. No obligation.
                        </p>
                    </div>

                    {/* Feature value cards */}
                    <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
                        <div className="p-4 rounded-xl bg-neutral-900/60 border border-zinc-800/80 flex items-start gap-3">
                            <Eye className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-semibold text-white">Concept Homepage</h3>
                                <p className="text-xs text-zinc-400 mt-1">A visual draft engineered for high conversions and speed.</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/60 border border-zinc-800/80 flex items-start gap-3">
                            <Search className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-semibold text-white">Google Profile Draft</h3>
                                <p className="text-xs text-zinc-400 mt-1">Optimized local search entity and Maps blueprint.</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/60 border border-zinc-800/80 flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-semibold text-white">AI Engine Snapshot</h3>
                                <p className="text-xs text-zinc-400 mt-1">How ChatGPT, Perplexity and Gemini perceive your brand.</p>
                            </div>
                        </div>
                    </div>

                    {/* Lead Form Card */}
                    <div className="max-w-2xl mx-auto bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                        {errorMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                <div>
                                    <p className="font-semibold">{errorMessage}</p>
                                    <a
                                        href={`https://wa.me/916284925684?text=${encodeURIComponent(`Hi Mukul, I'm trying to request a Free Preview for ${businessName || 'my business'}. Can you help me directly?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsAppClick('demo_form_error_fallback')}
                                        className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-semibold underline mt-2"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" /> Message us directly on WhatsApp instead →
                                    </a>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot field for bot suppression */}
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="website_hp">Leave this empty</label>
                                <input
                                    id="website_hp"
                                    type="text"
                                    name="website_hp"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                        Your Name <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Rahul Sharma"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="businessName" className="text-sm font-medium text-zinc-300">
                                        Business Name <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="businessName"
                                        type="text"
                                        required
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="e.g. Apex Health Clinic"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-medium text-zinc-300">
                                        City <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="city"
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="e.g. Chandigarh, Mumbai"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="text-sm font-medium text-zinc-300">
                                        WhatsApp Number <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="whatsapp"
                                        type="tel"
                                        required
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="website" className="text-sm font-medium text-zinc-300">
                                    Current Website <span className="text-zinc-500 text-xs">(optional)</span>
                                </label>
                                <Input
                                    id="website"
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="https://example.com"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                />
                            </div>

                            {/* What do you want help with? Checkboxes */}
                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-medium text-zinc-300 block">
                                    What do you want help with?
                                </label>
                                <div className="grid sm:grid-cols-2 gap-2.5">
                                    {INTEREST_OPTIONS.map((opt) => (
                                        <label
                                            key={opt}
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                                interests.includes(opt)
                                                    ? 'bg-rose-500/10 border-rose-500/50 text-white'
                                                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                                            }`}
                                        >
                                            <Checkbox
                                                checked={interests.includes(opt)}
                                                onCheckedChange={() => toggleInterest(opt)}
                                                className="border-zinc-600 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                                            />
                                            <span className="text-xs sm:text-sm font-medium select-none">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Short Note (optional) */}
                            <div className="space-y-2">
                                <label htmlFor="note" className="text-sm font-medium text-zinc-300">
                                    Short Note <span className="text-zinc-500 text-xs">(optional)</span>
                                </label>
                                <Textarea
                                    id="note"
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Any specific goals, target customers, or bottlenecks you want us to focus on..."
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 resize-none text-sm"
                                />
                            </div>

                            {/* Required Consent Checkbox */}
                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <Checkbox
                                        id="consent"
                                        checked={consent}
                                        onCheckedChange={(checked) => setConsent(checked === true)}
                                        required
                                        className="mt-1 border-zinc-600 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                                    />
                                    <span className="text-xs text-zinc-400 group-hover:text-zinc-300 leading-relaxed select-none">
                                        I agree SAGE DO may contact me on WhatsApp about this request{' '}
                                        <span className="text-rose-500">*</span>{' '}
                                        (view our{' '}
                                        <Link href="/privacy-policy" className="text-rose-400 hover:underline">
                                            privacy policy
                                        </Link>
                                        ).
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting || !consent}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold h-13 text-base rounded-xl transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    'Preparing Your Preview...'
                                ) : (
                                    <>
                                        Get Your Free Preview <ArrowRight className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </Button>

                            {/* Small disclaimer under the form */}
                            <p className="text-xs text-zinc-500 text-center leading-relaxed">
                                A preview is a concept of what we would build. It is not a ranking guarantee.
                            </p>
                        </form>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 mt-8">
                        <div className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-zinc-400" />
                            <span>100% Confidential</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>24-Hour WhatsApp Delivery</span>
                        </div>
                        <span>•</span>
                        <div>
                            <span>No Credit Card Required</span>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
