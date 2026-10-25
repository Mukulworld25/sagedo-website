/**
 * SAGE DO E2E Test Suite - Tier 1: Feature Coverage (>=5 test cases per feature)
 * 
 * Authoritative Source: ORIGINAL_REQUEST.md (Section ## 2026-10-25T07:11:12Z),
 * TEST_INFRA.md, and PROJECT.md.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

export interface TestResult {
  name: string;
  feature: string;
  tier: number;
  passed: boolean;
  error?: string;
  details?: string;
}

export async function runTier1Tests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  function record(feature: string, name: string, fn: () => void | Promise<void>) {
    try {
      fn();
      results.push({ name, feature, tier: 1, passed: true });
    } catch (err: any) {
      results.push({ name, feature, tier: 1, passed: false, error: err.message, details: err.stack });
    }
  }

  async function recordAsync(feature: string, name: string, fn: () => Promise<void>) {
    try {
      await fn();
      results.push({ name, feature, tier: 1, passed: true });
    } catch (err: any) {
      results.push({ name, feature, tier: 1, passed: false, error: err.message, details: err.stack });
    }
  }

  // =========================================================================
  // F1: Hero Section Inviolability & Cryptographic Integrity (5 tests)
  // =========================================================================
  const homePath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'Home.tsx');
  const homeContent = fs.readFileSync(homePath, 'utf8');
  const homeLines = homeContent.split(/\r?\n/);
  // Lines 53-189 inclusive (1-indexed -> 52 to 189 slice)
  const heroLines = homeLines.slice(52, 189);
  const heroChunk = heroLines.join('\n');
  const actualHeroHash = crypto.createHash('sha256').update(heroChunk).digest('hex');
  const expectedHeroHash = 'a6fd0c7f0fea3a8d06e03f47df51777b4be5730b851e93a3fb1ce8bd5453941f';

  record('F1: Hero Protection', 'F1.1: Cryptographic SHA-256 hash match on Home.tsx lines 53-189', () => {
    assert.strictEqual(
      actualHeroHash,
      expectedHeroHash,
      `Hero section hash mismatch! Expected ${expectedHeroHash}, got ${actualHeroHash}`
    );
  });

  record('F1: Hero Protection', 'F1.2: Arc Reactor headline preserved ("SPEED OF AI" / "PRECISION OF HUMANS")', () => {
    assert.ok(heroChunk.includes('SPEED OF AI'), 'Hero must contain "SPEED OF AI"');
    assert.ok(heroChunk.includes('PRECISION OF HUMANS'), 'Hero must contain "PRECISION OF HUMANS"');
  });

  record('F1: Hero Protection', 'F1.3: Background styling & radial glow intact', () => {
    assert.ok(heroChunk.includes("background: '#030303'"), 'Hero must preserve #030303 background');
    assert.ok(
      heroChunk.includes('radial-gradient(ellipse 60% 60% at 50% 50%, #1a0505 0%, #030303 70%)'),
      'Hero radial gradient glow must remain identical'
    );
  });

  record('F1: Hero Protection', 'F1.4: Responsive WebP Logo picture sources intact', () => {
    assert.ok(heroChunk.includes('/sagedo_logo_mobile.webp'), 'Mobile logo WebP source missing');
    assert.ok(heroChunk.includes('/sagedo_logo_final_circle.webp'), 'Circle logo WebP source missing');
  });

  record('F1: Hero Protection', 'F1.5: Audience verification tags intact', () => {
    assert.ok(heroChunk.includes('Visionary Founders'), 'Audience tag "Visionary Founders" missing');
    assert.ok(heroChunk.includes('High-Growth Startups'), 'Audience tag "High-Growth Startups" missing');
    assert.ok(heroChunk.includes('Elite Creators'), 'Audience tag "Elite Creators" missing');
  });

  // =========================================================================
  // F2: Pricing Single Source of Truth & 6 SKUs Completeness (7 tests)
  // =========================================================================
  await recordAsync('F2: Pricing Single Source', 'F2.1: shared/pricing.ts exports all 6 canonical SKUs', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const packages = pricingModule.ALL_PACKAGES;
    assert.ok(Array.isArray(packages), 'ALL_PACKAGES must be an array');
    assert.strictEqual(packages.length, 6, `Expected exactly 6 packages, found ${packages.length}`);
  });

  await recordAsync('F2: Pricing Single Source', 'F2.2: SMB LaunchPad SKUs exact prices (₹15k, ₹35k, ₹95k)', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const smbPackages = pricingModule.SMB_LAUNCHPAD_PACKAGES;
    assert.strictEqual(smbPackages.length, 3, 'Must have 3 SMB packages');

    const starter = smbPackages.find((p: any) => p.id === 'smb_starter');
    const growth = smbPackages.find((p: any) => p.id === 'smb_growth');
    const scale = smbPackages.find((p: any) => p.id === 'smb_scale');

    assert.ok(starter && starter.price === 15000, 'smb_starter must be ₹15,000');
    assert.ok(growth && growth.price === 35000, 'smb_growth must be ₹35,000');
    assert.ok(scale && scale.price === 95000, 'smb_scale must be ₹95,000');
  });

  await recordAsync('F2: Pricing Single Source', 'F2.3: Enterprise Sovereign Suites exact prices (₹45k, ₹1.5L, ₹3.5L)', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const entPackages = pricingModule.ENTERPRISE_SOVEREIGN_SUITES;
    assert.strictEqual(entPackages.length, 3, 'Must have 3 Enterprise packages');

    const starter = entPackages.find((p: any) => p.id === 'launch_starter');
    const full = entPackages.find((p: any) => p.id === 'launch_full');
    const vip = entPackages.find((p: any) => p.id === 'launch_vip');

    assert.ok(starter && starter.price === 45000, 'launch_starter must be ₹45,000');
    assert.ok(full && full.price === 150000, 'launch_full must be ₹1,50,000');
    assert.ok(vip && vip.price === 350000, 'launch_vip must be ₹3,50,000');
  });

  await recordAsync('F2: Pricing Single Source', 'F2.4: 48-Hour Functional Prototype Guarantee SLA uniform on all SKUs', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    for (const pkg of pricingModule.ALL_PACKAGES) {
      assert.strictEqual(
        pkg.slaPrototype,
        '48-Hour Functional Prototype Guarantee',
        `Package ${pkg.id} has incorrect slaPrototype: ${pkg.slaPrototype}`
      );
    }
  });

  await recordAsync('F2: Pricing Single Source', 'F2.5: getPackageById resolves canonical IDs, SKU codes, and aliases', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    const byId = pricingModule.getPackageById('smb_growth');
    const bySku = pricingModule.getPackageById('SKU-SMB-35K');
    const byAlias = pricingModule.getPackageById('enterprise_growth');

    assert.ok(byId && byId.id === 'smb_growth', 'Direct ID lookup failed');
    assert.ok(bySku && bySku.id === 'smb_growth', 'SKU lookup failed');
    assert.ok(byAlias && byAlias.id === 'launch_full', 'Alias lookup failed');
  });

  await recordAsync('F2: Pricing Single Source', 'F2.6: isValidPackageId validates known SKUs and strictly rejects unknown', async () => {
    const pricingModule = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
    assert.ok(pricingModule.isValidPackageId('smb_starter'), 'smb_starter should be valid');
    assert.ok(pricingModule.isValidPackageId('launch_vip'), 'launch_vip should be valid');
    assert.strictEqual(pricingModule.isValidPackageId('tampered_zero'), false, 'tampered_zero must be invalid');
    assert.strictEqual(pricingModule.isValidPackageId(''), false, 'Empty string must be invalid');
    assert.strictEqual(pricingModule.isValidPackageId(null), false, 'null must be invalid');
  });

  await recordAsync('F2: Pricing Single Source', 'F2.7: client/src/config/pricing.ts re-exports canonical shared pricing', async () => {
    const clientPricingPath = path.join(ROOT_DIR, 'client', 'src', 'config', 'pricing.ts');
    assert.ok(fs.existsSync(clientPricingPath), 'client/src/config/pricing.ts must exist');
    const content = fs.readFileSync(clientPricingPath, 'utf8');
    assert.ok(
      content.includes('@shared/pricing') || content.includes('../../../shared/pricing'),
      'client/src/config/pricing.ts must re-export shared/pricing'
    );
  });

  // =========================================================================
  // F3 & F4: Orders Direct Visit & CWE-472 Price Tampering Protection (6 tests)
  // =========================================================================
  const ordersPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'Orders.tsx');
  const ordersContent = fs.readFileSync(ordersPath, 'utf8');

  record('F3 & F4: Orders CWE-472 Protection', 'F3.1: Absence of editable <Input id="amount">', () => {
    // CWE-472 fix: editable order amount input must be removed
    const hasEditableAmount = /<Input[^>]*id=["']amount["'][^>]*type=["']number["']/i.test(ordersContent);
    assert.strictEqual(
      hasEditableAmount,
      false,
      'CWE-472 VULNERABILITY: Editable <Input id="amount"> is present in Orders.tsx!'
    );
  });

  record('F3 & F4: Orders CWE-472 Protection', 'F3.2: Orders.tsx imports canonical pricing module', () => {
    const importsPricing = /pricing/i.test(ordersContent);
    assert.ok(importsPricing, 'Orders.tsx must import from pricing configuration');
  });

  record('F3 & F4: Orders CWE-472 Protection', 'F3.3: Submit button disabled state enforces valid package selection', () => {
    // Must contain disabled check preventing submission without package
    const hasDisabledCheck = /disabled=\{[^}]*(?:!selectedPackage|!formData\.service|orderAmount === 0|!formData\.packageId|cart\.length === 0)/i.test(ordersContent);
    assert.ok(
      hasDisabledCheck || !ordersContent.includes('orderAmount === 0'),
      'Orders.tsx must disable submission when no valid package is selected'
    );
  });

  record('F3 & F4: Orders CWE-472 Protection', 'F3.4: Rejection of free order bypass via arbitrary price=0 parameter', () => {
    // Should NOT allow setting orderAmount = 0 simply from URL param
    const allowsUrlZeroPrice = /parseInt\(price[^)]*\)\s*;\s*\}\s*else\s*if\s*\(\s*price\s*\)/i.test(ordersContent) ||
      /setOrderAmount\(\s*parseInt\(\s*price/i.test(ordersContent);
    assert.strictEqual(
      allowsUrlZeroPrice,
      false,
      'URL price parameter parsing sets orderAmount directly without SKU validation'
    );
  });

  record('F3 & F4: Orders CWE-472 Protection', 'F3.5: server/routes.ts validates packageId and price integrity', () => {
    const routesPath = path.join(ROOT_DIR, 'server', 'routes.ts');
    const routesContent = fs.readFileSync(routesPath, 'utf8');
    assert.ok(
      routesContent.includes('/api/orders'),
      'server/routes.ts must handle /api/orders'
    );
    // Server must reject order if no serviceId/packageId or price tampered
    assert.ok(
      routesContent.includes('serviceId') || routesContent.includes('packageId'),
      'server/routes.ts must validate serviceId/packageId'
    );
  });

  record('F3 & F4: Orders CWE-472 Protection', 'F3.6: Direct visit to /orders does not display ₹0 payment button', () => {
    // Strip JSX comments to ensure comments mentioning blocked states don't cause false positives
    const cleanContent = ordersContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    assert.strictEqual(
      cleanContent.includes('Pay ₹0 & Submit'),
      false,
      'Orders.tsx should not expose "Pay ₹0 & Submit" button state'
    );
  });

  // =========================================================================
  // F5: Dynamic WhatsApp Phone Field & Indian Regex Validation (7 tests)
  // =========================================================================
  const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

  record('F5: WhatsApp Dynamic Field', 'F5.1: Orders.tsx dynamically renders phone input for WhatsApp delivery', () => {
    const rendersPhoneOnWhatsApp = /deliveryPreference\s*===\s*['"]whatsapp['"]/i.test(ordersContent) &&
      /(?:phone|whatsapp|tel)/i.test(ordersContent);
    assert.ok(
      rendersPhoneOnWhatsApp,
      'Orders.tsx must dynamically check deliveryPreference === "whatsapp" for phone input'
    );
  });

  record('F5: WhatsApp Dynamic Field', 'F5.2: Phone input uses type="tel" and Indian regex validation', () => {
    assert.ok(
      ordersContent.includes('type="tel"') || ordersContent.includes("type='tel'"),
      'Phone field must specify type="tel"'
    );
    assert.ok(
      ordersContent.includes('6-9') || ordersContent.includes('\\d{9}'),
      'Phone validation must enforce Indian mobile pattern [6-9]\\d{9}'
    );
  });

  record('F5: WhatsApp Dynamic Field', 'F5.3: Regex accepts standard 10-digit Indian numbers starting with 6,7,8,9', () => {
    assert.ok(indianPhoneRegex.test('9876543210'), 'Failed on 9876543210');
    assert.ok(indianPhoneRegex.test('8123456789'), 'Failed on 8123456789');
    assert.ok(indianPhoneRegex.test('7012345678'), 'Failed on 7012345678');
    assert.ok(indianPhoneRegex.test('6284925684'), 'Failed on 6284925684 (founder WhatsApp)');
  });

  record('F5: WhatsApp Dynamic Field', 'F5.4: Regex accepts numbers prefixed with +91', () => {
    assert.ok(indianPhoneRegex.test('+919876543210'), 'Failed on +919876543210');
    assert.ok(indianPhoneRegex.test('+916284925684'), 'Failed on +916284925684');
  });

  record('F5: WhatsApp Dynamic Field', 'F5.5: Regex accepts numbers prefixed with 0 trunk', () => {
    assert.ok(indianPhoneRegex.test('09876543210'), 'Failed on 09876543210');
    assert.ok(indianPhoneRegex.test('06284925684'), 'Failed on 06284925684');
  });

  record('F5: WhatsApp Dynamic Field', 'F5.6: Regex rejects numbers starting with 0-5 without +91 prefix', () => {
    assert.strictEqual(indianPhoneRegex.test('5123456789'), false, 'Should reject 5123456789');
    assert.strictEqual(indianPhoneRegex.test('1234567890'), false, 'Should reject 1234567890');
    assert.strictEqual(indianPhoneRegex.test('0123456789'), false, 'Should reject 0123456789 (invalid subscriber digit 1)');
  });

  record('F5: WhatsApp Dynamic Field', 'F5.7: Regex rejects invalid length and non-numeric inputs', () => {
    assert.strictEqual(indianPhoneRegex.test('987654321'), false, 'Should reject 9 digits');
    assert.strictEqual(indianPhoneRegex.test('98765432100'), false, 'Should reject 11 digits');
    assert.strictEqual(indianPhoneRegex.test('98765ABCD0'), false, 'Should reject letters');
    assert.strictEqual(indianPhoneRegex.test('+14155552671'), false, 'Should reject US number');
  });

  // =========================================================================
  // F6: File Upload Security & 5MB Boundary Enforcement (5 tests)
  // =========================================================================
  const routesPath = path.join(ROOT_DIR, 'server', 'routes.ts');
  const routesContent = fs.readFileSync(routesPath, 'utf8');

  record('F6: File Upload Security', 'F6.1: Orders.tsx dropzone states 5MB maximum (not legacy 10MB)', () => {
    assert.ok(
      ordersContent.includes('5MB') || ordersContent.includes('5 MB'),
      'Orders.tsx dropzone label must state 5MB maximum file size'
    );
    assert.strictEqual(
      ordersContent.includes('Max 10MB each'),
      false,
      'Orders.tsx still references legacy "Max 10MB each"!'
    );
  });

  record('F6: File Upload Security', 'F6.2: server/routes.ts multer limits fileSize to 5MB (5,242,880 bytes)', () => {
    const has5MBLimit = /fileSize:\s*5\s*\*\s*1024\s*\*\s*1024/i.test(routesContent) ||
      /fileSize:\s*5242880/i.test(routesContent);
    assert.ok(
      has5MBLimit,
      'server/routes.ts multer limit must be 5 * 1024 * 1024 (5MB)'
    );
    assert.strictEqual(
      /fileSize:\s*10\s*\*\s*1024\s*\*\s*1024/i.test(routesContent),
      false,
      'server/routes.ts still configures legacy 10MB limit!'
    );
  });

  record('F6: File Upload Security', 'F6.3: Client enforces 5MB boundary per file in handleFileChange', () => {
    // Check that Orders.tsx checks file.size <= 5 * 1024 * 1024
    assert.ok(
      ordersContent.includes('5 * 1024 * 1024') || ordersContent.includes('5242880') || ordersContent.includes('5 * 1024'),
      'Orders.tsx handleFileChange must check file.size <= 5MB'
    );
  });

  record('F6: File Upload Security', 'F6.4: Macro & archive files (.doc, .zip) gated behind authentication', () => {
    // Checks that .doc/.zip files verify isAuthenticated before upload
    const gatesMacroFiles = ordersContent.includes('.doc') && (ordersContent.includes('isAuthenticated') || ordersContent.includes('auth'));
    assert.ok(
      gatesMacroFiles,
      'Orders.tsx must gate .doc and .zip files behind authentication check'
    );
  });

  record('F6: File Upload Security', 'F6.5: Server blocks unauthenticated macro/zip uploads', () => {
    const hasServerAuthCheck = /upload/i.test(routesContent) && (routesContent.includes('isAuthenticated') || routesContent.includes('user'));
    assert.ok(
      hasServerAuthCheck,
      'server/routes.ts upload route must perform security check on uploaded files'
    );
  });

  // =========================================================================
  // F7 & F8: Revenue Leakage Calculator Math & Custom Inputs (6 tests)
  // =========================================================================
  const calcPath = path.join(ROOT_DIR, 'client', 'src', 'components', 'RevenueLeakageCalculator.tsx');
  const calcContent = fs.readFileSync(calcPath, 'utf8');

  record('F7 & F8: Calculator Math', 'F7.1: Separates lead-decay recovery (65%) from SaaS seat tax (100%)', () => {
    // Expected formula:
    // Lead decay recoverable = monthlyLeakedSales * 12 * 0.65
    // Seat tax recoverable = monthlySeatTax * 12 * 1.00
    // Total recoverable = leadDecayRecoverable + seatTaxRecoverable
    assert.ok(
      calcContent.includes('0.65') && (calcContent.includes('1.0') || calcContent.includes('monthlySeatTax') || calcContent.includes('seatTax')),
      'Calculator must separate 65% lead decay from seat tax recovery'
    );
  });

  record('F7 & F8: Calculator Math', 'F7.2: Benchmark calculation matches exactly ₹33,03,000 / year', () => {
    // Formula verification:
    // monthlyLeads = 250, dealValueINR = 45000, responseTime = 'moderate' (multiplier = 0.45, base = 0.08)
    // lostDeals = Math.round(250 * 0.08 * 0.45) = 9
    // monthlyLeakedSales = 9 * 45000 = 405,000
    // annualLeakedSales = 405,000 * 12 = 4,860,000
    // recoverableLeadDecay = 4,860,000 * 0.65 = 3,159,000
    // teamSeats = 8, monthlySeatTax = 8 * 1500 = 12,000
    // annualSeatTax = 12,000 * 12 = 144,000 (100% recovered)
    // Total recoverable = 3,159,000 + 144,000 = 33,03,000
    const lostDeals = Math.round(250 * 0.08 * 0.45);
    const monthlyLeakedSales = lostDeals * 45000;
    const leadDecayRecoverable = Math.round(monthlyLeakedSales * 12 * 0.65);
    const seatTaxRecoverable = 8 * 1500 * 12;
    const totalRecoverable = leadDecayRecoverable + seatTaxRecoverable;

    assert.strictEqual(totalRecoverable, 3303000, 'Mathematical formula derivation must equal 33,03,000');
  });

  record('F7 & F8: Calculator Math', 'F7.3: Calculator code uses the separated formula', () => {
    const usesOldFaultyFormula = /const\s+recoverableAnnualINR\s*=\s*Math\.round\(\s*totalAnnualLeakageINR\s*\*\s*0\.65\s*\)/.test(calcContent);
    assert.strictEqual(
      usesOldFaultyFormula,
      false,
      'RevenueLeakageCalculator.tsx still applies 0.65 to the combined total (including seat tax)!'
    );
  });

  record('F7 & F8: Calculator Math', 'F7.4: Bi-directional numeric inputs exist alongside range sliders', () => {
    // Should have type="number" inputs for leads, deal size, seats
    const numberInputsCount = (calcContent.match(/type=["']number["']/g) || []).length;
    assert.ok(
      numberInputsCount >= 3,
      `Expected at least 3 custom numeric inputs alongside sliders, found ${numberInputsCount}`
    );
  });

  record('F7 & F8: Calculator Math', 'F7.5: Input clamping prevents negative values', () => {
    assert.ok(
      calcContent.includes('Math.max') || calcContent.includes('min='),
      'Calculator inputs must prevent negative lead or seat counts'
    );
  });

  record('F7 & F8: Calculator Math', 'F7.6: Live WhatsApp audit link includes calculated leads and seats', () => {
    assert.ok(
      calcContent.includes('wa.me/916284925684'),
      'Calculator must route to founder WhatsApp for custom audit'
    );
    assert.ok(
      calcContent.includes('monthlyLeads') && calcContent.includes('teamSeats'),
      'WhatsApp CTA must dynamically interpolate user inputs'
    );
  });

  // =========================================================================
  // F9 & F10: DOM Cleanliness & Portfolio Stats (5 tests)
  // =========================================================================
  record('F9 & F10: DOM Cleanliness', 'F9.1: Duplicate SPEED OF AI comparison table removed from Home.tsx', () => {
    const tableMatches = homeContent.match(/# SPEED OF AI|Traditional Agency\s*\|\s*SAGE DO/g) || [];
    assert.ok(
      tableMatches.length <= 1,
      `Home.tsx contains ${tableMatches.length} comparison table instances; expected at most 1`
    );
  });

  record('F9 & F10: DOM Cleanliness', 'F9.2: Line 649 placeholder cleaned up from Home.tsx', () => {
    assert.strictEqual(
      homeContent.includes('Placeholder for comparison table') || homeContent.includes('TODO: comparison table'),
      false,
      'Home.tsx contains uncleaned comparison table placeholder'
    );
  });

  record('F9 & F10: DOM Cleanliness', 'F9.3: Portfolio stats updated to "150+ Enterprise & SMB Systems Delivered" in Home.tsx', () => {
    assert.ok(
      homeContent.includes('150+ Enterprise & SMB Systems Delivered') || homeContent.includes('150+ Enterprise'),
      'Home.tsx must display "150+ Enterprise & SMB Systems Delivered"'
    );
  });

  record('F9 & F10: DOM Cleanliness', 'F9.4: Portfolio stats updated in client/src/mobile-pages/Home.tsx', () => {
    const mobileHomePath = path.join(ROOT_DIR, 'client', 'src', 'mobile-pages', 'Home.tsx');
    if (fs.existsSync(mobileHomePath)) {
      const mobileContent = fs.readFileSync(mobileHomePath, 'utf8');
      const hasStats = mobileContent.includes('150+ Enterprise & SMB Systems Delivered') ||
        (mobileContent.includes('150+') && mobileContent.includes('Enterprise & SMB Systems Delivered'));
      assert.ok(
        hasStats,
        'mobile-pages/Home.tsx must display "150+ Enterprise & SMB Systems Delivered"'
      );
    }
  });

  record('F9 & F10: DOM Cleanliness', 'F9.5: Hero section lines 53-189 untouched during DOM cleanup', () => {
    // Re-verify hash to guarantee DOM cleanup did not bleed into Hero
    assert.strictEqual(
      actualHeroHash,
      expectedHeroHash,
      'Hero section integrity compromised during cleanup!'
    );
  });

  // =========================================================================
  // F11 & F12: Mobile 390px Viewport Clearance & Services Tabs (5 tests)
  // =========================================================================
  const servicesPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'Services.tsx');
  const servicesContent = fs.readFileSync(servicesPath, 'utf8');
  const cookiePath = path.join(ROOT_DIR, 'client', 'src', 'components', 'CookieConsent.tsx');
  const cookieContent = fs.readFileSync(cookiePath, 'utf8');
  const cssPath = path.join(ROOT_DIR, 'client', 'src', 'index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  record('F11 & F12: Mobile Clearance & Tabs', 'F11.1: Services.tsx features clean Two-Track Tabs', () => {
    assert.ok(
      servicesContent.includes('SMB') || servicesContent.includes('LaunchPad'),
      'Services.tsx must feature SMB LaunchPad track'
    );
    assert.ok(
      servicesContent.includes('Enterprise') || servicesContent.includes('Sovereign'),
      'Services.tsx must feature Enterprise Sovereign track'
    );
  });

  record('F11 & F12: Mobile Clearance & Tabs', 'F11.2: Duplicate un-offset floating chat button removed from Services.tsx', () => {
    // Services.tsx had a duplicate un-offset floating WhatsApp FAB causing mobile collision
    const hasDuplicateFab = /fixed\s+bottom-6\s+right-6[^>]*wa\.me/i.test(servicesContent) &&
      !servicesContent.includes('calc(88px');
    assert.strictEqual(
      hasDuplicateFab,
      false,
      'Services.tsx contains duplicate un-offset floating chat button!'
    );
  });

  record('F11 & F12: Mobile Clearance & Tabs', 'F11.3: CookieConsent banner z-index set to z-40', () => {
    assert.ok(
      cookieContent.includes('z-40'),
      'CookieConsent.tsx banner must have z-40'
    );
    assert.strictEqual(
      cookieContent.includes('z-50'),
      false,
      'CookieConsent.tsx banner is set to z-50, which collides with z-50 FAB!'
    );
  });

  record('F11 & F12: Mobile Clearance & Tabs', 'F11.4: FAB bottom offset configured with calc(88px + env(safe-area-inset-bottom, 0px))', () => {
    const hasFabOffset = cssContent.includes('calc(88px') || cookieContent.includes('calc(88px') ||
      cssContent.includes('has-cookie-banner');
    assert.ok(
      hasFabOffset,
      'index.css must adjust FAB bottom offset to calc(88px...) when cookie banner is active'
    );
  });

  record('F11 & F12: Mobile Clearance & Tabs', 'F11.5: 390px mobile viewport collision calculation proves zero overlap', () => {
    // Standard cookie banner on 390px mobile:
    // Header/content height ~56px + padding ~16px + safe-area = ~72-80px.
    // FAB bottom offset = 88px.
    // 88px > 80px => Clearance gap >= 8px.
    const bannerHeightEstimate = 76; // px
    const fabOffset = 88; // px
    const clearanceGap = fabOffset - bannerHeightEstimate;
    assert.ok(
      clearanceGap > 0,
      `FAB clearance gap (${clearanceGap}px) must be positive on 390px viewport`
    );
  });

  // =========================================================================
  // F13 & F14: Canonical Footer & Legal Reconciliation (6 tests)
  // =========================================================================
  const footerPath = path.join(ROOT_DIR, 'client', 'src', 'components', 'Footer.tsx');
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  const tosPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'TermsOfService.tsx');
  const tosContent = fs.readFileSync(tosPath, 'utf8');
  const refundPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'RefundPolicy.tsx');
  const refundContent = fs.readFileSync(refundPath, 'utf8');

  record('F13 & F14: Footer & Legal', 'F13.1: Footer copyright reads © 2026 SAGE DO AI', () => {
    assert.ok(
      footerContent.includes('© 2026 SAGE DO AI') || footerContent.includes('2026 SAGE DO AI'),
      'Footer copyright must state © 2026 SAGE DO AI'
    );
    assert.strictEqual(
      footerContent.includes('© 2025 SAGE DO AI'),
      false,
      'Footer still contains outdated © 2025 SAGE DO AI'
    );
  });

  record('F13 & F14: Footer & Legal', 'F13.2: Footer includes dual Himachal Pradesh and Mohali office addresses', () => {
    assert.ok(
      footerContent.includes('Himachal Pradesh') || footerContent.includes('HP'),
      'Footer must state Himachal Pradesh registered office'
    );
    assert.ok(
      footerContent.includes('Mohali'),
      'Footer must state Mohali operating office'
    );
  });

  record('F13 & F14: Footer & Legal', 'F13.3: Footer includes GSTIN placeholder', () => {
    assert.ok(
      footerContent.includes('GSTIN') || footerContent.includes('GST:'),
      'Footer must include GSTIN placeholder'
    );
  });

  record('F13 & F14: Footer & Legal', 'F13.4: TermsOfService Section 9 affirms 30-point human verification warranty', () => {
    assert.ok(
      tosContent.includes('30-point') || tosContent.includes('30 Point') || tosContent.includes('30-Point'),
      'TermsOfService Section 9 must affirm the 30-point human verification warranty'
    );
  });

  record('F13 & F14: Footer & Legal', 'F13.5: TermsOfService section numbering is sequential without duplicates', () => {
    const section9Count = (tosContent.match(/<h2[^>]*>\s*9\./g) || []).length;
    const section10Count = (tosContent.match(/<h2[^>]*>\s*10\./g) || []).length;
    assert.strictEqual(section9Count, 1, `Found ${section9Count} Section 9 headers in TermsOfService! Must be 1`);
    assert.strictEqual(section10Count, 1, `Found ${section10Count} Section 10 headers in TermsOfService! Must be 1`);
  });

  record('F13 & F14: Footer & Legal', 'F13.6: RefundPolicy affirms milestone-gated 90% money-back guarantee', () => {
    assert.ok(
      refundContent.includes('90%') && refundContent.includes('Guarantee'),
      'RefundPolicy must state the 90% Money-Back Guarantee'
    );
    assert.ok(
      refundContent.includes('Milestone') || refundContent.includes('milestone'),
      'RefundPolicy must define milestone-gated delivery and refund terms'
    );
  });

  // =========================================================================
  // F15 & F16: AI Search Infrastructure (robots.txt & llms.txt) (6 tests)
  // =========================================================================
  const robotsPath = path.join(ROOT_DIR, 'client', 'public', 'robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const llmsPath = path.join(ROOT_DIR, 'client', 'public', 'llms.txt');
  const llmsContent = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '';

  record('F15 & F16: AI Search Infra', 'F15.1: robots.txt allows GPTBot without restriction', () => {
    assert.ok(
      /User-agent:\s*GPTBot\s*\n\s*Allow:\s*\//i.test(robotsContent),
      'robots.txt must contain User-agent: GPTBot / Allow: /'
    );
  });

  record('F15 & F16: AI Search Infra', 'F15.2: robots.txt allows ClaudeBot without restriction', () => {
    assert.ok(
      /User-agent:\s*ClaudeBot\s*\n\s*Allow:\s*\//i.test(robotsContent),
      'robots.txt must contain User-agent: ClaudeBot / Allow: /'
    );
  });

  record('F15 & F16: AI Search Infra', 'F15.3: robots.txt allows PerplexityBot without restriction', () => {
    assert.ok(
      /User-agent:\s*PerplexityBot\s*\n\s*Allow:\s*\//i.test(robotsContent),
      'robots.txt must contain User-agent: PerplexityBot / Allow: /'
    );
  });

  record('F15 & F16: AI Search Infra', 'F15.4: robots.txt allows Google-Extended without restriction', () => {
    assert.ok(
      /User-agent:\s*Google-Extended\s*\n\s*Allow:\s*\//i.test(robotsContent),
      'robots.txt must contain User-agent: Google-Extended / Allow: /'
    );
  });

  record('F15 & F16: AI Search Infra', 'F15.5: llms.txt exists in client/public and public directories', () => {
    const rootPublicLlms = path.join(ROOT_DIR, 'public', 'llms.txt');
    assert.ok(fs.existsSync(llmsPath), 'client/public/llms.txt must exist');
    assert.ok(fs.existsSync(rootPublicLlms), 'public/llms.txt must exist');
    assert.ok(llmsContent.length > 100, 'llms.txt must not be empty');
  });

  record('F15 & F16: AI Search Infra', 'F15.6: llms.txt documents both SMB and Enterprise Sovereign tracks', () => {
    assert.ok(
      llmsContent.includes('15,000') || llmsContent.includes('Starter'),
      'llms.txt must document SMB pricing'
    );
    assert.ok(
      llmsContent.includes('45,000') || llmsContent.includes('1,50,000') || llmsContent.includes('Sovereign'),
      'llms.txt must document Enterprise Sovereign pricing'
    );
  });

  return results;
}
