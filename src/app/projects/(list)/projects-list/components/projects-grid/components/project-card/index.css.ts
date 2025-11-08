import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { ProjectStatus, ProjectStatusSchema } from '@/api/project/responses.dto';

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
  minHeight: '20px',
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

export const infoLink = style({
  color: vars.colors.foreground,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
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

export const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatusSchema.enum.intake]: '#f5f5f5',
  [ProjectStatusSchema.enum.research]: '#dbeafe',
  [ProjectStatusSchema.enum.draft]: '#fef3c7',
  [ProjectStatusSchema.enum.review]: '#ffedd5',
  [ProjectStatusSchema.enum.prompts]: '#ede9fe',
  [ProjectStatusSchema.enum.completed]: '#dcfce7',
  [ProjectStatusSchema.enum.error]: '#fee2e2',
};
