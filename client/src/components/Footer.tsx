import { Link } from "wouter";
import { FeedbackDialog } from "./FeedbackDialog";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/20 bg-neutral-900 relative overflow-hidden text-white">
      {/* Background Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
        <img
          src="/sagedo_logo_pro_clean.png"
          alt=""
          className="relative w-[320px] h-[320px] object-contain opacity-[0.05]"
          style={{ filter: 'contrast(1.2)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Column 1: Brand & Credibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/sagedo_logo_pro_clean.png"
                alt="SAGE DO"
                className="w-9 h-9 rounded-full object-cover border border-neutral-800 shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-white">SAGE DO</span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed">
              India's Sovereign Revenue &amp; AI Execution Partner. We build, verify, and automate your end-to-end growth infrastructure.
            </p>

            {/* Compact Trustpilot Badge */}
            <div className="pt-1">
              <a
                href="https://www.trustpilot.com/review/sagedo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 sm:min-h-0 sm:px-3 sm:py-1 rounded-full bg-neutral-950/80 hover:bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-all group"
                aria-label="SAGEDO on Trustpilot - 4.0 out of 5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00b67a" aria-hidden="true" className="shrink-0">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-semibold text-white">4.0</span>
                <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">on Trustpilot</span>
              </a>
            </div>

            <p className="text-xs text-neutral-400/90 leading-relaxed">
              SCO-38, Mohali City Centre, Aerocity, Mohali, Punjab 140306
            </p>

            <p className="text-xs text-neutral-400 flex flex-wrap items-center gap-1">
                <span className="text-neutral-300 font-medium">MSME (Udyam) Reg:</span>{' '}
                <a
                  href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] py-2 sm:min-h-0 sm:py-0 text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                  title="Verify Udyam Registration on Government Portal"
                >
                  UDYAM-HP-04-0042175
                </a>
              </p>

            {/* Monochrome Social & Contact Icons - 44px on mobile */}
            <div className="flex items-center gap-2 sm:gap-1.5 pt-1 flex-wrap">
              <a
                href="mailto:hello@sagedo.in"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="Email hello@sagedo.in"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+916284925684"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="Phone +91-6284925684"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/916284925684"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-[#25D366] border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/sagedo-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-blue-400 border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@SageDo-Ai"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62-4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/sagedoai00/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-pink-400 border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sagedo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-3 sm:p-1.5 flex items-center justify-center rounded-xl sm:rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                title="Google Play Store"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase text-neutral-300">Solutions</h4>
            <ul className="footer-link-list space-y-2.5 text-sm">
              <li>
                <Link href="/services">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Services Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/services#packages">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Launch Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/services#packages">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Sovereign Revenue Engine™</span>
                </Link>
              </li>
              <li>
                <Link href="/#calculator">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Revenue Leakage Calculator</span>
                </Link>
              </li>
              <li>
                <Link href="/free-audit">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Free 5-Point AI Audit</span>
                </Link>
              </li>
              <li>
                <Link href="/agency-partner">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">For Agencies (White-Label)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase text-neutral-300">Company</h4>
            <ul className="footer-link-list space-y-2.5 text-sm">
              <li>
                <Link href="/about">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/book-call">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Book a Strategy Call</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Client &amp; Partner Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Careers</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
              <li className="pt-1">
                <FeedbackDialog />
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Locations */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase text-neutral-300">Legal &amp; Coverage</h4>
            <ul className="footer-link-list space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Refund &amp; Cancellation Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Shipping &amp; Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/grievance-officer">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Grievance Officer</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/locations">
                  <span className="text-emerald-400/90 hover:text-emerald-300 font-medium transition-colors cursor-pointer flex items-center gap-1">
                    <span>Regional Locations &amp; Hubs</span>
                    <span>→</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sleek Bottom Bar */}
        <div className="pt-6 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2 flex-wrap text-center md:text-left">
              <span>© 2025 SAGE DO AI. All rights reserved.</span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span className="text-neutral-400/80">Speed of AI. Precision of Humans.</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span>Made with ❤️ in India 🇮🇳</span>
              <span className="opacity-30">•</span>
              <span className="text-neutral-400/70">
                🔒 Payments secured by Razorpay (RBI Authorized)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
