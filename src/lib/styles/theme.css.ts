import { createGlobalTheme, createTheme } from '@vanilla-extract/css';

// CSS 변수를 위한 기본 dark 테마
export const vars = createGlobalTheme(':root', {
  colors: {
    background: 'hsl(240 10% 3.9%)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(240 10% 3.9%)',
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(240 10% 3.9%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(0 0% 98%)',
    primaryForeground: 'hsl(240 5.9% 10%)',
    secondary: 'hsl(240 3.7% 15.9%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(240 3.7% 15.9%)',
    mutedForeground: 'hsl(240 5% 64.9%)',
    accent: 'hsl(240 3.7% 15.9%)',
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    destructiveForeground: 'hsl(0 0% 98%)',
    border: '#909191',
    input: 'hsl(240 3.7% 15.9%)',
    ring: 'hsl(240 4.9% 83.9%)',
    green600: 'hsl(142 76% 36%)',
    blue600: 'hsl(221 83% 53%)',
    purple600: 'hsl(271 81% 56%)',
    yellow500: 'hsl(45 93% 47%)',
  },
  spacing: {
    radius: '0.5rem',
  },
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, sans-serif',
  },
});

// light theme
export const lightTheme = createTheme(vars, {
  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(240 10% 3.9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(240 10% 3.9%)',
    primary: 'hsl(240 5.9% 10%)',
    primaryForeground: 'hsl(0 0% 98%)',
    secondary: 'hsl(240 4.8% 95.9%)',
    secondaryForeground: 'hsl(240 5.9% 10%)',
    muted: 'hsl(240 4.8% 95.9%)',
    mutedForeground: 'hsl(240 3.8% 46.1%)',
    accent: 'hsl(240 4.8% 95.9%)',
    accentForeground: 'hsl(240 5.9% 10%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    destructiveForeground: 'hsl(0 0% 98%)',
    border: '#525252',
    input: 'hsl(240 5.9% 90%)',
    ring: 'hsl(240 5.9% 10%)',
    green600: 'hsl(142 76% 36%)',
    blue600: 'hsl(221 83% 53%)',
    purple600: 'hsl(271 81% 56%)',
    yellow500: 'hsl(45 93% 47%)',
  },
  spacing: {
    radius: '0.5rem',
  },
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, sans-serif',
  },
});
