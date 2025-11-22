import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShow(false);
    };

    const rejectCookies = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground mb-1">We use cookies</p>
                        <p>
                            We use essential cookies for authentication and session management. No tracking or advertising cookies.{' '}
                            <Link href="/privacy-policy">
                                <span className="text-primary hover:underline cursor-pointer">Learn more</span>
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={rejectCookies}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Reject
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
                    >
                        Accept
                    </button>
                    <button
                        onClick={rejectCookies}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
