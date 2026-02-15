import { ServiceDetail } from "./serviceData";

export interface ServiceDetail {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    price: number; // For sorting/logic
    priceRange: string; // Display range
    category: string;
    imageUrl: string;
    isGoldenEligible: boolean;
    deliveryTime?: string;
    standardFeatures: string[];
    premiumFeatures: string[];
}

export const allServices: ServiceDetail[] = [
    // ==========================================
    // 🚀 THE "FREELANCER KILLER" SUITE (Lead Magnets)
    // ==========================================
    {
        id: "20",
        name: "Viral Reel/Short Editing",
        category: "Personal",
        description: "Get the Alex Hormozi style edits.",
        fullDescription: "Stop posting boring videos. We turn your raw footage into high-retention viral clips with dynamic captions, sound effects, and transitions. Perfect for IG Reels, YouTube Shorts, and TikTok.",
        price: 499,
        priceRange: "₹499 - ₹1,499",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "Up to 60 Seconds",
            "Dynamic Captions",
            "Stock Music",
            "Clean Cuts & Transitions"
        ],
        premiumFeatures: [
            "Visual Effects (VFX)",
            "Sound Design & SFX",
            "Motion Graphics",
            "Viral Hook Optimization",
            "Unlimited Revisions"
        ]
    },
    {
        id: "21",
        name: "Professional Logo Design",
        category: "Business",
        description: "A brand identity, not just a logo.",
        fullDescription: "Your logo is your first impression. We combine AI creativity with professional design principles to create a unique, memorable logo that works across all mediums - from websites to billboards.",
        price: 999,
        priceRange: "₹999 - ₹2,999",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "2 Unique AI Concepts",
            "Human Designer Polish",
            "High-Res PNG/JPG",
            "Transparent Background"
        ],
        premiumFeatures: [
            "Source Files (AI/EPS)",
            "Brand Style Guide",
            "Social Media Kit",
            "3D Mockups",
            "Favicon Variations"
        ]
    },
    {
        id: "22",
        name: "High-CTR YouTube Thumbnail",
        category: "Personal",
        description: "Stop the scroll. Get the click.",
        fullDescription: "A great video dies with a bad thumbnail. We design click-optimized thumbnails using psychological triggers, bold typography, and color theory to maximize your Views Per Impression (CTR).",
        price: 199,
        priceRange: "₹199 - ₹599",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "1 Custom Design",
            "Text Overlay & Color Grading",
            "High-Res Export",
            "24hr Turnaround"
        ],
        premiumFeatures: [
            "A/B Testing Variations (2 Styles)",
            "Editable PSD Source File",
            "Custom Illustration/Montage",
            "Expression Retouching"
        ]
    },
    {
        id: "23",
        name: "SEO Blog Writing",
        category: "Business",
        description: "Rank on Google page 1.",
        fullDescription: "Content is currency. We write deep, authoritative, and SEO-optimized blog posts that Google loves. We keyword-optimize every header, meta tag, and paragraph to drive organic traffic to your site.",
        price: 799,
        priceRange: "₹799 - ₹1,999",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "1000 Words Content",
            "Keyword Optimization",
            "AI Draft + Human Edit",
            "Plagiarism Free"
        ],
        premiumFeatures: [
            "SurferSEO Score 90+",
            "Custom Infographics",
            "Competitor Content Gap Analysis",
            "Backlink Outreach Strategy",
            "CMS Upload & Formatting"
        ]
    },
    {
        id: "24",
        name: "WordPress Website Design",
        category: "Business",
        description: "Your digital office, open 24/7.",
        fullDescription: "Get a professional business website without the agency price tag. We build fast, secure, and mobile-responsive WordPress sites that convert visitors into customers. Perfect for service businesses, blogs, and startups.",
        price: 4999,
        priceRange: "₹4,999 - ₹29,999",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false,
        standardFeatures: [
            "5-Page Business Site",
            "Mobile Responsive",
            "Contact Form Integration",
            "Basic SEO Setup"
        ],
        premiumFeatures: [
            "E-commerce (WooCommerce)",
            "Payment Gateway Setup",
            "Speed Optimization (90+ Score)",
            "Custom Animations",
            "1 Year Maintenance"
        ]
    },

    // ==========================================
    // 💼 BUSINESS & STARTUP (High Ticket - Revamped)
    // ==========================================
    {
        id: "1",
        name: "24/7 AI Voice & Chat Bots",
        category: "Business",
        description: "AI handles 1000s of calls.",
        fullDescription: "The ultimate hybrid support system. Our AI agents handle 90% of your customer queries, bookings, and support tickets instantly, 24/7. Humans handle the complex 10%.",
        price: 9999,
        priceRange: "₹9,999 - ₹29,999",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false,
        standardFeatures: [
            "Basic Chat/Voice Bot",
            "Scripted Responses",
            "WhatsApp Integration",
            "Lead Capture"
        ],
        premiumFeatures: [
            "Custom LLM Training",
            "Sentiment Analysis",
            "CRM Integration (Salesforce/HubSpot)",
            "Multilingual Support",
            "Dedicated Human Monitor"
        ]
    },
    {
        id: "2",
        name: "Intelligent Workflow Automation",
        category: "Business",
        description: "Automate your busy work.",
        fullDescription: "Stop being a data-entry clerk. We connect your apps (CRM, Email, Sheets) so data flows automatically. Save 20+ hours a week.",
        price: 2499,
        priceRange: "₹2,499 - ₹19,999",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "2-Step Automation (Zapier)",
            "Form to Email/Sheet",
            "Basic Error Handling",
            "Setup Guide"
        ],
        premiumFeatures: [
            "Multi-Agent Workflows (n8n)",
            "Custom API Integrations",
            "Complex Logic & Filtering",
            "Dashboard Creation",
            "Monthly Maintenance"
        ]
    },
    {
        id: "4",
        name: "Hybrid Social Media Engine",
        category: "Business",
        description: "Consistency on autopilot.",
        fullDescription: "We combine AI trend analysis with human creativity to keep your socials active and engaging. You get a full month of content done for you.",
        price: 7999,
        priceRange: "₹7,999 - ₹24,999/mo",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false,
        standardFeatures: [
            "12 Posts/Month",
            "Basic Captions & Hashtags",
            "Scheduling",
            "Monthly Report"
        ],
        premiumFeatures: [
            "4 Reels/Shorts Editing",
            "Community Management (Reply to comments)",
            "Paid Ad Campaign Management",
            "Competitor Analysis",
            "Strategy Call"
        ]
    },
    {
        id: "7",
        name: "Startup Pitch Deck Design",
        category: "Business",
        description: "Secure your funding.",
        fullDescription: "Investors buy stories. We structure your data and design a compelling deck that gets you the meeting.",
        price: 1999,
        priceRange: "₹1,999 - ₹7,999",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "10-Slide Template Design",
            "Data Visualization",
            "Copy Cleanup",
            "PDF Export"
        ],
        premiumFeatures: [
            "Custom Branded Design",
            "Financial Modeling Assistance",
            "Narrative Storytelling Workshop",
            "Investor Outreach List",
            "PPT Source File"
        ]
    },
    {
        id: "19",
        name: "SaaS MVP Development",
        category: "Business",
        description: "Launch in weeks, not months.",
        fullDescription: "The fastest way to test your idea. We build a functional Minimum Viable Product using modern tech stacks so you can get user feedback fast.",
        price: 24999,
        priceRange: "₹24,999 - ₹89,999",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false,
        standardFeatures: [
            "Core Features Implementation",
            "User Authentication",
            "Database Setup",
            "Standard UI Template"
        ],
        premiumFeatures: [
            "Custom UI/UX Design",
            "Payment Gateway Integration",
            "Admin Dashboard",
            "Scalable Cloud Architecture",
            "Mobile App Wrapper"
        ]
    },

    // ==========================================
    // ❤️ PERSONAL & STUDENT (Updated)
    // ==========================================
    {
        id: "8",
        name: "ATS Resume Optimization",
        category: "Professional",
        description: "Beat the bot. Get hired.",
        fullDescription: "75% of resumes are rejected by bots. We optimize yours to pass the ATS scan and impress human recruiters.",
        price: 499,
        priceRange: "₹499 - ₹1,499",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "ATS-Friendly Formatting",
            "Keyword Optimization",
            "Grammar Check",
            "PDF Delivery"
        ],
        premiumFeatures: [
            "Cover Letter Writing",
            "LinkedIn Profile Optimization",
            "Recruiter Outreach Template",
            "Interview Prep Guide",
            "Editable Source File"
        ]
    },
    {
        id: "13",
        name: "Academic Research Assistant",
        category: "Student",
        description: "Save days of research.",
        fullDescription: "We scan thousands of sources to find the exact data, citations, and arguments you need for your paper.",
        price: 499,
        priceRange: "₹499 - ₹1,499",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: [
            "Topic Research Summary",
            "Source List (5-10 sources)",
            "Key Arguments Outline",
            "Citation Generator"
        ],
        premiumFeatures: [
            "Deep Dive Analysis",
            "Unlimited Sources",
            "Critical Review Points",
            "Presentation Slides Draft",
            "1-Hour Explainer Call"
        ]
    },

    // === RESTORED SERVICES ===
    {
        id: "30",
        name: "24/7 AI Sales Chatbot",
        category: "Business",
        description: "Intelligent WhatsApp/Web bot that sells while you sleep.",
        fullDescription: "Stop losing customers to slow replies. Our AI Chatbots live on your website or WhatsApp, answering queries, qualifying leads, and even booking appointments 24/7. It's like having a best-performing sales agent who never sleeps.",
        price: 24999,
        priceRange: "₹24999 - ₹37498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "31",
        name: "Zero-Touch Workflow Automation",
        category: "Business",
        description: "Connect your apps. Automate leads, invoices, and emails.",
        fullDescription: "Eliminate manual data entry. We build 'Invisible Pipelines' that move data between your apps automatically. Example: New Lead -> CRM -> Welcome Email -> Slack Notification. All instant, all automated.",
        price: 14999,
        priceRange: "₹14999 - ₹22498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "32",
        name: "Business Intelligence Dashboard",
        category: "Business",
        description: "Live 'God Mode' view of your sales, leads, and money.",
        fullDescription: "Stop flying blind. We turn your messy Excel sheets and database rows into a stunning, real-time command center. See your daily sales, profit margins, and active users at a glance.",
        price: 34999,
        priceRange: "₹34999 - ₹52498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "33",
        name: "AI-Powered Technical Hiring",
        category: "Business",
        description: "Automated candidate screening to find top 1% engineers.",
        fullDescription: "Hiring engineers is hard. We automate the filter. Our system sets up coding challenges, automated screenings, and AI-ranked application forms so you only talk to the qualified candidates.",
        price: 9999,
        priceRange: "₹9999 - ₹14998",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "34",
        name: "AI Brand Anthem & Audio",
        category: "Business",
        description: "Viral-worthy custom songs and jingles for your brand.",
        fullDescription: "Sound is the new logo. We use advanced generative audio AI to compose a unique, catchy brand anthem, jingle, or background score that sticks in your customer's head. Royalty-free and uniquely yours.",
        price: 7999,
        priceRange: "₹7999 - ₹11998",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "35",
        name: "Social Media Marketing Suite",
        category: "Business",
        description: "AI-driven content calendar + Viral Hooks + Posting.",
        fullDescription: "Consistency builds empires. We use AI to analyze trends in your niche, generate a month's worth of high-engagement content ideas, write the scripts/captions, and schedule them.",
        price: 14999,
        priceRange: "₹14999 - ₹22498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "36",
        name: "Ads Making & Scaling",
        category: "Business",
        description: "High-ROI ad creatives generated and tested by AI.",
        fullDescription: "Stop burning money on bad ads. We create data-backed ad creatives (images/videos) designed to stop the scroll. Then we help you set up the campaign structure for maximum ROAS.",
        price: 19999,
        priceRange: "₹19999 - ₹29998",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "37",
        name: "AI-Optimized Tech Resume",
        category: "Professional",
        description: "Beat the ATS bots. Designed for high-paying tech roles.",
        fullDescription: "Most resumes never get read by humans. We engineer your resume with the exact keywords and formatting that ATS (Applicant Tracking Systems) love.",
        price: 2499,
        priceRange: "₹2499 - ₹3748",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "38",
        name: "LinkedIn Personal Branding",
        category: "Professional",
        description: "Turn your profile into a lead magnet.",
        fullDescription: "Your LinkedIn profile is your new landing page. We overhaul your headline, about section, and featured items to position you as an industry authority.",
        price: 4999,
        priceRange: "₹4999 - ₹7498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "39",
        name: "Personal Portfolio Website",
        category: "Professional",
        description: "A stunning showcase of your work and skills.",
        fullDescription: "Stop sending PDF portfolios. We build you a sleek, modern personal website that showcases your projects, experience, and contact info. Essential for freelancers and creatives.",
        price: 5999,
        priceRange: "₹5999 - ₹8998",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "40",
        name: "Professional Headshot AI Enhancement",
        category: "Professional",
        description: "Turn selfies into studio-quality headshots.",
        fullDescription: "Don't have time for a photoshoot? Send us your best selfies, and we use advanced AI to transform them into professional, studio-grade LinkedIn headshots.",
        price: 999,
        priceRange: "₹999 - ₹1498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "41",
        name: "Mock Interview Practice",
        category: "Professional",
        description: "Realistic AI-driven interview simulation.",
        fullDescription: "Nervous about the big interview? We set up a rigorous mock interview specifically for your role, record your answers, and provide AI-generated feedback on your tone, clarity, and content.",
        price: 1499,
        priceRange: "₹1499 - ₹2248",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "42",
        name: "AI Study Companion Setup",
        category: "Student",
        description: "Custom GPT trained on your syllabus.",
        fullDescription: "Imagine a tutor who knows every page of your textbook. We build a private knowledge base from your study materials and configure a Custom GPT that can quiz you, summarize chapters, and explain complex concepts 24/7.",
        price: 4999,
        priceRange: "₹4999 - ₹7498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "43",
        name: "Personal Finance Dashboard",
        category: "Personal",
        description: "Automate your budget tracking and expense analysis.",
        fullDescription: "Stop fearing your bank account. We set up an automated personal finance dashboard that tracks your spending, categorizes expenses, andvisualizes your savings goals.",
        price: 2999,
        priceRange: "₹2999 - ₹4498",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "44",
        name: "Viral Reels Video Editing",
        category: "Personal",
        description: "Professional editing for Shorts/Reels/TikTok.",
        fullDescription: "Transform raw footage into viral gold. We add dynamic captions, transitions, sound effects, and color grading to make your short-form content pop.",
        price: 499,
        priceRange: "₹499 - ₹748",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "45",
        name: "Influencer Media Kit",
        category: "Personal",
        description: "Professional kit to get brand deals.",
        fullDescription: "Look like a pro to sponsors. We design a stunning PDF media kit showcasing your stats, demographics, and rates.",
        price: 799,
        priceRange: "₹799 - ₹1198",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "46",
        name: "AI Health & Nutrition Plan",
        category: "Personal",
        description: "Hyper-personalized 30-day meal plan.",
        fullDescription: "Based on your unique body type and goals. We use AI analysis of your preferences to generate a realistic, diverse, and healthy 30-day meal plan.",
        price: 349,
        priceRange: "₹349 - ₹523",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "47",
        name: "Smart Travel Itinerary",
        category: "Personal",
        description: "The perfect trip, planned to the minute.",
        fullDescription: "Stop wasting hours on Tripadvisor. We create a day-by-day itinerary for your trip, including hidden gems, logistics, and budget optimization.",
        price: 499,
        priceRange: "₹499 - ₹748",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "48",
        name: "Custom Illustration / Art",
        category: "Personal",
        description: "Unique digital art for gifts or profile pics.",
        fullDescription: "Get a one-of-a-kind digital illustration. Perfect for profile pictures, gifts, or merchandise. Created with a blend of AI and manual touchup.",
        price: 899,
        priceRange: "₹899 - ₹1348",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "49",
        name: "Photo Retouching (5 Pack)",
        category: "Personal",
        description: "Make your photos look professional.",
        fullDescription: "Fix lighting, remove blemishes, and color grade your photos. Perfect for social media or personal albums.",
        price: 299,
        priceRange: "₹299 - ₹448",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    },
    {
        id: "50",
        name: "AI Strategy Audit (Free)",
        category: "All",
        description: "We analyze your business gaps for free.",
        fullDescription: "Confused by AI? We analyze your workflow and recommend tools to save time.",
        price: 0,
        priceRange: "₹0 - ₹0",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?w=500&auto=format&fit=crop&q=60",
        isGoldenEligible: true,
        standardFeatures: [
            "Core Strategy",
            "Basic Implementation",
            "Standard Support",
            "7 Day Delivery"
        ],
        premiumFeatures: [
            "Advanced Optimization",
            "Priority Support",
            "Source Files",
            "Extended Revisions",
            "1-on-1 Consultation"
        ]
    }
];
