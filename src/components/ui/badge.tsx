import * as React from "react";
import { badgeVariant } from './badge.css';

type BadgeVariants = {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div className={`${badgeVariant[variant]} ${className || ''}`} {...props} />
  );
}

export { Badge };
