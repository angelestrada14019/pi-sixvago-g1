import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const oldPage = useRef(pathname);

  useLayoutEffect(() => {
    if (pathname !== oldPage.current) {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        // for older browser
        window.scrollTo(0, 0);
      }
      oldPage.current = pathname;
    }
  }, [pathname]);
}
