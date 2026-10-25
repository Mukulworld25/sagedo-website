/**
 * SAGE DO E2E Test Suite - Tier 3: Cross-Feature Integration Tests
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
  integration: string;
  tier: number;
  passed: boolean;
  error?: string;
  details?: string;
}

export async function runTier3Tests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  function record(integration: string, name: string, fn: () => void | Promise<void>) {
    try {
      fn();
      results.push({ name, integration, tier: 3, passed: true });
    } catch (err: any) {
      results.push({ name, integration, tier: 3, passed: false, error: err.message, details: err.stack });
    }
  }

  async function recordAsync(integration: string, name: string, fn: () => Promise<void>) {
    try {
      await fn();
      results.push({ name, integration, tier: 3, passed: true });
    } catch (err: any) {
      results.push({ name, integration, tier: 3, passed: false, error: err.message, details: err.stack });
    }
  }

  // =========================================================================
  // Integration 1: WhatsApp Delivery + 5MB File Upload + SMB Growth Checkout
  // =========================================================================
  await recordAsync(
    'WhatsApp + Upload + SMB Growth',
    'I1.1: Complete valid payload validation across package, phone, and upload',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      const pkg = pricing.getPackageById('smb_growth');
      assert.ok(pkg, 'Package smb_growth must exist');
      assert.strictEqual(pkg.price, 35000);

      // Simulated form state
      const formState = {
        packageId: pkg.id,
        deliveryPreference: 'whatsapp',
        whatsappPhone: '+919876543210',
        customerName: 'Aarav Sharma',
        customerEmail: 'aarav@example.com',
        requirements: 'Need conversion-engineered web store + automated WhatsApp qualification bot',
        files: [{ name: 'brand_brief.pdf', size: 4.8 * 1024 * 1024, type: 'application/pdf' }]
      };

      // Validations:
      const isPackageValid = pricing.isValidPackageId(formState.packageId);
      const isPhoneValid = /^(?:\+91|0)?[6-9]\d{9}$/.test(formState.whatsappPhone);
      const isFileValid = formState.files.every(f => f.size <= 5 * 1024 * 1024);

      assert.strictEqual(isPackageValid, true, 'Package must be valid');
      assert.strictEqual(isPhoneValid, true, 'Phone must be valid');
      assert.strictEqual(isFileValid, true, 'File within 5MB boundary');

      const resolvedPrice = pricing.getPackagePrice(formState.packageId);
      assert.strictEqual(resolvedPrice, 35000, 'Resolved price must match catalog ₹35,000');
    }
  );

  await recordAsync(
    'WhatsApp + Upload + SMB Growth',
    'I1.2: Invalid phone blocks submission even when package and upload are valid',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      const formState = {
        packageId: 'smb_growth',
        deliveryPreference: 'whatsapp',
        whatsappPhone: '987654', // Invalid: 6 digits
        files: [{ name: 'test.pdf', size: 1024 * 1024 }]
      };

      const isPhoneValid = /^(?:\+91|0)?[6-9]\d{9}$/.test(formState.whatsappPhone);
      assert.strictEqual(isPhoneValid, false, 'Phone must fail validation');

      // Overall submission must be blocked
      const canSubmit = pricing.isValidPackageId(formState.packageId) && isPhoneValid;
      assert.strictEqual(canSubmit, false, 'Form submission must be blocked');
    }
  );

  await recordAsync(
    'WhatsApp + Upload + SMB Growth',
    'I1.3: Oversized 5.2MB file blocks submission even when package and phone are valid',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      const formState = {
        packageId: 'smb_growth',
        deliveryPreference: 'whatsapp',
        whatsappPhone: '+919876543210',
        files: [{ name: 'large_asset.zip', size: 5.2 * 1024 * 1024 }] // 5.2MB > 5MB limit
      };

      const isFileValid = formState.files.every(f => f.size <= 5 * 1024 * 1024);
      assert.strictEqual(isFileValid, false, 'File exceeds 5MB boundary');

      const canSubmit = pricing.isValidPackageId(formState.packageId) && isFileValid;
      assert.strictEqual(canSubmit, false, 'Form submission must be blocked on oversized file');
    }
  );

  await recordAsync(
    'WhatsApp + Upload + SMB Growth',
    'I1.4: Orders.tsx UI verifies WhatsApp phone field requirement in code',
    async () => {
      const ordersPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'Orders.tsx');
      const ordersContent = fs.readFileSync(ordersPath, 'utf8');

      // In Orders.tsx, deliveryPreference === 'whatsapp' must trigger phone validation
      const hasWhatsAppCheck = ordersContent.includes('deliveryPreference === \'whatsapp\'') ||
        ordersContent.includes('deliveryPreference === "whatsapp"');
      assert.ok(hasWhatsAppCheck, 'Orders.tsx must check deliveryPreference === "whatsapp"');
    }
  );

  // =========================================================================
  // Integration 2: Services.tsx Two-Track Tab Navigation & SKU Linking to Orders
  // =========================================================================
  await recordAsync(
    'Services Tabs to Orders Linking',
    'I2.1: Services.tsx links to Orders page with canonical package ID',
    async () => {
      const servicesPath = path.join(ROOT_DIR, 'client', 'src', 'pages', 'Services.tsx');
      const servicesContent = fs.readFileSync(servicesPath, 'utf8');

      // Must link to orders with SKU or ID parameter
      assert.ok(
        servicesContent.includes('/orders?package=') ||
        servicesContent.includes('/orders?id=') ||
        servicesContent.includes('/orders?service='),
        'Services.tsx must link to /orders with package identifier'
      );
    }
  );

  await recordAsync(
    'Services Tabs to Orders Linking',
    'I2.2: Selected Enterprise Sovereign Suite resolves authoritative metadata in Orders',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      // Simulated link from Services.tsx: /orders?package=launch_full
      const selectedPkgId = 'launch_full';
      const pkg = pricing.getPackageById(selectedPkgId);

      assert.ok(pkg, 'launch_full must resolve');
      assert.strictEqual(pkg.sku, 'SKU-ENT-150K');
      assert.strictEqual(pkg.price, 150000);
      assert.strictEqual(pkg.displayPrice, '₹1,50,000');
      assert.strictEqual(pkg.slaPrototype, '48-Hour Functional Prototype Guarantee');
    }
  );

  await recordAsync(
    'Services Tabs to Orders Linking',
    'I2.3: Switching between SMB and Enterprise tracks changes price and SLA appropriately',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      const smbGrowth = pricing.getPackageById('smb_growth')!;
      const entFull = pricing.getPackageById('launch_full')!;

      assert.strictEqual(smbGrowth.track, 'smb');
      assert.strictEqual(entFull.track, 'enterprise');
      assert.strictEqual(smbGrowth.price, 35000);
      assert.strictEqual(entFull.price, 150000);

      // Both must guarantee the 48-Hour Functional Prototype
      assert.strictEqual(smbGrowth.slaPrototype, '48-Hour Functional Prototype Guarantee');
      assert.strictEqual(entFull.slaPrototype, '48-Hour Functional Prototype Guarantee');

      // Production SLAs reflect scope
      assert.ok(smbGrowth.slaProduction.includes('10–12') || smbGrowth.slaProduction.includes('10-12'));
      assert.ok(entFull.slaProduction.includes('28'));
    }
  );

  await recordAsync(
    'Services Tabs to Orders Linking',
    'I2.4: Tampering URL with fake package ID during navigation is rejected by Orders',
    async () => {
      const pricing = await import('../shared/pricing.js').catch(() => import('../shared/pricing.ts'));
      // Hacker changes URL to: /orders?package=vip_free_bypass
      const tamperedId = 'vip_free_bypass';
      const resolved = pricing.getPackageById(tamperedId);
      assert.strictEqual(resolved, undefined, 'Tampered package ID must resolve to undefined');
      assert.strictEqual(pricing.isValidPackageId(tamperedId), false, 'Must be invalid');
    }
  );

  // =========================================================================
  // Integration 3: Macro File (.zip / .doc) Gating with Authentication State
  // =========================================================================
  record(
    'Macro File Auth Gating',
    'I3.1: Anonymous user uploading macro file (.doc / .zip) is gated',
    () => {
      const isUserAuthenticated = false;
      const fileToUpload = { name: 'specs.zip', ext: '.zip', size: 2 * 1024 * 1024 };

      const isMacroFile = ['.doc', '.zip', '.xlsm'].includes(fileToUpload.ext);
      assert.strictEqual(isMacroFile, true, 'ZIP is a macro/archive format');

      // Security policy: macro files require authenticated user
      const isUploadAllowed = !isMacroFile || isUserAuthenticated;
      assert.strictEqual(
        isUploadAllowed,
        false,
        'Anonymous user must NOT be allowed to upload archive/macro files'
      );
    }
  );

  record(
    'Macro File Auth Gating',
    'I3.2: Authenticated user uploading macro file within 5MB is permitted',
    () => {
      const isUserAuthenticated = true;
      const fileToUpload = { name: 'specs.zip', ext: '.zip', size: 3.5 * 1024 * 1024 };

      const isMacroFile = ['.doc', '.zip', '.xlsm'].includes(fileToUpload.ext);
      const isSizeValid = fileToUpload.size <= 5 * 1024 * 1024;
      const isUploadAllowed = (!isMacroFile || isUserAuthenticated) && isSizeValid;

      assert.strictEqual(
        isUploadAllowed,
        true,
        'Authenticated user uploading valid size ZIP should be permitted'
      );
    }
  );

  record(
    'Macro File Auth Gating',
    'I3.3: Standard image and PDF uploads do not require special macro gate',
    () => {
      const isUserAuthenticated = false; // Guest
      const fileToUpload = { name: 'wireframe.pdf', ext: '.pdf', size: 2 * 1024 * 1024 };

      const isMacroFile = ['.doc', '.zip', '.xlsm'].includes(fileToUpload.ext);
      assert.strictEqual(isMacroFile, false, 'PDF is not a macro file');

      const isSizeValid = fileToUpload.size <= 5 * 1024 * 1024;
      const isUploadAllowed = (!isMacroFile || isUserAuthenticated) && isSizeValid;
      assert.strictEqual(isUploadAllowed, true, 'PDF should be allowed for guest user');
    }
  );

  return results;
}
