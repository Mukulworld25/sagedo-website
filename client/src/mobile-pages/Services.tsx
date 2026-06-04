
import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, Crown, Rocket, Sparkles, Star, Zap, Clock, MessageCircle, ChevronRight, X, CheckCircle2, Shield } from 'lucide-react';
import { AppRoute } from '../mobile-types';
import { allServices, ServiceDetail } from '../data/serviceData';

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
        label: 'Scale Business',
        icon: '🚀',
        subtitle: 'For Growing Companies',
        desc: 'AI + Human services for business growth',
        categories: ['Scale Business'],
    },
    {
        id: 'universal',
        label: 'AI Automation Systems',
        icon: '🤖',
        subtitle: 'For Workflow Efficiency',
        desc: 'Automate operations, CRM & custom bots',
        categories: ['AI Automation'],
    }
];

export const Tools: React.FC<ServicesProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('empire');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
    const [showAllServices, setShowAllServices] = useState(false);

    const currentTab = tabData.find(t => t.id === activeTab)!;

    const FEATURED_IDS = ["b04", "b05", "b02", "ai_agent_dev"];
    const featuredServices = useMemo(() => {
        return allServices.filter(s => FEATURED_IDS.includes(s.id));
    }, []);

    const specializedServices = useMemo(() => {
        return allServices.filter(s => currentTab.categories.includes(s.category) && !FEATURED_IDS.includes(s.id));
    }, [currentTab]);

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

            {/* Tab Bar */}
            <div className="px-5 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {tabData.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSearchQuery(''); setShowAllServices(false); }}
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
                                onClick={() => {
                                    const matchingSvc = allServices.find(s => s.name === pkg.name);
                                    if (matchingSvc) {
                                        localStorage.setItem('sagedo_mobile_preselect_service', matchingSvc.id);
                                    }
                                    onNavigate(AppRoute.PLACE_ORDER);
                                }}
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
                    {searchQuery ? `Results for "${searchQuery}"` : 'B2B Core & Specialized Solutions'}
                </h2>

                {searchQuery.trim() ? (
                    filteredServices.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-500 text-sm">No services found. Try a different search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {filteredServices.map(service => (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedService(service)}
                                    className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 active:scale-[0.97] transition-all cursor-pointer group"
                                >
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
                    )
                ) : (
                    <>
                        {/* 1. Core B2B Featured Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {featuredServices.map(service => (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedService(service)}
                                    className="rounded-2xl overflow-hidden bg-gradient-to-b from-white/8 to-white/[0.02] border border-amber-500/20 active:scale-[0.97] transition-all cursor-pointer group shadow-lg shadow-amber-500/5"
                                >
                                    <div className="relative h-28 overflow-hidden">
                                        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        {service.badge && (
                                            <span className="absolute top-2 left-2 text-[8px] font-black bg-amber-500 text-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                {service.badge}
                                            </span>
                                        )}
                                        <span className="absolute bottom-2 right-2 text-amber-400 font-black text-[10px] bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/20">{service.priceRange.split(' – ')[0]}</span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-white font-extrabold text-xs leading-tight mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">{service.name}</h3>
                                        <p className="text-neutral-400 text-[10px] leading-snug line-clamp-2 mb-2">{service.description}</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {service.standardFeatures.slice(0, 2).map((feat, i) => (
                                                <span key={i} className="text-[8px] font-semibold px-1.5 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/5 line-clamp-1">
                                                    ✓ {feat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 2. Expandable Drawer Button */}
                        {specializedServices.length > 0 && (
                            <div className="mt-5 mb-3 flex justify-center">
                                <button
                                    onClick={() => setShowAllServices(!showAllServices)}
                                    className="group relative flex items-center justify-between w-full py-4 px-5 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/25 rounded-2xl active:scale-[0.98] transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-red-500/20 rounded-xl text-red-400">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xs text-white">
                                                Explore {specializedServices.length}+ Specialized Services
                                            </h3>
                                            <p className="text-[9px] text-neutral-400">
                                                Click to view full B2B catalog
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-neutral-400">
                                        <ChevronRight
                                            className="w-4 h-4"
                                            style={{
                                                transform: showAllServices ? 'rotate(270deg)' : 'rotate(90deg)',
                                                transition: 'transform 0.3s'
                                            }}
                                        />
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* 3. Specialized Services Grid */}
                        {showAllServices && (
                            <div className="grid grid-cols-2 gap-3 mt-3 animate-fade-in">
                                {specializedServices.map(service => (
                                    <div
                                        key={service.id}
                                        onClick={() => setSelectedService(service)}
                                        className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 active:scale-[0.97] transition-all cursor-pointer group"
                                    >
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
                    </>
                )}
            </div>

            {/* ═══════ SERVICE DETAIL MODAL ═══════ */}
            {selectedService && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
                    {/* Header image */}
                    <div className="relative h-48 shrink-0">
                        <img src={selectedService.imageUrl} alt={selectedService.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-sm active:scale-90 transition-all"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute bottom-4 left-5 right-5">
                            <h2 className="text-xl font-black text-white mb-1">{selectedService.name}</h2>
                            <p className="text-red-400 font-black text-lg">{selectedService.priceRange}</p>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                        <p className="text-neutral-300 text-sm leading-relaxed">{selectedService.fullDescription}</p>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-wider mb-1">Category</p>
                                <p className="text-white font-bold text-xs">{selectedService.category}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-wider mb-1">Delivery</p>
                                <p className="text-white font-bold text-xs flex items-center justify-center gap-1">
                                    <Clock className="w-3 h-3 text-red-400" /> {selectedService.deliveryTime || '24-48 hrs'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-3">What's Included</p>
                            <div className="space-y-2.5">
                                {selectedService.standardFeatures.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                        <span className="text-sm text-neutral-200">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedService.premiumFeatures.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-3">Premium Upgrades</p>
                                <div className="space-y-2.5">
                                    {selectedService.premiumFeatures.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Star className="w-4 h-4 text-amber-500 shrink-0" />
                                            <span className="text-sm text-neutral-400">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(selectedService.howWeDoIt || selectedService.howWeStart || selectedService.whatItTakes || selectedService.whatIsIncluded) && (
                            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">Execution Blueprint</p>
                                
                                {selectedService.howWeDoIt && (
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">⚙️ How We Do It</p>
                                        <p className="text-xs text-neutral-300 leading-relaxed">{selectedService.howWeDoIt}</p>
                                    </div>
                                )}
                                {selectedService.howWeStart && (
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-green-400">🚀 How We Start</p>
                                        <p className="text-xs text-neutral-300 leading-relaxed">{selectedService.howWeStart}</p>
                                    </div>
                                )}
                                {selectedService.whatItTakes && (
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">📋 What You Provide</p>
                                        <p className="text-xs text-neutral-300 leading-relaxed">{selectedService.whatItTakes}</p>
                                    </div>
                                )}
                                {selectedService.whatIsIncluded && selectedService.whatIsIncluded.length > 0 && (
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">📦 Full Inclusions</p>
                                        <ul className="space-y-1.5">
                                            {selectedService.whatIsIncluded.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                                                    <span className="text-xs text-neutral-300 leading-tight">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {selectedService.costDetails && (
                                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 text-xs font-semibold text-green-400">
                                        💰 Pricing: {selectedService.costDetails}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-600 pt-2">
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> Satisfaction Guarantee</span>
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-red-400" /> AI + Human Quality</span>
                        </div>
                    </div>

                    {/* Fixed bottom CTA */}
                    <div className="px-5 py-4 bg-black border-t border-white/5">
                        <button
                            onClick={() => { 
                                localStorage.setItem('sagedo_mobile_preselect_service', selectedService.id);
                                setSelectedService(null); 
                                onNavigate(AppRoute.PLACE_ORDER); 
                            }}
                            className="w-full py-4 rounded-2xl bg-red-600 text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                            style={{ boxShadow: '0 4px 20px rgba(239,68,68,0.3)' }}
                        >
                            Order Now — {selectedService.priceRange.split(' - ')[0]} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

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

export { ImageEditorTool } from './Tools_Impl';
