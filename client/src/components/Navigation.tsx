import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'https://sagedo-website.onrender.com';

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
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse">
                SAGE
              </span>
              <span className="text-foreground ml-0.5">DO</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
              AI
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
                    <span className="text-sm text-muted-foreground">
                      Logged in as <span className="font-semibold text-foreground">{user?.name || user?.email}</span>
                    </span>
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
                        await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
                        logout(); // Clear localStorage
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-login"
                        className="glass"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/login?register=true">
                      <Button
                        size="sm"
                        variant="default"
                        data-testid="button-signup"
                        className="bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
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
                        await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
                        logout(); // Clear localStorage
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-mobile-login"
                        className="w-full glass"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/login?register=true">
                      <Button
                        size="sm"
                        variant="default"
                        data-testid="button-mobile-signup"
                        className="w-full bg-gradient-to-r from-primary to-destructive"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
