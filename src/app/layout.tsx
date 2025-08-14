import type { Metadata } from 'next';
import '@/lib/styles/global.css';
import { QueryProvider } from '@/lib/providers/query-provider';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { MSWProvider } from '@/lib/providers/msw-provider';
import { bodyStyle, rootContainer, mainContent } from './layout.css';

export const metadata: Metadata = {
  title: 'Dev Manager',
  description: '개발 착수 전 PRD→개발 명세서→AI 실행 프롬프트 생성 시스템',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={bodyStyle}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <MSWProvider>
              <div className={rootContainer}>
                <Header />
                <main className={mainContent}>{children}</main>
              </div>
              <Toaster />
            </MSWProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
