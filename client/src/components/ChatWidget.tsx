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
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: "Hi! 👋 I'm Sage, your AI assistant. How can I help you today?",
            sender: 'bot',
            options: [
                { label: "Pricing & Payments", action: "payment" },
                { label: "Track Order", action: "track" },
                { label: "Services", action: "services" },
                { label: "Talk to Human", action: "human" }
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

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Simulate thinking delay
        setTimeout(() => {
            const response = findAnswer(userMsg.text);
            setMessages(prev => [...prev, response]);
        }, 600);
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
                window.open("https://wa.me/917018709291", "_blank");
                response = {
                    id: Date.now().toString(),
                    text: "I've opened WhatsApp for you! Our team usually replies within 2 hours.",
                    sender: 'bot'
                };
            } else {
                // Search by ID/Category roughly matching the action
                const faq = faqs.find(f => f.id === action || f.category === action);
                if (faq) {
                    response = {
                        id: Date.now().toString(),
                        text: faq.answer,
                        sender: 'bot',
                        options: [{ label: "Ask another question", action: "reset" }, { label: "Contact Support", action: "human" }]
                    };
                } else {
                    response = findAnswer(translateActionToKeyword(action));
                }
            }
            setMessages(prev => [...prev, response]);
        }, 600);
    };

    const translateActionToKeyword = (action: string) => {
        if (action === 'services') return 'services';
        if (action === 'pricing') return 'payment';
        return action;
    }

    const findAnswer = (query: string): Message => {
        const lowerQuery = query.toLowerCase();

        // Check for "reset" or "start over"
        if (lowerQuery.includes('reset') || lowerQuery.includes('start over')) {
            return {
                id: Date.now().toString(),
                text: "Sure! What else can I help you with?",
                sender: 'bot',
                options: [
                    { label: "Pricing & Payments", action: "payment" },
                    { label: "Track Order", action: "track" },
                    { label: "Talk to Human", action: "human" }
                ]
            };
        }

        // 1. Keyword search in FAQs
        const match = faqs.find(faq =>
            faq.keywords.some(keyword => lowerQuery.includes(keyword)) ||
            faq.question.toLowerCase().includes(lowerQuery)
        );

        if (match) {
            return {
                id: Date.now().toString(),
                text: match.answer,
                sender: 'bot',
                options: [
                    { label: "Helpful, thanks!", action: "reset" },
                    { label: "Still need help", action: "human" }
                ]
            };
        }

        // 2. Fallback
        return {
            id: Date.now().toString(),
            text: "I'm not sure about that. Would you like to chat with a human expert?",
            sender: 'bot',
            options: [
                { label: "Chat on WhatsApp", action: "human" },
                { label: "Try searching services", action: "services" }
            ]
        };
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${isOpen ? "bg-destructive rotate-90" : "bg-gradient-to-tr from-primary to-orange-600 animate-pulse-slow"
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
                {/* Notification badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white font-bold items-center justify-center">1</span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] flex flex-col glass border-primary/20 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden rounded-2xl">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-primary to-orange-600 flex items-center gap-3 text-white shadow-md">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Sage AI Assistant</h3>
                            <p className="text-xs text-white/80 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Online Now
                            </p>
                        </div>
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
