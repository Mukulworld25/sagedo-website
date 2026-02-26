
import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle, Gamepad2, Gift, Zap, Terminal, ShieldCheck } from 'lucide-react';
import { Button, Input, Card, Badge } from '../mobile-components/UIComponents';

export const Track: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [gameScore, setGameScore] = useState(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    if (status) {
        const logs = [
            "Initializing Neural Engine...",
            "Context window expanded to 1M tokens...",
            "Human Expert 'Zain' assigned for audit...",
            "Drafting initial structure...",
            "Deep research phase complete...",
            "Cross-verifying citations...",
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

  return (
    <div className="p-5 pb-24 animate-in fade-in duration-500 min-h-screen flex flex-col">
      <div className="text-center mb-8 mt-4">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full mb-3 border border-brand-primary/20">
           <Zap className="w-3 h-3 text-brand-primary fill-brand-primary" />
           <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Live Sync Status</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">Track Your <span className="text-brand-primary">Result</span></h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Full transparency on every operation.</p>
      </div>

      <div className="bg-white dark:bg-brand-surface p-6 rounded-[2.5rem] border-2 border-brand-primary/10 shadow-xl shadow-brand-primary/5 mb-8">
         <div className="space-y-4">
            <Input 
                placeholder="Enter Order ID (e.g. #SD-9281)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="bg-gray-50 dark:bg-brand-dark/50 border-gray-200 dark:border-brand-border-dark text-center font-black"
            />
            <Button variant="gradient" className="w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest" onClick={handleTrack}>
                Track Order
            </Button>
         </div>
      </div>

      {status ? (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-6">
             <div className="bg-brand-primary/5 p-6 rounded-[2.5rem] border border-brand-primary/10 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Status</p>
                    <p className="text-brand-primary text-xl font-black flex items-center gap-2">{status.status}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Expected</p>
                    <p className="text-gray-900 dark:text-white text-xl font-black">{status.estimated}</p>
                </div>
             </div>

             {/* Neural Execution Log - THE DIFFERENTIATOR */}
             <div className="bg-black rounded-3xl p-6 border border-white/10 font-mono relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <Terminal className="w-4 h-4 text-brand-primary" />
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Execution Log</span>
                </div>
                <div className="space-y-2 h-40 overflow-y-auto hide-scrollbar text-[10px]">
                    {executionLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                            <span className="text-gray-600">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                            <span className="text-gray-300">{log}</span>
                        </div>
                    ))}
                    <div className="w-2 h-4 bg-brand-primary animate-pulse inline-block"></div>
                </div>
                <div className="absolute top-2 right-4">
                    <ShieldCheck className="w-4 h-4 text-brand-success opacity-50" />
                </div>
             </div>
             
             {/* Enhanced Stepper */}
             <div className="px-6 py-4 flex justify-between items-center relative">
                <div className="absolute left-10 right-10 top-[2.1rem] h-1 bg-gray-200 dark:bg-gray-800 rounded-full -z-10 overflow-hidden">
                    <div className="bg-brand-primary h-full w-1/2 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-brand-success flex items-center justify-center text-white ring-4 ring-brand-success/10"><CheckCircle className="w-5 h-5"/></div>
                    <span className="text-[9px] font-black text-gray-500 uppercase">Received</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white ring-4 ring-brand-primary/10 animate-pulse"><Clock className="w-5 h-5"/></div>
                    <span className="text-[9px] font-black text-brand-primary uppercase">Active</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400"><Package className="w-5 h-5"/></div>
                    <span className="text-[9px] font-black text-gray-500 uppercase">Ready</span>
                </div>
             </div>
        </div>
      ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center px-10">
              <Package className="w-20 h-20 mb-4" />
              <p className="font-bold text-lg">No active order tracked.</p>
              <p className="text-sm">Enter your ID above to start tracking.</p>
          </div>
      )}

      {/* Gamified Wait Section */}
      <div className="mt-auto pt-8">
        <div className="bg-brand-sage/10 border-2 border-brand-sage/20 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <Badge color="red">Wait & Win</Badge>
            </div>
            <div className="flex items-center gap-3 mb-4 text-brand-sage">
                <Gamepad2 className="w-8 h-8" />
                <h3 className="text-xl font-black tracking-tighter">Sage Run</h3>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-6">Earn "Sage Coins" for every 10 clicks! Use them for discounts.</p>
            
            <div className="h-32 bg-brand-dark rounded-3xl flex flex-col items-center justify-center relative overflow-hidden border border-white/5">
                <div className="absolute top-4 right-4 text-white font-black text-2xl opacity-20">{gameScore}</div>
                <Button 
                    variant="danger" 
                    className="py-3 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-brand-sage/30 active:scale-90"
                    onClick={() => setGameScore(s => s + 1)}
                >
                    CLICK TO HUSTLE
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
