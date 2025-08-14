import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forTablet, forDesktop } from '@/lib/styles/breakpoints';

// 메인 컨테이너
export const container = style({
  maxWidth: '72rem', // max-w-6xl
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',

  '@media': {
    [forDesktop]: {
      gridTemplateColumns: '1fr 2fr',
    },
  },
});

export const fullWidthCard = style({
  '@media': {
    [forDesktop]: {
      gridColumn: '1 / -1',
    },
  },
});

// 섹션 선택
export const sectionsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const sectionButton = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: vars.spacing.radius,
  border: `1px solid ${vars.colors.border}`,
  padding: '0.75rem',
  textAlign: 'left',
  transition: 'colors 150ms',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colors.muted,
  },
});

export const sectionButtonSelected = style([
  sectionButton,
  {
    borderColor: vars.colors.primary,
    backgroundColor: `${vars.colors.primary}0d`, // primary/5
  },
]);

export const sectionTitle = style({
  fontWeight: '500',
});

// 리뷰 폼
export const reviewFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const instructionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const minHeightTextarea = style({
  minHeight: '120px',
});

export const checkboxContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const checkboxLabel = style({
  fontSize: '0.875rem',
});

export const submitButton = style({
  width: '100%',
});

export const buttonIcon = style({
  marginRight: '0.5rem',
  height: '1rem',
  width: '1rem',
});

export const spinningIcon = style([
  buttonIcon,
  {
    animation: 'spin 1s linear infinite',
  },
]);

// 리뷰 히스토리
export const historyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const historyItem = style({
  borderRadius: vars.spacing.radius,
  border: `1px solid ${vars.colors.border}`,
  padding: '1rem',
});

export const historyHeader = style({
  marginBottom: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const historyMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const historyTimestamp = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const historyActions = style({
  display: 'flex',
  gap: '0.5rem',
});

export const historyContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const instructionSection = style({});

export const instructionTitle = style({
  marginBottom: '0.25rem',
  fontSize: '0.875rem',
  fontWeight: '500',
});

export const instructionText = style({
  borderRadius: vars.spacing.radius,
  backgroundColor: vars.colors.muted,
  padding: '0.5rem',
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const diffGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const diffSection = style({});

export const diffHeader = style({
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.875rem',
  fontWeight: '500',
});

export const beforeDiff = style({
  borderRadius: vars.spacing.radius,
  border: '1px solid #fecaca', // border-red-200
  backgroundColor: '#fef2f2', // bg-red-50
  padding: '0.75rem',
  fontSize: '0.875rem',
});

export const afterDiff = style({
  borderRadius: vars.spacing.radius,
  border: '1px solid #bbf7d0', // border-green-200
  backgroundColor: '#f0fdf4', // bg-green-50
  padding: '0.75rem',
  fontSize: '0.875rem',
});

// 아이콘 색상
export const iconDestructive = style({
  color: vars.colors.destructive,
});

export const iconSuccess = style({
  color: '#16a34a', // text-green-600
});
