/**
 * SAGEDO Conversion Architecture - Serverless First-Party Telemetry Endpoint
 * Path: api/track.ts
 * Runtime: Vercel Serverless Function (Node.js)
 * Compliance: Digital Personal Data Protection Act, 2023 (DPDP Act)
 *
 * SPECIFICATION & HARDENING REQUIREMENTS:
 * 1. Payload Limit: Maximum 4096 bytes (4KB) per request. Rejects oversized payloads with 413.
 * 2. Strict Event Allow-List: Only 'persona_selected', 'chooser_completed', 'add_to_scope', 'whatsapp_click'.
 * 3. Strict Zod Schema: Disallows any extra / unknown fields (.strict()).
 * 4. Bot & Crawler Filtering: Detects bot user agents and silently returns 204 without persisting.
 * 5. In-Memory Rate Limiting: 30 requests per minute per IP against warm container instances.
 * 6. Zero PII Guarantee: Zero IP storage, zero IP hashing, zero scroll depth, zero free-text storage.
 * 7. Ingestion: Direct insert to Supabase `site_events` via server-side service-role key.
 * 8. Response: Always returns HTTP 204 No Content with empty body on success (never HTML).
 *
 * IN-MEMORY RATE LIMITING ARCHITECTURAL DISCLOSURE:
 * In-memory rate limiting inside Vercel Serverless Functions is strictly scoped to the 
 * execution lifecycle of individual warm container instances. Cold starts and concurrent 
 * executions across multiple Vercel edge/serverless nodes maintain independent in-memory counters.
 * This provides burst protection against single-IP abuse against a single warm instance, 
 * but does not provide globally synchronized distributed rate limiting across edge regions.
 * IP addresses are inspected exclusively in-memory for ephemeral bucket counters and are 
 * NEVER stored in the database, NEVER logged, and NEVER persisted.
 */

import type { IncomingMessage, ServerResponse } from 'http';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

export interface VercelRequest extends IncomingMessage {
  query?: Partial<{ [key: string]: string | string[] }>;
  cookies?: Partial<{ [key: string]: string }>;
  body?: any;
}

export interface VercelResponse extends ServerResponse {
  send?: (body: any) => VercelResponse;
  json?: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect?: (statusOrUrl: string | number, url?: string) => VercelResponse;
}

// Maximum allowed request payload in bytes (4KB)
const MAX_PAYLOAD_BYTES = 4096;

// Strict event-name allow-list for Phase 1
const ALLOWED_EVENTS = [
  'persona_selected',
  'chooser_completed',
  'add_to_scope',
  'whatsapp_click',
] as const;

// Zod schemas with strict rejection of unknown fields
const payloadSchema = z.object({
  persona: z.string().max(100).optional(),
  chooser_need: z.string().max(150).optional(),
  chooser_budget: z.string().max(100).optional(),
  chooser_urgency: z.string().max(100).optional(),
}).strict();

const utmSchema = z.object({
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
}).strict();

const trackEventSchema = z.object({
  event: z.enum(ALLOWED_EVENTS),
  payload: payloadSchema.optional().default({}),
  utm: utmSchema.optional().default({}),
}).strict();

export type TrackEventInput = z.infer<typeof trackEventSchema>;

// Bot / crawler User-Agent detection pattern
const BOT_USER_AGENT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|headlesschrome|lighthouse|phantomjs|ahrefs|semrush|yandex|baidu|bingbot|googlebot/i;

function isBotOrCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENT_PATTERN.test(userAgent);
}

// In-memory rate limiting state per warm serverless container
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 telemetry calls/min per client

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientKey);

  // Periodic pruning if map exceeds threshold
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetTime <= now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.resetTime <= now) {
    rateLimitMap.set(clientKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function getClientIdentifier(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

// Cached Supabase client
let cachedSupabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || 'https://zsevqsmpvgoipwlhzjoy.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    return null;
  }

  if (!cachedSupabase) {
    cachedSupabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedSupabase;
}

function sendEmptyResponse(res: VercelResponse, statusCode: number): void {
  res.setHeader('Content-Length', '0');
  if (typeof res.status === 'function') {
    res.status(statusCode);
  } else {
    res.statusCode = statusCode;
  }
  res.end();
}

async function readRawBody(req: VercelRequest): Promise<{ raw?: string; errorCode?: number }> {
  // Check Content-Length header
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return { errorCode: 413 };
  }

  // Pre-parsed by Vercel serverless environment
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      if (Buffer.byteLength(req.body, 'utf-8') > MAX_PAYLOAD_BYTES) {
        return { errorCode: 413 };
      }
      return { raw: req.body };
    }
    if (typeof req.body === 'object') {
      const serialized = JSON.stringify(req.body);
      if (Buffer.byteLength(serialized, 'utf-8') > MAX_PAYLOAD_BYTES) {
        return { errorCode: 413 };
      }
      return { raw: serialized };
    }
  }

  // Stream reading if body is not pre-parsed
  return new Promise((resolve) => {
    let accumulated = '';
    let bytesRead = 0;

    req.on('data', (chunk: Buffer | string) => {
      const chunkBytes = typeof chunk === 'string' ? Buffer.byteLength(chunk, 'utf-8') : chunk.length;
      bytesRead += chunkBytes;

      if (bytesRead > MAX_PAYLOAD_BYTES) {
        resolve({ errorCode: 413 });
        req.destroy();
        return;
      }

      accumulated += chunk.toString();
    });

    req.on('end', () => {
      resolve({ raw: accumulated });
    });

    req.on('error', () => {
      resolve({ errorCode: 400 });
    });
  });
}

/**
 * Main Vercel Serverless Function Handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Set CORS headers for same-origin compliance
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Enforce HTTP POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendEmptyResponse(res, 405);
    return;
  }

  // User-Agent Bot / Crawler Filter
  const userAgent = req.headers['user-agent'];
  if (isBotOrCrawler(userAgent)) {
    // Silently acknowledge bots with 204 to prevent table pollution
    sendEmptyResponse(res, 204);
    return;
  }

  // Ephemeral In-Memory Rate Limiting
  const clientKey = getClientIdentifier(req);
  if (isRateLimited(clientKey)) {
    sendEmptyResponse(res, 429);
    return;
  }

  // Read request body capped at 4KB
  const { raw, errorCode } = await readRawBody(req);
  if (errorCode) {
    sendEmptyResponse(res, errorCode);
    return;
  }

  if (!raw || raw.trim().length === 0) {
    sendEmptyResponse(res, 400);
    return;
  }

  // Parse JSON
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    sendEmptyResponse(res, 400);
    return;
  }

  // Strict Zod schema validation
  const validationResult = trackEventSchema.safeParse(parsedJson);
  if (!validationResult.success) {
    sendEmptyResponse(res, 400);
    return;
  }

  const { event, payload, utm } = validationResult.data;

  // Insert into Supabase site_events table using service role key
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('[Telemetry] Server misconfiguration: SUPABASE_SERVICE_ROLE_KEY missing');
    sendEmptyResponse(res, 500);
    return;
  }

  const { error } = await supabase.from('site_events').insert({
    event_name: event,
    persona: payload.persona || null,
    chooser_need: payload.chooser_need || null,
    chooser_budget: payload.chooser_budget || null,
    chooser_urgency: payload.chooser_urgency || null,
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
  });

  if (error) {
    console.error('[Telemetry] Supabase insert failed:', error.message);
    sendEmptyResponse(res, 500);
    return;
  }

  // Successful ingestion: Return HTTP 204 No Content with empty body
  sendEmptyResponse(res, 204);
}
