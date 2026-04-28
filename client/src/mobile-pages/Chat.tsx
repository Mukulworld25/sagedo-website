import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image as ImageIcon, Bot, User, Copy, RotateCcw, X, Search, MapPin, BrainCircuit, Sparkles, ExternalLink } from 'lucide-react';
import { generateChatResponse } from '../mobile-services/geminiService';
import { ChatMessage, ChatMode } from '../mobile-types';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hi! I'm Sage, your AI assistant. I've been calibrated to your preferences. How can I help you today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mode, setMode] = useState<ChatMode>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const [userPrefs, setUserPrefs] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prefs = localStorage.getItem('sage_user_prefs');
    if (prefs) {
      setUserPrefs(JSON.parse(prefs));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (mode === 'maps' && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => console.error("Location error:", error)
      );
    }
  }, [mode]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => !m.isError)
        .map(m => ({
          role: m.role as 'user' | 'model',
          text: m.text,
          image: m.image
        }));

      const response = await generateChatResponse(userMsg.text, history, currentImage || undefined, mode, userLocation, userPrefs);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I'm sorry, I couldn't generate a response.",
        groundingMetadata: response.groundingMetadata,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderGrounding = (metadata: any) => {
    if (!metadata?.groundingChunks) return null;
    const chunks = metadata.groundingChunks;
    const webSources = chunks.filter((c: any) => c.web).map((c: any) => c.web);
    const mapSources = chunks.filter((c: any) => c.maps).map((c: any) => c.maps);

    if (webSources.length === 0 && mapSources.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
        {webSources.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Search className="w-3 h-3"/> Web Sources
            </p>
            <div className="flex flex-col gap-1.5">
              {webSources.map((source: any, idx: number) => (
                <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-brand-dark/50 border border-gray-100 dark:border-brand-border-dark hover:border-brand-primary/30 transition-all">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{source.title || "Source"}</span>
                    <span className="text-[10px] text-gray-400 truncate">{new URL(source.uri).hostname}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
        {mapSources.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3"/> Locations
            </p>
             <div className="flex flex-col gap-1.5">
              {mapSources.map((source: any, idx: number) => (
                <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 hover:border-green-500/30 transition-all">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold text-green-700 dark:text-green-400 truncate">{source.title}</span>
                  </div>
                  <MapPin className="w-3 h-3 text-green-500 ml-2 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="px-4 py-2 border-b border-gray-100 dark:border-brand-border-dark flex gap-2 overflow-x-auto hide-scrollbar bg-white dark:bg-brand-dark z-10">
        <button onClick={() => setMode('standard')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${mode === 'standard' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-surface text-gray-400 border-brand-border-dark'}`}><Sparkles className="w-3 h-3" /> Sage</button>
        <button onClick={() => setMode('thinking')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${mode === 'thinking' ? 'bg-purple-600 text-white border-purple-600' : 'bg-brand-surface text-gray-400 border-brand-border-dark'}`}><BrainCircuit className="w-3 h-3" /> Think</button>
        <button onClick={() => setMode('search')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${mode === 'search' ? 'bg-blue-600 text-white border-blue-600' : 'bg-brand-surface text-gray-400 border-brand-border-dark'}`}><Search className="w-3 h-3" /> Search</button>
        <button onClick={() => setMode('maps')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${mode === 'maps' ? 'bg-green-600 text-white border-green-600' : 'bg-brand-surface text-gray-400 border-brand-border-dark'}`}><MapPin className="w-3 h-3" /> Maps</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gradient-to-br from-brand-primary to-brand-secondary shadow-md'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div className={`max-w-[85%] flex flex-col items-${msg.role === 'user' ? 'end' : 'start'}`}>
              {msg.image && <div className="mb-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"><img src={msg.image} className="max-w-[200px] max-h-[200px] object-cover" /></div>}
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-white dark:bg-brand-surface text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-brand-border-dark rounded-tl-none'}`}>
                <div className="whitespace-pre-wrap markdown-content">{msg.text}</div>
                {renderGrounding(msg.groundingMetadata)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex gap-3 animate-pulse"><div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div><div className="bg-brand-surface px-4 py-3 rounded-2xl rounded-tl-none border border-brand-border-dark flex gap-1.5 items-center"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-100"></div><div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-200"></div></div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-brand-border-dark relative">
        {selectedImage && <div className="mb-3 relative inline-block animate-fade-in"><img src={selectedImage} className="h-16 w-16 object-cover rounded-xl border-2 border-brand-primary shadow-lg" /><button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"><X className="w-3 h-3" /></button></div>}
        <div className="flex items-end gap-2 bg-gray-50 dark:bg-brand-surface border border-gray-200 dark:border-brand-border-dark rounded-[24px] px-4 py-1.5 focus-within:ring-2 focus-within:ring-brand-primary/30 transition-all">
          <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-gray-400 hover:text-brand-primary"><ImageIcon className="w-5 h-5" /></button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Sage..." className="flex-1 bg-transparent border-none outline-none text-sm py-3 max-h-32 resize-none dark:text-white" rows={1} onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
          <button onClick={handleSend} disabled={!input.trim() && !selectedImage} className={`p-2.5 rounded-full transition-all ${input.trim() || selectedImage ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400'}`}><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};