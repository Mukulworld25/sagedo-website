import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="glass p-8 w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-8xl font-black text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="glass">
                <Search className="mr-2 h-4 w-4" />
                Browse Services
              </Button>
            </Link>
            <Button variant="outline" className="glass" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="border-t border-border/50 pt-6">
            <p className="text-sm text-muted-foreground mb-3">Popular Pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/services">
                <Button variant="link" size="sm">Services</Button>
              </Link>
              <Link href="/about">
                <Button variant="link" size="sm">About</Button>
              </Link>
              <Link href="/orders">
                <Button variant="link" size="sm">Order Now</Button>
              </Link>
              <Link href="/track">
                <Button variant="link" size="sm">Track Order</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
