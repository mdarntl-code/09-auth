'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

const PRIVATE_ROUTES = ['/profile', '/notes'];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isPrivateRoute = PRIVATE_ROUTES.some((route) => 
        pathname.startsWith(route)
      );

      try {
        const user = await checkSession();
        
        if (user) {
          setUser(user);
        } else if (isPrivateRoute) {
          throw new Error('Unauthorized access to private route');
        }
      } catch (error) {
        if (isPrivateRoute) {
          clearIsAuthenticated();
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#0a0a0a', 
        color: '#fff' 
      }}>
        <p>Loading... Please wait</p>
      </div>
    );
  }

  return <>{children}</>;
};