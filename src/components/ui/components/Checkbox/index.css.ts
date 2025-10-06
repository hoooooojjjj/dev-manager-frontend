import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const checkboxRoot = style({
  height: '16px',
  width: '16px',
  padding: '0',
  flexShrink: 0,
  borderRadius: '2px',
  border: `1px solid ${vars.colors.primary}`,
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  ':focus-visible': {
    outline: `1px solid ${vars.colors.ring}`,
    outlineOffset: '1px',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  selectors: {
    '&[data-state=checked]': {
      backgroundColor: vars.colors.primary,
      color: vars.colors.primaryForeground,
    },
  },
});

export const checkboxIndicator = style({
  height: '16px',
  width: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
