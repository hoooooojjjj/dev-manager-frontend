'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, Github, X } from 'lucide-react';
import { useUi } from '@/lib/store/useUi';
import { gugi } from '@/lib/utils/font';
import { useEffect } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUi();

  // 외부 클릭 시 모바일 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (sidebarOpen && !target.closest('[data-mobile-nav]')) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }

    return undefined;
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 py-6">
        <div className="mr-4 hidden items-center md:flex">
          <Link href="/" className="mr-4 flex items-center gap-2 font-bold">
            <span className={`hidden text-lg font-bold sm:inline-block ${gugi.className}`}>
              DEV MANAGER
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              href="/new"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              새 프로젝트
            </Link>
            <Link
              href="/projects"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              프로젝트 목록
            </Link>
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleSidebar}
          data-mobile-nav
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">메뉴 토글</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="md:hidden">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span className={`font-bold ${gugi.className}`}>DEV MANAGER</span>
              </Link>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">테마 전환</span>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/yourusername/dev-manager-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub 리포지토리</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {sidebarOpen && (
        <div
          className="absolute left-0 right-0 top-full z-40 border-b border-border/40 bg-background/95 backdrop-blur md:hidden"
          data-mobile-nav
        >
          <div className="container px-4 py-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/new"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setSidebarOpen(false)}
              >
                새 프로젝트
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setSidebarOpen(false)}
              >
                프로젝트 목록
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
