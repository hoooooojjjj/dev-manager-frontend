import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const breadcrumbNav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem', // space-x-1
  fontSize: '0.875rem', // text-sm
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const homeLink = style({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  transitionProperty: 'color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',
  ':hover': {
    color: vars.colors.foreground,
  },
});

export const icon = style({
  height: '1rem', // h-4
  width: '1rem', // w-4
});

export const breadcrumbItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem', // space-x-1
});

export const currentPage = style({
  fontWeight: '500', // font-medium
  color: vars.colors.foreground,
});

export const breadcrumbLink = style({
  color: 'inherit',
  transitionProperty: 'color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',
  ':hover': {
    color: vars.colors.foreground,
  },
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
});