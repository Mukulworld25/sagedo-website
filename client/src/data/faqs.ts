import { HelpCircle, CreditCard, Clock, Shield, MessageCircle, RefreshCw, Star, Truck } from "lucide-react";
import React from 'react';

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    keywords: string[];
    category: 'general' | 'payment' | 'service' | 'support';
}

export const faqs: FAQItem[] = [
    {
        id: 'services',
        question: "What services does SAGE DO offer?",
        answer: "We offer 30+ AI-powered services including resume writing, assignment help, content creation, PPT design, business proposals, and more. All services are delivered by our expert team using AI assistance for quality and speed.",
        keywords: ['service', 'offer', 'what', 'provide', 'writing', 'assignment', 'resume'],
        category: 'service'
    },
    {
        id: 'payment',
        question: "How does payment work?",
        answer: "We accept all major payment methods via Razorpay including Credit/Debit Cards, UPI, Net Banking, and Wallets. All payments are 100% secure with SSL encryption. You can also use your SAGE DO token balance for discounts.",
        keywords: ['pay', 'payment', 'card', 'upi', 'wallet', 'secure', 'money', 'cost'],
        category: 'payment'
    },
    {
        id: 'delivery',
        question: "What is the delivery time?",
        answer: "Most services are delivered within 24-48 hours. Complex projects may take 3-5 days. You'll receive email updates at each stage: Order Received → Processing → Finalizing → Delivered.",
        keywords: ['time', 'delivery', 'long', 'hours', 'days', 'when', 'receive'],
        category: 'service'
    },
    {
        id: 'privacy',
        question: "Is my data safe and confidential?",
        answer: "Absolutely! We take privacy seriously. All your files and requirements are securely stored in encrypted servers. We never share your data with third parties.",
        keywords: ['safe', 'security', 'privacy', 'data', 'store', 'confidential'],
        category: 'general'
    },
    {
        id: 'support',
        question: "How can I contact support?",
        answer: "You can reach us right here! Or use the 'Chat on WhatsApp' button below to talk to a human. We typically respond within 2-4 hours during business hours.",
        keywords: ['contact', 'support', 'help', 'human', 'talk', 'chat'],
        category: 'support'
    },
    {
        id: 'refund',
        question: "What is your refund policy?",
        answer: "We offer refunds if we fail to deliver as promised. If you're not satisfied, contact us within 7 days of delivery for revision or refund.",
        keywords: ['refund', 'money back', 'return', 'cancel', 'policy'],
        category: 'payment'
    },
    {
        id: 'tokens',
        question: "What are SAGE DO Tokens?",
        answer: "Tokens are our reward currency. You get 150 tokens on signup (worth ₹150). Earn more by completing surveys, daily login, and referrals.",
        keywords: ['token', 'reward', 'coin', 'earn', 'bonus', 'points'],
        category: 'general'
    },
    {
        id: 'track',
        question: "Can I track my order?",
        answer: "Yes! After placing an order, you can track its status from your Dashboard. You'll also receive email notifications at each stage.",
        keywords: ['track', 'status', 'order', 'where', 'progress'],
        category: 'service'
    }
];
