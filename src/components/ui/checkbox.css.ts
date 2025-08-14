import { style } from '@vanilla-extract/css';

export const checkboxRoot = style({
  height: '16px',
  width: '16px',
  flexShrink: 0,
  borderRadius: '2px',
  border: '1px solid hsl(var(--primary))',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  ':focus-visible': {
    outline: '1px solid hsl(var(--ring))',
    outlineOffset: '1px',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  selectors: {
    '&[data-state=checked]': {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
    },
  },
});

export const checkboxIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'currentColor',
});