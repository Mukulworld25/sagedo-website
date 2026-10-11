import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

export default function FreeDemoThanks() {
    const whatsappUrl = "https://wa.me/916284925684?text=" + encodeURIComponent("Hi Mukul, I just requested a Free Preview on sagedo.in and wanted to connect!");

    return (
        <>
            <Helmet>
                <title>Preview Request Received | SAGE DO</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <main className="min-h-screen bg-[#09090b] text-white pt-28 pb-20 relative overflow-hidden flex items-center justify-center">
                {/* Background glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-xl relative z-10 text-center">
                    <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
                        
                        {/* Success Icon */}
                        <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <CheckCircle className="w-10 h-10" />
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">
                                Request received.
                            </h1>
                            <p className="text-lg text-zinc-300 font-medium">
                                We'll send your preview on WhatsApp within 24 hours.
                            </p>
                            <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                                Our engineers are preparing your concept homepage, Google profile blueprint, and AI knowledge snapshot.
                            </p>
                        </div>

                        {/* WhatsApp CTA Button */}
                        <div className="pt-4 space-y-3">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('demo_thanks_whatsapp_direct')}
                                className="inline-block w-full"
                            >
                                <Button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold h-13 text-base rounded-xl transition-all shadow-lg shadow-green-600/25 flex items-center justify-center gap-2 cursor-pointer">
                                    <MessageCircle className="w-5 h-5" />
                                    Chat on WhatsApp (+91 6284925684)
                                </Button>
                            </a>
                            <p className="text-xs text-zinc-500">
                                Want it faster or have extra assets to share? Reach out to Mukul directly.
                            </p>
                        </div>

                        {/* Guarantee strip */}
                        <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs text-zinc-400">
                            <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-zinc-900/50">
                                <Clock className="w-3.5 h-3.5 text-rose-500" />
                                <span>24-Hour Turnaround</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-zinc-900/50">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>No Sales Obligation</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/">
                                <Button variant="ghost" className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-900">
                                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Return to Homepage
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}
