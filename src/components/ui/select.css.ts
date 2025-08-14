import { style } from '@vanilla-extract/css';

export const selectTrigger = style({
  display: 'flex',
  height: '36px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '6px',
  border: '1px solid hsl(var(--input))',
  backgroundColor: 'transparent',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '14px',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '::placeholder': {
    color: 'hsl(var(--muted-foreground))',
  },
  ':focus': {
    outline: '1px solid hsl(var(--ring))',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

export const selectScrollButton = style({
  display: 'flex',
  cursor: 'default',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '4px',
  paddingBottom: '4px',
});

export const selectContent = style({
  position: 'relative',
  zIndex: 50,
  maxHeight: '384px',
  minWidth: '128px',
  overflow: 'hidden',
  borderRadius: '6px',
  border: '1px solid hsl(var(--border))',
  backgroundColor: 'hsl(var(--popover))',
  color: 'hsl(var(--popover-foreground))',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  selectors: {
    '&[data-state=open]': {
      animationName: 'fadeIn',
      animationDuration: '0.2s',
      animationTimingFunction: 'ease-out',
    },
    '&[data-state=closed]': {
      animationName: 'fadeOut',
      animationDuration: '0.15s',
      animationTimingFunction: 'ease-in',
    },
    '&[data-side=bottom]': {
      transform: 'translateY(4px)',
    },
    '&[data-side=left]': {
      transform: 'translateX(-4px)',
    },
    '&[data-side=right]': {
      transform: 'translateX(4px)',
    },
    '&[data-side=top]': {
      transform: 'translateY(-4px)',
    },
  },
});

export const selectContentPopper = style({
  selectors: {
    '&[data-side=bottom]': {
      transform: 'translateY(4px)',
    },
    '&[data-side=left]': {
      transform: 'translateX(-4px)',
    },
    '&[data-side=right]': {
      transform: 'translateX(4px)',
    },
    '&[data-side=top]': {
      transform: 'translateY(-4px)',
    },
  },
});

export const selectViewport = style({
  padding: '4px',
});

export const selectViewportPopper = style({
  height: 'var(--radix-select-trigger-height)',
  width: '100%',
  minWidth: 'var(--radix-select-trigger-width)',
});

export const selectLabel = style({
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '32px',
  paddingRight: '8px',
  fontSize: '14px',
  fontWeight: 600,
});

export const selectItem = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  cursor: 'default',
  userSelect: 'none',
  alignItems: 'center',
  borderRadius: '2px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '32px',
  paddingRight: '8px',
  fontSize: '14px',
  outline: 'none',
  ':focus': {
    backgroundColor: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
  },
  selectors: {
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});

export const selectItemIndicator = style({
  position: 'absolute',
  left: '8px',
  display: 'flex',
  height: '14px',
  width: '14px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const selectSeparator = style({
  marginLeft: '-4px',
  marginRight: '-4px',
  marginTop: '4px',
  marginBottom: '4px',
  height: '1px',
  backgroundColor: 'hsl(var(--muted))',
});