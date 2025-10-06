import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const fullWidthCard = style({
  gridColumn: 'span 2',
});

export const historyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const historyItem = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '0.5rem',
  padding: '1rem',
  backgroundColor: vars.colors.card,
});

export const historyHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
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
  gap: '1rem',
});

export const instructionSection = style({
  backgroundColor: vars.colors.muted,
  borderRadius: '0.375rem',
  padding: '0.75rem',
});

export const instructionTitle = style({
  fontSize: '0.875rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
});

export const instructionText = style({
  fontSize: '0.875rem',
  lineHeight: '1.5',
  color: vars.colors.foreground,
});

export const diffGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
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

export const iconDestructive = style({
  color: vars.colors.destructive,
});

export const iconSuccess = style({
  color: vars.colors.primary,
});

export const beforeDiff = style({
  backgroundColor: vars.colors.destructive,
  border: `1px solid ${vars.colors.destructive}`,
  borderRadius: '0.375rem',
  padding: '0.75rem',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
});

export const afterDiff = style({
  backgroundColor: vars.colors.primary,
  border: `1px solid ${vars.colors.primary}`,
  borderRadius: '0.375rem',
  padding: '0.75rem',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
});

export const sectionContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const sectionContent = style({
  padding: '1rem',
});

export const sectionContentTitle = style({
  fontSize: '1rem',
  fontWeight: '600',
  marginBottom: '0.75rem',
});

export const sectionContentTitleHighlight = style({
  color: vars.colors.ring,
  fontWeight: 'bold',
});

export const sectionContentText = style({
  fontSize: '0.875rem',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
  backgroundColor: vars.colors.muted,
  padding: '10px',
  borderRadius: '0.5rem',
});

export const buttonIcon = style({
  width: '1rem',
  height: '1rem',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem 1rem',
  color: vars.colors.mutedForeground,
  textAlign: 'center',
});

export const emptyIcon = style({
  width: '3rem',
  height: '3rem',
  opacity: '0.3',
});
