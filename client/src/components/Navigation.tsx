import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Gift, ExternalLink, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { t } = useLanguage();
  const API_URL = ''; // Use relative URL - Vercel proxy forwards to Render

  // AI Templates link - only shown to logged in users
  const AI_TEMPLATES_LINK = "https://chatgpt.com/g/g-690c95a9e7dc8191b0338671195897a2-prompt-generator";

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/about", label: t("nav.about") },
    { href: "/orders", label: t("nav.orders") },
    { href: "/track", label: t("nav.track") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background logo watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.03]">
          <img
            src="/sagedo_logo_pro_clean.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Glass navbar with gradient border */}
      <div className="relative backdrop-blur-xl bg-background/80 border-b border-neutral-800/50 shadow-lg">
        {/* Subtle gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <span className="text-2xl md:text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-neutral-200 via-primary to-neutral-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    SAGE
                  </span>
                  <span className="text-foreground ml-0.5">DO</span>
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 blur-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block opacity-70 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-neutral-800/50">
                AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <button
                    data-testid={`nav-${link.label.toLowerCase()}`}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${location === link.href
                      ? "text-foreground bg-neutral-800/50 shadow-inner"
                      : "text-muted-foreground hover:text-foreground hover:bg-neutral-800/30"
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
                      {/* AI Templates Access - Only for logged in users */}
                      <a
                        href={AI_TEMPLATES_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">AI Templates</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-sm text-muted-foreground">
                        Hi, <span className="font-semibold text-foreground">{user?.name || user?.email?.split('@')[0]}</span>
                      </span>
                      <Link href="/dashboard">
                        <Button
                          size="sm"
                          variant="outline"
                          data-testid="button-dashboard"
                          className="border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/settings">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-testid="button-settings"
                          className="hover:bg-neutral-800/50"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="default"
                        data-testid="button-logout"
                        onClick={async () => {
                          await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
                          logout();
                          window.location.href = '/';
                        }}
                        className="bg-neutral-700 hover:bg-neutral-600"
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
                          className="border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/login?register=true">
                        <Button
                          size="sm"
                          variant="default"
                          data-testid="button-signup"
                          className="relative group overflow-hidden bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-500 shadow-lg shadow-primary/25"
                        >
                          {/* Golden shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <Gift className="w-4 h-4 mr-1.5" />
                          <span className="relative">Sign Up FREE</span>
                          {/* Golden ticket badge */}
                          <span className="absolute -top-1 -right-1 flex items-center gap-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-lg animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" />
                            AI
                          </span>
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
              className="md:hidden p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-background/95 border-b border-neutral-800/50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location === link.href
                    ? "text-foreground bg-neutral-800/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-800/30"
                    }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            {!isLoading && (
              <div className="pt-3 space-y-2 border-t border-neutral-800/50">
                {isAuthenticated ? (
                  <>
                    {/* AI Templates Access - Mobile */}
                    <a
                      href={AI_TEMPLATES_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Sparkles className="w-4 h-4" />
                      Access AI Templates
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-mobile-dashboard"
                        className="w-full border-neutral-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/settings">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid="button-mobile-settings"
                        className="w-full border-neutral-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="default"
                      data-testid="button-mobile-logout"
                      className="w-full bg-neutral-700 hover:bg-neutral-600"
                      onClick={async () => {
                        await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
                        logout();
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
                        className="w-full border-neutral-700"
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
                        className="w-full bg-gradient-to-r from-primary to-red-600 relative overflow-hidden group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <Gift className="w-4 h-4 mr-1.5" />
                        <span className="relative">Sign Up FREE</span>
                        <span className="ml-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                          FREE AI
                        </span>
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
