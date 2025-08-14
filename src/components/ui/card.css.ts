import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const card = style({
  borderRadius: `calc(${vars.spacing.radius} * 2)`, // rounded-xl
  border: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.card,
  color: vars.colors.cardForeground,
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
});

export const cardHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '24px',
  paddingBottom: '18px',
});

export const cardTitle = style({
  fontWeight: '600',
  lineHeight: 1,
  letterSpacing: '-0.025em',
});

export const cardDescription = style({
  wordBreak: 'keep-all',
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const cardContent = style({
  padding: '24px',
  paddingTop: 0,
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  padding: '24px',
  paddingTop: 0,
});