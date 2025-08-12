"use client";

/**
 * TanStack Query Provider
 * SSR/CSR 하이브리드 환경에서 캐시 상태 관리
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5초간 fresh 상태 유지
            staleTime: 5 * 1000,
            // 5분간 캐시 보관
            gcTime: 5 * 60 * 1000,
            // 에러 시 재시도 정책
            retry: (failureCount, error: any) => {
              // 4xx 에러는 재시도하지 않음
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              return failureCount < 3;
            },
            // 백그라운드에서 리페치 비활성화 (배터리 절약)
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}
