'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '../ui/components/Button';
import { useEffect } from 'react';
import { useGithubLogin } from '@/api/auth/mutations';
import { useLogout } from '@/api/auth/mutations';
import { useIsAuthenticated } from '@/api/auth/queries';
import { useToast } from '@/store/useUi';

const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_CLIENT_ID_DEV = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV;
const GITHUB_CLIENT_ID_PROD = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD;

export function LoginButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const isAuthenticated = useIsAuthenticated();

  const { mutate: githubLogin, isPending: isGithubLoginPending } = useGithubLogin();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const authorizationCode = searchParams.get('code');

  useEffect(() => {
    if (authorizationCode && !isAuthenticated) {
      const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

      githubLogin(
        { code: authorizationCode, environment },
        {
          onSuccess: () => {
            toast({
              title: '로그인 성공',
              description: '환영합니다!',
            });
            // URL에서 code 파라미터 제거
            router.replace('/');
          },
          onError: (error) => {
            toast({
              variant: 'destructive',
              title: '로그인 실패',
              description: error.message || '다시 시도해주세요.',
            });
          },
        }
      );
    }
  }, [authorizationCode, isAuthenticated, githubLogin, router, toast]);

  const handleLogin = () => {
    const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    const clientId = environment === 'production' ? GITHUB_CLIENT_ID_PROD : GITHUB_CLIENT_ID_DEV;

    window.location.href = `${GITHUB_LOGIN_URL}?client_id=${clientId}&redirect_uri=${window.location.origin}`;
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: '로그아웃 성공',
          description: '다음에 또 만나요!',
        });
        router.replace('/');
      },
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={isAuthenticated ? handleLogout : handleLogin}
      disabled={isGithubLoginPending || isLogoutPending}
    >
      {isGithubLoginPending || isLogoutPending
        ? '처리 중...'
        : isAuthenticated
          ? '로그아웃'
          : '로그인'}
    </Button>
  );
}
