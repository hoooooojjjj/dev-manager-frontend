import { style, styleVariants } from '@vanilla-extract/css';

const toastBase = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  overflow: 'hidden',
  borderRadius: '6px',
  border: '1px solid',
  padding: '16px',
  paddingRight: '24px',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  transition: 'all 0.2s',
  pointerEvents: 'auto',
  position: 'relative',
  selectors: {
    '&[data-swipe=cancel]': {
      transform: 'translateX(0)',
    },
    '&[data-swipe=end]': {
      transform: 'translateX(var(--radix-toast-swipe-end-x))',
    },
    '&[data-swipe=move]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
      transition: 'none',
    },
    '&[data-state=open]': {
      animationName: 'slideInFromTop',
      animationDuration: '0.3s',
      animationTimingFunction: 'ease-out',
    },
    '&[data-state=closed]': {
      animationName: 'fadeOutSlideRight',
      animationDuration: '0.2s',
      animationTimingFunction: 'ease-in',
    },
  },
});

export const toastVariant = styleVariants({
  default: [
    toastBase,
    {
      borderColor: 'hsl(var(--border))',
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
    },
  ],
  destructive: [
    toastBase,
    {
      borderColor: 'hsl(var(--destructive))',
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
    },
  ],
  success: [
    toastBase,
    {
      borderColor: '#bbf7d0',
      backgroundColor: '#f0fdf4',
      color: '#14532d',
      '@media': {
        '(prefers-color-scheme: dark)': {
          borderColor: '#166534',
          backgroundColor: '#052e16',
          color: '#f0fdf4',
        },
      },
    },
  ],
  warning: [
    toastBase,
    {
      borderColor: '#fef3c7',
      backgroundColor: '#fefce8',
      color: '#713f12',
      '@media': {
        '(prefers-color-scheme: dark)': {
          borderColor: '#854d0e',
          backgroundColor: '#422006',
          color: '#fefce8',
        },
      },
    },
  ],
});

export const toastContent = style({
  display: 'grid',
  gap: '4px',
});

export const toastTitle = style({
  fontSize: '14px',
  fontWeight: 600,
});

export const toastDescription = style({
  fontSize: '14px',
  opacity: 0.9,
});

export const toastClose = style({
  position: 'absolute',
  right: '4px',
  top: '4px',
  borderRadius: '6px',
  padding: '4px',
  color: 'hsl(var(--foreground) / 0.5)',
  opacity: 0,
  transition: 'opacity 0.2s',
  ':hover': {
    color: 'hsl(var(--foreground))',
    opacity: 1,
  },
  ':focus': {
    opacity: 1,
    outline: '1px solid hsl(var(--ring))',
    outlineOffset: '1px',
  },
  selectors: {
    '.destructive &': {
      color: '#fca5a5',
    },
    '.destructive &:hover': {
      color: '#fef2f2',
    },
  },
});

export const toastViewport = style({
  position: 'fixed',
  bottom: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  maxHeight: '100vh',
  width: '100%',
  flexDirection: 'column-reverse',
  padding: '16px',
  '@media': {
    '(min-width: 640px)': {
      bottom: 0,
      right: 0,
      top: 'auto',
      flexDirection: 'column',
    },
    '(min-width: 768px)': {
      maxWidth: '420px',
    },
  },
});
