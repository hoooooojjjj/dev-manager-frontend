import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { githubCallback, logout as logoutApi } from './apis';
import type { GithubCallbackRequest } from './requests.dto';
import type { AuthResponse } from './responses.dto';
import { setAccessToken, setRefreshToken, clearTokens } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { useToast } from '@/store/useUi';

/**
 * GitHub OAuth 로그인 Mutation
 */
export function useGithubLogin(): UseMutationResult<AuthResponse, Error, GithubCallbackRequest> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: githubCallback,
    onSuccess: (data) => {
      // 토큰 저장
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // 사용자 정보 캐시에 저장
      queryClient.setQueryData(['auth', 'me'], data.user);

      toast({
        title: '로그인 성공',
        description: '환영합니다!',
      });
      router.replace('/');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description: error.message || '다시 시도해주세요.',
      });
    },
  });
}

/**
 * 로그아웃 Mutation
 */
export function useLogout(): UseMutationResult<{ message: string }, Error, void> {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearTokens();

      queryClient.clear();
      toast({
        title: '로그아웃 성공',
        description: '',
      });
    },
    onError: () => {
      // 에러가 발생해도 로컬 토큰은 삭제
      clearTokens();
      queryClient.clear();
    },
  });
}
