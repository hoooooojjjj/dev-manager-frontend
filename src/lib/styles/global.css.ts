import { globalStyle } from '@vanilla-extract/css';
import { vars, lightTheme } from './theme.css';

// Reset and base styles
globalStyle('*', {
  borderColor: vars.colors.border,
});

globalStyle('body', {
  backgroundColor: vars.colors.background,
  color: vars.colors.foreground,
  fontFamily: vars.fontFamily.sans,
});

// 접근성을 위한 reduced-motion 대응
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
      animationIterationCount: 1,
      transitionDuration: '0.01ms',
    },
  },
});

// 포커스 스타일 개선
globalStyle(':focus-visible', {
  outline: 'none',
  boxShadow: `0 0 0 2px ${vars.colors.ring}, 0 0 0 4px ${vars.colors.background}`,
});

// 다크 테마 클래스 연결
globalStyle(`.${lightTheme}`, {
  colorScheme: 'light',
});
