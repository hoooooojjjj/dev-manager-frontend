import { style } from '@vanilla-extract/css';

export const label = style({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1,
  selectors: {
    '&:has(~ :disabled)': {
      cursor: 'not-allowed',
      opacity: 0.7,
    },
  },
});