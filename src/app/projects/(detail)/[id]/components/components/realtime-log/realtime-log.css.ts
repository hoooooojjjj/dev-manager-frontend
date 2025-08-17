import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const actionCardTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.125rem', // text-lg
  lineHeight: '1.75rem',
});

// 실시간 로그
export const logContainer = style({
  maxHeight: '15rem', // max-h-60
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'auto',
});

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
