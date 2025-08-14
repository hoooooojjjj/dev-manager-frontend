import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const bodyStyle = style({
  minHeight: '100vh',
  backgroundColor: vars.colors.background,
  fontFamily: vars.fontFamily.sans,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

export const rootContainer = style({
  position: 'relative',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
});

export const mainContent = style({
  flex: 1,
});