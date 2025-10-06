import { style } from '@vanilla-extract/css';
import { forDesktop } from '@/styles/breakpoints';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',

  '@media': {
    [forDesktop]: {
      gridTemplateColumns: '1fr 2fr',
    },
  },
});

export const fullWidthCard = style({
  '@media': {
    [forDesktop]: {
      gridColumn: '1 / -1',
    },
  },
});
