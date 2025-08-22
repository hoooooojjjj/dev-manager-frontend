import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop, forMobile } from '@/lib/styles/breakpoints';

// 메인 컨테이너
export const container = style({
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

// 헤더 카드
export const headerCard = style({
  position: 'relative',
  background: vars.colors.accent,
});

// 헤더 섹션
export const headerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-start',
  padding: '20px',
});

export const title = style({
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: '600',
  '@media': {
    [forMobile]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
});

export const summary = style({
  color: vars.colors.mutedForeground,
  lineHeight: '1.6',
  margin: 0,
  '@media': {
    [forMobile]: {
      fontSize: '0.875rem',
      lineHeight: '1.3',
    },
  },
});

export const headerActions = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  '@media': {
    [forMobile]: {
      justifyContent: 'flex-start',
      gap: '8px',
    },
  },
});

export const headerBadge = style({
  borderRadius: '0.375rem',
  border: '1px solid #374151',
  backgroundColor: '#1f2937',
  padding: '0.375rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#60a5fa',
});

export const badgeContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
});

// 좌측 목차 사이드바 (Fixed 포지션)
export const tocSidebar = style({
  position: 'fixed',
  left: '1.5rem',
  top: '135px',
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'auto',
  zIndex: 10,
  display: 'none', // 기본적으로 숨김
  scrollbarWidth: 'thin', // Firefox용 스크롤바 스타일

  // Webkit 스크롤바 스타일
  selectors: {
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: vars.colors.border,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: vars.colors.mutedForeground,
    },
  },

  '@media': {
    [forDesktop]: {
      display: 'block', // 데스크톱에서만 표시
    },
  },
});

export const tocCard = style({
  position: 'sticky',
  top: 0,
  backgroundColor: vars.colors.card,
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

export const tocTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  fontWeight: '600',
});

// 목차 네비게이션
export const tocContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const tocItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  justifyContent: 'space-between',
  padding: '0.75rem',
  fontSize: '0.875rem',
  borderRadius: vars.spacing.radius,
  transition: 'all 250ms ease-in-out',
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
      width: '2px',
      height: '0%',
      backgroundColor: vars.colors.primary,
      borderRadius: '0 3px 3px 0',
      transition: 'height 250ms ease-in-out',
    },
    '&:hover': {
      backgroundColor: vars.colors.muted,
      borderColor: vars.colors.border,
      transform: 'translateX(6px)',
    },
    '&:hover::before': {
      height: '60%',
    },
    '&:focus': {
      outline: `1px solid ${vars.colors.ring}`,
      outlineOffset: '1px',
    },
    '&:active': {
      backgroundColor: vars.colors.accent,
      borderColor: vars.colors.primary,
      color: vars.colors.primary,
      transform: 'translateX(8px)',
    },
    '&:active::before': {
      height: '80%',
    },
  },
});

export const tocItemActive = style({
  backgroundColor: vars.colors.accent,
  borderColor: vars.colors.primary,
  color: vars.colors.primary,
  fontWeight: '500',
});

// 메인 콘텐츠
export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
});

// TOC 항목 내부 레이아웃
export const tocItemContent = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  gap: '1rem',
});

export const tocItemTitle = style({
  fontWeight: '500',
  fontSize: '0.875rem',
});

export const tocItemDescription = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
});

// 섹션 카드 (앵커 대상)
export const sectionCard = style({
  scrollMarginTop: 100,
  transition: 'all 0.3s ease-in-out',

  ':target': {
    boxShadow: `0 0 0 2px ${vars.colors.primary}, 0 8px 25px -5px rgba(0, 0, 0, 0.15)`,
  },
});

// 섹션 헤더
export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const sectionIcon = style({
  height: '1.25rem',
  width: '1.25rem',
});

// 상태 아이콘
export const completedIcon = style({
  color: vars.colors.primary,
});

export const pendingIcon = style({
  color: '#f59e0b',
});

export const statusIcon = style({
  height: '1rem',
  width: '1rem',
});

// 인용 목록 - 아이템 개수에 따라 자동 조정
export const citationsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '0.75rem',
  width: '100%',
});

export const citationItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.spacing.radius,
  transition: 'background-color 150ms',

  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.muted,
    },
  },
});

export const citationContent = style({
  flex: 1,
  minWidth: 0, // flex item 오버플로우 방지
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const citationTitle = style({
  fontSize: '0.875rem',
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  lineHeight: '1.3',
});

export const citationUrl = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  lineHeight: '1.3',
});

export const citationButton = style({
  height: '1.5rem',
  width: '1.5rem',
});
