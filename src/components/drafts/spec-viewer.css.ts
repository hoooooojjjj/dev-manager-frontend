import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forTablet, forDesktop } from '@/lib/styles/breakpoints';

// 메인 컨테이너
export const container = style({
  maxWidth: '72rem', // max-w-6xl
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

// 헤더 섹션
export const headerContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const headerContent = style({
  flex: 1,
});

export const title = style({
  fontSize: '1.5rem', // text-2xl
  lineHeight: '2rem',
  marginBottom: '0.5rem',
});

export const summary = style({
  color: vars.colors.mutedForeground,
});

export const badgeContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1rem',
});

export const headerActions = style({
  display: 'flex',
  gap: '0.5rem',
});

// 메인 레이아웃
export const mainLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',

  '@media': {
    [forDesktop]: {
      gridTemplateColumns: '1fr 3fr',
    },
  },
});

// 목차 네비게이션
export const tocContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const tocItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem',
  fontSize: '0.875rem',
  borderRadius: vars.spacing.radius,
  transition: 'background-color 150ms',
  textDecoration: 'none',
  color: vars.colors.foreground,

  ':hover': {
    backgroundColor: vars.colors.muted,
  },
});

// 메인 콘텐츠
export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const contentText = style({
  fontSize: '0.875rem',
  lineHeight: '1.625', // leading-relaxed
});

export const problemsContainer = style({
  backgroundColor: vars.colors.muted,
  padding: '1rem',
  borderRadius: vars.spacing.radius,
});

export const problemsTitle = style({
  fontWeight: '500',
  marginBottom: '0.5rem',
});

export const problemsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontSize: '0.875rem',
});

export const problemItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
});

export const problemBullet = style({
  color: vars.colors.destructive,
});

// 분석 섹션
export const analysisContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const hypothesisCard = style({
  borderLeft: '4px solid #eab308', // border-yellow-500
  paddingLeft: '1rem',
});

export const hypothesisTitle = style({
  fontWeight: '500',
});

export const hypothesisDescription = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
  marginTop: '0.25rem',
});

export const citationContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '0.5rem',
});

export const citationBadge = style({
  fontSize: '0.75rem', // text-xs
});

// 미완성 섹션
export const incompleteSection = style({
  backgroundColor: '#fefce8', // bg-yellow-50
  border: '1px solid #fde047', // border-yellow-200
  borderRadius: vars.spacing.radius,
  padding: '1rem',
});

export const incompleteText = style({
  fontSize: '0.875rem',
  color: '#a16207', // text-yellow-800
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const warningIcon = style({
  color: '#ca8a04', // text-yellow-600
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

// 상태 아이콘
export const completedIcon = style({
  color: '#16a34a', // text-green-600
});

export const pendingIcon = style({
  color: '#ca8a04', // text-yellow-600
});
