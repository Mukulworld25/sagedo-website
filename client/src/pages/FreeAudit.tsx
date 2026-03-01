import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Shield, Zap, TrendingUp, Presentation } from 'lucide-react';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API delay, we can connect this to Supabase later
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
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
                                    <div className="py-12 text-center space-y-4 relative z-10">
                                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-outfit text-white">Audit Request Received</h3>
                                        <p className="text-zinc-400 font-inter">
                                            We'll be in touch via WhatsApp within 24 hours with your custom execution plan.
                                        </p>
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
