import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// 컨테이너
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minWidth: '280px',
  maxWidth: '320px',
});

// 헤더
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  paddingBottom: '0.75rem',
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const headerIcon = style({
  height: '1.25rem',
  width: '1.25rem',
  color: vars.colors.primary,
});

export const title = style({
  fontSize: '1.125rem',
  fontWeight: '600',
  color: vars.colors.foreground,
  margin: 0,
});

// 네비게이션
export const tocNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  maxHeight: '400px',
  overflowY: 'auto',
  paddingRight: '0.5rem',

  // 스크롤바 스타일
  selectors: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: vars.colors.border,
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: vars.colors.mutedForeground,
    },
  },
});

// TOC 아이템
export const tocItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '0.75rem',
  fontSize: '0.875rem',
  borderRadius: vars.spacing.radius,
  transition: 'all 200ms ease-in-out',
  textDecoration: 'none',
  color: vars.colors.foreground,
  border: `1px solid transparent`,
  position: 'relative',

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '3px',
      height: '0%',
      backgroundColor: vars.colors.primary,
      borderRadius: '0 2px 2px 0',
      transition: 'height 200ms ease-in-out',
    },
    '&:hover': {
      backgroundColor: vars.colors.muted,
      borderColor: vars.colors.border,
      transform: 'translateX(4px)',
    },
    '&:hover::before': {
      height: '60%',
    },
    '&:focus': {
      outline: `2px solid ${vars.colors.ring}`,
      outlineOffset: '1px',
    },
    '&:active': {
      backgroundColor: vars.colors.accent,
      borderColor: vars.colors.primary,
      color: vars.colors.primary,
      transform: 'translateX(6px)',
    },
    '&:active::before': {
      height: '80%',
    },
  },
});

// TOC 아이템 내용
export const tocItemContent = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  gap: '0.75rem',
});

export const tocItemTitle = style({
  fontWeight: '500',
  fontSize: '0.875rem',
  lineHeight: '1.2',
});

export const tocItemDescription = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
  lineHeight: '1.2',
});

// 섹션 아이콘
export const sectionIcon = style({
  height: '1rem',
  width: '1rem',
  flexShrink: 0,
});

// 상태 아이콘
export const statusIcon = style({
  height: '1rem',
  width: '1rem',
  flexShrink: 0,
});

export const completedIcon = style({
  color: vars.colors.primary,
});

export const pendingIcon = style({
  color: '#f59e0b',
});
