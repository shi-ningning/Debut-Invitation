import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLayout.css';

/**
 * PageLayout — wraps every routed page with:
 *  - Scroll-to-top on navigation
 *  - Fade + slide-up entrance animation (CSS class toggled after mount)
 */
export default function PageLayout({ children }) {
  const { pathname } = useLocation();
  const pageRef = useRef(null);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Trigger entrance animation one tick after mount
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    // Remove class first (handles back-forward navigation)
    el.classList.remove('page--visible');
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('page--visible'));
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div className="page" ref={pageRef} aria-live="polite">
      {children}
    </div>
  );
}
