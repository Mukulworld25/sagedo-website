import { HelpCircle, CreditCard, Clock, Shield, MessageCircle, RefreshCw, Star, Truck, Zap, Briefcase, FileText, PenTool } from "lucide-react";
import React from 'react';

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    keywords: string[];
    category: 'general' | 'payment' | 'service' | 'support' | 'trending';
}

export const faqs: FAQItem[] = [
    // --- SPECIAL: Trending Services ---
    {
        id: 'trending',
        question: "Trending services",
        answer: "🔥 **Trending Services (Top Pics):**\n\n**Startup Execution:**\n1) SaaS & Web Development\n2) Market & Competitor Analysis\n3) Custom AI Automations\n\n**Executive:**\n1) C-Suite ATS Formatting\n2) LinkedIn Authority Branding\n3) Executive Pitch Practice\n\n**Content:**\n1) SEO Blog Posts\n2) Social Media Campaigns\n3) Pitch / Proposal Copy\n\n**Business:**\n1) Pitch Decks / PPT Design\n2) Business Proposals\n3) BI Dashboards",
        keywords: ['trending', 'popular', 'hot', 'best', 'top', 'recommend'],
        category: 'trending'
    },

    // --- General / About SageDo ---
    {
        id: 'what_is_sagedo',
        question: "What is SageDo?",
        answer: "I’m glad you asked — SageDo is an AI + human hybrid service: fast AI work for speed, and experienced humans for precision. That combo gives you reliable, polished results every time.",
        keywords: ['what is sagedo', 'about sagedo', 'what do you do', 'who are you', 'how does it work'],
        category: 'general'
    },
    {
        id: 'founder_identity',
        question: "Who runs SageDo?",
        answer: "SAGE DO was founded by Mukul Dhiman, an entrepreneur from Chandigarh, India.\\n\\nHe built SAGE DO to help ambitious founders and professionals get quality execution without the usual agency retainers.\\n\\nWant to connect? Here are our official handles:\\n- LinkedIn: SAGE DO\\n- Email: hello@sagedo.in\\n- WhatsApp: +91 6284925684.\n\nEvery service combines AI speed with human precision.\n\nIf you’d like, I can also share our official social media links.",
        keywords: ['who made you', 'who created you', 'who built you', 'who is your founder', 'who runs sagedo', 'who is behind sagedo', 'founder', 'your founder', 'mukul', 'developer', 'ceo', 'owner', 'boss', 'team'],
        category: 'general'
    },
    {
        id: 'meaning_of_sagedo',
        question: "What does SageDo mean?",
        answer: "**Sage** means expert wisdom.\n**Do** means human action.\n\nTogether, **SageDo** stands for expert intelligence backed by real human verification — so nothing goes wrong.",
        keywords: ['what does sagedo mean', 'meaning of sagedo', 'why is it called sagedo', 'name', 'definition'],
        category: 'general'
    },
    {
        id: 'trust_legitimacy',
        question: "Why should I trust you?",
        answer: "Because we don’t rely only on AI.\n\nEvery output is checked by experienced humans, guided by the founder’s standards.\n\nWe focus on quality, accountability, and long-term trust — not shortcuts.",
        keywords: ['why should i trust you', 'is sagedo legit', 'is this real', 'can i trust this website', 'scam', 'fake', 'fraud', 'reliable'],
        category: 'general'
    },
    {
        id: 'who_can_use',
        question: "Who can use SageDo?",
        answer: "Founders, established businesses, professionals, and ambitious startups — anyone who needs world-class digital execution at AI speeds.",
        keywords: ['who can use', 'for whom', 'target audience', 'founder', 'professional', 'business'],
        category: 'general'
    },

    // --- Services: Execution & Automation ---
    {
        id: 'tech_stack',
        question: "What tech stack do you use?",
        answer: "We deploy modern architectures. React/Next.js for frontends, Python/Node for backends, and advanced models like DeepSeek and Claude for our AI integrations.",
        keywords: ['tech stack', 'programming', 'code', 'framework', 'development'],
        category: 'service'
    },
    {
        id: 'originality',
        question: "Will the output be 100% original?",
        answer: "Yes — everything is created to your brief and checked by humans. We deliver original work and take care to avoid plagiarism or generic AI copy.",
        keywords: ['original', 'plagiarism', 'copy', 'unique', 'ai'],
        category: 'service'
    },
    {
        id: 'upload_notes',
        question: "Can I upload notes or specific references?",
        answer: "Please do — the more you provide, the better the final result. I’ll make sure your requirements are followed to the letter.",
        keywords: ['upload', 'notes', 'files', 'reference', 'attachment'],
        category: 'service'
    },
    {
        id: 'citation',
        question: "Do you help with academic integrity or citation?",
        answer: "Yes — we include references and proper citations when required and advise on best practices to maintain academic integrity.",
        keywords: ['citation', 'reference', 'bibliography', 'integrity', 'academic'],
        category: 'service'
    },

    // --- Services: Career (Executive Resumes) ---
    {
        id: 'resume_writing',
        question: "Do you write executive resumes and cover letters?",
        answer: "Yes — we do C-Suite ATS-friendly, industry-focused portfolios and matched cover letters that highlight what high-level hiring managers care about.",
        keywords: ['resume', 'cv', 'curriculum vitae', 'cover letter', 'job application', 'portfolio'],
        category: 'service'
    },
    {
        id: 'ats',
        question: "Will my resume pass Applicant Tracking Systems (ATS)?",
        answer: "We format and keyword-optimize to improve ATS compatibility so your resume reaches the recruiter’s desk.",
        keywords: ['ats', 'tracking system', 'automated', 'parse', 'compatibility'],
        category: 'service'
    },
    {
        id: 'tailor_resume',
        question: "Can you tailor my resume to a specific job?",
        answer: "Definitely — share the job description and I’ll ensure your resume matches keywords and priorities for that role.",
        keywords: ['tailor', 'customize', 'specific job', 'target role'],
        category: 'service'
    },
    {
        id: 'resume_info',
        question: "What info do you need to start a resume?",
        answer: "Job history, achievements, skills, target role/industry, and any preferences on tone or layout — send those and I’ll handle the rest.",
        keywords: ['info needed', 'start resume', 'requirements'],
        category: 'service'
    },

    // --- Services: Content & Business ---
    {
        id: 'content_services',
        question: "What content services do you provide?",
        answer: "Blogs, web copy, product descriptions, SEO articles, social posts, and long-form content — all optimized for clarity and impact.",
        keywords: ['content', 'writing', 'blog', 'article', 'post', 'copy'],
        category: 'service'
    },
    {
        id: 'seo',
        question: "Can you write SEO content?",
        answer: "Yes — we craft content that reads well and helps with search visibility, using proven on-page practices and strong user intent focus.",
        keywords: ['seo', 'search engine', 'ranking', 'keywords', 'google'],
        category: 'service'
    },
    {
        id: 'bulk_content',
        question: "Can you produce bulk content on schedule?",
        answer: "Yes — we handle volume work and can set up delivery timelines so you always have fresh content when needed.",
        keywords: ['bulk', 'volume', 'schedule', 'calendar', 'lots'],
        category: 'service'
    },
    {
        id: 'ppt_design',
        question: "Do you design PPTs and visuals?",
        answer: "Yes — professional slide decks and visual assets designed to make your message clear and persuasive.",
        keywords: ['ppt', 'powerpoint', 'presentation', 'deck', 'slides', 'visual'],
        category: 'service'
    },
    {
        id: 'business_proposal',
        question: "Can you write business proposals?",
        answer: "Absolutely — strategic, client-focused proposals that help you win meetings and close deals.",
        keywords: ['proposal', 'business', 'pitch', 'deal'],
        category: 'service'
    },

    // --- Pricing & Ordering ---
    {
        id: 'pricing',
        question: "What are your prices?",
        answer: "I’ll be direct: our services are pocket-friendly and built to give high ROI. For exact pricing I’ll need details — hit “Place Order” or tell me what you need and I’ll fetch a custom quote you’ll like.",
        keywords: ['price', 'cost', 'charge', 'rate', 'expensive', 'cheap', 'quote', 'fee'],
        category: 'payment'
    },
    {
        id: 'place_order',
        question: "How do I place an order?",
        answer: "Use the Place Order form on the site, or tell me your requirements here and I’ll guide you step-by-step.",
        keywords: ['order', 'buy', 'purchase', 'start', 'hire'],
        category: 'service'
    },
    {
        id: 'payment_methods',
        question: "What payment methods do you accept?",
        answer: "We accept standard online payments at checkout. Tell me your preferred mode and I’ll help you through it.",
        keywords: ['payment method', 'card', 'upi', 'pay', 'checkout'],
        category: 'payment'
    },
    {
        id: 'discounts',
        question: "Do you offer discounts or bundles?",
        answer: "Occasionally — ask me for current offers and bundle options; I might have a surprise for you.",
        keywords: ['discount', 'offer', 'coupon', 'bundle', 'deal', 'promo'],
        category: 'payment'
    },

    // --- Support & Policies ---
    {
        id: 'revisions',
        question: "Can I ask for revisions?",
        answer: "Yes — we’ll refine until you’re satisfied. If things aren’t resolved after three interactions, I’ll escalate you to a senior human for priority handling.",
        keywords: ['revision', 'change', 'edit', 'modify', 'fix'],
        category: 'support'
    },
    {
        id: 'refunds',
        question: "How are refunds handled?",
        answer: "Refunds depend on the service and progress status. I’ll explain the policy clearly for each order and help find a fair solution if issues arise.",
        keywords: ['refund', 'money back', 'return', 'cancel'],
        category: 'payment'
    },
    {
        id: 'delivery_time',
        question: "How fast do you deliver execution projects?",
        answer: "Depending on scale, we can deploy a landing page in 24 hours, or a complex automation suite in a few days. Our Hybrid model guarantees extreme speed without sacrificing precision.",
        keywords: ['fast', 'speed', 'time', 'when', 'deadline', 'urgent', 'turnaround'],
        category: 'service'
    },
    {
        id: 'track_order',
        question: "Can I track my order?",
        answer: "Yes — use Track Order on the site for real-time updates. I can also ping you by email or WhatsApp if you prefer.",
        keywords: ['track', 'status', 'where', 'progress'],
        category: 'service'
    },
    {
        id: 'contact_human',
        question: "How do I contact human support?",
        answer: "Ask me “I want human support” anytime, or use the contact form / email on the site. For complex orders I’ll request your email or WhatsApp to ensure a smooth handover.",
        keywords: ['human', 'person', 'support', 'talk to agent', 'whatsapp'],
        category: 'support'
    },
    {
        id: 'privacy_policy',
        question: "Is my data safe with you?",
        answer: "Yes — we follow standard privacy practices. Your files and details are used only to complete your request and are protected.",
        keywords: ['data', 'safe', 'privacy', 'confidential', 'security'],
        category: 'general'
    },
    {
        id: 'socials',
        question: "Can you share social media links?",
        answer: "Sure — I can provide our social handles and contact channels. Tell me which platform you prefer (Instagram, LinkedIn, WhatsApp) and I’ll share the link.",
        keywords: ['social', 'instagram', 'linkedin', 'facebook', 'link'],
        category: 'general'
    },
    {
        id: 'scam',
        question: "Is this a scam?",
        answer: "Not at all — we’re a real team delivering real work. If it helps: try a small order first, see the quality, then level up. And yes, we promise not to disappear after delivery — we’re here for follow-ups.",
        keywords: ['scam', 'fake', 'real', 'legit', 'fraud'],
        category: 'general'
    },
    // --- Core Action Rules: Smart Responses ---
    {
        id: 'task_request_router',
        question: "Can you do this task?",
        answer: "Absolutely.\n\nPlease visit our **Services** page to choose the closest match.\n\nIf your requirement isn’t listed, I’ll connect you with our team for a custom solution.",
        keywords: ['can you do this', 'can you help me', 'i need help with', 'do you offer', 'do this task', 'help'],
        category: 'service'
    },
    {
        id: 'urgent_help',
        question: "I need help with something urgent.",
        answer: "Got it — let’s move fast and smart.\n\nFirst, check the **Services** section to choose the closest match.\n\nIf it’s not clearly listed, I’ll connect you with our human team so nothing gets delayed.",
        keywords: ['urgent', 'emergency', 'asap', 'fast', 'quick'],
        category: 'service'
    },
    {
        id: 'not_listed',
        question: "I don’t see my requirement listed in your services.",
        answer: "That’s totally okay — some of our best work starts exactly like this 😉\n\nWhile most solutions are covered on the **Services** page, special or custom requests are handled directly by our team.\n\nShare a few details via email/WhatsApp and I’ll make sure the right humans look into it.",
        keywords: ['not listed', 'missing', 'requirement', 'cant find', 'different'],
        category: 'service'
    },
    {
        id: 'custom_work',
        question: "Can you do something that’s not on the website?",
        answer: "Short answer: very often, yes.\n\nOur website lists our most popular services, but not all custom work.\n\nPlease explore the **Services** page first — if it still feels different, I’ll escalate it to the team for a tailored solution.",
        keywords: ['not on website', 'custom', 'unique', 'special'],
        category: 'service'
    },
    {
        id: 'explain_task',
        question: "Should I explain my task here or somewhere else?",
        answer: "You can start right here 👍\n\nOnce I understand your requirement, I’ll guide you to the right Service or connect you with our team if it needs a custom approach.",
        keywords: ['explain', 'describe', 'tell you', 'here'],
        category: 'general'
    },
    {
        id: 'complex_task',
        question: "What if my task is complex or business-critical?",
        answer: "Perfect — those are our favorite kinds of problems to solve.\n\nFor complex tasks, I’ll ask for your email or WhatsApp and bring in a human expert so nothing is lost in translation.",
        keywords: ['complex', 'critical', 'complicated', 'hard', 'big project'],
        category: 'service'
    }
];
