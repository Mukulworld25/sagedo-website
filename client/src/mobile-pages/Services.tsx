
import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, Crown, Rocket, Sparkles, Star, Zap, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import { AppRoute } from '../mobile-types';
import { allServices } from '../data/serviceData';

interface ServicesProps {
    onNavigate: (route: AppRoute) => void;
}

const tabData = [
    {
        id: 'empire',
        label: 'Empire Builder',
        icon: '👑',
        subtitle: 'For Founders & Startups',
        desc: 'AI + Human packages to launch and scale',
        categories: ['Business', 'Startup Launch'],
        packages: [
            { name: "Starter Launch", price: "₹15,000", desc: "Website ready for solo founders", delivery: "7 days", badge: "STARTER", features: ["AI Landing Page", "Human Brand Identity", "Domain Setup", "SEO Basics"] },
            { name: "Full Launch", price: "₹35,000", desc: "Complete technical & creative execution", delivery: "10-12 days", badge: "POPULAR", features: ["Full Website + Content", "Human Strategy + Design", "Social Media Kit", "Analytics Setup"] },
            { name: "VIP Launch", price: "₹95,000", desc: "Full stack web + mobile + branding", delivery: "15 days", badge: "VIP", features: ["Web + Mobile App", "Human UX + Testing", "Complete Branding", "1-Month Support"] }
        ]
    },
    {
        id: 'growth',
        label: 'Growth Accelerator',
        icon: '🚀',
        subtitle: 'For Professionals & Businesses',
        desc: 'AI + Human services for career growth',
        categories: ['Professional'],
    },
    {
        id: 'universal',
        label: 'Universal Toolkit',
        icon: '❤️',
        subtitle: 'For Everyone',
        desc: 'Quick deliverables, affordable pricing',
        categories: ['Personal', 'All'],
    }
];

export const Tools: React.FC<ServicesProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('empire');
    const [searchQuery, setSearchQuery] = useState('');

    const currentTab = tabData.find(t => t.id === activeTab)!;

    const filteredServices = useMemo(() => {
        let services = allServices.filter(s => currentTab.categories.includes(s.category));

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            services = allServices.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.category.toLowerCase().includes(q)
            );
        }

        return services;
    }, [activeTab, searchQuery, currentTab.categories]);

    return (
        <div className="pb-32">

            {/* Hero */}
            <div className="px-5 pt-6 pb-4">
                <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Build Your Legacy.
                </h1>
                <p className="text-xs text-neutral-400">
                    Every service powered by <span className="text-red-400 font-bold">AI Speed + Human Precision</span>
                </p>
            </div>

            {/* Search Bar */}
            <div className="px-5 mb-5">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search 30+ services..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40 focus:bg-white/[0.05] transition-all"
                    />
                </div>
            </div>

            {/* Tab Bar (horizontal scroll) */}
            <div className="px-5 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {tabData.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap shrink-0 transition-all active:scale-95 ${activeTab === tab.id
                                    ? 'bg-red-500/15 border border-red-500/30 text-white'
                                    : 'bg-white/[0.03] border border-white/5 text-neutral-400'
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <div className="text-left">
                                <p className="text-xs font-bold leading-tight">{tab.label}</p>
                                <p className="text-[9px] opacity-60 leading-tight">{tab.subtitle}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Description */}
            {!searchQuery && (
                <div className="px-5 mb-6">
                    <p className="text-neutral-500 text-xs">{currentTab.desc}</p>
                </div>
            )}

            {/* Launch Packages (Empire Builder only) */}
            {activeTab === 'empire' && !searchQuery && currentTab.packages && (
                <div className="px-5 mb-8">
                    <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" /> Founder's Launch Packages
                    </h2>

                    <div className="space-y-3">
                        {currentTab.packages.map((pkg, idx) => (
                            <div
                                key={idx}
                                onClick={() => onNavigate(AppRoute.PLACE_ORDER)}
                                className={`p-5 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${idx === 1
                                        ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/10'
                                        : 'bg-white/[0.02] border-white/5'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-white font-bold text-sm">{pkg.name}</h3>
                                        {idx === 1 && (
                                            <span className="text-[8px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                ⭐ Most Popular
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-red-400 font-black text-lg">{pkg.price}</span>
                                </div>
                                <p className="text-neutral-400 text-xs mb-3">{pkg.desc}</p>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-3 h-3 text-neutral-600" />
                                    <span className="text-neutral-500 text-[11px]">{pkg.delivery}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {pkg.features.map((f, i) => (
                                        <span key={i} className="text-[10px] font-medium px-2 py-1 rounded-lg bg-white/[0.04] text-neutral-300 border border-white/5">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Service Grid */}
            <div className="px-5">
                <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    {searchQuery ? `Results for "${searchQuery}"` : 'Individual Services'}
                </h2>

                {filteredServices.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-500 text-sm">No services found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {filteredServices.map(service => (
                            <div
                                key={service.id}
                                onClick={() => onNavigate(AppRoute.PLACE_ORDER)}
                                className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 active:scale-[0.97] transition-all cursor-pointer group"
                            >
                                {/* Service Image */}
                                <div className="relative h-28 overflow-hidden">
                                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {service.isGoldenEligible && (
                                        <span className="absolute top-2 left-2 text-[8px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-500/20">
                                            🎫 Free Eligible
                                        </span>
                                    )}
                                    <span className="absolute bottom-2 right-2 text-red-400 font-black text-sm">{service.priceRange.split(' - ')[0]}</span>
                                </div>

                                {/* Service Info */}
                                <div className="p-3">
                                    <h3 className="text-white font-bold text-xs leading-tight mb-1 line-clamp-2">{service.name}</h3>
                                    <p className="text-neutral-500 text-[10px] leading-snug line-clamp-2">{service.description}</p>
                                    <div className="flex items-center gap-1 mt-2 text-[9px] font-medium text-red-400">
                                        <span>🤖 AI Speed</span>
                                        <span className="text-neutral-700">+</span>
                                        <span>🧠 Human Quality</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* WhatsApp CTA */}
            <div className="px-5 mt-8 mb-4">
                <a
                    href="https://wa.me/916284925684?text=Hi!%20I%20need%20help%20choosing%20the%20right%20service%20for%20my%20needs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl border border-green-500/20 bg-green-500/5 active:scale-[0.98] transition-all"
                >
                    <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-bold text-sm">Can't decide? Let's talk.</p>
                        <p className="text-neutral-400 text-xs">Free consultation on WhatsApp — 5 min response</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-500" />
                </a>
            </div>
        </div>
    );
};

export { AssignmentTool, ImageEditorTool } from './Tools_Impl';
