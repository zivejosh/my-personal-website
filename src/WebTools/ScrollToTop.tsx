import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is no hash in the URL, scroll directly to the top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash (e.g., #topics), wait a tiny fraction of a second 
      // to guarantee the page has rendered, then scroll smoothly to that element.
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null; // This component doesn't render any HTML
}