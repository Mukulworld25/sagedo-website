import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Search, ArrowRight, Star } from "lucide-react";
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

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              An AI Assistant for Every Part of Your Life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Click a category to see what we can solve for you.
            </p>
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
                    <Badge className="absolute top-2 right-2 z-[1000] bg-gradient-to-r from-yellow-400 to-amber-600 text-white border-0 shadow-lg" data-testid={`badge-golden-${service.id}`}>
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Golden Ticket
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-lg text-foreground" data-testid={`text-service-name-${service.id}`}>{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-service-description-${service.id}`}>
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary" data-testid={`text-service-price-${service.id}`}>₹{service.price}</span>
                    <span className="text-xs text-muted-foreground" data-testid={`text-service-delivery-${service.id}`}>{service.deliveryTime}</span>
                  </div>
                  <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}&delivery=${encodeURIComponent(service.deliveryTime)}`}>
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
