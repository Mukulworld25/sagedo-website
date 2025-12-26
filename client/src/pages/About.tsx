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
    { name: "LinkedIn", icon: Linkedin, handle: "Mukul Dhiman", status: "Connect", color: "from-blue-600 to-blue-700", url: "https://www.linkedin.com/in/mukul-dhiman25", isActive: true },
    { name: "Email", icon: Mail, handle: "hello@sagedo.in", status: "Connect", color: "from-orange-600 to-red-600", url: "mailto:hello@sagedo.in", isActive: true },
    { name: "WhatsApp", icon: MessageCircle, handle: "+91 6284925684", status: "Connect", color: "from-green-600 to-emerald-600", url: "https://wa.me/916284925684", isActive: true },
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
                About SAGEDO AI
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're on a mission to free you from daily grunt work so you can focus on what truly matters.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SAGEDO AI</strong> is your intelligent assistant for business, education, career, and personal growth. We leverage cutting-edge AI to handle your repetitive tasks—from creating ad copies and presentations to designing resumes and editing photos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in India 🇮🇳, we believe in empowering individuals and businesses to achieve more by doing less grunt work. Our tagline says it all: <em className="text-primary font-semibold">"We Do Your Daily Grind, You Do Grand Things."</em>
              </p>
            </div>
            <div className="relative">
              <Card className="glass p-8 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the most trusted AI partner for millions, automating the mundane so humans can innovate, create, and thrive.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Our Promise</h3>
                  <p className="text-muted-foreground">
                    Fast, affordable, and high-quality AI solutions tailored to your needs. From ₹100 tasks to complete business automation.
                  </p>
                </div>
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
              Gallery & Testimonials
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our clients say and explore our recent work.
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
