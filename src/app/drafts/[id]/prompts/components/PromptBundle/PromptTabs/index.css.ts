import { forTablet } from '@/lib/styles/breakpoints';
import { vars } from '@/lib/styles/theme.css';
import { style } from '@vanilla-extract/css';

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

export const copyButton = style({
  gap: '0.5rem',
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
