# SAGEDO Website Consistency Audit Report

**Generated:** October 2026  
**Purpose:** Comprehensive inventory of all public and internal statements regarding Project/Customer Counts, Office Address/City, Pricing, and Years in Business/Founding Date across the codebase.  
**Instruction Compliance:** Report only; no copy or figures have been altered.

---

## 1. Project Counts & Customer Metrics

The site features several figures for clients, founders, projects, and ratings across marketing pages, alternatives pages, blog articles, and LLM text files.

| Metric Statement | Location / File | Context |
| :--- | :--- | :--- |
| **"150+ Happy Founders"** / **"150+ happy customers"** | `client/public/llm-info.html` (lines 187, 479) | Features list: *"4.8 rating from 150+ happy customers"*, *"150+ Happy Founders"* |
| **"67+ clients"** | `client/src/pages/DIYAlternative.tsx` (line 51) | Body copy: *"We've built systems for 67+ clients. We know what works and what doesn't."* |
| **"20+ mobile and web apps"** | `client/public/app-development-india.html` (line 74) | Experience claim: *"We have built over 20+ mobile and web apps"* |
| **"12+ agencies"** | `client/src/pages/AgencyPartner.tsx` (line 156) | Partner strip: *"Currently partnering with 12+ agencies across India and GCC"* |
| **"1,000+ users"** | `client/src/pages/BlogPost.tsx` (lines 432, 459), `scripts/prerender.mjs` (line 274) | Case study: *"How I Fixed a 1000-User App Crash in 2 Hours Using AI"* / *"1,000+ users back online"* |
| **"25+ Person Engineering Collective"** | `client/src/pages/About.tsx` (line 108) | Team section subtitle: *"25+ Person Engineering Collective"* |
| **"4.8 rating" vs "4.0★ rating"** | `client/public/llm-info.html` (line 187: *4.8 rating*) vs `client/public/website-development-india.html` (line 196: *4.0★ Trustpilot Rating*) and `client/public/digital-marketing-mumbai.html` (line 66: *Rated 4.0/5 on Trustpilot*) | Discrepancy between Trustpilot rating quotes (4.0 vs 4.8) |
| **Service Counts (38+ vs 32+ vs 30+)** | `client/public/llm-info.html` (line 182: *38+ services across 4 categories*), `client/src/pages/Services.tsx` (line 104: *32+ Production Services*), `client/src/pages/About.tsx` (line 585: *30+ Production Services*) | Catalog size descriptions vary across files |

---

## 2. Address, Headquarters & City Mentions

The website references multiple physical locations and regional hubs, primarily centering on the Mohali/Chandigarh Tricity headquarters with localized landing pages.

| Location Mention | Location / File | Context |
| :--- | :--- | :--- |
| **SCO-38, Mohali City Centre, Aerocity, Mohali, Punjab 140306, India** | `client/src/components/Footer.tsx` (line 58)<br>`client/src/pages/About.tsx` (lines 925–926)<br>`client/src/pages/Contact.tsx` (lines 224–225) | Official registered office address in footers and contact pages |
| **"Headquartered at SCO-38 Mohali City Centre"** | `client/src/data/pillarData.ts` (lines 36, 126, 454, 497) | Pillar pages for AI Automation, CRM Chandigarh, B2B Lead Gen |
| **"Founded in Mohali (Chandigarh Tricity)"** | `client/src/pages/About.tsx` (line 226) | Company timeline & origins section |
| **"Based in Chandigarh"** | `client/src/pages/AboutFounder.tsx` (line 33)<br>`client/src/pages/BlogPost.tsx` (line 509)<br>`client/public/llm.txt` (line 5)<br>`client/public/llms.txt` (line 17) | Quick summary profiles: *"Based in Chandigarh. Building in public."*, *"Location: Chandigarh, Punjab, India"* |
| **Tricity Hubs (Chandigarh, Mohali, Panchkula, Zirakpur)** | `client/src/pages/Locations.tsx` (lines 23–25)<br>`client/src/data/pillarData.ts` (lines 116, 205, 253)<br>`client/public/digital-marketing-chandigarh.html` | Regional focus: *"Serving VIP Road, PR7 Airport Road (Zirakpur)"*, *"Focal Point, Industrial Area (Ludhiana)"*, *"Industrial Area Phase 1 & 2, MDC (Panchkula)"* |
| **Metro Regional Landing Pages** | `client/public/digital-marketing-delhi.html` (Delhi, Gurgaon, Noida)<br>`client/public/digital-marketing-mumbai.html` (Mumbai, Navi Mumbai, Thane)<br>`client/public/digital-marketing-bangalore.html` (Bangalore)<br>`client/public/digital-marketing-hyderabad.html` (HITEC City, Gachibowli)<br>`client/public/digital-marketing-pune.html` (Hinjewadi, PCMC) | Dedicated HTML entrypoints targeting tier-1 metros |

---

## 3. Pricing Mentions

All pricing figures across one-time packages, recurring retainers, and specialized setups:

### A. Core Launch Packages (Web & App)
- **Starter Launch — ₹15,000**: 5-page website + brand identity + SEO basics + domain setup, 7-day delivery.  
  *Locations:* `client/src/pages/BlogPost.tsx` (lines 134, 216), `scripts/prerender.mjs` (lines 239, 245), `client/public/website-development-india.html` (lines 190, 195), `client/public/llms.txt`, `client/public/llm.txt`.
- **Full Launch — ₹35,000**: 10+ page website + blog + social media kit + Google Business Profile + CRM + WhatsApp bot, 10–12 day delivery.  
  *Locations:* `client/src/pages/BlogPost.tsx` (line 136), `scripts/prerender.mjs` (line 239), `client/public/llms.txt`, `client/public/llm.txt`.
- **Growth Launch / Mobile App — ₹95,000**: React Native mobile app + web portal, 15-day delivery.  
  *Locations:* `client/src/pages/BlogPost.tsx` (line 372), `scripts/prerender.mjs` (line 257), `client/public/app-development-india.html`.

### B. Sovereign Revenue Engine Tiers (Drizzle / `serviceData.ts`)
- **Sovereign Foundation Engine™**: ₹45,000 – ₹75,000 (AMC: ₹15,000/mo)  
  *Locations:* `client/src/data/serviceData.ts` (lines 34, 42), `client/src/pages/Services.tsx`.
- **Sovereign Revenue Engine™**: ₹1,50,000 – ₹2,50,000 (AMC: ₹25,000/mo)  
  *Locations:* `client/src/data/serviceData.ts` (lines 51, 59), `client/src/data/pillarData.ts` (line 445), `scripts/prerender.mjs` (line 445).
- **Sovereign Enterprise Engine™**: Starting at ₹3,50,000 (AMC: ₹35,000/mo)  
  *Locations:* `client/src/data/serviceData.ts` (lines 68, 76), `client/src/pages/Services.tsx`.

### C. Audits & Consultations (Paid Tiers)
- **AI & Web Growth Audit**: ₹1,999 (45 minutes)  
  *Locations:* `client/src/pages/Services.tsx`, `client/public/sagedo-services.html` (line 75).
- **Strategic Consultation**: ₹3,499 (45 minutes with founder Mukul Dhiman)  
  *Locations:* `client/src/pages/Services.tsx`, `client/public/sagedo-services.html` (line 76).
- **Revenue Infrastructure Blueprint**: ₹25,000 (Full audit credited 100% against any tier build within 90 days)  
  *Locations:* `client/src/pages/Services.tsx`, `scripts/prerender.mjs` (lines 75, 84).

### D. Standalone & Local Services
- **Google Business Profile Setup**: ₹799 (in blog posts: `BlogPost.tsx`, `prerender.mjs` line 251) vs ₹7,999 – ₹14,999 (in `serviceData.ts` line 121 for Local Dominance Suite).
- **GST Registration & Digital Compliance**: ₹2,499 – ₹4,999 (`serviceData.ts` line 174).
- **WhatsApp Bot / Automation**: ₹4,999 – ₹9,999 (`serviceData.ts` line 157) or ₹15,000 – ₹45,000 for autonomous agent workflows (`pillarData.ts` line 445).
- **Social Media Content Retainer**: ₹4,999/month (`BlogPost.tsx` line 287, `prerender.mjs` line 287).
- **B2B Ad Management Retainer**: ₹25,000/month (`pillarData.ts` line 107).
- **Referral Credit**: ₹500 store credit per referred founder (`client/src/pages/Refer.tsx` line 36).

---

## 4. Years in Business & Founding Timeline

| Statement | Location / File | Context |
| :--- | :--- | :--- |
| **"Founded: 2025"** | `client/public/llms.txt` (line 18)<br>`client/public/llm.txt` (lines 5, 44)<br>`client/public/sagedo-services.html` (line 28) | Metadata fields: *"Founded: 2025, Chandigarh, India"*, *"Founded SAGE DO in 2025"* |
| **"Founded by Mukul Dhiman in 2025"** | `client/src/data/faqs.ts` (line 33)<br>`scripts/prerender.mjs` (lines 108, 164) | FAQ response: *"SAGE DO was founded by Mukul Dhiman in 2025"* |
| **"Over the past 2 years..."** | `client/src/pages/About.tsx` (line 470) | Timeline narrative: *"Over the past 2 years, we've developed..."* |
| **"© 2026 SAGE DO"** | `client/src/components/Footer.tsx` (line 257)<br>All `client/public/digital-marketing-*.html` footers<br>`scripts/prerender.mjs` (line 74) | Standard current copyright year across all site footers |
