
import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, Zap, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { generateChatResponse } from '../mobile-services/geminiService';

interface SageVisionProps {
  onClose: () => void;
}

export const SageVision: React.FC<SageVisionProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment', width: { ideal: 1080 }, height: { ideal: 1920 } },
            audio: false 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera permission is required for Sage Vision.");
        onClose();
      }
    }
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);

    const base64Image = canvas.toDataURL('image/jpeg', 0.8);
    
    try {
      const response = await generateChatResponse(
        "Analyze this visual input. What is it, and how can SAGE DO help the user with this object/environment specifically? Be extremely concise, max 3 bullet points.",
        [],
        base64Image,
        'standard'
      );
      setInsight(response.text || "Analysis complete.");
    } catch (err) {
      setInsight("Vision calibration failed. Re-syncing...");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black animate-in fade-in zoom-in duration-500 overflow-hidden">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Viewfinder Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-2 border-brand-accent/40 rounded-[3rem] relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-accent rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-accent rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-accent rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-accent rounded-br-xl"></div>
            <div className="absolute inset-0 bg-brand-accent/5 animate-pulse rounded-[3rem]"></div>
        </div>
      </div>

      {/* UI Controls */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center">
        <button onClick={onClose} className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white">
            <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-brand-accent/20 backdrop-blur-xl px-4 py-2 rounded-full border border-brand-accent/30">
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]"></div>
            <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Live Multimodal Sync</span>
        </div>
      </div>

      {/* Insight Panel */}
      <div className="absolute bottom-12 left-0 right-0 px-6 space-y-4">
        {insight && (
            <div className="bg-brand-dark/80 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex items-center gap-2 mb-3">
                    <BrainCircuit className="w-5 h-5 text-brand-accent" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-accent">Sage Insights</span>
                </div>
                <div className="text-sm text-gray-200 leading-relaxed font-medium markdown-content">{insight}</div>
                <button onClick={() => setInsight(null)} className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Reset View</button>
            </div>
        )}

        <div className="flex justify-center">
            <button 
                onClick={captureAndAnalyze}
                disabled={isAnalyzing}
                className={`relative group w-24 h-24 rounded-full flex items-center justify-center transition-all ${isAnalyzing ? 'scale-90' : 'active:scale-95'}`}
            >
                <div className="absolute inset-0 bg-brand-accent rounded-full opacity-20 group-hover:opacity-30 blur-xl animate-glow-pulse"></div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10">
                    {isAnalyzing ? <Loader2 className="w-10 h-10 text-brand-dark animate-spin" /> : <Zap className="w-10 h-10 text-brand-dark fill-brand-dark" />}
                </div>
            </button>
        </div>
        
        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Point at anything to activate</p>
      </div>
    </div>
  );
};
