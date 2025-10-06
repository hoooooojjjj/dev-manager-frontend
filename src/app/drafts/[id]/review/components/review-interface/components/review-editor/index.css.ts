import { vars } from '@/styles/theme.css';
import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const diffHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const reviewFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const instructionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const minHeightTextarea = style({
  minHeight: '6rem',
  padding: '10px',
  boxSizing: 'border-box',
});

export const checkboxContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const checkboxLabel = style({
  fontSize: '0.875rem',
  cursor: 'pointer',
});

export const submitButton = style({
  alignSelf: 'flex-end',
  marginTop: '10px',
});

export const spinningIcon = style({
  animation: `${spin} 1s linear infinite`,
});

export const buttonIcon = style({
  width: '1rem',
  height: '1rem',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem 1rem',
  color: vars.colors.mutedForeground,
  textAlign: 'center',
});

export const emptyIcon = style({
  width: '3rem',
  height: '3rem',
  opacity: '0.3',
});
