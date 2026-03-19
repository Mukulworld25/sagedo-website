import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle, Flame, Star, MessageCircle, Rocket, ShieldCheck, Target, Heart, Trophy, ArrowRight, Zap, Terminal, Timer, Truck, Home as HomeIcon, Gamepad2, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

export const Track: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [orderId, setOrderId] = useState('');
    const [trackedOrder, setTrackedOrder] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    // Fetch user's orders if authenticated
    const { data: orders = [] } = useQuery({
        queryKey: ['/api/orders'],
        enabled: isAuthenticated,
    });

    const handleTrack = async () => {
        if (!orderId.trim()) return;
        setIsSearching(true);
        setError('');
        try {
            const cleanId = orderId.replace('#', '').trim();
            const response = await apiRequest('GET', `/api/orders/${cleanId}`);
            const data = await response.json();
            setTrackedOrder(data);
        } catch (err) {
            setError('Order not found. Please check the ID and try again.');
            setTrackedOrder(null);
        } finally {
            setIsSearching(false);
        }
    };

    const stages = [
        { name: "Pending", description: "Order received", icon: Clock },
        { name: "Processing", description: "We're working on it", icon: Package },
        { name: "Finalizing", description: "Quality check", icon: Truck },
        { name: "Delivered", description: "Completed", icon: HomeIcon },
    ];
    const statusToIndex: Record<string, number> = { pending: 0, processing: 1, finalizing: 2, delivered: 3 };

    const getProgress = (status: string) => {
        const map: Record<string, number> = { pending: 10, processing: 40, finalizing: 75, delivered: 100 };
        return map[status] || 0;
    };

    const getCountdown = (order: any) => {
        if (!order?.createdAt) return null;
        const deliveryHours = 48;
        const orderDate = new Date(order.createdAt);
        const deliveryDate = new Date(orderDate.getTime() + deliveryHours * 60 * 60 * 1000);
        const now = new Date();
        const remaining = deliveryDate.getTime() - now.getTime();
        if (remaining <= 0) return null;
        return {
            hours: Math.floor(remaining / (1000 * 60 * 60)),
            minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        };
    };

    return (
        <div className="pb-32">

            {/* ═══════ ABOUT SAGE DO ═══════ */}
            <section className="px-5 pt-6 pb-8" style={{ background: '#030303' }}>
                <div className="flex flex-col items-center text-center mb-8">
                    <img src="/sagedo_logo_final_circle.png" alt="SAGE DO" className="w-20 h-20 mb-4" style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.3))' }} />
                    <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>SAGE DO</h1>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-[0.2em] mb-4">AI + Human Excellence</p>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                        India's first AI + Human hybrid execution team. We combine AI speed with human precision to deliver what agencies can't.
                    </p>
                </div>

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
                        5 years building fighter jets (C130J, F16) taught me one thing: precision matters. Now I bring aerospace-grade execution standards to businesses.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/10">
                        <Target className="w-6 h-6 text-red-400 mb-3" />
                        <h3 className="text-white font-bold text-xs mb-1">Our Vision</h3>
                        <p className="text-neutral-500 text-[10px] leading-snug">Make world-class execution accessible to every founder.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent border border-blue-500/10">
                        <Rocket className="w-6 h-6 text-blue-400 mb-3" />
                        <h3 className="text-white font-bold text-xs mb-1">Our Mission</h3>
                        <p className="text-neutral-500 text-[10px] leading-snug">Agency quality at freelancer prices with AI speed.</p>
                    </div>
                </div>
            </section>

            {/* ═══════ ORDER TRACKING — REAL API ═══════ */}
            <section className="px-5 py-6 border-t border-white/5" style={{ background: '#030303' }}>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-red-400" />
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Track Your Order</h2>
                </div>

                {/* Search bar */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                    <div className="flex gap-3">
                        <input
                            placeholder="Order ID (e.g. #123)"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleTrack()}
                            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40"
                        />
                        <button
                            onClick={handleTrack}
                            disabled={isSearching}
                            className="px-5 py-3 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSearching ? '...' : 'Track'}
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                </div>

                {/* User's recent orders (if logged in) */}
                {isAuthenticated && (orders as any[]).length > 0 && !trackedOrder && (
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-2">Your Recent Orders</p>
                        <div className="space-y-2">
                            {(orders as any[]).slice(0, 3).map((order: any) => (
                                <button
                                    key={order.id}
                                    onClick={() => { setTrackedOrder(order); setOrderId(order.id); }}
                                    className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all"
                                >
                                    <div className="text-left">
                                        <p className="text-white font-bold text-xs">{order.serviceName}</p>
                                        <p className="text-neutral-500 text-[10px]">#{order.id} • {order.status}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${
                                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400'
                                        : order.status === 'processing' ? 'bg-blue-500/20 text-blue-400'
                                        : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                        {order.status}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════ TRACKED ORDER DETAILS ═══════ */}
                {trackedOrder ? (
                    <div className="space-y-4">
                        {/* Status + Progress */}
                        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Service</p>
                                    <p className="text-white text-sm font-black">{trackedOrder.serviceName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Status</p>
                                    <p className={`text-sm font-black ${trackedOrder.status === 'delivered' ? 'text-green-400' : 'text-red-400'}`}>
                                        {trackedOrder.status?.charAt(0).toUpperCase() + trackedOrder.status?.slice(1)}
                                    </p>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                                    style={{ width: `${getProgress(trackedOrder.status)}%` }}
                                />
                            </div>
                            <p className="text-right text-[10px] text-red-400 font-bold mt-1">{getProgress(trackedOrder.status)}%</p>
                        </div>

                        {/* Countdown */}
                        {(() => {
                            const countdown = getCountdown(trackedOrder);
                            if (!countdown || trackedOrder.status === 'delivered') return null;
                            return (
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-2">⏱️ Estimated Delivery In</p>
                                    <div className="flex gap-3 justify-center">
                                        <div className="bg-neutral-900 rounded-xl p-3 min-w-[55px]">
                                            <p className="text-xl font-black text-red-400">{countdown.hours}</p>
                                            <p className="text-[9px] text-neutral-600">Hrs</p>
                                        </div>
                                        <div className="bg-neutral-900 rounded-xl p-3 min-w-[55px]">
                                            <p className="text-xl font-black text-red-400">{countdown.minutes}</p>
                                            <p className="text-[9px] text-neutral-600">Min</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Stage timeline */}
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            {stages.map((stage, index) => {
                                const currentIdx = statusToIndex[trackedOrder.status] || 0;
                                const isCompleted = index <= currentIdx;
                                const isCurrent = index === currentIdx;
                                const Icon = stage.icon;
                                return (
                                    <div key={stage.name} className={`flex items-center gap-4 ${index < stages.length - 1 ? 'pb-4 border-b border-white/5' : ''}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                            isCompleted ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-neutral-800 text-neutral-500'
                                        }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-bold text-xs ${isCompleted ? 'text-white' : 'text-neutral-500'}`}>
                                                {stage.name}
                                                {isCurrent && <span className="ml-2 text-[9px] text-red-400">← Current</span>}
                                            </p>
                                            <p className="text-[10px] text-neutral-600">{stage.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : !error && (
                    <div className="flex flex-col items-center justify-center py-8 opacity-40 text-center">
                        <Package className="w-16 h-16 mb-3 text-neutral-600" />
                        <p className="font-bold text-neutral-400 text-sm">No active order tracked.</p>
                        <p className="text-xs text-neutral-600">Enter your ID above to start tracking.</p>
                    </div>
                )}
            </section>

            {/* ═══════ TESTIMONIALS ═══════ */}
            <section className="px-5 py-8 border-t border-white/5" style={{ background: '#050505' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 text-center mb-2">Real Impact</p>
                <h2 className="text-lg font-black text-white text-center mb-6">What Founders Say</h2>
                <div className="space-y-3">
                    {[
                        { name: "Ravi K.", role: "Restaurant Owner, Chandigarh", text: "I was paying a freelancer ₹30K for a basic website that took 2 months. SAGE DO built something 10x better in days.", rating: 5 },
                        { name: "Priya S.", role: "Coaching Institute, Punjab", text: "SAGE DO took over the tech completely. Now I just teach and they handle everything else.", rating: 5 },
                        { name: "Arjun T.", role: "E-commerce Startup", text: "I messaged on WhatsApp, explained what I needed, and had a working prototype the next day.", rating: 5 }
                    ].map((t, idx) => (
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

            {/* ═══════ BOTTOM CTA ═══════ */}
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
