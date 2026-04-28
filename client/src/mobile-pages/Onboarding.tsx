
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Check, GraduationCap, Briefcase, Rocket, Palette, Globe, Zap, Cpu, User as UserIcon } from 'lucide-react';
import { Button, Card, Input } from '../mobile-components/UIComponents';

interface OnboardingProps {
  onComplete: (preferences: any) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    name: '',
    persona: '',
    language: 'English',
    tone: 'Professional'
  });

  const personas = [
    { id: 'student', title: 'Student', icon: GraduationCap, desc: 'Assignments, research & study guides' },
    { id: 'pro', title: 'Professional', icon: Briefcase, desc: 'Resumes, LinkedIn & career growth' },
    { id: 'business', title: 'Business Owner', icon: Rocket, desc: 'Ad copies, landing pages & automation' },
    { id: 'creative', title: 'Creative', icon: Palette, desc: 'Content strategy, scripts & editing' },
  ];

  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Hindi', flag: '🇮🇳' },
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'Bengali', flag: '🇧🇩' },
    { name: 'German', flag: '🇩🇪' }
  ];

  const tones = [
    { id: 'Professional', desc: 'Sharp, concise, and executive' },
    { id: 'Casual', desc: 'Friendly, empathetic, and witty' },
    { id: 'Academic', desc: 'Thorough, cited, and detailed' },
    { id: 'Creative', desc: 'Out-of-the-box and experimental' }
  ];

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
    else onComplete(selections);
  };

  const [bootStatus, setBootStatus] = useState("Initializing Core...");

  useEffect(() => {
    if (step === 6) {
      const messages = [
        "Calibrating Thinking Engine...",
        `Greeting ${selections.name || 'User'}...`,
        `Optimizing for ${selections.persona.toUpperCase()} workflow...`,
        `Configuring ${selections.tone} language model...`,
        "Enabling Google Search grounding...",
        "Finalizing persona sync...",
        "Ready to serve."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < messages.length) {
          setBootStatus(messages[i]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(nextStep, 800);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 px-6 h-full justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/40 blur-[100px] animate-pulse"></div>
              <div className="w-36 h-36 bg-gradient-to-br from-brand-primary via-brand-secondary to-indigo-900 rounded-[3rem] flex items-center justify-center shadow-2xl relative z-10 rotate-3 border border-white/20">
                <Sparkles className="w-20 h-20 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter text-white">
                SAGE <span className="text-brand-primary">DO</span>
              </h1>
              <p className="text-gray-400 text-xl leading-snug max-w-xs mx-auto font-medium">
                Your world-class AI agent for intelligent automation.
              </p>
            </div>
            <Button onClick={nextStep} variant="gradient" className="w-full max-w-xs py-5 text-lg rounded-2xl shadow-2xl shadow-brand-primary/40 active:scale-95 transition-transform">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">Powered by Gemini 3.0 Pro</p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-500 px-6 py-12 flex flex-col h-full justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-brand-primary/20">
                <UserIcon className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black text-white mb-3">Hello there!</h2>
              <p className="text-gray-400 text-lg">What should we call you?</p>
            </div>
            <div className="space-y-6">
              <Input
                placeholder="Enter your name"
                value={selections.name}
                onChange={(e) => setSelections({ ...selections, name: e.target.value })}
                className="text-center text-2xl font-bold py-6 bg-brand-surface/50 border-brand-border-dark focus:border-brand-primary"
                autoFocus
              />
              <Button
                onClick={nextStep}
                disabled={!selections.name.trim()}
                variant="gradient"
                className="w-full py-5 rounded-2xl shadow-xl disabled:opacity-30"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-12 duration-500 px-6 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">My primary goal is...</h2>
              <p className="text-gray-400 text-sm">Sage adapts its intelligence to your workflow.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {personas.map((p) => (
                <Card
                  key={p.id}
                  onClick={() => setSelections({ ...selections, persona: p.id })}
                  className={`flex items-center gap-5 p-5 transition-all border-2 group active:scale-[0.97] rounded-3xl ${selections.persona === p.id ? 'border-brand-primary bg-brand-primary/10 shadow-lg shadow-brand-primary/10' : 'border-brand-border-dark bg-brand-surface/40'}`}
                >
                  <div className={`p-4 rounded-2xl transition-all ${selections.persona === p.id ? 'bg-brand-primary text-white scale-110' : 'bg-brand-dark text-gray-500'}`}>
                    <p.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${selections.persona === p.id ? 'text-white' : 'text-gray-300'}`}>{p.title}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{p.desc}</p>
                  </div>
                  {selections.persona === p.id && <div className="bg-brand-primary p-1.5 rounded-full ring-4 ring-brand-primary/20"><Check className="w-4 h-4 text-white" /></div>}
                </Card>
              ))}
            </div>
            <Button onClick={nextStep} disabled={!selections.persona} variant="gradient" className="w-full py-5 rounded-2xl mt-4 shadow-xl">
              Next Step
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-12 duration-500 px-6 py-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-500/20">
                <Globe className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Native Language</h2>
              <p className="text-gray-400 text-sm">Pick your primary language for interaction.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages.map(lang => (
                <button
                  key={lang.name}
                  onClick={() => setSelections({ ...selections, language: lang.name })}
                  className={`p-6 rounded-3xl border-2 transition-all text-sm font-bold flex flex-col items-center gap-2 active:scale-90 ${selections.language === lang.name ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/10' : 'border-brand-border-dark text-gray-500 bg-brand-surface/30'}`}
                >
                  <span className="text-3xl mb-1">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            <Button onClick={nextStep} variant="gradient" className="w-full py-5 rounded-2xl mt-12 shadow-xl">
              Almost Done
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-12 duration-500 px-6 py-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-brand-sage/10 text-brand-sage rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-brand-sage/20">
                <Zap className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">AI Personality</h2>
              <p className="text-gray-400 text-sm">How should Sage talk to you?</p>
            </div>
            <div className="space-y-4">
              {tones.map(tone => (
                <button
                  key={tone.id}
                  onClick={() => setSelections({ ...selections, tone: tone.id })}
                  className={`w-full p-6 rounded-3xl border-2 transition-all text-left flex items-center justify-between active:scale-[0.98] ${selections.tone === tone.id ? 'border-brand-sage bg-brand-sage/10 text-white shadow-lg' : 'border-brand-border-dark text-gray-500 bg-brand-surface/30'}`}
                >
                  <div>
                    <span className="text-sm font-black uppercase tracking-wider block mb-1">{tone.id}</span>
                    <span className="text-xs opacity-60 font-medium">{tone.desc}</span>
                  </div>
                  {selections.tone === tone.id && <div className="bg-brand-sage p-1.5 rounded-full"><Check className="w-4 h-4 text-white" /></div>}
                </button>
              ))}
            </div>
            <Button onClick={nextStep} variant="danger" className="w-full py-5 rounded-2xl mt-8 shadow-2xl shadow-brand-sage/30">
              Initialize Sage
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-12 px-8 h-full animate-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary blur-[120px] opacity-40 animate-pulse"></div>
              <div className="relative z-10 p-12 bg-brand-surface/80 backdrop-blur-2xl border border-white/10 rounded-[4rem] animate-spin-slow shadow-2xl">
                <Cpu className="w-24 h-24 text-brand-primary" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white tracking-tight uppercase animate-pulse">{bootStatus}</h2>
              <div className="w-72 bg-brand-dark h-2 rounded-full overflow-hidden mx-auto border border-white/5 p-[1px]">
                <div className="bg-gradient-to-r from-brand-primary via-indigo-400 to-brand-secondary h-full animate-progress-flow rounded-full"></div>
              </div>
            </div>
            <style>{`
                @keyframes progress-flow {
                    0% { width: 0%; opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { width: 100%; opacity: 0.8; }
                }
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
            `}</style>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col overflow-y-auto hide-scrollbar">
      <div className="w-full max-w-md mx-auto h-full flex flex-col relative">
        {renderStep()}

        {step > 1 && step < 6 && (
          <div className="mt-auto mb-12 flex justify-center gap-3 px-6 animate-in fade-in duration-700">
            {[2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${step === i ? 'w-16 bg-brand-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-3 bg-brand-border-dark'}`}></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
