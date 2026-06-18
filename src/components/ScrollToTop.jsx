import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Disable browser's native scroll restoration on mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // useLayoutEffect fires synchronously BEFORE the browser paints,
  // ensuring the scroll reset happens before the user sees anything.
  useLayoutEffect(() => {
    // 1. Kill all GSAP ScrollTrigger instances from the previous page.
    //    This removes pinned spacers and body padding that hold the
    //    scroll position artificially high.
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();

    // 2. Force an instant scroll to top (bypass CSS scroll-behavior: smooth)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 3. Also reset documentElement and body scroll directly
    //    as a fallback for all browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
