import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem 1rem', // py-6 px-4: top/bottom 24px (1.5rem), left/right 16px (1rem)
});

export const contentWrapper = style({
  marginTop: '1.5rem', // mt-6: 24px (1.5rem)
});