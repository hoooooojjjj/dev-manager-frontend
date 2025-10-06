'use client';

/**
 * MSW Provider
 * 개발 환경에서 API 모킹을 조건부로 활성화
 */

import { useEffect, useState } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mswReady, setMswReady] = useState(() => process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/mocks/mocks').then(({ initMocks }) => {
        initMocks().then(() => {
          setMswReady(true);
        });
      });
    }
  }, []);

  return <>{children}</>;
}
