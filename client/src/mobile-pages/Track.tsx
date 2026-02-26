
import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle, Flame, Star, Quote, MessageCircle, Rocket, ShieldCheck, Users, Eye, Target, Heart, Trophy, ArrowRight, Zap, Terminal } from 'lucide-react';
import { Button, Input, Badge } from '../mobile-components/UIComponents';

export const Track: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<any>(null);
    const [streak, setStreak] = useState(7);
    const [executionLogs, setExecutionLogs] = useState<string[]>([]);

    useEffect(() => {
        if (status) {
            const logs = [
                "Initializing Neural Engine...",
                "Context window expanded to 1M tokens...",
                "Human Expert 'Zain' assigned for audit...",
                "Drafting initial structure...",
                "Deep research phase complete...",
                "Optimizing for tone consistency...",
                "Final quality check in progress..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                if (i < logs.length) {
                    setExecutionLogs(prev => [...prev, logs[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleTrack = () => {
        if (!orderId) return;
        setStatus({
            id: orderId,
            status: 'In Progress',
            estimated: '18 Hours',
            step: 2,
            service: 'Assignment Writing'
        });
        setExecutionLogs(["System Link Established..."]);
    };

    const testimonials = [
        { name: "Ravi K.", role: "Restaurant Owner, Chandigarh", text: "I was paying a freelancer ₹30K for a basic website that took 2 months. SAGE DO built something 10x better in days.", rating: 5 },
        { name: "Priya S.", role: "Coaching Institute, Punjab", text: "SAGE DO took over the tech completely. Now I just teach and they handle everything else.", rating: 5 },
        { name: "Arjun T.", role: "E-commerce Startup", text: "I messaged on WhatsApp, explained what I needed, and had a working prototype the next day.", rating: 5 }
    ];

    return (
        <div className="pb-32">

            {/* ═══════════════════════════════════════════════════════════════════
          ABOUT SAGE DO — Brand Story
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="px-5 pt-6 pb-8" style={{ background: '#030303' }}>
                {/* Logo + Name */}
                <div className="flex flex-col items-center text-center mb-8">
                    <img
                        src="/sagedo_logo_final_circle.png"
                        alt="SAGE DO"
                        className="w-20 h-20 mb-4"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.3))' }}
                    />
                    <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>SAGE DO</h1>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-[0.2em] mb-4">AI + Human Excellence</p>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                        India's first AI + Human hybrid execution team. We combine AI speed with human precision to deliver what agencies can't.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { num: "67+", label: "Projects" },
                        { num: "99.9%", label: "Accuracy" },
                        { num: "24-48h", label: "Delivery" }
                    ].map((s, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                            <p className="text-red-400 font-black text-lg">{s.num}</p>
                            <p className="text-neutral-500 text-[10px] font-medium">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Founder Section */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-black text-xl">M</div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Mukul Dhiman</h3>
                            <p className="text-neutral-500 text-xs">Founder & CEO, SAGE DO</p>
                            <p className="text-red-400 text-[10px] font-bold">Ex-Aerospace Engineer (Tata Lockheed Martin)</p>
                        </div>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                        5 years building fighter jets (C130J, F16) taught me one thing: precision matters. Now I bring aerospace-grade execution standards to businesses — combining AI automation with human expertise.
                    </p>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/10">
                        <Target className="w-6 h-6 text-red-400 mb-3" />
                        <h3 className="text-white font-bold text-xs mb-1">Our Vision</h3>
                        <p className="text-neutral-500 text-[10px] leading-snug">Make world-class execution accessible to every founder, regardless of budget.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent border border-blue-500/10">
                        <Rocket className="w-6 h-6 text-blue-400 mb-3" />
                        <h3 className="text-white font-bold text-xs mb-1">Our Mission</h3>
                        <p className="text-neutral-500 text-[10px] leading-snug">Deliver agency quality at freelancer prices with AI-powered speed.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          DAILY STREAK — Gamification
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="px-5 py-6 border-t border-white/5" style={{ background: '#050505' }}>
                <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Flame className="w-8 h-8 text-amber-500" />
                            <div>
                                <h3 className="text-white font-black text-lg">{streak} Day Streak!</h3>
                                <p className="text-neutral-500 text-xs">Keep opening the app daily</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                            <p className="text-[10px] text-amber-400 font-bold">Top 5%</p>
                        </div>
                    </div>

                    {/* Week dots */}
                    <div className="flex items-center justify-between gap-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 5 ? 'bg-amber-500 text-black' : i === 5 ? 'bg-amber-500/30 text-amber-400 border border-amber-500/40' : 'bg-white/5 text-neutral-600 border border-white/5'
                                    }`}>
                                    {i < 5 ? '✓' : day}
                                </div>
                                <span className="text-[9px] text-neutral-600 font-medium">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          ORDER TRACKING
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="px-5 py-6 border-t border-white/5" style={{ background: '#030303' }}>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-red-400" />
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Track Your Order</h2>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                    <div className="flex gap-3">
                        <input
                            placeholder="Order ID (e.g. #SD-9281)"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40"
                        />
                        <button
                            onClick={handleTrack}
                            className="px-5 py-3 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
                        >
                            Track
                        </button>
                    </div>
                </div>

                {status ? (
                    <div className="space-y-4">
                        {/* Status Card */}
                        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Status</p>
                                <p className="text-red-400 text-lg font-black">{status.status}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Expected</p>
                                <p className="text-white text-lg font-black">{status.estimated}</p>
                            </div>
                        </div>

                        {/* Execution Log */}
                        <div className="rounded-2xl p-5 border border-white/10 font-mono" style={{ background: '#0a0a0a' }}>
                            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                                <Terminal className="w-4 h-4 text-red-400" />
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Execution Log</span>
                            </div>
                            <div className="space-y-1.5 max-h-36 overflow-y-auto text-[10px]">
                                {executionLogs.map((log, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span className="text-neutral-700">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                                        <span className="text-neutral-400">{log}</span>
                                    </div>
                                ))}
                                <div className="w-2 h-4 bg-red-500 animate-pulse inline-block" />
                            </div>
                        </div>

                        {/* Stepper */}
                        <div className="px-4 py-3 flex justify-between items-center relative">
                            <div className="absolute left-10 right-10 top-[1.4rem] h-1 bg-neutral-800 rounded-full -z-10 overflow-hidden">
                                <div className="bg-red-500 h-full w-1/2 rounded-full" />
                            </div>
                            {[
                                { icon: <CheckCircle className="w-5 h-5" />, label: "Received", done: true },
                                { icon: <Clock className="w-5 h-5" />, label: "Active", active: true },
                                { icon: <Package className="w-5 h-5" />, label: "Ready", pending: true }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500 text-white' : step.active ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-800 text-neutral-500'
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase ${step.active ? 'text-red-400' : 'text-neutral-600'}`}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 opacity-40 text-center">
                        <Package className="w-16 h-16 mb-3 text-neutral-600" />
                        <p className="font-bold text-neutral-400 text-sm">No active order tracked.</p>
                        <p className="text-xs text-neutral-600">Enter your ID above to start tracking.</p>
                    </div>
                )}
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="px-5 py-8 border-t border-white/5" style={{ background: '#050505' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 text-center mb-2">Real Impact</p>
                <h2 className="text-lg font-black text-white text-center mb-6">What Founders Say</h2>

                <div className="space-y-3">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <div className="flex gap-1 mb-2">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                                ))}
                            </div>
                            <p className="text-neutral-300 text-xs leading-relaxed mb-3">"{t.text}"</p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-xs">{t.name}</p>
                                    <p className="text-neutral-500 text-[10px]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-5 py-6 border-t border-white/5" style={{ background: '#030303' }}>
                <a
                    href="https://wa.me/916284925684?text=Hi!%20I%20saw%20SAGE%20DO%20app%20and%20want%20to%20learn%20more."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl border border-green-500/20 bg-green-500/5 active:scale-[0.98] transition-all"
                >
                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">Talk to the Founder</p>
                        <p className="text-neutral-400 text-[11px]">Direct WhatsApp — 5 min response</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-500 ml-auto" />
                </a>
            </section>
        </div>
    );
};
