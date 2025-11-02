'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '../ui/components/Button';
import { useEffect } from 'react';
import { useGithubLogin } from '@/api/auth/mutations';
import { useLogout } from '@/api/auth/mutations';
import { useCurrentUser } from '@/api/auth/queries';
import { useToast } from '@/store/useUi';
import Image from 'next/image';
import * as styles from './index.css';

const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize';

export function LoginButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { mutate: githubLogin, isPending: isGithubLoginPending } = useGithubLogin();
  const { data: userData, isLoading: isUserLoading } = useCurrentUser();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const authorizationCode = searchParams.get('code');

  useEffect(() => {
    if (authorizationCode && !userData) {
      const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

      githubLogin(
        { code: authorizationCode, environment },
        {
          onSuccess: () => {
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
        }
      );
    }
  }, [authorizationCode, userData, githubLogin, router, toast]);

  const handleLogin = () => {
    window.location.href = `${GITHUB_LOGIN_URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}`;
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: '로그아웃 성공',
          description: '다음에 또 만나요!',
        });
      },
    });
  };

  return (
    <>
      {userData && userData.avatarUrl ? (
        <Image
          className={styles.userAvatar}
          src={userData.avatarUrl}
          alt="GitHub Login"
          width={20}
          height={20}
          onClick={handleLogout}
        />
      ) : (
        <Button variant="ghost" onClick={handleLogin} disabled={isGithubLoginPending}>
          로그인
        </Button>
      )}
    </>
  );
}
