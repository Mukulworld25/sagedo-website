/**
 * Post-build prerender script
 * 
 * Generates static HTML files for key routes by copying the built index.html
 * and injecting route-specific SEO content (title, meta, body text) into each copy.
 * 
 * This ensures search engines and AI crawlers see real content instead of an
 * empty <div id="root"> with a spinner.
 * 
 * Run: node scripts/prerender.mjs
 * (automatically run after vite build via the "build" npm script)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// ── Route definitions with SEO content ──────────────────────────────────
const routes = [
  {
    path: '/',
    title: "SAGEDO - India's First AI + Human Hybrid Execution Team",
    description: "SAGEDO - India's First AI + Human Hybrid Execution Team | We Execute What You're Stuck On | AI speed. Human precision. Freelancer prices. Chandigarh, India",
    content: `
      <h1>SAGE DO - AI + Human Execution for Founders</h1>
      <p>SAGE DO is India's first AI and human hybrid execution team. We combine AI speed with human precision to deliver agency-quality websites, apps, branding, and automation — in 24-48 hours at freelancer prices.</p>
      <h2>Our Services</h2>
      <ul>
        <li>Custom SaaS &amp; AI App Development</li>
        <li>Automated Marketing &amp; Lead Generation</li>
        <li>Brand Identity &amp; Creative Execution</li>
        <li>Data Solutions &amp; AI Executive Dashboards</li>
      </ul>
      <p>Stop paying high agency retainers. Execute faster with our elite Hybrid Tech Stack. Visit sagedo.in to get started.</p>
    `,
  },
  {
    path: '/blog',
    title: 'SAGEDO Blog — AI Execution Tips for Indian Startups & Founders',
    description: 'Learn how AI + human execution helps Indian startups grow faster. Case studies, tips, and strategies from SAGEDO — India\'s first AI hybrid execution team.',
    content: `
      <h1>SAGEDO Blog — Insights &amp; Case Studies</h1>
      <p>Real stories from the frontlines of AI execution. No fluff. No theory. Just what works for Indian founders.</p>
      <h2>Why 96% of Indian Startup Websites Get Zero Traffic from Google</h2>
      <p>I have reviewed over 50 Indian startup websites in the last 6 months. 96% of them have the same 3 problems that guarantee zero Google traffic.</p>
      <h2>How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours</h2>
      <p>Over 90% of Indian startups are completely invisible to AI search engines. Here is exactly what was wrong with SAGEDO and how I fixed every single issue in 24 hours.</p>
      <h2>How I Fixed a 1000-User App Crash in 2 Hours Using AI</h2>
      <p>A startup's mobile app was showing a blank grey screen to every single user. The dev team had been debugging for 10 days. I fixed it in 2 hours.</p>
      <h2>Why Indian Startups Need AI + Human Execution (Not Just Freelancers)</h2>
      <p>The freelancer model is broken for growing startups. Here's why hybrid AI + human execution teams are the future of getting things done in India.</p>
      <h2>5 Signs Your Business Needs SAGEDO Right Now</h2>
      <p>If any of these sound familiar — you're losing money every day you don't fix them. Here are the 5 warning signs that your business execution is broken.</p>
    `,
  },
  {
    path: '/blog/how-i-fixed-sagedo-visibility-google-chatgpt',
    title: "How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours — SAGEDO Blog",
    description: "Over 90% of Indian startups are invisible to AI search engines. SAGEDO founder Mukul Dhiman shares how he fixed visibility on Google, ChatGPT, and Perplexity in 24 hours.",
    content: `
      <article>
        <h1>How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours</h1>
        <p>By Mukul Dhiman | March 11, 2026</p>
        <p>Have you ever searched for your own business on ChatGPT or Google and found nothing? Over 90% of Indian startups are completely invisible to AI search engines — and most founders have no idea why.</p>
        <p>I am Mukul Dhiman, founder of SAGEDO — India's first AI and human hybrid execution team. Three months ago I discovered that ChatGPT, Perplexity, and Google could not find SAGEDO at all. Here is exactly what was wrong and how I fixed every single issue in 24 hours.</p>
        <h2>Fix 1: Your robots.txt Is Blocking AI Crawlers</h2>
        <p>Most Indian startup websites accidentally block AI bots. ChatGPT uses GPTBot. Perplexity uses PerplexityBot. Google uses Googlebot. I updated SAGEDO's robots.txt to explicitly allow all of them. One change. Done.</p>
        <h2>Fix 2: No Crunchbase Profile</h2>
        <p>Crunchbase is where investors, journalists, and AI systems look for business information. I created SAGEDO's profile at crunchbase.com in 23 minutes. Crunchbase immediately assigned a Growth Prediction score of 88/100 and labeled SAGEDO as "Growing — Very Likely."</p>
        <h2>Fix 3: No Wikidata Entry</h2>
        <p>Wikidata powers Wikipedia, Google's Knowledge Graph, and most AI systems. When you exist on Wikidata, ChatGPT can mention you. I created SAGEDO's entry in 18 minutes. SAGEDO now has a permanent, verifiable identity in the world's largest open knowledge database.</p>
        <h2>Fix 4: Google Search Console Not Set Up</h2>
        <p>Without Search Console, Google finds your pages on its own slow schedule. I submitted SAGEDO's sitemap and within 48 hours Google had discovered 10 pages.</p>
        <h2>The Result</h2>
        <p>After fixing all four issues SAGEDO appeared in Crunchbase searches, Wikidata queries, and AI chatbot responses. The entire process took less than 3 hours of actual work.</p>
        <p>If your Indian startup is invisible, the problem is almost always one of these four issues. SAGEDO fixes all of them for you in 24-48 hours. Visit sagedo.in to get started.</p>
      </article>
    `,
  },
  {
    path: '/blog/why-indian-startup-websites-get-zero-google-traffic',
    title: 'Why 96% of Indian Startup Websites Get Zero Traffic from Google — SAGEDO Blog',
    description: '96% of Indian startup websites have the same 3 problems that guarantee zero Google traffic. Here is the full breakdown and how to fix them.',
    content: `
      <article>
        <h1>Why 96% of Indian Startup Websites Get Zero Traffic from Google</h1>
        <p>By Mukul Dhiman | March 12, 2026</p>
        <p>I have reviewed over 50 Indian startup websites in the last 6 months. 96% of them have the same 3 problems that guarantee zero Google traffic. Here is the full breakdown.</p>
        <h2>Problem 1: No Technical SEO Foundation</h2>
        <p>Most Indian startup websites are built by developers who know how to code but have never set up Search Console, submitted a sitemap, or configured meta tags. Google cannot index what it cannot find.</p>
        <h2>Problem 2: No External Signals</h2>
        <p>Google ranks pages based on trust. Trust comes from other websites linking to you, your business appearing on platforms like Crunchbase and Wikidata, and your brand being mentioned in credible places. Most Indian startups have zero external signals.</p>
        <h2>Problem 3: Content That Nobody Searches For</h2>
        <p>Indian startups write content about themselves — features, team, vision. Nobody searches for that. People search for problems they have. Write about their problems and your startup shows up.</p>
        <h2>The Fix</h2>
        <p>SAGEDO's AI + Human Hybrid Execution Team handles all three of these for Indian startups in 48 hours. Visit sagedo.in.</p>
      </article>
    `,
  },
];

// ── Main logic ──────────────────────────────────────────────────────────

function prerender() {
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  for (const route of routes) {
    // Build the target directory and file
    const routeDir = path.join(DIST_DIR, route.path === '/' ? '' : route.path);
    const targetFile = route.path === '/'
      ? path.join(DIST_DIR, 'index.html')
      : path.join(routeDir, 'index.html');

    // Create directories if needed
    if (route.path !== '/') {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Start with the template
    let html = indexHtml;

    // Replace <title> tag
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // Replace meta description
    html = html.replace(
      /<meta name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${route.description}" />`
    );

    // Add canonical URL
    const canonicalUrl = `https://sagedo.in${route.path === '/' ? '' : route.path}`;
    html = html.replace(
      /<link rel="canonical".*?\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace OG tags
    html = html.replace(
      /<meta property="og:title".*?\/>/,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta property="og:url".*?\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Inject SEO content into the root div (visible to crawlers, replaced by React on load)
    // We replace the existing hidden static content div with route-specific content
    const seoContentHtml = `
    <!-- Prerendered SEO Content for ${route.path} (replaced by React on hydration) -->
    <div style="position:absolute; width:1px; height:1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;">
      ${route.content}
    </div>`;

    // Replace the existing static SEO div
    html = html.replace(
      /<!-- Static Content for SEO Crawlers[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/body>)/,
      seoContentHtml
    );

    // Write the file
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`✓ Prerendered: ${route.path} → ${path.relative(DIST_DIR, targetFile)}`);
  }

  console.log(`\nDone! Prerendered ${routes.length} routes.`);
}

prerender();
