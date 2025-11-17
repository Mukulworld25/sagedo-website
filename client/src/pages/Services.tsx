import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, ArrowRight, Star } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isGoldenEligible: boolean;
  deliveryTime: string;
}

const allServices: Service[] = [
  // Business Category (10 services)
  { id: "1", name: "AI Ad Copy", category: "Business", description: "Generate high-converting ads for Google, Facebook, and Instagram", price: 100, imageUrl: "https://images.unsplash.com/photo-1665686374006-b8f04cf62d57?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "2", name: "Email Template", category: "Business", description: "Professional email templates for marketing campaigns", price: 150, imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "3", name: "Product Names (5)", category: "Business", description: "Creative and catchy product names for your brand", price: 200, imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "48 hours" },
  { id: "4", name: "Landing Page Outline", category: "Business", description: "Complete landing page structure and content outline", price: 500, imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "2-3 days" },
  { id: "5", name: "Full Website (5 pages)", category: "Business", description: "Complete website with 5 pages and responsive design", price: 5000, imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "7-10 days" },
  { id: "6", name: "5 Ad Copies", category: "Business", description: "Bundle of 5 professional ad copies for various platforms", price: 600, imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "3-4 days" },
  { id: "7", name: "Automation Workflow", category: "Business", description: "Custom automation for your business processes", price: 10000, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "14-21 days" },
  { id: "8", name: "Business Consultancy", category: "Business", description: "Strategic business advice and planning session", price: 800, imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "2-3 days" },
  { id: "9", name: "Data Management", category: "Business", description: "Organize and optimize your business data", price: 700, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "3-5 days" },
  { id: "10", name: "Video Shoot Script", category: "Business", description: "Professional video script and storyboard", price: 400, imageUrl: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "2-3 days" },

  // Student Category (7 services)
  { id: "11", name: "Research Outline", category: "Student", description: "Structured research paper outline with sources", price: 100, imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "12", name: "PPT Outline", category: "Student", description: "Professional presentation outline and structure", price: 200, imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "48 hours" },
  { id: "13", name: "Photo Edits (5)", category: "Student", description: "Professional photo editing for projects", price: 300, imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "2-3 days" },
  { id: "14", name: "Full PPT Design", category: "Student", description: "Complete presentation with design and content", price: 600, imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "4-5 days" },
  { id: "15", name: "Assignment Help", category: "Student", description: "Guidance and structure for academic assignments", price: 250, imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "2-3 days" },
  { id: "16", name: "Essay Writing", category: "Student", description: "Well-researched essays on any topic", price: 350, imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "3-4 days" },
  { id: "17", name: "Study Notes", category: "Student", description: "Comprehensive study notes for exams", price: 150, imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24-48 hours" },

  // Professional Category (8 services)
  { id: "18", name: "Resume Summary", category: "Professional", description: "Professional resume summary and objective", price: 100, imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "19", name: "LinkedIn Bio", category: "Professional", description: "Compelling LinkedIn profile bio and headline", price: 150, imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "20", name: "Complete CV", category: "Professional", description: "Professional CV with modern design", price: 300, imageUrl: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "2-3 days" },
  { id: "21", name: "Cover Letter", category: "Professional", description: "Tailored cover letter for job applications", price: 200, imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24-48 hours" },
  { id: "22", name: "Portfolio Website", category: "Professional", description: "Professional portfolio website", price: 800, imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "5-7 days" },
  { id: "23", name: "LinkedIn Profile Optimization", category: "Professional", description: "Complete LinkedIn profile enhancement", price: 400, imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "2-3 days" },
  { id: "24", name: "Professional Email", category: "Professional", description: "Business email writing and templates", price: 100, imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "25", name: "Interview Prep Guide", category: "Professional", description: "Comprehensive interview preparation material", price: 250, imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "48 hours" },

  // Personal Category (5 services)
  { id: "26", name: "Reel Script", category: "Personal", description: "Engaging Instagram/YouTube Shorts script", price: 100, imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "24 hours" },
  { id: "27", name: "Diet Plan", category: "Personal", description: "Personalized weekly diet and nutrition plan", price: 150, imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "2-3 days" },
  { id: "28", name: "Photo Editing (5)", category: "Personal", description: "Professional photo editing for social media", price: 200, imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop&q=80", isGoldenEligible: true, deliveryTime: "2-3 days" },
  { id: "29", name: "Video Project", category: "Personal", description: "Complete video editing and production", price: 800, imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "5-7 days" },
  { id: "30", name: "Social Media Content", category: "Personal", description: "Content calendar with captions and hashtags", price: 300, imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop&q=80", isGoldenEligible: false, deliveryTime: "3-4 days" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("Business");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Business", "Student", "Professional", "Personal"];

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
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
              className={`rounded-full px-6 py-2 transition-all ${
                activeCategory === category
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
              className="glass overflow-hidden hover:scale-105 transition-all duration-300 hover-elevate"
              data-testid={`card-service-${service.id}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                {service.isGoldenEligible && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-950 border-0" data-testid={`badge-golden-${service.id}`}>
                    <Star className="w-3 h-3 mr-1" />
                    Golden
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
                <Link href="/orders">
                  <Button
                    size="sm"
                    data-testid={`button-order-${service.id}`}
                    className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90"
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
  );
}
