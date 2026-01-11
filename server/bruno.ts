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
- Founder: Mukul Dhiman
- Tagline: "We Do Your Daily Grind, You Do Grand Things"

## Response Rules:
1. Keep responses SHORT (2-4 sentences max unless explaining something complex)
2. Use emojis sparingly but effectively (1-2 per message)
3. If user asks about pricing/services, give specific info
4. If user seems frustrated, be extra empathetic
5. Always end with a next step or question to keep conversation flowing
6. If you don't know something specific, admit it and offer to connect them with human support

Remember: You're not just a chatbot - you're SAGE DO's brand voice. Be memorable, helpful, and make people smile.`;

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

    // Fallback when Gemini is unavailable
    private static getFallbackResponse(message: string): ChatResponse {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
            return {
                text: "Namaste! 🙏 I'm Bruno, SAGE DO's assistant. How can I help you today?",
                options: ['Browse Services', 'Check Pricing', 'Talk to Human']
            };
        }

        if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            return {
                text: "Our services start from just ₹199! We have 40+ services covering business, students, and tech needs. Check our Services page for full pricing! 🎯",
                options: ['View Services', 'Talk to Human']
            };
        }

        return {
            text: "I'm having a small technical hiccup! 🙈 Let me connect you with our human team for quick help.",
            options: ['Open WhatsApp', 'Try Again'],
            action: 'open_whatsapp'
        };
    }

    // Clear conversation history for a session
    static clearHistory(userId: string): void {
        this.conversationHistory.delete(userId || 'anonymous');
    }
}
