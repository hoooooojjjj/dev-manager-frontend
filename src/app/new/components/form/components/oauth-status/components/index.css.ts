import { forMobile } from '@/lib/styles/breakpoints';
import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  flex: 1,
});

export const cardContent = style({
  display: 'flex',
  padding: '16px',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      gap: '8px',
    },
  },
});

export const cardInfo = style({
  display: 'flex',
  gap: '8px',
});

export const providerIcon = style({
  height: '16px',
  width: '16px',
});

export const providerName = style({
  fontSize: '0.875rem',
  fontWeight: '500',
});

export const statusBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const statusIcon = style({
  marginRight: '4px',
  height: '12px',
  width: '12px',
});
