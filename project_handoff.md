# Project Context & Handoff Document

## Overview
**Project Name**: Sagedo Website
**Description**: A premium SaaS platform offering AI-powered services (Business, Student, Professional, Personal) with a "Wow" factor space/nebula aesthetic.
**Current State**: Functional functionality for Auth, Payments, and File Uploads. Migrating to Supabase.

## Tech Stack
### Frontend
- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Tailwind Merge, Class Variance Authority (CVA)
- **UI Components**: Radix UI (Headless), Framer Motion (Animations), Lucide React (Icons)
- **State/Data**: React Query, React Hook Form, Zod

### Backend
- **Runtime**: Node.js (Express)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Passport.js (Google, GitHub), Local Strategy (Bcrypt)
- **File Storage**: Supabase Storage
- **Email**: Resend (with Nodemailer fallback logic implied in code)

### Infrastructure
- **Payments**: Razorpay
- **Deployment**: Vercel (Frontend), Render (Backend)

## Design Guidelines (Crucial)
The user values a **Premium, High-end Aesthetic**.
- **Theme**: Space, Nebula, Galaxy.
- **Visuals**: Glassmorphism, floating elements, smooth gradients (Red/Crimson accents).
- **Core Principle**: "Don't be basic." The design must impress ("Wow" factor).
- **Typography**: Inter.
- **Reference**: `design_guidelines.md` (Exists in root).

## Key Architectural Decisions
1.  **Monorepo-ish Structure**:
    - `client/`: React frontend.
    - `server/`: Express API.
    - `shared/`: Shared types/constants (Zod schemas).
2.  **Auth Flow**:
    - Passport.js handles OAuth callbacks.
    - Session-based auth (express-session with connect-pg-simple).
    - **Important**: Credentials (`googleId`, `githubId`) are stored in `users` table.
3.  **Database Pattern**:
    - Drizzle ORM for strict typing.
    - Migrations folder for schema changes.

## Critical Business Rules & Logic (The "Micro" Details)
### 1. Anti-Abuse System (Welcome Bonus)
-   **Rule**: Users cannot delete and recreate accounts to farm "Welcome Bonuses".
-   **Implementation**:
    -   Table `used_emails` tracks every email that has ever received a bonus.
    -   Before granting a bonus, the system checks this table.
    -   Logic exists in `server/services/auth.ts` (or equivalent auth handler).

### 2. Golden Ticket & Pricing
-   **Golden Ticket**: A special "Free Service" token for new users.
-   **Trigger**: URL parameter `?useGoldenTicket=true` on the Orders page.
-   **Logic**:
    -   Checks if the selected service has `isGoldenEligible: true`.
    -   Sets price to **0**.
    -   Bypasses Razorpay payment flow entirely.
-   **Content Sanitization**: We removed the specific phrase "Golden Ticket" from some public-facing text to avoid Razorpay compliance issues (relabelled as "Starter Credit" or similar in UI), but the internal logic still uses the concept.

### 3. Email Workflows (Resend)
-   **Separation of Concerns**:
    -   `Order Confirmation`: Sent immediately when order is placed (or after payment for paid orders).
    -   `Payment Success`: Sent specifically after Razorpay webhook/verification confirms capture.
    -   `Delivery`: Sent when admin uploads files. Contains download links.
-   **Logic Fix**: We successfully debugged an issue where paid orders sent "confirmation" before payment. Now, paid orders wait for `payment.capture` or equivalent verification before confirming.

### 4. File Uploads
-   **Storage**: Supabase Storage (Bucket: `uploads`).
-   **Flow**: Frontend uploads to `/api/upload` -> Backend pushes to Supabase -> Returns URL -> URL stored in `orders.fileUrls`.

## Recent Work & Context (The "Memory")
-   **Supabase Migration**: We are moving from Neon/Cloudinary to Supabase for a unified free-tier solution.
    -   *Status*: Database connected, Auth strategies fixed.
-   **Auth Fixes**: Resolved "Unknown authentication strategy" errors for Google/GitHUB. Credentials needs to be in `.env`.
-   **Content Sanitization**: Removed risky keywords for Gateway approval.
-   **Pricing Section**: Added to Homepage to clarify SaaS nature.

## User Preferences
-   **Communication**: Concise, professional but helpful.
-   **Coding Style**: Prefer modifying existing files over creating duplicates. Use `render_diffs` for clarity.
-   **Workflows**: The user likes to "remember" context to avoid repetition.

## Instructions for New Agent
1.  **Read this file first**.
2.  **Read `package.json`** to confirm dependencies.
3.  **Read `design_guidelines.md`** to understand the visual language.
4.  **Check `.env`** (DO NOT PRINT IT) to ensure keys for Supabase/Resend/Razorpay/Google/GitHub are present.

## Mobile App Development Guide
The existing backend is **90% ready** for a mobile app (React Native / Flutter).
### 1. API & Data Access
-   **Base URL**: The API is RESTful. Use the same endpoints as the web.
-   **Endpoints**:
    -   `GET /api/services`: JSON list of all services (use this to build the catalog).
    -   `POST /api/orders`: Create orders (send `isFreeOrder: true` if handling Golden Ticket).
    -   `GET /api/dashboard/user`: Get profile & token balance.
    -   `GET /api/dashboard/orders`: Get order history.
    -   `POST /api/upload`: Upload files (returns JSON `{ urls: [...] }`).

### 2. Authentication (Crucial)
-   **Mechanism**: The backend uses **HTTP-Only Session Cookies** (`connect.sid`).
-   **Mobile Implementation**:
    -   **Networking**: You MUST use a cookie manager (e.g., `react-native-cookies` or `axios-cookie-jar-support`) to persist the session. Standard `fetch` will NOT work without strict cookie handling.
    -   **Social Login**: The endpoints `/api/auth/google` and `/api/auth/github` redirect to `/dashboard` on success.
        -   *Strategy*: Open these in a **WebView** or **Custom Tab**.
        -   *Capture*: Intercept the redirect to `https://sagedo.in/dashboard`. When detected, extract the cookies and close the WebView.

### 3. Payment
-   **Razorpay**: Use the **Razorpay React Native SDK**.
-   **Flow**:
    1.  Call `POST /api/orders` to get an `orderId`.
    2.  Call `POST /api/payment/create-order` with `{ orderId, amount }` to get the Razorpay Order ID (`id`).
    3.  Pass this ID to the Mobile SDK to open the payment sheet.
    4.  On success, call `POST /api/payment/verify` with the signature details.

