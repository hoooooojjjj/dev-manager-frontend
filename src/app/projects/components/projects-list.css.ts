import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forMobile } from '@/lib/styles/breakpoints';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
    },
  },
});

export const filtersContainer = style({
  display: 'grid',
  gridTemplateColumns: '8fr 2fr',
  gap: '16px',
  width: '100%',

  '@media': {
    [forMobile]: {
      gridTemplateColumns: '7fr 3fr',
      gap: '8px',
    },
  },
});

export const searchContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const searchIcon = style({
  position: 'absolute',
  left: '12px',
  top: '50%',
  height: '16px',
  width: '16px',
  transform: 'translateY(-50%)',
  color: vars.colors.mutedForeground,
});

export const searchInput = style({
  paddingLeft: '36px',
});

export const statusFilter = style({
  width: '160px',
});

export const projectGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',

  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const skeletonCard = style({
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
});

export const skeletonHeader = style({
  height: '16px',
  width: '75%',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonDescription = style({
  height: '12px',
  width: '50%',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const skeletonLine = style({
  height: '12px',
  borderRadius: '4px',
  backgroundColor: vars.colors.muted,
});

export const skeletonLineShort = style([
  skeletonLine,
  {
    width: '83.33%',
  },
]);

export const emptyStateContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 0',
});

export const emptyStateIcon = style({
  marginBottom: '16px',
  height: '48px',
  width: '48px',
  color: vars.colors.mutedForeground,
});

export const emptyStateTitle = style({
  marginBottom: '8px',
  fontSize: '1.125rem',
  fontWeight: '600',
});

export const emptyStateDescription = style({
  marginBottom: '16px',
  textAlign: 'center',
  color: vars.colors.mutedForeground,
});

export const resultsCounter = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const projectCard = style({
  transition: 'box-shadow 0.15s ease-in-out',

  ':hover': {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
});

export const cardHeader = style({
  alignItems: 'flex-start !important',
  paddingBottom: '12px',
  gap: '12px !important',
});

export const cardTitle = style({
  fontSize: '1.125rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const badgeContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const badgeOutline = style({
  fontSize: '0.75rem',
});

export const projectInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontSize: '0.875rem',
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: vars.colors.mutedForeground,
});

export const infoIcon = style({
  height: '16px',
  width: '16px',
});

export const infoText = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const focusFilesSection = style({
  fontSize: '0.75rem',
  color: vars.colors.mutedForeground,
});

export const focusFilesList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
});

export const focusFileBadge = style({
  fontSize: '0.75rem',
});

export const actionButtons = style({
  display: 'flex',
  gap: '8px',
  paddingTop: '8px',
});

export const primaryButton = style({
  flex: 1,
});

export const buttonIcon = style({
  marginRight: '4px',
  height: '12px',
  width: '12px',
});

export const errorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 0',
});

export const errorContent = style({
  textAlign: 'center',
});

export const errorMessage = style({
  marginBottom: '8px',
  color: vars.colors.destructive,
});

export const addProjectIcon = style({
  marginRight: '8px',
  height: '16px',
  width: '16px',
});

export const statusColors = {
  idle: style({ background: '#f5f5f5', color: '#1f2937' }),
  submitting: style({ background: '#dbeafe', color: '#1e3a8a' }),
  queued: style({ background: '#fef3c7', color: '#92400e' }),
  collecting: style({ background: '#ffedd5', color: '#9a3412' }),
  researching: style({ background: '#ede9fe', color: '#5b21b6' }),
  drafting: style({ background: '#e0e7ff', color: '#3730a3' }),
  review: style({ background: '#cffafe', color: '#155e75' }),
  publishing: style({ background: '#d1fae5', color: '#065f46' }),
  done: style({ background: '#dcfce7', color: '#166534' }),
  error: style({ background: '#fee2e2', color: '#991b1b' }),
};
