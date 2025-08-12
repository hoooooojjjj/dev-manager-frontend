"use client";

/**
 * MSW Provider
 * 개발 환경에서 API 모킹을 조건부로 활성화
 */

import { useEffect, useState } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mswReady, setMswReady] = useState(() => 
    process.env.NODE_ENV !== 'development'
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/lib/mocks').then(({ initMocks }) => {
        initMocks().then(() => {
          setMswReady(true);
        });
      });
    }
  }, []);

  // 개발 환경에서 MSW가 준비될 때까지 대기
  if (!mswReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">API 모킹 준비 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
