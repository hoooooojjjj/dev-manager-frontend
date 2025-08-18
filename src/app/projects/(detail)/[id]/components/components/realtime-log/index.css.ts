import { style } from '@vanilla-extract/css';

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
