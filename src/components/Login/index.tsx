'use client';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/Button';
import { useEffect } from 'react';
import { useGithubLogin } from '@/api/auth/mutations';
import { useLogout } from '@/api/auth/mutations';
import { useCurrentUser } from '@/api/auth/queries';
import Image from 'next/image';
import * as styles from './index.css';

const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize';

export default function LoginButton() {
  const searchParams = useSearchParams();

  const { mutate: githubLogin, isPending: isGithubLoginPending } = useGithubLogin();
  const { data: userData } = useCurrentUser();
  const { mutate: logout } = useLogout();

  const authorizationCode = searchParams.get('code');

  useEffect(() => {
    if (authorizationCode && !userData) {
      const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

      githubLogin({ code: authorizationCode, environment });
    }
  }, [authorizationCode, userData, githubLogin]);

  const handleLogin = () => {
    window.location.href = `${GITHUB_LOGIN_URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}`;
  };

  const handleLogout = () => {
    logout();
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
