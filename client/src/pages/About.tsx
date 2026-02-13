import { Card } from "@/components/ui/card";
import { Instagram, Linkedin, Mail, Youtube, MessageCircle } from "lucide-react";
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
    { name: "Instagram", icon: Instagram, handle: "@sagedoai00", status: "Connect", color: "from-pink-600 to-purple-600", url: "https://www.instagram.com/sagedoai00/", isActive: true },
    { name: "LinkedIn", icon: Linkedin, handle: "SAGE DO", status: "Connect", color: "from-blue-600 to-blue-700", url: "https://www.linkedin.com/in/sage-do-1760483a3/", isActive: true },
    { name: "Email", icon: Mail, handle: "hello@sagedo.in", status: "Connect", color: "from-orange-600 to-red-600", url: "mailto:hello@sagedo.in", isActive: true },
    { name: "WhatsApp", icon: MessageCircle, handle: "+91 6284925684", status: "Connect", color: "from-green-600 to-emerald-600", url: "https://wa.me/916284925684", isActive: true },
    { name: "YouTube", icon: Youtube, handle: "@sagedo", status: "Coming Soon", color: "from-red-600 to-red-700", url: "#", isActive: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Logo Watermark (same as homepage) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Red glow effect in center */}
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <img
          src="/sagedo_logo_pro_clean.png"
          alt=""
          className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] object-contain opacity-[0.08]"
          style={{ filter: 'contrast(1.2)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Company Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Team Member Image */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/human_about.png"
                  alt="SAGE DO Team"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 shadow-lg"
                />
                <div>
                  <p className="font-semibold text-foreground">Meet Our Team</p>
                  <p className="text-sm text-muted-foreground">AI + Human Excellence</p>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground">
                Who We Are
              </h1>
              <p className="text-xl text-foreground font-medium leading-relaxed">
                SAGE DO is India's first <span className="text-primary">AI + Human hybrid execution team</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're not a pure AI tool that makes mistakes. We're not a traditional agency that's slow and expensive. We're something new: A hybrid model where AI handles the volume and humans ensure the quality—giving you the best of both worlds.
              </p>

              {/* FOUNDER STORY VIDEO SLOT */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-bold">Watch: The SAGE DO Story</p>
                  <p className="text-xs text-gray-400">From Aerospace Engineer to AI Founder</p>
                </div>
              </div>

              <div className="p-6 bg-muted/20 rounded-xl border border-border/50">
                <p className="font-semibold text-foreground mb-2">Our Founder's Background:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>🚀 Ex-Aerospace Engineer (Tata Lockheed Martin - C130J/F16 programs)</li>
                  <li>⚙️ Operations Manager (25-person teams, 40% efficiency improvement)</li>
                  <li>💻 Full-stack Developer (SaaS, mobile apps, AI automation)</li>
                </ul>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We built SAGE DO because we saw the gap: Pure AI is fast but flawed. Pure human is quality but slow. Nobody was combining both optimally. Now we are.
              </p>
            </div>
            <div className="relative space-y-6">
              <Card className="glass p-8 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Our Philosophy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI is incredibly powerful. But it needs human oversight to be reliable. Humans are incredibly creative. But they need AI to work at scale. <br /><br />
                  <strong className="text-foreground">Together? Unbeatable.</strong>
                </p>
              </Card>

              <Card className="glass p-8 space-y-4 border-primary/20">
                <h3 className="text-2xl font-bold text-foreground">Why Hybrid Beats Everything</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-green-500">✅</span> <strong>VS Pure AI:</strong> Human oversight catches errors AI misses.</li>
                  <li className="flex gap-2"><span className="text-green-500">✅</span> <strong>VS Agencies:</strong> 10x faster processing & lower costs.</li>
                  <li className="flex gap-2"><span className="text-green-500">✅</span> <strong>VS Freelancers:</strong> Consistent reliability (no ghosting).</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow us on social media for updates, tips, and special offers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {socialMedia.map((platform) => (
              platform.isActive ? (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-social-${platform.name.toLowerCase()}`}
                >
                  <Card className="glass p-6 hover:scale-105 transition-all duration-300 cursor-pointer hover-elevate active-elevate-2">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${platform.color}`}>
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.handle}</p>
                      <p className="text-xs font-semibold text-foreground">{platform.status}</p>
                    </div>
                  </Card>
                </a>
              ) : (
                <div
                  key={platform.name}
                  data-testid={`card-social-${platform.name.toLowerCase()}`}
                >
                  <Card className="glass p-6 opacity-60 cursor-not-allowed">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${platform.color}`}>
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.handle}</p>
                      <p className="text-xs font-semibold text-muted-foreground italic">{platform.status}</p>
                    </div>
                  </Card>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Our Work
            </h2>
            <p className="text-lg text-muted-foreground">
              We've delivered <strong>200+ projects</strong> across Startups, Students, Professionals, and Businesses.
            </p>
          </div>

          {/* Testimonials */}
          {allTestimonials.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Client Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTestimonials.map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="glass p-6 hover:scale-105 transition-all duration-300"
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <div className="space-y-4">
                      {testimonial.rating && (
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                        </div>
                      )}
                      <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        {testimonial.imageUrl && (
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.clientName || "Client"}
                            className="w-12 h-12 rounded-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                          {testimonial.clientRole && (
                            <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Work Showcase */}
          {allWorkShowcase.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allWorkShowcase.map((work) => (
                  <Card
                    key={work.id}
                    className="glass overflow-hidden hover:scale-105 transition-all duration-300"
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
                    <div className="p-4">
                      <h4 className="font-bold text-foreground mb-2">{work.title}</h4>
                      <p className="text-sm text-muted-foreground">{work.content}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {allTestimonials.length === 0 && allWorkShowcase.length === 0 && (
            <Card className="glass p-12 text-center">
              <p className="text-xl text-muted-foreground">
                Our gallery is being updated. Check back soon to see testimonials and work samples!
              </p>
            </Card>
          )}
        </section>

        {/* VIDEO TESTIMONIALS SECTION - NEW */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Featured Client Wins
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from founders who scaled with us.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video 1 Placeholder */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer hover:border-primary/50 transition-all">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-bold">"Saved me 40 hours/week"</p>
                <p className="text-xs text-gray-400">Rajesh M, Startup Founder</p>
              </div>
            </div>
            {/* Video 2 Placeholder */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer hover:border-primary/50 transition-all">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-bold">"The hybrid model is genius"</p>
                <p className="text-xs text-gray-400">Anjali S, Healthcare CEO</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section - Required for Razorpay */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Get in touch with us for any queries or support.
            </p>
          </div>

          <Card className="glass p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Get In Touch</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">📞 Phone:</span>
                    <a href="tel:+916284925684" className="hover:text-primary">+91 6284925684</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">📧 Email:</span>
                    <a href="mailto:hello@sagedo.in" className="hover:text-primary">hello@sagedo.in</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-[80px]">💬 WhatsApp:</span>
                    <a href="https://wa.me/916284925684" className="hover:text-primary">+91 6284925684</a>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Business Address</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">📍 Address:</span>
                  </p>
                  <p className="pl-8">
                    SAGE DO AI<br />
                    Chandigarh, India<br />
                    PIN: 160014
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Business Hours: Mon-Sat, 10:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="glass p-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who've freed up their time with SAGEDO AI.
            </p>
            <a
              href="https://wa.me/916284925684?text=Hi!%20I%20want%20to%20learn%20more%20about%20SAGEDO%20AI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                data-testid="button-contact-whatsapp"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="inline-block mr-2 h-5 w-5" />
                Chat on WhatsApp
              </button>
            </a>
          </Card>
        </section>
      </div>
    </div>
  );
}
