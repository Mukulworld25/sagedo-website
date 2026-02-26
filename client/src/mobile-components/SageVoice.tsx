
import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { X, Mic, MicOff, Volume2, BrainCircuit, Loader2, Sparkles } from 'lucide-react';

interface SageVoiceProps {
  onClose: () => void;
}

export const SageVoice: React.FC<SageVoiceProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'idle'>('connecting');
  const [transcription, setTranscription] = useState('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // PCM Encoding/Decoding Helpers
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };
  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  useEffect(() => {
    const initLiveSession = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        audioContextRef.current = outputCtx;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          callbacks: {
            onopen: () => {
              setStatus('listening');
              const source = inputCtx.createMediaStreamSource(stream);
              const processor = inputCtx.createScriptProcessor(4096, 1, 1);
              processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const int16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ 
                    media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
                  });
                });
              };
              source.connect(processor);
              processor.connect(inputCtx.destination);
            },
            onmessage: async (msg) => {
              const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (audioData) {
                setStatus('speaking');
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const buffer = await decodeAudioData(decode(audioData), outputCtx);
                const source = outputCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outputCtx.destination);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
                source.onended = () => {
                    sourcesRef.current.delete(source);
                    if (sourcesRef.current.size === 0) setStatus('listening');
                };
              }
              if (msg.serverContent?.outputTranscription) {
                setTranscription(prev => prev + ' ' + msg.serverContent!.outputTranscription!.text);
              }
              if (msg.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setStatus('listening');
              }
            },
            onclose: () => setStatus('idle'),
            onerror: () => setStatus('idle'),
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
            systemInstruction: 'You are Sage, a hyper-intelligent, Jarvis-like OS. Be concise, brilliant, and slightly witty. Focus on immediate solutions.',
            outputAudioTranscription: {},
          }
        });
        
        sessionRef.current = await sessionPromise;
      } catch (err) {
        console.error(err);
        onClose();
      }
    };

    initLiveSession();
    return () => {
      sessionRef.current?.close();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-between py-20 px-8 animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Neural Link Active</span>
        </div>
        <button onClick={onClose} className="p-4 bg-white/5 rounded-full text-white border border-white/10 active:scale-90 transition-all">
            <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <div className={`neural-orb transition-all duration-1000 ${
            status === 'listening' ? 'animate-orb-listening' : 
            status === 'speaking' ? 'animate-orb-speaking' : 'animate-orb-pulse'
        }`}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            {status === 'connecting' ? <Loader2 className="w-8 h-8 text-white animate-spin opacity-50" /> : <Volume2 className="w-8 h-8 text-white animate-pulse" />}
        </div>

        <div className="mt-20 text-center space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tighter">
                {status === 'listening' ? "I'm Listening..." : status === 'speaking' ? "Thinking Out Loud..." : "Connecting..."}
            </h2>
            <div className="max-w-xs mx-auto overflow-hidden">
                <p className="text-brand-accent/60 font-mono text-xs uppercase tracking-widest animate-pulse">
                    Encrypted Stream Protocol 3.0
                </p>
            </div>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 min-h-[100px] flex items-center justify-center text-center">
            <p className="text-gray-300 text-sm font-medium italic">
                {transcription || "Say something like 'Hey Sage, plan my week'..."}
            </p>
        </div>
        <div className="flex justify-center gap-6">
            <button className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10"><MicOff className="w-6 h-6" /></button>
            <button onClick={onClose} className="px-12 rounded-full bg-brand-error text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-error/30">End Link</button>
            <button className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10"><Volume2 className="w-6 h-6" /></button>
        </div>
      </div>
    </div>
  );
};
