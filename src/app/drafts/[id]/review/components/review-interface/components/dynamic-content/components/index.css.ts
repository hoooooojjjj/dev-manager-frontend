import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { forTablet } from '@/styles/breakpoints';

// 히스토리 컨테이너
export const historyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '600px',
  overflow: 'auto',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  textAlign: 'center',
  color: vars.colors.mutedForeground,
  gap: '0.75rem',
});

export const emptyIcon = style({
  height: '3rem',
  width: '3rem',
  opacity: '0.5',
});

// 리뷰 카드
export const reviewCard = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.spacing.radius,
  overflow: 'hidden',
  transition: 'border-color 150ms',

  ':hover': {
    borderColor: vars.colors.ring,
  },
});

export const reviewCardExpanded = style([
  reviewCard,
  {
    borderColor: vars.colors.primary,
    boxShadow: `0 0 0 1px ${vars.colors.primary}20`,
  },
]);

// 카드 헤더
export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: vars.colors.muted,
  cursor: 'pointer',
  transition: 'background-color 150ms',

  ':hover': {
    backgroundColor: vars.colors.accent,
  },
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flex: 1,
  minWidth: 0,
});

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const reviewNumber = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  backgroundColor: vars.colors.primary,
  color: vars.colors.primaryForeground,
  fontSize: '0.75rem',
  fontWeight: '600',
  flexShrink: 0,
});

export const reviewSummary = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  minWidth: 0,
});

export const summaryTitle = style({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: vars.colors.foreground,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const summaryMeta = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const timestamp = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
});

export const expandIcon = style({
  transition: 'transform 150ms',
  color: vars.colors.mutedForeground,
});

export const expandIconRotated = style([
  expandIcon,
  {
    transform: 'rotate(180deg)',
  },
]);

// 카드 콘텐츠
export const cardContent = style({
  padding: '1.5rem',
  backgroundColor: vars.colors.card,
  maxHeight: '300px',
  overflow: 'auto',
});

export const instructionSection = style({
  marginBottom: '1.5rem',
});

export const sectionTitle = style({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: vars.colors.foreground,
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const instructionText = style({
  fontSize: '0.875rem',
  lineHeight: '1.5',
  color: vars.colors.foreground,
  backgroundColor: vars.colors.muted,
  padding: '0.75rem',
  borderRadius: vars.spacing.radius,
  whiteSpace: 'pre-wrap',
});

// Diff 영역
export const diffContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  marginBottom: '1.5rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const diffSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const diffHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.875rem',
  fontWeight: '600',
});

export const beforeHeader = style([
  diffHeader,
  {
    color: vars.colors.destructive,
  },
]);

export const afterHeader = style([
  diffHeader,
  {
    color: '#16a34a', // green-600
  },
]);

export const diffContent = style({
  fontSize: '0.875rem',
  lineHeight: '1.5',
  padding: '0.75rem',
  borderRadius: vars.spacing.radius,
  whiteSpace: 'pre-wrap',
  maxHeight: '200px',
  overflow: 'auto',
});

export const beforeContent = style([
  diffContent,
  {
    backgroundColor: '#fef2f2', // red-50
    border: '1px solid #fecaca', // red-200
    color: '#991b1b', // red-800
  },
]);

export const afterContent = style([
  diffContent,
  {
    backgroundColor: '#f0fdf4', // green-50
    border: '1px solid #bbf7d0', // green-200
    color: '#166534', // green-800
  },
]);

// 액션 영역
export const actionsContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  paddingTop: '1rem',
  borderTop: `1px solid ${vars.colors.border}`,
});

export const actionButtons = style({
  display: 'flex',
  gap: '0.5rem',
});

export const statusBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

// 상태별 스타일
export const appliedStatus = style({
  color: '#16a34a', // green-600
});

export const pendingStatus = style({
  color: vars.colors.mutedForeground,
});

export const revertedStatus = style({
  color: vars.colors.destructive,
});
