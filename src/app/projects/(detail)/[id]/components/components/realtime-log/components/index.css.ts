import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const logItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  fontSize: '0.875rem',
});

export const logDot = style({
  marginTop: '0.5rem',
  height: '0.5rem',
  width: '0.5rem',
  borderRadius: '50%',
  flexShrink: 0,
});

export const logDotBlue = style([
  logDot,
  {
    backgroundColor: '#3b82f6', // bg-blue-500
  },
]);

export const logDotGreen = style([
  logDot,
  {
    backgroundColor: '#10b981', // bg-green-500
  },
]);

export const logDotYellow = style([
  logDot,
  {
    backgroundColor: '#f59e0b', // bg-yellow-500
  },
]);

export const logDotRed = style([
  logDot,
  {
    backgroundColor: '#ef4444', // bg-red-500
  },
]);

export const logTime = style({
  color: vars.colors.mutedForeground,
});

export const logMessage = style({
  marginLeft: '0.5rem',
});
