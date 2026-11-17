/**
 * SAGEDO Conversion Architecture - Client Telemetry Subsystem
 * Path: client/src/lib/telemetry.ts
 *
 * SPECIFICATION & HARDENING REQUIREMENTS:
 * 1. Scope: Bundled exclusively into the /visibility chunk (zero homepage footprint).
 * 2. DPDP Act 2023 Consent Gating: Strict validation against `localStorage.getItem('cookie-consent') === 'accepted'`.
 *    If consent is withheld or unset, no beacon is dispatched and queues are cleared.
 * 3. Beacon Transport: `navigator.sendBeacon('/api/track', blob)` with `text/plain` to prevent CORS preflight.
 * 4. Resilient Fallback: `fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, keepalive: true })`
 *    if sendBeacon is unavailable or fails.
 * 5. Lifecycle Flush: Auto-flushes buffered events on `visibilitychange` (state hidden) and `pagehide`.
 * 6. Allowed Signals: Strictly limited to the 4 permitted high-intent actions.
 */

export type AllowedEvent =
  | 'persona_selected'
  | 'chooser_completed'
  | 'add_to_scope'
  | 'whatsapp_click';

export interface PersonaSelectedPayload {
  persona: string;
}

export interface ChooserCompletedPayload {
  chooser_need: string;
  chooser_budget: string;
  chooser_urgency: string;
  persona?: string;
}

export interface AddToScopePayload {
  chooser_need: string;
  chooser_budget: string;
  chooser_urgency: string;
  persona?: string;
}

export interface WhatsAppClickPayload {
  chooser_need?: string;
  chooser_budget?: string;
  chooser_urgency?: string;
  persona?: string;
}

export type TrackPayload =
  | PersonaSelectedPayload
  | ChooserCompletedPayload
  | AddToScopePayload
  | WhatsAppClickPayload
  | Record<string, string | undefined>;

export interface UtmParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface TelemetryEnvelope {
  event: AllowedEvent;
  payload: TrackPayload;
  utm: UtmParameters;
}

const TELEMETRY_ENDPOINT = '/api/track';
let eventQueue: string[] = [];
let isListenerAttached = false;

/**
 * Strict Consent Verification
 * In compliance with DPDP Act 2023, telemetry signals are only emitted
 * when affirmative consent is recorded in local storage.
 */
export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem('cookie-consent') === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Extracts referral UTM tags from window.location.search
 */
export function getUtmParameters(): UtmParameters {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UtmParameters = {};
    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');

    if (source) utm.utm_source = source.slice(0, 100);
    if (medium) utm.utm_medium = medium.slice(0, 100);
    if (campaign) utm.utm_campaign = campaign.slice(0, 100);

    return utm;
  } catch {
    return {};
  }
}

/**
 * Attaches pagehide and visibilitychange lifecycle listeners for reliable beacon flush
 */
function setupVisibilityFlushListener(): void {
  if (typeof window === 'undefined' || isListenerAttached) return;

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      flushQueue();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', () => flushQueue());
  isListenerAttached = true;
}

/**
 * Dispatches a single serialized payload via sendBeacon with text/plain,
 * falling back to keepalive fetch.
 */
function dispatchPayload(payloadStr: string): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Primary path: navigator.sendBeacon with text/plain Blob
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([payloadStr], { type: 'text/plain;charset=UTF-8' });
      const queued = navigator.sendBeacon(TELEMETRY_ENDPOINT, blob);
      if (queued) {
        return true;
      }
    } catch {
      // Fall through to keepalive fetch
    }
  }

  // 2. Fallback path: fetch with keepalive: true
  try {
    if (typeof fetch === 'function') {
      fetch(TELEMETRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: payloadStr,
        keepalive: true,
      }).catch(() => {
        // Silently swallow network/offline transmission errors
      });
      return true;
    }
  } catch {
    // Suppress network errors in unsupporting environments
  }

  return false;
}

/**
 * Flushes all pending queued events to the telemetry endpoint
 */
export function flushQueue(): void {
  if (!hasConsent() || eventQueue.length === 0) {
    if (!hasConsent()) {
      eventQueue = [];
    }
    return;
  }

  const batch = [...eventQueue];
  eventQueue = [];

  for (const item of batch) {
    dispatchPayload(item);
  }
}

/**
 * Core event tracking dispatcher
 */
export function trackEvent(
  event: AllowedEvent,
  payload: TrackPayload = {}
): void {
  // DPDP Consent Gate
  if (!hasConsent()) {
    return;
  }

  setupVisibilityFlushListener();

  const envelope: TelemetryEnvelope = {
    event,
    payload,
    utm: getUtmParameters(),
  };

  const serialized = JSON.stringify(envelope);
  eventQueue.push(serialized);
  flushQueue();
}

/**
 * Helper: Track persona selection on /visibility switcher
 */
export function trackPersonaSelected(persona: string): void {
  trackEvent('persona_selected', { persona });
}

/**
 * Helper: Track 3-tap chooser completion
 */
export function trackChooserCompleted(payload: ChooserCompletedPayload): void {
  trackEvent('chooser_completed', payload);
}

/**
 * Helper: Track "Add to Custom Scope" CTA action
 */
export function trackAddToScope(payload: AddToScopePayload): void {
  trackEvent('add_to_scope', payload);
}

/**
 * Helper: Track WhatsApp conversation launch with pre-filled parameters
 */
export function trackWhatsAppClick(payload: WhatsAppClickPayload): void {
  trackEvent('whatsapp_click', payload);
}
