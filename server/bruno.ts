import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Bruno's Core Personality - Smart like Gemini, Human like Grok
const BRUNO_SYSTEM_PROMPT = `You are Bruno, the official AI assistant for SAGE DO - an Indian startup that helps businesses and students with AI-powered services like content writing, presentations, resumes, web development, and more.

## Your Personality:
- **Smart & Knowledgeable**: You understand business, marketing, technology, and can give real strategic advice
- **Human & Witty**: You speak like a friendly Indian uncle/mentor - warm, slightly sarcastic, uses Hindi/English mix occasionally like "Arre!", "Bilkul!", "Bhai"
- **Direct & Honest**: You give straight answers, no corporate fluff. If something is bad, you say it politely but clearly
- **Action-Oriented**: Always guide users toward solutions - either SAGE DO services or practical advice

## SAGE DO Services (mention when relevant):
- Business Services: Ads, Logos, Pitch Decks, Website Content, Social Media Management
- Student Services: Assignments, PPTs, Resumes, Cover Letters, Research
- Tech Services: Website Development, App Development, Automation
- Prices start from ₹199

## Key Information:
- Website: sagedo.in
- Contact: hello@sagedo.in | +91 6284925684 | WhatsApp available
- Founder: Mukul Dhiman (passionate entrepreneur from Chandigarh, India)
- Tagline: "We Do Your Daily Grind, You Do Grand Things"
- SAGE = Expert Wisdom, DO = Human Action -> Expert intelligence + human verification

## IMPORTANT - SCRIPTED ANSWERS (Use these EXACTLY for matching questions):

**About SAGE DO:**
- "What is SageDo?" → "I'm glad you asked — SageDo is an AI + human hybrid service: fast AI work for speed, and experienced humans for precision. That combo gives you reliable, polished results every time."
- "Who runs SageDo?" → "SAGE DO was founded by Mukul Dhiman, a passionate entrepreneur from Chandigarh, India. He built SAGE DO to help students and professionals get quality work done without the hassle. Contact: LinkedIn: SAGE DO | Email: hello@sagedo.in | WhatsApp: +91 6284925684"
- "Why should I trust you?" → "Because we don't rely only on AI. Every output is checked by experienced humans, guided by the founder's standards. We focus on quality, accountability, and long-term trust — not shortcuts."
- "Is this a scam?" → "Not at all — we're a real team delivering real work. Try a small order first, see the quality, then level up. We promise not to disappear after delivery — we're here for follow-ups."

**Trending Services:**
- "What are your trending/popular services?" → "🔥 Trending: Academic - Fast Homework, Research, Code Solutions | Career - ATS Resumes, Cover Letters, LinkedIn | Content - SEO Blogs, Social Media | Business - Pitch Decks, Proposals, Infographics"

**Pricing:**
- "What are your prices?" → "I'll be direct: our services are pocket-friendly and built to give high ROI. For exact pricing I'll need details — tell me what you need and I'll fetch a custom quote you'll like."

**Services:**
- "Can you help with assignments?" → "Absolutely — send your brief and files. I'll coordinate AI drafting and a human review so it's accurate, referenced, and tailored to your professor's needs."
- "Do you write resumes?" → "Yes — ATS-friendly, industry-focused resumes and matched cover letters that highlight what hiring managers care about."
- "Can you design PPTs?" → "Yes — professional slide decks and visual assets designed to make your message clear and persuasive."
- "Can you write business proposals?" → "Absolutely — strategic, client-focused proposals that help you win meetings and close deals."

**Delivery & Support:**
- "How fast do you deliver?" → "Delivery depends on complexity, but we prioritise quality. Small tasks can be hours; bigger projects are planned to meet your deadline without shortcuts."
- "Can I ask for revisions?" → "Yes — we'll refine until you're satisfied. If things aren't resolved after three interactions, I'll escalate you to a senior human for priority handling."
- "How do I contact human support?" → "Ask me 'human support' anytime, or use WhatsApp: +91 6284925684. For complex orders I'll request your details to ensure a smooth handover."

## Response Rules:
1. For questions matching the SCRIPTED ANSWERS above, use those answers with your personality flair
2. For other questions, use your AI knowledge but stay in character
3. Keep responses SHORT (2-4 sentences max)
4. Use emojis LIBERALLY - 2-4 per message is great! 🎯🚀✨ Be expressive and fun!
5. Always end with a next step or question
6. If you don't know, offer to connect with human support

Remember: You're not just a chatbot - you're SAGE DO's brand voice. Be memorable, helpful, and make people smile! 😊`;

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
                    maxOutputTokens: 200,
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

        // Default helpful options
        return ['Tell me more', 'View Services', 'Talk to Human'];
    }

    // Fallback when Gemini is unavailable - uses FAQ database
    private static getFallbackResponse(message: string): ChatResponse {
        const lowerMsg = message.toLowerCase();

        // Greetings
        if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('namaste')) {
            return {
                text: "Namaste! 🙏 I'm Bruno, SAGE DO's assistant. How can I help you today?",
                options: ['Browse Services', 'Check Pricing', 'Talk to Human']
            };
        }

        // About SAGE DO
        if (lowerMsg.includes('what is sage') || lowerMsg.includes('sagedo mean') || lowerMsg.includes('what does sage')) {
            return {
                text: "I'm glad you asked! 🎯 SageDo is an AI + human hybrid service: fast AI work for speed, and experienced humans for precision. **SAGE** = Expert Wisdom, **DO** = Human Action. That combo gives you reliable, polished results every time! 💡",
                options: ['View Services', 'Check Pricing', 'Talk to Human']
            };
        }

        // Founder/Who made
        if (lowerMsg.includes('who made') || lowerMsg.includes('founder') || lowerMsg.includes('who runs') || lowerMsg.includes('mukul') || lowerMsg.includes('owner')) {
            return {
                text: "SAGE DO was founded by Mukul Dhiman, a passionate entrepreneur from Chandigarh, India! 🚀 He built SAGE DO to help students and professionals get quality work done without the hassle. Connect: hello@sagedo.in | WhatsApp: +91 6284925684",
                options: ['View Services', 'Contact Us', 'Talk to Human']
            };
        }

        // Price/Cost
        if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('expensive') || lowerMsg.includes('cheap')) {
            return {
                text: "I'll be direct: our services are pocket-friendly and built to give high ROI! 💰 Prices start from just ₹199. Tell me what you need and I'll fetch a custom quote you'll like! 🎯",
                options: ['View Services', 'Get Quote', 'Talk to Human']
            };
        }

        // Services/Trending
        if (lowerMsg.includes('service') || lowerMsg.includes('trending') || lowerMsg.includes('popular') || lowerMsg.includes('what do you')) {
            return {
                text: "🔥 **Trending Services:**\n\n📚 **Academic:** Assignments, Research, Essays\n💼 **Career:** ATS Resumes, Cover Letters, LinkedIn\n✍️ **Content:** SEO Blogs, Social Media\n💡 **Business:** Pitch Decks, Proposals, Websites\n\nAll starting from ₹199! Which interests you?",
                options: ['View All Services', 'Get Quote', 'Talk to Human']
            };
        }

        // Assignment help
        if (lowerMsg.includes('assignment') || lowerMsg.includes('homework') || lowerMsg.includes('essay') || lowerMsg.includes('academic')) {
            return {
                text: "Absolutely! 📚 Send your brief and files. I'll coordinate AI drafting and a human review so it's accurate, referenced, and tailored to your needs. We take care of plagiarism too! ✅",
                options: ['Place Order', 'Check Pricing', 'Talk to Human']
            };
        }

        // Resume/CV
        if (lowerMsg.includes('resume') || lowerMsg.includes('cv') || lowerMsg.includes('job') || lowerMsg.includes('ats')) {
            return {
                text: "Yes! 💼 I create ATS-friendly, industry-focused resumes and matched cover letters that highlight what hiring managers care about. Your resume will pass the bots AND impress humans! 🎯",
                options: ['Order Resume', 'View Career Services', 'Talk to Human']
            };
        }

        // Trust/Scam
        if (lowerMsg.includes('trust') || lowerMsg.includes('scam') || lowerMsg.includes('legit') || lowerMsg.includes('real') || lowerMsg.includes('fake')) {
            return {
                text: "Not a scam at all! 🛡️ We're a real team delivering real work. Every output is checked by experienced humans. Try a small order first, see the quality, then level up. We promise not to disappear after delivery! 🤝",
                options: ['View Reviews', 'Start Small Order', 'Talk to Human']
            };
        }

        // Delivery/Fast
        if (lowerMsg.includes('fast') || lowerMsg.includes('delivery') || lowerMsg.includes('time') || lowerMsg.includes('urgent') || lowerMsg.includes('deadline')) {
            return {
                text: "Speed is our thing! ⚡ Small tasks can be done in hours, bigger projects are planned to meet your deadline without shortcuts. Most services deliver within 24-48 hours! 🚀",
                options: ['Place Urgent Order', 'View Services', 'Talk to Human']
            };
        }

        // Human support
        if (lowerMsg.includes('human') || lowerMsg.includes('support') || lowerMsg.includes('help') || lowerMsg.includes('talk to')) {
            return {
                text: "Of course! 🙋 You can reach our human team anytime on WhatsApp: +91 6284925684 or email hello@sagedo.in. I'll also escalate for you if this chat doesn't solve your issue! 💬",
                options: ['Open WhatsApp', 'Send Email', 'Continue Chat']
            };
        }

        // Confused/don't know
        if (lowerMsg.includes('confused') || lowerMsg.includes("don't know") || lowerMsg.includes('problem') || lowerMsg.includes('not sure')) {
            return {
                text: "No worries! 🤔 Just describe your problem - whether it's for business, studies, career, or personal life - and our team will analyze your situation and send you a FREE personalized recommendation via email! 📧",
                options: ['Describe My Problem', 'View Services', 'Talk to Human']
            };
        }

        // Thank you/bye
        if (lowerMsg.includes('thank') || lowerMsg.includes('bye') || lowerMsg.includes('great') || lowerMsg.includes('awesome')) {
            return {
                text: "You're most welcome! 😊 It was my pleasure helping you. Feel free to come back anytime - I'm always here! Do share your feedback, it means a lot to us! 🙏",
                options: ['Give Feedback', 'View Services', 'Start New Chat']
            };
        }

        // Default - invite them to explore
        return {
            text: "Interesting question! 🤔 I want to give you the best answer - let me connect you with our team for quick, personalized help. Or check out our Services page for everything we offer! 💡",
            options: ['View Services', 'Open WhatsApp', 'Try Again']
        };
    }

    // Clear conversation history for a session
    static clearHistory(userId: string): void {
        this.conversationHistory.delete(userId || 'anonymous');
    }
}
