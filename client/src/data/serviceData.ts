// Extended service data with full descriptions, what you get, and process
// Based on SAGEDO's unique AI + Human approach
// UPDATED: New pricing tiers based on India market research (Dec 2024)
// BAR 1 (₹100-500): Simple tasks, 24-48 hours
// BAR 2 (₹500-5000): Standard tasks, 2-5 days
// BAR 3 (₹5000-15000): Premium/complex projects, 5-15 days

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
    // BUSINESS CATEGORY (12 services)
    // =====================
    {
        id: "1",
        name: "Content Writing & Ad Copy",
        category: "Business",
        description: "Engaging content for ads, social media, and marketing campaigns",
        fullDescription: "Get professionally crafted content that converts. Whether it's Facebook ads, Instagram captions, or Google Ads - we create compelling copy that speaks to your audience. Our AI analyzes your brand voice and target market, then our expert team refines it to perfection.",
        whatYouGet: [
            "1 ready-to-post ad copy (text content)",
            "2 headline variations for A/B testing",
            "Tailored for your chosen platform (Facebook/Instagram/Google)",
            "1 revision round included"
        ],
        process: [
            "Share your product/service details and target audience",
            "AI generates multiple ad copy variations",
            "Our team selects and refines the best option",
            "You receive the final copy via email/dashboard"
        ],
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "2",
        name: "Marketing Email Template",
        category: "Business",
        description: "Professional email templates for campaigns that convert",
        fullDescription: "Stop sending boring emails that get ignored. We create scroll-stopping email templates that your subscribers actually want to read. From welcome sequences to promotional campaigns - get emails that boost your open rates and drive action.",
        whatYouGet: [
            "1 complete email template (HTML + plain text)",
            "3 subject line options",
            "Mobile-responsive design",
            "Copy-paste ready for any email platform",
            "1 revision round included"
        ],
        process: [
            "Tell us your campaign goal and audience",
            "We design and write the email content",
            "You review and request any changes",
            "Get final template ready to send"
        ],
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "3",
        name: "Brand Name Ideas (5 Options)",
        category: "Business",
        description: "Creative and catchy product/brand names for your business",
        fullDescription: "Naming your product or brand is hard. We make it easy. Get 5 unique, memorable name ideas that capture your brand essence. Each name is checked for basic availability and comes with reasoning on why it works.",
        whatYouGet: [
            "5 unique name suggestions",
            "Domain availability check for each name (.com)",
            "Brief explanation of each name's appeal",
            "Social media handle availability check"
        ],
        process: [
            "Share your brand vision and target market",
            "AI generates 20+ name options",
            "Our team curates the top 5 with availability checks",
            "You pick your favorite and go!"
        ],
        price: 399,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "4",
        name: "SEO Blog Article (1500 words)",
        category: "Business",
        description: "SEO-optimized blog post to boost your website traffic",
        fullDescription: "Get found on Google! We write SEO-optimized blog articles that rank. Research-backed, keyword-targeted content that drives organic traffic. Perfect for businesses wanting to build authority and attract customers through content marketing.",
        whatYouGet: [
            "1500-word SEO blog article",
            "Keyword research and optimization",
            "Meta title and description",
            "Internal linking suggestions",
            "Royalty-free images included",
            "1 revision round included"
        ],
        process: [
            "Share your topic and target keywords",
            "We research and outline the article",
            "Write SEO-optimized content",
            "Deliver ready-to-publish article"
        ],
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "5",
        name: "Landing Page Blueprint",
        category: "Business",
        description: "Complete landing page structure and content outline",
        fullDescription: "Want a high-converting landing page but don't know where to start? We create a detailed blueprint with all sections, headlines, bullet points, and CTAs. Just hand it to any designer and they'll know exactly what to build.",
        whatYouGet: [
            "Complete section-by-section outline",
            "Headline and subheadline suggestions",
            "Bullet points for each section",
            "CTA (Call-to-Action) recommendations",
            "Reference layout wireframe (PDF)"
        ],
        process: [
            "Share your product/service and goal",
            "We analyze your competitors and audience",
            "Create complete page structure with copy suggestions",
            "Deliver blueprint ready for your designer"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "6",
        name: "Ad Copy Package (5 Pieces)",
        category: "Business",
        description: "Professional ad copy service for various platforms",
        fullDescription: "Running multiple campaigns? Get professional ad copy service for 5 distinct ads. Perfect for businesses who want variety in their messaging. Each copy is tailored to convert.",
        whatYouGet: [
            "5 unique ad copies",
            "Mix of platforms (Facebook, Instagram, Google)",
            "Different angles for testing",
            "Headline + body text for each",
            "1 revision round per copy"
        ],
        process: [
            "Share your products and campaign goals",
            "We create 5 distinct ad approaches",
            "You review and request any tweaks",
            "Launch your campaigns!"
        ],
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "7",
        name: "AI Business Consultation Call",
        category: "Business",
        description: "45-min strategy call for any business problem solvable by AI",
        fullDescription: "Got a business challenge? Let's solve it together. Book a 45-minute call where we analyze your problem and provide AI-powered solutions. From marketing strategy to process optimization - get actionable advice you can implement immediately.",
        whatYouGet: [
            "45-minute video call",
            "Problem analysis and solution brainstorming",
            "Action plan summary (PDF)",
            "3 follow-up questions via email",
            "Tool/resource recommendations"
        ],
        process: [
            "Book your preferred time slot",
            "Share your challenge beforehand",
            "We prepare relevant solutions",
            "Call + follow-up action plan delivered"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "8",
        name: "Data Solutions & Dashboards",
        category: "Business",
        description: "Data visualization, cleaning, dashboards, reports, and analysis",
        fullDescription: "Drowning in data but starving for insights? We transform your messy data into beautiful visualizations, interactive dashboards, and actionable reports. From Excel cleanup to live business dashboards - we make your data work for you.",
        whatYouGet: [
            "Data cleaning and organization",
            "Interactive dashboard OR detailed report",
            "Data visualization charts",
            "Insights summary document",
            "Source files (Excel/Google Sheets/PDF)"
        ],
        process: [
            "Share your raw data and goals",
            "We analyze and clean your data",
            "Build dashboard/report with visualizations",
            "Deliver with explanation of key insights"
        ],
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "9",
        name: "Marketing Visual Content",
        category: "Business",
        description: "Videos, photos, posters, brochures, banners for marketing",
        fullDescription: "Need eye-catching visuals for your marketing? We create professional videos, edited photos, posters, brochures, pamphlets, and social media banners. Perfect for ads, social media, and print materials.",
        whatYouGet: [
            "1 primary visual asset (video/poster/banner)",
            "Optimized for your chosen platform",
            "High-resolution files",
            "Multiple format exports if needed",
            "1 revision round included"
        ],
        process: [
            "Share your vision and brand assets",
            "We create initial design/edit",
            "You review and provide feedback",
            "Final delivery in all needed formats"
        ],
        price: 599,
        imageUrl: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "10",
        name: "Complete Website (5 Pages)",
        category: "Business",
        description: "Full website with 5 pages and responsive design",
        fullDescription: "Get a complete, professional website without the hassle. We build 5 fully designed pages that work beautifully on all devices. Perfect for startups, portfolios, or small businesses who need an online presence fast.",
        whatYouGet: [
            "5 custom-designed pages (Home, About, Services, Contact, +1 more)",
            "Mobile-responsive design",
            "Basic SEO setup",
            "Contact form integration",
            "Social media links",
            "2 revision rounds included"
        ],
        process: [
            "Share your brand assets and content",
            "We create design mockups for approval",
            "Build and test the full website",
            "You review, we refine, and launch!"
        ],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "11",
        name: "Business Automation Setup",
        category: "Business",
        description: "Custom automation for email, social media, leads, and more",
        fullDescription: "Stop doing repetitive tasks manually! We set up automation for your business - email sequences, lead capture, social media posting, CRM updates, and more. Using tools like Zapier, Make, or custom scripts, we eliminate your daily grind.",
        whatYouGet: [
            "Custom automation workflow design",
            "Full setup and configuration",
            "Integration with your existing tools",
            "Documentation on how it works",
            "1 week of support for troubleshooting"
        ],
        process: [
            "30-min call to understand your current processes",
            "We design the automation workflow",
            "Build and test the complete system",
            "Handover with training documentation"
        ],
        price: 12999,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "12",
        name: "Complete Branding Package",
        category: "Business",
        description: "Full brand identity with logo, colors, fonts, and guidelines",
        fullDescription: "Launch your brand with a complete identity. We create your logo, color palette, typography, and brand guidelines. Everything you need to look professional and consistent across all platforms.",
        whatYouGet: [
            "Logo design (3 concepts, 1 final)",
            "Color palette with codes",
            "Typography selection",
            "Brand guidelines document",
            "Social media profile assets",
            "Business card design",
            "3 revision rounds included"
        ],
        process: [
            "Discovery call to understand your vision",
            "We create initial logo concepts",
            "Develop full brand identity",
            "Deliver complete brand package"
        ],
        price: 14999,
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },

    // =====================
    // STUDENT CATEGORY (8 services)
    // =====================
    {
        id: "13",
        name: "Research Paper Outline",
        category: "Student",
        description: "Structured research paper outline with sources",
        fullDescription: "Starting a research paper is the hardest part. We create a complete outline with suggested structure, key points for each section, and relevant source recommendations. Just fill in the blanks and write!",
        whatYouGet: [
            "Complete paper structure (intro, body, conclusion)",
            "Section-by-section content suggestions",
            "5-10 relevant source recommendations",
            "Thesis statement suggestions",
            "Word count guidance"
        ],
        process: [
            "Share your topic and requirements",
            "We research and structure your paper",
            "Create outline with source suggestions",
            "Deliver ready-to-write framework"
        ],
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "14",
        name: "Presentation Outline (15 slides)",
        category: "Student",
        description: "Professional presentation structure and content plan",
        fullDescription: "Dreading that presentation? We create a slide-by-slide outline with suggested content, talking points, and visual ideas. You just need to add your final words and design touches.",
        whatYouGet: [
            "15-slide structure with titles",
            "Content bullets for each slide",
            "Speaker notes/talking points",
            "Suggested visual elements",
            "Flow and transition recommendations"
        ],
        process: [
            "Share your topic and time limit",
            "We structure and plan each slide",
            "Create content suggestions and flow",
            "Deliver outline ready for design"
        ],
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "15",
        name: "Photo Editing Service (5 Photos)",
        category: "Student",
        description: "Professional photo editing service for projects",
        fullDescription: "Need polished photos for your project or presentation? We edit 5 photos with professional quality - color correction, background removal, touch-ups, and more. Make your visual content stand out.",
        whatYouGet: [
            "5 professionally edited photos",
            "Color correction and enhancement",
            "Basic retouching",
            "Background removal/change if needed",
            "Multiple format exports (JPG, PNG)"
        ],
        process: [
            "Upload your 5 photos",
            "Tell us what edits you need",
            "We edit and enhance each photo",
            "Deliver edited files"
        ],
        price: 399,
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "16",
        name: "Exam Study Notes",
        category: "Student",
        description: "Comprehensive study notes for exam preparation",
        fullDescription: "Exams coming up? We create concise, comprehensive study notes that cover all key topics. Easy to read, easy to remember. Perfect for last-minute revision or structured study.",
        whatYouGet: [
            "Comprehensive notes covering all topics",
            "Key points and concepts highlighted",
            "Easy-to-scan format",
            "Practice questions included",
            "PDF and Word format"
        ],
        process: [
            "Share your syllabus/topics",
            "We compile and organize key information",
            "Create easy-to-study notes",
            "Deliver in preferred format"
        ],
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "17",
        name: "Complete Presentation Design",
        category: "Student",
        description: "Fully designed PPT with content, graphics, and animations",
        fullDescription: "Get a ready-to-present PowerPoint that wows your audience. We handle everything - content writing, design, graphics, and animations. You just need to present. Personalized to your topic and style.",
        whatYouGet: [
            "15-20 slide complete presentation",
            "Professional design and graphics",
            "Content written for each slide",
            "Subtle animations and transitions",
            "Editable PPTX file",
            "2 revision rounds included"
        ],
        process: [
            "Share your topic and requirements",
            "We research and write content",
            "Design slides with professional graphics",
            "Add animations and deliver final PPT"
        ],
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "18",
        name: "Assignment Writing (Complete)",
        category: "Student",
        description: "Fully personalized assignment writing and formatting",
        fullDescription: "Overwhelmed with assignments? We write complete, personalized assignments in your required format. Research, writing, citations, formatting - everything handled. Just share the topic and requirements.",
        whatYouGet: [
            "Complete assignment (as per word count)",
            "Proper citations and references",
            "Formatted as per guidelines",
            "Plagiarism check included",
            "1 revision round included"
        ],
        process: [
            "Share topic, guidelines, and deadline",
            "We research and write the assignment",
            "Format and add proper citations",
            "Deliver with plagiarism report"
        ],
        price: 599,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false,
        deliveryTime: "2-3 days"
    },
    {
        id: "19",
        name: "Essay Writing (1500 words)",
        category: "Student",
        description: "Well-researched essays on any topic",
        fullDescription: "Need a well-crafted essay? We write engaging, well-researched essays up to 1500 words on any topic. Perfect for class assignments, college applications, or competitions.",
        whatYouGet: [
            "1500-word essay (or as specified)",
            "Proper introduction, body, conclusion",
            "Research and citations included",
            "Proofread and polished",
            "1 revision round included"
        ],
        process: [
            "Share your essay topic and guidelines",
            "We research and outline",
            "Write and refine the essay",
            "Deliver proofread final version"
        ],
        price: 699,
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "20",
        name: "Thesis/Dissertation Assistance",
        category: "Student",
        description: "Help with thesis structure, research, and writing",
        fullDescription: "Thesis giving you sleepless nights? We provide comprehensive assistance - from topic selection to final editing. Research methodology, literature review, chapters - we help you through every step.",
        whatYouGet: [
            "Thesis structure and outline",
            "Literature review assistance",
            "Research methodology guidance",
            "Chapter-by-chapter writing support",
            "Formatting and citations",
            "Multiple revision rounds"
        ],
        process: [
            "Initial consultation about your topic",
            "We create detailed thesis plan",
            "Assist with each chapter",
            "Final review and formatting"
        ],
        price: 9999,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },

    // =====================
    // PROFESSIONAL CATEGORY (10 services)
    // =====================
    {
        id: "21",
        name: "Resume Optimization (ATS-Friendly)",
        category: "Professional",
        description: "Make your resume ATS-friendly and recruiter-ready",
        fullDescription: "Your resume might be getting rejected by ATS before a human even sees it. We optimize your resume to pass ATS screening while keeping it natural and compelling for recruiters. Get more interview calls.",
        whatYouGet: [
            "ATS-optimized resume (Word + PDF)",
            "Keyword optimization for your target roles",
            "Professional formatting",
            "Natural, engaging language",
            "1 revision round included"
        ],
        process: [
            "Share your current resume and target roles",
            "We analyze and optimize for ATS",
            "Rewrite sections for impact",
            "Deliver polished, job-ready resume"
        ],
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "22",
        name: "LinkedIn Profile Summary",
        category: "Professional",
        description: "Compelling LinkedIn bio and headline that gets you noticed",
        fullDescription: "Your LinkedIn is your digital first impression. We craft a compelling 'About' section and headline that showcases your value and attracts the right opportunities. Stand out in a sea of profiles.",
        whatYouGet: [
            "300-word 'About' section",
            "Attention-grabbing headline",
            "Keyword optimization for search",
            "Profile tips for better visibility",
            "1 revision round included"
        ],
        process: [
            "Share your current profile and goals",
            "We analyze your industry and audience",
            "Craft compelling copy",
            "Deliver with implementation tips"
        ],
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "23",
        name: "Tailored Cover Letter",
        category: "Professional",
        description: "Custom cover letter for specific job applications",
        fullDescription: "A generic cover letter won't cut it. We write personalized cover letters tailored to specific jobs, highlighting why you're the perfect fit. Increase your callback rate with every application.",
        whatYouGet: [
            "Custom cover letter (Word + PDF)",
            "Tailored to specific job posting",
            "Highlights relevant achievements",
            "Professional formatting",
            "1 revision round included"
        ],
        process: [
            "Share job posting and your resume",
            "We analyze requirements and your fit",
            "Write tailored cover letter",
            "Deliver ready-to-submit version"
        ],
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "24",
        name: "Professional Email Writing",
        category: "Professional",
        description: "Business email writing and templates",
        fullDescription: "Struggling with professional emails? We write or template any business email - follow-ups, introductions, negotiations, requests. Sound professional every time.",
        whatYouGet: [
            "1 professionally written email",
            "Subject line options",
            "Appropriate tone and formatting",
            "Template for future use",
            "1 revision round included"
        ],
        process: [
            "Share context and goal of email",
            "We draft the email",
            "You review and suggest changes",
            "Final version delivered"
        ],
        price: 149,
        imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "25",
        name: "Interview Preparation Guide",
        category: "Professional",
        description: "Comprehensive interview prep material for your target role",
        fullDescription: "Walk into your interview with confidence. We create a customized prep guide with common questions, best answers, company research, and tips specific to your target role and company.",
        whatYouGet: [
            "20+ potential interview questions",
            "Suggested answers tailored to your background",
            "Company research summary",
            "Questions to ask the interviewer",
            "Body language and presentation tips"
        ],
        process: [
            "Share job details and your resume",
            "We research company and role",
            "Create comprehensive prep guide",
            "Deliver ready-to-study material"
        ],
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "26",
        name: "Complete LinkedIn Makeover",
        category: "Professional",
        description: "Full profile rewrite with copy-paste document",
        fullDescription: "Get a complete LinkedIn transformation. We rewrite every section - headline, about, experience, skills - with a ready-to-paste document. If you don't approve a suggestion, we provide alternatives. Your profile, perfected.",
        whatYouGet: [
            "Complete profile rewrite document",
            "Headline, About, Experience sections",
            "Skills and endorsement strategy",
            "Content posting tips",
            "Copy-paste ready format",
            "1 revision round included"
        ],
        process: [
            "Share current profile and goals",
            "We analyze and rewrite everything",
            "Create copy-paste document",
            "You implement + we verify"
        ],
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false,
        deliveryTime: "2-3 days"
    },
    {
        id: "27",
        name: "Professional Portfolio Website",
        category: "Professional",
        description: "Personal portfolio website to showcase your work",
        fullDescription: "Show off your work with a stunning portfolio website. We design and build a professional site that highlights your skills, projects, and achievements. Perfect for freelancers, designers, and professionals.",
        whatYouGet: [
            "Custom portfolio website (3-5 pages)",
            "Mobile-responsive design",
            "Project/work showcase section",
            "Contact form",
            "Basic SEO setup",
            "2 revision rounds included"
        ],
        process: [
            "Share your work and preferences",
            "We design mockups for approval",
            "Build the complete website",
            "Launch and handover"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "28",
        name: "Complete Job Hunt Package",
        category: "Professional",
        description: "Full automation: job search, resume tailoring, applications",
        fullDescription: "The complete job hunting solution. We create your master resume, tailor it for specific jobs, set up job search automation, and select opportunities for your approval. You just approve and apply. Less hustle, more offers.",
        whatYouGet: [
            "Master resume (ATS-optimized)",
            "5 job-specific resume variations",
            "Cover letter template",
            "Job search automation setup",
            "Weekly job recommendations for approval",
            "Interview prep guide"
        ],
        process: [
            "Initial call to understand your goals",
            "Create master resume and materials",
            "Set up automated job search",
            "Weekly curated opportunities + tailored applications"
        ],
        price: 7999,
        imageUrl: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "29",
        name: "Freelance Business Setup",
        category: "Professional",
        description: "Complete setup for starting your freelance business",
        fullDescription: "Ready to go freelance? We help you set up everything - portfolio, pricing, proposals, contracts, invoicing templates. Launch your freelance career with professional foundations.",
        whatYouGet: [
            "Freelance portfolio (website or PDF)",
            "Service pricing guide",
            "Proposal and contract templates",
            "Invoice templates",
            "Client onboarding process",
            "Tips for finding clients"
        ],
        process: [
            "Consultation about your skills and goals",
            "We create all business documents",
            "Build portfolio or profile",
            "Handover with launch strategy"
        ],
        price: 6999,
        imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "30",
        name: "Executive Bio & PR Package",
        category: "Professional",
        description: "Professional biography and media kit for executives",
        fullDescription: "Position yourself as a thought leader. We create a powerful executive biography, speaker profile, and media kit. Perfect for executives, entrepreneurs, and professionals building their personal brand.",
        whatYouGet: [
            "Executive biography (short, medium, long versions)",
            "Speaker profile/one-pager",
            "Media kit with key facts",
            "Social media bios",
            "Professional headshot recommendations",
            "2 revision rounds included"
        ],
        process: [
            "In-depth interview about your journey",
            "Research your industry positioning",
            "Write compelling narrative",
            "Deliver complete bio package"
        ],
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },

    // =====================
    // PERSONAL CATEGORY (8 services)
    // =====================
    {
        id: "31",
        name: "Complete Reel Script",
        category: "Personal",
        description: "Full script with hook, content, captions, and hashtags",
        fullDescription: "Go viral with the perfect reel! We create complete scripts with attention-grabbing hooks, engaging content, captions, and trending hashtags. Everything you need to create a scroll-stopping reel.",
        whatYouGet: [
            "Complete script with dialogue",
            "Hook and CTA suggestions",
            "Instagram/YouTube caption",
            "30 relevant hashtags",
            "Posting time recommendations"
        ],
        process: [
            "Share your topic or niche",
            "We research trending formats",
            "Write complete script package",
            "Deliver ready-to-shoot content"
        ],
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "32",
        name: "Personalized Monthly Diet Plan",
        category: "Personal",
        description: "Super personalized diet and nutrition plan for 30 days",
        fullDescription: "No generic diet charts here. We create a fully personalized 30-day diet plan based on your health goals, food preferences, allergies, and lifestyle. Realistic, sustainable, and made for YOU.",
        whatYouGet: [
            "30-day meal plan",
            "Breakfast, lunch, dinner, and snacks",
            "Calorie and macro breakdown",
            "Grocery shopping list",
            "Prep tips and recipes",
            "1 revision round included"
        ],
        process: [
            "Fill out health questionnaire",
            "We analyze your needs and preferences",
            "Create personalized 30-day plan",
            "Deliver with support for execution"
        ],
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "33",
        name: "Photo Editing (5 Photos)",
        category: "Personal",
        description: "Professional photo editing for social media",
        fullDescription: "Make your photos Instagram-worthy! We edit 5 photos with professional quality - filters, color grading, retouching, and enhancements. Perfect for influencers and anyone who wants stunning visuals.",
        whatYouGet: [
            "5 professionally edited photos",
            "Color grading and enhancement",
            "Skin retouching (natural look)",
            "Background enhancements",
            "Multiple format exports"
        ],
        process: [
            "Upload your photos",
            "Share editing preferences/examples",
            "We edit each photo",
            "Deliver enhanced images"
        ],
        price: 399,
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "34",
        name: "Social Media Content Calendar",
        category: "Personal",
        description: "Content calendar with captions and hashtags for the month",
        fullDescription: "Never run out of content ideas again! We create a full month's content calendar with post ideas, captions, hashtags, and posting schedule. Perfect for creators and small businesses.",
        whatYouGet: [
            "30-day content calendar",
            "Post ideas for each day",
            "Ready-to-use captions",
            "Hashtag sets for each post",
            "Best posting times",
            "Content mix strategy"
        ],
        process: [
            "Share your niche and goals",
            "We research trending content",
            "Create complete monthly calendar",
            "Deliver with posting strategy"
        ],
        price: 599,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "35",
        name: "AI Video Editing (Short Form)",
        category: "Personal",
        description: "Professional editing for Reels, Shorts, and TikToks",
        fullDescription: "Transform your raw footage into viral-worthy content. We use AI-powered editing for captions, effects, transitions, and music. Perfect for content creators who want professional results fast.",
        whatYouGet: [
            "1 edited short video (15-60 seconds)",
            "Auto-captions with styling",
            "Trending transitions and effects",
            "Music/sound selection",
            "Platform-optimized export",
            "1 revision round included"
        ],
        process: [
            "Upload your raw footage",
            "Share style preferences",
            "We edit with AI tools + human touch",
            "Deliver ready-to-post video"
        ],
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: true
    },
    {
        id: "36",
        name: "Social Media Video Creation",
        category: "Personal",
        description: "Complete video creation for social media",
        fullDescription: "Need professional videos for your social media? We create engaging content for Reels, YouTube Shorts, Stories, and posts. From concept to final edit - we handle everything.",
        whatYouGet: [
            "1 edited video (up to 2 minutes)",
            "Captions and subtitles",
            "Platform-optimized format",
            "Thumbnail design",
            "2 revision rounds included"
        ],
        process: [
            "Share your content and vision",
            "We create concept and script",
            "Edit and produce final video",
            "Deliver ready-to-post content"
        ],
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "37",
        name: "Influencer Media Kit",
        category: "Personal",
        description: "Professional media kit to attract brand collaborations",
        fullDescription: "Get more brand deals with a professional media kit. We create a stunning PDF that showcases your stats, audience demographics, past collaborations, and rates. Look professional, get paid more.",
        whatYouGet: [
            "Multi-page media kit PDF",
            "Professional design",
            "Stats and demographics visualization",
            "Collaboration showcase",
            "Rate card section",
            "1 revision round included"
        ],
        process: [
            "Share your social stats and info",
            "We design professional layout",
            "Add all your information",
            "Deliver ready-to-send kit"
        ],
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    },
    {
        id: "38",
        name: "Personal AI Assistant Setup",
        category: "Personal",
        description: "Custom ChatGPT/AI assistant tailored to your needs",
        fullDescription: "Get your own personalized AI assistant! We create custom GPT configurations, prompts, and workflows tailored to your specific needs - content creation, research, scheduling, or any daily task.",
        whatYouGet: [
            "Custom AI prompt library (20+ prompts)",
            "Personalized GPT configuration",
            "Workflow automation suggestions",
            "Training on how to use effectively",
            "1-week support for questions"
        ],
        process: [
            "Consultation about your needs",
            "We create custom prompts and configs",
            "Test and refine for your use case",
            "Training session + handover"
        ],
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80",
        isGoldenEligible: false
    }
];
