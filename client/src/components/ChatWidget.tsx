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
            text: "Hi! I'm Bruno, SAGE DO's official voice! Contact: hello@sagedo.in | +91 6284925684 | LinkedIn: SAGE DO. How can I help?",
            sender: 'bot',
            options: [
                { label: "🔥 Trending Services", action: "trending" },
                { label: "Check Prices", action: "pricing" },
                { label: "Track Order", action: "track" },
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

        // Check for "reset" or "start over"
        if (lowerQuery.includes('reset') || lowerQuery.includes('start over')) {
            setFallbackCount(0);
            return {
                id: Date.now().toString(),
                text: "Sure thing! Ready when you are. What's on your mind?",
                sender: 'bot',
                options: [
                    { label: "Pricing", action: "pricing" },
                    { label: "Trending Services", action: "trending" },
                    { label: "Talk to Human", action: "human" }
                ]
            };
        }

        // --- 1. STRICT ESCALATION TRIGGERS ---
        // "User says 'custom', 'unique', 'urgent', 'confidential'"
        const escalationKeywords = ['custom', 'unique', 'urgent', 'confidential'];
        if (escalationKeywords.some(k => lowerQuery.includes(k))) {
            return {
                id: Date.now().toString(),
                text: "This looks like something best handled by our human team 👌\n\nShare your email or WhatsApp, or click below, and I’ll make sure the right expert connects with you shortly.",
                sender: 'bot',
                options: [
                    { label: "Connect on WhatsApp", action: "human" },
                    { label: "View Services First", action: "services" }
                ]
            };
        }

        // --- 2. GOLDEN RULE (Service Requests) ---
        // "Can you do...", "Can you help with...", "Do you offer...", "I need help with..."
        const goldenRuleTriggers = ['can you', 'do you offer', 'need help', 'i need', 'help with'];
        if (goldenRuleTriggers.some(trigger => lowerQuery.includes(trigger))) {
            // Check if we have a specific FAQ match first (e.g., "resume")
            const specificMatch = faqs.find(faq =>
                faq.keywords.some(keyword => lowerQuery.includes(keyword))
            );

            if (specificMatch) {
                return {
                    id: Date.now().toString(),
                    text: specificMatch.answer, // Use specific answer but add service Link option
                    sender: 'bot',
                    options: [
                        { label: "View Services", action: "services" },
                        { label: "Actually, I need custom help", action: "human" }
                    ]
                };
            }

            // Generic Golden Rule Response
            return {
                id: Date.now().toString(),
                text: "Absolutely — that’s what we’re here for 😊\n\nPlease head over to our Services page to see how we usually handle this type of work.\n\nIf your task feels unique or slightly different, don’t worry — I’ll pass it directly to our team for a custom solution.",
                sender: 'bot',
                options: [
                    { label: "Explore Services", action: "services" },
                    { label: "Talk to Human", action: "human" }
                ]
            };
        }

        // --- 3. Keyword search in FAQs ---
        const match = faqs.find(faq =>
            faq.keywords.some(keyword => lowerQuery.includes(keyword)) ||
            faq.question.toLowerCase().includes(lowerQuery)
        );

        if (match) {
            setFallbackCount(0); // Success reset
            return {
                id: Date.now().toString(),
                text: match.answer,
                sender: 'bot',
                options: [
                    { label: "Thanks!", action: "reset" },
                    { label: "Check Prices", action: "pricing" }
                ]
            };
        }

        // --- 4. Fallback Logic with Escalation ---
        const newCount = fallbackCount + 1;
        setFallbackCount(newCount);

        if (newCount >= 3) {
            return {
                id: Date.now().toString(),
                text: "This looks like something best handled by our human team 👌\n\nShare your email or WhatsApp, and I’ll make sure the right expert connects with you shortly.",
                sender: 'bot',
                options: [
                    { label: "Connect on WhatsApp", action: "human" },
                    { label: "Send Email", action: "contact" }
                ]
            };
        }

        // Professional, Safe Fallback
        return {
            id: Date.now().toString(),
            text: "I want to make sure you get the right answer.\n\nPlease explore our Services page for most solutions, or message our team and I’ll connect you with the right expert.",
            sender: 'bot',
            options: [
                { label: "View Services", action: "services" },
                { label: "Message Team", action: "human" }
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
                <Card className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] flex flex-col glass border-primary/20 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden rounded-2xl">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-primary to-orange-600 flex items-center gap-3 text-white shadow-md">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Bruno - SAGE DO</h3>
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
