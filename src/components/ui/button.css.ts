import { vars } from '@/lib/styles/theme.css';
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
  textDecoration: 'none',
  ':focus-visible': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
  color: vars.colors.primary,
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

export const buttonVariant = styleVariants({
  default: [
    buttonBase,
    {
      backgroundColor: vars.colors.primary,
      color: vars.colors.primaryForeground,
      border: vars.colors.buttonBorder,
      ':hover': {
        backgroundColor: vars.colors.primary,
      },
    },
  ],
  destructive: [
    buttonBase,
    {
      backgroundColor: vars.colors.destructive,
      color: vars.colors.destructiveForeground,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ':hover': {
        backgroundColor: vars.colors.destructive,
      },
    },
  ],
  outline: [
    buttonBase,
    {
      border: `1px solid ${vars.colors.input}`,
      backgroundColor: vars.colors.background,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ':hover': {
        backgroundColor: vars.colors.accent,
        color: vars.colors.accentForeground,
      },
    },
  ],
  secondary: [
    buttonBase,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.secondaryForeground,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ':hover': {
        backgroundColor: vars.colors.secondary,
      },
    },
  ],
  ghost: [
    buttonBase,
    {
      backgroundColor: 'transparent',
      ':hover': {
        backgroundColor: vars.colors.accent,
        color: vars.colors.accentForeground,
      },
    },
  ],
  link: [
    buttonBase,
    {
      color: vars.colors.primary,
      textUnderlineOffset: '4px',
      backgroundColor: 'transparent',
      ':hover': {
        textDecoration: 'underline',
      },
    },
  ],
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
