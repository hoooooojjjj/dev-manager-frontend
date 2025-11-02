'use client';

import { useIsAuthenticated } from '@/api/auth/queries';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return;
  }

  return <>{children}</>;
}
