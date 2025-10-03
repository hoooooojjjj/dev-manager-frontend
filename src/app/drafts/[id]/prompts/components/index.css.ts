import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forTablet } from '@/lib/styles/breakpoints';

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
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const title = style({
  fontSize: '1.5rem', // text-2xl
  lineHeight: '2rem',
});

export const headerActions = style({
  display: 'flex',
  gap: '0.5rem',
});

export const description = style({
  color: vars.colors.mutedForeground,
});

// 탭 리스트
export const tabsList = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

export const tabTrigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

// 프롬프트 카드
export const promptCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const promptCardTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const copyButton = style({
  gap: '0.5rem',
});

export const promptContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const promptText = style({
  backgroundColor: vars.colors.muted,
  padding: '1rem',
  borderRadius: vars.spacing.radius,
  fontSize: '0.875rem',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
});

// 변수 섹션
export const variablesTitle = style({
  fontWeight: '500',
  marginBottom: '0.75rem',
});

export const variablesGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0.75rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const variableCard = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.spacing.radius,
  padding: '0.75rem',
});

export const variableHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.25rem',
});

export const variableName = style({
  fontSize: '0.75rem',
  fontFamily: 'monospace',
});

export const variableValue = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

// 사용 가이드
export const guideGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const guideCard = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.spacing.radius,
  padding: '1rem',
});

export const guideTitle = style({
  fontWeight: '500',
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const guideDescription = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const tipSection = style({
  backgroundColor: '#eff6ff', // bg-blue-50
  border: '1px solid #bfdbfe', // border-blue-200
  borderRadius: vars.spacing.radius,
  padding: '1rem',
});

export const tipTitle = style({
  fontWeight: '500',
  color: '#1e3a8a', // text-blue-900
  marginBottom: '0.25rem',
});

export const tipText = style({
  fontSize: '0.875rem',
  color: '#1e40af', // text-blue-800
});

// 아이콘 색상
export const iconBlue = style({
  color: '#2563eb', // text-blue-600
});

export const iconGreen = style({
  color: '#16a34a', // text-green-600
});

export const iconPurple = style({
  color: '#9333ea', // text-purple-600
});

export const buttonIcon = style({
  height: '1rem',
  width: '1rem',
  marginRight: '0.5rem',
});
