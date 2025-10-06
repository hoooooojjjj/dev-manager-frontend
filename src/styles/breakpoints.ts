import { BREAKPOINT } from '../hooks/useDeviceWidth';

export const MEDIA_QUERIES = {
  mobile: `screen and (max-width: ${BREAKPOINT.tablet - 1}px)`,
  tablet: `screen and (min-width: ${BREAKPOINT.tablet}px) and (max-width: ${BREAKPOINT.desktop - 1}px)`,
  desktop: `screen and (min-width: ${BREAKPOINT.desktop}px)`,
} as const;

export const forMobile = `${MEDIA_QUERIES.mobile}`;
export const forTablet = `${MEDIA_QUERIES.tablet}`;
export const forDesktop = `${MEDIA_QUERIES.desktop}`;
