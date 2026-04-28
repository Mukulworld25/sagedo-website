import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowRight, Clock, User } from 'lucide-react';

const blogPosts = [
    {
        slug: 'how-i-built-digital-ecosystem-jute-manufacturer-5-days',
        title: 'How I Built a Complete Digital Ecosystem for a Jute Manufacturer in 5 Days',
        excerpt: 'A rural jute products business had zero online presence. I built their website, brand identity, social media, and Google listing from scratch in 5 days flat. Here is the exact playbook.',
        date: 'April 4, 2026',
        readTime: '6 min read',
        category: 'Case Study',
    },
    {
        slug: 'how-much-website-cost-india-2026',
        title: 'How Much Does a Website Cost in India in 2026? Complete Breakdown',
        excerpt: 'An honest, no-BS breakdown of what a business website actually costs in India — from free DIY tools to ₹10L agency builds. Plus a comparison table to help you choose.',
        date: 'April 1, 2026',
        readTime: '6 min read',
        category: 'Guide',
    },
    {
        slug: '5-things-after-gst-registration',
        title: '5 Things Every Business MUST Do After GST Registration',
        excerpt: '1.8 lakh Indians register for GST every month — and most of them stop there. Here are the 5 digital assets every new business needs to start getting customers.',
        date: 'April 1, 2026',
        readTime: '5 min read',
        category: 'Guide',
    },
    {
        slug: 'google-business-profile-setup-guide-india',
        title: 'Google Business Profile Setup Guide: Step-by-Step for Indian Businesses',
        excerpt: 'A complete step-by-step guide to setting up your Google Business Profile so customers find you on Google Maps. Includes tips for service-area businesses without a physical shop.',
        date: 'April 1, 2026',
        readTime: '7 min read',
        category: 'Guide',
    },
    {
        slug: 'best-app-development-company-india-2026',
        title: 'Best Affordable App Development Companies in India — 2026 Guide',
        excerpt: 'Comparing app development options in India — agencies, freelancers, and AI-hybrid teams. Real cost comparisons, timelines, and what to watch out for.',
        date: 'April 1, 2026',
        readTime: '6 min read',
        category: 'Guide',
    },
    {
        slug: 'why-indian-startup-websites-get-zero-google-traffic',
        title: 'Why 96% of Indian Startup Websites Get Zero Traffic from Google',
        excerpt: 'I have reviewed over 50 Indian startup websites in the last 6 months. 96% of them have the same 3 problems that guarantee zero Google traffic.',
        date: 'March 12, 2026',
        readTime: '4 min read',
        category: 'SEO',
    },
    {
        slug: 'how-i-fixed-sagedo-visibility-google-chatgpt',
        title: "How I Fixed My Indian Startup's Invisibility on Google and ChatGPT in 24 Hours",
        excerpt: 'Over 90% of Indian startups are completely invisible to AI search engines. Here is exactly what was wrong with SAGEDO and how I fixed every single issue in 24 hours.',
        date: 'March 11, 2026',
        readTime: '5 min read',
        category: 'Case Study',
    },
    {
        slug: 'fixed-1000-user-app-crash-2-hours',
        title: 'How I Fixed a 1000-User App Crash in 2 Hours Using AI',
        excerpt: 'A startup\'s mobile app was showing a blank grey screen to every single user. The dev team had been debugging for 10 days. I fixed it in 2 hours.',
        date: 'March 1, 2026',
        readTime: '5 min read',
        category: 'Case Study',
    },
    {
        slug: 'indian-startups-need-ai-human-execution',
        title: 'Why Indian Startups Need AI + Human Execution (Not Just Freelancers)',
        excerpt: 'The freelancer model is broken for growing startups. Here\'s why hybrid AI + human execution teams are the future of getting things done in India.',
        date: 'February 28, 2026',
        readTime: '7 min read',
        category: 'Industry',
    },
    {
        slug: '5-signs-business-needs-sagedo',
        title: '5 Signs Your Business Needs SAGEDO Right Now',
        excerpt: 'If any of these sound familiar — you\'re losing money every day you don\'t fix them. Here are the 5 warning signs that your business execution is broken.',
        date: 'February 25, 2026',
        readTime: '4 min read',
        category: 'Growth',
    },
];

export default function Blog() {
    return (
        <>
            <Helmet>
                <title>SAGEDO Blog — AI Execution Tips for Indian Startups & Founders</title>
                <meta name="description" content="Learn how AI + human execution helps Indian startups grow faster. Case studies, tips, and strategies from SAGEDO — India's first AI hybrid execution team." />
            </Helmet>

            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">SAGEDO Blog</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                            Insights & Case Studies
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real stories from the frontlines of AI execution. No fluff. No theory. Just what works for Indian founders.
                        </p>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid gap-8">
                        {blogPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <article className="group p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/5">
                                    <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs">
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                        </span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                    <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20">
                        <h3 className="text-2xl font-bold text-foreground mb-3">Want results like these for your business?</h3>
                        <p className="text-muted-foreground mb-6">Get a free AI audit — no sales pitch, just actionable insights.</p>
                        <Link href="/free-audit">
                            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-destructive text-white font-semibold hover:opacity-90 transition-opacity">
                                Get Your Free AI Audit <ArrowRight className="inline w-4 h-4 ml-1" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
