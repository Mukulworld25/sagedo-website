import React, { useState } from 'react';
import { Home, Grid, PlusCircle, Activity, User, Bell, ChevronLeft, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { AppRoute } from '../mobile-types';
import { useLanguage } from './LanguageProvider';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { t } = useLanguage();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const navItems = [
    { route: AppRoute.HOME, icon: <Home className="w-6 h-6" />, label: t('nav.home') },
    { route: AppRoute.SERVICES, icon: <Grid className="w-6 h-6" />, label: t('nav.explore') },
    { route: AppRoute.PLACE_ORDER, icon: <PlusCircle className="w-12 h-12 text-white" />, label: t('nav.order'), isSpecial: true },
    { route: AppRoute.TRACK, icon: <Activity className="w-6 h-6" />, label: t('nav.track') },
    { route: AppRoute.PROFILE, icon: <User className="w-6 h-6" />, label: t('nav.profile') },
  ];

  return (
    <>
      {/* Action Sheet Overlay */}
      {showActionSheet && (
        <div className="fixed inset-0 z-[60]" onClick={() => setShowActionSheet(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-24 left-4 right-4 rounded-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(20,20,20,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 -10px 60px rgba(0,0,0,0.8)',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-black text-lg">What do you need?</h3>
                <button onClick={() => setShowActionSheet(false)} className="p-2 rounded-full bg-white/5 active:scale-90 transition-all">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <a
                href="https://wa.me/916284925684?text=Hi!%20I%20want%20to%20book%20a%20free%20consultation%20call."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-green-600/10 border border-green-500/20 mb-3 active:scale-[0.98] transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Book a Free Call</p>
                  <p className="text-neutral-400 text-xs">Chat with us on WhatsApp — 5 min response</p>
                </div>
              </a>

              <button
                onClick={() => { setShowActionSheet(false); onNavigate(AppRoute.PLACE_ORDER); }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 w-full active:scale-[0.98] transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Order a Service</p>
                  <p className="text-neutral-400 text-xs">Browse 30+ services and place an order</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916284925684"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center active:scale-90 transition-all"
        style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 pb-safe pt-2 px-4 z-50 bg-black/80 backdrop-blur-2xl">
        <div className="flex justify-between items-center max-w-md mx-auto relative h-16">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            if (item.isSpecial) {
              return (
                <button
                  key={item.label}
                  onClick={() => setShowActionSheet(true)}
                  className="relative -top-6 bg-brand-primary p-3 rounded-full shadow-[0_8px_25px_rgba(255,77,77,0.4)] active:scale-90 transition-transform ring-4 ring-black"
                >
                  {item.icon}
                </button>
              );
            }
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.route)}
                className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${isActive ? 'text-brand-primary scale-110' : 'text-gray-600'
                  }`}
              >
                {item.icon}
                <span className={`text-[10px] mt-1 font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export const Header: React.FC<{
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNotifyClick?: () => void;
  unreadCount?: number;
  rightAction?: React.ReactNode
}> = ({ title, showBack, onBack, onNotifyClick, unreadCount = 0, rightAction }) => {
  const { t } = useLanguage();

  return (
    <div className="sticky top-0 z-40 px-4 py-4 flex items-center justify-between bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/5 active:scale-90 transition-all">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-lg shadow-red-500/10 border border-red-500/20">
              <img src="/sagedo_logo_final_circle.png" className="w-8 h-8 object-contain" alt="SAGE DO" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-white leading-none">SAGE DO</span>
              <span className="text-[8px] font-black text-red-500 uppercase tracking-[0.2em] leading-none mt-0.5">AI + Human Excellence</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {rightAction}
        {!rightAction && onNotifyClick && (
          <button onClick={onNotifyClick} className="relative p-2.5 bg-white/5 rounded-full text-white active:scale-90 transition-all border border-white/10">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
