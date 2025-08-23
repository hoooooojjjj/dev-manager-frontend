import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const tabsList = style({
  display: 'inline-flex',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  padding: '4px',
  color: vars.colors.mutedForeground,
});

export const tabsTriggerActive = style({
  selectors: {
    '&[data-state=active]': {
      backgroundColor: vars.colors.accent,
      color: vars.colors.foreground,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
  },
});

export const tabsContent = style({
  marginTop: '8px',
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
