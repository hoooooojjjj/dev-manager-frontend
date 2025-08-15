import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem 1rem',
});

export const contentWrapper = style({
  marginTop: '1.5rem',
});

export const headerSection = style({
  marginBottom: '1.5rem',
});

export const title = style({
  fontSize: '1.875rem',
  fontWeight: '700',
  letterSpacing: '-0.025em',
  lineHeight: '1.25',
  color: vars.colors.foreground,
});

export const description = style({
  color: vars.colors.mutedForeground,
});
