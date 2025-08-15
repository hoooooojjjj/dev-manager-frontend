import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forTablet, forDesktop, forMobile } from '@/lib/styles/breakpoints';

// 메인 컨테이너
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem', // space-y-6
});

// 프로젝트 헤더 영역
export const headerContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '0.5rem',
    },
  },
});

export const headerInfo = style({
  display: 'flex',
  flexDirection: 'column',
});

export const projectTitle = style({
  textAlign: 'center',
  fontSize: '1.5rem', // text-2xl
  lineHeight: '2rem',
});

export const projectMeta = style({
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '0.875rem', // text-sm
  color: vars.colors.mutedForeground,

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.5rem',
    },
  },
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

// 진행률 섹션
export const progressSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const progressHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.875rem',
});

export const progressBar = style({
  height: '0.5rem', // h-2
  width: '100%',
  borderRadius: vars.spacing.radius,
  backgroundColor: vars.colors.secondary,
});

export const progressFill = style({
  height: '0.5rem',
  borderRadius: vars.spacing.radius,
  backgroundColor: vars.colors.primary,
  transition: 'all 300ms',
});

// 타임라인
export const timelineContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  overflowX: 'auto',
  paddingBottom: '0.5rem',
});

export const timelineItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  whiteSpace: 'nowrap',
});

export const timelineStage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '1rem', // rounded-full
  paddingLeft: '0.75rem', // px-3
  paddingRight: '0.75rem',
  paddingTop: '0.25rem', // py-1
  paddingBottom: '0.25rem',
  fontSize: '0.75rem', // text-xs
});

export const timelineStageCompleted = style([
  timelineStage,
  {
    backgroundColor: '#dcfce7', // bg-green-100
    color: '#166534', // text-green-800
  },
]);

export const timelineStageCurrent = style([
  timelineStage,
  {
    backgroundColor: '#dbeafe', // bg-blue-100
    color: '#1e40af', // text-blue-800
  },
]);

export const timelineStagePending = style([
  timelineStage,
  {
    backgroundColor: '#f3f4f6', // bg-gray-100
    color: '#4b5563', // text-gray-600
  },
]);

export const timelineDot = style({
  height: '0.5rem', // h-2 w-2
  width: '0.5rem',
  borderRadius: '50%',
});

export const timelineDotCompleted = style([
  timelineDot,
  {
    backgroundColor: '#16a34a', // bg-green-600
  },
]);

export const timelineDotCurrent = style([
  timelineDot,
  {
    backgroundColor: '#2563eb', // bg-blue-600
  },
]);

export const timelineDotPending = style([
  timelineDot,
  {
    backgroundColor: '#9ca3af', // bg-gray-400
  },
]);

export const timelineConnector = style({
  height: '1px',
  width: '1rem', // w-4
  backgroundColor: vars.colors.border,
});

// 액션 카드 그리드
export const actionGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [forDesktop]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const actionCard = style({
  transition: 'box-shadow 150ms',

  ':hover': {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // hover:shadow-md
  },
});

export const actionCardHeader = style({
  paddingBottom: '0.75rem', // pb-3
});

export const actionCardTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.125rem', // text-lg
  lineHeight: '1.75rem',
});

export const actionCardDescription = style({
  marginBottom: '1rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const actionButton = style({
  width: '100%',
});

export const buttonIcon = style({
  marginRight: '0.5rem',
  height: '1rem',
  width: '1rem',
});

// 실시간 로그
export const logContainer = style({
  maxHeight: '15rem', // max-h-60
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'auto',
});

export const logItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  fontSize: '0.875rem',
});

export const logDot = style({
  marginTop: '0.5rem',
  height: '0.5rem',
  width: '0.5rem',
  borderRadius: '50%',
  flexShrink: 0,
});

export const logDotBlue = style([
  logDot,
  {
    backgroundColor: '#3b82f6', // bg-blue-500
  },
]);

export const logDotGreen = style([
  logDot,
  {
    backgroundColor: '#10b981', // bg-green-500
  },
]);

// logContent 스타일 제거됨 (불필요)

export const logTime = style({
  color: vars.colors.mutedForeground,
});

export const logMessage = style({
  marginLeft: '0.5rem',
});

// 아이콘 색상 스타일
export const iconPurple = style({
  color: '#9333ea', // text-purple-600
});

export const iconBlue = style({
  color: '#2563eb', // text-blue-600
});

export const iconGreen = style({
  color: '#16a34a', // text-green-600
});
