import { style } from '@vanilla-extract/css';
import { forMobile } from '@/lib/styles/breakpoints';
import { vars } from '@/lib/styles/theme.css';

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
    },
  },
});

export const filtersContainer = style({
  display: 'grid',
  gridTemplateColumns: '8fr 2fr',
  gap: '16px',
  width: '100%',

  '@media': {
    [forMobile]: {
      gridTemplateColumns: '7fr 3fr',
      gap: '8px',
    },
  },
});

export const searchContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const searchIcon = style({
  position: 'absolute',
  left: '12px',
  top: '50%',
  height: '16px',
  width: '16px',
  transform: 'translateY(-50%)',
  color: vars.colors.mutedForeground,
});

export const searchInput = style({
  paddingLeft: '36px',
});

export const statusFilter = style({
  width: '160px',
});

export const addProjectIcon = style({
  marginRight: '8px',
  height: '16px',
  width: '16px',
});
