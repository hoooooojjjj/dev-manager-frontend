import { forMobile } from '@/styles/breakpoints';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const tabsList = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

export const tabTrigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
});

export const promptCardTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const promptContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const promptText = style({
  backgroundColor: vars.colors.muted,
  padding: '1rem',
  borderRadius: vars.spacing.radius,
  fontSize: '0.875rem',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
});

export const copyButton = style({
  gap: '0.5rem',
  position: 'absolute',
  right: 20,
  top: 20,
  '@media': {
    [forMobile]: {
      position: 'relative',
      right: 0,
      top: 0,
    },
  },
});
