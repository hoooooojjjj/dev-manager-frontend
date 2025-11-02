import { style } from '@vanilla-extract/css';

export const userAvatar = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  objectFit: 'cover',
  cursor: 'pointer',
});
