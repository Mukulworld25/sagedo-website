import { useState, useEffect } from "react";
import { ExperienceScore } from "@/components/ExperienceScore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Search, ArrowRight, Zap, Briefcase, GraduationCap, Plane, Heart, Crown, Rocket, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { allServices, ServiceDetail } from "@/data/serviceData";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- TAB CONFIGURATION ---
const TABS = [
  {
    id: "empire",
    label: "The Empire Builder",
    icon: Crown,
    color: "from-amber-400 to-yellow-600",
    description: "For Founders & Visionaries",
    categories: ["Business"], // Maps to internal data
  },
  {
    id: "career",
    label: "The Growth Accelerator",
    icon: Rocket,
    color: "from-blue-400 to-cyan-600",
    description: "For Professionals",
    categories: ["Professional"],
  },
  {
    id: "life",
    label: "The Universal Toolkit",
    icon: Heart,
    color: "from-rose-400 to-pink-600",
    description: "For Everyone",
    categories: ["Student", "Personal", "All"],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("empire");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // --- AUTO-SELECT TAB BASED ON PROFESSION ---
  useEffect(() => {
    if (user?.profession) {
      const prof = user.profession.toLowerCase();
      if (prof.includes("student") || prof.includes("study")) {
        setActiveTab("life");
      } else if (prof.includes("freelance") || prof.includes("developer") || prof.includes("manager")) {
        setActiveTab("career");
      } else {
        setActiveTab("empire"); // Default for business/others
      }
    }
  }, [user]);

  const handleOrderClick = (e: React.MouseEvent, service: ServiceDetail) => {
    apiRequest("POST", `/api/services/${service.id}/click`).catch(console.error);
  };

  const handleCardClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // --- FILTERING LOGIC ---
  const currentTabConfig = TABS.find((t) => t.id === activeTab);
  const filteredServices = allServices.filter((service) => {
    const belongsToTab = currentTabConfig?.categories.includes(service.category);
    // Also include "All" category services in "Life" tab
    const isLifeTabMisc = activeTab === "life" && service.category === "All";

    if (!belongsToTab && !isLifeTabMisc) return false;

    if (searchQuery.trim().length > 0) {
      return (
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-amber-500/30">
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* --- HERO HEADER --- */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Simple background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
            SAGE DO <span className="mx-2">•</span> EXCLUSIVE
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Legacy</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Precision-engineered services for founders, leaders, and visionaries who refuse to settle for average.
          </p>

          {/* --- SEARCH BAR --- */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-xl transition-all focus-within:border-amber-500/50 focus-within:bg-white/10">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Find a service to accelerate your growth..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-2 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- TABS NAVIGATION --- */}
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-8 overflow-x-auto py-4 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 min-w-max group",
                    isActive ? "bg-white/5 border border-white/10" : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className={cn("absolute inset-0 rounded-xl bg-gradient-to-r opacity-10", tab.color)}
                    />
                  )}
                  <div className={cn(
                    "p-2 rounded-lg bg-white/5 transition-colors",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                  )}>
                    <Icon className={cn("w-5 h-5", isActive && "text-amber-400")} />
                  </div>
                  <div className="text-left">
                    <p className={cn(
                      "font-bold text-sm tracking-wide",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                    )}>
                      {tab.label}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{tab.description}</p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabBorder"
                      className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r", tab.color)}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* --- EMPIRE BUILDER EXCLUSIVE SECTION --- */}
            {activeTab === "empire" && !searchQuery && (
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                      <Crown className="w-8 h-8 text-amber-500" />
                      The Founder's Stack
                    </h2>
                    <p className="text-gray-400">High-leverage infrastructure for rapid scaling.</p>
                  </div>
                  <Badge className="bg-amber-500 text-black font-bold border-none px-3 py-1">top 1% validated</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* CARD 1: AI LAUNCHPAD */}
                  <div className="group relative bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 flex flex-col">
                    <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-amber-500/10 transition-colors">
                      <Rocket className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Starter Launch</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Perfect for validation. You get a high-converting **AI Landing Page** designed to capture leads instantly.
                      Includes basic brand identity (Logo + Color Palette) and an automated email setup to nurture early signups.
                      We set up your domain, hosting, and basic analytics so you can prove your concept in under 48 hours without writing a line of code.
                    </p>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-black text-white">₹15,000</span>
                      <span className="text-xs text-gray-500">/ one-time</span>
                    </div>
                    <div className="space-y-4 mb-8 flex-1">
                      <div className="flex gap-3 items-center">
                        <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-1/3 bg-gray-600 group-hover:bg-amber-500/50 transition-colors"></div></div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-amber-500/80">ESSENTIALS</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-amber-500" /> High-Converting AI Landing Page</li>
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-amber-500" /> Automated Lead Capture System</li>
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-amber-500" /> Basic Brand Identity (Logo/Colors)</li>
                      </ul>
                    </div>
                    <Link href="/orders?service=Starter%20Launch&price=15000">
                      <Button className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border-none font-semibold">
                        Deploy Now
                      </Button>
                    </Link>
                  </div>

                  {/* CARD 2: AI CO-FOUNDER (HERO) */}
                  <div className="relative bg-[#0F0F0F] border border-amber-500/50 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] scale-105 z-10 flex flex-col">
                    <div className="absolute top-0 center -translate-y-1/2 left-0 right-0 flex justify-center">
                      <span className="bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                    </div>
                    <div className="mb-6 p-3 bg-amber-500 text-black w-fit rounded-xl">
                      <Crown className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Full Launch</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      The "Business-in-a-Box" for serious founders. We build your **Full Custom Website** (Multi-page) & Mobile App UI,
                      integrated with a 24/7 AI Sales Chatbot to handle customer queries while you sleep.
                      Includes a full CRM setup to track leads and 30 days of AI-generated social media content
                      to kickstart your marketing engine. You strictly focus on sales; we handle the entire tech stack.
                    </p>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-black text-white">₹35,000</span>
                      <span className="text-sm text-gray-500">/ one-time</span>
                    </div>
                    <div className="space-y-4 mb-8 flex-1">
                      <div className="flex gap-3 items-center">
                        <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-full bg-amber-500"></div></div>
                        <span className="text-xs font-bold text-amber-500">FULL PACKAGE</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm font-medium text-white"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Full Custom Website + Mobile App UI</li>
                        <li className="flex gap-3 text-sm font-medium text-white"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 24/7 AI Sales Chatbot Integration</li>
                        <li className="flex gap-3 text-sm font-medium text-white"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Automated CRM & Lead Tracking</li>
                        <li className="flex gap-3 text-sm font-medium text-white"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 30 Days Social Media Content Kit</li>
                      </ul>
                    </div>
                    <Link href="/orders?service=Full%20Launch&price=35000">
                      <Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:to-amber-500 text-black font-black text-lg shadow-lg shadow-amber-500/20">
                        Hire Your Team
                      </Button>
                    </Link>
                  </div>

                  {/* CARD 3: SINGULARITY SCALE (THE ULTIMATE) */}
                  <div className="group relative bg-[#0F0F0F] border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all hover:-translate-y-1 duration-300 flex flex-col shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <TrendingUp className="w-24 h-24 text-white" />
                    </div>

                    {/* Badge for Premium */}
                    <div className="absolute top-0 center -translate-y-1/2 left-0 right-0 flex justify-center">
                      <span className="bg-white text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider border border-gray-200">Scale Mode</span>
                    </div>

                    <div className="mb-6 p-3 bg-white/10 w-fit rounded-xl group-hover:bg-white/20 transition-colors">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Premium Launch</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      For businesses ready to dominate. You get a fully functional Full Stack Web Application + React Native Mobile App.
                      Access our "God Mode" Admin Dashboard to control every aspect of your business real-time.
                      We implement Zero-Touch Automation workflows (Zapier/Make) to automate fulfillment, invoicing, and support.
                      This is enterprise-grade infrastructure built for massive scale.
                    </p>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-black text-white">₹50,000</span>
                      <span className="text-xs text-gray-500">/ one-time</span>
                    </div>
                    <div className="space-y-4 mb-8 flex-1">
                      <div className="flex gap-3 items-center">
                        <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-full bg-white"></div></div>
                        <span className="text-xs font-bold text-white">MAXIMUM</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-white" /> Full Stack Web + Mobile App</li>
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-white" /> Admin "God Mode" Dashboard</li>
                        <li className="flex gap-3 text-sm text-gray-300"><ShieldCheck className="w-4 h-4 text-white" /> Zero-Touch Automation</li>
                      </ul>
                    </div>
                    <Link href="/orders?service=Premium%20Launch&price=50000">
                      <Button className="w-full h-12 bg-white hover:bg-gray-200 text-black border-none font-bold text-lg shadow-lg shadow-white/10">
                        Start Scaling
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="mt-20 flex items-center gap-4 text-gray-500">
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                  <span className="text-xs font-bold uppercase tracking-widest">Or select specific modules</span>
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                </div>
              </div>
            )}

            {/* --- GRID SERVICES RENDERING --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, idx) => (
                <div
                  key={service.id}
                  onClick={() => handleCardClick(service)}
                  className="group relative bg-white/5 border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="h-40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="font-bold text-white text-lg leading-tight mb-1">{service.name}</h3>
                      <p className="text-amber-500 font-bold text-sm bg-black/50 px-2 py-1 rounded-md inline-block backdrop-blur-sm border border-amber-500/20">{service.priceRange}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] sm:text-xs">
                        🤖 AI Speed + 🧠 Human Quality
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">{service.description}</p>
                    <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}>
                      <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-none justify-between group-hover:bg-amber-500 group-hover:text-black transition-colors">
                        Configure <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">No services found in this sector.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
