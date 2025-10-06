import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const cardHover = style({
  transition: 'box-shadow 0.15s ease-in-out',
  ':hover': {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
});

export const cardHeaderItems = style({
  alignItems: 'flex-start',
  paddingBottom: '0.75rem',
});

export const cardTitle = style({
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
});

export const compContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const compSection = style({});

export const compSectionTitle = style({
  marginBottom: '0.5rem',
  marginTop: '10px',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
});

export const compBadges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const learningPointsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const learningPoint = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const bulletPoint = style({
  color: vars.colors.primary,
});
