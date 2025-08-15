import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

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

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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
