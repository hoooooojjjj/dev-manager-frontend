import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem 1rem', // py-6 px-4: top/bottom 24px (1.5rem), left/right 16px (1rem)
});

export const formContainer = style({
  maxWidth: '42rem',
  margin: '0 auto',
});

export const headerSection = style({
  textAlign: 'center',
  marginBottom: '2rem',
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
  marginTop: '0.5rem',
});