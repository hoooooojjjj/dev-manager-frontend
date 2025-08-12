/**
 * OAuth 상태 관리 훅
 * TanStack Query를 사용한 OAuth 상태 조회 및 변경
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOAuthStatus, connectOAuth, type OAuthStatus } from '@/lib/api/auth';
import { useToast } from '@/lib/store/useUi';

export function useOAuthStatus() {
  return useQuery({
    queryKey: ['oauth', 'status'],
    queryFn: getOAuthStatus,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    retry: 2,
  });
}

export function useOAuthConnect() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (provider: 'github' | 'notion') => connectOAuth(provider),
    onSuccess: (data, provider) => {
      // OAuth 상태 캐시 업데이트
      queryClient.setQueryData(['oauth', 'status'], (old: OAuthStatus | undefined) => ({
        ...old,
        [provider]: true,
      }));

      success(`${provider === 'github' ? 'GitHub' : 'Notion'} 연결이 완료되었습니다!`);

      // 리다이렉트가 필요한 경우
      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank', 'width=600,height=700');
      }
    },
    onError: (err: Error, provider) => {
      error(
        err.message || `${provider === 'github' ? 'GitHub' : 'Notion'} 연결에 실패했습니다.`,
        'OAuth 연결 실패'
      );
    },
  });
}

export function useOAuthDisconnect() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (provider: 'github' | 'notion') => 
      import('@/lib/api/auth').then(({ disconnectOAuth }) => disconnectOAuth(provider)),
    onSuccess: (_, provider) => {
      // OAuth 상태 캐시 업데이트
      queryClient.setQueryData(['oauth', 'status'], (old: OAuthStatus | undefined) => ({
        ...old,
        [provider]: false,
      }));

      success(`${provider === 'github' ? 'GitHub' : 'Notion'} 연결이 해제되었습니다.`);
    },
    onError: (err: Error, provider) => {
      error(
        err.message || `${provider === 'github' ? 'GitHub' : 'Notion'} 연결 해제에 실패했습니다.`,
        'OAuth 연결 해제 실패'
      );
    },
  });
}
