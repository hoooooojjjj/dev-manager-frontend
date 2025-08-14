import { style } from '@vanilla-extract/css';

export const tabsList = style({
  display: 'inline-flex',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: 'hsl(var(--muted))',
  padding: '4px',
  color: 'hsl(var(--muted-foreground))',
});

export const tabsTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '6px',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '4px',
  paddingBottom: '4px',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'all 0.2s',
  ':focus-visible': {
    outline: '2px solid hsl(var(--ring))',
    outlineOffset: '2px',
  },
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  selectors: {
    '&[data-state=active]': {
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
  },
});

export const tabsContent = style({
  marginTop: '8px',
  ':focus-visible': {
    outline: '2px solid hsl(var(--ring))',
    outlineOffset: '2px',
  },
});