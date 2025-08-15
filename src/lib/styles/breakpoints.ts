export const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
  desktop: 1024,
} as const;

export const MEDIA_QUERIES = {
  mobile: `screen and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `screen and (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `screen and (min-width: ${BREAKPOINTS.desktop}px)`,
} as const;

export const forMobile = `${MEDIA_QUERIES.mobile}`;
export const forTablet = `${MEDIA_QUERIES.tablet}`;
export const forDesktop = `${MEDIA_QUERIES.desktop}`;
