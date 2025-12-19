import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, CreditCard, Clock, Shield, MessageCircle, RefreshCw } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
    icon: React.ReactNode;
}

const faqs: FAQItem[] = [
    {
        question: "What services does SAGE DO offer?",
        answer: "We offer 30+ AI-powered services including resume writing, assignment help, content creation, PPT design, business proposals, and more. All services are delivered by our expert team using AI assistance for quality and speed.",
        icon: <HelpCircle className="w-5 h-5" />
    },
    {
        question: "How does payment work?",
        answer: "We accept all major payment methods via Razorpay including Credit/Debit Cards, UPI, Net Banking, and Wallets. All payments are 100% secure with SSL encryption. You can also use your SAGE DO token balance for discounts.",
        icon: <CreditCard className="w-5 h-5" />
    },
    {
        question: "What is the delivery time?",
        answer: "Most services are delivered within 24-48 hours. Complex projects may take 3-5 days. You'll receive email updates at each stage: Order Received → Processing → Finalizing → Delivered.",
        icon: <Clock className="w-5 h-5" />
    },
    {
        question: "Is my data safe and confidential?",
        answer: "Absolutely! We take privacy seriously. All your files and requirements are securely stored in encrypted servers. We never share your data with third parties. Check our Privacy Policy for details.",
        icon: <Shield className="w-5 h-5" />
    },
    {
        question: "How can I contact support?",
        answer: "You can reach us via WhatsApp (click the green button), email at support@sagedo.in, or use our Contact form. We typically respond within 2-4 hours during business hours.",
        icon: <MessageCircle className="w-5 h-5" />
    },
    {
        question: "What is your refund policy?",
        answer: "We offer refunds if we fail to deliver as promised. If you're not satisfied, contact us within 7 days of delivery for revision or refund. See our full Refund Policy for details.",
        icon: <RefreshCw className="w-5 h-5" />
    },
    {
        question: "What are SAGE DO Tokens?",
        answer: "Tokens are our reward currency. You get 150 tokens on signup (worth ₹150). Earn more by completing surveys, daily login, and referrals. Use tokens to get discounts on your orders.",
        icon: <HelpCircle className="w-5 h-5" />
    },
    {
        question: "Can I track my order?",
        answer: "Yes! After placing an order, you can track its status from your Dashboard. You'll also receive email notifications at each stage of delivery.",
        icon: <HelpCircle className="w-5 h-5" />
    }
];

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
                                        {faq.icon}
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
                            href="https://wa.me/917018709291"
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
