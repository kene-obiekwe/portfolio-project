import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to #section links (also when arriving from another page), otherwise to the top.
// Keyed on location.key so clicking the same link twice still scrolls.
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
