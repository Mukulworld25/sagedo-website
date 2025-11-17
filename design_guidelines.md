# SAGEDO AI - Comprehensive Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Tesla's minimalist hero sections, Stripe's clean service presentations, and Notion's smooth interactions, while maintaining SAGEDO's unique AI-focused identity.

## Core Design Principles
1. **Immersive Visual Experience**: Stunning nebula/galaxy backgrounds create immediate engagement
2. **Premium AI Aesthetic**: Glassmorphic elements convey advanced technology
3. **Effortless Navigation**: Tesla-inspired clarity with bold hierarchy
4. **Purposeful Animation**: Smooth, meaningful transitions that enhance rather than distract

## Typography System

**Primary Font**: Inter (via Google Fonts)
- Hero Headlines: 4xl to 7xl, weight 800-900, leading tight
- Page Titles: 2xl to 4xl, weight 700-800
- Section Headers: xl to 2xl, weight 700
- Service Card Titles: lg to xl, weight 700
- Body Text: base to lg, weight 400-500
- Captions/Labels: sm to base, weight 500

**Text Colors**:
- Primary headlines: White (#ffffff)
- Gradient accents: Linear gradient from #dc2626 to #b91c1c
- Body text: Gray-200 (#e5e7eb)
- Muted text: Gray-400 (#9ca3af)

## Layout & Spacing System

**Container Widths**:
- Full-width sections: w-full with inner max-w-7xl
- Content sections: max-w-6xl mx-auto
- Text content: max-w-3xl mx-auto

**Spacing Units** (Tailwind scale):
- Component padding: p-4, p-6, p-8
- Section padding vertical: py-16 (mobile), py-24 (desktop)
- Section padding horizontal: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Element gaps: gap-4, gap-6, gap-8
- Card spacing: space-y-4, space-y-6

## Visual Design Elements

### Background System
**Primary Background**: Animated nebula/galaxy with floating AI tool logos
- Implementation: Full-screen fixed background image/video of cosmic nebula
- Overlay: rgba(15, 23, 42, 0.85) dark overlay for content readability
- Floating Elements: Subtle animated AI tool logos (ChatGPT, Midjourney, Claude icons) drifting across viewport
- Fallback: Linear gradient from slate-900 to slate-800

### Glassmorphic Components
**Card Style**:
- Background: rgba(15, 23, 42, 0.85) with backdrop-blur-12px
- Border: 1px solid rgba(100, 150, 255, 0.4)
- Border radius: 1rem (rounded-xl)
- Hover state: Transform scale 1.04, border glow #6ba8ff, shadow 0 0 20px rgba(107, 168, 255, 0.5)

### Gradient Accents
**Primary Gradient**: Linear from #dc2626 to #b91c1c
- Usage: CTA buttons, badges, active states, Namaste button, step numbers, headings
- Hover: Add shadow glow 0 0 25px rgba(220, 38, 38, 0.6)

## Page-by-Page Specifications

### Home Page
**Hero Section** (80vh):
- Nebula background with floating AI logos
- Centered content: Large headline "Problem? Need Help? Afcoz!" with animated shimmer effect on "Afcoz"
- Subtitle: "We Do Your Daily Grind, You Do Grand Things"
- Primary CTA: "Help Me!" button (gradient red, large, prominent)
- **Namaste Button**: Top-right corner of hero, rounded-full, gradient background, "Namaste 🙏" text, onclick shows "नमस्ते 🙏"

**How It Works Section**:
- 3-column grid (stacks on mobile)
- Step cards with circular numbered badges (gradient background)
- Card structure: Number badge → Bold title → Description
- Cards hover lift effect (translateY -5px)

**Categories Preview**:
- 4-column grid showing category icons
- Each card: Icon/image → Category name → Service count → "Explore" link

### Services Page
**Tab Navigation**:
- Horizontal scrollable pills on mobile, flex-wrap on desktop
- Active tab: Gradient background, white text
- Inactive tabs: Glassmorphic background, gray-100 text

**Service Grid**:
- Business: 5-column grid (2 columns mobile, 3 tablet)
- Student: 4-column grid
- Professional: 4-column grid  
- Personal: 3-column grid

**Service Card Structure**:
- Top: 120px image container (gradient placeholder if no image)
- Service icon/image (cover fit, full width)
- Content padding: p-4
- Title (lg, bold, white)
- Description (sm, gray-200)
- Optional "Free with Golden Ticket" badge (gradient pill)

**Card Animations**: Fade-up on scroll with staggered delay (100ms intervals), AOS library

### About Page
**Company Section**:
- 2-column layout (stacks mobile): Text content left, brand image right
- Mission statement in large text (xl, leading relaxed)

**Social Media Section**:
- Horizontal flex grid of social icons
- Icon cards: Glassmorphic background, platform logo, handle, follower count
- Icons: Instagram, LinkedIn, Twitter, YouTube, WhatsApp

**Gallery Section**:
- Masonry grid layout (Pinterest-style)
- Mix of testimonial cards and work showcase images
- Testimonial cards: Quote → Client name → Rating stars → Client photo
- Work images: Before/after sliders, project thumbnails with overlay text

### Orders Page
**Form Container**: Centered max-w-4xl, glassmorphic card
- Embedded Google Form iframe (full width, min-height 800px)
- File upload section below iframe
- Upload area: Dashed border, drag-drop zone, "Choose files" button
- Accepted formats display: "PDF, DOC, DOCX, ZIP, Images"

### Login/Dashboard Page
**Dashboard Grid**:
- Header: User email + badge + logout button
- Token balance card: Large number display, "Earn More" CTA
- Order history table: 4 columns (Order ID, Service, Status, Date)
- Offline AI tools: Grid of tool cards (Text Generator, Image Editor, PDF Export)

### Delivery Tracking Page
**Progress Timeline**:
- Vertical stepper with 4 stages
- Active stage: Gradient accent, pulse animation
- Completed stages: Green checkmark
- Pending stages: Gray outline
- Each stage: Icon → Title → Description → Estimated date

## Component Library

### Buttons
- **Primary CTA**: Gradient background, white text, lg padding (px-8 py-4), rounded-xl, shadow-lg, hover scale 1.05
- **Secondary**: Glassmorphic background, border, md padding (px-6 py-3), rounded-full
- **Buttons on images**: Add backdrop-blur-md and bg-white/20 to ensure visibility

### Navigation
- Fixed header: Glassmorphic background, border-bottom, backdrop-blur
- Logo: Left-aligned, gradient text effect
- Nav items: Horizontal flex, hover underline effect
- Mobile: Hamburger → Slide-in menu from right

### Forms
- Input fields: Glassmorphic background, border, rounded-lg, p-3, focus ring gradient
- Labels: Small text above inputs, gray-200
- Error states: Red border, red text below input

### Modals/Overlays
- Backdrop: rgba(0,0,0,0.7) with backdrop-blur
- Modal container: Glassmorphic, centered, max-w-2xl, rounded-2xl

## Images & Icons

### Hero Images
Large background image of nebula/cosmic scene with AI elements integrated (neural networks, circuit patterns in stars)

### Service Category Images
- Business: Professional office workspace, modern tech setup
- Student: Study environment, books and laptop, AI learning interface
- Professional: Corporate setting, resume templates, LinkedIn interface
- Personal: Lifestyle imagery, fitness apps, creative tools

### Gallery Images
- Testimonial photos: Professional headshots on transparent/blurred backgrounds
- Work showcase: Before/after comparisons, final deliverables, screenshots of completed projects

### Icons
Use Heroicons via CDN for all UI icons (menu, close, checkmark, upload, etc.)

## Accessibility & Performance
- Maintain WCAG AA contrast ratios (text on glassmorphic backgrounds may need darker overlays)
- All interactive elements minimum 44x44px touch targets
- Skip to content link for keyboard navigation
- Lazy load images below fold
- Optimize nebula background (video under 5MB or optimized WebP)