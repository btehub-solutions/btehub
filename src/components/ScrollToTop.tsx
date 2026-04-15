import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that the window is scrolled to the top
 * whenever the route (pathname) changes. This is essential for a smooth
 * user experience in single-page applications using react-router-dom.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant scroll to prevent visual "jumping" during route transition
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
