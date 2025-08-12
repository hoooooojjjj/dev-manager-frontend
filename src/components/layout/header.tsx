"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Menu, 
  Moon, 
  Sun, 
  Github, 
  ExternalLink 
} from "lucide-react";
import { useUi } from "@/lib/store/useUi";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, toggleSidebar } = useUi();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-4 flex items-center gap-2 font-bold">
            <FileText className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Dev Manager
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              href="/new"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              새 프로젝트
            </Link>
            <Link
              href="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              프로젝트 목록
            </Link>
          </nav>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 토글</span>
        </Button>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="md:hidden">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <FileText className="h-5 w-5" />
                <span className="font-bold">Dev Manager</span>
              </Link>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
    </header>
  );
}
