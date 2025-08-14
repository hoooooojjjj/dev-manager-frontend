import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop } from '@/lib/styles/breakpoints';

export const input = style({
  display: 'flex',
  height: '36px',
  width: '100%',
  borderRadius: vars.spacing.radius,
  border: `1px solid ${vars.colors.input}`,
  backgroundColor: 'transparent',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '4px',
  paddingBottom: '4px',
  fontSize: '1rem',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  transitionProperty: 'color, background-color, border-color',
  transitionDuration: '150ms',
  
  '::placeholder': {
    color: vars.colors.mutedForeground,
  },
  
  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 1px ${vars.colors.ring}`,
  },
  
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  
  selectors: {
    '&[type="file"]::file-selector-button': {
      border: 0,
      backgroundColor: 'transparent',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: vars.colors.foreground,
    },
  },
  
  '@media': {
    [forDesktop]: {
      fontSize: '0.875rem',
    },
  },
});