import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, X, Check, Zap, Users, Clock, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const comparison = [
    { feature: "Website delivery", agency: "4-6 weeks", sagedo: "7 days" },
    { feature: "Cost", agency: "₹50K-₹5L", sagedo: "₹15K-₹35K" },
    { feature: "Quality", agency: "High", sagedo: "High" },
    { feature: "Support", agency: "Email (48hr response)", sagedo: "WhatsApp (5min response)" },
    { feature: "AI-powered", agency: "Rarely", sagedo: "Every project" },
    { feature: "Transparency", agency: "Monthly reports", sagedo: "Real-time tracking" },
];

export default function AgencyAlternative() {
    return (
        <>
            <Helmet>
                <title>SAGEDO — The Smarter Alternative to Expensive Digital Agencies in India</title>
                <meta name="description" content="Why pay ₹50K-₹5L for slow agency work? SAGEDO delivers the same quality at freelancer prices using AI + human execution. 24-48 hour delivery." />
            </Helmet>
            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Switch?</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                            The Smarter Alternative to Expensive Digital Agencies in India
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            You shouldn't have to choose between quality and affordability. SAGEDO gives you both.
                        </p>
                    </div>

                    <div className="prose prose-invert max-w-none mb-12">
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>If you've worked with a digital agency in India, you know the drill: ₹50,000 to ₹5,00,000 retainers, 4-8 week timelines, and an account manager who's juggling 15 other clients. By the time your project ships, the market has moved on.</p>
                            <p>Agencies charge premium because of their overhead — fancy offices, HR departments, account managers, and "strategy teams." <strong className="text-foreground">You're paying for their infrastructure, not your output.</strong></p>
                            <p>SAGEDO is different. We're a lean, AI-powered execution team based in Chandigarh. We use AI to handle the speed and humans to ensure the quality. The result? <strong className="text-foreground">Agency-quality work at 70-80% lower cost, delivered in days instead of weeks.</strong></p>
                            <p>We don't have fancy offices. We don't have account managers. We have one thing: <strong className="text-foreground">the ability to execute faster and better than any agency in India.</strong></p>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="overflow-x-auto mb-16">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-4 text-foreground font-semibold">Feature</th>
                                    <th className="p-4 text-muted-foreground">Traditional Agency</th>
                                    <th className="p-4 text-primary font-semibold">SAGEDO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row) => (
                                    <tr key={row.feature} className="border-b border-border/50">
                                        <td className="p-4 text-foreground font-medium">{row.feature}</td>
                                        <td className="p-4 text-muted-foreground">{row.agency}</td>
                                        <td className="p-4 text-primary font-medium">{row.sagedo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Switch?</h3>
                        <p className="text-muted-foreground mb-6">Get a free AI audit of your business. See the SAGEDO difference.</p>
                        <Link href="/free-audit">
                            <Button size="lg" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">Get Free AI Audit <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
