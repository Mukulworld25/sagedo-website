import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
    {
        question: "How many hours per week does your team spend on repetitive tasks?",
        options: [
            { label: "0-5 hours", score: 10 },
            { label: "5-15 hours", score: 15 },
            { label: "15-30 hours", score: 20 },
            { label: "30+ hours", score: 25 },
        ],
    },
    {
        question: "Do you have a website?",
        options: [
            { label: "No website", score: 25 },
            { label: "Basic/template site", score: 20 },
            { label: "Professional website", score: 10 },
            { label: "Advanced with analytics", score: 5 },
        ],
    },
    {
        question: "How do you currently handle customer inquiries?",
        options: [
            { label: "Manually (phone/in-person)", score: 25 },
            { label: "Email only", score: 20 },
            { label: "WhatsApp", score: 15 },
            { label: "CRM system", score: 5 },
        ],
    },
    {
        question: "What is your monthly revenue range?",
        options: [
            { label: "Pre-revenue", score: 20 },
            { label: "Under ₹1 Lakh", score: 20 },
            { label: "₹1-10 Lakh", score: 15 },
            { label: "₹10 Lakh+", score: 10 },
        ],
    },
    {
        question: "What is your biggest bottleneck?",
        options: [
            { label: "Content creation", score: 20 },
            { label: "Tech/development", score: 20 },
            { label: "Sales & marketing", score: 20 },
            { label: "Operations", score: 15 },
        ],
    },
];

function getRecommendations(answers: number[], totalScore: number) {
    const recs = [];
    if (answers[0] >= 20) recs.push({ icon: Zap, title: "AI Automation Priority", desc: "Your team is spending 15+ hours on repetitive work. AI automation can cut this by 70% and free your team for growth tasks." });
    if (answers[1] >= 20) recs.push({ icon: Target, title: "Website Upgrade Needed", desc: "Your online presence is below standard. A professional website with SEO will bring organic leads and establish credibility." });
    if (answers[2] >= 20) recs.push({ icon: TrendingUp, title: "Customer Management Gap", desc: "Manual inquiry handling is losing you leads. A WhatsApp Business + CRM setup can capture 3x more customers." });
    if (answers[3] >= 15) recs.push({ icon: Zap, title: "Revenue Acceleration", desc: "At your stage, speed of execution matters most. SAGEDO's hybrid approach can help you launch and iterate 5x faster." });
    if (answers[4] >= 20) recs.push({ icon: Target, title: `${['Content', 'Tech', 'Sales', 'Operations'][questions[4].options.findIndex(o => o.score === answers[4])]} Bottleneck Fix`, desc: "Your biggest bottleneck is exactly what SAGEDO specializes in. We can remove this blocker in 24-48 hours." });
    if (recs.length < 3) recs.push({ icon: TrendingUp, title: "Growth Optimization", desc: "Your business has a solid foundation. SAGEDO can help you scale faster with AI-powered marketing and automation." });
    return recs.slice(0, 3);
}

export default function AIReadinessCheck() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setShowResults(true);
        }
    };

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const scoreLabel = totalScore >= 80 ? "High AI Readiness Need" : totalScore >= 50 ? "Moderate AI Opportunity" : "Good Foundation";
    const scoreColor = totalScore >= 80 ? "text-destructive" : totalScore >= 50 ? "text-yellow-400" : "text-green-400";

    return (
        <>
            <Helmet>
                <title>Is Your Business Ready for AI? Free 60-Second Assessment — SAGEDO</title>
                <meta name="description" content="Take SAGEDO's free 60-second AI readiness assessment. Find out if AI can help your business grow faster and get personalized recommendations." />
            </Helmet>

            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    {!showResults ? (
                        <>
                            {/* Quiz Header */}
                            <div className="text-center mb-12">
                                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Free Assessment</span>
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-3">
                                    Is Your Business Ready for AI?
                                </h1>
                                <p className="text-muted-foreground">60-second assessment. 5 questions. Personalized recommendations.</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                    <span>Question {currentQ + 1} of {questions.length}</span>
                                    <span>{Math.round(((currentQ) / questions.length) * 100)}% complete</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-destructive rounded-full transition-all duration-500"
                                        style={{ width: `${((currentQ) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50">
                                <h2 className="text-xl font-bold text-foreground mb-6">
                                    {questions[currentQ].question}
                                </h2>
                                <div className="space-y-3">
                                    {questions[currentQ].options.map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(option.score)}
                                            className="w-full text-left p-4 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-foreground"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Results */}
                            <div className="text-center mb-12">
                                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-destructive/20 flex items-center justify-center border-4 border-primary/30">
                                    <span className="text-3xl font-bold text-foreground">{totalScore}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Your AI Readiness Score</h1>
                                <p className={`text-xl font-semibold ${scoreColor}`}>{scoreLabel}</p>
                                <p className="text-muted-foreground mt-2">Score: {totalScore} / 100</p>
                            </div>

                            {/* Recommendations */}
                            <div className="space-y-4 mb-12">
                                <h2 className="text-2xl font-bold text-foreground text-center mb-6">Your Recommendations</h2>
                                {getRecommendations(answers, totalScore).map((rec, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-card border border-border/50">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <rec.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground mb-1">{rec.title}</h3>
                                                <p className="text-sm text-muted-foreground">{rec.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20 text-center">
                                <h3 className="text-2xl font-bold text-foreground mb-3">Get Your Free Custom AI Audit</h3>
                                <p className="text-muted-foreground mb-6">
                                    A SAGEDO expert will personally analyze your business and deliver a detailed action plan in 24 hours. Free. No strings.
                                </p>
                                <Link href="/free-audit">
                                    <Button size="lg" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg px-8">
                                        Get Free AI Audit <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
