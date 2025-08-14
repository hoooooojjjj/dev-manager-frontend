import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils/format";
import {
  breadcrumbNav,
  homeLink,
  icon,
  breadcrumbItem,
  currentPage,
  breadcrumbLink,
} from './breadcrumb.css';

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
    <nav
      aria-label="Breadcrumb"
      className={cn(breadcrumbNav, className)}
    >
      <Link
        href="/"
        className={homeLink}
        aria-label="홈으로 이동"
      >
        <Home className={icon} />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className={breadcrumbItem}>
          <ChevronRight className={icon} />
          {index === items.length - 1 ? (
            <span className={currentPage} aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className={breadcrumbLink}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
