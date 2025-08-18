import { style } from '@vanilla-extract/css';
import { forTablet, forDesktop } from '@/lib/styles/breakpoints';

// 액션 카드 그리드
export const actionGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  '@media': {
    [forTablet]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [forDesktop]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});
