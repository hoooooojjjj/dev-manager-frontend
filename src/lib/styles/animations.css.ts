import { keyframes, style } from '@vanilla-extract/css';

// Keyframes
export const accordionDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

export const accordionUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const slideInFromTop = keyframes({
  from: { transform: 'translateY(-100%)' },
  to: { transform: 'translateY(0)' },
});

export const slideInFromBottom = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const slideInFromLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
});

export const slideInFromRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

export const slideOutToTop = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(-100%)' },
});

export const slideOutToBottom = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(100%)' },
});

export const slideOutToLeft = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-100%)' },
});

export const slideOutToRight = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)' },
});

export const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

export const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
});

// Animation styles
export const animations = {
  accordionDown: style({
    animation: `${accordionDown} 0.2s ease-out`,
  }),
  accordionUp: style({
    animation: `${accordionUp} 0.2s ease-out`,
  }),
  slideInFromTop: style({
    animation: `${slideInFromTop} 0.2s ease-out`,
  }),
  slideInFromBottom: style({
    animation: `${slideInFromBottom} 0.2s ease-out`,
  }),
  slideInFromLeft: style({
    animation: `${slideInFromLeft} 0.2s ease-out`,
  }),
  slideInFromRight: style({
    animation: `${slideInFromRight} 0.2s ease-out`,
  }),
  slideOutToTop: style({
    animation: `${slideOutToTop} 0.2s ease-in`,
  }),
  slideOutToBottom: style({
    animation: `${slideOutToBottom} 0.2s ease-in`,
  }),
  slideOutToLeft: style({
    animation: `${slideOutToLeft} 0.2s ease-in`,
  }),
  slideOutToRight: style({
    animation: `${slideOutToRight} 0.2s ease-in`,
  }),
  fadeIn: style({
    animation: `${fadeIn} 0.2s ease-out`,
  }),
  fadeOut: style({
    animation: `${fadeOut} 0.2s ease-in`,
  }),
};