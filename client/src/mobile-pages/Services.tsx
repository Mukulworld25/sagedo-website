
import React, { useState } from 'react';
// Added Zap and Sparkles to the imports from lucide-react to fix undefined errors
import { FileText, Image as ImageIcon, Briefcase, GraduationCap, User, PenTool, ArrowRight, Wand2, Star, Rocket, Palette, Smartphone, Zap, Sparkles } from 'lucide-react';
import { Button, Card, Badge } from '../mobile-components/UIComponents';
import { AppRoute } from '../mobile-types';

interface ServicesProps {
    onNavigate: (route: AppRoute) => void;
}

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    'brand-primary': { bg: 'bg-brand-primary/10', text: 'text-brand-primary', border: 'border-brand-primary/20' },
    'brand-sage': { bg: 'bg-brand-sage/10', text: 'text-brand-sage', border: 'border-brand-sage/20' },
    'brand-success': { bg: 'bg-brand-success/10', text: 'text-brand-success', border: 'border-brand-success/20' },
};

const ServiceItem = ({ title, count, icon: Icon, onClick, color = 'brand-primary' }: any) => {
    const c = colorClasses[color] || colorClasses['brand-primary'];
    return (
        <div onClick={onClick} className="glass-card rounded-[2.5rem] p-6 border-white/5 active:scale-[0.97] transition-all flex items-center gap-6 group">
            <div className={`w-16 h-16 ${c.bg} rounded-3xl flex items-center justify-center ${c.text} border ${c.border} group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${c.text}`}>{count} Services Available</p>
            </div>
            <div className="p-3 bg-white/5 rounded-full">
                <ArrowRight className="w-5 h-5 text-gray-600" />
            </div>
        </div>
    );
};

export const Tools: React.FC<ServicesProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('marketplace');

    const categories = [
        { id: 'business', title: 'Business', count: 10, icon: Briefcase, color: 'brand-primary', desc: 'Landing pages, ads, automation & more' },
        { id: 'student', title: 'Student', count: 7, icon: GraduationCap, color: 'brand-primary', desc: 'Research, PPTs, photo editing & more' },
        { id: 'professional', title: 'Professional', count: 8, icon: User, color: 'brand-primary', desc: 'Resumes, LinkedIn, cover letters & more' },
        { id: 'personal', title: 'Personal', count: 5, icon: Palette, color: 'brand-primary', desc: 'Reels, diet plans, photo edits & more' },
    ];

    return (
        <div className="pb-24 animate-fade-in">
            {/* Sub Header */}
            <div className="px-5 py-6">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">Assistant Marketplace</h1>
                <p className="text-gray-500 text-sm font-medium">Simple, fast, done... like you.</p>
            </div>

            {/* Categories Section */}
            <div className="px-5 space-y-4">
                {categories.map((cat) => (
                    <ServiceItem
                        key={cat.id}
                        title={cat.title}
                        count={cat.count}
                        icon={cat.icon}
                        color={cat.color}
                        onClick={() => onNavigate(AppRoute.PLACE_ORDER)}
                    />
                ))}
            </div>

            {/* Tool Highlight */}
            <div className="px-5 mt-10">
                <div className="bg-brand-primary p-8 rounded-[3rem] text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black tracking-tight mb-2">Need Instant Solution?</h2>
                        <p className="text-white/70 text-sm font-bold mb-6">Use our AI Tool Core for zero-wait results.</p>
                        <button
                            onClick={() => onNavigate(AppRoute.TOOL_ASSIGNMENT)}
                            className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        >
                            Try AI Tools Now
                        </button>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Zap className="w-48 h-48" />
                    </div>
                </div>
            </div>

            {/* Hook Equations from Website */}
            <div className="px-5 mt-12 text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4">Why Sage Do?</p>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-full">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">AI Power + Human Expertise = 💯 Perfect Results</span>
                </div>
            </div>
        </div>
    );
};

export { AssignmentTool, ImageEditorTool } from './Tools_Impl';
