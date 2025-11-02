import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

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
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
});

export const badgeVariant = styleVariants({
  default: [
    badgeBase,
    {
      borderColor: 'transparent',
      backgroundColor: vars.colors.primary,
      color: vars.colors.primaryForeground,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ':hover': {
        backgroundColor: vars.colors.primary,
      },
    },
  ],
  secondary: [
    badgeBase,
    {
      borderColor: 'transparent',
      backgroundColor: vars.colors.secondary,
      color: vars.colors.secondaryForeground,
      ':hover': {
        backgroundColor: vars.colors.secondary,
      },
    },
  ],
  destructive: [
    badgeBase,
    {
      borderColor: 'transparent',
      backgroundColor: vars.colors.destructive,
      color: vars.colors.destructiveForeground,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ':hover': {
        backgroundColor: vars.colors.destructive,
      },
    },
  ],
  outline: [
    badgeBase,
    {
      color: vars.colors.foreground,
    },
  ],
});
