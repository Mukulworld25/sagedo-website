import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin, Globe, ArrowRight, Building2, Cpu, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LocationLink {
  title: string;
  description: string;
  href: string;
  isExternalHtml?: boolean;
  tag: string;
}

const metroHubs: LocationLink[] = [
  {
    title: "Bangalore",
    description: "AI automation, SaaS systems, and digital marketing engines for India's tech capital.",
    href: "/digital-marketing-bangalore.html",
    isExternalHtml: true,
    tag: "Tech Hub"
  },
  {
    title: "Chandigarh Tri-City",
    description: "Flagship engineering headquarters and AI agency services in Chandigarh, Mohali & Panchkula.",
    href: "/digital-marketing-chandigarh.html",
    isExternalHtml: true,
    tag: "HQ Hub"
  },
  {
    title: "Delhi NCR",
    description: "Enterprise growth engines, lead gen infrastructure, and custom CRM systems for North India.",
    href: "/digital-marketing-delhi.html",
    isExternalHtml: true,
    tag: "Capital Region"
  },
  {
    title: "Hyderabad",
    description: "High-scale workflow automation, WhatsApp agents, and web infrastructure.",
    href: "/digital-marketing-hyderabad.html",
    isExternalHtml: true,
    tag: "SaaS & Pharma Hub"
  },
  {
    title: "Mumbai",
    description: "Financial services marketing, enterprise web portals, and revenue acceleration.",
    href: "/digital-marketing-mumbai.html",
    isExternalHtml: true,
    tag: "Commercial Capital"
  },
  {
    title: "Pune",
    description: "Manufacturing CRM workflows, B2B sales automation, and local business acceleration.",
    href: "/digital-marketing-pune.html",
    isExternalHtml: true,
    tag: "Industrial & IT"
  }
];

const regionalHubs: LocationLink[] = [
  {
    title: "Custom CRM Development — Chandigarh",
    description: "Tailor-made CRM architectures for regional enterprises and agencies in Chandigarh.",
    href: "/custom-crm-development-chandigarh",
    tag: "AEO Pillar"
  },
  {
    title: "Custom CRM Development — Ludhiana",
    description: "Industrial pipeline tracking and lead management systems for Punjab's manufacturing leaders.",
    href: "/custom-crm-development-ludhiana",
    tag: "AEO Pillar"
  },
  {
    title: "Custom CRM Development — Panchkula",
    description: "Seamless sales automation and multi-channel pipeline software for Haryana businesses.",
    href: "/custom-crm-development-panchkula",
    tag: "AEO Pillar"
  },
  {
    title: "AI Automation Agency — Zirakpur",
    description: "Local business AI integration, telephony agents, and automated booking funnels.",
    href: "/ai-automation-agency-zirakpur",
    tag: "AEO Pillar"
  }
];

const nationwideServices: LocationLink[] = [
  {
    title: "Website Development India",
    description: "High-performance, conversion-engineered web applications with 10-gate QA certification.",
    href: "/website-development-india.html",
    isExternalHtml: true,
    tag: "National Solution"
  },
  {
    title: "Mobile App Development India",
    description: "Cross-platform iOS and Android apps built with production speed and offline resilience.",
    href: "/app-development-india.html",
    isExternalHtml: true,
    tag: "National Solution"
  },
  {
    title: "Google Business Profile Setup",
    description: "Local SEO optimization, review automation, and top-3 local pack dominance.",
    href: "/google-business-profile-setup.html",
    isExternalHtml: true,
    tag: "National Solution"
  },
  {
    title: "New Business Setup India",
    description: "Complete launch stack: company registration, branding, website, CRM, and compliance.",
    href: "/new-business-setup-india.html",
    isExternalHtml: true,
    tag: "National Solution"
  },
  {
    title: "AI Automation Agency India",
    description: "Autonomous agents, voice telephony systems, and WhatsApp multi-agent pipelines.",
    href: "/ai-automation-agency-india",
    tag: "Flagship Pillar"
  },
  {
    title: "B2B Lead Generation Systems",
    description: "Sovereign revenue infrastructure that captures, qualifies, and books high-value deals.",
    href: "/b2b-lead-generation-systems",
    tag: "Flagship Pillar"
  }
];

export default function Locations() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <Helmet>
        <title>Regional Service Locations &amp; Hubs | SAGE DO</title>
        <meta
          name="description"
          content="Explore SAGE DO's regional hubs, local SEO landing pages, and specialized AI automation infrastructure across Bangalore, Chandigarh, Delhi NCR, Mumbai, and nationwide."
        />
        <link rel="canonical" href="https://sagedo.in/locations" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nationwide Presence &amp; Regional Execution</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Service Locations &amp; Regional Hubs
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Headquartered at Mohali City Centre, SAGE DO deploys sovereign revenue engines, AI agent workflows, and digital infrastructure for businesses across every major Indian metro.
          </p>
        </div>

        {/* Metro Hubs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Major Metro Hubs</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Dedicated local landing portals and regional growth engines</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metroHubs.map((hub, idx) => (
              <a
                key={idx}
                href={hub.href}
                className="group block"
              >
                <Card className="h-full p-6 bg-card/60 hover:bg-card/90 border-border/40 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                        {hub.tag}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {hub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {hub.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/20 text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View Regional Page</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Regional Tri-City & Industrial Hubs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Tri-City &amp; Punjab Industrial Pillars</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Deep local custom CRM and automation architecture</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalHubs.map((hub, idx) => (
              <Link key={idx} href={hub.href}>
                <Card className="h-full p-6 bg-card/60 hover:bg-card/90 border-border/40 hover:border-blue-500/40 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40">
                        {hub.tag}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                      {hub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {hub.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/20 text-xs font-medium text-blue-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Explore Pillar Page</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Nationwide Solutions */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Nationwide Digital Solutions</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Core specialized capabilities delivered anywhere in India</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nationwideServices.map((service, idx) => (
              service.isExternalHtml ? (
                <a key={idx} href={service.href} className="group block">
                  <Card className="h-full p-6 bg-card/60 hover:bg-card/90 border-border/40 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                          {service.tag}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/20 text-xs font-medium text-primary flex items-center gap-1.5">
                      <span>View Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </a>
              ) : (
                <Link key={idx} href={service.href}>
                  <Card className="h-full p-6 bg-card/60 hover:bg-card/90 border-border/40 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                          {service.tag}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/20 text-xs font-medium text-primary flex items-center gap-1.5">
                      <span>View Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Need a custom regional rollout?</h3>
          <p className="text-sm text-neutral-400 mb-6">
            Speak directly with our engineering team to deploy dedicated revenue engines, WhatsApp bots, or full-stack software tailored to your specific city or industry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-call">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-colors cursor-pointer shadow-lg shadow-primary/20">
                Book a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a
              href="https://wa.me/916284925684"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold transition-colors border border-neutral-700/60"
            >
              WhatsApp Direct (+91 62849 25684)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
