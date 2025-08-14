import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});

export const statCenter = style({
  textAlign: 'center',
});

export const statValue = style({
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: '2rem',
  color: vars.colors.primary,
});

export const statValueGreen = style([statValue, {
  color: vars.colors.green600,
}]);

export const statValueBlue = style([statValue, {
  color: vars.colors.blue600,
}]);

export const statValuePurple = style([statValue, {
  color: vars.colors.purple600,
}]);

export const statLabel = style({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const statIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
});

export const checkIcon = style({
  height: '1.25rem',
  width: '1.25rem',
  color: vars.colors.green600,
});

export const tabsWrapper = style({
  width: '100%',
});

export const tabsGrid = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

export const tabContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

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

export const jobHeaderFlex = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '0.5rem',
});

export const jobMetaWrapper = style({
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: vars.colors.mutedForeground,
});

export const jobContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const requirementsSection = style({});

export const requirementsTitle = style({
  marginBottom: '0.5rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '500',
});

export const requirementsBadges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const compContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const compSection = style({});

export const compSectionTitle = style({
  marginBottom: '0.5rem',
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

export const cardTitleFlex = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
});

export const externalLinkIcon = style({
  marginRight: '0.5rem',
  height: '1rem',
  width: '1rem',
});