import React from "react";
import { ShieldCheck, ArrowRight, Zap, TrendingUp, Cpu, Gauge } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EliteTestimonialsSection({ approvedTestimonials }: { approvedTestimonials?: any[] }) {
  const verifiedOutcomes = [
    {
      id: "factory_rfq",
      systemTag: "B2B EXPORT // TALLY PRIME BRIDGE",
      heroMetric: "42s RFQ Speed",
      metricLabel: "Global Response Latency (was 24–48h)",
      icon: Gauge,
      outcome: "European buyers get dynamic CAD specs and estimates at 2 AM automatically. Closed a ₹14.2L purchase order in our second week.",
      clientRole: "Managing Partner",
      clientCompany: "Industrial Precision Forge",
      location: "Focal Point, Ludhiana",
      status: "Active Production Engine"
    },
    {
      id: "clinic_booking",
      systemTag: "CLINICAL ENGINE // WHATSAPP TRIAGE",
      heroMetric: "0.8s Speed · 3.8% No-Shows",
      metricLabel: "Appointment Drop-Off Reduction",
      icon: Zap,
      outcome: "Replaced 4.8s WordPress site with sub-second React booking. Automated 2-hour WhatsApp reminders slashed no-shows from 43% down to 3.8%.",
      clientRole: "Clinic Director",
      clientCompany: "Multispecialty Dental Practice",
      location: "Sector 70, Mohali (Tri-City)",
      status: "Active Production Engine"
    },
    {
      id: "admissions_crm",
      systemTag: "SOVEREIGN CRM // ZERO-SEAT TAX",
      heroMetric: "₹3.6L/Year Saved",
      metricLabel: "20 Zoho Licenses Eliminated",
      icon: Cpu,
      outcome: "Migrated off 20 recurring Zoho seats forever. Inbound student leads qualify automatically and route to duty counselors in 45 seconds.",
      clientRole: "Head of Admissions",
      clientCompany: "Career Coaching Institute",
      location: "Chandigarh Hub",
      status: "Active Production Engine"
    },
    {
      id: "local_visibility",
      systemTag: "SEARCH VISIBILITY // LOCAL 3-PACK",
      heroMetric: "Google 3-Pack #1 · 38 Calls",
      metricLabel: "Direct Organic Inbound in Month 1",
      icon: TrendingUp,
      outcome: "Rigid NAP syndication, neighborhood GeoCoordinates schema, and localized AEO profiles captured top local map ranking with zero ad spend.",
      clientRole: "Showroom Owner",
      clientCompany: "Luxury Retail Storefront",
      location: "North India Catchment",
      status: "Active Production Engine"
    }
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#030406] border-t border-white/10 relative overflow-hidden font-sans text-white">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Operational Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading leading-tight">
              Real Systems. Measured Impact.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl leading-relaxed">
              Verified operational outcomes from North Indian manufacturers, clinics, and enterprises powered by SAGEDO sovereign systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/wall-of-fame">
              <Button className="h-11 px-5 bg-white/10 hover:bg-emerald-500 hover:text-black text-white font-mono font-bold text-xs rounded-xl border border-white/10 transition-all cursor-pointer flex items-center gap-2">
                <span>Inspect All Blueprints on Wall of Fame</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Big Metric Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedOutcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="group relative p-6 rounded-3xl bg-[#090a0f] hover:bg-[#0d0e14] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl"
              >
                <div>
                  {/* System Architecture Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
                      {item.systemTag}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  {/* Big Hero Metric */}
                  <div className="mb-4">
                    <div className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                      {item.heroMetric}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90 font-medium mt-0.5">
                      {item.metricLabel}
                    </div>
                  </div>

                  {/* Outcome Paragraph */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    "{item.outcome}"
                  </p>
                </div>

                {/* Author Credentials Footer */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-xs text-white truncate font-heading">{item.clientRole}</p>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-neutral-300 truncate font-sans">{item.clientCompany}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-2">
                    <span>{item.location}</span>
                    <span className="text-emerald-400/80">● Verified</span>
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
