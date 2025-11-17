import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include',
        });
        
        // 401/403 means user is not authenticated - this is expected, treat as anonymous user
        if (response.status === 401 || response.status === 403) {
          return null;
        }
        
        // 204 No Content or empty body - treat as anonymous user
        if (response.status === 204 || response.headers.get('content-length') === '0') {
          return null;
        }
        
        // For any other non-OK status, treat as anonymous user rather than error
        // This prevents network/server errors from blocking public pages
        if (!response.ok) {
          console.warn('Auth check failed:', response.status);
          return null;
        }
        
        // Safely parse JSON, catching any parse errors
        try {
          const data = await response.json();
          return data;
        } catch (parseError) {
          console.warn('Auth response parse error:', parseError);
          return null;
        }
      } catch (error) {
        // Network error - treat as anonymous user
        console.warn('Auth check network error:', error);
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
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
