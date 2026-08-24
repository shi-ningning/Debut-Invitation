import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to every element
 * inside `containerRef` that has the class `reveal`.
 * When an element enters the viewport, the class `reveal--visible` is added,
 * triggering the CSS fade+slide transition defined in global.css.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref}>
 *     <div className="reveal">…</div>
 *   </div>
 */
export function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
