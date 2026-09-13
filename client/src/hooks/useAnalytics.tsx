import { useEffect } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export function useAnalytics() {
    const [location] = useLocation();

    useEffect(() => {
        // Fire-and-forget visit tracking
        const track = async () => {
            try {
                await apiRequest("POST", "/api/track-visit", { path: location });
            } catch (error) {
                console.error("Analytics error:", error);
            }
        };

        track();

        // Also trigger Google Analytics if available
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-YHNDTN14K7', {
                'page_path': location
            });
        }

    }, [location]);
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}

export function trackWhatsAppClick(source: string, extra?: Record<string, any>) {
    trackEvent('whatsapp_click', {
        event_category: 'Lead',
        event_label: source,
        source,
        ...extra
    });
}
