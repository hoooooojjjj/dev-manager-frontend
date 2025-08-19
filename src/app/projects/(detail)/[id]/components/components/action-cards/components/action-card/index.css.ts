import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const actionCard = style({
  transition: 'box-shadow 150ms',

  ':hover': {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
});

export const actionCardHeader = style({
  paddingBottom: 16,
});

export const actionCardTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.125rem', // text-lg
  lineHeight: '1.75rem',
});

export const actionCardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const actionCardDescription = style({
  margin: 0,
  textAlign: 'center',
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

export const actionButton = style({
  padding: '0px !important',
  width: '100%',
});

export const buttonIcon = style({
  marginRight: '0.5rem',
  height: '1rem',
  width: '1rem',
});

// 아이콘 색상 스타일
export const iconPurple = style({
  color: '#9333ea', // text-purple-600
});

export const iconBlue = style({
  color: '#2563eb', // text-blue-600
});

export const iconGreen = style({
  color: '#16a34a', // text-green-600
});
