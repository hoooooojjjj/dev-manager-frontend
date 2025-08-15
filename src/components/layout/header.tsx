'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, Github, X } from 'lucide-react';
import { useUi } from '@/lib/store/useUi';
import { gugi } from '@/lib/utils/font';
import { useEffect } from 'react';
import {
  header,
  headerContainer,
  desktopNav,
  logoLink,
  logoText,
  nav,
  navLink,
  mobileMenuButton,
  rightSection,
  mobileLogoContainer,
  mobileLogoWrapper,
  rightNav,
  themeIcon,
  moonIcon,
  mobileDropdown,
  mobileDropdownContainer,
  mobileNav,
  mobileNavLink,
  srOnly,
  icon16,
  icon20,
} from './header.css';
import { useIsMobile } from '@/lib/hooks/useDeviceWidth';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUi();

  const isMobile = useIsMobile();

  return (
    <header className={header}>
      <div className={headerContainer}>
        <div className={desktopNav}>
          <Link href="/" className={logoLink}>
            <span className={`${logoText} ${gugi.className}`}>DEV MANAGER</span>
          </Link>
          <nav className={nav}>
            <Link href="/new" className={navLink}>
              새 프로젝트
            </Link>
            <Link href="/projects" className={navLink}>
              프로젝트 목록
            </Link>
          </nav>
        </div>

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={mobileMenuButton}
            onClick={toggleSidebar}
            data-mobile-nav
          >
            {sidebarOpen ? <X className={icon20} /> : <Menu className={icon20} />}
            <span className={srOnly}>메뉴 토글</span>
          </Button>
        )}

        <div className={rightSection}>
          <div className={mobileLogoContainer}>
            <div className={mobileLogoWrapper}>
              <Link href="/" className={logoLink}>
                <span className={`font-bold ${gugi.className}`}>DEV MANAGER</span>
              </Link>
            </div>
          </div>

          <nav className={rightNav}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className={themeIcon} />
              <Moon className={moonIcon} />
              <span className={srOnly}>테마 전환</span>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/hoooooojjjj/dev-manager-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className={icon16} />
                <span className={srOnly}>GitHub 리포지토리</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {sidebarOpen && (
        <div className={mobileDropdown} data-mobile-nav>
          <div className={mobileDropdownContainer}>
            <nav className={mobileNav}>
              <Link href="/new" className={mobileNavLink} onClick={() => setSidebarOpen(false)}>
                새 프로젝트
              </Link>
              <Link
                href="/projects"
                className={mobileNavLink}
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
