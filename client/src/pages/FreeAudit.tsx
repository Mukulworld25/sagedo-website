import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Shield, Zap, TrendingUp, Presentation, Star, MessageCircle } from 'lucide-react';

const testimonials = [
    {
        name: "Priya Siingh",
        role: "Verified Trustpilot Review",
        initials: "PS",
        text: "Sagedo is an easy-to-use and efficient platform that helps simplify tasks and save time. It has a clean interface and smooth onboarding. I've had a great experience with Sagedo.",
    },
    {
        name: "Akshit Kashyap",
        role: "Verified Trustpilot Review",
        initials: "AK",
        text: "Why AI is important. Everything is fine, nice service, very good behaviour. What a cool and knowledgeable experience to know about AI.",
    },
    {
        name: "Arushi Vashist",
        role: "Verified Trustpilot Review",
        initials: "AV",
        text: "Very reliable. Their service and everything were good.",
    },
    {
        name: "Tahira War",
        role: "Verified Trustpilot Review",
        initials: "TW",
        text: "Everything was good overall. Good service provider.",
    },
];

const FreeAudit = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        websiteUrl: '',
        socialHandle: '',
        biggestChallenge: '',
        whatsappNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/free-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } catch (error) {
            console.error('Free audit submission error:', error);
        } finally {
            setIsSubmitting(false);
            setIsSuccess(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Helmet>
                <title>Free SAGEDO AI Audit | 24-Hour Delivery</title>
                <meta name="description" content="Get a 5-point AI Audit for your business delivered via WhatsApp in 24 hours. Uncover visibility, automation, and revenue gaps." />
            </Helmet>

            <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Testimonials Section (GAP-22) */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {testimonials.map((t) => (
                            <div key={t.name} className="p-6 rounded-2xl bg-[#18181b] border border-zinc-800">
                                <div className="flex items-center gap-2 mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-zinc-300 text-sm mb-4 italic">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-sm">{t.initials}</div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{t.name}</p>
                                        <p className="text-zinc-500 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">

                        {/* Left Column: Copy & Value Prop */}
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                </span>
                                Free Friday Audit Available (3 Spots Left)
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold font-outfit leading-tight">
                                Stop Guessing. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                                    Find Your Execution Gap.
                                </span>
                            </h1>

                            <p className="text-xl text-zinc-400 font-inter">
                                A perfect product that nobody sees is a dead product. We'll analyze your business and send you a brutal, 5-point execution plan to fix your visibility and revenue gaps in 24 hours.
                            </p>

                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                <h3 className="text-lg font-semibold font-outfit text-zinc-200">What you get in your custom PDF:</h3>

                                <ul className="space-y-3 font-inter">
                                    <li className="flex items-start gap-3">
                                        <TrendingUp className="w-6 h-6 text-rose-500 flex-shrink-0" />
                                        <span className="text-zinc-300"><strong>Organic Visibility Score:</strong> See exactly why your competitors are found instead of you.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Zap className="w-6 h-6 text-rose-500 flex-shrink-0" />
                                        <span className="text-zinc-300"><strong>Automation Opportunities:</strong> Where AI can replace your manual daily grind.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Presentation className="w-6 h-6 text-rose-500 flex-shrink-0" />
                                        <span className="text-zinc-300"><strong>Conversion Bottlenecks:</strong> Why your traffic isn't converting into revenue.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-zinc-500 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                <Shield className="w-5 h-5 text-zinc-400" />
                                <p>No sales pressure. No generic fluff. Just 100% actionable advice we'd charge our consulting clients ₹25,000 for.</p>
                            </div>
                        </div>

                        {/* Right Column: Lead Form */}
                        <div className="w-full lg:w-[450px] flex-shrink-0">
                            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

                                {isSuccess ? (
                                    <div className="py-8 text-center space-y-4 relative z-10">
                                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-outfit text-white">Your Audit Request is Received!</h3>
                                        <p className="text-zinc-400 font-inter">
                                            Mukul will personally WhatsApp you within 2 hours with your custom execution plan.
                                        </p>
                                        <a
                                            href={`https://wa.me/916284925684?text=${encodeURIComponent(`Hi Mukul, I just submitted my Free Audit request on sagedo.in. My business is ${formData.businessName}.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Chat on WhatsApp Now
                                        </a>
                                        <p className="text-xs text-zinc-500 mt-2">Skip the wait — message us directly!</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8 relative z-10">
                                            <h2 className="text-2xl font-bold font-outfit text-white mb-2">Request Free Audit</h2>
                                            <p className="text-sm text-zinc-400 font-inter">Takes 60 seconds.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                            <div className="space-y-2">
                                                <label htmlFor="businessName" className="text-sm font-medium text-zinc-300">Business Name *</label>
                                                <Input
                                                    id="businessName"
                                                    name="businessName"
                                                    value={formData.businessName}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500"
                                                    placeholder="e.g. SAGE DO"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="websiteUrl" className="text-sm font-medium text-zinc-300">Website URL</label>
                                                <Input
                                                    id="websiteUrl"
                                                    name="websiteUrl"
                                                    type="url"
                                                    value={formData.websiteUrl}
                                                    onChange={handleChange}
                                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500"
                                                    placeholder="https://"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="socialHandle" className="text-sm font-medium text-zinc-300">LinkedIn / Instagram Handle *</label>
                                                <Input
                                                    id="socialHandle"
                                                    name="socialHandle"
                                                    value={formData.socialHandle}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500"
                                                    placeholder="@username"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="biggestChallenge" className="text-sm font-medium text-zinc-300">Biggest Challenge Right Now *</label>
                                                <select
                                                    id="biggestChallenge"
                                                    name="biggestChallenge"
                                                    value={formData.biggestChallenge}
                                                    onChange={handleChange}
                                                    required
                                                    className="flex h-10 w-full rounded-md border bg-zinc-900 border-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 appearance-none"
                                                >
                                                    <option value="" disabled>Select your primary bottleneck...</option>
                                                    <option value="visibility">Nobody knows we exist (Visibility)</option>
                                                    <option value="leads">Traffic isn't converting (Leads)</option>
                                                    <option value="automation">Too much manual work (Automation)</option>
                                                    <option value="tech">Tech stack is broken (Development)</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2 pb-4">
                                                <label htmlFor="whatsappNumber" className="text-sm font-medium text-zinc-300">WhatsApp Number *</label>
                                                <Input
                                                    id="whatsappNumber"
                                                    name="whatsappNumber"
                                                    type="tel"
                                                    value={formData.whatsappNumber}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500"
                                                    placeholder="+91"
                                                />
                                                <p className="text-xs text-zinc-500">We'll send your PDF report here.</p>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold flex items-center justify-center gap-2 h-12"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Claim My Free Audit'}
                                                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};

export default FreeAudit;
