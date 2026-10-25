/**
 * Canonical Single Source of Truth for SAGE DO Pricing, Packages & SLAs.
 * Covers both commercial tracks:
 * - Track 1: SMB LaunchPad (One-time builds: ₹15,000 / ₹35,000 / ₹95,000)
 * - Track 2: Enterprise Sovereign Suites (Sovereign infrastructure: ₹45,000 / ₹1,50,000 / ₹3,50,000)
 */

export interface PricingPackage {
  id: string; // Canonical SKU ID (e.g. 'smb_starter', 'launch_starter')
  sku: string; // Standardized SKU code (e.g. 'SKU-SMB-15K', 'SKU-ENT-45K')
  track: 'smb' | 'enterprise' | 'combo' | 'consult';
  tier: 1 | 2 | 3;
  name: string;
  tagline: string;
  price: number; // Integer INR strictly enforced
  displayPrice: string; // Formatted price (e.g. '₹15,000', 'Starting at ₹3,50,000')
  priceDisplay: string; // Alias for displayPrice (ensures seamless interop across components)
  deliverySLA: string; // Unified SLA description
  slaPrototype: string; // "48-Hour Functional Prototype Guarantee"
  slaProduction: string; // Production delivery SLA (e.g. '7 calendar days')
  features: string[];
  amcPrice?: string; // Optional maintenance / AMC pricing
  installmentPlan?: string; // Optional installment / milestone payment terms
  isPopular?: boolean; // Highlight flag for recommended tier
}

// ─────────────────────────────────────────────────────────────────────────────
// TRACK 1: SMB LAUNCHPAD (One-Time Builds)
// ─────────────────────────────────────────────────────────────────────────────

export const SMB_LAUNCHPAD_PACKAGES: PricingPackage[] = [
  {
    id: "smb_starter",
    sku: "SKU-SMB-15K",
    track: "smb",
    tier: 1,
    name: "LaunchPad Starter",
    tagline: "Essential market validation & digital foundation",
    price: 15000,
    displayPrice: "₹15,000",
    priceDisplay: "₹15,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 7-Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "7 calendar days",
    features: [
      "5-Page High-Converting Mobile Web Storefront (Sub-1.2s LCP)",
      "WhatsApp Lead Capture & Automated Routing",
      "Google Business Profile Setup & Local Maps",
      "SSL, High-Speed CDN & Sovereign Hosting Setup",
      "Domain Setup + Professional Business Email",
    ],
  },
  {
    id: "smb_growth",
    sku: "SKU-SMB-35K",
    track: "smb",
    tier: 2,
    name: "LaunchPad Growth",
    tagline: "Complete digital acquisition & automated sales engine",
    price: 35000,
    displayPrice: "₹35,000",
    priceDisplay: "₹35,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 10-12 Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "10–12 calendar days",
    isPopular: true,
    features: [
      "10+ Page Conversion-Engineered Architecture + Blog",
      "Custom Lead CRM (Unlimited Seats, Zero User Tax)",
      "WhatsApp Cloud API 24/7 Auto-Qualification Bot",
      "Google Business Profile + Full Local AEO/GEO Setup",
      "Social Media Setup & 30-Day Launch Content Assets",
      "Dynamic Quote Calculator & Automated Lead Alerts",
    ],
  },
  {
    id: "smb_scale",
    sku: "SKU-SMB-95K",
    track: "smb",
    tier: 3,
    name: "LaunchPad Scale",
    tagline: "Automated operations, multi-channel pipelines & full tech stack",
    price: 95000,
    displayPrice: "₹95,000",
    priceDisplay: "₹95,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 15-21 Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "15–21 calendar days",
    features: [
      "Cross-Platform Native Mobile App (Android/iOS) + Web",
      "Advanced Custom CRM with Role-Based Access Control",
      "Automated WhatsApp Follow-ups & Pipeline Stages",
      "Tally Prime / Ledger Bridge Setup",
      "Dedicated Growth Engineer During Launch",
      "Custom Admin Dashboard with Real-Time Analytics",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRACK 2: ENTERPRISE SOVEREIGN SUITES
// ─────────────────────────────────────────────────────────────────────────────

export const ENTERPRISE_SOVEREIGN_SUITES: PricingPackage[] = [
  {
    id: "launch_starter",
    sku: "SKU-ENT-45K",
    track: "enterprise",
    tier: 1,
    name: "Digital Presence Engine",
    tagline: "Inbound lead capture & WhatsApp gateway for rapid market validation",
    price: 45000,
    displayPrice: "₹45,000",
    priceDisplay: "₹45,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 14-Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "14 calendar days",
    amcPrice: "₹15,000/mo",
    installmentPlan: "3 milestone installments from ₹15,000/mo",
    features: [
      "Custom Mobile Web Storefront (Sub-1.2s LCP)",
      "WhatsApp Cloud API Lead Webhook & Automated Qualification",
      "Interactive Dynamic Revenue Calculator / Quoter",
      "Automated Founder WhatsApp Lead Alerts",
      "SSL + High-Performance Edge Setup",
    ],
  },
  {
    id: "launch_full",
    sku: "SKU-ENT-150K",
    track: "enterprise",
    tier: 2,
    name: "Sovereign Revenue Engine™",
    tagline: "Custom revenue generation & WhatsApp sales pipeline infrastructure",
    price: 150000,
    displayPrice: "₹1,50,000",
    priceDisplay: "₹1,50,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 28-Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "28 calendar days (10-gate QA certified)",
    amcPrice: "₹25,000/mo",
    installmentPlan: "3 milestone installments from ₹50,000/mo",
    isPopular: true,
    features: [
      "Full Custom CRM Architecture (Zero Per-Seat Fees, Unlimited Seats)",
      "Automated WhatsApp Lead Routing & Counselor Tracking",
      "Native Tally Prime / ERP Bridge Integration",
      "Real-Time Margin & Sales Velocity Dashboard",
      "Full Source Code & Database Handover",
    ],
  },
  {
    id: "launch_vip",
    sku: "SKU-ENT-350K",
    track: "enterprise",
    tier: 3,
    name: "Enterprise Infrastructure",
    tagline: "Sovereign enterprise infrastructure & automated ERP bridge",
    price: 350000,
    displayPrice: "Starting at ₹3,50,000",
    priceDisplay: "Starting at ₹3,50,000",
    deliverySLA: "48-Hour Functional Prototype Guarantee · 45-60 Day Delivery",
    slaPrototype: "48-Hour Functional Prototype Guarantee",
    slaProduction: "45–60 calendar days",
    amcPrice: "₹35,000/mo",
    installmentPlan: "Custom milestone installments from ₹1,16,667/mo",
    features: [
      "Deep Bi-directional Tally Prime & Ledger Sync",
      "Multi-Branch Quotation & Dispatch Workflows",
      "Custom AI OCR Document Processing Pipeline",
      "Sovereign VPS Deployment (Zero-Data-Retention)",
      "Priority 2-Hour P1 Dedicated Server SLA",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSOLIDATED CATALOG & LOOKUP DICTIONARIES
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_PACKAGES: PricingPackage[] = [
  ...SMB_LAUNCHPAD_PACKAGES,
  ...ENTERPRISE_SOVEREIGN_SUITES,
];

/**
 * Key-value mapping of package ID to PricingPackage for O(1) lookups.
 * Includes canonical IDs and enterprise aliases (e.g. enterprise_starter -> launch_starter).
 */
export const PRICING_PACKAGES: Record<string, PricingPackage> = {
  // Canonical SMB
  smb_starter: SMB_LAUNCHPAD_PACKAGES[0],
  smb_growth: SMB_LAUNCHPAD_PACKAGES[1],
  smb_scale: SMB_LAUNCHPAD_PACKAGES[2],

  // Canonical Enterprise
  launch_starter: ENTERPRISE_SOVEREIGN_SUITES[0],
  launch_full: ENTERPRISE_SOVEREIGN_SUITES[1],
  launch_vip: ENTERPRISE_SOVEREIGN_SUITES[2],

  // Enterprise Aliases for backwards compatibility / alternate naming
  enterprise_starter: ENTERPRISE_SOVEREIGN_SUITES[0],
  enterprise_growth: ENTERPRISE_SOVEREIGN_SUITES[1],
  enterprise_vip: ENTERPRISE_SOVEREIGN_SUITES[2],
  launch_growth: ENTERPRISE_SOVEREIGN_SUITES[1],
};

/**
 * Resolves a PricingPackage by its canonical ID, SKU code, or known alias.
 * Returns undefined if no matching package exists.
 * Hardened against prototype property injection (CWE-472).
 */
export function getPackageById(id: string | null | undefined): PricingPackage | undefined {
  if (!id || typeof id !== 'string') return undefined;
  const trimmed = id.trim();

  // Direct dictionary lookup (covers canonical IDs and aliases) using safe hasOwnProperty check
  if (Object.prototype.hasOwnProperty.call(PRICING_PACKAGES, trimmed)) {
    return PRICING_PACKAGES[trimmed];
  }

  // SKU code or case-insensitive match across all packages
  return ALL_PACKAGES.find(
    (pkg) =>
      pkg.id.toLowerCase() === trimmed.toLowerCase() ||
      pkg.sku.toLowerCase() === trimmed.toLowerCase()
  );
}

/**
 * Alias for getPackageById (convenience for components using getPricingPackage).
 */
export const getPricingPackage = getPackageById;

/**
 * Checks whether an ID or SKU corresponds to a valid pricing package.
 */
export function isValidPackageId(id: string | null | undefined): boolean {
  const pkg = getPackageById(id);
  return pkg !== undefined && typeof pkg === 'object' && typeof pkg.price === 'number';
}

/**
 * Returns the strictly enforced integer price in INR for a given package ID or SKU.
 * Throws an Error if the package ID is invalid.
 */
export function getPackagePrice(id: string): number {
  const pkg = getPackageById(id);
  if (!pkg) {
    throw new Error(`Invalid package id: "${id}". Must be a valid SAGE DO package SKU or ID.`);
  }
  return pkg.price;
}
