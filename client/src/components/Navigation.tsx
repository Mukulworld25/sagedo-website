import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Gift, ExternalLink, Settings, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { t } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();
  const API_URL = 'https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1';

  // Scroll detection for dynamic glassmorphic backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // AI Templates link - only shown to logged in users
  const AI_TEMPLATES_LINK = "https://chatgpt.com/g/g-690c95a9e7dc8191b0338671195897a2-prompt-generator";

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/about", label: t("nav.about") },
    { href: "/orders", label: t("nav.orders") },
    { href: "/book-call", label: "Book a Call" },
    { href: "/careers", label: "Careers" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Background logo watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.02]">
          <img
            src="/sagedo_logo_pro_clean.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Dynamic Glass navbar: solid Obsidian Slate at top, semi-transparent frosted glass on scroll */}
      <div
        className={`relative transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-neutral-950/80 border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
            : "bg-[#09090b]/95 border-b border-neutral-800/60 shadow-md"
        }`}
      >
        {/* Subtle accent highlight line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group min-h-[44px] py-1">
              <div className="relative">
                <span className="text-2xl md:text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-neutral-100 via-primary to-neutral-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    SAGE
                  </span>
                  <span className="text-foreground ml-0.5">DO</span>
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 blur-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[11px] text-muted-foreground font-semibold tracking-wider hidden sm:inline-block opacity-75 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded-md bg-neutral-900 border border-neutral-800">
                AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-neutral-900/50 p-1 rounded-xl border border-white/[0.05] backdrop-blur-sm shadow-inner">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <div
                      data-testid={`nav-${link.label.toLowerCase()}`}
                      className={`relative text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer select-none ${
                        isActive
                          ? "text-white bg-neutral-800/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border border-neutral-700/60 font-semibold"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth & CTAs */}
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
                        className="flex items-center gap-1.5 text-xs lg:text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-medium">AI Templates</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-xs text-muted-foreground">
                        Hi, <span className="font-semibold text-foreground">{user?.name || user?.email?.split('@')[0]}</span>
                      </span>
                      <Link href="/dashboard">
                        <Button
                          size="sm"
                          variant="outline"
                          data-testid="button-dashboard"
                          className="h-8 text-xs border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/60 rounded-lg"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/settings">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-testid="button-settings"
                          className="h-8 w-8 p-0 hover:bg-neutral-800/60 rounded-lg"
                        >
                          <Settings className="w-4 h-4 text-neutral-400 hover:text-white" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="default"
                        data-testid="button-logout"
                        onClick={async () => {
                          await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
                          logout();
                          window.location.href = '/';
                        }}
                        className="h-8 text-xs bg-neutral-800 hover:bg-neutral-700 rounded-lg"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {/* Refined Segmented Currency Toggle (INR / USD) */}
                      <button
                        type="button"
                        onClick={toggleCurrency}
                        data-testid="button-currency-toggle"
                        title={`Current: ${currency}. Click to switch to ${currency === 'INR' ? 'USD ($)' : 'INR (₹)'}`}
                        className="inline-flex items-center p-0.5 rounded-full bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700/80 shadow-inner backdrop-blur-sm transition-all duration-200 cursor-pointer group"
                      >
                        <span
                          className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all duration-200 ${
                            currency === 'INR'
                              ? 'bg-neutral-800 text-primary shadow-sm border border-neutral-700/50'
                              : 'text-neutral-400 group-hover:text-neutral-300'
                          }`}
                        >
                          ₹ INR
                        </span>
                        <span
                          className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all duration-200 ${
                            currency === 'USD'
                              ? 'bg-neutral-800 text-primary shadow-sm border border-neutral-700/50'
                              : 'text-neutral-400 group-hover:text-neutral-300'
                          }`}
                        >
                          $ USD
                        </span>
                      </button>

                      <Link href="/login">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-testid="button-login"
                          className="h-8 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors px-3.5"
                        >
                          Login
                        </Button>
                      </Link>

                      {/* Modern Refined WhatsApp Button with Emerald Gradient & Halo Glow */}
                      <a 
                        href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20visited%20SAGE%20DO%20and%20I'm%20interested%20in%20your%20services." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('navbar_desktop_cta')}
                        className="inline-block"
                      >
                        <Button
                          size="sm"
                          variant="default"
                          data-testid="button-signup"
                          className="relative group overflow-hidden rounded-full px-4 py-1.5 h-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:via-emerald-400 hover:to-green-400 text-white font-semibold text-xs border border-emerald-400/40 shadow-[0_0_16px_rgba(16,185,129,0.25)] hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                          {/* Micro-shine shimmer sweep on hover */}
                          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                          <MessageCircle className="w-3.5 h-3.5 mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                          <span className="relative font-semibold tracking-tight">WhatsApp Us</span>
                        </Button>
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Currency Toggle & Hamburger Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleCurrency}
                data-testid="button-currency-toggle-mobile"
                aria-label="Toggle currency between INR and USD"
                className="inline-flex items-center min-h-[44px] px-1 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-inner cursor-pointer"
              >
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                    currency === 'INR'
                      ? 'bg-neutral-800 text-primary shadow-xs'
                      : 'text-neutral-400'
                  }`}
                >
                  ₹
                </span>
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                    currency === 'USD'
                      ? 'bg-neutral-800 text-primary shadow-xs'
                      : 'text-neutral-400'
                  }`}
                >
                  $
                </span>
              </button>
              <button
                data-testid="button-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent hover:border-neutral-700/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with smooth fluid slide & fade animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden backdrop-blur-2xl bg-neutral-950/95 border-b border-white/[0.08] shadow-2xl"
          >
            <div className="px-4 pt-3 pb-5 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <div
                      data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "text-white bg-white/[0.08] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                      )}
                    </div>
                  </Link>
                );
              })}
              {!isLoading && (
                <div className="pt-3 mt-2 space-y-2.5 border-t border-neutral-800/80">
                  {isAuthenticated ? (
                    <>
                      {/* AI Templates Access - Mobile */}
                      <a
                        href={AI_TEMPLATES_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors border border-primary/20"
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
                          className="w-full rounded-xl border-neutral-800 hover:border-neutral-700 bg-neutral-900/50"
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
                          className="w-full rounded-xl border-neutral-800 hover:border-neutral-700 bg-neutral-900/50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2 text-neutral-400" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="default"
                        data-testid="button-mobile-logout"
                        className="w-full rounded-xl bg-neutral-800 hover:bg-neutral-700"
                        onClick={async () => {
                          await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
                          logout();
                          window.location.href = '/';
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2.5">
                      <a 
                        href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20visited%20SAGE%20DO%20and%20I'm%20interested%20in%20your%20services." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackWhatsAppClick('navbar_mobile_cta');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Button
                          size="sm"
                          variant="default"
                          data-testid="button-mobile-signup"
                          className="w-full rounded-xl h-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:via-emerald-400 hover:to-green-400 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)] border border-emerald-400/30"
                        >
                          <MessageCircle className="w-4 h-4 mr-1.5" />
                          <span className="relative">WhatsApp Us</span>
                        </Button>
                      </a>
                      <Link href="/login">
                        <Button
                          size="sm"
                          variant="outline"
                          data-testid="button-mobile-login"
                          className="w-full rounded-xl h-10 border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-300 hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login / Portal
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
