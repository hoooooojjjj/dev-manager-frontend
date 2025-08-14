import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loadingContainer = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingContent = style({
  textAlign: 'center',
});

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
  borderRadius: '50%',
  height: '2rem',
  width: '2rem',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: vars.colors.primary,
  margin: '0 auto 1rem auto',
});

export const loadingText = style({
  color: vars.colors.mutedForeground,
});
