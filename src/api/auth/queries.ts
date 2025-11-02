import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCurrentUser } from './apis';
import type { User } from './responses';
import { hasTokens } from '@/utils/token';

/**
 * 현재 사용자 조회 Query
 */
export function useCurrentUser(): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentUser,
    enabled: hasTokens(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if ((error as { status?: number }).status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * 로그인 여부 확인
 */
export function useIsAuthenticated(): boolean {
  const { data } = useCurrentUser();
  return !!data;
}
