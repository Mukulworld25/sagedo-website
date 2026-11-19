/**
 * SAGEDO - Serverless Testimonials Submission Endpoint
 * Path: api/testimonials.ts
 * Runtime: Vercel Serverless Function (Node.js)
 *
 * SPECIFICATION & HARDENING REQUIREMENTS:
 * 1. POST only: Rejects all other methods with 405.
 * 2. Payload Limit: Maximum 8192 bytes (8KB). Rejects oversized with 413.
 * 3. Honeypot Field: Detects bot submissions via hidden 'website' or 'hp' field.
 * 4. In-Memory Rate Limiting: 10 requests per 10-minute window per IP.
 * 5. Strict Zod Validation: Validates name, business, rating, review, consent.
 * 6. Authenticated Ingestion: Direct insert using server-only SUPABASE_SERVICE_ROLE_KEY.
 * 7. Error Handling: Returns clean JSON errors with no stack traces; returns 201 only on success.
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

const MAX_PAYLOAD_BYTES = 8192; // 8KB

const testimonialSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().min(1, 'Name is required').max(150),
  business: z.string({ required_error: 'Business is required' }).trim().min(1, 'Business is required').max(150),
  rating: z.coerce.number({ required_error: 'Rating is required' }).int().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
  written_review: z.string({ required_error: 'Written review is required' }).trim().min(1, 'Written review is required').max(3000),
  consent: z.boolean({ required_error: 'Consent is required' }),
  media_url: z.string().url().max(1000).nullable().optional(),
  media_type: z.enum(['image', 'video']).nullable().optional(),
  status: z.enum(['pending', 'objection_feedback']).optional().default('pending'),
  // Honeypot fields
  hp: z.string().max(100).optional(),
  website: z.string().max(100).optional(),
});

// Rate limiting: 10 requests per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetTime <= now) rateLimitMap.delete(key);
    }
  }

  if (!record || record.resetTime <= now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

let cachedSupabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || 'https://zsevqsmpvgoipwlhzjoy.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) return null;

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

function sendJson(res: VercelResponse, statusCode: number, data: Record<string, any>): void {
  const body = JSON.stringify(data);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(body, 'utf-8').toString());
  if (typeof res.status === 'function') {
    res.status(statusCode);
  } else {
    res.statusCode = statusCode;
  }
  res.end(body);
}

async function readRequestBody(req: VercelRequest): Promise<{ raw?: string; errorCode?: number }> {
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return { errorCode: 413 };
  }

  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      if (Buffer.byteLength(req.body, 'utf-8') > MAX_PAYLOAD_BYTES) return { errorCode: 413 };
      return { raw: req.body };
    }
    if (typeof req.body === 'object') {
      const serialized = JSON.stringify(req.body);
      if (Buffer.byteLength(serialized, 'utf-8') > MAX_PAYLOAD_BYTES) return { errorCode: 413 };
      return { raw: serialized };
    }
  }

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

    req.on('end', () => resolve({ raw: accumulated }));
    req.on('error', () => resolve({ errorCode: 400 }));
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // 1. Method check: POST only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed. Use POST.' });
  }

  // 2. Per-IP rate limiting
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, { error: 'Too many requests. Please try again later.' });
  }

  // 3. Read body with 8KB limit
  const { raw, errorCode } = await readRequestBody(req);
  if (errorCode) {
    const errorMsg = errorCode === 413 ? 'Payload too large. Maximum 8KB allowed.' : 'Bad request body.';
    return sendJson(res, errorCode, { error: errorMsg });
  }

  let parsedJson: any;
  try {
    parsedJson = raw ? JSON.parse(raw) : {};
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON payload.' });
  }

  // 4. Honeypot check
  if (parsedJson.hp || parsedJson.website) {
    return sendJson(res, 400, { error: 'Spam submission rejected.' });
  }

  // 5. Zod schema validation
  const validationResult = testimonialSchema.safeParse(parsedJson);
  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0];
    const message = firstIssue ? firstIssue.message : 'Validation failed.';
    return sendJson(res, 400, { error: message });
  }

  const { name, business, rating, written_review, consent, media_url, media_type, status } = validationResult.data;

  // 6. Supabase client check
  const supabase = getSupabaseClient();
  if (!supabase) {
    return sendJson(res, 500, { error: 'Server configuration error.' });
  }

  // 7. Insert to Supabase with status='pending' (or 'objection_feedback')
  try {
    const { data, error: insertError } = await supabase
      .from('testimonials')
      .insert([
        {
          name,
          business,
          rating,
          written_review,
          consent,
          media_url: media_url || null,
          media_type: media_type || null,
          status: status || 'pending',
        },
      ])
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase testimonials insert failed:', insertError.message);
      return sendJson(res, 500, { error: 'Failed to record testimonial in database.' });
    }

    if (!data || !data.id) {
      return sendJson(res, 500, { error: 'Failed to confirm testimonial record creation.' });
    }

    return sendJson(res, 201, {
      success: true,
      id: data.id,
      message: 'Review submitted successfully.',
    });
  } catch (err: any) {
    console.error('Unexpected error during testimonial insertion:', err?.message || err);
    return sendJson(res, 500, { error: 'Internal server error while processing review.' });
  }
}
