'use client';

/**
 * 테마 Provider (next-themes 기반)
 * 다크/라이트 모드 지원 + 바닐라 익스트랙트 테마 연동
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps as NextThemeProviderProps } from 'next-themes';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { lightTheme } from '@/lib/styles/theme.css';

function ThemeController({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    if (resolvedTheme === 'light') {
      document.documentElement.classList.add(lightTheme);
    } else {
      document.documentElement.classList.remove(lightTheme);
    }
  }, [theme, systemTheme]);

  return <>{children}</>;
}

export function ThemeProvider({ children, ...props }: NextThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeController>{children}</ThemeController>
    </NextThemesProvider>
  );
}
