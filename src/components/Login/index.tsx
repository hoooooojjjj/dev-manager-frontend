import { Button } from '../ui/components/Button';

export function LoginButton() {
  const isLogin = true;
  return (
    <Button variant="ghost" asChild>
      <div>{isLogin ? '로그아웃' : '로그인'}</div>
    </Button>
  );
}
