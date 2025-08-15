import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';
import { forDesktop, forMobile } from '@/lib/styles/breakpoints';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '32px 16px',
  paddingTop: '120px',
  '@media': {
    [forMobile]: {
      padding: '16px 12px',
      paddingTop: '80px',
    },
  },
});

export const heroSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '32px',
  textAlign: 'center',
});

export const heroContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const heroTitle = style({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  letterSpacing: '-0.025em',
  margin: 0,

  '@media': {
    [forMobile]: {
      fontSize: '2.25rem',
    },
  },
});

export const heroDescription = style({
  maxWidth: '768px',
  fontSize: '1.25rem',
  color: vars.colors.mutedForeground,
  lineHeight: 1.6,
  wordBreak: 'keep-all',
  margin: 0,

  '@media': {
    [forMobile]: {
      fontSize: '0.875rem',
    },
  },
});

export const ctaButtonGroup = style({
  display: 'flex',
  gap: '16px',

  '@media': {
    [forMobile]: {
      flexDirection: 'column',
      width: '100%',
      maxWidth: '280px',
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  width: '100%',
  maxWidth: '1536px',
  gridTemplateColumns: '1fr',
  gap: '24px',

  '@media': {
    [forMobile]: {
      gridTemplateColumns: 'repeat(1, 2fr)',
      maxWidth: '280px',
    },
    [forDesktop]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});

export const featureIcon = style({
  marginBottom: '8px',
  height: '32px',
  width: '32px',
  color: vars.colors.primary,
  '@media': {
    [forMobile]: {
      height: '20px',
      width: '20px',
    },
  },
});

export const featureCard = style({
  '@media': {
    [forMobile]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '12px',
      margin: '0 auto',
    },
  },
});

export const featureCardHeader = style({
  '@media': {
    [forMobile]: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0px',
      fontSize: '0.8rem',
    },
  },
});
export const featureCardTitle = style({
  '@media': {
    [forMobile]: {
      display: 'none',
    },
  },
});
export const featureCardContent = style({
  '@media': {
    [forMobile]: {
      padding: '0px',
      textAlign: 'left',
    },
  },
});
