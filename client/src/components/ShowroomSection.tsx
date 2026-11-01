import React, { useState } from "react";
import { 
  Globe, 
  Cpu, 
  Zap, 
  FileText, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Sliders,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import DesignSampleModal, { ShowroomModel } from "./DesignSampleModal";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

type ShowroomCategory = "websites" | "saas" | "automation" | "brand";

const CATEGORIES: { id: ShowroomCategory; label: string; count: number; icon: any; tagline: string }[] = [
  { id: "websites", label: "Websites & Storefronts", count: 6, icon: Globe, tagline: "High-converting mobile storefronts, B2B catalogs & portals" },
  { id: "saas", label: "Custom SaaS & CRMs", count: 6, icon: Cpu, tagline: "Zero-seat sales CRMs, quotation engines & inventory portals" },
  { id: "automation", label: "Automations & Infra", count: 5, icon: Zap, tagline: "WhatsApp Cloud bots, Tally Prime sync & dedicated VPS servers" },
  { id: "brand", label: "Brand & Legal Add-ons", count: 4, icon: FileText, tagline: "Logos, GST/MSME compliance, trademarks & investor decks" },
];

const SHOWROOM_MODELS: ShowroomModel[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. WEBSITES & STOREFRONTS (6 MODELS)
  // ─────────────────────────────────────────────────────────────
  {
    id: "factory_b2b_catalog",
    name: "Factory & Industrial B2B Catalog",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for manufacturers, exporters, and OEM suppliers",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "spec_heavy",
        title: "Technical Spec Sheet Archetype",
        archetype: "Technical Spec",
        accentColor: "amber",
        timeline: "7 Calendar Days",
        price: "₹15,000",
        description: "Dense technical spec sheets, CAD/PDF download gates, and 1-tap bulk order RFQs on WhatsApp.",
        features: ["Sub-1s Mobile 4G Load", "PDF Spec Download Capture", "Direct WhatsApp RFQ Routing", "Google Maps Local 3-Pack"],
        mockupType: "browser"
      },
      {
        id: "corporate_machinery",
        title: "Modern Machinery Showcase",
        archetype: "Corporate Industrial",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹15,000",
        description: "Heavy visual machinery showcase, factory floor credentials, ISO compliance badges, and founder vision.",
        features: ["Machinery Video/Gallery Embed", "ISO & MSME Credibility Badges", "Wholesale Inquiry Trigger", "Multi-Warehouse Location Map"],
        mockupType: "browser"
      },
      {
        id: "instant_quoter_site",
        title: "Interactive RFQ Quoter Webfront",
        archetype: "Dynamic Quoting",
        accentColor: "emerald",
        timeline: "10–12 Days",
        price: "₹35,000",
        description: "Interactive quoter built right into the hero. Buyers select material dimensions and get quotes in 90 seconds.",
        features: ["Dynamic Weight/Margin Calculator", "Instant WhatsApp Quote Dispatch", "Dealer Login Verification", "Zero Inquiry Leakage"],
        mockupType: "browser"
      },
      {
        id: "factory_full_suite",
        title: "Autonomous Factory Hub (Web + CRM + Tally)",
        archetype: "Complete B2B Engine",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Full web storefront synced with custom dealer CRM and Tally Prime dispatch notifications.",
        features: ["Full B2B Webfront + Dealer CRM", "Tally Prime Ledger Bridge Sync", "Unlimited Staff & Dispatch Logins", "3 Months Free Tech Support & SEO"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "d2c_ecommerce_storefront",
    name: "High-Speed D2C Storefront",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for consumer brands, fashion, and packaged goods",
    startingPrice: "₹25,000",
    variations: [
      {
        id: "velocity_checkout",
        title: "1-Tap UPI Fast Checkout Archetype",
        archetype: "Conversion Speed",
        accentColor: "emerald",
        timeline: "7 Calendar Days",
        price: "₹25,000",
        description: "Sub-0.8s mobile storefront with native GPay/PhonePe/Paytm 1-tap checkout, slashing cart abandonment.",
        features: ["Sub-0.8s LCP on Indian 4G", "1-Tap UPI Native Checkout", "Automated WhatsApp Order Confirmation", "Meta CAPI Pixel Tracking"],
        mockupType: "mobile"
      },
      {
        id: "story_brand_d2c",
        title: "Editorial Brand Narrative Archetype",
        archetype: "Premium Brand",
        accentColor: "amber",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Visual-rich storytelling with interactive ingredients, review walls, and bundle upsell carousels.",
        features: ["Ingredient & Story Sliders", "Verified Review Carousel", "1-Click Upsell Drawer", "Google Shopping Feed Sync"],
        mockupType: "mobile"
      },
      {
        id: "abandoned_cart_engine",
        title: "Automated WhatsApp Cart Recovery Hub",
        archetype: "Cart Recovery",
        accentColor: "blue",
        timeline: "12 Days",
        price: "₹35,000",
        description: "Recovers 38% of dropped carts via automated 42-second WhatsApp recovery discounts.",
        features: ["42-Second WhatsApp Abandoned Recovery", "Dynamic Coupon Injection", "Instagram/Facebook Shop Sync", "Courier Shipping API Ready"],
        mockupType: "mobile"
      },
      {
        id: "complete_d2c_engine",
        title: "Complete D2C Machine (Storefront + CRM + SMM)",
        archetype: "Complete Growth Engine",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Full headless storefront + custom customer repeat CRM + Meta Ad funnel setup + 90 days free support.",
        features: ["Headless Custom Storefront", "Customer LTV & Repeat Order CRM", "Meta/Google Ads Setup & Attribution", "3 Months Free Maintenance & SEO"],
        mockupType: "mobile"
      }
    ]
  },
  {
    id: "clinic_doctor_portal",
    name: "Clinic & Healthcare Booking Portal",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for doctors, dental clinics, and wellness centers",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "instant_booking_clinic",
        title: "1-Tap WhatsApp Appointment Archetype",
        archetype: "Direct Booking",
        accentColor: "emerald",
        timeline: "7 Calendar Days",
        price: "₹15,000",
        description: "Loads in under 1 second on mobile. Patients select doctor slot and get automated WhatsApp confirmation.",
        features: ["Google Maps Local 3-Pack Optimization", "Sub-1s Mobile Appointment Scheduler", "Automated 2h WhatsApp Reminders", "Doctor Availability Calendar"],
        mockupType: "mobile"
      },
      {
        id: "trust_heavy_clinic",
        title: "Clinical Trust & Treatment Cost Guide",
        archetype: "Clinical Trust",
        accentColor: "blue",
        timeline: "10 Days",
        price: "₹25,000",
        description: "Transparent procedure pricing calculator, doctor credentials, patient video reviews, and clinic tour.",
        features: ["Interactive Procedure Estimator", "Verified Patient Testimonial Hub", "Doctor Accreditation Showcase", "Emergency Call & Location HUD"],
        mockupType: "browser"
      },
      {
        id: "multi_specialty_clinic",
        title: "Multi-Specialty & Doctor Department Hub",
        archetype: "Departmental Portal",
        accentColor: "amber",
        timeline: "12 Days",
        price: "₹35,000",
        description: "Departmental directory, doctor profile tabs, online prescription downloads, and lab report tracking.",
        features: ["Department-Specific Booking Funnels", "Online Report Download Gateway", "Doctor Profile & Schedule Matrix", "Multi-Branch Clinic Selector"],
        mockupType: "browser"
      },
      {
        id: "complete_clinic_os",
        title: "Complete Clinic OS (Website + Patient CRM)",
        archetype: "Full Clinic Operating System",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Patient booking portal + custom front-desk EHR/CRM + WhatsApp recall bot + 3 months search ranking.",
        features: ["Patient Booking Portal + Reception CRM", "Automated 6-Month WhatsApp Recall", "Unlimited Reception & Doctor Seats", "3 Months Free Local Rank Protection"],
        mockupType: "kanban"
      }
    ]
  },
  {
    id: "coaching_edtech_platform",
    name: "Coaching & EdTech Platform",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for institutes, tuition centers, and course creators",
    startingPrice: "₹20,000",
    variations: [
      {
        id: "admission_funnel_ed",
        title: "High-Velocity Student Admission Funnel",
        archetype: "Inquiry Velocity",
        accentColor: "amber",
        timeline: "7 Calendar Days",
        price: "₹20,000",
        description: "Batch schedule timetable, fee comparison calculator, syllabus PDF downloads, and WhatsApp inquiry routing.",
        features: ["Syllabus Download Lead Gate", "Batch Schedule & Seat Counter", "Direct Counselor WhatsApp Routing", "Google Maps Local Student Discovery"],
        mockupType: "browser"
      },
      {
        id: "dynamic_course_lms",
        title: "Dynamic Course Catalog & Fee Payment Hub",
        archetype: "Interactive Catalog",
        accentColor: "emerald",
        timeline: "10–12 Days",
        price: "₹35,000",
        description: "Dynamic course modules, online installment fee gateway, mock test downloads, and student portal.",
        features: ["Dynamic Course Database", "Installment Fee Payment Gateway", "Faculty Profile & Result Showcase", "Automated Fee Receipt Generation"],
        mockupType: "browser"
      },
      {
        id: "full_coaching_machine",
        title: "Autonomous Institute Machine (Portal + CRM)",
        archetype: "Complete Institute Machine",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Full website + custom counselor CRM tracking 5,000 student leads + zero monthly user fees.",
        features: ["Admission Portal + Counselor CRM", "WhatsApp Follow-up Automation", "Unlimited Counselor & Teacher Seats", "3 Months Free Tech Support & SEO"],
        mockupType: "kanban"
      },
      {
        id: "hybrid_video_portal",
        title: "Video Lecture & Recorded Class Archive",
        archetype: "Video Learning",
        accentColor: "blue",
        timeline: "14 Days",
        price: "₹45,000",
        description: "Encrypted video player, chapter-wise notes downloads, student login credentials, and attendance log.",
        features: ["Encrypted Video Playback", "Chapter-wise PDF Notes Repository", "Student Device Restriction Locks", "Admin Enrollment Dashboard"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "hyperlocal_retail_menu",
    name: "Hyperlocal Retail & Salon Menu",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for retail outlets, showrooms, restaurants, and salons",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "local_maps_menu",
        title: "Google Maps 3-Pack Local Discovery Menu",
        archetype: "Local Dominance",
        accentColor: "emerald",
        timeline: "5 Calendar Days",
        price: "₹15,000",
        description: "Mobile catalog engineered to rank in Google Local 3-Pack. Customers browse menu and call/WhatsApp instantly.",
        features: ["Google Maps Local Ranking Optimization", "Sub-0.8s Mobile Service Menu", "1-Tap Click-to-Call & WhatsApp", "Opening Hours & Live Direction Map"],
        mockupType: "mobile"
      },
      {
        id: "qr_catalog_store",
        title: "In-Store QR Code Digital Catalog",
        archetype: "In-Store Digital Menu",
        accentColor: "amber",
        timeline: "7 Calendar Days",
        price: "₹18,000",
        description: "Printable counter QR code opens live interactive digital catalog on customer phones without any app install.",
        features: ["Instant Mobile Web App (Zero Install)", "Counter QR Code Print Assets", "Live Price & Stock Updates", "Customer Review Collector Trigger"],
        mockupType: "mobile"
      },
      {
        id: "salon_appointment_hub",
        title: "Salon & Spa Chair Booking Engine",
        archetype: "Time-Slot Booking",
        accentColor: "blue",
        timeline: "10 Days",
        price: "₹25,000",
        description: "Customers select stylist, treatment, and time slot. Automated WhatsApp reminders prevent no-shows.",
        features: ["Stylist & Chair Selection Matrix", "Automated WhatsApp Slot Reminders", "Package & Festival Discount Banners", "Google Review Auto-Request Bot"],
        mockupType: "mobile"
      },
      {
        id: "retail_repeat_machine",
        title: "Retail Repeat Engine (Storefront + Loyalty CRM)",
        archetype: "Complete Retail Machine",
        accentColor: "purple",
        timeline: "14 Days",
        price: "₹50,000",
        description: "Local storefront + customer birthday/repeat WhatsApp CRM + Meta Local ad funnel setup.",
        features: ["Online Storefront + Customer CRM", "Automated Birthday/Festival WhatsApp", "Meta Local Lead Ad Integration", "3 Months Free Local Rank Protection"],
        mockupType: "kanban"
      }
    ]
  },
  {
    id: "executive_corporate_portfolio",
    name: "High-Ticket Executive & Portfolio",
    category: "websites",
    categoryLabel: "Websites & Storefronts",
    tagline: "Engineered for consultants, architects, founders, and legal counsels",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "minimal_executive_bio",
        title: "Dark Minimalist Executive Bio",
        archetype: "Executive Prestige",
        accentColor: "amber",
        timeline: "5 Calendar Days",
        price: "₹15,000",
        description: "Monochrome dark aesthetic, executive biography, press features, and direct WhatsApp / Zoom booking link.",
        features: ["Editorial Typography & Executive Bio", "Press & Media Recognition Logos", "1-Tap VIP Meeting Scheduler", "Sub-0.8s Global CDN Load"],
        mockupType: "browser"
      },
      {
        id: "architect_project_showcase",
        title: "Architectural Project & Space Gallery",
        archetype: "Visual Portfolio",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹20,000",
        description: "Full-width masonry photography, project specification blueprints, and consultation booking funnel.",
        features: ["High-Res Masonry Photo Gallery", "Project Scope & Floorplan Tabs", "Client Testimonial Showcase", "Google Maps Studio Presence"],
        mockupType: "browser"
      },
      {
        id: "consultant_case_study_hub",
        title: "Strategic Case Study & Teardown Hub",
        archetype: "Authority Platform",
        accentColor: "emerald",
        timeline: "10 Days",
        price: "₹30,000",
        description: "In-depth corporate case studies with measurable ROI metrics, downloadable whitepapers, and inquiry gates.",
        features: ["Detailed ROI Metric Breakdown Cards", "Downloadable PDF Whitepaper Gates", "Integrated Strategy Blog", "Automated Consultation Scheduler"],
        mockupType: "browser"
      },
      {
        id: "complete_practice_machine",
        title: "Complete Advisory Machine (Web + Client CRM)",
        archetype: "Complete Practice Machine",
        accentColor: "purple",
        timeline: "14 Days",
        price: "₹50,000",
        description: "Executive portal + client onboarding CRM + automated contract delivery + 90 days priority support.",
        features: ["Executive Webfront + Client Portal", "Automated Client Intake & Contract Log", "Unlimited Associate Staff Logins", "3 Months Free Tech Support & SEO"],
        mockupType: "kanban"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. CUSTOM SAAS & CRMS (6 MODELS)
  // ─────────────────────────────────────────────────────────────
  {
    id: "zero_seat_custom_crm",
    name: "Zero-Seat Custom Sales CRM",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Unlimited staff logins with zero monthly per-user software rent",
    startingPrice: "₹35,000",
    variations: [
      {
        id: "kanban_sales_crm",
        title: "Visual Kanban Sales Pipeline",
        archetype: "Visual Sales Pipeline",
        accentColor: "amber",
        timeline: "10–12 Days",
        price: "₹35,000",
        description: "Drag-and-drop lead stages (*New ➔ Contacted ➔ Quote Sent ➔ Won*), WhatsApp follow-up triggers, zero user tax.",
        features: ["Unlimited Staff Logins (Zero User Tax)", "Visual Drag-and-Drop Deal Stages", "1-Click WhatsApp Chat from CRM", "Lead Source Tracking (Meta/Google/Walk-in)"],
        mockupType: "kanban"
      },
      {
        id: "telecalling_performance_crm",
        title: "Telecalling & Lead Assignment Engine",
        archetype: "Telecalling CRM",
        accentColor: "emerald",
        timeline: "12–14 Days",
        price: "₹45,000",
        description: "Auto-routes incoming inquiries to available callers in 45s. Caller disposition notes, call duration, and target tracking.",
        features: ["45-Second Round-Robin Lead Routing", "Caller Disposition & Follow-Up Log", "Manager Real-Time Performance Monitor", "WhatsApp Auto-Assignment Alerts"],
        mockupType: "kanban"
      },
      {
        id: "complete_crm_enterprise",
        title: "Complete Enterprise CRM Machine",
        archetype: "Complete Sales Machine",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Custom CRM with role-based access + multi-branch support + WhatsApp Cloud API bot + 3 months tech support.",
        features: ["Unlimited Branch & Staff Accounts", "WhatsApp 24/7 Auto-Qualification Bot", "Full Source Code Handover (Self-Hosted)", "3 Months Free Priority Tech Support"],
        mockupType: "kanban"
      },
      {
        id: "b2b_distributor_crm",
        title: "Wholesale Distributor & Dealer CRM",
        archetype: "B2B Distributor CRM",
        accentColor: "blue",
        timeline: "14 Days",
        price: "₹45,000",
        description: "Manage dealer territories, outstanding credit balances, repeat wholesale orders, and dispatch logs.",
        features: ["Dealer Territory & Credit Limit Tracker", "WhatsApp Bulk Order Reorder Triggers", "Pending Invoice & Payment Reminders", "Self-Hosted Sovereign Database"],
        mockupType: "kanban"
      }
    ]
  },
  {
    id: "factory_rfq_quoter",
    name: "90-Second Factory RFQ Quoter",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Automated pricing, raw material calculation, and instant PDF quote dispatch",
    startingPrice: "₹35,000",
    variations: [
      {
        id: "instant_rfq_calc",
        title: "Raw Material & Dimension Calculator",
        archetype: "Material Calculation",
        accentColor: "amber",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Staff or buyers enter length, weight, grade, and quantity. Engine calculates raw cost + margin and generates quote.",
        features: ["Dynamic Material Formula Calculation", "Margin & Waste Factor Controls", "Branded PDF Quotation Generator", "WhatsApp Direct Quote Dispatch"],
        mockupType: "browser"
      },
      {
        id: "multi_tier_quote_portal",
        title: "Multi-Tier Volume Pricing Quoter",
        archetype: "Tiered Pricing",
        accentColor: "emerald",
        timeline: "12 Days",
        price: "₹40,000",
        description: "Automatic volume discounts (100 units vs 1,000 units), packaging costs, and freight shipping estimates.",
        features: ["Volume Tier Discount Tables", "Freight & Packaging Auto-Surcharge", "Client Digital Signature Acceptance", "Tally Prime Ledger Quotation Sync"],
        mockupType: "browser"
      },
      {
        id: "complete_rfq_engine",
        title: "Complete Autonomous Quotation Engine",
        archetype: "Complete Quoting Machine",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Quoter engine + customer tracking CRM + Tally sync + WhatsApp approval bot + 3 months support.",
        features: ["Full Quoting Engine + Sales CRM", "WhatsApp Customer Acceptance Bot", "Tally Prime Proforma Invoice Bridge", "3 Months Free Priority Tech Support"],
        mockupType: "kanban"
      },
      {
        id: "dealer_self_quote_portal",
        title: "Authorized Dealer Self-Quoting Portal",
        archetype: "Dealer Self-Service",
        accentColor: "blue",
        timeline: "14 Days",
        price: "₹45,000",
        description: "Authorized dealers log in, configure bespoke orders, and generate factory-approved quotes 24/7 without calling.",
        features: ["Dealer Secure Login & Tiered Discounts", "Credit Limit & Order History Check", "Instant PO Generation & Factory Lock", "Zero Office Overhead"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "godown_inventory_tracker",
    name: "Godown & Multi-Warehouse Tracker",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Real-time stock movement, dispatch challans, and low-inventory alerts",
    startingPrice: "₹45,000",
    variations: [
      {
        id: "barcode_stock_app",
        title: "Mobile Barcode Stock Movement App",
        archetype: "Mobile Barcode Scan",
        accentColor: "emerald",
        timeline: "12 Days",
        price: "₹45,000",
        description: "Staff scan incoming and outgoing pallets with their phone camera. Stock counts update live across all godowns.",
        features: ["Camera Barcode & QR Code Scanner", "Live Stock Ledger Across Warehouses", "Automated Dispatch Delivery Challans", "Low-Stock WhatsApp Alerts to Owner"],
        mockupType: "mobile"
      },
      {
        id: "complete_inventory_os",
        title: "Complete Sovereign Godown OS",
        archetype: "Complete Inventory OS",
        accentColor: "purple",
        timeline: "16–18 Days",
        price: "₹50,000",
        description: "Multi-godown inventory + Tally Prime bridge + dispatch transport tracking + 3 months free support.",
        features: ["Multi-Warehouse Transfer Logs", "Tally Prime Live Stock Sync", "Driver & Transport Dispatch Receipts", "3 Months Free Tech Support & SLA"],
        mockupType: "kanban"
      },
      {
        id: "batch_expiry_tracker",
        title: "Batch, Lot & Expiry Date Tracker",
        archetype: "Batch & Compliance",
        accentColor: "amber",
        timeline: "14 Days",
        price: "₹48,000",
        description: "Critical for chemicals, pharma, and food manufacturing. Tracks batch numbers, shelf-life, and test certifications.",
        features: ["Batch/Lot Traceability Reports", "Automated Expiry Warning Alerts", "Quality Lab Certificate Attachments", "Audit-Ready Stock Registers"],
        mockupType: "browser"
      },
      {
        id: "supplier_po_engine",
        title: "Automated Supplier Purchase Order Hub",
        archetype: "Supplier Procurement",
        accentColor: "blue",
        timeline: "14 Days",
        price: "₹45,000",
        description: "When stock drops below threshold, engine auto-drafts Purchase Orders to pre-approved suppliers via WhatsApp.",
        features: ["Automated Reorder Point Calculation", "WhatsApp Supplier PO Dispatch", "Goods Received Note (GRN) Verification", "Vendor Payment Ledger View"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "clinic_ehr_management",
    name: "Clinic Patient Management (EHR)",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Digital patient records, prescription logs, and automated recall bots",
    startingPrice: "₹35,000",
    variations: [
      {
        id: "digital_prescription_pad",
        title: "1-Click Digital Prescription Generator",
        archetype: "Fast Prescriptions",
        accentColor: "emerald",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Doctors select common medicines in 3 clicks. Prescription texts directly to patient WhatsApp as a clean PDF.",
        features: ["Quick-Select Medicine Catalog", "1-Click WhatsApp PDF Prescription", "Patient Allergy & History Alert", "Print-Ready Letterhead Layout"],
        mockupType: "browser"
      },
      {
        id: "complete_clinic_manager",
        title: "Complete Clinic & OPD Operating System",
        archetype: "Complete Clinic OS",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Full front-desk billing + patient records + WhatsApp appointment scheduler + 3 months tech support.",
        features: ["OPD Queue & Billing Reception Desk", "Patient Lifetime Visit History", "Automated 6-Month Checkup Recalls", "3 Months Free Tech Support & Hosting"],
        mockupType: "kanban"
      },
      {
        id: "lab_report_dispatch_hub",
        title: "Automated Lab Report Dispatch Gateway",
        archetype: "Lab Report Delivery",
        accentColor: "blue",
        timeline: "12 Days",
        price: "₹38,000",
        description: "Upload diagnostic test PDFs; system auto-matches patient phone and sends reports via WhatsApp with OTP security.",
        features: ["Barcode-Matched Report Upload", "Secure OTP WhatsApp Report Delivery", "Doctor Notification for Critical Values", "Zero Receptionist Phone Calls"],
        mockupType: "mobile"
      },
      {
        id: "dental_treatment_tracker",
        title: "Multi-Sitting Dental Treatment Tracker",
        archetype: "Procedure Tracker",
        accentColor: "amber",
        timeline: "12 Days",
        price: "₹40,000",
        description: "Visual tooth chart, procedure milestones (Root Canal, Crown, Implant), and balance installment tracking.",
        features: ["Interactive Visual Dental Chart", "Sitting-by-Sitting Progress Logs", "Treatment Estimate vs Paid Ledger", "WhatsApp Pre-Procedure Care Instructions"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "telecalling_lead_engine",
    name: "Telecalling & Lead Assignment Engine",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Instant sub-45s lead distribution, call logging, and conversion analytics",
    startingPrice: "₹25,000",
    variations: [
      {
        id: "round_robin_distributor",
        title: "Instant Round-Robin Lead Dispatcher",
        archetype: "Instant Lead Routing",
        accentColor: "emerald",
        timeline: "7 Calendar Days",
        price: "₹25,000",
        description: "When an inquiry hits from Facebook, Google, or your website, it assigns to the next active caller in 45 seconds.",
        features: ["45-Second Round-Robin Auto Assignment", "Telecaller WhatsApp Instant Notification", "Caller Shift & Availability Toggles", "Zero Missed or Forgotten Leads"],
        mockupType: "kanban"
      },
      {
        id: "click_to_call_telecaller",
        title: "1-Tap Click-to-Call Rep Dashboard",
        archetype: "Caller Workflow",
        accentColor: "amber",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Sales reps see assigned leads, tap to call directly from mobile, and record disposition in 2 taps.",
        features: ["1-Tap Mobile Call Launcher", "Pre-Built Calling Scripts & Objection Guide", "Scheduled Follow-Up Reminders", "Call Recording & Note Archive"],
        mockupType: "mobile"
      },
      {
        id: "complete_telecalling_machine",
        title: "Complete Telecalling Sales Floor OS",
        archetype: "Complete Telecalling OS",
        accentColor: "purple",
        timeline: "14–18 Days",
        price: "₹50,000",
        description: "Unlimited telecaller logins + manager live conversion board + automated WhatsApp re-engagement + 3 months support.",
        features: ["Unlimited Telecaller & Manager Logins", "Live Floor Target & Conversion Board", "Automated WhatsApp Dead-Lead Revival", "3 Months Free Tech Support & Maintenance"],
        mockupType: "kanban"
      },
      {
        id: "ad_roi_lead_audit",
        title: "Ad Spend to Revenue Attribution Engine",
        archetype: "Ad Attribution",
        accentColor: "blue",
        timeline: "12 Days",
        price: "₹40,000",
        description: "Connects Meta and Google ad spend directly to closed revenue in CRM, showing exact cost per converted client.",
        features: ["Real-Time ROAS by Ad Campaign", "Caller Close-Rate Leaderboard", "Cost Per Acquired Customer Metric", "Automated Daily Founder WhatsApp Report"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "b2b_client_portal",
    name: "B2B Client Self-Service Portal",
    category: "saas",
    categoryLabel: "Custom SaaS & CRMs",
    tagline: "Wholesale clients log in to view manufacturing progress, tax invoices, and dispatches",
    startingPrice: "₹45,000",
    variations: [
      {
        id: "order_tracking_portal",
        title: "Order Status & Production Telemetry Portal",
        archetype: "Live Production Status",
        accentColor: "amber",
        timeline: "12 Days",
        price: "₹45,000",
        description: "Clients log in with mobile OTP to see live manufacturing stages (*Raw Material ➔ Machining ➔ Quality Pass ➔ Dispatched*).",
        features: ["Mobile OTP Client Login", "Live Manufacturing Stage Telemetry", "Transport Bilty / Lorry Receipt Download", "Zero 'Where is my order?' phone calls"],
        mockupType: "browser"
      },
      {
        id: "complete_client_hub",
        title: "Complete Sovereign Wholesale Client Hub",
        archetype: "Complete B2B Portal",
        accentColor: "purple",
        timeline: "16–18 Days",
        price: "₹50,000",
        description: "Client portal + instant reorder engine + Tally ledger statement download + 3 months priority support.",
        features: ["Full Self-Service Client Portal", "Instant Reorder Past Invoices Engine", "Live Tally Account Statement Download", "3 Months Free Tech Support & SLA"],
        mockupType: "browser"
      },
      {
        id: "dealer_credit_ledger",
        title: "Dealer Outstanding & Credit Ledger Portal",
        archetype: "Credit Ledger",
        accentColor: "emerald",
        timeline: "14 Days",
        price: "₹48,000",
        description: "Dealers check credit limits, aging invoice balances, download GST invoices, and submit payment UTR proofs.",
        features: ["Aging Invoice (30/60/90 Day) Breakdown", "Payment Proof UTR Upload Verification", "Automated Payment Receipt Dispatch", "Interest & Credit Limit Controls"],
        mockupType: "browser"
      },
      {
        id: "contract_document_vault",
        title: "Tamper-Proof Document & Agreement Vault",
        archetype: "Legal Document Vault",
        accentColor: "blue",
        timeline: "12 Days",
        price: "₹45,000",
        description: "Secure repository for signed Master Service Agreements, NDAs, test certificates, and warranty documents.",
        features: ["Encrypted Client File Repository", "Digital Signature Audit Trail", "Certificate Expiry Notifications", "Zero Paper Storage Costs"],
        mockupType: "browser"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. AUTOMATIONS & CLOUD INFRA (5 MODELS)
  // ─────────────────────────────────────────────────────────────
  {
    id: "whatsapp_sales_bot",
    name: "24/7 WhatsApp AI Sales Bot",
    category: "automation",
    categoryLabel: "Automations & Cloud",
    tagline: "Answers inquiries, sends PDF catalogs, and qualifies leads at 2 AM",
    startingPrice: "₹12,999",
    variations: [
      {
        id: "catalog_dispenser_bot",
        title: "Instant PDF Catalog & Price Dispenser",
        archetype: "Catalog Bot",
        accentColor: "emerald",
        timeline: "3 Calendar Days",
        price: "₹12,999",
        description: "Customer texts 'Hi'; bot instantly shares 2026 PDF brochure, video showcase, and pricing matrix.",
        features: ["Instant Welcome & Menu Dispatch", "Categorized PDF Catalog Share", "Customer Name & Requirement Capture", "Official Meta Cloud API Compliant"],
        mockupType: "chat"
      },
      {
        id: "ai_qualification_bot",
        title: "Intelligent Lead Qualification Bot",
        archetype: "AI Qualification",
        accentColor: "amber",
        timeline: "5 Calendar Days",
        price: "₹14,999",
        description: "Asks 3 qualifying questions (budget, timeline, location). Flags high-ticket buyers and alerts owner on WhatsApp.",
        features: ["3-Step Natural Human Qualification", "High-Priority Lead SMS/WhatsApp Alert", "CRM Lead Stage Auto-Injection", "Zero Spam / Junk Filtering"],
        mockupType: "chat"
      },
      {
        id: "appointment_booking_bot",
        title: "Automated Calendar Booking Bot",
        archetype: "Calendar Bot",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹18,000",
        description: "Patients/clients pick date and time right inside WhatsApp. Confirms slot and syncs Google/Outlook calendar.",
        features: ["In-Chat Time Slot Selection", "Google/Outlook Calendar Live Sync", "Automated Reminder 2h Before Slot", "Reschedule & Cancel Workflows"],
        mockupType: "chat"
      },
      {
        id: "complete_whatsapp_os",
        title: "Complete Enterprise WhatsApp Suite",
        archetype: "Complete WhatsApp OS",
        accentColor: "purple",
        timeline: "10 Days",
        price: "₹35,000",
        description: "WhatsApp Bot + Multi-agent shared team inbox + Tally ledger balance alerts + automated broadcast campaigns.",
        features: ["Multi-Agent Shared Team Inbox", "Tally Ledger Outstanding Balance Alerts", "Green Tick Verification Assistance", "Meta Cloud Verified Infrastructure"],
        mockupType: "chat"
      }
    ]
  },
  {
    id: "tally_prime_bridge",
    name: "Native Tally Prime Ledger Bridge",
    category: "automation",
    categoryLabel: "Automations & Cloud",
    tagline: "Automated WhatsApp payment receipts, ledger statements, and stock sync",
    startingPrice: "₹18,000",
    variations: [
      {
        id: "ledger_statement_bot",
        title: "WhatsApp On-Demand Ledger Statement",
        archetype: "On-Demand Ledger",
        accentColor: "emerald",
        timeline: "5 Calendar Days",
        price: "₹18,000",
        description: "Dealers text 'Ledger'; system pulls verified Tally Prime balance and texts signed PDF statement in 10 seconds.",
        features: ["Instant Tally Ledger PDF Generation", "Dealers Self-Serve 24/7", "Eliminates Accountant WhatsApp Calls", "Zero Data Entry Errors"],
        mockupType: "chat"
      },
      {
        id: "payment_receipt_auto",
        title: "Automated Payment Receipt & Challan Bot",
        archetype: "Receipt Dispatch",
        accentColor: "amber",
        timeline: "7 Calendar Days",
        price: "₹25,000",
        description: "When an entry is made in Tally, client gets instant WhatsApp receipt with updated balance.",
        features: ["Real-Time Tally Voucher Trigger", "WhatsApp Tax Invoice Dispatch", "Transport LR/Bilty Auto-Attach", "Owner Daily Cash Summary Alert"],
        mockupType: "chat"
      },
      {
        id: "live_stock_sync_engine",
        title: "Tally Live Godown Stock Sync Bridge",
        archetype: "Stock Bridge",
        accentColor: "blue",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Connects Tally Prime godown balances directly to your website or CRM so sales reps never sell out-of-stock items.",
        features: ["Live Warehouse Stock Synchronization", "Zero Over-Selling / Stockout Conflicts", "Reorder Level WhatsApp Notifications", "Self-Hosted Sovereign Connector"],
        mockupType: "browser"
      },
      {
        id: "complete_tally_engine",
        title: "Complete Sovereign Tally OS Bridge",
        archetype: "Complete Tally OS",
        accentColor: "purple",
        timeline: "14 Days",
        price: "₹50,000",
        description: "Full two-way Tally bridge: Inquiries in CRM create sales orders in Tally, dispatches update customer WhatsApp.",
        features: ["Two-Way CRM ↔ Tally Prime Sync", "Automatic Sales Order Creation in Tally", "Audit Trail & Exception Handling", "3 Months Free Tech Support & Upgrades"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "dedicated_vps_server",
    name: "Dedicated VPS Sovereign Server",
    category: "automation",
    categoryLabel: "Automations & Cloud",
    tagline: "Private high-speed server, self-hosted PostgreSQL, and automated daily backups",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "fast_vps_setup",
        title: "Hardened Linux VPS Provisioning",
        archetype: "Server Hardening",
        accentColor: "amber",
        timeline: "3 Calendar Days",
        price: "₹15,000",
        description: "High-speed private server configured with Ubuntu LTS, Nginx reverse proxy, SSL, and automated firewall rules.",
        features: ["Dedicated Fast CPU & RAM Allocation", "SSL & Cloudflare Edge Protection", "Automated Daily Encrypted Backups", "Sub-0.5s Server Response Time (TTFB)"],
        mockupType: "browser"
      },
      {
        id: "sovereign_db_cluster",
        title: "Self-Hosted PostgreSQL & WAL Vault",
        archetype: "Database Sovereignty",
        accentColor: "emerald",
        timeline: "5 Calendar Days",
        price: "₹25,000",
        description: "Full enterprise database architecture with Write-Ahead Logging (WAL) and automatic point-in-time recovery.",
        features: ["100% Data Sovereignty (Zero Cloud Lock-in)", "Daily Encrypted S3 Off-site Snapshots", "Optimized Query Indexing for Speed", "Complete Root Password Handover"],
        mockupType: "browser"
      },
      {
        id: "docker_microservice_mesh",
        title: "Docker Containerized App Deployment",
        archetype: "Containerized Mesh",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹35,000",
        description: "Containerized architecture with Docker Compose, automated health-checks, and zero-downtime rolling updates.",
        features: ["Docker Compose Multi-Container Setup", "Zero-Downtime Code Redeployment", "Automated Memory & CPU Monitoring", "PM2 Process Manager Auto-Restart"],
        mockupType: "browser"
      },
      {
        id: "complete_sovereign_infra",
        title: "Complete Sovereign Infrastructure (Server + AMC)",
        archetype: "Managed Cloud Suite",
        accentColor: "purple",
        timeline: "10 Days",
        price: "₹50,000",
        description: "Full dedicated server deployment + 24/7 uptime monitoring + 3 months managed security & maintenance support.",
        features: ["High-Spec Dedicated Cloud Server", "24/7 Uptime & Ping Alerts to Phone", "Monthly Security & Speed Patching", "3 Months Managed Priority Support"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "smm_lead_sync",
    name: "Omnichannel Social (SMM) Lead Sync",
    category: "automation",
    categoryLabel: "Automations & Cloud",
    tagline: "Unifies Meta, Instagram, and Google Ads into your CRM with zero lead decay",
    startingPrice: "₹10,000",
    variations: [
      {
        id: "meta_lead_webhook",
        title: "Meta Instant Forms ➔ WhatsApp Webhook",
        archetype: "Instant Lead Alert",
        accentColor: "emerald",
        timeline: "2 Calendar Days",
        price: "₹10,000",
        description: "When a prospect fills an Instagram/Facebook ad form, lead data pings founder WhatsApp in 3 seconds.",
        features: ["3-Second Meta Webhook Latency", "Direct WhatsApp Lead Alert to Rep", "Google Sheets Live Backup Sync", "Zero Reliance on Meta Lead Center"],
        mockupType: "chat"
      },
      {
        id: "google_search_call_lead",
        title: "Google Call & Search Ads Lead Router",
        archetype: "Search Ad Routing",
        accentColor: "amber",
        timeline: "4 Calendar Days",
        price: "₹15,000",
        description: "Tracks incoming calls and form submissions from Google Search Ads. Connects directly to available sales rep.",
        features: ["Google Ads Click-to-Call Tracking", "GCLID Attribution & Conversion Upload", "Caller Location & Keyword Logging", "Daily Founder ROI Summary"],
        mockupType: "browser"
      },
      {
        id: "omnichannel_funnel_sync",
        title: "Omnichannel Meta + Google + WhatsApp Bridge",
        archetype: "Omnichannel Funnel",
        accentColor: "purple",
        timeline: "7 Calendar Days",
        price: "₹25,000",
        description: "Unified lead pipeline connecting Facebook, Instagram, Google Search, and website visitors into one CRM.",
        features: ["Single Unified Inbound Pipeline", "Automated Welcome WhatsApp Message", "Lead Duplicate De-duplication", "Ad Spend vs Closed Revenue Tracking"],
        mockupType: "kanban"
      },
      {
        id: "complete_smm_growth_machine",
        title: "Complete SMM Lead Generation Machine",
        archetype: "Complete Ad Machine",
        accentColor: "blue",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Full ad account tracking setup + 30-day conversion creative assets + lead routing CRM + 1 month ad management.",
        features: ["Meta & Google Ad Pixel / CAPI Hardening", "High-Converting Creative Ad Assets", "Instant WhatsApp Follow-Up Engine", "1 Month Managed Conversion Optimization"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "payment_gst_gateway",
    name: "Automated Payment & GST Invoicing",
    category: "automation",
    categoryLabel: "Automations & Cloud",
    tagline: "Instant UPI/Card payments with automated GST-compliant tax invoices",
    startingPrice: "₹9,999",
    variations: [
      {
        id: "upi_cashfree_gateway",
        title: "1-Tap Native UPI & Card Payment Gateway",
        archetype: "Fast Payment",
        accentColor: "emerald",
        timeline: "2 Calendar Days",
        price: "₹9,999",
        description: "Lowest transaction rates in India via Cashfree or Razorpay. Supports GPay, PhonePe, Paytm, and Netbanking.",
        features: ["Instant UPI Deep-Link Checkout", "Direct Bank Account Settlements", "Zero Setup Fees (Govt Verified)", "Webhook Instant Payment Confirmation"],
        mockupType: "mobile"
      },
      {
        id: "auto_gst_tax_invoice",
        title: "Automated GST Tax Invoice PDF Engine",
        archetype: "GST Invoicing",
        accentColor: "amber",
        timeline: "4 Calendar Days",
        price: "₹14,999",
        description: "When payment succeeds, system auto-generates branded GST invoice with customer GSTIN and WhatsApps it instantly.",
        features: ["B2B GSTIN Auto-Validation", "Automatic CGST/SGST/IGST Calculation", "WhatsApp & Email PDF Invoice Dispatch", "Monthly GSTR-1 Sales Report Export"],
        mockupType: "browser"
      },
      {
        id: "recurring_subscription_engine",
        title: "Recurring Client Retainer & Subscription Hub",
        archetype: "Recurring Invoicing",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹25,000",
        description: "Automates monthly client retainers (e.g. ₹9,999/mo) with automated UPI autopay and payment receipts.",
        features: ["UPI Autopay Recurring Mandates", "Automated Monthly Invoice Dispatch", "Payment Overdue WhatsApp Chaser", "Customer Self-Service Card Management"],
        mockupType: "browser"
      },
      {
        id: "complete_fintech_engine",
        title: "Complete Sovereign Payment & Billing Engine",
        archetype: "Complete Billing OS",
        accentColor: "purple",
        timeline: "10 Days",
        price: "₹35,000",
        description: "Full payment gateway + automated GST invoicing + Tally Prime receipt voucher sync + client portal.",
        features: ["Payment Gateway + GST Invoice Engine", "Tally Prime Bank Receipt Voucher Sync", "Customer Statement Download Portal", "Complete Financial Audit Trail"],
        mockupType: "browser"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. BRAND & LEGAL ADD-ONS (4 MODELS)
  // ─────────────────────────────────────────────────────────────
  {
    id: "brand_starter_bundle",
    name: "Brand Starter Bundle",
    category: "brand",
    categoryLabel: "Brand & Legal",
    tagline: "Logo design, color palette, typography, and professional email",
    startingPrice: "₹2,999",
    variations: [
      {
        id: "essential_logo_kit",
        title: "Essential Vector Logo & Favicon Kit",
        archetype: "Brand Identity",
        accentColor: "amber",
        timeline: "2 Calendar Days",
        price: "₹2,999",
        description: "Custom vector brand logo, transparent PNGs, high-res SVG, web favicons, and social profile icons.",
        features: ["3 Bespoke Logo Concepts", "Full Vector Source Files (AI/SVG/PNG)", "Favicons for Web & Mobile App", "Commercial Copyright Handover"],
        mockupType: "browser"
      },
      {
        id: "full_corporate_brand_book",
        title: "Complete Corporate Identity & Brand Book",
        archetype: "Full Brand Book",
        accentColor: "blue",
        timeline: "4 Calendar Days",
        price: "₹5,999",
        description: "Logo suite, typography pairing, hex color guide, letterhead, business card, and invoice templates.",
        features: ["Comprehensive 12-Page Brand Guide", "Print-Ready Letterhead & Business Cards", "Custom Email Signature Template", "Social Media Cover & Post Templates"],
        mockupType: "browser"
      },
      {
        id: "business_email_domain",
        title: "Domain Setup + Professional Email Suite",
        archetype: "Business Email",
        accentColor: "emerald",
        timeline: "1 Calendar Day",
        price: "₹3,499",
        description: "Domain connection, DKIM/SPF/DMARC anti-spam verification, and `@yourcompany.com` email setup on Google or Zoho.",
        features: ["Custom @yourdomain.com Email", "100% Deliverability Anti-Spam Setup", "Mobile Phone Email Client Sync", "Zero Tech Hassle Onboarding"],
        mockupType: "browser"
      },
      {
        id: "rebrand_makeover_pack",
        title: "Legacy Business Digital Modernization",
        archetype: "Legacy Makeover",
        accentColor: "purple",
        timeline: "5 Calendar Days",
        price: "₹9,999",
        description: "Modernizing a 20-year-old traditional logo into a sleek, 2026 digital-first brand identity.",
        features: ["Modernized Heritage Logo Suite", "Digital-First Color System", "Signboard & Vehicle Print Specs", "Customer Rebranding Announcement Assets"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "legal_foundation_bundle",
    name: "Legal Foundation Bundle",
    category: "brand",
    categoryLabel: "Brand & Legal",
    tagline: "Direct assistance with GST registration, MSME Udyam, and compliance docs",
    startingPrice: "₹3,999",
    variations: [
      {
        id: "gst_registration_pack",
        title: "GST Registration Assistance Pack",
        archetype: "GST Compliance",
        accentColor: "emerald",
        timeline: "3–5 Days",
        price: "₹3,999",
        description: "Complete document preparation and filing assistance for New GST registration across all Indian states.",
        features: ["Document Verification & Eligibility Check", "GST Portal Application Submission", "ARN Tracking & Query Resolution Support", "Official GSTIN Certificate Handover"],
        mockupType: "browser"
      },
      {
        id: "msme_udyam_pack",
        title: "MSME Udyam Registration & Bank Benefits",
        archetype: "MSME Udyam",
        accentColor: "amber",
        timeline: "2 Calendar Days",
        price: "₹2,499",
        description: "Official MSME Udyam registration to qualify for collateral-free bank loans, subsidy schemes, and legal priority.",
        features: ["Zero-Error Udyam Portal Submission", "Official MSME Certificate Handover", "Subsidized Tender Eligibility Guide", "Bank Loan Verification Assistance"],
        mockupType: "browser"
      },
      {
        id: "complete_startup_legal_kit",
        title: "Complete Business Launch Legal Suite",
        archetype: "Complete Legal Suite",
        accentColor: "purple",
        timeline: "7 Calendar Days",
        price: "₹7,999",
        description: "GST registration assistance + MSME certificate + Website Terms & Privacy Policy (DPDP Act 2023 compliant).",
        features: ["GST Registration + MSME Udyam", "DPDP Act 2023 Compliant Privacy Policy", "Client Agreement & Service Contract Templates", "Statutory Compliance Checklist"],
        mockupType: "browser"
      },
      {
        id: "founder_agreement_pack",
        title: "Founder Equity & Master Service Agreement",
        archetype: "Contracts & Equity",
        accentColor: "blue",
        timeline: "5 Calendar Days",
        price: "₹6,999",
        description: "Co-founder equity split agreements, IP assignment contracts, and independent contractor terms.",
        features: ["Founder Equity Vesting Schedule Template", "Intellectual Property (IP) Assignment Deed", "Client Master Services Agreement (MSA)", "Independent Contractor Vendor Terms"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "trademark_ip_protection",
    name: "Trademark & IP Protection",
    category: "brand",
    categoryLabel: "Brand & Legal",
    tagline: "Brand name search and legal trademark filing assistance",
    startingPrice: "₹6,500",
    variations: [
      {
        id: "trademark_search_report",
        title: "Comprehensive Trademark Clearance Search",
        archetype: "Search & Clearance",
        accentColor: "amber",
        timeline: "1 Calendar Day",
        price: "₹1,999",
        description: "Official IP India registry phonetic and similarity search across all 45 classes to avoid infringement.",
        features: ["Class-Specific Conflict Analysis", "Phonetic & Visual Similarity Audit", "Path-to-Registration Risk Report", "Written Registration Viability Advice"],
        mockupType: "browser"
      },
      {
        id: "trademark_filing_pack",
        title: "Official TM Application Filing Assistance",
        archetype: "Application Filing",
        accentColor: "emerald",
        timeline: "2 Calendar Days",
        price: "₹6,500",
        description: "Complete preparation and filing of Form TM-A with IP India. Enables immediate legal use of the ™ symbol.",
        features: ["Form TM-A Preparation & Submission", "Immediate Right to Use ™ Symbol", "Government Filing Receipt Handover", "Class Categorization Advice (Govt fees extra)"],
        mockupType: "browser"
      },
      {
        id: "objection_response_support",
        title: "Trademark Examination Objection Reply",
        archetype: "Objection Reply",
        accentColor: "blue",
        timeline: "7 Calendar Days",
        price: "₹4,999",
        description: "Drafting formal legal reply to Section 9 / 11 examination reports issued by the Trademark Examiner.",
        features: ["Statutory Ground Legal Defense Draft", "Case Law Precedent Citations", "Affidavit of Continuous Use Preparation", "Timely Submission on IP India Portal"],
        mockupType: "browser"
      },
      {
        id: "brand_ip_fortress",
        title: "Complete Brand IP Fortress (Logo + Name TM)",
        archetype: "Dual Class Protection",
        accentColor: "purple",
        timeline: "5 Calendar Days",
        price: "₹12,000",
        description: "Dual protection covering both your Word Mark (Brand Name) and Device Mark (Visual Logo).",
        features: ["Word Mark + Device Mark Preparation", "Dual Filing on IP India Registry", "Annual Trademark Monitoring for Infringers", "Complete Brand Monopoly Protection"],
        mockupType: "browser"
      }
    ]
  },
  {
    id: "pitch_deck_financial_model",
    name: "Investor Pitch Deck & Financial Model",
    category: "brand",
    categoryLabel: "Brand & Legal",
    tagline: "12-slide institutional pitch deck and 3-year cash flow model for fundraising",
    startingPrice: "₹15,000",
    variations: [
      {
        id: "angel_pitch_deck",
        title: "12-Slide Angel & Seed Pitch Deck",
        archetype: "Seed Pitch Deck",
        accentColor: "amber",
        timeline: "5 Calendar Days",
        price: "₹15,000",
        description: "Clean narrative deck: Problem, Solution, Market TAM, Business Model, Traction, and The Ask.",
        features: ["12 Bespoke Investor-Ready Slides", "Sharp Visual Charts & Unit Economics", "Editable PowerPoint & PDF Export", "Executive Elevator Pitch Summary"],
        mockupType: "browser"
      },
      {
        id: "financial_model_3yr",
        title: "3-Year Dynamic Excel Financial Model",
        archetype: "Financial Model",
        accentColor: "emerald",
        timeline: "7 Calendar Days",
        price: "₹20,000",
        description: "Dynamic P&L, Cash Flow, CAC-to-LTV model, hiring roadmap, and valuation sensitivity matrix.",
        features: ["Dynamic Revenue & Cost Drivers", "Burn Rate & Runway Projection", "Unit Economics & Gross Margin Calculator", "Audit-Ready Formula Architecture"],
        mockupType: "browser"
      },
      {
        id: "complete_fundraising_suite",
        title: "Complete Seed Fundraising Suite (Deck + Model + Video)",
        archetype: "Complete Investor Suite",
        accentColor: "purple",
        timeline: "10–12 Days",
        price: "₹35,000",
        description: "Pitch Deck + 3-Year Model + 60s Demo Video Script + 1-on-1 pitch practice session with Mukul.",
        features: ["12-Slide Deck + 3-Year Financial Model", "1-Page Executive Teaser / One-Pager", "Investor FAQ & Q&A Defense Matrix", "Direct Pitch Coaching with Mukul"],
        mockupType: "browser"
      },
      {
        id: "bank_cma_report",
        title: "Bank Loan CMA Data & Project Report",
        archetype: "Bank CMA Report",
        accentColor: "blue",
        timeline: "5 Calendar Days",
        price: "₹18,000",
        description: "Credit Monitoring Arrangement (CMA) report prepared for bank loan sanctions (CC Limit / Term Loan).",
        features: ["Standard 7-Statement CMA Report", "Debt Service Coverage Ratio (DSCR)", "Working Capital MPBF Assessment", "Bank-Compliant CA-Ready Format"],
        mockupType: "browser"
      }
    ]
  }
];

export default function ShowroomSection() {
  const [activeCategory, setActiveCategory] = useState<ShowroomCategory>("websites");
  const [selectedModel, setSelectedModel] = useState<ShowroomModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredModels = SHOWROOM_MODELS.filter((m) => m.category === activeCategory);

  const handleOpenSamples = (model: ShowroomModel) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#030406] text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> The SAGE DO Showroom
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Browse Everything We Build.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed">
            Explore our complete showroom of website models, custom SaaS, automations, and business add-ons. Click any model to preview 3–5 live design variations.
          </p>
        </div>

        {/* 4 Category Shelves Switcher (The Bags / Cars / Bikes Shelf) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-400 shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/20 text-neutral-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-amber-400"}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-neutral-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Tagline */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wide">
            Showing all <strong>{filteredModels.length} models</strong> in {CATEGORIES.find(c => c.id === activeCategory)?.label}
          </p>
        </div>

        {/* Grid of Models in Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredModels.map((model) => {
            const waText = encodeURIComponent(
              `Hi Mukul! I'm interested in the "${model.name}" from the SAGE DO Showroom. Can we discuss specs and the 48-hour prototype?`
            );

            return (
              <div
                key={model.id}
                className="group relative p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      From {model.startingPrice}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" /> 48h Prototype
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {model.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {model.tagline}
                  </p>

                  {/* 4 Design Samples Preview Teaser */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-6 space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 flex items-center gap-1 font-semibold">
                      <Sliders className="w-3 h-3 text-amber-400" /> 4 Design Styles Available:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-neutral-300 font-medium">
                      {model.variations.map((v) => (
                        <span key={v.id} className="truncate bg-white/5 px-2 py-1 rounded border border-white/5">
                          • {v.archetype}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <Button
                    onClick={() => handleOpenSamples(model)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs h-10 rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>👀 View 3–5 Design Samples</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  <a
                    href={`https://wa.me/916284925684?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`showroom_inquire_${model.id}`)}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/5"
                  >
                    <MessageCircle className="w-3 h-3 text-green-400" />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Design Sample Modal */}
        <DesignSampleModal
          model={selectedModel}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </section>
  );
}
