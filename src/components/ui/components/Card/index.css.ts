import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

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
  padding: '20px',
  paddingBottom: '18px',
  borderTopLeftRadius: `calc(${vars.spacing.radius} * 2)`, // rounded-xl
  borderTopRightRadius: `calc(${vars.spacing.radius} * 2)`, // rounded-xl
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
  padding: '20px',
  paddingTop: 0,
  borderBottomLeftRadius: `calc(${vars.spacing.radius} * 2)`, // rounded-xl
  borderBottomRightRadius: `calc(${vars.spacing.radius} * 2)`, // rounded-xl
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  paddingTop: 0,
});
