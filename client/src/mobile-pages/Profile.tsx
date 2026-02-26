import React from 'react';
import {
    User, Settings, Shield, LogOut, ChevronRight, Gift, Star,
    Globe, Bell, Moon, HelpCircle, MessageCircle, FileText,
    Info, Trash2, Lock, Palette, Mail
} from 'lucide-react';
import { useLanguage } from '../mobile-components/LanguageProvider';
import { useAuth } from '@/contexts/AuthContext';
import { AppRoute } from '../mobile-types';

interface ProfileProps {
    onNavigate?: (route: AppRoute) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
    const { t, language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Edit Profile', desc: 'Name, bio, photo' },
                { icon: Lock, label: 'Change Password', desc: 'Update security' },
                { icon: Mail, label: 'Linked Accounts', desc: 'Google, GitHub', value: user?.email ? '1 linked' : 'None' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Globe, label: 'Language', desc: language === 'en' ? 'English' : 'हिन्दी', onClick: toggleLanguage, value: language === 'en' ? 'EN' : 'HI' },
                { icon: Bell, label: 'Notifications', desc: 'Push, email, SMS' },
                { icon: Moon, label: 'Theme', desc: 'Dark mode', value: 'Dark' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: MessageCircle, label: 'WhatsApp Support', desc: '5 min response time', href: 'https://wa.me/916284925684', highlight: true },
                { icon: HelpCircle, label: 'Help Center', desc: 'FAQs and guides' },
                { icon: Mail, label: 'Report a Bug', desc: 'Help us improve' },
            ]
        },
        {
            title: 'Legal',
            items: [
                { icon: FileText, label: 'Privacy Policy', desc: 'How we handle data' },
                { icon: Shield, label: 'Terms of Service', desc: 'Usage agreements' },
                { icon: Info, label: 'About SAGE DO', desc: 'v3.1 · Made in India 🇮🇳' },
            ]
        }
    ];

    return (
        <div className="pb-32">

            {/* ═══════════════════════════════════════════════════════════════════
              PROFILE HEADER
          ═══════════════════════════════════════════════════════════════════ */}
            <div className="px-5 pt-6 pb-6" style={{ background: '#030303' }}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl border-2 border-red-500/30 p-0.5 bg-neutral-900 overflow-hidden shadow-lg shadow-red-500/10">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`} alt="Profile" className="w-full h-full" />
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-lg border-2 border-black">
                            <Star className="w-3 h-3 fill-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-black text-white tracking-tight">{user?.name || 'Guest'}</h2>
                        <p className="text-neutral-500 text-xs mt-0.5">{user?.email || 'No email linked'}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                Free Tier
                            </span>
                        </div>
                    </div>
                </div>

                {/* Free Service Claim Card */}
                {user?.hasGoldenTicket && (
                    <div
                        onClick={() => onNavigate?.(AppRoute.PLACE_ORDER)}
                        className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 cursor-pointer active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0">
                                <Gift className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm">🎁 Claim Your Free Service</h3>
                                <p className="text-neutral-400 text-xs">1 free service worth up to ₹1,000 — as a welcome gift!</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-amber-400" />
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <p className="text-red-400 font-black text-lg">{user?.hasGoldenTicket ? '1' : '0'}</p>
                        <p className="text-neutral-600 text-[9px] font-medium uppercase tracking-wider">Free Credits</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <p className="text-green-400 font-black text-lg">₹100</p>
                        <p className="text-neutral-600 text-[9px] font-medium uppercase tracking-wider">Referral</p>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
              SETTINGS SECTIONS — Instagram/LinkedIn Style
          ═══════════════════════════════════════════════════════════════════ */}
            {sections.map((section, sIdx) => (
                <div key={sIdx} className="px-5 mb-2">
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.15em] mb-2 mt-4 px-1">{section.title}</p>
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]">
                        {section.items.map((item, idx) => {
                            const content = (
                                <div
                                    key={idx}
                                    onClick={item.onClick}
                                    className={`flex items-center justify-between px-4 py-3.5 ${idx < section.items.length - 1 ? 'border-b border-white/5' : ''} ${item.onClick ? 'cursor-pointer' : ''} active:bg-white/5 transition-colors`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${item.highlight ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-neutral-500'}`}>
                                            <item.icon className="w-4.5 h-4.5" />
                                        </div>
                                        <div>
                                            <span className={`font-bold text-sm ${item.highlight ? 'text-green-400' : 'text-neutral-300'}`}>{item.label}</span>
                                            <p className="text-neutral-600 text-[10px]">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.value && (
                                            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-lg">{item.value}</span>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-neutral-700" />
                                    </div>
                                </div>
                            );

                            if ((item as any).href) {
                                return (
                                    <a key={idx} href={(item as any).href} target="_blank" rel="noopener noreferrer" className="block">
                                        {content}
                                    </a>
                                );
                            }
                            return content;
                        })}
                    </div>
                </div>
            ))}

            {/* ═══════════════════════════════════════════════════════════════════
              DANGER ZONE
          ═══════════════════════════════════════════════════════════════════ */}
            <div className="px-5 mt-4 mb-6">
                <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-[0.15em] mb-2 px-1">Danger Zone</p>
                <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 w-full px-4 py-3.5 border-b border-white/5 active:bg-white/5 transition-colors"
                    >
                        <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                            <LogOut className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-bold text-sm text-red-400">Log Out</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3.5 active:bg-white/5 transition-colors">
                        <div className="p-2 rounded-xl bg-red-500/5 text-red-500/50">
                            <Trash2 className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-bold text-sm text-red-500/40">Delete Account</span>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[10px] font-bold text-neutral-800 uppercase tracking-widest pb-2">
                SAGE DO V3.1 • Proudly Made in India 🇮🇳
            </p>
        </div>
    );
};
