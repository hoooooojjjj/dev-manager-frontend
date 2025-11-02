'use client';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/components/Button';
import { useEffect } from 'react';

const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

export function LoginButton() {
  const isLogin = false;

  const authorizationCode = useSearchParams().get('code');

  useEffect(() => {
    if (authorizationCode) {
      console.log(authorizationCode);
    }
  }, [authorizationCode]);

  const handleLogin = () => {
    window.location.href = `${GITHUB_LOGIN_URL}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${window.location.href}`;
  };

  return (
    <Button variant="ghost" asChild onClick={handleLogin}>
      <div>{isLogin ? '로그아웃' : '로그인'}</div>
    </Button>
  );
}
