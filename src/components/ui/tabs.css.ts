import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const tabsList = style({
  display: 'flex',
  marginBottom: '24px',
  borderBottom: `1px solid ${vars.colors.border}`,
});

// Base trigger styles
export const tabsTriggerBase = style({
  paddingLeft: '24px',
  paddingRight: '24px',
  paddingTop: '12px',
  paddingBottom: '12px',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  color: vars.colors.mutedForeground,
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    color: vars.colors.foreground,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
});

// Color variants for active states
export const tabsTriggerVariants = styleVariants({
  default: {
    selectors: {
      '&[data-state=active]': {
        color: vars.colors.primary,
        borderBottomColor: vars.colors.primary,
      },
    },
  },
  green: {
    selectors: {
      '&[data-state=active]': {
        color: '#10b981', // emerald-500
        borderBottomColor: '#10b981',
      },
    },
  },
  blue: {
    selectors: {
      '&[data-state=active]': {
        color: '#3b82f6', // blue-500
        borderBottomColor: '#3b82f6',
      },
    },
  },
  purple: {
    selectors: {
      '&[data-state=active]': {
        color: '#8b5cf6', // violet-500
        borderBottomColor: '#8b5cf6',
      },
    },
  },
});

export const tabsContent = style({
  marginTop: '0px',
  ':focus-visible': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
  selectors: {
    '&[data-state=inactive]': {
      display: 'none',
    },
    '&[hidden]': {
      display: 'none',
    },
  },
});
