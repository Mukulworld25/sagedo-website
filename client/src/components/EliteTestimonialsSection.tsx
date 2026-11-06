import React from "react";
import { Star, ShieldCheck, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EliteTestimonialsSection({ approvedTestimonials }: { approvedTestimonials: any[] }) {
  const defaultReviews = [
    { 
      name: "Priya Singh", 
      role: "Verified Business Owner · Trustpilot ⭐", 
      text: "Sagedo is an easy-to-use and efficient platform that helps simplify tasks and save time. It has a clean interface and smooth onboarding. I've had a great experience with Sagedo.", 
      rating: 5,
      system: "High-Speed Business Webfront"
    },
    { 
      name: "Akshit Kashyap", 
      role: "Verified Founder · Trustpilot ⭐", 
      text: "Why AI is important. Everything is fine, nice service, very good behaviour. What a cool and knowledgeable experience to know about AI.", 
      rating: 5,
      system: "Custom AI Lead Pipeline"
    },
    { 
      name: "Arushi Vashist", 
      role: "Verified Client · Trustpilot ⭐", 
      text: "Very reliable. Their service and everything were good.", 
      rating: 5,
      system: "Bespoke Clinic Booking Engine"
    },
    { 
      name: "Tahira War", 
      role: "Verified Client · Trustpilot ⭐", 
      text: "Everything was good overall. Good service provider.", 
      rating: 5,
      system: "WhatsApp Automation Bot"
    }
  ];

  const displayList = approvedTestimonials && approvedTestimonials.length > 0 ? approvedTestimonials : defaultReviews;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#030406] border-t border-white/10 relative overflow-hidden font-sans text-white">
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Verified Client Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading leading-tight">
              What Founders & Owners Say.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl leading-relaxed">
              Real feedback from Indian entrepreneurs, manufacturers, and clinic founders who switched to SAGE DO sovereign systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/wall-of-fame">
              <Button className="h-11 px-5 bg-white/10 hover:bg-amber-500 hover:text-black text-white font-mono font-bold text-xs rounded-xl border border-white/10 transition-all cursor-pointer flex items-center gap-2">
                <span>View All Audio Reviews On Wall of Fame</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.slice(0, 4).map((t: any, idx: number) => {
            const authorName = t.name || "Verified Client";
            const reviewText = t.written_review || t.writtenReview || t.review || t.text;
            const roleText = t.role || t.business || "Verified Client Review";
            const systemTag = t.system || "SAGE DO Sovereign Architecture";

            return (
              <div 
                key={idx}
                className="group relative p-6 rounded-3xl bg-[#090a0f] hover:bg-[#0d0e14] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl"
              >
                <div>
                  {/* Top Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-neutral-600 group-hover:text-amber-400/40 transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    "{reviewText}"
                  </p>
                </div>

                {/* Author Credentials Footer */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-black font-extrabold text-sm font-mono shrink-0 shadow-md">
                      {authorName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-white truncate font-heading">{authorName}</p>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate font-mono">{roleText}</p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
