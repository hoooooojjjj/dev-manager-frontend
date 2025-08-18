import { forDesktop } from '@/lib/styles/breakpoints';
import { vars } from '@/lib/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const textarea = style({
  display: 'flex',
  minHeight: '60px',
  width: '100%',
  borderRadius: '6px',
  border: `1px solid ${vars.colors.input}`,
  backgroundColor: 'transparent',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '16px',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '::placeholder': {
    color: vars.colors.mutedForeground,
  },
  ':focus-visible': {
    outline: `1px solid ${vars.colors.ring}`,
    outlineOffset: '1px',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '@media': {
    [forDesktop]: {
      fontSize: '14px',
    },
  },
});
