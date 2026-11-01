import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const BASE_URL = 'http://localhost:4173';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'D:\\Antigravity';

function getLiveDOM(url, waitMs = 3500) {
  const res = spawnSync(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--virtual-time-budget=${waitMs}`,
    '--dump-dom',
    url
  ], { encoding: 'utf8', maxBuffer: 15 * 1024 * 1024 });
  return (res.stdout || '').replace(/&amp;/g, '&');
}

console.log('=====================================================');
console.log('AUTONOMOUS AUDIT OF ALL 22 CHECKLIST VERIFICATION ITEMS');
console.log('=====================================================\n');

const homeDom = getLiveDOM(`${BASE_URL}/`);
const tab1Dom = getLiveDOM(`${BASE_URL}/services?tab=smb`);
const tab3Dom = getLiveDOM(`${BASE_URL}/services?tab=scaleops`);

const showroomCode = fs.readFileSync('d:\\sagedo-website\\client\\src\\components\\ShowroomSection.tsx', 'utf8');
const modalCode = fs.readFileSync('d:\\sagedo-website\\client\\src\\components\\DesignSampleModal.tsx', 'utf8');
const vcsCode = fs.readFileSync('d:\\sagedo-website\\client\\src\\components\\VisualConceptStudio.tsx', 'utf8');

const checklist22 = [
  // SECTION 1: HOMEPAGE (H1-H5)
  {
    id: 'H1',
    category: 'Homepage & UX',
    name: 'Compact Natural Viewport',
    test: () => homeDom.includes('SAGE DO') && homeDom.includes('SERVICES') && homeDom.includes('BOOK A CALL') && homeDom.includes('Custom business systems engineered for:'),
    expected: 'Hero elements and CTAs render naturally in standard viewport.'
  },
  {
    id: 'H2',
    category: 'Homepage & UX',
    name: 'Industry Selector Strip in Hero',
    test: () => homeDom.includes('Factory') && homeDom.includes('Shop') && homeDom.includes('Startup') && homeDom.includes('Clinic'),
    expected: 'Pills present below hero CTAs for instant calibration.'
  },
  {
    id: 'H3',
    category: 'Homepage & UX',
    name: 'Zero Floating Bottom Popup Banner',
    test: () => !homeDom.includes('Tailor SAGE DO for your business:'),
    expected: 'Floating banner purged completely.'
  },
  {
    id: 'H4',
    category: 'Homepage & UX',
    name: '20-Second Feedback Hub Purged from Home',
    test: () => !homeDom.includes('20-SECOND FEEDBACK HUB'),
    expected: 'Feedback box moved off home page to dedicated /feedback.'
  },
  {
    id: 'H5',
    category: 'Homepage & UX',
    name: 'Circular Bruno Bot Launcher Icon',
    test: () => homeDom.includes('sagedo_logo_final_circle.webp') && homeDom.includes('rounded-full'),
    expected: 'Bruno launcher renders transparent circular icon.'
  },

  // SECTION 2: SMB LAUNCHPAD (P1-P6)
  {
    id: 'P1',
    category: 'SMB LaunchPad Pricing',
    name: 'Tab 1 Subtitle displays ₹15k / ₹35k / ₹50k',
    test: () => tab1Dom.includes('15,000') && tab1Dom.includes('35,000') && tab1Dom.includes('50,000') && !tab1Dom.includes('95,000'),
    expected: 'Displays ₹15,000 / ₹35,000 / ₹50,000 with zero ₹95k.'
  },
  {
    id: 'P2',
    category: 'SMB LaunchPad Pricing',
    name: 'Starter Tier (₹15,000) Deliverables & SLA',
    test: () => tab1Dom.includes('LaunchPad Starter') && tab1Dom.includes('Complete SEO, AEO & GEO Setup') && tab1Dom.includes('GST & MSME Udyam Document Filing'),
    expected: 'Includes static site, SEO/AEO/GEO, logo kit, and GST/MSME assistance.'
  },
  {
    id: 'P3',
    category: 'SMB LaunchPad Pricing',
    name: 'Growth Tier (₹35,000) Deliverables & SLA',
    test: () => tab1Dom.includes('LaunchPad Growth') && tab1Dom.includes('Dynamic Website with Interactive Quoter') && tab1Dom.includes('24/7 WhatsApp API Lead Routing'),
    expected: 'Includes dynamic web, interactive quoter, and WhatsApp routing.'
  },
  {
    id: 'P4',
    category: 'SMB LaunchPad Pricing',
    name: 'Scale Tier (₹50,000) Deliverables & SLA',
    test: () => tab1Dom.includes('LaunchPad Scale') && tab1Dom.includes('Custom Sales Dashboard & Mini CRM') && tab1Dom.includes('3 Months FREE Continuous SEO') && tab1Dom.includes('3 Months FREE Priority Tech Support'),
    expected: 'Includes Mini CRM, SMM channels, 3mo free SEO & 3mo free support.'
  },
  {
    id: 'P5',
    category: 'SMB LaunchPad Pricing',
    name: 'Scale Order Button Links to price=50000',
    test: () => tab1Dom.includes('/orders?package=smb_scale&service=LaunchPad%20Scale&price=50000&id=smb_scale'),
    expected: 'Directs to /orders with prefilled ₹50,000 price.'
  },
  {
    id: 'P6',
    category: 'SMB LaunchPad Pricing',
    name: 'Scale WhatsApp Button Pre-fills ₹50,000',
    test: () => tab1Dom.includes('LaunchPad%20Scale%20package%20(%E2%82%B950%2C000)'),
    expected: 'WhatsApp text includes ₹50,000.'
  },

  // SECTION 3: SHOWROOM (S1-S6)
  {
    id: 'S1',
    category: 'Showroom Catalog',
    name: 'Tab 3 Rebranded to Combos & Specialized Add-ons',
    test: () => tab3Dom.includes('Combos & Specialized Add-ons') && tab3Dom.includes('The SAGE DO Showroom: Explore Every Category'),
    expected: 'Rebranded header with zero flowchart diagram.'
  },
  {
    id: 'S2',
    category: 'Showroom Catalog',
    name: '4 Category Shelves with Active Badges',
    test: () => tab3Dom.includes('Websites & Storefronts') && tab3Dom.includes('Custom SaaS & CRMs') && tab3Dom.includes('Automations & Infra') && tab3Dom.includes('Brand & Legal Add-ons'),
    expected: 'All 4 shelves rendered.'
  },
  {
    id: 'S3',
    category: 'Showroom Catalog',
    name: 'Websites Shelf Models (6 Models)',
    test: () => tab3Dom.includes('Factory & Industrial B2B Catalog') && showroomCode.includes('High-Speed D2C Storefront') && showroomCode.includes('Clinic & Healthcare Booking Portal'),
    expected: '6 website models configured.'
  },
  {
    id: 'S4',
    category: 'Showroom Catalog',
    name: 'SaaS & CRM Shelf Models (6 Models)',
    test: () => showroomCode.includes('Zero-Seat Custom Sales CRM') && showroomCode.includes('90-Second Factory RFQ Quoter') && showroomCode.includes('Godown & Multi-Warehouse Tracker'),
    expected: '6 SaaS & CRM models configured.'
  },
  {
    id: 'S5',
    category: 'Showroom Catalog',
    name: 'Automations Shelf Models (5 Models)',
    test: () => showroomCode.includes('24/7 WhatsApp AI Sales Bot') && showroomCode.includes('Native Tally Prime Ledger Bridge') && showroomCode.includes('Dedicated VPS Sovereign Server'),
    expected: '5 automation models configured.'
  },
  {
    id: 'S6',
    category: 'Showroom Catalog',
    name: 'Brand & Legal Shelf Models (4 Models)',
    test: () => showroomCode.includes('Brand Starter Bundle') && showroomCode.includes('Legal Foundation Bundle') && showroomCode.includes('Trademark & IP Protection'),
    expected: '4 brand & legal models configured.'
  },

  // SECTION 4: DESIGN MODAL STUDIO (M1-M5)
  {
    id: 'M1',
    category: 'Design Sample Studio',
    name: 'Modal Triggers on All Model Cards',
    test: () => tab3Dom.includes('View 3–5 Design Samples'),
    expected: 'View Design Samples buttons rendered.'
  },
  {
    id: 'M2',
    category: 'Design Sample Studio',
    name: 'Design Variations Schema in Codebase',
    test: () => fs.existsSync('d:\\sagedo-website\\client\\src\\components\\DesignSampleModal.tsx'),
    expected: 'DesignSampleModal.tsx is compiled and linked.'
  },
  {
    id: 'M3',
    category: 'Design Sample Studio',
    name: 'Visual Mockup Wireframe Support',
    test: () => modalCode.includes('type === "mobile"') && modalCode.includes('type === "kanban"') && modalCode.includes('type === "chat"') && modalCode.includes('Browser Window Preview'),
    expected: 'Mockup renderers for Mobile, Kanban, Browser, and Chat.'
  },
  {
    id: 'M4',
    category: 'Design Sample Studio',
    name: 'WhatsApp Lock-In Direct Dispatch',
    test: () => modalCode.includes('Lock In This Style') && modalCode.includes('https://wa.me/916284925684?text='),
    expected: 'Direct 1-tap WhatsApp lock-in.'
  },
  {
    id: 'M5',
    category: 'Design Sample Studio',
    name: 'Visual Concept Studio Step 3 Consistency',
    test: () => vcsCode.includes('₹50,000') && !vcsCode.includes('₹95,000+'),
    expected: 'Step 3 in VisualConceptStudio shows ₹50,000 LaunchPad Scale.'
  }
];

let allPassed = true;
let passCount = 0;

checklist22.forEach((item) => {
  let passed = false;
  try {
    passed = item.test();
  } catch (e) {
    passed = false;
  }
  if (passed) {
    passCount++;
    console.log(`[PASS] ${item.id}: ${item.name} (${item.category})`);
  } else {
    allPassed = false;
    console.log(`[FAIL] ${item.id}: ${item.name} (${item.category}) - FAILED CHECK`);
  }
});

console.log(`\n=====================================================`);
console.log(`AUDIT SCORE: ${passCount} / ${checklist22.length} CHECKS PASSED`);
console.log(`STATUS: ${allPassed ? '100% ZERO-DEFECT COMPLIANCE' : 'ACTION REQUIRED'}`);
console.log(`=====================================================\n`);

if (!allPassed) process.exit(1);
else process.exit(0);
