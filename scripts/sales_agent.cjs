#!/usr/bin/env node
/**
 * SAGE DO — Automated B2B Sales Prospecting Agent
 * ──────────────────────────────────────────────────
 * Audits a target website for speed, SEO, and engagement gaps,
 * then generates a custom cold outreach pitch template.
 *
 * Usage:
 *   node scripts/sales_agent.js <target-url>
 *
 * Example:
 *   node scripts/sales_agent.js https://example-business.com
 *
 * Output:
 *   - Console report of identified issues
 *   - Ready-to-send LinkedIn/email pitch template
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// ─── CONSTANTS ────────────────────────────────────────────
const TIMEOUT_MS = 10000;
const SLOW_THRESHOLD_MS = 3000;

// ─── HELPERS ──────────────────────────────────────────────

function fetchPage(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const start = Date.now();

    const req = client.get(targetUrl, { timeout: TIMEOUT_MS, headers: { 'User-Agent': 'SageDo-Sales-Auditor/1.0' } }, (res) => {
      const loadTime = Date.now() - start;

      // Follow one redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') ? res.headers.location : `${parsed.origin}${res.headers.location}`;
        return fetchPage(redirectUrl).then(resolve).catch(reject);
      }

      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          loadTime,
          url: targetUrl,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// ─── AUDIT CHECKS ─────────────────────────────────────────

function auditPage(result) {
  const { body, loadTime, headers } = result;
  const issues = [];
  const strengths = [];
  const lowerBody = body.toLowerCase();

  // 1. Speed
  if (loadTime > SLOW_THRESHOLD_MS) {
    issues.push({
      category: 'Speed',
      severity: 'HIGH',
      finding: `Page took ${(loadTime / 1000).toFixed(1)}s to load (threshold: ${SLOW_THRESHOLD_MS / 1000}s)`,
      impact: 'Google downgrades slow sites. Over 50% of mobile visitors bounce after 3 seconds.',
      fix: 'Image compression, lazy loading, CDN setup, server-side caching'
    });
  } else {
    strengths.push(`Page loads in ${(loadTime / 1000).toFixed(1)}s — good speed`);
  }

  // 2. Meta title
  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || titleMatch[1].trim().length < 10) {
    issues.push({
      category: 'SEO',
      severity: 'HIGH',
      finding: 'Missing or very short <title> tag',
      impact: 'Google uses the title tag as the main ranking signal for search results.',
      fix: 'Add a descriptive 50-60 character title tag with primary keywords'
    });
  } else {
    strengths.push(`Has title tag: "${titleMatch[1].trim().substring(0, 50)}..."`);
  }

  // 3. Meta description
  const metaDescMatch = body.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    || body.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  if (!metaDescMatch) {
    issues.push({
      category: 'SEO',
      severity: 'MEDIUM',
      finding: 'Missing meta description',
      impact: 'Google shows a random page snippet instead of your sales message.',
      fix: 'Add a compelling 150-160 character meta description'
    });
  }

  // 4. Schema / JSON-LD
  if (!lowerBody.includes('application/ld+json')) {
    issues.push({
      category: 'SEO',
      severity: 'MEDIUM',
      finding: 'No structured data (Schema.org / JSON-LD)',
      impact: 'Missing rich snippets in search results = lower click-through rates.',
      fix: 'Add LocalBusiness or Organization JSON-LD schema'
    });
  }

  // 5. Open Graph
  if (!lowerBody.includes('og:title') && !lowerBody.includes('og:image')) {
    issues.push({
      category: 'Social',
      severity: 'LOW',
      finding: 'Missing Open Graph meta tags',
      impact: 'Shared links on LinkedIn/Facebook/WhatsApp show no preview image or description.',
      fix: 'Add og:title, og:description, og:image meta tags'
    });
  }

  // 6. Sitemap reference
  if (!lowerBody.includes('sitemap')) {
    issues.push({
      category: 'SEO',
      severity: 'MEDIUM',
      finding: 'No sitemap reference found in HTML',
      impact: 'Google may not discover all your pages efficiently.',
      fix: 'Create and submit an XML sitemap to Google Search Console'
    });
  }

  // 7. Mobile viewport
  if (!lowerBody.includes('viewport')) {
    issues.push({
      category: 'Mobile',
      severity: 'HIGH',
      finding: 'Missing viewport meta tag',
      impact: 'Site is not mobile-responsive. Google penalizes non-mobile sites since 2019.',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">'
    });
  } else {
    strengths.push('Has mobile viewport meta tag');
  }

  // 8. WhatsApp / Chat widget
  const hasChatWidget = lowerBody.includes('whatsapp') || lowerBody.includes('tawk.to') || lowerBody.includes('crisp.chat')
    || lowerBody.includes('intercom') || lowerBody.includes('livechat') || lowerBody.includes('tidio');
  if (!hasChatWidget) {
    issues.push({
      category: 'Engagement',
      severity: 'HIGH',
      finding: 'No chat widget or WhatsApp integration detected',
      impact: '90% of Indian customers prefer WhatsApp for business communication. Missing chat = missed leads.',
      fix: 'Add a WhatsApp Business chat button or AI chatbot'
    });
  } else {
    strengths.push('Has chat/WhatsApp integration');
  }

  // 9. SSL
  if (!result.url.startsWith('https')) {
    issues.push({
      category: 'Security',
      severity: 'HIGH',
      finding: 'Website not using HTTPS',
      impact: 'Chrome shows "Not Secure" warning. Google downgrades HTTP sites.',
      fix: 'Install an SSL certificate (free via Let\'s Encrypt or Cloudflare)'
    });
  } else {
    strengths.push('HTTPS enabled');
  }

  // 10. Analytics
  const hasAnalytics = lowerBody.includes('google-analytics') || lowerBody.includes('gtag') || lowerBody.includes('ga4')
    || lowerBody.includes('fbq(') || lowerBody.includes('analytics');
  if (!hasAnalytics) {
    issues.push({
      category: 'Analytics',
      severity: 'MEDIUM',
      finding: 'No analytics tracking detected',
      impact: 'You can\'t improve what you can\'t measure. No visitor data = blind marketing decisions.',
      fix: 'Install Google Analytics 4 or a privacy-friendly alternative'
    });
  }

  return { issues, strengths };
}

// ─── PITCH GENERATOR ──────────────────────────────────────

function generatePitch(domain, audit) {
  const { issues, strengths } = audit;
  const highIssues = issues.filter(i => i.severity === 'HIGH');
  const topIssue = highIssues[0] || issues[0];

  const linkedInMessage = `Hi [First Name],

Saw you're running ${domain}. I ran a quick technical audit and noticed ${issues.length} fixable issues — the biggest one being ${topIssue ? topIssue.finding.toLowerCase() : 'missing SEO setup'}.

I recorded a 60-second Loom showing the exact problems and how to fix them (no sales pitch). Want me to share it?

— Mukul, Sage Do`;

  const emailTemplate = `Subject: Quick technical suggestion for ${domain}

Hi [First Name],

I visited ${domain} today and found ${issues.length} issues that are likely costing you leads:

${issues.slice(0, 3).map((issue, i) => `${i + 1}. [${issue.severity}] ${issue.finding} — ${issue.impact}`).join('\n')}

We build high-converting business websites and WhatsApp sales bots that fix exactly these problems — and we deliver in under 7 days.

Would you be open to a 10-minute call to show you the fixes?

Best,
Mukul Dhiman
Founder, Sage Do
https://sagedo.in
WhatsApp: +91 6284925684`;

  const loomScript = `[SCREEN RECORDING SCRIPT — ${domain}]

1. Open ${domain} in Chrome
2. Show the load time in DevTools Network tab
${issues.map((issue, i) => `${i + 3}. Point out: "${issue.finding}" — explain that ${issue.impact}`).join('\n')}
${issues.length + 3}. End with: "These are all fixable in under 7 days. If you want, I can share how we'd do it for you."`;

  return { linkedInMessage, emailTemplate, loomScript };
}

// ─── MAIN ─────────────────────────────────────────────────

async function main() {
  const targetUrl = process.argv[2];

  if (!targetUrl) {
    console.log('\n  🔍 SAGE DO — Sales Prospecting Agent');
    console.log('  ────────────────────────────────────');
    console.log('  Usage: node scripts/sales_agent.js <target-url>\n');
    console.log('  Example: node scripts/sales_agent.js https://example-business.com\n');
    process.exit(1);
  }

  const url = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
  const domain = extractDomain(url);

  console.log(`\n  🔍 SAGE DO Sales Auditor — Analyzing: ${domain}`);
  console.log('  ' + '═'.repeat(55));

  try {
    const result = await fetchPage(url);
    const audit = auditPage(result);
    const pitch = generatePitch(domain, audit);

    // Display strengths
    if (audit.strengths.length > 0) {
      console.log('\n  ✅ STRENGTHS DETECTED:');
      audit.strengths.forEach(s => console.log(`     ✓ ${s}`));
    }

    // Display issues
    if (audit.issues.length > 0) {
      console.log('\n  ⚠️  ISSUES FOUND:');
      console.log('  ' + '─'.repeat(55));
      audit.issues.forEach((issue, i) => {
        const severityIcon = issue.severity === 'HIGH' ? '🔴' : issue.severity === 'MEDIUM' ? '🟡' : '🟢';
        console.log(`\n  ${i + 1}. ${severityIcon} [${issue.severity}] ${issue.category}`);
        console.log(`     Finding: ${issue.finding}`);
        console.log(`     Impact: ${issue.impact}`);
        console.log(`     Fix: ${issue.fix}`);
      });
    } else {
      console.log('\n  ✅ No critical issues found — this is a well-maintained site.');
    }

    // Display pitch templates
    console.log('\n\n  📧 OUTREACH TEMPLATES');
    console.log('  ' + '═'.repeat(55));

    console.log('\n  ── LinkedIn Connection Message ──');
    console.log(pitch.linkedInMessage.split('\n').map(l => '  ' + l).join('\n'));

    console.log('\n  ── Cold Email Template ──');
    console.log(pitch.emailTemplate.split('\n').map(l => '  ' + l).join('\n'));

    console.log('\n  ── Loom Video Script ──');
    console.log(pitch.loomScript.split('\n').map(l => '  ' + l).join('\n'));

    // Summary
    const score = Math.max(0, 100 - (audit.issues.filter(i => i.severity === 'HIGH').length * 20) - (audit.issues.filter(i => i.severity === 'MEDIUM').length * 10) - (audit.issues.filter(i => i.severity === 'LOW').length * 5));
    console.log(`\n\n  📊 AUDIT SCORE: ${score}/100`);
    console.log(`  Issues: ${audit.issues.length} | High: ${audit.issues.filter(i => i.severity === 'HIGH').length} | Medium: ${audit.issues.filter(i => i.severity === 'MEDIUM').length} | Low: ${audit.issues.filter(i => i.severity === 'LOW').length}`);
    console.log(`  Prospect Quality: ${score < 50 ? '🔥 HOT LEAD — Many fixable problems' : score < 80 ? '🟡 WARM LEAD — Some improvements needed' : '🟢 COOL — Already well-optimized'}`);
    console.log('\n');

  } catch (err) {
    console.error(`\n  ❌ Error auditing ${domain}: ${err.message}`);
    console.log('  Tip: Make sure the URL is accessible and correctly formatted.\n');
    process.exit(1);
  }
}

main();
