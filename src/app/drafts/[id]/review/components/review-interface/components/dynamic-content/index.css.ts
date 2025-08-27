import { vars } from '@/lib/styles/theme.css';
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
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.5rem',
  padding: '1rem',
  backgroundColor: 'hsl(var(--card))',
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
  color: 'hsl(var(--muted-foreground))',
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
  backgroundColor: 'hsl(var(--muted) / 0.3)',
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
  color: 'hsl(var(--foreground))',
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
  color: 'hsl(var(--destructive))',
});

export const iconSuccess = style({
  color: 'hsl(var(--primary))',
});

export const beforeDiff = style({
  backgroundColor: 'hsl(var(--destructive) / 0.1)',
  border: '1px solid hsl(var(--destructive) / 0.2)',
  borderRadius: '0.375rem',
  padding: '0.75rem',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
});

export const afterDiff = style({
  backgroundColor: 'hsl(var(--primary) / 0.1)',
  border: '1px solid hsl(var(--primary) / 0.2)',
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
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.5rem',
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
  color: 'hsl(var(--muted-foreground))',
  textAlign: 'center',
});

export const emptyIcon = style({
  width: '3rem',
  height: '3rem',
  opacity: '0.3',
});
