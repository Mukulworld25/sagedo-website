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
        name: "24/7 AI Voice & Chat Bots",
        category: "Business",
        description: "Your business never sleeps. Stop losing customers to missed calls.",
        fullDescription: "Stop losing customers purely because you couldn't pick up the phone. Our AI bots handle calls, answer queries, and book orders 24/7. It's like having a support team that runs on electricity, not coffee. They handle thousands of customers simultaneously without a single error.",
        whatYouGet: [
            "Custom-trained Voice & Chat AI",
            "WhatsApp & Website Integration",
            "Instant Lead Qualification",
            "24/7 Appointment Booking",
            "Zero Human Intervention Required"
        ],
        process: [
            "We analyze your support logs",
            "Train the AI on your specific data",
            "Integrate with your phone/site",
            "Go live with 24/7 monitoring"
        ],
        price: 19999,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop", // Abstract Tech / Neural Voice
        isGoldenEligible: true
    },
    {
        id: "2",
        name: "Workflow Automation",
        category: "Business",
        description: "Escape the daily grind. Stop copying and past data manually.",
        fullDescription: "You didn't start a business to become a data-entry clerk. We connect your apps (CRM, Email, WhatsApp) so leads move automatically. Imagine a new lead arriving and instantly getting a welcome email and a WhatsApp message without you lifting a finger. You save hours every single day.",
        whatYouGet: [
            "Complete Process Audit",
            "Custom API Connections (Zapier/Make)",
            "Auto-Email & SMS Setup",
            "Error-Free Data Transfer",
            "Training on how to manage it"
        ],
        process: [
            "Map your manual tasks",
            "Design the automation flow",
            "Build and stress-test",
            "Handover the keys"
        ],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Digital Pipeline / Data Flow
        isGoldenEligible: true
    },
    {
        id: "3",
        name: "AI Data Science Solution",
        category: "Business",
        description: "Turn messy data into profit. Know exactly what to sell.",
        fullDescription: "You have data everywhere—Excel sheets, bills, CRM logs—but what does it actually mean? We clean your messy data and build a live dashboard that tells you the truth about your business: 'Sell more of this, stop selling that.' No more guessing.",
        whatYouGet: [
            "Data Cleaning & Organization",
            "Predictive Sales Analysis",
            "Custom Live Dashboard",
            "Inventory Forecasting",
            "Customer Behavior Insights"
        ],
        process: [
            "Connect your data sources",
            "Clean and structure the data",
            "Build the visual models",
            "Deploy your command center"
        ],
        price: 24999,
        imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop", // Complex Data Vis
        isGoldenEligible: false
    },
    {
        id: "4",
        name: "Social Media Marketing Suite",
        category: "Business",
        description: "Be everywhere, effortlessly. 30 days of content done for you.",
        fullDescription: "Consistency is hard when you're running a business. We solve the burnout. We give you a 30-day content calendar, write your viral scripts, and even schedule the posts for you. You just show up and be the face of the brand.",
        whatYouGet: [
            "30-Day Content Calendar",
            "Viral Hook Scripting",
            "Hashtag & Trend Strategy",
            "Auto-Posting Schedule",
            "Engagement Analytics"
        ],
        process: [
            "Analyze your niche trends",
            "Plan the content pillars",
            "Script and schedule",
            "Launch and monitor"
        ],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", // Abstract Social Graph
        isGoldenEligible: true
    },
    {
        id: "5",
        name: "AI Professional Songs",
        category: "Business",
        description: "Give your brand a voice. Turn lyrics into studio-quality audio.",
        fullDescription: "Music sticks in the brain longer than text. We use advanced generative audio to turn your lyrics or brand message into a professional, studio-quality song. Perfect for ads, podcasts, or just making your brand absolutely unforgettable.",
        whatYouGet: [
            "Full Custom Composition",
            "Professional Vocals (AI Generated)",
            "Commercial Usage Rights",
            "High-Quality WAV Export",
            "Lyrics Assistance"
        ],
        process: [
            "Analyze brand vibe/genre",
            "Generate 3 melodic concepts",
            "Refine and master the winner",
            "Deliver final audio"
        ],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop", // Audio Waves
        isGoldenEligible: true
    },
    {
        id: "6",
        name: "Ads & Sales Roadmap",
        category: "Business",
        description: "Stop burning money on bad ads. Learn how to scale deeply.",
        fullDescription: "Most businesses waste thousands on ads that don't convert. We don't just make the creative; we give you the 'War Map'. A detailed roadmap on who to target, how to spend, and how to scale your sales without blowing your budget.",
        whatYouGet: [
            "High-Converting Ad Creatives",
            "Audience Targeting Strategy",
            "Budget Scaling Roadmap",
            "A/B Testing Plan",
            "ROI Calculator"
        ],
        process: [
            "Audit past ad performance",
            "Design the new campaign",
            "Build the scaling roadmap",
            "Handover for execution"
        ],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Strategic Map
        isGoldenEligible: false
    },
    {
        id: "7",
        name: "Startup Pitch Deck Design",
        category: "Business",
        description: "Tell a story that investors can't ignore.",
        fullDescription: "Investors see hundreds of decks. Yours needs to stand out. We take your raw numbers and transform them into a visually stunning, narrative-driven presentation that secures funding. Clear, impactful, and persuasive.",
        whatYouGet: [
            "10-15 Professional Slides",
            "Financial Data Visualization",
            "Compelling Narrative Arc",
            "Investor-Ready PDF/PPT",
            "Custom Graphics"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop", // Presentation / Growth
        isGoldenEligible: true
    },

    // ==========================================
    // 🚀 CAREER ASCENSION (Professional)
    // ==========================================
    {
        id: "8",
        name: "ATS Resume Optimization",
        category: "Professional",
        description: "Beat the screening robot that rejects you.",
        fullDescription: "Did you know 75% of resumes are rejected by software before a human ever sees them? We rewrite and format your resume to pass these ATS filters, ensuring your hard work actually gets seen by a hiring manager.",
        whatYouGet: [
            "ATS-Beat Formatting",
            "Keyword Injection Strategy",
            "Role-Specific Optimization",
            "Cover Letter Template",
            "LinkedIn Sync Guide"
        ],
        process: [
            "Scan your current resume",
            "Map skills to job descriptions",
            "Rebuild for ATS compliance",
            "Deliver final documents"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop", // Digital Document
        isGoldenEligible: true
    },
    {
        id: "9",
        name: "LinkedIn Profile Alpha",
        category: "Professional",
        description: "Attract recruiters, don't chase them.",
        fullDescription: "Stop applying to black holes. We overhaul your LinkedIn profile—headline, bio, and featured section—to scream 'Expert'. When recruiters search for your skills, you show up first.",
        whatYouGet: [
            "SEO-Optimized Headline",
            "Authority-Building Bio",
            "Featured Section Design",
            "Network Growth Script",
            "Profile Banner"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop", // Networking Nodes
        isGoldenEligible: true
    },
    {
        id: "10",
        name: "Personal Portfolio Website",
        category: "Professional",
        description: "Showcase your work professionally. Be a brand.",
        fullDescription: "Sending a PDF portfolio is outdated. We build you a sleek, high-speed personal website that showcases your best work. It's your digital homebase that builds instant trust with clients and employers.",
        whatYouGet: [
            "Modern One-Page Site",
            "Project Gallery Showcase",
            "Contact & Lead Form",
            "Mobile Responsive Design",
            "Domain Setup Support"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // Web Design / Code
        isGoldenEligible: true
    },
    {
        id: "11",
        name: "Job Application Auto-Fill",
        category: "Professional",
        description: "Apply to 50 jobs while you sleep.",
        fullDescription: "Filling out job applications is soul-crushing repetitive work. Our AI agent applies to jobs for you, customizing the answers for each specific form so you can focus on preparing for the interview, not typing your address 50 times.",
        whatYouGet: [
            "Automated Application Agent",
            "Custom Answer Generation",
            "Platform optimization (LinkedIn/Indeed)",
            "Daily Application Report",
            "Cover Letter Auto-Gen"
        ],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop", // Keyboard / Typing
        isGoldenEligible: false
    },
    {
        id: "12",
        name: "AI Mock Interview Pro",
        category: "Professional",
        description: "Practice until you are perfect. Fail here to win there.",
        fullDescription: "Nervous about the big interview? Get grilled by our AI interviewer first. It gives you harsh, honest feedback on your tone, confidence, and answer quality so you make your mistakes here, not in front of the hiring manager.",
        whatYouGet: [
            "Role-Specific Mock Session",
            "Speech & Tone Analysis",
            "Confidence Scoring",
            "Answer Improvement Tips",
            "Recording of Session"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1000&auto=format&fit=crop", // Microphone / Interview
        isGoldenEligible: true
    },

    // ==========================================
    // ❤️ LIFE ARCHITECT (Personal & Student)
    // ==========================================
    {
        id: "13",
        name: "Academic Research Assistant",
        category: "Student",
        description: "Write better papers, faster. Sources included.",
        fullDescription: "Writing is easy when the research is done. We find credible sources, summarize the key arguments, and generate proper citations for you. You just have to put it together. Save days of reading time.",
        whatYouGet: [
            "Deep Topic Research",
            "Credible Source List",
            "Key Argument Summary",
            "Citation Generator (APA/MLA)",
            "Outline Structure"
        ],
        process: [
            "Define your topic",
            "AI scans journals/web",
            "Compile structured report",
            "Deliver for writing"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop", // Books / Research
        isGoldenEligible: true
    },
    {
        id: "14",
        name: "Personal Finance Tracker",
        category: "Personal",
        description: "Control your money. Stop wondering where it went.",
        fullDescription: "A simple, automated system to track every rupee you earn and spend. visualizes your financial health so you can see exactly where your salary is going and how much you can save for that trip or bike.",
        whatYouGet: [
            "Automated Expense Sheet",
            "Category Breakdown",
            "Savings Goal Tracker",
            "Monthly Budget Plan",
            "Mobile Access"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop", // Coin Stack / Growth
        isGoldenEligible: true
    },
    {
        id: "15",
        name: "Reel Combo Set (10 Pack)",
        category: "Personal",
        description: "Instant content library. 10 viral edits done for you.",
        fullDescription: "Growing a page takes consistency, but editing is boring. We give you 10 professionally edited Reels complete with captions, trending music, and cuts. You just have to hit 'Post'.",
        whatYouGet: [
            "10 Edited Reel Videos",
            "Trending Audio Selection",
            "Dynamic Captions",
            "Viral Hook Editing",
            "Thumbnail Suggestions"
        ],
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop", // Mobile Video
        isGoldenEligible: true
    },
    {
        id: "16",
        name: "Viral Shorts Pack (10 Pack)",
        category: "Personal",
        description: "Dominate YouTube Shorts. Explosive reach.",
        fullDescription: "YouTube Shorts is the biggest organic opportunity right now. We create 10 high-retention shorts optimized specifically for the YouTube algorithm to help your channel blow up.",
        whatYouGet: [
            "10 High-Retention Shorts",
            "YouTube-Specific SEO",
            "Looping Visuals",
            "Engagement Call-to-Actions",
            "Posting Guide"
        ],
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop", // Play Button
        isGoldenEligible: false
    },
    {
        id: "17",
        name: "AI Avatar Clone",
        category: "Personal",
        description: "Create video content without being on camera.",
        fullDescription: "Camera shy? Or just busy? We create a realistic AI avatar of you (or a brand character) that speaks your script perfectly. Produce endless video content without ever setting up a ring light.",
        whatYouGet: [
            "Custom AI Face Model",
            "Voice Cloning Setup",
            "Lip-Sync Technology",
            "First 5 Minutes of Video",
            "Background Customization"
        ],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000&auto=format&fit=crop", // 3D Face Mesh
        isGoldenEligible: true
    },
    {
        id: "0",
        name: "Free AI Consultation",
        category: "All",
        description: "Confused? Let's chat. We solve your problem for free.",
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
        imageUrl: "https://images.unsplash.com/photo-1639322537228-ad7117a394eb?q=80&w=1000&auto=format&fit=crop", // Question / Support
        isGoldenEligible: false
    }
];
