import { ServiceDetail } from "./serviceData";

export interface ServiceDetail {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    whatYouGet: string[];
    process: string[];
    price: number;
    category: string;
    imageUrl: string;
    isGoldenEligible: boolean;
    deliveryTime?: string;
}

export const allServices: ServiceDetail[] = [
    // =====================
    // 🆓 FREE CONSULTATION (Lead Magnet)
    // =====================
    {
        id: "0",
        name: "🤖 AI Strategy Audit (Free)",
        category: "All",
        description: "Not sure where AI fits? We analyze your business gaps for free.",
        fullDescription: "Confused by the AI hype? Let's cut through the noise. We analyze your current business workflows, identify bottlenecks, and recommend specific AI tools to save you time and money. No jargon, just ROI.",
        whatYouGet: [
            "Workflow bottleneck analysis",
            "Custom AI tool recommendations",
            "Automation potential report",
            "ROI estimation",
            "No obligation to buy"
        ],
        process: [
            "Share your business model & pain points",
            "We analyze your current tech stack",
            "Identify high-impact AI opportunities",
            "Deliver a 1-page strategy PDF"
        ],
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?q=80&w=1000&auto=format&fit=crop", // Abstract Neural Audit
        isGoldenEligible: false,
        deliveryTime: "24 hours"
    },

    // =====================
    // BUSINESS AUTOMATION (The Empire Builder)
    // =====================
    {
        id: "1",
        name: "24/7 AI Sales Chatbot",
        category: "Business",
        description: "Intelligent WhatsApp/Web bot that sells while you sleep.",
        fullDescription: "Stop losing customers to slow replies. Our AI Chatbots live on your website or WhatsApp, answering queries, qualifying leads, and even booking appointments 24/7. It's like having a best-performing sales agent who never sleeps.",
        whatYouGet: [
            "Custom-trained AI on your data",
            "WhatsApp & Website integration",
            "Lead qualification & capture",
            "Appointment booking capability",
            "Monthly performance report"
        ],
        process: [
            "We scrape your website/docs for knowledge",
            "Build and train the conversation flow",
            "Integrate with your platforms",
            "Go live with 24/7 monitoring"
        ],
        price: 24999,
        imageUrl: "https://images.unsplash.com/photo-1531746797190-fe5c1a9ac876?q=80&w=1000&auto=format&fit=crop", // Glowing Tech Interface
        isGoldenEligible: true
    },
    {
        id: "2",
        name: "Zero-Touch Workflow Automation",
        category: "Business",
        description: "Connect your apps. Automate leads, invoices, and emails.",
        fullDescription: "Eliminate manual data entry. We build 'Invisible Pipelines' that move data between your apps automatically. Example: New Lead -> CRM -> Welcome Email -> Slack Notification. All instant, all automated.",
        whatYouGet: [
            "Map of current manual processes",
            "3-step complex automation setup (Zapier/Make)",
            "Error handling & alerts",
            "Connection to CRM/Email/Sheets",
            "1-hour training session"
        ],
        process: [
            "Audit your manual tasks",
            "Design the automation logic",
            "Build and stress-test the workflow",
            "Handover the keys"
        ],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", // Digital Chips/Connections
        isGoldenEligible: true
    },
    {
        id: "3",
        name: "Business Intelligence Dashboard",
        category: "Business",
        description: "Live 'God Mode' view of your sales, leads, and money.",
        fullDescription: "Stop flying blind. We turn your messy Excel sheets and database rows into a stunning, real-time command center. See your daily sales, profit margins, and active users at a glance.",
        whatYouGet: [
            "Custom PowerBI/Looker Studio Dashboard",
            "Real-time data connections",
            "Sales & Revenue tracking",
            "Customer behavior visualization",
            "Mobile-friendly view"
        ],
        process: [
            "Connect your data sources",
            "Design visual KPIs and charts",
            "Build interactive filters",
            "Deploy to your admin panel"
        ],
        price: 34999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Data Visualization Dark
        isGoldenEligible: false
    },
    {
        id: "4",
        name: "AI-Powered Technical Hiring",
        category: "Business",
        description: "Automated candidate screening to find top 1% engineers.",
        fullDescription: "Hiring engineers is hard. We automate the filter. Our system sets up coding challenges, automated screenings, and AI-ranked application forms so you only talk to the qualified candidates.",
        whatYouGet: [
            "Custom application portal setup",
            "Automated skill assessment tests",
            "AI-ranking system for resumes",
            "Email rejection/interview automation",
            "Interview question bank"
        ],
        process: [
            "Define the role requirements",
            "Set up the rigorous screening funnel",
            "Launch job posts",
            "You receive only ranked, top candidates"
        ],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Cyber Security / Tech Code
        isGoldenEligible: false
    },

    // =====================
    // BRAND & GROWTH (Social Media & Ads)
    // =====================
    {
        id: "5",
        name: "AI Brand Anthem & Audio",
        category: "Business",
        description: "Viral-worthy custom songs and jingles for your brand.",
        fullDescription: "Sound is the new logo. We use advanced generative audio AI to compose a unique, catchy brand anthem, jingle, or background score that sticks in your customer's head. Royalty-free and uniquely yours.",
        whatYouGet: [
            "1 Main Brand Anthem (60s)",
            "3 Short Jingles/Stings (10s)",
            "Commercial Usage Rights",
            "High-Quality WAV/MP3",
            "Lyrics/Vocals included"
        ],
        process: [
            "Analyze your brand vibe",
            "Generate 3 audio concepts",
            "Refine the winner",
            "Master and deliver"
        ],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop", // Abstract Sound Waves
        isGoldenEligible: true
    },
    {
        id: "6",
        name: "Social Media Marketing",
        category: "Business",
        description: "AI-driven content calendar + Viral Hooks + Posting.",
        fullDescription: "Consistency builds empires. We use AI to analyze trends in your niche, generate a month's worth of high-engagement content ideas, write the scripts/captions, and schedule them. You just hit record (or let us use stock AI).",
        whatYouGet: [
            "30-Day Content Calendar",
            "Viral Hooks & Scripting",
            "Hashtag & SEO Strategy",
            "Caption writing",
            "Trend analysis report"
        ],
        process: [
            "Analyze niche competitors",
            "Generate content pillars",
            "Produce calendar & scripts",
            "Handover for execution"
        ],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", // Social Media Abstract
        isGoldenEligible: true
    },
    {
        id: "7",
        name: "Ads Making & Scaling",
        category: "Business",
        description: "High-ROI ad creatives generated and tested by AI.",
        fullDescription: "Stop burning money on bad ads. We create data-backed ad creatives (images/videos) designed to stop the scroll. Then we help you set up the campaign structure for maximum ROAS (Return on Ad Spend).",
        whatYouGet: [
            "5 AI-Generated Ad Creatives",
            "Copywriting for High Conversion",
            "Audience targeting strategy",
            "A/B Testing plan",
            "Setup guide"
        ],
        process: [
            "Define target persona",
            "Generate creative variations",
            "Write persuasive copy",
            "Deliver campaign assets"
        ],
        price: 19999,
        imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop", // Digital Marketing Graph
        isGoldenEligible: false
    },

    // =====================
    // PROFESSIONAL (Career Ascension)
    // =====================
    {
        id: "8",
        name: "AI-Optimized Tech Resume",
        category: "Professional",
        description: "Beat the ATS bots. Designed for high-paying tech roles.",
        fullDescription: "Most resumes never get read by humans. We engineer your resume with the exact keywords and formatting that ATS (Applicant Tracking Systems) love. Optimized specifically for Engineering, Product, and Tech roles.",
        whatYouGet: [
            "ATS-Compliant Format (Latex/Word)",
            "Keyword Optimization",
            "GitHub/Portfolio Project Highlighting",
            "LinkedIn Profile Synchronization",
            "Cover Letter Template"
        ],
        process: [
            "Analyze target job descriptions",
            "Map your skills to keywords",
            "Reformat and rewrite bullets",
            "Verify against ATS scanners"
        ],
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop", // Resume/Document Tech
        isGoldenEligible: true
    },
    {
        id: "9",
        name: "LinkedIn Personal Branding",
        category: "Professional",
        description: "Turn your profile into a lead magnet.",
        fullDescription: "Your LinkedIn profile is your new landing page. We overhaul your headline, about section, and featured items to position you as an industry authority. Includes a content strategy to grow your network.",
        whatYouGet: [
            "Profile SEO Optimization",
            "Authority-building Headline",
            "About Section Storytelling",
            "Featured Section Design",
            "Connection outreach scripts"
        ],
        process: [
            "Audit current profile",
            "Identify personal brand pillars",
            "Rewrite all profile sections",
            "Deliver optimization guide"
        ],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop", // LinkedIn/Network
        isGoldenEligible: true
    },

    // =====================
    // STUDENT / PERSONAL (Life Architect)
    // =====================
    {
        id: "10",
        name: "AI Study Companion Setup",
        category: "Student",
        description: "Custom GPT trained on your syllabus and textbooks.",
        fullDescription: "Imagine a tutor who knows every page of your textbook. We build a private knowledge base from your study materials and configure a Custom GPT that can quiz you, summarize chapters, and explain complex concepts 24/7.",
        whatYouGet: [
            "Custom Knowledge Base Setup",
            "Document Processing (OCR)",
            "Exam-Prep GPT Configuration",
            "Summary & Quiz capabilities",
            "Mobile access setup"
        ],
        process: [
            "Upload your PDFs/Notes",
            "We clean and index the data",
            "Configure the AI tutor",
            "Train you on prompting it"
        ],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop", // Knowledge/Books Digital
        isGoldenEligible: true
    },
    {
        id: "11",
        name: "Assignment Research Assistant",
        category: "Student",
        description: "Deep-dive research and citation for any topic.",
        fullDescription: "Writing is easy when the research is done. We use advanced research agents to gather credible sources, summarize key arguments, and generate proper citations for your assignment topics. *Ethical use only.*",
        whatYouGet: [
            "Comprehensive Topic Report",
            "List of Credible Sources",
            "Key Arguments Summary",
            "Citation Generation (APA/MLA)",
            "Outline suggestions"
        ],
        process: [
            "Define research scope",
            "AI agents scour the web/papers",
            "Compile and verify data",
            "Deliver structured report"
        ],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop", // Writing/Research Tech
        isGoldenEligible: true
    },
    {
        id: "12",
        name: "Personal Finance Dashboard",
        category: "Personal",
        description: "Automate your budget tracking and expense analysis.",
        fullDescription: "Stop fearing your bank account. We set up an automated personal finance dashboard that tracks your spending, categorizes expenses, andvisualizes your savings goals. Financial clarity, automated.",
        whatYouGet: [
            "Expense Tracker Setup",
            "Visual Spending Report",
            "Budget vs Actual Analysis",
            "Savings Goal Calculator",
            "Mobile-friendly view"
        ],
        process: [
            "Define expense categories",
            "Set up tracking sheet/app",
            "Build capitalization dashboard",
            "Handover system"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop", // Finance/Money Growth
        isGoldenEligible: true
    }
];
