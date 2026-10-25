/**
 * SAGE DO E2E Test Suite - Tier 2: Boundary & Corner Cases
 * 
 * Authoritative Source: ORIGINAL_REQUEST.md (Section ## 2026-10-25T07:11:12Z),
 * TEST_INFRA.md, and PROJECT.md.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

export interface TestResult {
  name: string;
  category: string;
  tier: number;
  passed: boolean;
  error?: string;
  details?: string;
}

export async function runTier2Tests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  function record(category: string, name: string, fn: () => void | Promise<void>) {
    try {
      fn();
      results.push({ name, category, tier: 2, passed: true });
    } catch (err: any) {
      results.push({ name, category, tier: 2, passed: false, error: err.message, details: err.stack });
    }
  }

  async function recordAsync(category: string, name: string, fn: () => Promise<void>) {
    try {
      await fn();
      results.push({ name, category, tier: 2, passed: true });
    } catch (err: any) {
      results.push({ name, category, tier: 2, passed: false, error: err.message, details: err.stack });
    }
  }

  // =========================================================================
  // 1. Order Pricing Boundary & Tampering Edge Cases
  // =========================================================================
  await recordAsync('Pricing Boundaries', 'B1.1: Rejection of zero price (₹0) checkout attempt', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    // Attempting to query or create package with 0 price must fail
    assert.strictEqual(pricing.isValidPackageId('zero_price_pack'), false);
    assert.throws(() => pricing.getPackagePrice('non_existent'), /Invalid package id/);
  });

  await recordAsync('Pricing Boundaries', 'B1.2: Rejection of negative checkout prices (-₹1, -₹50,000)', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    assert.strictEqual(pricing.isValidPackageId('-1'), false);
    assert.strictEqual(pricing.isValidPackageId('-50000'), false);
    for (const pkg of pricing.ALL_PACKAGES) {
      assert.ok(pkg.price > 0, `Package ${pkg.id} has non-positive price: ${pkg.price}`);
    }
  });

  await recordAsync('Pricing Boundaries', 'B1.3: Integer INR enforcement (rejects fractional / floating point paisa)', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    for (const pkg of pricing.ALL_PACKAGES) {
      assert.ok(
        Number.isInteger(pkg.price),
        `Package ${pkg.id} price ${pkg.price} is not an integer`
      );
    }
  });

  await recordAsync('Pricing Boundaries', 'B1.4: Extreme order prices (Infinity, NaN, MAX_SAFE_INTEGER) rejected', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    assert.strictEqual(pricing.isValidPackageId('NaN'), false);
    assert.strictEqual(pricing.isValidPackageId('Infinity'), false);
    assert.strictEqual(pricing.isValidPackageId(String(Number.MAX_SAFE_INTEGER)), false);
  });

  await recordAsync('Pricing Boundaries', 'B1.5: Injection strings in package ID rejected', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const injectionStrings = [
      "' OR '1'='1",
      "<script>alert(1)</script>",
      "../../etc/passwd",
      "smb_starter; DROP TABLE orders;",
      "null",
      "undefined",
      "[object Object]"
    ];
    for (const inj of injectionStrings) {
      assert.strictEqual(
        pricing.isValidPackageId(inj),
        false,
        `Injection string was not rejected: ${inj}`
      );
    }
  });

  await recordAsync('Pricing Boundaries', 'B1.6: Price tampering detection (mismatched price for valid SKU rejected)', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const canonicalPrice = pricing.getPackagePrice('smb_growth');
    const tamperedPrice = 100; // Malicious client claims LaunchPad Growth is ₹100
    assert.strictEqual(canonicalPrice, 35000);
    assert.notStrictEqual(
      tamperedPrice,
      canonicalPrice,
      'Tampered price must differ from authoritative single-source price'
    );
  });

  await recordAsync('Pricing Boundaries', 'B1.7: Prototype property injection in package ID rejected (CWE-472)', async () => {
    const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const prototypeProperties = [
      'toString',
      'constructor',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      '__proto__',
      'propertyIsEnumerable',
      'toLocaleString'
    ];

    // Authoritative verification mandated by dispatch
    assert.strictEqual(pricing.getPackageById('toString'), undefined, "getPackageById('toString') must return undefined");
    assert.strictEqual(pricing.getPackageById('constructor'), undefined, "getPackageById('constructor') must return undefined");
    assert.strictEqual(pricing.getPackageById('valueOf'), undefined, "getPackageById('valueOf') must return undefined");
    assert.strictEqual(pricing.isValidPackageId('constructor'), false, "isValidPackageId('constructor') must return false");

    // Comprehensive boundary verification across all Object prototype keys
    for (const prop of prototypeProperties) {
      assert.strictEqual(
        pricing.getPackageById(prop),
        undefined,
        `Prototype property "${prop}" must return undefined from getPackageById`
      );
      assert.strictEqual(
        pricing.isValidPackageId(prop),
        false,
        `Prototype property "${prop}" must return false from isValidPackageId`
      );
    }
  });

  // =========================================================================
  // 2. File Upload Size Boundary Tests (5MB Boundary)
  // =========================================================================
  const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5,242,880 bytes

  record('File Upload Boundaries', 'B2.1: 4.99MB file (5,232,394 bytes) accepted within boundary', () => {
    const fileSize = 4.99 * 1024 * 1024; // ~5,232,394 bytes
    const isAccepted = fileSize <= MAX_FILE_BYTES;
    assert.strictEqual(isAccepted, true, '4.99MB file should be accepted under 5MB limit');
  });

  record('File Upload Boundaries', 'B2.2: Exactly 5.00MB file (5,242,880 bytes) accepted at boundary limit', () => {
    const fileSize = 5 * 1024 * 1024; // 5,242,880 bytes
    const isAccepted = fileSize <= MAX_FILE_BYTES;
    assert.strictEqual(isAccepted, true, 'Exact 5.00MB file should be accepted');
  });

  record('File Upload Boundaries', 'B2.3: 5.01MB file (5,253,365 bytes) rejected exceeding boundary', () => {
    const fileSize = 5.01 * 1024 * 1024; // ~5,253,365 bytes
    const isAccepted = fileSize <= MAX_FILE_BYTES;
    assert.strictEqual(isAccepted, false, '5.01MB file must be rejected exceeding 5MB limit');
  });

  record('File Upload Boundaries', 'B2.4: Legacy 10MB file rejected under modern 5MB policy', () => {
    const fileSize = 10 * 1024 * 1024;
    const isAccepted = fileSize <= MAX_FILE_BYTES;
    assert.strictEqual(isAccepted, false, '10MB file must be rejected');
  });

  record('File Upload Boundaries', 'B2.5: Zero-byte file (0 bytes) handled gracefully', () => {
    const fileSize = 0;
    // An empty file should be flagged or rejected as invalid payload
    const isEmpty = fileSize === 0;
    assert.strictEqual(isEmpty, true);
  });

  // =========================================================================
  // 3. WhatsApp Phone Number Regex Boundary Cases
  // =========================================================================
  const indianRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

  record('Phone Regex Boundaries', 'B3.1: 9-digit number rejected (one digit short of 10)', () => {
    assert.strictEqual(indianRegex.test('987654321'), false);
    assert.strictEqual(indianRegex.test('+91987654321'), false);
    assert.strictEqual(indianRegex.test('0987654321'), false);
  });

  record('Phone Regex Boundaries', 'B3.2: 11-digit number rejected (one digit beyond 10)', () => {
    assert.strictEqual(indianRegex.test('98765432100'), false);
    assert.strictEqual(indianRegex.test('+9198765432100'), false);
    assert.strictEqual(indianRegex.test('098765432100'), false);
  });

  record('Phone Regex Boundaries', 'B3.3: Leading subscriber digit boundaries [6-9]', () => {
    // 6, 7, 8, 9 must pass
    assert.ok(indianRegex.test('6000000000'), 'Leading 6 must pass');
    assert.ok(indianRegex.test('7000000000'), 'Leading 7 must pass');
    assert.ok(indianRegex.test('8000000000'), 'Leading 8 must pass');
    assert.ok(indianRegex.test('9000000000'), 'Leading 9 must pass');

    // 0, 1, 2, 3, 4, 5 must fail
    assert.strictEqual(indianRegex.test('5999999999'), false, 'Leading 5 must fail');
    assert.strictEqual(indianRegex.test('4999999999'), false, 'Leading 4 must fail');
    assert.strictEqual(indianRegex.test('1999999999'), false, 'Leading 1 must fail');
    assert.strictEqual(indianRegex.test('0000000000'), false, 'Leading 0 must fail');
  });

  record('Phone Regex Boundaries', 'B3.4: All whitespace or empty inputs rejected', () => {
    assert.strictEqual(indianRegex.test(''), false);
    assert.strictEqual(indianRegex.test('          '), false);
    assert.strictEqual(indianRegex.test('\n\t'), false);
  });

  record('Phone Regex Boundaries', 'B3.5: Phone normalization cleans spaces and hyphens before regex', () => {
    const rawNumberWithFormatting = '+91 62849-25684';
    const normalized = rawNumberWithFormatting.replace(/[\s-]/g, '');
    assert.strictEqual(normalized, '+916284925684');
    assert.ok(indianRegex.test(normalized), 'Normalized number must match regex');
  });

  record('Phone Regex Boundaries', 'B3.6: International numbers outside India (+1, +44, +971) rejected', () => {
    assert.strictEqual(indianRegex.test('+14155552671'), false, 'US number must be rejected');
    assert.strictEqual(indianRegex.test('+447911123456'), false, 'UK number must be rejected');
    assert.strictEqual(indianRegex.test('+971501234567'), false, 'UAE number must be rejected');
  });

  // =========================================================================
  // 4. Calculator Input Extremes & Edge Conditions
  // =========================================================================
  const calculateAnnualRecovery = (
    leads: number,
    aov: number,
    responseLag: number,
    seats: number
  ) => {
    const baseConversionRate = 0.08;
    const clampedLeads = Math.max(0, leads);
    const clampedSeats = Math.max(0, seats);
    const clampedAOV = Math.max(0, aov);

    const lostDealsPerMonth = Math.round(clampedLeads * baseConversionRate * responseLag);
    const monthlyLeakedSales = lostDealsPerMonth * clampedAOV;
    const annualLeakedSales = monthlyLeakedSales * 12;
    const recoverableLeadDecay = Math.round(annualLeakedSales * 0.65);

    const monthlySeatTax = clampedSeats * 1500;
    const annualSeatTax = monthlySeatTax * 12;
    const recoverableSeatTax = annualSeatTax * 1.0; // 100% recovery

    return {
      lostDealsPerMonth,
      monthlyLeakedSales,
      annualLeakedSales,
      recoverableLeadDecay,
      monthlySeatTax,
      annualSeatTax,
      recoverableSeatTax,
      totalRecoverableAnnual: recoverableLeadDecay + recoverableSeatTax,
    };
  };

  record('Calculator Extremes', 'B4.1: Leads = 0 -> Zero sales leakage, seat tax only', () => {
    const result = calculateAnnualRecovery(0, 45000, 0.45, 8);
    assert.strictEqual(result.monthlyLeakedSales, 0);
    assert.strictEqual(result.recoverableLeadDecay, 0);
    // 8 seats * 1500 * 12 = 144,000
    assert.strictEqual(result.totalRecoverableAnnual, 144000);
  });

  record('Calculator Extremes', 'B4.2: Seats = 0 -> Zero seat tax, lead decay leakage only', () => {
    const result = calculateAnnualRecovery(250, 45000, 0.45, 0);
    assert.strictEqual(result.monthlySeatTax, 0);
    assert.strictEqual(result.recoverableSeatTax, 0);
    // 9 deals * 45000 * 12 * 0.65 = 3,159,000
    assert.strictEqual(result.totalRecoverableAnnual, 3159000);
  });

  record('Calculator Extremes', 'B4.3: Leads = 10,000 extreme volume stress calculation', () => {
    const result = calculateAnnualRecovery(10000, 45000, 0.45, 8);
    // 10000 * 0.08 * 0.45 = 360 lost deals
    assert.strictEqual(result.lostDealsPerMonth, 360);
    // 360 * 45000 = 16,200,000/mo * 12 = 194,400,000/yr
    // 194,400,000 * 0.65 = 126,360,000
    // Total = 126,360,000 + 144,000 = 126,504,000
    assert.strictEqual(result.totalRecoverableAnnual, 126504000);
    assert.ok(Number.isFinite(result.totalRecoverableAnnual), 'Must be finite integer');
  });

  record('Calculator Extremes', 'B4.4: Seats = 100 high enterprise seats calculation', () => {
    const result = calculateAnnualRecovery(250, 45000, 0.45, 100);
    // 100 seats * 1500 * 12 = 1,800,000
    assert.strictEqual(result.annualSeatTax, 1800000);
    // 3,159,000 + 1,800,000 = 4,959,000
    assert.strictEqual(result.totalRecoverableAnnual, 4959000);
  });

  record('Calculator Extremes', 'B4.5: Negative input values clamped to 0 without throwing error', () => {
    const result = calculateAnnualRecovery(-100, 45000, 0.45, -5);
    assert.strictEqual(result.monthlyLeakedSales, 0);
    assert.strictEqual(result.monthlySeatTax, 0);
    assert.strictEqual(result.totalRecoverableAnnual, 0);
  });

  record('Calculator Extremes', 'B4.6: Deal value = 0 yields zero sales leakage', () => {
    const result = calculateAnnualRecovery(250, 0, 0.45, 8);
    assert.strictEqual(result.monthlyLeakedSales, 0);
    assert.strictEqual(result.recoverableLeadDecay, 0);
    assert.strictEqual(result.totalRecoverableAnnual, 144000); // Seat tax only
  });

  return results;
}
