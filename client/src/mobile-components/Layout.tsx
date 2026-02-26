import React from 'react';
import { Home, Grid, PlusCircle, Activity, User, Bell, ChevronLeft } from 'lucide-react';
import { AppRoute } from '../mobile-types';
import { useLanguage } from './LanguageProvider';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { t } = useLanguage();

  const navItems = [
    { route: AppRoute.HOME, icon: <Home className="w-6 h-6" />, label: t('nav.home') },
    { route: AppRoute.SERVICES, icon: <Grid className="w-6 h-6" />, label: t('nav.explore') },
    { route: AppRoute.PLACE_ORDER, icon: <PlusCircle className="w-12 h-12 text-white" />, label: t('nav.order'), isSpecial: true },
    { route: AppRoute.TRACK, icon: <Activity className="w-6 h-6" />, label: t('nav.track') },
    { route: AppRoute.PROFILE, icon: <User className="w-6 h-6" />, label: t('nav.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 pb-safe pt-2 px-4 z-50 bg-black/80 backdrop-blur-2xl">
      <div className="flex justify-between items-center max-w-md mx-auto relative h-16">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          if (item.isSpecial) {
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.route)}
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
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-brand-primary/20">
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=sage" className="w-5 h-5 invert" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-white leading-none">SAGE DO</span>
              <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em] leading-none mt-0.5">{t('header.ai_engine')}</span>
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
