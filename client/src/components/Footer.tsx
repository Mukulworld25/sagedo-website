import { Link } from "wouter";
import { FeedbackDialog } from "./FeedbackDialog";

export default function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-border/20 glass relative overflow-hidden">
      {/* Background Logo Watermark (same as homepage) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Red glow effect in center */}
        <div className="absolute w-48 h-48 bg-primary/15 rounded-full blur-[80px]" />
        <img
          src="/sagedo_logo_pro_clean.png"
          alt=""
          className="relative w-[300px] h-[300px] object-contain opacity-[0.06]"
          style={{ filter: 'contrast(1.2)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-sm">
            Made in India 🇮🇳 • © 2025 SAGEDO AI • All Rights Reserved
          </p>
          <p className="text-xs text-muted-foreground">
            We Do Your Daily Grind, You Do Grand Things.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs">
            <Link href="/about">
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                About
              </button>
            </Link>
            <Link href="/orders">
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact
              </button>
            </Link>
            <Link href="/privacy-policy">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
            </Link>
            <Link href="/terms-of-service">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </button>
            </Link>
            <Link href="/refund-policy">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Refund Policy
              </button>
            </Link>
            <Link href="/grievance-officer">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Grievance Officer
              </button>
            </Link>
            <Link href="/admin">
              <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-admin">
                Admin
              </button>
            </Link>
            <FeedbackDialog />
          </div>
        </div>
      </div>
    </footer>
  );
}
