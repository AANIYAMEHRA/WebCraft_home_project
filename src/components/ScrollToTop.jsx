import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top on every navigation, including clicks on the link of the page you are already on.
// If the link has a hash (for example #apply), the browser handles that scroll instead.
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.key, location.pathname, location.hash]);

  return null;
}