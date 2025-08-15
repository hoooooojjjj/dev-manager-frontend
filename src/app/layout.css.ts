import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

export const bodyStyle = style({
  backgroundColor: vars.colors.background,
  fontFamily: vars.fontFamily.sans,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  margin: 0,
  padding: 0,
});

export const rootContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const mainContent = style({
  flex: 1,
});
