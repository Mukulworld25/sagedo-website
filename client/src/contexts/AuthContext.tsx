import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'sagedo_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage first, then sync with server on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Quick load from localStorage for instant UI
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsedUser = JSON.parse(stored);
          setUserState(parsedUser);
        }

        // 2. Fetch fresh user data from server to sync isOnboardingCompleted etc.
        const response = await fetch('/api/auth/user', { credentials: 'include' });
        if (response.ok) {
          const freshUser = await response.json();
          if (freshUser) {
            setUserState(freshUser);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(freshUser));
          } else {
            // Server says no user - clear localStorage
            setUserState(null);
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (e) {
        console.warn('Auth sync error:', e);
        // Keep localStorage data as fallback
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.warn('Logout API call failed:', e);
    }
    setUserState(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem("sagedo_onboarding_skipped");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
