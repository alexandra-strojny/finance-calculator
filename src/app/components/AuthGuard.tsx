'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; 
    
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      router.push('/login');
    } else if (user && pathname === '/login') {
      router.push('/finance');
    } else if (user && pathname === '/') {
      router.push('/finance');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  if (!user && !isPublicRoute) {
    return null; // Don't render children if user is not authenticated and route is protected
  }

  return <>{children}</>;
};
