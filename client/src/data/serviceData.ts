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
    // ==========================================
    // 💼 BUSINESS & STARTUP (High Ticket)
    // ==========================================
    {
        id: "1",
        name: "24/7 AI Voice & Chat Bots",
        category: "Business",
        description: "AI handles 1000s of calls. Humans handle complex issues.",
        fullDescription: "The ultimate hybrid support system. Our AI agents handle 90% of your customer queries, bookings, and support tickets instantly, 24/7. For the 10% of complex issues that require empathy or judgment, the system seamlessly hands over to a human expert. You save costs while improving quality.",
        whatYouGet: [
            "Custom-trained AI Voice/Chat Bot",
            "Human Handoff Protocol",
            "WhatsApp & Website Integration",
            "Instant Lead Qualification",
            "Zero Missed Calls Promise"
        ],
        process: [
            "We analyze your support logs",
            "Train AI on 90% common queries",
            "Define Human Handoff triggers",
            "Go live with 24/7 monitoring"
        ],
        price: 19999,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "2",
        name: "Intelligent Workflow Automation",
        category: "Business",
        description: "AI moves data. Humans verify the results.",
        fullDescription: "Stop being a data-entry clerk. We connect your CRM, Email, and WhatsApp so leads flow automatically. Our hybrid approach means we set up the AI automations to do the heavy lifting, and we include a human quality-check step for critical actions (like big invoices) so you never send a wrong email.",
        whatYouGet: [
            "Complete Process Audit",
            "Zapier/Make/n8n Automation",
            "Human-in-the-loop Verification",
            "Auto-Email & SMS Setup",
            "Error-Free Data Transfer"
        ],
        process: [
            "Map your manual tasks",
            "Design the automation flow",
            "Build & Human-Verify",
            "Handover the system"
        ],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "3",
        name: "AI Business Intelligence Dashboard",
        category: "Business",
        description: "AI crunches millions of rows. Humans find the strategy.",
        fullDescription: "You have data everywhere—Excel, CRM, Billing. Our AI models clean and process this massive data instantly. Then, our Data Analysts build a custom dashboard that tells you the truth: 'Sell more of X, stop selling Y'. AI provides the data; we provide the insight.",
        whatYouGet: [
            "Data Cleaning & Organization",
            "Predictive Sales Analysis",
            "Custom PowerBI/Tableau Dashboard",
            "Inventory Forecasting",
            "Strategic Insight Report"
        ],
        process: [
            "Connect data sources",
            "AI Cleans & Structures",
            "Analyst builds dashboard",
            "Strategy Review Call"
        ],
        price: 24999,
        imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "4",
        name: "Hybrid Social Media Engine",
        category: "Business",
        description: "AI generates ideas. Humans add the soul.",
        fullDescription: "Consistency is hard. Our AI engine analyzes viral trends and generates 50+ content ideas/scripts in minutes. Then, our creative team polishes them, adds your unique brand voice, and designs the visuals. You get viral-optimized content that still feels authentic.",
        whatYouGet: [
            "30-Day Content Calendar",
            "AI-Trend Analysis + Human Scripting",
            "Graphic Design (Canva/Photoshop)",
            "Auto-Posting Schedule",
            "Engagement Monitoring"
        ],
        process: [
            "Analyze niche trends",
            "AI Drafts -> Human Polish",
            "Design & Schedule",
            "Monitor & Iterate"
        ],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "6",
        name: "Ads & Sales Roadmap",
        category: "Business",
        description: "AI targets the audience. Humans craft the offer.",
        fullDescription: "Don't guess with your ad budget. We use AI tools to spy on competitors and identify the perfect audience segments. Then, our marketing experts craft the 'Killer Offer' and creative that converts them. It's data-backed creativity.",
        whatYouGet: [
            "Competitor Spy Report",
            "Audience Targeting Strategy",
            "High-Converting Ad Creatives",
            "Budget Scaling Roadmap",
            "ROI Calculator"
        ],
        process: [
            "Audit past performance",
            "AI Competitor Analysis",
            "Human Creative Strategy",
            "Launch Plan"
        ],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "7",
        name: "Startup Pitch Deck Design",
        category: "Business",
        description: "AI structures the data. Humans tell the story.",
        fullDescription: "Investors buy stories, not just numbers. We use AI to structure your financial models and market data perfectly. Then, our designers and copywriters turn it into a compelling narrative deck that secures funding.",
        whatYouGet: [
            "10-15 Professional Slides",
            "Financial Data Visualization",
            "Compelling Narrative Arc",
            "Investor-Ready PDF/PPT",
            "Pitch Practice Guide"
        ],
        process: [
            "Raw Data Collection",
            "AI Structure & Flow",
            "Human Design & Copy",
            "Final Polish"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    // NEW SERVICES (Cloud & Tech)
    {
        id: "18",
        name: "SaaS MVP Development",
        category: "Business",
        description: "Launch your app in weeks, not months.",
        fullDescription: "Got an idea? We build it fast. Using a hybrid of AI code generation (for speed) and senior developer oversight (for security and architecture), we deliver a fully functional MVP in record time. Perfect for testing the market.",
        whatYouGet: [
            "Web/Mobile App MVP",
            "Database Setup",
            "User Authentication",
            "Payment Gateway Integration",
            "Deployment to Cloud"
        ],
        process: [
            "Requirement Analysis",
            "AI-Assisted Coding",
            "Senior Dev Code Review",
            "Launch"
        ],
        price: 49999,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "19",
        name: "Cloud Infrastructure Setup",
        category: "Business",
        description: "Scale your business on AWS/Azure.",
        fullDescription: "Stop worrying about servers crashing. We set up a robust, auto-scaling cloud infrastructure for your business. Secure, fast, and cheaper than effective manual management.",
        whatYouGet: [
            "AWS/Azure/GCP Setup",
            "Auto-scaling Configuration",
            "Security Firewall",
            "Cost Optimization",
            "Backup Systems"
        ],
        process: [
            "Audit current hosting",
            "Architect cloud solution",
            "Migrate & Secure",
            "Handover credentials"
        ],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },

    // ==========================================
    // 🚀 PROFESSIONAL & CAREER
    // ==========================================
    {
        id: "8",
        name: "ATS Resume Optimization",
        category: "Professional",
        description: "AI beats the bot. Humans impress the manager.",
        fullDescription: "75% of resumes are rejected by ATS bots. We use AI to keyword-optimize your resume to pass the bot. Then, our human recruiters refine the formatting and language to impress the hiring manager who actually reads it.",
        whatYouGet: [
            "ATS-Beat Formatting",
            "Keyword Injection Strategy",
            "Human Readability Polish",
            "Cover Letter Template",
            "LinkedIn Sync Guide"
        ],
        process: [
            "Scan current resume",
            "AI Keyword Optimization",
            "Human Editorial Review",
            "Final Delivery"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "9",
        name: "LinkedIn Profile Brand",
        category: "Professional",
        description: "Attract opportunities while you sleep.",
        fullDescription: "We ignore the fluff. We optimize your LinkedIn profile (Headline, Bio, Featured) using SEO principles so you show up in recruiter searches. Then we write a 'Human' bio that builds authority and trust instantly.",
        whatYouGet: [
            "SEO-Optimized Headline",
            "Authority-Building Bio",
            "Featured Section Design",
            "Network Growth Strategy",
            "Profile Banner"
        ],
        process: [
            "Profile Audit",
            "SEO Keyword Strategy",
            "Content Rewriting",
            "Banner Design"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "10",
        name: "Personal Portfolio Website",
        category: "Professional",
        description: "Your digital homebase. Built in 48 hours.",
        fullDescription: "PDF portfolios are dead. We build you a sleek, mobile-responsive personal website. AI writes the copy to sell your skills, and our designers ensure it looks world-class. Establish your personal brand instantly.",
        whatYouGet: [
            "Modern One-Page Site",
            "Project Gallery Showcase",
            "Contact & Lead Form",
            "Mobile Responsive Design",
            "Domain Setup Support"
        ],
        process: [
            "Content Collection",
            "Design & Build",
            "Review & Polish",
            "Launch"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "11",
        name: "Job Application Agent",
        category: "Professional",
        description: "Apply to 50 jobs with 1 click.",
        fullDescription: "Job hunting is a numbers game. Our AI agent applies to relevant jobs for you, customizing the answers for each specific form. You focus on the interview; we focus on getting you there.",
        whatYouGet: [
            "Automated Application Agent",
            "Custom Answer Generation",
            "Platform optimization",
            "Daily Application Report",
            "Cover Letter Auto-Gen"
        ],
        process: [
            "Define Job Criteria",
            "AI Agent Applies",
            "Daily Report Sent",
            "Interview Prep"
        ],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "12",
        name: "AI Mock Interview Pro",
        category: "Professional",
        description: "Fail here. Win there.",
        fullDescription: "Don't practice in the real interview. Our AI interviewer grills you with role-specific questions and gives instant feedback on your tone, confidence, and answer quality. Sharpen your skills before the stakes are high.",
        whatYouGet: [
            "Role-Specific Mock Session",
            "Speech & Tone Analysis",
            "Confidence Scoring",
            "Answer Improvement Tips",
            "Recording of Session"
        ],
        process: [
            "Select Role/Industry",
            "AI Mock Interview",
            "Performance Report",
            "Repeat until perfect"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },

    // ==========================================
    // ❤️ PERSONAL & STUDENT
    // ==========================================
    {
        id: "13",
        name: "Academic Research Assistant",
        category: "Student",
        description: "AI reads the papers. You write the insight.",
        fullDescription: "Researching takes days. Our AI scans thousands of journals and sources to find the exact data you need, summarizes key arguments, and generates citations. You get a structured research brief so you can write a brilliant paper in half the time.",
        whatYouGet: [
            "Deep Topic Research",
            "Credible Source List",
            "Key Argument Summary",
            "Citation Generator (APA/MLA)",
            "Outline Structure"
        ],
        process: [
            "Define Topic",
            "AI Research Sweep",
            "Human Fact-Check",
            "Delivery"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "14",
        name: "Personal Finance Tracker",
        category: "Personal",
        description: "Know where every rupee goes.",
        fullDescription: "A simple, automated system to track every rupee you earn and spend. We set it up so it's easy to maintain. Visualize your financial health and start saving for what matters.",
        whatYouGet: [
            "Automated Expense Sheet",
            "Category Breakdown",
            "Savings Goal Tracker",
            "Monthly Budget Plan",
            "Mobile Access"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "15",
        name: "Social Media Combo (10 Pack)",
        category: "Personal",
        description: "Instant content library. 10 viral edits.",
        fullDescription: "Growing a personal brand? We give you 10 professionally edited Reels/Shorts complete with captions, trending music, and cuts. You provide the raw video (or we use stock), we make it viral.",
        whatYouGet: [
            "10 Edited Reel/Short Videos",
            "Trending Audio Selection",
            "Dynamic Captions",
            "Viral Hook Editing",
            "Thumbnail Suggestions"
        ],
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "5",
        name: "AI Professional Songs",
        category: "Personal",
        description: "Your lyrics. Studio quality audio.",
        fullDescription: "Turn your poem, lyrics, or brand message into a professional song. We use generative audio AI to compose the track, then master it for professional release. Perfect for gifts, ads, or content.",
        whatYouGet: [
            "Full Custom Composition",
            "Professional Vocals (AI Generated)",
            "Commercial Usage Rights",
            "High-Quality WAV Export",
            "Lyrics Assistance"
        ],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "0",
        name: "Free Consultation",
        category: "All",
        description: "Confused? Let's chat. Free advice.",
        fullDescription: "Don't know what you need? Tell us your problem in detail, and our experts will recommend the exact AI tools or services to fix it. No obligation. Just solutions.",
        whatYouGet: [
            "Problem Diagnosis",
            "Tool Recommendation",
            "Implementation Strategy",
            "ROI Estimate",
            "Cost-Saving Tips"
        ],
        process: [
            "Submit your problem",
            "We analyze the solution",
            "Receive detailed report",
            "Take action"
        ],
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    }
];
