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

    // Global listener to capture every WhatsApp click automatically (TASK 3)
    useEffect(() => {
        const handleGlobalClick = (event: MouseEvent) => {
            const target = (event.target as HTMLElement)?.closest('a, button');
            if (!target) return;

            const href = target instanceof HTMLAnchorElement ? target.href : '';
            const isWhatsApp = href.includes('wa.me') || 
                               href.includes('whatsapp.com') || 
                               target.getAttribute('data-whatsapp') === 'true' ||
                               target.getAttribute('aria-label')?.toLowerCase().includes('whatsapp');

            if (isWhatsApp) {
                const label = target.getAttribute('data-whatsapp-source') || 
                              target.textContent?.trim() || 
                              'whatsapp_link';
                trackWhatsAppClick(label);
            }
        };

        document.addEventListener('click', handleGlobalClick, { capture: true });
        return () => {
            document.removeEventListener('click', handleGlobalClick, { capture: true });
        };
    }, []);
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}

/**
 * KEY EVENT: demo_form_submit
 * Primary Lead Conversion Event in Google Analytics 4.
 * Marked as a Key Event (Conversion) in GA4 property settings.
 */
export function trackDemoFormSubmit(params?: Record<string, any>) {
    // KEY EVENT: demo_form_submit marks primary preview lead generation conversion in GA4
    trackEvent('demo_form_submit', {
        event_category: 'Conversion',
        event_label: 'Free Preview Request',
        ...params
    });
}

/**
 * Client review submission event in GA4.
 */
export function trackReviewSubmit(params?: Record<string, any>) {
    trackEvent('review_submit', {
        event_category: 'Engagement',
        event_label: 'Client Review Submission',
        ...params
    });
}

/**
 * WhatsApp click tracking for all WhatsApp buttons and links.
 */
export function trackWhatsAppClick(source: string, extra?: Record<string, any>) {
    trackEvent('whatsapp_click', {
        event_category: 'Lead',
        event_label: source,
        source,
        ...extra
    });
}
