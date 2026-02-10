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
    // 👑 THE EMPIRE BUILDER (Business & High Ticket)
    // ==========================================
    {
        id: "1",
        name: "24/7 AI Sales Chatbot",
        category: "Business",
        description: "Intelligent WhatsApp/Web bot that sells while you sleep.",
        fullDescription: "Stop losing customers to slow replies. Our AI Chatbots live on your website or WhatsApp, answering queries, qualifying leads, and even booking appointments 24/7. It's like having a best-performing sales agent who never sleeps.",
        whatYouGet: ["Custom-trained AI on your data", "WhatsApp & Website integration", "Lead qualification & capture", "Appointment booking capability", "Monthly performance report"],
        process: ["We scrape your website/docs", "Train the conversation flow", "Integrate with your platforms", "Go live with monitoring"],
        price: 24999,
        imageUrl: "https://images.unsplash.com/photo-1531746797190-fe5c1a9ac876?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "2",
        name: "Zero-Touch Workflow Automation",
        category: "Business",
        description: "Connect your apps. Automate leads, invoices, and emails.",
        fullDescription: "Eliminate manual data entry. We build 'Invisible Pipelines' that move data between your apps automatically. Example: New Lead -> CRM -> Welcome Email -> Slack Notification. All instant, all automated.",
        whatYouGet: ["Map of current manual processes", "3-step complex automation setup (Zapier/Make)", "Error handling & alerts", "Connection to CRM/Email/Sheets", "Training session"],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "3",
        name: "Business Intelligence Dashboard",
        category: "Business",
        description: "Live 'God Mode' view of your sales, leads, and money.",
        fullDescription: "Stop flying blind. We turn your messy Excel sheets and database rows into a stunning, real-time command center. See your daily sales, profit margins, and active users at a glance.",
        whatYouGet: ["Custom PowerBI/Looker Studio Dashboard", "Real-time data connections", "Sales & Revenue tracking", "Customer behavior visualization", "Mobile-friendly view"],
        price: 34999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "4",
        name: "AI-Powered Technical Hiring",
        category: "Business",
        description: "Automated candidate screening to find top 1% engineers.",
        fullDescription: "Hiring engineers is hard. We automate the filter. Our system sets up coding challenges, automated screenings, and AI-ranked application forms so you only talk to the qualified candidates.",
        whatYouGet: ["Custom application portal setup", "Automated skill assessment tests", "AI-ranking system for resumes", "Email rejection automation", "Interview question bank"],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "5",
        name: "AI Brand Anthem & Audio",
        category: "Business",
        description: "Viral-worthy custom songs and jingles for your brand.",
        fullDescription: "Sound is the new logo. We use advanced generative audio AI to compose a unique, catchy brand anthem, jingle, or background score that sticks in your customer's head. Royalty-free and uniquely yours.",
        whatYouGet: ["1 Main Brand Anthem (60s)", "3 Short Jingles/Stings (10s)", "Commercial Usage Rights", "High-Quality WAV/MP3", "Lyrics/Vocals included"],
        process: ["Analyze your brand vibe", "Generate 3 audio concepts", "Refine the winner", "Master and deliver"],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "6",
        name: "Social Media Marketing Suite",
        category: "Business",
        description: "AI-driven content calendar + Viral Hooks + Posting.",
        fullDescription: "Consistency builds empires. We use AI to analyze trends in your niche, generate a month's worth of high-engagement content ideas, write the scripts/captions, and schedule them.",
        whatYouGet: ["30-Day Content Calendar", "Viral Hooks & Scripting", "Hashtag & SEO Strategy", "Caption writing", "Trend analysis report"],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "7",
        name: "Ads Making & Scaling",
        category: "Business",
        description: "High-ROI ad creatives generated and tested by AI.",
        fullDescription: "Stop burning money on bad ads. We create data-backed ad creatives (images/videos) designed to stop the scroll. Then we help you set up the campaign structure for maximum ROAS.",
        whatYouGet: ["5 AI-Generated Ad Creatives", "Copywriting for High Conversion", "Audience targeting strategy", "A/B Testing plan", "Setup guide"],
        price: 19999,
        imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "biz-1",
        name: "Startup Pitch Deck Design",
        category: "Business",
        description: "Investment-ready slides that tell a compelling story.",
        fullDescription: "Secure that funding. We take your raw notes and transform them into a visually stunning, narrative-driven pitch deck that investors can't ignore. Designed for clarity, impact, and persuasion.",
        whatYouGet: ["10-15 Slide Professional Deck", "Financial Data Visualization", "Custom Graphics & Icons", "Narrative Arc Consulting", "PPT/PDF Source Files"],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },

    // ==========================================
    // 🚀 CAREER ASCENSION (Professional)
    // ==========================================
    {
        id: "8",
        name: "AI-Optimized Tech Resume",
        category: "Professional",
        description: "Beat the ATS bots. Designed for high-paying tech roles.",
        fullDescription: "Most resumes never get read by humans. We engineer your resume with the exact keywords and formatting that ATS (Applicant Tracking Systems) love.",
        whatYouGet: ["ATS-Compliant Format", "Keyword Optimization", "GitHub Highlight", "Cover Letter Template", "LinkedIn Sync Guide"],
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "9",
        name: "LinkedIn Personal Branding",
        category: "Professional",
        description: "Turn your profile into a lead magnet.",
        fullDescription: "Your LinkedIn profile is your new landing page. We overhaul your headline, about section, and featured items to position you as an industry authority.",
        whatYouGet: ["Profile SEO Optimization", "Authority-building Headline", "About Section Storytelling", "Connection outreach scripts", "Banner Design"],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "prof-1",
        name: "Personal Portfolio Website",
        category: "Professional",
        description: "A stunning showcase of your work and skills.",
        fullDescription: "Stop sending PDF portfolios. We build you a sleek, modern personal website that showcases your projects, experience, and contact info. Essential for freelancers and creatives.",
        whatYouGet: ["One-Page Modern Site", "Project Gallery", "Contact Form", "Domain Connection", "Mobile Responsive"],
        price: 5999,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "prof-2",
        name: "Professional Headshot AI Enhancement",
        category: "Professional",
        description: "Turn selfies into studio-quality headshots.",
        fullDescription: "Don't have time for a photoshoot? Send us your best selfies, and we use advanced AI to transform them into professional, studio-grade LinkedIn headshots.",
        whatYouGet: ["3 Professional Headshot Variations", "Suit/Attire Change", "Background Replacement", "High-Res Export"],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "prof-3",
        name: "Mock Interview Practice",
        category: "Professional",
        description: "Realistic AI-driven interview simulation.",
        fullDescription: "Nervous about the big interview? We set up a rigorous mock interview specifically for your role, record your answers, and provide AI-generated feedback on your tone, clarity, and content.",
        whatYouGet: ["30-Minute Mock Session", "Role-Specific Questions", "Performance Analytics Report", "Improvement Tips"],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },

    // ==========================================
    // ❤️ LIFE ARCHITECT (Personal & Student)
    // ==========================================
    {
        id: "10",
        name: "AI Study Companion Setup",
        category: "Student",
        description: "Custom GPT trained on your syllabus.",
        fullDescription: "Imagine a tutor who knows every page of your textbook. We build a private knowledge base from your study materials and configure a Custom GPT that can quiz you, summarize chapters, and explain complex concepts 24/7.",
        whatYouGet: ["Custom Knowledge Base Setup", "OCR Document Processing", "Exam-Prep GPT Config", "Summary & Quiz Capabilities"],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "11",
        name: "Academic Research Assistant",
        category: "Student",
        description: "Deep-dive research and citation for any topic.",
        fullDescription: "Writing is easy when the research is done. We use advanced research agents to gather credible sources, summarize key arguments, and generate proper citations for your assignment topics.",
        whatYouGet: ["Comprehensive Topic Report", "List of Credible Sources", "Key Arguments Summary", "Citation Generation (APA/MLA)"],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "12",
        name: "Personal Finance Dashboard",
        category: "Personal",
        description: "Automate your budget tracking and expense analysis.",
        fullDescription: "Stop fearing your bank account. We set up an automated personal finance dashboard that tracks your spending, categorizes expenses, andvisualizes your savings goals.",
        whatYouGet: ["Expense Tracker Setup", "Visual Spending Report", "Budget vs Actual Analysis", "Savings Goal Calculator"],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-1",
        name: "Viral Reels Video Editing",
        category: "Personal",
        description: "Professional editing for Shorts/Reels/TikTok.",
        fullDescription: "Transform raw footage into viral gold. We add dynamic captions, transitions, sound effects, and color grading to make your short-form content pop.",
        whatYouGet: ["1 Short Video Edit (60s)", "Dynamic Captions", "Trending Audio Sync", "Color Grading", "Thumbnail"],
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-2",
        name: "Influencer Media Kit",
        category: "Personal",
        description: "Professional kit to get brand deals.",
        fullDescription: "Look like a pro to sponsors. We design a stunning PDF media kit showcasing your stats, demographics, and rates.",
        whatYouGet: ["Professional PDF Design", "Audience Analytics Visualization", "Rate Card Layout", "Clickable Links"],
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    },
    {
        id: "life-3",
        name: "AI Health & Nutrition Plan",
        category: "Personal",
        description: "Hyper-personalized 30-day meal plan.",
        fullDescription: "Based on your unique body type and goals. We use AI analysis of your preferences to generate a realistic, diverse, and healthy 30-day meal plan.",
        whatYouGet: ["30-Day Meal Plan", "Grocery Shopping Lists", "Macro Breakdown", "Recipe Quick-Links"],
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-4",
        name: "Smart Travel Itinerary",
        category: "Personal",
        description: "The perfect trip, planned to the minute.",
        fullDescription: "Stop wasting hours on Tripadvisor. We create a day-by-day itinerary for your trip, including hidden gems, logistics, and budget optimization.",
        whatYouGet: ["Day-by-Day Schedule", "Hotel & Transport Picks", "Budget Breakdown", "Local 'Hidden Gem' Tips"],
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-5",
        name: "Custom Illustration / Art",
        category: "Personal",
        description: "Unique digital art for gifts or profile pics.",
        fullDescription: "Get a one-of-a-kind digital illustration. Perfect for profile pictures, gifts, or merchandise. Created with a blend of AI and manual touchup.",
        whatYouGet: ["High-Res Digital File", "Commercial Usage Rights", "2 Style Variations", "3 Revisions"],
        price: 899,
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-6",
        name: "Photo Retouching (5 Pack)",
        category: "Personal",
        description: "Make your photos look professional.",
        fullDescription: "Fix lighting, remove blemishes, and color grade your photos. Perfect for social media or personal albums.",
        whatYouGet: ["5 Photo Edits", "Color Correction", "Object Removal", "High-Res Export"],
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: true
    },
    {
        id: "life-7",
        name: "AI Strategy Audit (Free)",
        category: "All",
        description: "We analyze your business gaps for free.",
        fullDescription: "Confused by AI? We analyze your workflow and recommend tools to save time.",
        whatYouGet: ["Workflow Analysis", "Tool Recommendations", "ROI Report", "No Obligation"],
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?q=80&w=1000&auto=format&fit=crop",
        isGoldenEligible: false
    }
];
