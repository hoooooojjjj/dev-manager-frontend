import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

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

export const cardHeaderFlex = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const cardTitleWrapper = style({
  flex: '1 1 0%',
});

export const cardTitle = style({
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
});

export const metaWrapper = style({
  marginTop: '0.5rem',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
  '@media': {
    'screen and (max-width: 767px)': {
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

export const metaIcon = style({
  height: '1rem',
  width: '1rem',
});

export const rightActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const ratingWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

export const starIcon = style({
  height: '1rem',
  width: '1rem',
  color: vars.colors.yellow500,
});

export const ratingText = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
});

export const summary = style({
  marginBottom: '1rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const bottomActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const badgeGroup = style({
  display: 'flex',
  gap: '0.5rem',
});

export const externalLinkIcon = style({
  marginRight: '0.5rem',
  height: '1rem',
  width: '1rem',
});
