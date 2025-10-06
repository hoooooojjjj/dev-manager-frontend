import { useEffect, useState } from 'react';

export const BREAKPOINT = {
  mobile: 360,
  tablet: 768,
  desktop: 1024,
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= BREAKPOINT.tablet);
  }, []);

  return isMobile;
};

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setIsTablet(window.innerWidth < BREAKPOINT.desktop && window.innerWidth > BREAKPOINT.tablet);
  }, []);

  return isTablet;
};

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= BREAKPOINT.desktop);
  }, []);

  return isDesktop;
};
