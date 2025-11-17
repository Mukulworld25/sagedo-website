import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Sparkles, Zap, CheckCircle2, ArrowRight, TrendingUp, FileText } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const handleNamaste = () => {
    // Namaste functionality - can be expanded later
  };

  const categories = [
    {
      name: "Business",
      count: "10 Services",
      description: "Landing pages, ads, automation & more"
    },
    {
      name: "Student",
      count: "7 Services",
      description: "Research, PPTs, photo editing & more"
    },
    {
      name: "Professional",
      count: "8 Services",
      description: "Resumes, LinkedIn, cover letters & more"
    },
    {
      name: "Personal",
      count: "5 Services",
      description: "Reels, diet plans, photo edits & more"
    }
  ];

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Business":
        return <TrendingUp className="w-12 h-12 text-primary" />;
      case "Student":
        return <FileText className="w-12 h-12 text-primary" />;
      case "Professional":
        return <CheckCircle2 className="w-12 h-12 text-primary" />;
      case "Personal":
        return <Sparkles className="w-12 h-12 text-primary" />;
      default:
        return <Sparkles className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Floating AI Logos Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Sparkles className="absolute top-20 left-10 w-16 h-16 text-primary animate-float" style={{ animationDelay: '0s' }} />
          <Zap className="absolute top-40 right-20 w-14 h-14 text-yellow-500 animate-float" style={{ animationDelay: '1s' }} />
          <CheckCircle2 className="absolute bottom-40 left-1/4 w-14 h-14 text-green-500 animate-float" style={{ animationDelay: '2s' }} />
          <Sparkles className="absolute bottom-20 right-1/3 w-16 h-16 text-purple-500 animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Namaste Button */}
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleNamaste}
              data-testid="button-namaste"
              size="sm"
              className="bg-gradient-to-r from-primary to-destructive hover:opacity-90 transition-opacity"
            >
              Namaste
            </Button>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">
            Problem? Need Help?{" "}
            <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent animate-shimmer">
              Afcoz!
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
            We Do Your Daily Grind, You Do Grand Things.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop wasting time on small problems. Let our AI handle the complex tasks while you focus on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/services">
              <Button
                size="lg"
                data-testid="button-help-me"
                className="bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                Help Me! <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                data-testid="button-learn-more"
                className="text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Get Your Solution in 3 Clicks
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Simple, fast, run... like you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                icon: <Sparkles className="w-8 h-8" />,
                title: "Submit Your Problem",
                description: "Describe your challenge in plain English or Hindi."
              },
              {
                step: 2,
                icon: <Zap className="w-8 h-8" />,
                title: "AI Analysis",
                description: "Our system instantly analyzes and finds the best solution."
              },
              {
                step: 3,
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Receive Your Answer",
                description: "Get a clear, actionable solution sent right back to you."
              }
            ].map((item) => (
              <Card
                key={item.step}
                className="glass p-6 hover:scale-105 transition-transform duration-300 hover-elevate"
                data-testid={`card-step-${item.step}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center text-2xl font-black text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="text-primary">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              An AI Assistant for Every Part of Your Life
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Choose your category and see what we can solve for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href="/services">
                <Card
                  className="glass p-6 hover:scale-105 transition-all duration-300 cursor-pointer hover-elevate active-elevate-2"
                  data-testid={`card-category-${category.name.toLowerCase()}`}
                >
                  <div className="text-center space-y-3">
                    <div className="mb-3 flex justify-center">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                    <p className="text-sm text-primary font-semibold">{category.count}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                data-testid="button-explore-all"
                className="text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              >
                Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
