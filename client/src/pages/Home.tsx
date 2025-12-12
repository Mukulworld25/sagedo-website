
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Book, Briefcase, GraduationCap, Heart, ArrowRight, CheckCircle2, Zap, Sparkles, TrendingUp, FileText, Gift, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [namasteClicked, setNamasteClicked] = useState(false);

  const handleNamaste = () => {
    setNamasteClicked(true);
    // Reset after 2 seconds
    setTimeout(() => setNamasteClicked(false), 2000);
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
          {/* AI Brain Logo - Main Hero Element */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              {/* Glowing backdrop for the brain */}
              <div className="absolute inset-0 blur-3xl opacity-60 bg-gradient-to-r from-red-600 via-primary to-red-600 rounded-full animate-pulse scale-125" />

              {/* The AI Brain Logo - Screen blend mode makes black transparent */}
              <img
                src="/sagedo_logo_black.png"
                alt="SAGE DO AI"
                className="relative h-40 md:h-52 w-auto object-contain animate-float hover:scale-110 transition-all duration-500 mix-blend-screen"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) brightness(1.2) contrast(1.1)',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Namaste Button */}
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleNamaste}
              data-testid="button-namaste"
              size="lg"
              className={`
                bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 
                transition-all duration-500 text-xl font-bold px-10 py-4 min-w-[160px]
                ${namasteClicked
                  ? 'shadow-[0_0_40px_rgba(249,115,22,0.9)] scale-125 animate-pulse'
                  : 'shadow-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-110'
                }
              `}
            >
              {namasteClicked ? (
                <span className="text-3xl">🙏</span>
              ) : (
                <span>Namaste</span>
              )}
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

          {/* Trust Signals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 glass p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-foreground">150+ Happy Customers</span>
            </div>
            <div className="flex items-center justify-center gap-2 glass p-3 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-foreground">24-48 Hour Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2 glass p-3 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-foreground">4.8★ Avg Rating</span>
            </div>
            <div className="flex items-center justify-center gap-2 glass p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-foreground">100% Satisfaction</span>
            </div>
          </div>

          {/* AI + Human Excellence Tagline */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="glass p-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-destructive/5 to-primary/5">
              <div className="text-center space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Why Choose SAGEDO?
                </p>
                <p className="text-lg md:text-xl font-bold text-foreground">
                  "Yeah I use AI too, why should I pay you?" 🤔
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Here's the thing — <span className="text-foreground font-medium">every AI needs a human in the loop</span>.
                  We're the best AI generalists in the game. We prompt it right, verify the output, and polish it
                  until it's <span className="text-foreground font-medium">not just good — it's perfect</span>.
                </p>
                <p className="text-sm text-muted-foreground">
                  ✨ AI Power + 🧠 Human Expertise = 💯 Near-Perfect Results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golden Ticket Gamification Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10">
        <div className="max-w-5xl mx-auto">
          <Card className="glass overflow-hidden border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-amber-500/5">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                {/* Left Side - Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Star className="w-12 h-12 md:w-16 md:h-16 text-yellow-950 fill-yellow-950" />
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text">
                      Golden Ticket System
                    </h2>
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </div>

                  <p className="text-lg md:text-xl text-foreground font-semibold mb-4">
                    Get <span className="text-2xl md:text-3xl text-yellow-600 font-black">FREE ₹150</span> + 1 Golden Ticket on Signup!
                  </p>

                  <div className="space-y-3 text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Earn Tokens:</strong> Complete tasks, refer friends, or top up anytime</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Golden Ticket:</strong> Use it for ANY service delivered within <strong className="text-yellow-600">24-48 hours</strong></span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Fast Services:</strong> All Golden services are marked with a ⭐ badge</span>
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <a href="/api/login">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-950 font-bold hover:opacity-90 shadow-lg"
                      >
                        <Gift className="mr-2 h-5 w-5" />
                        Claim FREE ₹150 Now
                      </Button>
                    </a>
                    <Link href="/services">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-yellow-500/50 hover:bg-yellow-500/10"
                      >
                        <Star className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
                        View Golden Services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
                data-testid={`card - step - ${item.step} `}
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
              <Link key={category.name} href="/services" className="block h-full">
                <Card
                  className="glass p-6 hover:scale-105 transition-all duration-300 cursor-pointer hover-elevate active-elevate-2 h-full flex flex-col justify-between"
                  data-testid={`card - category - ${category.name.toLowerCase()} `}
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
