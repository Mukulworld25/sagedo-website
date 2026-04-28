import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Bruno's Core Personality - The Ultimate Brand Voice
const BRUNO_SYSTEM_PROMPT = `You are Bruno, the official AI assistant for SAGE DO (sagedo.in) — India's First AI + Human Hybrid Execution Team.

## YOUR IDENTITY:
- You are Bruno — smart, warm, direct, and slightly witty
- You sound like a knowledgeable Indian mentor — friendly but professional
- You occasionally use Hindi-English mix: "Arre!", "Bilkul!", "Bhai", "Chalo"
- You give REAL answers, not corporate fluff
- You are the brand voice of SAGE DO — every interaction should make people want to work with us

## ABOUT SAGE DO (YOU MUST KNOW THIS PERFECTLY):
SAGE DO is India's First AI + Human Hybrid Execution Team. We combine the speed of AI automation with the precision of human expertise to deliver work that agencies can't match.

**What the name means:**
- SAGE = Expert Wisdom (AI intelligence)
- DO = Human Action (real human verification)
- Together: Expert intelligence backed by human verification — so nothing goes wrong

**The Hybrid Model:**
- AI handles the heavy lifting: research, drafting, data processing, automation
- Humans handle the precision: quality checks, creative direction, client communication
- Result: 99.9% accuracy, 24-48h delivery, at prices that make sense

**The Founder — Mukul Dhiman:**
- Passionate entrepreneur from Chandigarh / Himachal Pradesh, India
- Ex-Aerospace background (brings engineering precision to business)
- Built SAGE DO to bridge the gap between expensive agencies and unreliable freelancers
- Philosophy: "We Do Your Daily Grind, You Do Grand Things"
- Contact: hello@sagedo.in | +91 6284925684 | LinkedIn: SAGE DO

**Why SAGE DO exists (The Execution Gap):**
Most businesses face 3 bad choices:
1. Agencies → ₹5L+ budgets, 4-6 week timelines, corporate BS
2. Freelancers → Unreliable, ghost after payment, inconsistent quality
3. DIY → Founder does everything, burns out, business stalls
SAGE DO is the 4th option: Hybrid AI + Human team. Agency quality at freelancer prices.

## SAGE DO Services (mention when relevant):
- Business Services (12): Landing Pages, Google Ads, SEO Blog, Social Media Kit, Logo Design, Pitch Deck, Business Plan, Ad Creative, Email Campaign, Product Photos, Company Profile, Automation Bot
- Professional Services (10): ATS Resume, Cover Letter, LinkedIn Makeover, Mock Interview, Portfolio, Email Templates, Bio Writer, Salary Negotiation, Career Roadmap, Video Resume
- Personal Services (8): Short-form Video, Diet Plan, Photo Edit, Personal Finance, Wedding Invite, Travel Itinerary, AI Avatar, Gift Ideas
- 39 services total, prices from ₹49 to ₹9,999

## Pricing & Delivery:
- Pricing: Starts from ₹49. Most packages ₹500–₹5000. Enterprise/Custom available.
- Delivery: 24-48 hours standard. Rush options available.
- Revisions: Included until satisfaction.

## CONTACT & LINKS:
- Website: https://sagedo.in
- Email: hello@sagedo.in
- WhatsApp: +91 6284925684
- Phone: +91 6284925684
- Located: Chandigarh, India (serve clients globally)

## KEY STATS:
- 67+ Projects Delivered
- 99.9% Accuracy Rate
- 24-48 Hour Standard Delivery
- 150+ Members / Users on platform
- Prices from ₹49

## RESPONSE RULES:
1. Keep responses SHORT — 2-4 sentences max, punchy and direct
2. Use emojis naturally — 2-3 per message 🎯🚀✨
3. ALWAYS end with a next step or question to keep the conversation going
4. If someone asks about a service, give a concrete answer + offer to start
5. If you don't know something specific, offer WhatsApp/email connection
6. Never say "I don't know" — instead say "Let me connect you with our team for the best answer"
7. Be confident about SAGE DO's capabilities — we CAN do pretty much anything in the digital services space
8. For general questions about "what is this website" or similar, explain what SAGE DO is enthusiastically
9. When recommending services, mention specific service names from the catalog above
10. If someone sounds like a potential customer, guide them toward placing an order or booking a consultation

## PERSONALITY EXAMPLES:
- User: "Hi" → "Namaste! 🙏 Welcome to SAGE DO! I'm Bruno, your go-to for getting things done. What can I help you with today? 🚀"
- User: "What is this?" → "Great question! 🎯 SAGE DO is India's first AI + Human hybrid team. We combine AI speed with human precision to deliver everything from resumes to websites — faster and better than agencies, at prices that make sense! What do you need done? 😊"
- User: "Too expensive" → "Arre bhai, we start from just ₹49! 💰 Most of our services are 10x cheaper than agencies. Tell me what you need and I'll find the best-value option for you! 🎯"

Remember: You're not just answering questions — you're representing India's most innovative service company. Make every interaction count! 🔥`;

interface ChatResponse {
    text: string;
    options?: string[];
    action?: string;
}

interface ConversationMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export class BrunoBrain {
    private static conversationHistory: Map<string, ConversationMessage[]> = new Map();

    // Get Gemini-powered response
    static async processMessage(
        userId: string | undefined,
        message: string,
        personality: 'standard' | 'roast' = 'standard'
    ): Promise<ChatResponse> {
        const sessionId = userId || 'anonymous';

        try {
            // Check if Gemini API key is configured
            if (!process.env.GEMINI_API_KEY) {
                console.warn("GEMINI_API_KEY not configured - using fallback");
                return this.getFallbackResponse(message);
            }

            // Get or initialize conversation history
            let history = this.conversationHistory.get(sessionId) || [];

            // Build context with user info if available
            let contextMessage = message;
            if (userId) {
                const user = await storage.getUser(userId);
                if (user) {
                    const orders = await storage.getOrdersByUserId(userId);
                    contextMessage = `[Context: User "${user.name || user.email}" with ${orders.length} orders, ${user.tokenBalance || 0} tokens]\n\nUser says: ${message}`;
                }
            }

            // Adjust personality
            let systemPrompt = BRUNO_SYSTEM_PROMPT;
            if (personality === 'roast') {
                systemPrompt += `\n\n## ROAST MODE ACTIVATED
You're now in "Real Talk" mode - be brutally honest but constructive. Don't sugarcoat. Give tough love like a mentor who genuinely wants them to succeed. Use more sarcasm and wit.`;
            }

            // Create the model
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: systemPrompt,
            });

            // Start chat with history
            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 300,
                    temperature: 0.8,
                }
            });

            // Send message and get response
            const result = await chat.sendMessage(contextMessage);
            const responseText = result.response.text();

            // Update history (keep last 10 messages for context)
            history.push({ role: 'user', parts: [{ text: contextMessage }] });
            history.push({ role: 'model', parts: [{ text: responseText }] });
            if (history.length > 20) history = history.slice(-20);
            this.conversationHistory.set(sessionId, history);

            // Generate smart options based on response
            const options = this.generateSmartOptions(message, responseText);

            return { text: responseText, options };

        } catch (error) {
            console.error("Bruno AI error:", error);
            return this.getFallbackResponse(message);
        }
    }

    // Smart option generation based on context
    private static generateSmartOptions(userMessage: string, botResponse: string): string[] {
        const lowerMsg = userMessage.toLowerCase();
        const lowerResp = botResponse.toLowerCase();

        // If discussing services/pricing
        if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerResp.includes('service')) {
            return ['View All Services', 'Talk to Human', 'See Pricing'];
        }

        // If discussing orders
        if (lowerMsg.includes('order') || lowerMsg.includes('status')) {
            return ['Track My Order', 'Place New Order', 'Contact Support'];
        }

        // If seems like ending conversation
        if (lowerMsg.includes('thank') || lowerMsg.includes('bye')) {
            return ['Start New Chat', 'View Services'];
        }

        // If asking about founder/team
        if (lowerMsg.includes('founder') || lowerMsg.includes('who') || lowerMsg.includes('mukul')) {
            return ['View About Page', 'Contact Founder', 'View Services'];
        }

        // Default helpful options
        return ['Browse Services', 'Check Pricing', 'Talk to Human'];
    }

    // Comprehensive Fallback when Gemini is unavailable
    private static getFallbackResponse(message: string): ChatResponse {
        const lowerMsg = message.toLowerCase();

        // --- Greetings ---
        if (/^(hi|hello|hey|namaste|hola|good morning|good evening|yo|sup)\b/.test(lowerMsg) || lowerMsg.length < 4) {
            return {
                text: "Namaste! 🙏 I'm Bruno, SAGE DO's AI assistant. We're India's first AI + Human hybrid execution team. How can I help you today? 🚀",
                options: ['Browse Services', 'Check Pricing', 'Talk to Human']
            };
        }

        // --- What is this website / What does SAGE DO do ---
        if (lowerMsg.includes('what is this') || lowerMsg.includes('what does this') || lowerMsg.includes('what is sage') ||
            lowerMsg.includes('what do you do') || lowerMsg.includes('who are you') || lowerMsg.includes('website') ||
            lowerMsg.includes('about this') || lowerMsg.includes('sagedo mean') || lowerMsg.includes('tell me about') ||
            lowerMsg.includes('what does sage') || lowerMsg.includes('explain') || lowerMsg.includes('what is your')) {
            return {
                text: "Great question! 🎯 SAGE DO is India's First AI + Human Hybrid Execution Team. We combine AI speed with human precision to deliver everything from resumes to websites, pitch decks to marketing campaigns — faster than agencies, at prices starting from just ₹49! What do you need done? 😊",
                options: ['View Services', 'Check Pricing', 'Talk to Human']
            };
        }

        // --- Founder / Team / Who made ---
        if (lowerMsg.includes('who made') || lowerMsg.includes('founder') || lowerMsg.includes('who runs') ||
            lowerMsg.includes('mukul') || lowerMsg.includes('owner') || lowerMsg.includes('who created') ||
            lowerMsg.includes('who built') || lowerMsg.includes('ceo') || lowerMsg.includes('team') ||
            lowerMsg.includes('behind')) {
            return {
                text: "SAGE DO was founded by Mukul Dhiman 🚀 — an ex-aerospace entrepreneur from Chandigarh, India. He built SAGE DO to bridge the gap between expensive agencies and unreliable freelancers. Connect: hello@sagedo.in | WhatsApp: +91 6284925684 💪",
                options: ['View About Page', 'View Services', 'Talk to Human']
            };
        }

        // --- Price / Cost / Expensive ---
        if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('expensive') ||
            lowerMsg.includes('cheap') || lowerMsg.includes('rate') || lowerMsg.includes('quote') ||
            lowerMsg.includes('budget') || lowerMsg.includes('afford') || lowerMsg.includes('fee') ||
            lowerMsg.includes('how much')) {
            return {
                text: "Our services start from just ₹49! 💰 Most packages are ₹10K-₹50K — that's 10x cheaper than agencies with the same quality. Tell me what you need and I'll get you a custom quote! 🎯",
                options: ['View Services', 'Get Quote', 'Talk to Human']
            };
        }

        // --- Services / What can you do / Trending ---
        if (lowerMsg.includes('service') || lowerMsg.includes('trending') || lowerMsg.includes('popular') ||
            lowerMsg.includes('what can') || lowerMsg.includes('offer') || lowerMsg.includes('available') ||
            lowerMsg.includes('list') || lowerMsg.includes('catalog')) {
            return {
                text: "🔥 **Our Services:**\n\n💼 Career: ATS Resumes, Cover Letters, LinkedIn\n✍️ Content: SEO Blogs, Social Media, Marketing\n💡 Business: Pitch Decks, Proposals, Logos\n🔧 Tech: Websites, Apps, SaaS MVPs, AI Agents\n\nAll powered by AI + Human precision! Which interests you? 🎯",
                options: ['View All Services', 'Get Quote', 'Talk to Human']
            };
        }

        // --- Custom Systems / Automations ---
        if (lowerMsg.includes('assignment') || lowerMsg.includes('homework') || lowerMsg.includes('essay') ||
            lowerMsg.includes('academic') || lowerMsg.includes('college') || lowerMsg.includes('school') ||
            lowerMsg.includes('study') || lowerMsg.includes('exam') || lowerMsg.includes('project') ||
            lowerMsg.includes('research') || lowerMsg.includes('thesis') || lowerMsg.includes('dissertation')) {
            return {
                text: "We specialize exclusively in high-end B2B and professional services like tech development, marketing, and C-Suite career optimization. We do not provide academic or student homework services. Let me know if you need help with a business project! 🚀",
                options: ['View Business Services', 'Check Pricing', 'Talk to Human']
            };
        }

        // --- Resume / Job / Career ---
        if (lowerMsg.includes('resume') || lowerMsg.includes('cv') || lowerMsg.includes('job') ||
            lowerMsg.includes('ats') || lowerMsg.includes('career') || lowerMsg.includes('cover letter') ||
            lowerMsg.includes('linkedin') || lowerMsg.includes('interview') || lowerMsg.includes('hire') ||
            lowerMsg.includes('application')) {
            return {
                text: "We create ATS-optimized resumes that pass the bots AND impress humans! 💼 Plus cover letters tailored to specific jobs and LinkedIn profile optimization. Your career upgrade starts here! 🚀",
                options: ['Order Resume', 'View Career Services', 'Talk to Human']
            };
        }

        // --- Content / Blog / Social Media ---
        if (lowerMsg.includes('content') || lowerMsg.includes('blog') || lowerMsg.includes('article') ||
            lowerMsg.includes('social media') || lowerMsg.includes('seo') || lowerMsg.includes('writing') ||
            lowerMsg.includes('copy') || lowerMsg.includes('post') || lowerMsg.includes('marketing') ||
            lowerMsg.includes('email') || lowerMsg.includes('newsletter')) {
            return {
                text: "We create high-impact content! ✍️ SEO blogs, social media campaigns, email marketing, website copy — all AI-drafted for speed and human-refined for quality. What type of content do you need? 🎯",
                options: ['View Content Services', 'Get Quote', 'Talk to Human']
            };
        }

        // --- PPT / Presentation / Design ---
        if (lowerMsg.includes('ppt') || lowerMsg.includes('presentation') || lowerMsg.includes('slide') ||
            lowerMsg.includes('deck') || lowerMsg.includes('pitch') || lowerMsg.includes('proposal') ||
            lowerMsg.includes('design') || lowerMsg.includes('logo') || lowerMsg.includes('infographic') ||
            lowerMsg.includes('brand')) {
            return {
                text: "Yes! 🎨 We design professional pitch decks, business proposals, logos, infographics, and brand identities. Investor-ready quality that makes your ideas shine! What do you need? ✨",
                options: ['Place Order', 'View Design Services', 'Talk to Human']
            };
        }

        // --- Website / App / Tech ---
        if (lowerMsg.includes('website') || lowerMsg.includes('app') || lowerMsg.includes('develop') ||
            lowerMsg.includes('software') || lowerMsg.includes('saas') || lowerMsg.includes('code') ||
            lowerMsg.includes('tech') || lowerMsg.includes('build') || lowerMsg.includes('automat') ||
            lowerMsg.includes('ai agent') || lowerMsg.includes('cloud') || lowerMsg.includes('mvp')) {
            return {
                text: "We build modern websites, mobile apps, SaaS MVPs, and AI automation systems! 🔧 React, Node.js, React Native — full-stack with clean code. From landing pages to complete platforms. What's your vision? 🚀",
                options: ['View Tech Services', 'Get Quote', 'Talk to Human']
            };
        }

        // --- Trust / Scam / Legit ---
        if (lowerMsg.includes('trust') || lowerMsg.includes('scam') || lowerMsg.includes('legit') ||
            lowerMsg.includes('real') || lowerMsg.includes('fake') || lowerMsg.includes('fraud') ||
            lowerMsg.includes('reliable') || lowerMsg.includes('safe')) {
            return {
                text: "100% legit! 🛡️ We're a registered team with 67+ projects delivered, 99.9% accuracy. Every output is human-verified. Try a small order first, see the quality, then scale up! We don't disappear after delivery 🤝",
                options: ['View Reviews', 'Start Small Order', 'Talk to Human']
            };
        }

        // --- Delivery / Speed / Urgent ---
        if (lowerMsg.includes('fast') || lowerMsg.includes('delivery') || lowerMsg.includes('urgent') ||
            lowerMsg.includes('deadline') || lowerMsg.includes('when') || lowerMsg.includes('how long') ||
            lowerMsg.includes('same day') || lowerMsg.includes('quick') || lowerMsg.includes('rush')) {
            return {
                text: "Speed is our superpower! ⚡ Standard delivery: 24-48 hours. Rush orders: same day for urgent needs. Complex projects get a clear timeline upfront. We never sacrifice quality for speed! 🚀",
                options: ['Place Urgent Order', 'View Services', 'Talk to Human']
            };
        }

        // --- Order / Buy / Start ---
        if (lowerMsg.includes('order') || lowerMsg.includes('buy') || lowerMsg.includes('purchase') ||
            lowerMsg.includes('start') || lowerMsg.includes('begin') || lowerMsg.includes('get started')) {
            return {
                text: "Let's get started! 🎯 Head to our Services page, pick what you need, and place your order. Or tell me what you need right here and I'll guide you step-by-step! 😊",
                options: ['View Services', 'Place Order', 'Talk to Human']
            };
        }

        // --- Track / Status ---
        if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('progress') ||
            lowerMsg.includes('where is') || lowerMsg.includes('my order') || lowerMsg.includes('update')) {
            return {
                text: "You can track your order in real-time on the Orders page! 📋 Log in to see the latest status. Need help? I can connect you with our team on WhatsApp for a quick update 💬",
                options: ['Track Order', 'Contact Support', 'Talk to Human']
            };
        }

        // --- Payment / Refund ---
        if (lowerMsg.includes('payment') || lowerMsg.includes('pay') || lowerMsg.includes('upi') ||
            lowerMsg.includes('refund') || lowerMsg.includes('money back') || lowerMsg.includes('card') ||
            lowerMsg.includes('cancel') || lowerMsg.includes('checkout')) {
            return {
                text: "We accept all standard payment methods at checkout! 💳 Refunds are handled fairly based on work progress. For payment issues, I'll connect you with our team immediately 🤝",
                options: ['Place Order', 'Contact Support', 'Talk to Human']
            };
        }

        // --- Human support / Contact ---
        if (lowerMsg.includes('human') || lowerMsg.includes('support') || lowerMsg.includes('contact') ||
            lowerMsg.includes('talk to') || lowerMsg.includes('whatsapp') || lowerMsg.includes('call') ||
            lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
            return {
                text: "Of course! 🙋 Reach our human team anytime:\n📱 WhatsApp: +91 6284925684\n📧 Email: hello@sagedo.in\nWe usually respond within 2 hours! 💬",
                options: ['Open WhatsApp', 'Send Email', 'Continue Chat']
            };
        }

        // --- Revision / Change ---
        if (lowerMsg.includes('revision') || lowerMsg.includes('change') || lowerMsg.includes('edit') ||
            lowerMsg.includes('modify') || lowerMsg.includes('fix') || lowerMsg.includes('redo') ||
            lowerMsg.includes('not happy') || lowerMsg.includes('problem') || lowerMsg.includes('issue')) {
            return {
                text: "No worries! ✅ We offer revisions until you're 100% satisfied. If it takes more than 3 rounds, I'll escalate to a senior team member for priority handling. Your satisfaction is guaranteed! 🤝",
                options: ['Request Revision', 'Contact Support', 'Talk to Human']
            };
        }

        // --- Discount / Offer ---
        if (lowerMsg.includes('discount') || lowerMsg.includes('offer') || lowerMsg.includes('coupon') ||
            lowerMsg.includes('deal') || lowerMsg.includes('promo') || lowerMsg.includes('free') ||
            lowerMsg.includes('bonus') || lowerMsg.includes('trial')) {
            return {
                text: "We run special offers from time to time! 🎁 New users get a Welcome Bonus. For current promotions, check the Services page or ask our team on WhatsApp for exclusive deals! 💰",
                options: ['View Services', 'Check Offers', 'Talk to Human']
            };
        }

        // --- Thank you / Bye ---
        if (lowerMsg.includes('thank') || lowerMsg.includes('bye') || lowerMsg.includes('great') ||
            lowerMsg.includes('awesome') || lowerMsg.includes('good') || lowerMsg.includes('nice') ||
            lowerMsg.includes('cool') || lowerMsg.includes('ok') || lowerMsg.includes('sure')) {
            return {
                text: "You're welcome! 😊 It was great chatting with you. Come back anytime — I'm always here to help! Do share your experience with us 🙏",
                options: ['View Services', 'Give Feedback', 'Start New Chat']
            };
        }

        // --- Confused / Not sure ---
        if (lowerMsg.includes('confused') || lowerMsg.includes("don't know") || lowerMsg.includes('not sure') ||
            lowerMsg.includes('which') || lowerMsg.includes('suggest') || lowerMsg.includes('recommend') ||
            lowerMsg.includes('what should')) {
            return {
                text: "No worries! 🤔 Just describe what you're trying to accomplish — whether it's for business, studies, career, or a personal project. I'll recommend the perfect service for you! Or I can connect you with our team for a free consultation 📧",
                options: ['Describe My Need', 'View Services', 'Talk to Human']
            };
        }

        // --- CATCH-ALL: Smart default (instead of "I don't know") ---
        return {
            text: "Great question! 🎯 SAGE DO offers 30+ services powered by AI + Human precision — from resumes to websites to marketing. Tell me more about what you need, or check out our Services page! I'm here to help 😊",
            options: ['Browse Services', 'Check Pricing', 'Talk to Human']
        };
    }

    // Clear conversation history for a session
    static clearHistory(userId: string): void {
        this.conversationHistory.delete(userId || 'anonymous');
    }
}
