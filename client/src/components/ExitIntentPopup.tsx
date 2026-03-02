import { useState, useEffect } from "react";
import { X, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const shown = localStorage.getItem('sagedo_newsletter_shown');
        const subscribed = localStorage.getItem('sagedo_newsletter_subscribed');

        if (shown || subscribed) {
            setHasShown(true);
            return;
        }

        // Exit intent detection - when mouse moves to top of page
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem('sagedo_newsletter_shown', 'true');
            }
        };

        // Also show after 45 seconds on page
        const timer = setTimeout(() => {
            if (!hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem('sagedo_newsletter_shown', 'true');
            }
        }, 45000);

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timer);
        };
    }, [hasShown]);

    const handleSubmit = async () => {
        if (!email || !email.includes('@')) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'exit_intent' })
            });
        } catch (error) {
            console.error('Newsletter error:', error);
        }
        setSubmitted(true);
        setIsSubmitting(false);
        localStorage.setItem('sagedo_newsletter_subscribed', 'true');
        setTimeout(() => setIsVisible(false), 3000);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-[90%] max-w-md bg-background border border-primary/20 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {!submitted ? (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-destructive/20 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Get the SAGEDO Weekly AI Execution Report
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                One email every Friday. Real AI tools, real execution tactics, real Indian startup stories. No fluff.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-muted/50"
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            />
                            <Button
                                className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !email}
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                {isSubmitting ? 'Subscribing...' : 'Send Me the Report'}
                            </Button>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            No spam. Unsubscribe anytime. Join 500+ founders.
                        </p>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Mail className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            You're In! 🚀
                        </h2>
                        <p className="text-muted-foreground">
                            Check your inbox this Friday for the first report.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
