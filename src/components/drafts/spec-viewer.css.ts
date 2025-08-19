import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forTablet, forDesktop } from '@/lib/styles/breakpoints';

// 메인 컨테이너
export const container = style({
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

// 헤더 섹션
export const headerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '@media': {
    [forTablet]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  },
});

export const headerContent = style({
  flex: 1,
});

export const title = style({
  fontSize: '1.5rem',
  lineHeight: '2rem',
  marginBottom: '0.5rem',
  fontWeight: '600',
});

export const summary = style({
  color: vars.colors.mutedForeground,
  lineHeight: '1.6',
  marginBottom: '1rem',
});

export const badgeContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

export const headerActions = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  alignSelf: 'flex-start',
});

// 메인 레이아웃
export const mainLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',
  alignItems: 'start',

  '@media': {
    [forDesktop]: {
      gridTemplateColumns: '280px 1fr',
      gap: '2rem',
    },
  },
});

// 목차 네비게이션
export const tocContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const tocItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '0.75rem',
  fontSize: '0.875rem',
  borderRadius: vars.spacing.radius,
  transition: 'all 150ms',
  textDecoration: 'none',
  color: vars.colors.foreground,
  border: `1px solid transparent`,

  ':hover': {
    backgroundColor: vars.colors.muted,
    borderColor: vars.colors.border,
  },

  ':focus': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '1px',
  },
});

// 메인 콘텐츠
export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  minWidth: 0, // 그리드 아이템 오버플로우 방지
});

// TOC 항목 내부 레이아웃
export const tocItemContent = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  gap: '0.5rem',
});

export const tocItemDetails = style({
  display: 'flex',
  flexDirection: 'column',
});

export const tocItemTitle = style({
  fontWeight: '500',
  fontSize: '0.875rem',
});

export const tocItemDescription = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
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

// 인용 목록
export const citationsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0.75rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [forDesktop]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const citationItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.spacing.radius,
  transition: 'background-color 150ms',

  ':hover': {
    backgroundColor: vars.colors.muted,
  },
});

export const citationContent = style({
  flex: 1,
  minWidth: 0,
});

export const citationTitle = style({
  fontSize: '0.875rem',
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const citationUrl = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const citationButton = style({
  height: '1.5rem',
  width: '1.5rem',
});
