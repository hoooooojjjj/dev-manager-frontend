'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/components/Button';
import { Menu, Moon, Sun, Github, X } from 'lucide-react';
import { useUi } from '@/lib/store/useUi';
import { gugi } from '@/lib/utils/font';
import * as S from './index.css';
import { useIsMobile } from '@/lib/hooks/useDeviceWidth';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUi();

  const isMobile = useIsMobile();

  return (
    <header className={S.header}>
      <div className={S.headerContainer}>
        <div className={S.desktopNav}>
          <Link href="/" className={S.logoLink}>
            <span className={`${S.logoText} ${gugi.className}`}>DEV MANAGER</span>
          </Link>
          <nav className={S.nav}>
            <Link href="/new" className={S.navLink}>
              새 프로젝트
            </Link>
            <Link href="/projects" className={S.navLink}>
              프로젝트 목록
            </Link>
          </nav>
        </div>

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={S.mobileMenuButton}
            onClick={toggleSidebar}
            data-mobile-nav
          >
            {sidebarOpen ? <X className={S.icon20} /> : <Menu className={S.icon20} />}
            <span className={S.srOnly}>메뉴 토글</span>
          </Button>
        )}

        <div className={S.rightSection}>
          <div className={S.mobileLogoContainer}>
            <div className={S.mobileLogoWrapper}>
              <Link href="/" className={S.logoLink}>
                <span className={`font-bold ${gugi.className}`}>DEV MANAGER</span>
              </Link>
            </div>
          </div>

          <nav className={S.rightNav}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className={S.themeIcon} />
              <Moon className={S.moonIcon} />
              <span className={S.srOnly}>테마 전환</span>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/hoooooojjjj/dev-manager-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className={S.icon16} />
                <span className={S.srOnly}>GitHub 리포지토리</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {sidebarOpen && (
        <div className={S.mobileDropdown} data-mobile-nav>
          <div className={S.mobileDropdownContainer}>
            <nav className={S.mobileNav}>
              <Link href="/new" className={S.mobileNavLink} onClick={() => setSidebarOpen(false)}>
                새 프로젝트
              </Link>
              <Link
                href="/projects"
                className={S.mobileNavLink}
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
