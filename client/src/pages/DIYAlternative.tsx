import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, Clock, Brain, Wrench, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const struggles = [
    { icon: Clock, title: "Time sink", desc: "Learning Canva, Notion, ChatGPT, Zapier, Webflow... by the time you master the tools, you've lost 3 months." },
    { icon: Brain, title: "Prompt engineering", desc: "AI tools need precise instructions. 'Make me a website' doesn't work. You need to know what to ask and how to iterate." },
    { icon: Wrench, title: "Integration nightmares", desc: "Getting 10 different AI tools to work together is a full-time job. APIs, webhooks, automation flows — it adds up." },
    { icon: Frown, title: "Quality gaps", desc: "AI output is 80% there. The last 20% — the polish, the strategy, the human touch — is what makes it professional." },
];

export default function DIYAlternative() {
    return (
        <>
            <Helmet>
                <title>Too Busy to Learn AI Tools? Let SAGEDO Do It For You</title>
                <meta name="description" content="Don't waste months learning AI tools. SAGEDO's AI + human team handles everything for you — websites, content, automation — at freelancer prices." />
            </Helmet>
            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Skip the Learning Curve</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                            Too Busy to Learn AI Tools?{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">Let Us Do It For You.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            You run a business. You don't need another skill to learn. You need execution.
                        </p>
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
                        <p>Everyone says "just use AI tools" like it's that simple. <strong className="text-foreground">It's not.</strong></p>
                        <p>Yes, ChatGPT can write copy. Canva can design. Zapier can automate. But knowing which tool to use, how to use it effectively, and how to integrate everything into a cohesive business system — that takes expertise you don't have time to develop.</p>
                        <p>You're a founder, not a prompt engineer. Your time is worth more than learning the difference between GPT-4 and Claude or figuring out why your Zapier flow broke at 2 AM.</p>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-8 text-center">The DIY AI Trap</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {struggles.map((s) => (
                            <div key={s.title} className="p-6 rounded-2xl bg-card border border-border/50">
                                <s.icon className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                                <p className="text-sm text-muted-foreground">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
                        <p className="text-xl text-foreground font-semibold border-l-4 border-primary pl-6">SAGEDO already knows the AI stack. We use 20+ AI tools daily. We've built systems for 67+ clients. We know what works and what doesn't.</p>
                        <p>Instead of spending 3 months learning AI tools, you can have SAGEDO deliver <strong className="text-foreground">a complete website in 7 days, social media content in 24 hours, and automation in 48 hours</strong> — all powered by AI, polished by humans.</p>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-3">Let Us Handle the AI. You Handle the Growth.</h3>
                        <p className="text-muted-foreground mb-6">Get a free AI audit and see what we can automate for your business.</p>
                        <Link href="/free-audit">
                            <Button size="lg" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">Get Free AI Audit <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
