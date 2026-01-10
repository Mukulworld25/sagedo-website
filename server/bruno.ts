import { storage } from "./storage";

// The "Personality" of Bruno
const BRUNO_PERSONA = {
    role: "Senior Personal Assistant at SAGE DO",
    tone: "Professional, Empathetic, Efficient, and slightly Witty",
    opening: ["Hello!", "Hi there!", "Namaste!"],
    closing: ["Let me know if you need anything else! 🙏", "Happy to help!", "At your service."],
};

interface ChatResponse {
    text: string;
    options?: string[];
    action?: string; // e.g., 'navigate_services', 'open_whatsapp'
}

export class BrunoBrain {

    // The Core Process Function
    static async processMessage(userId: string | undefined, message: string, personality: 'standard' | 'roast' = 'standard'): Promise<ChatResponse> {
        const lowerMsg = message.toLowerCase();

        // ----------------------------------------------
        // 🔥 GROK "ROAST" MODE (The Savage Consultant)
        // ----------------------------------------------
        if (personality === 'roast') {
            // Website Roast Trigger
            if (lowerMsg.includes('http') || lowerMsg.includes('www') || lowerMsg.includes('.com') || lowerMsg.includes('.in')) {
                const roasts = [
                    "Aha! I see what you did there. It's... 'retro'. 📼 Let's modernize this before your customers think it's 2005.",
                    "The design is 'unique', but is it selling? 📉 A quick UI polish could probably double your conversions.",
                    "I love the effort! But that load time gave me enough time to make chai. ☕ Let's speed it up?",
                    "It works, but does it WOW? ✨ In 2026, 'good enough' isn't enough. Let's make it world-class.",
                    "Your content is solid, but the layout is hiding your best offers. 🙈 Let's bring them to the spotlight."
                ];
                return {
                    text: roasts[Math.floor(Math.random() * roasts.length)] + "\n\n(Want a pro review? Check 'Web Dev' in Services)",
                    options: ['Improve My Website', 'View Web Services', 'Analyze Again']
                };
            }

            // General Roasts
            if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                return {
                    text: "Namaste! 🙏 Ready to stop playing safe and start dominating your market? Let's get to work.",
                    options: ['Critique My Strategy', 'Grow My Business']
                };
            }

            return {
                text: "I'm in 'Real Talk' mode. 🌶️ Show me your work (Link/Idea) and I'll tell you how to make it 10x better. No sugar coating, just growth.",
                options: ['Critique My Business', 'Show Top Services']
            };
        }

        // ----------------------------------------------
        // 🧘 STANDARD MODE (The Polite Assistant)
        // ----------------------------------------------

        // 1. Greet / Small Talk
        if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
            const user = userId ? await storage.getUser(userId) : null;
            const name = user?.name?.split(' ')[0] || "there";
            return {
                text: `Namaste ${name}! 🙏 I'm Bruno. How can I assist you with your business or studies today?`,
                options: ['Browse Services', 'Check My Orders', 'Contact Support']
            };
        }

        // 2. Intent: Pricing / Cost
        if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
            return {
                text: "Our services start from just ₹199! We have 40+ services. \n\n• Business Ads: ₹199\n• Website Content: ₹499\n• PPT Design: ₹299\n\nWould you like to see the full menu?",
                options: ['View All Services', 'View Business Pack', 'View Student Pack'],
                action: 'navigate_services'
            };
        }

        // 3. Intent: Delivery Time
        if (lowerMsg.includes('time') || lowerMsg.includes('long') || lowerMsg.includes('delivery')) {
            return {
                text: "Speed is our superpower! ⚡\nMost orders are delivered within 24-48 hours. \n\nFor complex projects (like Full Websites), it might take 72 hours. You can track everything in your Dashboard.",
                options: ['Track My Order', 'Place Order'],
            };
        }

        // 4. Intent: Support / Human
        if (lowerMsg.includes('human') || lowerMsg.includes('support') || lowerMsg.includes('talk') || lowerMsg.includes('number')) {
            return {
                text: "I can connect you to my human boss! 👨‍💼\n\nYou can chat directly with our Support Team on WhatsApp. We usually reply in < 10 minutes.",
                options: ['Open WhatsApp', 'Email Support'],
                action: 'open_whatsapp'
            };
        }

        // 5. Intent: Status / Order Check (Requires Auth)
        if (lowerMsg.includes('status') || lowerMsg.includes('order') || lowerMsg.includes('track')) {
            if (!userId) {
                return {
                    text: "I need to know who you are first! Please login so I can check your order status.",
                    options: ['Login Now'],
                    action: 'navigate_login'
                };
            }
            const orders = await storage.getOrdersByUserId(userId);
            if (orders.length === 0) {
                return {
                    text: "I checked your file, and you don't have any active orders yet. Want to start one? 🚀",
                    options: ['Browse Services'],
                    action: 'navigate_services'
                };
            }
            const recentOrder = orders[0];
            return {
                text: `Your Status Report 📋:\n\nOrder: ${recentOrder.serviceName}\nStatus: ${recentOrder.status.toUpperCase()}\nDate: ${new Date(recentOrder.createdAt!).toLocaleDateString()}\n\nNeed help with this?`,
                options: ['Contact Support', 'View Dashboard'],
            };
        }

        // 6. Intent: Who is Founder
        if (lowerMsg.includes('mukul') || lowerMsg.includes('founder') || lowerMsg.includes('owner')) {
            return {
                text: "That's my boss! Mr. Mukul Dhiman founded SAGE DO to make premium services accessible to everyone in India. 🇮🇳",
                options: ['Read About Us', 'View Services']
            };
        }

        // Default Fallback
        return {
            text: "I'm still learning! 🧠\nI didn't quite catch that. Could you try asking about 'Services', 'Pricing', or 'Order Status'?\n\nOr just say 'Support' to talk to a human.",
            options: ['Services', 'Support', 'Pricing']
        };
    }
}
