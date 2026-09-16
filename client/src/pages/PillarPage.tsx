import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, Shield, Zap, MessageCircle, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pillarPages, PillarPageData } from '@/data/pillarData';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

interface PillarPageProps {
  slug?: string;
}

export default function PillarPage({ slug: propSlug }: PillarPageProps) {
  const [location] = useLocation();
  
  // Resolve slug from prop or pathname (e.g. "/ai-automation-agency-india" -> "ai-automation-agency-india")
  const currentSlug = propSlug || location.replace(/^\//, '').split('?')[0];
  const page: PillarPageData | undefined = pillarPages[currentSlug];

  if (!page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested resource could not be found.</p>
          <Link href="/">
            <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sagedo.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title.split('|')[0].trim(),
        "item": `https://sagedo.in/${page.slug}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={`https://sagedo.in/${page.slug}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={`https://sagedo.in/${page.slug}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8">
        <article className="max-w-4xl mx-auto">
          
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <Link href="/">
              <span className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer uppercase tracking-wider">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to SAGE DO
              </span>
            </Link>
          </div>

          {/* Header Banner */}
          <header className="mb-12 border-b border-border/40 pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin className="w-3.5 h-3.5" /> {page.badge}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-[1.15] mb-6">
              {page.h1}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mb-8">
              <span>By <strong>{page.author}</strong></span>
              <span>•</span>
              <span>{page.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {page.readTime}</span>
              <span>•</span>
              <span className="text-primary font-medium">{page.locationScope}</span>
            </div>

            {/* BLUF Highlight Box */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border-l-4 border-primary shadow-xl shadow-primary/5">
              <span className="text-xs font-black uppercase tracking-widest text-primary block mb-2">
                BLUF (Bottom Line Up Front)
              </span>
              <p className="text-base md:text-lg text-neutral-200 font-medium leading-relaxed">
                {page.bluf}
              </p>
            </div>
          </header>

          {/* Challenge / Context Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
              {page.challengeTitle}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              {page.challengeParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Comparison Matrix Table */}
          <section className="mb-16 overflow-hidden rounded-2xl border border-border/40 bg-neutral-950/60 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              {page.comparisonTitle}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm md:text-base">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="p-4 text-muted-foreground font-semibold uppercase text-xs tracking-wider">{page.comparisonHeaders[0]}</th>
                    <th className="p-4 text-red-400 font-semibold uppercase text-xs tracking-wider">{page.comparisonHeaders[1]}</th>
                    <th className="p-4 text-primary font-bold uppercase text-xs tracking-wider bg-primary/10 rounded-t-lg">{page.comparisonHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {page.comparisonRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/20 hover:bg-neutral-900/40 transition-colors">
                      <td className="p-4 font-medium text-foreground">{row.feature}</td>
                      <td className="p-4 text-muted-foreground">{row.competitor}</td>
                      <td className="p-4 font-bold text-green-400 bg-primary/5">{row.sagedo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8">
              {page.deliverablesTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {page.deliverables.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-border/30 bg-neutral-900/40 hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Accordion Section (AEO/GEO Rich Snippet Target) */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {page.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-border/40 rounded-xl px-5 py-1 bg-neutral-900/30">
                  <AccordionTrigger className="text-left text-base font-bold text-foreground hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Institutional Conversion CTA Banner */}
          <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-neutral-900 to-neutral-950 border-2 border-primary/30 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <span className="inline-block text-xs font-black uppercase tracking-widest text-primary mb-3">
              Action Plan · 48-Hour SLA
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-foreground mb-4">
              {page.ctaHeading}
            </h3>
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              {page.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/free-audit">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 cursor-pointer">
                  Get Free Revenue Audit <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/916284925684?text=Hi%20Mukul!%20I'm%20inquiring%20about%20${encodeURIComponent(page.primaryKeyword)}%20from%20SAGEDO.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`pillar_${page.slug}`)}
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 font-bold border-green-500/40 text-green-400 hover:bg-green-500/10 rounded-xl cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp the Founder
                </Button>
              </a>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
