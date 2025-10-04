import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/format';
import * as S from './index.css';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(S.breadcrumbNav, className)}>
      <Link href="/" className={S.homeLink} aria-label="홈으로 이동">
        <Home className={S.icon} />
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className={S.breadcrumbItem}>
          <ChevronRight className={S.icon} />
          {index === items.length - 1 ? (
            <span className={S.currentPage} aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className={S.breadcrumbLink}>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
