import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const errorText = style({
  fontSize: '0.875rem',
  color: vars.colors.destructive,
});

export const focusFilesGrid = style({
  marginTop: '8px',
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

export const focusFileBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const focusFilesActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const removeButton = style({
  marginLeft: '4px',
  color: vars.colors.destructive,

  ':hover': {
    color: vars.colors.destructive,
  },
});

export const removeIcon = style({
  height: '12px',
  width: '12px',
});

export const submitButton = style({
  width: '100%',
});

export const buttonIcon = style({
  height: '16px',
  width: '16px',
});
