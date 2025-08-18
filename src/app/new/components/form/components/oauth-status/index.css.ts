import { style, keyframes } from '@vanilla-extract/css';

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const headerActions = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const oauthSection = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const loadingSpinner = style({
  height: '1rem',
  width: '1rem',
  animation: `${spin} 1s linear infinite`,
});

export const buttonIcon = style({
  height: '1rem',
  width: '1rem',
});
