
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { BottomNav, Header } from './mobile-components/Layout';
import { Home } from './mobile-pages/Home';
import { Chat } from './mobile-pages/Chat';
import { Tools } from './mobile-pages/Services';
import { AssignmentTool, ImageEditorTool } from './mobile-pages/Tools_Impl';
import { PlaceOrder } from './mobile-pages/PlaceOrder';
import { Track } from './mobile-pages/Track';
import { Profile } from './mobile-pages/Profile';
import { Onboarding } from './mobile-pages/Onboarding';
import { SageVision } from './mobile-components/SageVision';
import { SageVoice } from './mobile-components/SageVoice';
import { PullToRefresh } from './mobile-components/UIComponents';
import { AppRoute, Notification } from './mobile-types';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('sage_theme');
    return saved ? saved === 'dark' : true;
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Welcome to Sage Do!', message: 'Start exploring our AI tools now.', time: 'Just now', isRead: false, type: 'system' }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sage_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sage_theme', 'light');
    }
  }, [isDarkMode]);

  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isLoading, isAuthenticated, setLocation]);

  useEffect(() => {
    const onboardingDone = localStorage.getItem('sage_onboarding_done');
    if (!onboardingDone) {
      setShowOnboarding(true);
      setCurrentRoute(AppRoute.ONBOARDING);
    }
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin shadow-xl" />
      </div>
    );
  }

  const handleOnboardingComplete = (preferences: any) => {
    localStorage.setItem('sage_onboarding_done', 'true');
    localStorage.setItem('sage_user_prefs', JSON.stringify(preferences));
    setShowOnboarding(false);
    setCurrentRoute(AppRoute.HOME);
  };

  const handleRefreshNotifications = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newNotif: Notification = {
      id: Date.now().toString(),
      title: 'Expert Verified!',
      message: 'A new human expert is now active in your category.',
      time: 'Just now',
      isRead: false,
      type: 'system'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    if (showOnboarding) return <Onboarding onComplete={handleOnboardingComplete} />;

    switch (currentRoute) {
      case AppRoute.HOME: return <Home onNavigate={setCurrentRoute} onOpenVision={() => setShowVision(true)} onOpenVoice={() => setShowVoice(true)} />;
      case AppRoute.CHAT: return <Chat />;
      case AppRoute.SERVICES: return <Tools onNavigate={setCurrentRoute} />;
      case AppRoute.PLACE_ORDER: return <PlaceOrder />;
      case AppRoute.TRACK: return <Track />;
      case AppRoute.TOOL_ASSIGNMENT: return <AssignmentTool onBack={() => setCurrentRoute(AppRoute.SERVICES)} />;
      case AppRoute.TOOL_IMAGE_EDITOR: return <ImageEditorTool onBack={() => setCurrentRoute(AppRoute.SERVICES)} />;
      case AppRoute.PROFILE: return <Profile />;
      case AppRoute.NOTIFICATIONS:
        return (
          <PullToRefresh onRefresh={handleRefreshNotifications}>
            <div className="p-5 animate-in slide-in-from-bottom duration-300 min-h-[calc(100vh-160px)]">
              <h2 className="text-2xl font-black mb-6 dark:text-white">Notifications</h2>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-20 opacity-30 font-bold">No notifications yet.</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="p-5 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 flex gap-4 transition-all">
                      <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold dark:text-white text-sm">{n.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.message}</p>
                        <span className="text-[10px] text-gray-400 mt-2 block uppercase font-bold">{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </PullToRefresh>
        );
      default: return <Home onNavigate={setCurrentRoute} onOpenVision={() => setShowVision(true)} onOpenVoice={() => setShowVoice(true)} />;
    }
  };

  const getPageTitle = (route: AppRoute) => {
    if (route === AppRoute.HOME) return undefined;
    if (route === AppRoute.NOTIFICATIONS) return 'Alerts';
    return route.charAt(0).toUpperCase() + route.slice(1).replace('_', ' ');
  };

  return (
    <div className="min-h-screen bg-transparent flex justify-center selection:bg-brand-primary/30">
      <div className="w-full max-w-md min-h-screen relative overflow-x-hidden">
        {!showOnboarding && (
          <Header
            title={getPageTitle(currentRoute)}
            showBack={currentRoute !== AppRoute.HOME}
            onBack={() => setCurrentRoute(AppRoute.HOME)}
            unreadCount={unreadCount}
            onNotifyClick={() => setCurrentRoute(AppRoute.NOTIFICATIONS)}
            rightAction={
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 bg-white/5 backdrop-blur-xl rounded-full text-gray-600 dark:text-amber-400 active:scale-90 transition-all border border-white/5"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            }
          />
        )}

        <main className={`${showOnboarding ? '' : 'pt-2'} pb-24`}>
          {renderContent()}
        </main>

        {!showOnboarding && (
          <BottomNav
            currentRoute={currentRoute}
            onNavigate={setCurrentRoute}
          />
        )}

        {showVision && <SageVision onClose={() => setShowVision(false)} />}
        {showVoice && <SageVoice onClose={() => setShowVoice(false)} />}
      </div>
    </div>
  );
};

export default App;
