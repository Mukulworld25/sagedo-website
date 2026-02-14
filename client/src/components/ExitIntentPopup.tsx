import { useState, useEffect } from "react";
import { X, Heart, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Check if already shown forever (or for a long time)
        const shown = localStorage.getItem('sagedo_exit_popup_shown');
        const feedbackSubmitted = localStorage.getItem('sagedo_feedback_submitted');

        if (shown || feedbackSubmitted) {
            setHasShown(true);
            return;
        }

        // Exit intent detection - when mouse moves to top of page
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem('sagedo_exit_popup_shown', 'true');
            }
        };

        // Also detect when page visibility changes (switching tabs)
        const handleVisibilityChange = () => {
            if (document.hidden && !hasShown) {
                // Don't show popup when just switching tabs, only on exit intent
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [hasShown]);

    const handleSubmitFeedback = async () => {
        try {
            await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, feedback, type: 'exit_intent' })
            });
            setSubmitted(true);
            localStorage.setItem('sagedo_feedback_submitted', 'true');
            setTimeout(() => setIsVisible(false), 2000);
        } catch (error) {
            console.error('Feedback error:', error);
            setIsVisible(false);
        }
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
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Thank You for Visiting! 🙏
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                We'd love to hear your thoughts. Your feedback helps us serve you better!
                            </p>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Feedback Input */}
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Any suggestions or feedback? (Optional)"
                            className="w-full p-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary outline-none resize-none text-sm"
                            rows={3}
                        />

                        {/* Actions */}
                        <div className="flex gap-3 mt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsVisible(false)}
                            >
                                Maybe Later
                            </Button>
                            <Button
                                className="flex-1 bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                                onClick={handleSubmitFeedback}
                                disabled={rating === 0}
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Share Feedback
                            </Button>
                        </div>

                        {/* WhatsApp Link */}
                        <p className="text-center text-xs text-muted-foreground mt-4">
                            Need help? <a href="https://wa.me/916284925684" target="_blank" className="text-primary hover:underline">Chat with us on WhatsApp</a>
                        </p>
                    </>
                ) : (
                    /* Thank You Submitted */
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Heart className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Thank You! ❤️
                        </h2>
                        <p className="text-muted-foreground">
                            Your feedback means the world to us!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
