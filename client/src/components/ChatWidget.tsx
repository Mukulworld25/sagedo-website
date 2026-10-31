import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, ArrowRight, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { faqs } from "@/data/faqs";

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    options?: { label: string; action: string }[];
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [fallbackCount, setFallbackCount] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: "Namaste! I'm Bruno, Chief of Staff at SAGE DO. How can I assist your business systems today?",
            sender: 'bot',
            options: [
                { label: "Check Pricing", action: "pricing" },
                { label: "Turnkey Combos", action: "combos" },
                { label: "Book a Call", action: "book_call" },
                { label: "Talk to Mukul", action: "human" }
            ]
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isTyping) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        try {
            // Call Bruno AI API
            const response = await fetch('/api/bruno/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text }),
                credentials: 'include'
            });

            const data = await response.json();

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.text || "I'm having trouble thinking right now! 🙈",
                sender: 'bot',
                options: data.options?.map((opt: string) => ({ label: opt, action: opt.toLowerCase().replace(/\s+/g, '_') }))
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Bruno API error:', error);
            // Fallback to local logic if API fails
            const fallbackResponse = findAnswer(userMsg.text);
            setMessages(prev => [...prev, fallbackResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleOptionClick = (action: string) => {
        // Add user selection as message
        const label = messages[messages.length - 1].options?.find(o => o.action === action)?.label || action;
        const userMsg: Message = {
            id: Date.now().toString(),
            text: label,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            let response: Message;

            if (action === 'human') {
                window.open("https://wa.me/916284925684", "_blank");
                response = {
                    id: Date.now().toString(),
                    text: "I've opened WhatsApp for you! Use it to chat directly with our human team. We usually reply within 2 hours.",
                    sender: 'bot'
                };
                setFallbackCount(0); // Reset on success
            } else {
                // Search by ID/Category matching the action
                const faq = faqs.find(f => f.id === action || f.category === action);

                if (faq) {
                    response = {
                        id: Date.now().toString(),
                        text: faq.answer,
                        sender: 'bot',
                        options: [
                            { label: "Ask another question", action: "reset" },
                            { label: "Place Order", action: "start_order" } // New CTA
                        ]
                    };
                    setFallbackCount(0); // Reset on success
                } else if (action === 'start_order') {
                    // Simple redirection for now, or instructions
                    window.location.href = '/orders'; // Direct navigation
                    response = {
                        id: Date.now().toString(),
                        text: "Great! Taking you to the order page now...",
                        sender: 'bot'
                    };
                } else if (action === 'book_call') {
                    window.location.href = '/book-call';
                    response = {
                        id: Date.now().toString(),
                        text: "Opening our Founder Intake Terminal for you to schedule your scoping call...",
                        sender: 'bot'
                    };
                } else if (action === 'combos') {
                    window.location.href = '/services';
                    response = {
                        id: Date.now().toString(),
                        text: "Opening our Modular Services, Combos & Partner Rails catalog...",
                        sender: 'bot'
                    };
                } else if (action === 'wall_of_fame') {
                    window.location.href = '/wall-of-fame';
                    response = {
                        id: Date.now().toString(),
                        text: "Opening the Wall of Fame for you to inspect authentic receipts, case studies, and voice notes...",
                        sender: 'bot'
                    };
                } else if (action === 'services') {
                    window.location.href = '/services';
                    response = {
                        id: Date.now().toString(),
                        text: "Opening our Services page for you...",
                        sender: 'bot'
                    };
                } else if (action === 'trending') {
                    // Specific handling for trending to ensure it looks good
                    const trendingFaq = faqs.find(f => f.id === 'trending');
                    response = {
                        id: Date.now().toString(),
                        text: trendingFaq ? trendingFaq.answer : "Check out our top services on the Services page!",
                        sender: 'bot',
                        options: [
                            { label: "Pricing?", action: "pricing" },
                            { label: "Start an Order", action: "start_order" }
                        ]
                    };
                    setFallbackCount(0);
                } else {
                    // Try to find by keyword from the action name itself
                    response = findAnswer(translateActionToKeyword(action));
                }
            }
            setMessages(prev => [...prev, response]);
        }, 550);
    };

    const translateActionToKeyword = (action: string) => {
        if (action === 'services') return 'services';
        if (action === 'pricing') return 'price';
        return action;
    }

    const findAnswer = (query: string): Message => {
        const lowerQuery = query.toLowerCase();

        // 1. Pricing / Cost Queries
        if (lowerQuery.includes('price') || lowerQuery.includes('pricing') || lowerQuery.includes('cost') || lowerQuery.includes('rate') || lowerQuery.includes('fee') || lowerQuery.includes('how much')) {
            return {
                id: Date.now().toString(),
                text: "Here is our verified commercial pricing:\n\n• Websites: SMB ₹10k–₹20k | Enterprise ₹15k–₹30k (Sub-1.2s speed)\n• Custom CRM: SMB ₹30k–₹50k | Enterprise ₹50k–₹1.20L (Zero per-seat tax)\n• Local SEO & GEO: ₹3,999–₹5,999 (Google Maps 3-Pack)\n• WhatsApp Automation Bot: ₹8,000–₹15,000\n• Turnkey Combos: From ₹2,999\n\nAll backed by our 48-Hour Functional Prototype Guarantee (90% Money-Back SLA).",
                sender: 'bot',
                options: [
                    { label: "View Services Catalog", action: "services" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Chat on WhatsApp", action: "human" }
                ]
            };
        }

        // 2. Website Queries
        if (lowerQuery.includes('website') || lowerQuery.includes('web design') || lowerQuery.includes('landing page')) {
            return {
                id: Date.now().toString(),
                text: "We engineer high-converting websites on React/TypeScript with sub-1.2s load speeds:\n\n• SMB Tier: ₹10,000 – ₹20,000 (5-page lead capture & WhatsApp API)\n• Enterprise Tier: ₹15,000 – ₹30,000 (Full bespoke stack, quoter & CMS)\n\nZero WordPress bloat. Zero monthly plugin fees. Functional prototype in 48 hours.",
                sender: 'bot',
                options: [
                    { label: "View Website Details", action: "services" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Ask on WhatsApp", action: "human" }
                ]
            };
        }

        // 3. CRM Queries
        if (lowerQuery.includes('crm') || lowerQuery.includes('pipeline') || lowerQuery.includes('lead') || lowerQuery.includes('sales system')) {
            return {
                id: Date.now().toString(),
                text: "Our Custom CRMs replace expensive SaaS licenses:\n\n• SMB Tier: ₹30,000 – ₹50,000 (Lead capture, kanban pipeline, payment/cheque tracking)\n• Enterprise Tier: ₹50,000 – ₹1,20,000 (Multi-branch RBAC, auto-followups, Tally Prime bridge)\n\nZero per-seat software tax. Unlimited users forever. You own the code.",
                sender: 'bot',
                options: [
                    { label: "Explore CRM Systems", action: "services" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Ask on WhatsApp", action: "human" }
                ]
            };
        }

        // 4. Local SEO / GEO / Google Maps
        if (lowerQuery.includes('seo') || lowerQuery.includes('maps') || lowerQuery.includes('geo') || lowerQuery.includes('ranking') || lowerQuery.includes('google business')) {
            return {
                id: Date.now().toString(),
                text: "Google Business Profile & SEO / GEO / AEO (₹3,999 – ₹5,999):\n\n• 100% Google Business Profile setup & verification\n• Google Maps 3-Pack local ranking optimization\n• robots.txt, sitemap, Search Console & Schema markup\n• llms.txt AI crawler indexing for ChatGPT & Perplexity discovery.",
                sender: 'bot',
                options: [
                    { label: "Explore SEO Solutions", action: "services" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Ask on WhatsApp", action: "human" }
                ]
            };
        }

        // 5. WhatsApp Automation Bot
        if (lowerQuery.includes('whatsapp') || lowerQuery.includes('bot') || lowerQuery.includes('auto reply') || lowerQuery.includes('chat bot')) {
            return {
                id: Date.now().toString(),
                text: "Official WhatsApp Cloud API Automation Bots (₹8,000 – ₹15,000):\n\n• Sub-45s automated buyer qualification\n• Multi-step conversational sales flows\n• Automatic human handoff & CRM webhook sync\n• Auto follow-up triggers for abandoned leads.",
                sender: 'bot',
                options: [
                    { label: "Explore WhatsApp Bots", action: "services" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Chat with Mukul", action: "human" }
                ]
            };
        }

        // 6. Turnkey Combos
        if (lowerQuery.includes('combo') || lowerQuery.includes('bundle') || lowerQuery.includes('package') || lowerQuery.includes('all in one')) {
            return {
                id: Date.now().toString(),
                text: "Turnkey Smart Combos ready to deploy:\n\n• Brand Starter: ₹2,999 – ₹3,499 (Logo + Colors + Business Email)\n• Legal Foundation: ₹3,999 – ₹5,999 (GST + MSME + Trademark)\n• Sales Machine: ₹12,999 – ₹14,999 (CRM + WhatsApp Bot)\n• Complete Launchpad: ₹19,999 – ₹24,999 (Website + CRM + Bot + SEO)\n• Revenue Command Center: ₹59,999 – ₹75,000 (Full CRM + Tally Bridge)\n• Enterprise Sovereign Suite: ₹1,49,999+ (Full Stack + VPS + SLA).",
                sender: 'bot',
                options: [
                    { label: "Explore Combos (Track 3)", action: "combos" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Ask on WhatsApp", action: "human" }
                ]
            };
        }

        // 7. Guarantee / SLA / Money Back
        if (lowerQuery.includes('guarantee') || lowerQuery.includes('sla') || lowerQuery.includes('refund') || lowerQuery.includes('trust') || lowerQuery.includes('money back')) {
            return {
                id: Date.now().toString(),
                text: "Our 90% Money-Back SLA Guarantee:\n\nEvery build includes an agreed 48-Hour Functional Prototype milestone. If we fail to deliver a live working prototype on your schedule, 90% of your advance fee is refunded immediately.\n\nZero excuses. Zero lock-in. 10% covers raw third-party Cloud API costs.",
                sender: 'bot',
                options: [
                    { label: "View Wall of Fame", action: "wall_of_fame" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Chat with Mukul", action: "human" }
                ]
            };
        }

        // 8. Founder / Mukul / Team
        if (lowerQuery.includes('founder') || lowerQuery.includes('mukul') || lowerQuery.includes('who are you') || lowerQuery.includes('who made') || lowerQuery.includes('team')) {
            return {
                id: Date.now().toString(),
                text: "SAGE DO was founded by Mukul Dhiman, an ex-aerospace engineer based in Chandigarh.\n\nWe build sovereign digital infrastructure for Indian MSMEs: websites, custom CRMs, and ERP bridges that you own outright forever with zero monthly software taxes.",
                sender: 'bot',
                options: [
                    { label: "Inspect Wall of Fame", action: "wall_of_fame" },
                    { label: "Book Scoping Call", action: "book_call" },
                    { label: "Direct WhatsApp", action: "human" }
                ]
            };
        }

        // Default Intelligent Fallback with deep-links
        return {
            id: Date.now().toString(),
            text: "I can guide you through any SAGE DO system:\n\n1. Fixed-price SMB systems & Enterprise suites\n2. Turnkey Combos (from ₹2,999)\n3. 48-Hour Prototype Guarantee (90% Money-Back SLA)\n\nWhat would you like to explore?",
            sender: 'bot',
            options: [
                { label: "View Services Catalog", action: "services" },
                { label: "Turnkey Combos", action: "combos" },
                { label: "Book Scoping Call", action: "book_call" },
                { label: "Chat on WhatsApp", action: "human" }
            ]
        };
    };

    return (
        <>
            {/* Toggle Button with Official Circular Brand Logo */}
            <button
                data-testid="chat-widget-fab"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Bruno Chat Assistant"
                className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
                    isOpen 
                        ? "bg-neutral-900 border border-white/20 rotate-90" 
                        : "bg-neutral-950 border border-amber-500/50 hover:border-amber-400"
                }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <div className="w-full h-full rounded-full p-2 flex items-center justify-center overflow-hidden">
                        <img
                            src="/sagedo_logo_final_circle.webp"
                            alt="SAGE DO Bruno"
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[10px] text-white font-bold items-center justify-center shadow-sm">1</span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] flex flex-col glass border-primary/20 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden rounded-2xl">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-neutral-900 via-neutral-950 to-black border-b border-white/10 flex items-center justify-between text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/50 p-1 bg-black shrink-0 flex items-center justify-center">
                                <img src="/sagedo_logo_final_circle.webp" alt="SAGE DO Bruno" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                                    <span>Bruno</span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Chief of Staff</span>
                                </h3>
                                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Active · Sub-60s Answers
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white p-1 rounded-lg">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                        : 'bg-muted/80 backdrop-blur-md border border-white/10 text-foreground rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>

                                {/* Options Buttons */}
                                {msg.sender === 'bot' && msg.options && (
                                    <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                                        {msg.options.map((opt) => (
                                            <button
                                                key={opt.action}
                                                onClick={() => handleOptionClick(opt.action)}
                                                className="text-xs bg-background/80 hover:bg-primary/10 border border-primary/20 hover:border-primary/50 text-foreground px-3 py-1.5 rounded-full transition-all duration-200"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-start">
                                <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-muted/80 backdrop-blur-md border border-white/10 rounded-bl-none">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-background/80 backdrop-blur-lg border-t border-border/50">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Type a question..."
                                className="glass-input bg-background/50 border-input/50 focus:border-primary/50"
                            />
                            <Button
                                onClick={handleSendMessage}
                                size="icon"
                                className="bg-primary hover:bg-primary/90 shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-2 flex justify-center">
                            <button
                                onClick={() => handleOptionClick('human')}
                                className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Talk to Human via WhatsApp
                            </button>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}
