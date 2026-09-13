import { Link } from "wouter";
import { FeedbackDialog } from "./FeedbackDialog";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/20 bg-neutral-900 relative overflow-hidden text-white">
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

      {/* Trustpilot Rating Banner */}
      <div className="bg-neutral-950 border-b border-border/30 py-3.5 px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.trustpilot.com/review/sagedo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            aria-label="SAGEDO Trustpilot Reviews - Rated 4.0 out of 5"
          >
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#00b67a">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#dcdce6">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-neutral-300">
              <strong className="text-white">4.0</strong> out of 5 &mdash; Based on <strong className="text-white">5 reviews</strong>
            </span>
            <svg width="80" height="20" viewBox="0 0 120 24" aria-hidden="true">
              <text x="0" y="18" fill="#00b67a" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">Trustpilot</text>
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand & Corporate Info Section */}
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
              India's First AI + Human Hybrid Execution Team. We build, you sell.
            </p>
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              SCO-38, Mohali City Centre, Aerocity, Mohali, Punjab 140306
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="text-muted-foreground/90 font-medium">MSME (Udyam) Reg:</span>{' '}
              <a
                href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                title="Verify Udyam Registration on Government Portal"
              >
                UDYAM-HP-04-0042175
              </a>
            </p>

            {/* Social/Contact Icons */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href="mailto:hello@sagedo.in"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-primary/20 transition-colors"
                title="Email hello@sagedo.in"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="tel:+916284925684"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-primary/20 transition-colors"
                title="Phone +91-6284925684"
              >
                <Phone className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://wa.me/916284925684"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-[#25D366]/20 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/sagedo-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-600/20 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@SageDo-Ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-red-600/20 transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62-4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/sagedoai00/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-pink-600/20 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sagedo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-emerald-600/20 transition-colors"
                title="Google Play Store"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" /></svg>
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
                <Link href="/services#packages">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Launch Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/orders">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Place Order</span>
                </Link>
              </li>
              <li>
                <Link href="/free-audit">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Free 5-Point AI Audit</span>
                </Link>
              </li>
              <li>
                <Link href="/agency-partner">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">For Agencies (White-Label)</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Client & Partner Portal</span>
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
                <Link href="/book-call">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Book a Strategy Call</span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Careers</span>
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

        {/* Local Landing Pages Grid for Technical SEO */}
        <div className="py-8 border-t border-border/20 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[10px]">Serving Businesses Across India</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/website-development-india.html" className="hover:text-foreground transition-colors">Website Development India</a>
            <span className="opacity-30">•</span>
            <a href="/app-development-india.html" className="hover:text-foreground transition-colors">App Development India</a>
            <span className="opacity-30">•</span>
            <a href="/google-business-profile-setup.html" className="hover:text-foreground transition-colors">Google Business Profile Setup</a>
            <span className="opacity-30">•</span>
            <a href="/new-business-setup-india.html" className="hover:text-foreground transition-colors">New Business Setup India</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-bangalore.html" className="hover:text-foreground transition-colors">Digital Marketing Bangalore</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-chandigarh.html" className="hover:text-foreground transition-colors">Digital Marketing Chandigarh</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-delhi.html" className="hover:text-foreground transition-colors">Digital Marketing Delhi NCR</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-hyderabad.html" className="hover:text-foreground transition-colors">Digital Marketing Hyderabad</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-mumbai.html" className="hover:text-foreground transition-colors">Digital Marketing Mumbai</a>
            <span className="opacity-30">•</span>
            <a href="/digital-marketing-pune.html" className="hover:text-foreground transition-colors">Digital Marketing Pune</a>
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
            <p className="text-sm text-muted-foreground">
              © {currentYear} SAGE DO AI. All rights reserved. <span className="text-xs opacity-50 ml-2">Speed of AI. Precision of Humans.</span>
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with ❤️ in India 🇮🇳
            </p>
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
              🔒 Payments secured by Razorpay (RBI Approved)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
