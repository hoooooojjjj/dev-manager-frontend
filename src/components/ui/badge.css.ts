import { style, styleVariants } from '@vanilla-extract/css';

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '6px',
  border: '1px solid',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '2px',
  paddingBottom: '2px',
  fontSize: '12px',
  fontWeight: 600,
  transition: 'colors 0.2s',
  outline: 'none',
  ':focus': {
    outline: '2px solid hsl(var(--ring))',
    outlineOffset: '2px',
  },
});

export const badgeVariant = styleVariants({
  default: [badgeBase, {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--primary) / 0.8)',
    },
  }],
  secondary: [badgeBase, {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    ':hover': {
      backgroundColor: 'hsl(var(--secondary) / 0.8)',
    },
  }],
  destructive: [badgeBase, {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    ':hover': {
      backgroundColor: 'hsl(var(--destructive) / 0.8)',
    },
  }],
  outline: [badgeBase, {
    color: 'hsl(var(--foreground))',
  }],
});

