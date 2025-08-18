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
  gap: '8px',
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

export const addFileButton = style({
  width: '100%',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: `1px solid ${vars.colors.input}`,
  borderRadius: '6px',
  backgroundColor: 'transparent',
  padding: '4px 12px',
  fontSize: '0.875rem',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  transition: 'colors 0.15s ease-in-out',
  cursor: 'pointer',

  selectors: {
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.colors.ring}`,
    },
  },
});

export const submitButton = style({
  width: '100%',
});

export const buttonIcon = style({
  height: '16px',
  width: '16px',
});
