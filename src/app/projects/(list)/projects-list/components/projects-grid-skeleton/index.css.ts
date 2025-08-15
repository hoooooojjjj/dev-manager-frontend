import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const projectGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',

  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const skeletonCard = style({
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
});

export const skeletonHeader = style({
  height: '16px',
  width: '75%',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonDescription = style({
  height: '12px',
  width: '50%',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const skeletonLine = style({
  height: '12px',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonLineShort = style([
  skeletonLine,
  {
    width: '83.33%',
  },
]);
