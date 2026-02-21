import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, Youtube, MessageCircle, Phone, ArrowRight, Star, CheckCircle2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Gallery as GalleryType } from "@shared/schema";
import { samplePortfolio, sampleTestimonials } from "@/data/sampleData";

export default function About() {
  const { data: galleryItems = [] } = useQuery<GalleryType[]>({
    queryKey: ["/api/gallery"],
  });

  // Merge database items with sample data (samples only show if DB is empty)
  const allTestimonials = galleryItems.length > 0
    ? galleryItems.filter((item) => item.type === "testimonial" && item.isVisible)
    : sampleTestimonials;

  const allWorkShowcase = galleryItems.length > 0
    ? galleryItems.filter((item) => item.type === "work_showcase" && item.isVisible)
    : samplePortfolio;

  const socialMedia = [
    { name: "WhatsApp", icon: MessageCircle, handle: "+91 6284925684", color: "from-green-600 to-emerald-600", url: "https://wa.me/916284925684" },
    { name: "Instagram", icon: Instagram, handle: "@sagedoai00", color: "from-pink-600 to-purple-600", url: "https://www.instagram.com/sagedoai00/" },
    { name: "LinkedIn", icon: Linkedin, handle: "SAGE DO", color: "from-blue-600 to-blue-700", url: "https://www.linkedin.com/in/sage-do-1760483a3/" },
    { name: "YouTube", icon: Youtube, handle: "@SageDo-Muk", color: "from-red-600 to-red-700", url: "https://www.youtube.com/@SageDo-Muk" },
    { name: "Email", icon: Mail, handle: "hello@sagedo.in", color: "from-orange-600 to-red-600", url: "mailto:hello@sagedo.in" },
  ];

  const credentials = [
    { emoji: "🚀", text: "Ex-Aerospace Engineer (Tata Lockheed Martin — C130J/F16 programs)" },
    { emoji: "⚙️", text: "Operations Manager (25-person teams, 40% efficiency improvement)" },
    { emoji: "💻", text: "Full-stack Developer (SaaS, mobile apps, AI automation)" },
    { emoji: "🤖", text: "AI Engineer (Built 30+ AI-powered services from scratch)" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(0 0% 3.9%) 0%, hsl(0 0% 5%) 100%)' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════
            FOUNDER SECTION - The Hero
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Founder Photo */}
            <div className="shrink-0">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br from-primary via-red-500 to-orange-500 p-1 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/founder-mukul.jpg"
                  alt="Mukul Dhiman — Founder, SAGE DO"
                  className="w-full h-full rounded-2xl object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center"><span class="text-7xl font-black text-white">M</span></div>';
                  }}
                />
              </div>
            </div>

            {/* Founder Text */}
            <div className="text-center md:text-left space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  Founder & CEO
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-foreground">
                  Mukul Dhiman
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Ex-Aerospace engineer turned AI builder. I started SAGE DO because I saw Indian businesses getting <span className="text-primary font-semibold">ripped off by agencies charging ₹5 Lakhs</span> for what AI can do in 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20saw%20your%20About%20page.%20Can%20we%20discuss%20my%20project%3F" target="_blank" rel="noopener noreferrer">
                  <div className={buttonVariants({ className: "bg-green-600 hover:bg-green-500 text-white font-bold px-6 h-12 rounded-xl cursor-pointer" })}>
                    <MessageCircle className="mr-2 h-5 w-5" /> Message Me Directly
                  </div>
                </a>
                <a href="tel:+916284925684">
                  <div className={buttonVariants({ variant: "outline", className: "font-bold px-6 h-12 rounded-xl cursor-pointer border-border/50 hover:bg-muted/50" })}>
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            {credentials.map((c, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20">
                <span className="text-xl">{c.emoji}</span>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT IS SAGE DO — Full Company Description
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              What is SAGE DO?
            </h2>
          </div>

          <div className="p-8 md:p-12 rounded-2xl bg-background/50 border border-border/20 mb-8">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">SAGE DO is India's first AI + Human hybrid service platform.</strong> We combine the speed and scale of artificial intelligence with the precision and creativity of human experts to deliver professional-grade digital services — from websites and apps to content creation, marketing, and business automation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              With <strong className="text-foreground">30+ services</strong> across Business, Student, Professional, and Personal categories, we serve visionary founders, high-growth startups, and elite creators who refuse to settle for mediocre results. Every task is analyzed by AI, verified by humans, and delivered within <strong className="text-primary">24-48 hours</strong>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in Chandigarh, India, SAGE DO was built on a simple truth: <span className="text-primary font-semibold">Indian businesses deserve agency-quality work at startup-friendly prices</span>. No more paying ₹5 Lakhs to agencies. No more chasing freelancers. No more spending hours fighting with AI tools. Just tell us what you need — we handle the rest.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            VISION & MISSION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20">
              <div className="text-3xl mb-4">🎯</div>
              <h2 className="text-2xl font-black text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to world-class digital services for every Indian business, student, and professional — making enterprise-quality work available at startup-friendly prices, delivered at AI speed. We envision a future where <strong className="text-foreground">no brilliant idea dies because of execution bottlenecks</strong>.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20">
              <div className="text-3xl mb-4">🚀</div>
              <h2 className="text-2xl font-black text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the execution gap between ideas and reality. We help businesses, students, and professionals <strong className="text-foreground">get their most difficult tasks done</strong> — faster, cheaper, and better than any alternative — by combining the best of artificial intelligence with irreplaceable human expertise.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT WE DO — Service Categories
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              An AI Assistant for Every Part of Your Life
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📈", name: "Scale Business", sub: "Ads, Landing Pages, Funnels", desc: "Stop burning cash on agencies. Get high-converting websites, ad campaigns, and automation — at a fraction of the cost.", color: "from-blue-500/10 to-transparent", border: "border-blue-500/20" },
              { icon: "🎓", name: "Ace Academics", sub: "Research, PPTs, Theses", desc: "Top grades, zero stress. Research papers, presentations, thesis formatting, and data analysis done right.", color: "from-green-500/10 to-transparent", border: "border-green-500/20" },
              { icon: "🚀", name: "Career Boost", sub: "Resumes, LinkedIn, Portfolios", desc: "Land your dream job with ATS-optimized resumes, LinkedIn makeovers, and top-1% personal branding.", color: "from-purple-500/10 to-transparent", border: "border-purple-500/20" },
              { icon: "🔥", name: "Viral Content", sub: "Reels, Edits, Scripts", desc: "Grow your audience with thumb-stopping content. Video editing, scriptwriting, and social media management.", color: "from-orange-500/10 to-transparent", border: "border-orange-500/20" },
            ].map((cat, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} hover:scale-[1.02] transition-transform`}>
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-black text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{cat.sub}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/services">
              <div className={buttonVariants({ variant: "outline", className: "font-bold px-8 h-12 rounded-xl cursor-pointer border-border/50 hover:bg-muted/50" })}>
                Explore All 30+ Services <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHILOSOPHY & WHY HYBRID
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              The AI + Human Advantage
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-background/50 border border-border/20">
              <h2 className="text-2xl font-black text-foreground mb-4">Our Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AI is incredibly powerful. But it needs human oversight to be reliable. Humans are incredibly creative. But they need AI to work at scale.
              </p>
              <p className="text-xl font-black text-foreground">Together? Unbeatable.</p>
            </div>

            <div className="p-8 rounded-2xl bg-background/50 border border-primary/20">
              <h2 className="text-2xl font-black text-foreground mb-4">Why Hybrid Beats Everything</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">VS Pure AI:</strong> Human oversight catches errors AI misses</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">VS Agencies:</strong> 10x faster processing & lower costs</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">VS Freelancers:</strong> Consistent reliability (no ghosting)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SOCIAL MEDIA - Connect
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Connect
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Let's Stay in Touch
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${platform.name.toLowerCase()}`}
                className="group"
              >
                <div className="p-5 rounded-2xl bg-background/50 border border-border/20 hover:border-primary/30 transition-all hover:-translate-y-1 text-center space-y-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${platform.color} mx-auto w-fit`}>
                    <platform.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{platform.name}</h3>
                  <p className="text-xs text-muted-foreground">{platform.handle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WORK SHOWCASE - Portfolio
        ═══════════════════════════════════════════════════════════════════ */}
        {(allTestimonials.length > 0 || allWorkShowcase.length > 0) && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Our Work
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Built by Us. Trusted by Founders.
              </h2>
            </div>

            {/* Testimonials */}
            {allTestimonials.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Early Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="p-6 rounded-2xl bg-background/50 border border-border/20 hover:border-primary/30 transition-all"
                      data-testid={`card-testimonial-${testimonial.id}`}
                    >
                      <div className="space-y-4">
                        {testimonial.rating && (
                          <div className="flex gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        )}
                        <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                        <div className="flex items-center gap-3">
                          {testimonial.imageUrl ? (
                            <img
                              src={testimonial.imageUrl}
                              alt={testimonial.clientName || "Client"}
                              className="w-10 h-10 rounded-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-destructive flex items-center justify-center text-white font-bold text-sm">
                              {(testimonial.clientName || "C").charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                            {testimonial.clientRole && (
                              <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work Showcase */}
            {allWorkShowcase.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Selected Work</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allWorkShowcase.map((work) => (
                    <div
                      key={work.id}
                      className="rounded-2xl bg-background/50 border border-border/20 overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1"
                      data-testid={`card-work-${work.id}`}
                    >
                      {work.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={work.imageUrl}
                            alt={work.title || "Work showcase"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h4 className="font-bold text-foreground mb-2">{work.title}</h4>
                        <p className="text-sm text-muted-foreground">{work.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Get In Touch
            </h2>
          </div>

          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-background/50 border border-border/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Reach Out</h3>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">📞 Phone:</span>
                    <a href="tel:+916284925684" className="hover:text-primary transition-colors">+91 6284925684</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">📧 Email:</span>
                    <a href="mailto:hello@sagedo.in" className="hover:text-primary transition-colors">hello@sagedo.in</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">💬 WhatsApp:</span>
                    <a href="https://wa.me/916284925684" className="hover:text-primary transition-colors">+91 6284925684</a>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Office</h3>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    SAGE DO AI<br />
                    Chandigarh, India<br />
                    PIN: 160014
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mon – Sat, 10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="text-center pb-4">
          <div className="p-12 rounded-2xl bg-gradient-to-t from-green-500/5 to-background/50 border border-border/20">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              No sales pitch. No pressure. Just a real conversation about what you need.
            </p>
            <p className="text-sm text-green-400 font-bold mb-8">
              ⚡ Average response time: Under 5 minutes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20want%20to%20discuss%20my%20project.%20What's%20the%20best%20way%20to%20get%20started%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={buttonVariants({ size: "lg", className: "h-14 px-10 text-lg font-semibold bg-green-600 hover:bg-green-500 rounded-xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 cursor-pointer" })}>
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us Now
                </div>
              </a>
              <a href="tel:+916284925684">
                <div className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-10 text-lg font-semibold rounded-xl border-border/50 hover:bg-muted/50 cursor-pointer" })}>
                  <Phone className="mr-2 h-5 w-5" /> Call Directly
                </div>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
