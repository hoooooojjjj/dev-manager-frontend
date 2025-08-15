import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
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
