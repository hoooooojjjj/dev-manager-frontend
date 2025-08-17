import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forMobile } from '@/lib/styles/breakpoints';

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

export const projectTitle = style({
  fontSize: '1.5rem', // text-2xl
  lineHeight: '2rem',
});

export const projectMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
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
