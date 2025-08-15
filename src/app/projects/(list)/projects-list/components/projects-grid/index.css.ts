import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop } from '@/lib/styles/breakpoints';

export const projectGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',

  '@media': {
    [forDesktop]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [forDesktop]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const emptyStateContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 0',
});

export const emptyStateIcon = style({
  marginBottom: '16px',
  height: '48px',
  width: '48px',
  color: vars.colors.mutedForeground,
});

export const emptyStateTitle = style({
  marginBottom: '8px',
  fontSize: '1.125rem',
  fontWeight: '600',
});

export const emptyStateDescription = style({
  marginBottom: '16px',
  textAlign: 'center',
  color: vars.colors.mutedForeground,
});

export const resultsCounter = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const addProjectIcon = style({
  marginRight: '8px',
  height: '16px',
  width: '16px',
});
