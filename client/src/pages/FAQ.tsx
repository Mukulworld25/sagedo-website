import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, CreditCard, Clock, Shield, MessageCircle, RefreshCw } from "lucide-react";

import { faqs } from "@/data/faqs";
import { HelpCircle, CreditCard, Clock, Shield, MessageCircle, RefreshCw } from "lucide-react";

// Helper to get icon based on ID/Category
const getIcon = (id: string) => {
    switch (id) {
        case 'payment': return <CreditCard className="w-5 h-5" />;
        case 'delivery': return <Clock className="w-5 h-5" />;
        case 'privacy': return <Shield className="w-5 h-5" />;
        case 'support': return <MessageCircle className="w-5 h-5" />;
        case 'refund': return <RefreshCw className="w-5 h-5" />;
        default: return <HelpCircle className="w-5 h-5" />;
    }
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about SAGE DO
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className={`glass overflow-hidden transition-all duration-300 ${openIndex === index ? 'ring-2 ring-primary' : ''
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        {getIcon(faq.id)}
                                    </div>
                                    <span className="font-semibold text-foreground">{faq.question}</span>
                                </div>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'pb-6 max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="pl-14 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Still have questions? */}
                <Card className="glass p-8 mt-12 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                        Still have questions?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Can't find what you're looking for? Our support team is here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/916284925684"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Us
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Contact Support
                        </a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
