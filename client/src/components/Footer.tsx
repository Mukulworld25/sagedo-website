import { Link } from "wouter";
import { FeedbackDialog } from "./FeedbackDialog";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 py-16 border-t border-border/20 bg-neutral-900 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-64 h-64 bg-primary/25 rounded-full blur-[100px]" />
        <img
          src="/sagedo_logo_pro_clean.png"
          alt=""
          className="relative w-[350px] h-[350px] object-contain opacity-[0.08]"
          style={{ filter: 'contrast(1.3)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/sagedo_logo_pro_clean.png"
                alt="SAGE DO"
                className="w-10 h-10 rounded-full object-cover border border-neutral-800 shadow-sm"
              />
              <span className="text-xl font-bold text-foreground">SAGE DO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We do your daily grind, so you can do grand things. AI-powered services for students and professionals.
            </p>
            {/* Social/Contact Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:hello@sagedo.in"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-primary/20 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="tel:+917018709291"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-primary/20 transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://wa.me/917018709291"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-[#25D366]/20 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/orders">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Place Order</span>
                </Link>
              </li>
              <li>
                <Link href="/track">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Track Order</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
              <li>
                <FeedbackDialog />
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Refund & Shipping Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border/20 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">Get tips, updates, and exclusive offers.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                }).then(() => {
                  alert('Thanks for subscribing! 🎉');
                  form.reset();
                }).catch(() => alert('Something went wrong. Try again.'));
              }}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 SAGEDO AI. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with ❤️ in India 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

