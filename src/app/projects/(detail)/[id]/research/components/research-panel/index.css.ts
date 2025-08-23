import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop } from '@/lib/styles/breakpoints';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  '@media': {
    [forDesktop]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});

export const statCenter = style({
  textAlign: 'center',
});

export const statValue = style({
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: '2rem',
  color: vars.colors.primary,
});

export const statValueGreen = style([
  statValue,
  {
    color: vars.colors.green600,
  },
]);

export const statValueBlue = style([
  statValue,
  {
    color: vars.colors.blue600,
  },
]);

export const statValuePurple = style([
  statValue,
  {
    color: vars.colors.purple600,
  },
]);

export const statLabel = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const statIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
});

export const checkIcon = style({
  height: '1.25rem',
  width: '1.25rem',
  color: vars.colors.green600,
});

export const tabsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const tabsGrid = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.5rem',
});

export const tabContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const cardContent = style({
  paddingTop: '20px !important',
});
