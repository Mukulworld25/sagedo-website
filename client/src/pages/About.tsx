import { Card } from "@/components/ui/card";
import { Instagram, Linkedin, Twitter, Youtube, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Gallery as GalleryType } from "@shared/schema";

export default function About() {
  const { data: galleryItems = [] } = useQuery<GalleryType[]>({
    queryKey: ["/api/gallery"],
  });

  const testimonials = galleryItems.filter((item) => item.type === "testimonial" && item.isVisible);
  const workShowcase = galleryItems.filter((item) => item.type === "work_showcase" && item.isVisible);

  const socialMedia = [
    { name: "Instagram", icon: Instagram, handle: "@sagedoai", followers: "1.2K", color: "from-pink-600 to-purple-600", url: "#" },
    { name: "LinkedIn", icon: Linkedin, handle: "@sagedo-ai", followers: "800", color: "from-blue-600 to-blue-700", url: "#" },
    { name: "Twitter", icon: Twitter, handle: "@sagedoai", followers: "650", color: "from-sky-500 to-blue-600", url: "#" },
    { name: "YouTube", icon: Youtube, handle: "@SAGEDOAI", followers: "2.1K", color: "from-red-600 to-red-700", url: "#" },
    { name: "WhatsApp", icon: MessageCircle, handle: "+91 7018709291", followers: "Direct", color: "from-green-600 to-emerald-600", url: "https://wa.me/917018709291" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Company Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
                    <p className="text-xs font-semibold text-primary">{platform.followers} Followers</p>
                  </div>
                </Card>
              </a>
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
          {testimonials.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Client Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
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
          {workShowcase.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workShowcase.map((work) => (
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

          {testimonials.length === 0 && workShowcase.length === 0 && (
            <Card className="glass p-12 text-center">
              <p className="text-xl text-muted-foreground">
                Our gallery is being updated. Check back soon to see testimonials and work samples!
              </p>
            </Card>
          )}
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
              href="https://wa.me/917018709291?text=Hi!%20I%20want%20to%20learn%20more%20about%20SAGEDO%20AI"
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
