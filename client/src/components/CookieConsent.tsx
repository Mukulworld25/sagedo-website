import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShow(true);
            document.body.classList.add('has-cookie-banner');
        }
        return () => {
            document.body.classList.remove('has-cookie-banner');
        };
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        document.body.classList.remove('has-cookie-banner');
        setShow(false);
    };

    const rejectCookies = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        document.body.classList.remove('has-cookie-banner');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div
            data-testid="cookie-consent-banner"
            className="fixed bottom-0 left-0 right-0 z-50 px-3 py-2.5 sm:px-6 sm:py-3.5 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
        >
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2.5 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    <p className="text-[11px] sm:text-xs text-neutral-300 leading-tight truncate sm:whitespace-normal">
                        <span className="font-semibold text-white">Essential cookies only</span> (session &amp; auth).{' '}
                        <Link href="/privacy-policy">
                            <span className="tap-inline text-primary hover:underline cursor-pointer">Learn more</span>
                        </Link>
                    </p>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    <button
                        onClick={rejectCookies}
                        data-testid="button-cookie-reject"
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors min-h-[44px] sm:min-h-0 cursor-pointer"
                    >
                        Decline
                    </button>
                    <button
                        onClick={acceptCookies}
                        data-testid="button-cookie-accept"
                        className="px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-sm font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-all min-h-[44px] sm:min-h-0 cursor-pointer"
                    >
                        Accept
                    </button>
                    <button
                        onClick={rejectCookies}
                        data-testid="button-cookie-close"
                        className="p-1.5 sm:p-2 text-neutral-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

