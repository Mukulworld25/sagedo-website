
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
        fullDescription: "Stop losing customers to slow replies. Our AI Chatbots live on your website or WhatsApp, answering queries, qualifying leads, and even booking appointments 24/7. It",
        price: 24999,
        priceRange: "₹24999 - ₹37498",
        imageUrl: "https://images.unsplash.com/photo-1531746797190-fe5c1a9ac876?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Custom-trained AI on your data", "WhatsApp & Website integration", "Lead qualification & capture", "Appointment booking capability", "Monthly performance report"],
        premiumFeatures: ["We scrape your website/docs", "Train the conversation flow", "Integrate with your platforms", "Go live with monitoring"]
    },
    {
        id: "31",
        name: "Zero-Touch Workflow Automation",
        category: "Business",
        description: "Connect your apps. Automate leads, invoices, and emails.",
        fullDescription: "Eliminate manual data entry. We build ",
        price: 14999,
        priceRange: "₹14999 - ₹22498",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Map of current manual processes", "3-step complex automation setup (Zapier/Make)", "Error handling & alerts", "Connection to CRM/Email/Sheets", "Training session"],
        premiumFeatures: ["Map of current manual processes", "3-step complex automation setup (Zapier/Make)", "Error handling & alerts"]
    },
    {
        id: "32",
        name: "Business Intelligence Dashboard",
        category: "Business",
        description: "Live ",
        fullDescription: "Stop flying blind. We turn your messy Excel sheets and database rows into a stunning, real-time command center. See your daily sales, profit margins, and active users at a glance.",
        price: 34999,
        priceRange: "₹34999 - ₹52498",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Custom PowerBI/Looker Studio Dashboard", "Real-time data connections", "Sales & Revenue tracking", "Customer behavior visualization", "Mobile-friendly view"],
        premiumFeatures: ["Custom PowerBI/Looker Studio Dashboard", "Real-time data connections", "Sales & Revenue tracking"]
    },
    {
        id: "33",
        name: "AI-Powered Technical Hiring",
        category: "Business",
        description: "Automated candidate screening to find top 1% engineers.",
        fullDescription: "Hiring engineers is hard. We automate the filter. Our system sets up coding challenges, automated screenings, and AI-ranked application forms so you only talk to the qualified candidates.",
        price: 9999,
        priceRange: "₹9999 - ₹14998",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Custom application portal setup", "Automated skill assessment tests", "AI-ranking system for resumes", "Email rejection automation", "Interview question bank"],
        premiumFeatures: ["Custom application portal setup", "Automated skill assessment tests", "AI-ranking system for resumes"]
    },
    {
        id: "34",
        name: "AI Brand Anthem & Audio",
        category: "Business",
        description: "Viral-worthy custom songs and jingles for your brand.",
        fullDescription: "Sound is the new logo. We use advanced generative audio AI to compose a unique, catchy brand anthem, jingle, or background score that sticks in your customer",
        price: 7999,
        priceRange: "₹7999 - ₹11998",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["1 Main Brand Anthem (60s)", "3 Short Jingles/Stings (10s)", "Commercial Usage Rights", "High-Quality WAV/MP3", "Lyrics/Vocals included"],
        premiumFeatures: ["Analyze your brand vibe", "Generate 3 audio concepts", "Refine the winner", "Master and deliver"]
    },
    {
        id: "35",
        name: "Social Media Marketing Suite",
        category: "Business",
        description: "AI-driven content calendar + Viral Hooks + Posting.",
        fullDescription: "Consistency builds empires. We use AI to analyze trends in your niche, generate a month",
        price: 14999,
        priceRange: "₹14999 - ₹22498",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["30-Day Content Calendar", "Viral Hooks & Scripting", "Hashtag & SEO Strategy", "Caption writing", "Trend analysis report"],
        premiumFeatures: ["30-Day Content Calendar", "Viral Hooks & Scripting", "Hashtag & SEO Strategy"]
    },
    {
        id: "36",
        name: "Ads Making & Scaling",
        category: "Business",
        description: "High-ROI ad creatives generated and tested by AI.",
        fullDescription: "Stop burning money on bad ads. We create data-backed ad creatives (images/videos) designed to stop the scroll. Then we help you set up the campaign structure for maximum ROAS.",
        price: 19999,
        priceRange: "₹19999 - ₹29998",
        imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["5 AI-Generated Ad Creatives", "Copywriting for High Conversion", "Audience targeting strategy", "A/B Testing plan", "Setup guide"],
        premiumFeatures: ["5 AI-Generated Ad Creatives", "Copywriting for High Conversion", "Audience targeting strategy"]
    },
    {
        id: "37",
        name: "Startup Pitch Deck Design",
        category: "Business",
        description: "Investment-ready slides that tell a compelling story.",
        fullDescription: "Secure that funding. We take your raw notes and transform them into a visually stunning, narrative-driven pitch deck that investors can't ignore. Designed for clarity, impact, and persuasion.",
        price: 4999,
        priceRange: "₹4999 - ₹7498",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["10-15 Slide Professional Deck", "Financial Data Visualization", "Custom Graphics & Icons", "Narrative Arc Consulting", "PPT/PDF Source Files"],
        premiumFeatures: ["10-15 Slide Professional Deck", "Financial Data Visualization", "Custom Graphics & Icons"]
    },
    {
        id: "38",
        name: "LinkedIn Personal Branding",
        category: "Professional",
        description: "Turn your profile into a lead magnet.",
        fullDescription: "Your LinkedIn profile is your new landing page. We overhaul your headline, about section, and featured items to position you as an industry authority.",
        price: 4999,
        priceRange: "₹4999 - ₹7498",
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Profile SEO Optimization", "Authority-building Headline", "About Section Storytelling", "Connection outreach scripts", "Banner Design"],
        premiumFeatures: ["Profile SEO Optimization", "Authority-building Headline", "About Section Storytelling"]
    },
    {
        id: "39",
        name: "Personal Portfolio Website",
        category: "Professional",
        description: "A stunning showcase of your work and skills.",
        fullDescription: "Stop sending PDF portfolios. We build you a sleek, modern personal website that showcases your projects, experience, and contact info. Essential for freelancers and creatives.",
        price: 5999,
        priceRange: "₹5999 - ₹8998",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["One-Page Modern Site", "Project Gallery", "Contact Form", "Domain Connection", "Mobile Responsive"],
        premiumFeatures: ["One-Page Modern Site", "Project Gallery", "Contact Form"]
    },
    {
        id: "41",
        name: "Academic Research Assistant",
        category: "Student",
        description: "Deep-dive research and citation for any topic.",
        fullDescription: "Writing is easy when the research is done. We use advanced research agents to gather credible sources, summarize key arguments, and generate proper citations for your assignment topics.",
        price: 1999,
        priceRange: "₹1999 - ₹2998",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Comprehensive Topic Report", "List of Credible Sources", "Key Arguments Summary", "Citation Generation (APA/MLA)"],
        premiumFeatures: ["Comprehensive Topic Report", "List of Credible Sources", "Key Arguments Summary"]
    },
    {
        id: "51",
        name: "Mock Interview Practice",
        category: "Professional",
        description: "Realistic AI-driven interview simulation.",
        fullDescription: "Nervous about the big interview? We set up a rigorous mock interview specifically for your role, record your answers, and provide AI-generated feedback on your tone, clarity, and content.",
        price: 1499,
        priceRange: "₹1499 - ₹2248",
        imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["30-Minute Mock Session", "Role-Specific Questions", "Performance Analytics Report", "Improvement Tips"],
        premiumFeatures: ["30-Minute Mock Session", "Role-Specific Questions", "Performance Analytics Report"]
    },
    {
        id: "42",
        name: "AI Study Companion Setup",
        category: "Student",
        description: "Custom GPT trained on your syllabus.",
        fullDescription: "Imagine a tutor who knows every page of your textbook. We build a private knowledge base from your study materials and configure a Custom GPT that can quiz you, summarize chapters, and explain complex concepts 24/7.",
        price: 4999,
        priceRange: "₹4999 - ₹7498",
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Custom Knowledge Base Setup", "OCR Document Processing", "Exam-Prep GPT Config", "Summary & Quiz Capabilities"],
        premiumFeatures: ["Custom Knowledge Base Setup", "OCR Document Processing", "Exam-Prep GPT Config"]
    },
    {
        id: "43",
        name: "Personal Finance Dashboard",
        category: "Personal",
        description: "Automate your budget tracking and expense analysis.",
        fullDescription: "Stop fearing your bank account. We set up an automated personal finance dashboard that tracks your spending, categorizes expenses, andvisualizes your savings goals.",
        price: 2999,
        priceRange: "₹2999 - ₹4498",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Expense Tracker Setup", "Visual Spending Report", "Budget vs Actual Analysis", "Savings Goal Calculator"],
        premiumFeatures: ["Expense Tracker Setup", "Visual Spending Report", "Budget vs Actual Analysis"]
    },
    {
        id: "44",
        name: "Viral Reels Video Editing",
        category: "Personal",
        description: "Professional editing for Shorts/Reels/TikTok.",
        fullDescription: "Transform raw footage into viral gold. We add dynamic captions, transitions, sound effects, and color grading to make your short-form content pop.",
        price: 499,
        priceRange: "₹499 - ₹748",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["1 Short Video Edit (60s)", "Dynamic Captions", "Trending Audio Sync", "Color Grading", "Thumbnail"],
        premiumFeatures: ["1 Short Video Edit (60s)", "Dynamic Captions", "Trending Audio Sync"]
    },
    {
        id: "45",
        name: "Influencer Media Kit",
        category: "Personal",
        description: "Professional kit to get brand deals.",
        fullDescription: "Look like a pro to sponsors. We design a stunning PDF media kit showcasing your stats, demographics, and rates.",
        price: 799,
        priceRange: "₹799 - ₹1198",
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Professional PDF Design", "Audience Analytics Visualization", "Rate Card Layout", "Clickable Links"],
        premiumFeatures: ["Professional PDF Design", "Audience Analytics Visualization", "Rate Card Layout"]
    },
    {
        id: "46",
        name: "AI Health & Nutrition Plan",
        category: "Personal",
        description: "Hyper-personalized 30-day meal plan.",
        fullDescription: "Based on your unique body type and goals. We use AI analysis of your preferences to generate a realistic, diverse, and healthy 30-day meal plan.",
        price: 349,
        priceRange: "₹349 - ₹523",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["30-Day Meal Plan", "Grocery Shopping Lists", "Macro Breakdown", "Recipe Quick-Links"],
        premiumFeatures: ["30-Day Meal Plan", "Grocery Shopping Lists", "Macro Breakdown"]
    },
    {
        id: "47",
        name: "Smart Travel Itinerary",
        category: "Personal",
        description: "The perfect trip, planned to the minute.",
        fullDescription: "Stop wasting hours on Tripadvisor. We create a day-by-day itinerary for your trip, including hidden gems, logistics, and budget optimization.",
        price: 499,
        priceRange: "₹499 - ₹748",
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Day-by-Day Schedule", "Hotel & Transport Picks", "Budget Breakdown", "Local ", " Tips"],
        premiumFeatures: ["Day-by-Day Schedule", "Hotel & Transport Picks", "Budget Breakdown"]
    },
    {
        id: "48",
        name: "Custom Illustration / Art",
        category: "Personal",
        description: "Unique digital art for gifts or profile pics.",
        fullDescription: "Get a one-of-a-kind digital illustration. Perfect for profile pictures, gifts, or merchandise. Created with a blend of AI and manual touchup.",
        price: 899,
        priceRange: "₹899 - ₹1348",
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["High-Res Digital File", "Commercial Usage Rights", "2 Style Variations", "3 Revisions"],
        premiumFeatures: ["High-Res Digital File", "Commercial Usage Rights", "2 Style Variations"]
    },
    {
        id: "49",
        name: "Photo Retouching (5 Pack)",
        category: "Personal",
        description: "Make your photos look professional.",
        fullDescription: "Fix lighting, remove blemishes, and color grade your photos. Perfect for social media or personal albums.",
        price: 299,
        priceRange: "₹299 - ₹448",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["5 Photo Edits", "Color Correction", "Object Removal", "High-Res Export"],
        premiumFeatures: ["5 Photo Edits", "Color Correction", "Object Removal"]
    },
    {
        id: "50",
        name: "AI Strategy Audit (Free)",
        category: "All",
        description: "We analyze your business gaps for free.",
        fullDescription: "Confused by AI? We analyze your workflow and recommend tools to save time.",
        price: 0,
        priceRange: "₹0 - ₹0",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true,
        standardFeatures: ["Workflow Analysis", "Tool Recommendations", "ROI Report", "No Obligation"],
        premiumFeatures: ["Workflow Analysis", "Tool Recommendations", "ROI Report"]
    }
];
