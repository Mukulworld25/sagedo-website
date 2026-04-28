import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, AlertTriangle, Shield, Clock, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const problems = [
    { icon: AlertTriangle, title: "They disappear mid-project", desc: "You've paid 50% upfront and suddenly they stop replying. No accountability, no contract enforcement." },
    { icon: Clock, title: "Timelines stretch endlessly", desc: "What was promised in 1 week becomes 3 weeks, then a month. You're stuck waiting with no alternative." },
    { icon: Shield, title: "Quality is a gamble", desc: "Some freelancers are brilliant. Most are average. You don't know which you'll get until it's too late." },
    { icon: HeadphonesIcon, title: "Zero post-delivery support", desc: "Once they deliver, they move on. Bug? Issue? Change? That'll be extra — if they even reply." },
];

export default function FreelancerAlternative() {
    return (
        <>
            <Helmet>
                <title>Better Than a Freelancer. Cheaper Than an Agency. This is SAGEDO.</title>
                <meta name="description" content="Stop gambling on freelancers. SAGEDO delivers agency-quality work at freelancer prices with guaranteed timelines, WhatsApp support, and AI speed." />
            </Helmet>
            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Stop Gambling</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                            Better Than a Freelancer. Cheaper Than an Agency.
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            SAGEDO combines the best of both worlds — and eliminates the worst.
                        </p>
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
                        <p>Every founder in India has a freelancer horror story. You found someone on Upwork or Fiverr, they seemed great, and then... <strong className="text-foreground">they vanished.</strong></p>
                        <p>The freelancer model is fundamentally broken for businesses that need reliability. A freelancer is one person with one set of skills, managing multiple clients with zero accountability structure.</p>
                        <p>SAGEDO is different. We're a dedicated execution team that combines <strong className="text-foreground">AI speed with human precision</strong>. You get the affordability of a freelancer with the reliability of an agency — and faster delivery than either.</p>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-8 text-center">The Freelancer Problem</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {problems.map((p) => (
                            <div key={p.title} className="p-6 rounded-2xl bg-card border border-destructive/20">
                                <p.icon className="w-8 h-8 text-destructive mb-4" />
                                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                                <p className="text-sm text-muted-foreground">{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-8 text-center">The SAGEDO Solution</h2>
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
                        <p>With SAGEDO, you get a <strong className="text-foreground">dedicated team, not a solo freelancer</strong>. Your project is tracked in real-time. You communicate via WhatsApp with &lt;5 minute response times. And we deliver in 24-48 hours — not 2-3 weeks.</p>
                        <p>Our pricing starts at ₹15,000 for a complete website + brand identity — cheaper than most experienced freelancers, with 10x better reliability.</p>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-3">Stop Gambling on Freelancers</h3>
                        <p className="text-muted-foreground mb-6">Get a free AI audit and see what reliable execution looks like.</p>
                        <Link href="/free-audit">
                            <Button size="lg" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">Get Free AI Audit <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
