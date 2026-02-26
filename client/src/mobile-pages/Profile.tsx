import React from 'react';
import { User, Settings, CreditCard, Shield, LogOut, ChevronRight, Gift, Star, Zap, Globe } from 'lucide-react';
import { Card, Badge, Button } from '../mobile-components/UIComponents';
import { useLanguage } from '../mobile-components/LanguageProvider';
import { useAuth } from '@/contexts/AuthContext';

export const Profile: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };
    return (
        <div className="p-5 space-y-6 pb-24 animate-fade-in">
            {/* Profile Header */}
            <div className="flex items-center gap-5">
                <div className="relative">
                    <div className="w-20 h-20 rounded-3xl border-2 border-brand-primary p-0.5 shadow-xl shadow-brand-primary/20 bg-brand-surface overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'Guest'}`} alt="Profile" className="w-full h-full" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-brand-primary text-white p-1.5 rounded-xl border-4 border-black">
                        <Star className="w-3 h-3 fill-white" />
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-white tracking-tight">{user?.fullName || 'Guest'}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge color={user?.isPro ? "red" : "gray"}>{user?.isPro ? "Pro Member" : "Free Tier"}</Badge>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{user?.email || 'No email link'}</span>
                    </div>
                </div>
            </div>

            {/* Plan Details from Website Pricing */}
            <div className="bg-brand-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">{t('profile.current_plan')}</p>
                            <h3 className="text-3xl font-black">{t('profile.pro_tier')}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black tracking-tighter">₹499<span className="text-xs opacity-60">/mo</span></p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2 text-xs font-bold">
                            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"><Zap className="w-2.5 h-2.5" /></div>
                            <span>{t('profile.service_credit')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"><Zap className="w-2.5 h-2.5" /></div>
                            <span>{t('profile.delivery_time')}</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-brand-primary font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl active:scale-95 transition-all">
                        {t('profile.manage_billing')}
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-3xl p-6 border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('profile.wallet')}</p>
                    <p className="text-xl font-black text-white">₹740.00</p>
                </div>
                <div className="glass-card rounded-3xl p-6 border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('profile.credits')}</p>
                    <p className="text-xl font-black text-brand-primary">4 {t('profile.available')}</p>
                </div>
            </div>

            {/* Menu List */}
            <Card className="p-0 overflow-hidden border-white/5 bg-white/[0.02]">
                {[
                    { icon: User, label: t('profile.personal_info') },
                    { icon: Shield, label: t('profile.security') },
                    { icon: Gift, label: t('profile.referral'), value: '₹100 Bonus' },
                    { icon: Globe, label: t('profile.language'), value: language === 'en' ? 'English' : 'हिन्दी', onClick: toggleLanguage },
                ].map((item, idx) => (
                    <div key={idx} onClick={item.onClick} className="flex items-center justify-between p-5 border-b border-white/5 last:border-0 active:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white/5 rounded-xl text-gray-400">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm text-gray-300">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {item.value && <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-1 rounded-lg">{item.value}</span>}
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                ))}
            </Card>

            <button onClick={() => logout()} className="w-full py-5 text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" /> {t('profile.sign_out')}
            </button>
            <p className="text-center text-[10px] font-black text-gray-700 uppercase tracking-widest mt-4">SAGE DO V3.1 • Proudly Made in India 🇮🇳</p>
        </div>
    );
};
