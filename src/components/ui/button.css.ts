import { style, styleVariants } from '@vanilla-extract/css';

const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'colors 150ms',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  
  ':focus-visible': {
    outline: '2px solid hsl(var(--ring))',
    outlineOffset: '2px',
  },
  
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

export const buttonVariant = styleVariants({
  default: [buttonBase, {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--primary) / 0.9)',
    },
  }],
  destructive: [buttonBase, {
    backgroundColor: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--destructive) / 0.9)',
    },
  }],
  outline: [buttonBase, {
    border: '1px solid hsl(var(--input))',
    backgroundColor: 'hsl(var(--background))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
    },
  }],
  secondary: [buttonBase, {
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--secondary) / 0.8)',
    },
  }],
  ghost: [buttonBase, {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
    },
  }],
  link: [buttonBase, {
    color: 'hsl(var(--primary))',
    textUnderlineOffset: '4px',
    backgroundColor: 'transparent',
    ':hover': {
      textDecoration: 'underline',
    },
  }],
});

export const buttonSize = styleVariants({
  default: {
    height: '36px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  sm: {
    height: '32px',
    paddingLeft: '12px',
    paddingRight: '12px',
    fontSize: '12px',
  },
  lg: {
    height: '40px',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  icon: {
    height: '36px',
    width: '36px',
  },
});

