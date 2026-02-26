
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, GraduationCap, Briefcase, Rocket, Palette, 
  Wallet, Star, Flame, ArrowRight, ShieldCheck, Zap, 
  Camera, MessageSquare, Trophy, Eye, ZapOff, Cpu, Mic, Users, Clock, TrendingUp
} from 'lucide-react';
import { Card, Button, Badge, PullToRefresh } from '../mobile-components/UIComponents';
import { AppRoute } from '../mobile-types';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
  onOpenVision: () => void;
  onOpenVoice: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenVision, onOpenVoice }) => {
  const [userPrefs, setUserPrefs] = useState<any>(null);
  const [hustleFeed, setHustleFeed] = useState([
    { user: "Ankit", task: "Business PPT", time: "2m ago" },
    { user: "Sneha", task: "Resume Roast", time: "5m ago" },
    { user: "Arjun", task: "Python Debug", time: "8m ago" }
  ]);
  
  useEffect(() => {
    const prefs = localStorage.getItem('sage_user_prefs');
    if (prefs) setUserPrefs(JSON.parse(prefs));

    const interval = setInterval(() => {
        generateNewHustle();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateNewHustle = () => {
    const tasks = ["Logo Design", "Essay Research", "Ad Copy", "Code Audit", "Market Plan", "UI Kit", "SEO Audit"];
    const names = ["Ishita", "Rahul", "Zain", "Priya", "Kabir", "Aarav", "Tanya"];
    setHustleFeed(prev => [
        { user: names[Math.floor(Math.random()*names.length)], task: tasks[Math.floor(Math.random()*tasks.length)], time: "Just now" },
        ...prev.slice(0, 2)
    ]);
  };

  const handleRefresh = async () => {
    // Simulate API fetch for updated feed and stats
    await new Promise(resolve => setTimeout(resolve, 1500));
    generateNewHustle();
    generateNewHustle();
  };

  const firstName = userPrefs?.name?.split(' ')[0] || 'Sage';

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="pb-32 animate-in fade-in duration-700">
        {/* Top Welcome Bar */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex flex-col">
              <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Namaste</span>
                  <div className="flex items-center gap-1 bg-brand-primary/20 px-2 py-0.5 rounded-full">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
                      <span className="text-[8px] font-black text-brand-primary uppercase">94 Active Experts</span>
                  </div>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Welcome, {firstName}</h2>
          </div>
          <button onClick={() => onNavigate(AppRoute.PROFILE)} className="w-12 h-12 rounded-2xl border-2 border-brand-primary/20 p-0.5 active:scale-90 transition-transform bg-brand-surface overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} className="w-full h-full" alt="User" />
          </button>
        </div>

        {/* Main Hook Card */}
        <div className="px-4 mb-8">
          <div 
            onClick={onOpenVoice}
            className="relative group overflow-hidden rounded-[3rem] bg-brand-surface border border-white/5 p-8 text-white shadow-2xl active:scale-[0.98] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 border border-brand-primary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full mb-6 border border-brand-primary/20">
                  <Sparkles className="w-3 h-3 text-brand-primary fill-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Neural Command Hub</span>
              </div>
              
              <h1 className="text-4xl font-black leading-[1.1] mb-2 tracking-tighter">
                  Need Help?<br/>
                  <span className="text-brand-primary italic">Afcoz!</span>
              </h1>
              
              <p className="text-white/60 text-sm font-bold mb-8 max-w-[280px]">
                  Stop searching. Start doing.<br/>Jarvis for your daily grind.
              </p>

              <div className="flex items-center gap-4">
                  <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 active:scale-95 transition-all">
                      Help Me! →
                  </button>
                  <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                          <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*12}`} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-surface" />
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-primary flex items-center justify-center text-[10px] font-black">+14k</div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Hustle Feed - The "Superiority" Feature */}
        <div className="px-4 mb-8">
          <div className="glass-card rounded-[2.5rem] p-6 border-brand-primary/10 overflow-hidden relative">
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-brand-primary" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Hustle Feed</span>
                  </div>
                  <Badge color="red">Real-Time</Badge>
              </div>
              <div className="space-y-3">
                  {hustleFeed.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between animate-in slide-in-from-right duration-500">
                          <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                              <span className="text-xs font-bold text-gray-300">{item.user} ordered <span className="text-white font-black">{item.task}</span></span>
                          </div>
                          <span className="text-[10px] text-gray-600 font-mono">{item.time}</span>
                      </div>
                  ))}
              </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="px-4 bento-grid mb-12">
          <div 
            onClick={onOpenVision}
            className="bento-large glass-card rounded-[3rem] p-8 flex items-center justify-between border-brand-primary/10 active:scale-[0.98] transition-all cursor-pointer group relative"
          >
              <div className="relative z-10">
                  <h3 className="text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">Multimodal Link</h3>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Sage Vision</h2>
                  <p className="text-gray-500 text-xs mt-3 font-medium">Point & Solve →</p>
              </div>
              <div className="bg-brand-primary/10 p-5 rounded-full text-brand-primary border border-brand-primary/20 group-hover:rotate-12 transition-transform">
                  <Eye className="w-10 h-10" />
              </div>
          </div>

          <div onClick={() => onNavigate(AppRoute.SERVICES)} className="glass-card rounded-[3rem] p-8 flex flex-col justify-between active:scale-95 transition-all border-l-4 border-l-brand-primary">
              <Briefcase className="w-10 h-10 text-brand-primary mb-8" />
              <div>
                  <p className="text-2xl font-black text-white tracking-tighter">Business</p>
                  <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mt-1">10 Pro Tools</p>
              </div>
          </div>

          <div onClick={() => onNavigate(AppRoute.SERVICES)} className="glass-card rounded-[3rem] p-8 flex flex-col justify-between active:scale-95 transition-all">
              <GraduationCap className="w-10 h-10 text-gray-400 mb-8" />
              <div>
                  <p className="text-2xl font-black text-white tracking-tighter">Student</p>
                  <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mt-1">7 Tools</p>
              </div>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
};
