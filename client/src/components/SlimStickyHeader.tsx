import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { trackWhatsAppClick } from '@/hooks/useAnalytics';

export function SlimStickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      // Mount smoothly on scroll-up after 400px of scroll
      if (currentScrollY > 400 && scrollDirection === 'up') {
        setIsVisible(true);
      } else if (scrollDirection === 'down' || currentScrollY <= 400) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-12 z-50 backdrop-blur-xl bg-neutral-950/90 border-b border-white/10 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
      aria-label="Sticky Quick Navigation"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Monogram */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
              <span className="font-orbitron font-black text-xs text-white group-hover:text-amber-400 transition-colors">
                SD
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-orbitron font-black text-sm tracking-wider">
            <span className="text-white">SAGE</span>
            <span className="text-red-500">DO</span>
          </div>
        </Link>

        {/* Center: Live Operational Beacon */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-300">
            Systems Operational · <strong className="text-emerald-400 font-semibold">24-48h Sprints</strong>
          </span>
        </div>

        {/* Right: WhatsApp Triage & 48h Preview CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/free-demo" className="hidden md:inline-block">
            <span className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer px-2 py-1">
              48h Free Preview
            </span>
          </Link>
          <a
            href="https://wa.me/916284925684?text=Hi%20Mukul,%20requesting%20instant%20project%20triage."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('slim_sticky_header_triage')}
            className="inline-block"
          >
            <Button
              size="sm"
              className="h-8 min-h-[36px] sm:min-h-0 px-3.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-lg shadow-md shadow-green-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">1-Tap WhatsApp Triage</span>
              <span className="xs:hidden">WhatsApp</span>
              <span className="text-[10px] bg-green-700/60 px-1.5 py-0.2 rounded font-mono">45s</span>
            </Button>
          </a>
        </div>

      </div>
    </header>
  );
}

export default SlimStickyHeader;
