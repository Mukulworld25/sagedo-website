import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/orders", label: "Orders" },
    { href: "/track", label: "Track" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/sagedo_logo_icon.png"
              alt="SAGEDO AI"
              className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
              style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))' }}
            />
            <span className="text-xl font-black bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              SAGEDO AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${location === link.href ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-dashboard"
                        className="glass"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="default"
                      data-testid="button-logout"
                      onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      variant="default"
                      data-testid="button-login"
                      className="bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="button-mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover-elevate"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover-elevate ${location === link.href ? "text-foreground bg-accent" : "text-muted-foreground"
                    }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            {!isLoading && (
              <div className="pt-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-mobile-dashboard"
                        className="w-full glass"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="default"
                      data-testid="button-mobile-logout"
                      className="w-full bg-gradient-to-r from-primary to-destructive"
                      onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      variant="default"
                      data-testid="button-mobile-login"
                      className="w-full bg-gradient-to-r from-primary to-destructive"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
