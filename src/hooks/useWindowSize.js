import { useState, useEffect } from 'react';

/**
 * useWindowSize — returns { width, height } and re-calculates
 * on both resize and orientation-change events.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width:  typeof window !== 'undefined' ? window.innerWidth  : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return size;
}
