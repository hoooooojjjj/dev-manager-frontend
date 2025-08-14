'use client';

/**
 * MSW Provider
 * 개발 환경에서 API 모킹을 조건부로 활성화
 */

import { useEffect, useState } from 'react';
import { loadingContainer, loadingContent, spinner, loadingText } from './msw-provider.css';

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mswReady, setMswReady] = useState(() => process.env.NODE_ENV !== 'development');

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
      <div className={loadingContainer}>
        <div className={loadingContent}>
          <div className={spinner}></div>
          <p className={loadingText}>API 모킹 준비 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
