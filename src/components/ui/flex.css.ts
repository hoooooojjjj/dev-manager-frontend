import { style, styleVariants } from '@vanilla-extract/css';

export const flexBase = style({
  display: 'flex',
});

export const flexDirection = styleVariants({
  row: { flexDirection: 'row' },
  'row-reverse': { flexDirection: 'row-reverse' },
  col: { flexDirection: 'column' },
  'col-reverse': { flexDirection: 'column-reverse' },
});

export const justifyContent = styleVariants({
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
});

export const alignItems = styleVariants({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
});

export const flexWrap = styleVariants({
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
});

// gap은 동적으로 style을 생성
export const gap = (value: number) =>
  style({
    gap: `${value * 0.25}rem`, // Tailwind gap 단위처럼 4 = 1rem
  });
