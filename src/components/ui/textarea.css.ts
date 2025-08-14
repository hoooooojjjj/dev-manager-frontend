import { style } from '@vanilla-extract/css';

export const textarea = style({
  display: 'flex',
  minHeight: '60px',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid hsl(var(--input))',
  backgroundColor: 'transparent',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '16px',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '::placeholder': {
    color: 'hsl(var(--muted-foreground))',
  },
  ':focus-visible': {
    outline: '1px solid hsl(var(--ring))',
    outlineOffset: '1px',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '@media': {
    '(min-width: 768px)': {
      fontSize: '14px',
    },
  },
});