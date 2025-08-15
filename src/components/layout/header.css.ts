import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop, forMobile } from '@/lib/styles/breakpoints';

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  width: '100%',
  borderBottom: `1px solid color-mix(in srgb, ${vars.colors.border} 40%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${vars.colors.background} 95%, transparent)`,
  backdropFilter: 'blur(8px)',

  '@supports': {
    '(backdrop-filter: blur(0))': {
      backgroundColor: `color-mix(in srgb, ${vars.colors.background} 60%, transparent)`,
    },
  },
});

export const headerContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  height: '56px',
  alignItems: 'center',
  padding: '4px 16px',

  '@media': {
    [forMobile]: {
      height: '40px',
      padding: '4px 12px',
    },
  },
});

export const desktopNav = style({
  marginRight: '16px',
  display: 'none',
  alignItems: 'center',

  '@media': {
    [forDesktop]: {
      display: 'flex',
    },
  },
});

export const logoLink = style({
  marginRight: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: vars.colors.foreground,
});

export const logoText = style({
  display: 'none',
  fontSize: '1.2rem',
  fontWeight: 'bold',

  '@media': {
    '(min-width: 640px)': {
      display: 'inline-block',
    },
  },
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontSize: '0.875rem',

  '@media': {
    '(min-width: 1024px)': {
      gap: '24px',
    },
  },
});

export const navLink = style({
  color: `color-mix(in srgb, ${vars.colors.foreground} 60%, transparent)`,
  transitionProperty: 'color',
  transitionDuration: '150ms',
  textDecoration: 'none',

  ':hover': {
    color: `color-mix(in srgb, ${vars.colors.foreground} 80%, transparent)`,
  },
});

export const mobileMenuButton = style({
  paddingLeft: 0,
  fontSize: '1rem',

  ':hover': {
    backgroundColor: 'transparent !important',
  },

  ':focus-visible': {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
});

export const rightSection = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',

  '@media': {
    [forDesktop]: {
      justifyContent: 'flex-end',
    },
  },
});

export const mobileLogoContainer = style({
  width: '100%',
  flex: 1,

  '@media': {
    [forDesktop]: {
      width: 'auto',
      flex: 'none',
    },
  },
});

export const mobileLogoWrapper = style({
  display: 'flex',

  '@media': {
    [forDesktop]: {
      display: 'none',
    },
  },
});

export const rightNav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const themeIcon = style({
  height: '16px',
  width: '16px',
  transform: 'rotate(0deg) scale(1)',
  transitionProperty: 'all',
  transitionDuration: '150ms',

  selectors: {
    ':global(.dark) &': {
      transform: 'rotate(-90deg) scale(0)',
    },
  },
});

export const moonIcon = style({
  position: 'absolute',
  height: '16px',
  width: '16px',
  transform: 'rotate(90deg) scale(0)',
  transitionProperty: 'all',
  transitionDuration: '150ms',

  selectors: {
    ':global(.dark) &': {
      transform: 'rotate(0deg) scale(1)',
    },
  },
});

// 모바일 드롭다운 메뉴
export const mobileDropdown = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: '100%',
  zIndex: 40,
  borderBottom: `1px solid color-mix(in srgb, ${vars.colors.border} 40%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${vars.colors.background} 95%, transparent)`,
  backdropFilter: 'blur(8px)',

  '@media': {
    [forDesktop]: {
      display: 'none',
    },
  },
});

export const mobileDropdownContainer = style({
  maxWidth: '1200px',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '16px',
  paddingBottom: '16px',
});

export const mobileNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const mobileNavLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: `color-mix(in srgb, ${vars.colors.foreground} 60%, transparent)`,
  transitionProperty: 'color, background-color',
  transitionDuration: '150ms',
  textDecoration: 'none',

  ':hover': {
    backgroundColor: vars.colors.accent,
    color: vars.colors.foreground,
  },
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
});

export const icon16 = style({
  height: '1rem', // h-4
  width: '1rem', // w-4
});

export const icon20 = style({
  height: '1.25rem', // h-5
  width: '1.25rem', // w-5
});
