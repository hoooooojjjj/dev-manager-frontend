import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { githubCallback, logout as logoutApi } from './apis';
import type { GithubCallbackRequest } from './requests.dto';
import type { AuthResponse } from './responses.dto';
import { setAccessToken, setRefreshToken, clearTokens } from '@/utils/token';

/**
 * GitHub OAuth 로그인 Mutation
 */
export function useGithubLogin(): UseMutationResult<AuthResponse, Error, GithubCallbackRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: githubCallback,
    onSuccess: (data) => {
      // 토큰 저장
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // 사용자 정보 캐시에 저장
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * 로그아웃 Mutation
 */
export function useLogout(): UseMutationResult<{ message: string }, Error, void> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearTokens();

      queryClient.clear();
    },
    onError: () => {
      // 에러가 발생해도 로컬 토큰은 삭제
      clearTokens();
      queryClient.clear();
    },
  });
}
