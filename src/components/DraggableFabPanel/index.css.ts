import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// FAB 버튼 기본 스타일
export const fabButton = style({
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: `2px solid ${vars.colors.border}`,
  cursor: 'move',
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  fontWeight: '600',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  outline: 'none',

  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },

  ':active': {
    transform: 'scale(0.95)',
  },
});

// FAB 버튼 색상 변형
export const fabButtonVariant = styleVariants({
  default: {
    backgroundColor: vars.colors.primary,
    color: vars.colors.primaryForeground,

    ':hover': {
      backgroundColor: vars.colors.primary,
      opacity: 0.9,
    },
  },
  secondary: {
    backgroundColor: vars.colors.secondary,
    color: vars.colors.secondaryForeground,

    ':hover': {
      backgroundColor: vars.colors.secondary,
      opacity: 0.9,
    },
  },
  accent: {
    backgroundColor: vars.colors.accent,
    color: vars.colors.accentForeground,

    ':hover': {
      backgroundColor: vars.colors.accent,
      opacity: 0.9,
    },
  },
  destructive: {
    backgroundColor: vars.colors.destructive,
    color: vars.colors.destructiveForeground,

    ':hover': {
      backgroundColor: vars.colors.destructive,
      opacity: 0.9,
    },
  },
});

export const panelBase = {
  padding: '16px',
  marginBottom: 8,
  borderRadius: '16px',
  backgroundColor: vars.colors.card,
  color: vars.colors.cardForeground,
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  zIndex: 50,
};

// 패널 기본 스타일
export const panel = styleVariants({
  'top-left': {
    ...panelBase,
    position: 'absolute',
    bottom: 'calc(100% + 12px)',
    right: 0,
  },
  'top-right': {
    ...panelBase,
    position: 'absolute',
    bottom: 'calc(100% + 12px)',
    left: 0,
  },
  'bottom-left': {
    ...panelBase,
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
  },
  'bottom-right': {
    ...panelBase,
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: 0,
  },
});

// 크기 변형
export const fabSizeVariant = styleVariants({
  sm: {
    width: '44px',
    height: '44px',
    fontSize: '1rem',
  },
  md: {
    width: '56px',
    height: '56px',
    fontSize: '1.25rem',
  },
  lg: {
    width: '68px',
    height: '68px',
    fontSize: '1.5rem',
  },
});

// 위치 기본값
export const containerBase = style({
  position: 'fixed',
  zIndex: 1000,
});

// 위치 변형
export const positionVariant = styleVariants({
  'bottom-right': {
    bottom: '40px',
    right: '40px',
  },
  'bottom-left': {
    bottom: '40px',
    left: '40px',
  },
  'top-right': {
    top: '40px',
    right: '40px',
  },
  'top-left': {
    top: '40px',
    left: '40px',
  },
});
