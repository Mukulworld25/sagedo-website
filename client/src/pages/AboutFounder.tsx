import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, Award, Briefcase, GraduationCap, Rocket, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const credentials = [
    { icon: Award, text: "Manufacturing Specialist, Tata Lockheed Martin Aerostructures (C-130J, F-16)" },
    { icon: Briefcase, text: "Operations Manager, Uber India" },
    { icon: Briefcase, text: "Operations Manager, Mach1 Advisors" },
    { icon: GraduationCap, text: "B.E. Aerospace Engineering, Chandigarh University" },
    { icon: Rocket, text: "67+ projects delivered, 99.9% client satisfaction" },
];

const stats = [
    { value: "67+", label: "Projects Delivered" },
    { value: "99.9%", label: "Client Satisfaction" },
    { value: "24-48h", label: "Average Delivery" },
    { value: "5+", label: "Years Engineering" },
];

export default function AboutFounder() {
    return (
        <>
            <Helmet>
                <title>About Mukul Dhiman — Founder of SAGEDO | Ex-Aerospace Engineer</title>
                <meta name="description" content="Meet Mukul Dhiman, founder of SAGEDO. Ex-Tata Lockheed Martin aerospace engineer who built India's first AI + Human hybrid execution team." />
            </Helmet>

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            {/* Founder Avatar */}
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary/20">
                                M
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                                The Engineer Who Got Tired of Watching{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">
                                    Great Ideas Fail
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Mukul Dhiman — Founder & CEO, SAGEDO — Chandigarh, India
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                I spent years in precision-critical environments — building aerospace
                                components for the <strong className="text-foreground">C-130J and F-16 at Tata Lockheed Martin</strong>, then managing
                                operations teams at <strong className="text-foreground">Uber</strong> and <strong className="text-foreground">Mach1</strong>.
                            </p>
                            <p>
                                One thing I saw everywhere: <strong className="text-foreground">brilliant people with great ideas who couldn't
                                    execute fast enough.</strong>
                            </p>
                            <p>
                                Agencies charged ₹50K-₹5L and took months. Freelancers disappeared.
                                DIY tools had steep learning curves. The execution gap was killing
                                good businesses.
                            </p>
                            <p className="text-xl text-foreground font-semibold border-l-4 border-primary pl-6 py-2">
                                So I built SAGEDO — India's First AI + Human Hybrid Execution Team.
                            </p>
                            <p>
                                <strong className="text-foreground">AI handles the speed. Humans ensure the quality. Founders focus on growth.</strong>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Credentials */}
                <section className="py-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Credentials</h2>
                        <div className="space-y-4">
                            {credentials.map((cred, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
                                    <cred.icon className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground">{cred.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Execute?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Get a free AI audit of your business. No sales pitch. Just actionable insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/free-audit">
                                <Button size="lg" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg px-8">
                                    Get Free AI Audit <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <a href="https://wa.me/916284925684?text=Hi Mukul, I'd like to discuss a project with SAGEDO." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="text-lg px-8">
                                    Chat on WhatsApp
                                </Button>
                            </a>
                        </div>
                        <p className="mt-8 text-sm text-muted-foreground">
                            📧 hello@sagedo.in — 📞 +91 6284925684 — 🌐 sagedo.in
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
