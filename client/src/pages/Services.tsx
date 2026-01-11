import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Search, ArrowRight, Star, Gift } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { allServices, ServiceDetail } from "@/data/serviceData";
import ServiceDetailModal from "@/components/ServiceDetailModal";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("Business");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleOrderClick = (e: React.MouseEvent, service: ServiceDetail) => {
    // Track click
    apiRequest("POST", `/api/services/${service.id}/click`).catch(console.error);
    // Allow all users to order, including Golden services
  };

  const handleCardClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const categories = ["Business", "Student", "Professional", "Personal"];

  // Search across ALL categories when there's a search query
  // Otherwise, filter by active category
  // Services with category "All" appear in every tab
  const filteredServices = allServices.filter((service) => {
    const matchesCategory = service.category === activeCategory || service.category === "All";
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    // If there's a search query, search ALL services (ignore category)
    if (searchQuery.trim().length > 0) {
      return matchesSearch;
    }

    // If no search query, filter by category (including "All" services)
    return matchesCategory;
  });

  return (
    <>
      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Human Touch */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src="/human_services.png"
                  alt="SAGE DO Team"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-[10px]">✓</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-primary font-medium mb-2">Hi! I'm here to help you 👋</p>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              An AI Assistant for Every Part of Your Life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Click a category to see what we can solve for you.
            </p>
          </div>

          {/* Welcome Bonus Banner */}
          <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-amber-500/30 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Star Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Star className="w-12 h-12 text-neutral-900 fill-neutral-900" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-amber-400 mb-2">
                  ★ Welcome Bonus ★
                </h2>
                <p className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Get <span className="text-amber-500">FREE AI Templates</span> + 1 Free Service Credit on Signup!
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="text-green-500">✓</span>
                    <span><strong className="text-foreground">Earn Tokens:</strong> Complete tasks, refer friends, or top up anytime</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="text-green-500">✓</span>
                    <span><strong className="text-foreground">Service Credit:</strong> Use it for ANY service delivered within <strong className="text-amber-500">24-48 hours</strong></span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="text-green-500">✓</span>
                    <span><strong className="text-foreground">Fast Services:</strong> All eligible services are marked with a ⭐ badge</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/login?register=true">
                  <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold hover:opacity-90 rounded-xl shadow-lg shadow-amber-500/25">
                    <Gift className="mr-2 h-5 w-5" />
                    Claim FREE AI Templates
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveCategory("Business")}
                  className="h-12 px-6 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 rounded-xl"
                >
                  <Star className="mr-2 h-5 w-5" />
                  View Eligible Services
                </Button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-services"
                className="pl-10 glass border-border/50"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                data-testid={`button-category-${category.toLowerCase()}`}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all ${activeCategory === category
                  ? "bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                  : "glass hover-elevate"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <Card
                key={service.id}
                className="glass overflow-hidden hover:scale-105 transition-all duration-300 hover-elevate cursor-pointer"
                data-testid={`card-service-${service.id}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCardClick(service)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-destructive/10 text-destructive font-bold text-xs p-2 text-center';
                      fallback.textContent = `ASSET MISSING: ${service.name}`;
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                  {service.isGoldenEligible && (
                    <Badge className="absolute top-2 right-2 z-[1000] bg-gradient-to-r from-yellow-400 to-amber-600 text-black border-0 shadow-lg text-xs font-bold animate-pulse" data-testid={`badge-golden-${service.id}`}>
                      ✨ FREE Welcome Bonus!
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-lg text-foreground" data-testid={`text-service-name-${service.id}`}>{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-service-description-${service.id}`}>
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {service.isGoldenEligible ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-muted-foreground line-through">₹{service.price}</span>
                        <span className="text-xl font-bold text-green-500" data-testid={`text-service-price-${service.id}`}>FREE</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-primary" data-testid={`text-service-price-${service.id}`}>₹{service.price}</span>
                    )}
                  </div>
                  <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}>
                    <Button
                      size="sm"
                      data-testid={`button-order-${service.id}`}
                      className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                      onClick={(e) => handleOrderClick(e, service)}
                    >
                      Order Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No services found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
