import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../data/content';
import './SaveTheDate.css';

export default function SaveTheDate({ onExplore }) {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('std--visible');
          // Once revealed, no need to keep observing
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }   // fires when 8% of the section is in view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleExplore() {
    if (onExplore) {
      onExplore();
    } else {
      navigate('/dress-code');
    }
  }

  return (
    <section
      className="std"
      id="save-the-date"
      ref={sectionRef}
      aria-label="Save the date"
    >
      {/* BLOCK 1: Text Header Block (above photo) */}
      <div className="std__header-block">
        {/* Header text content */}
        <div className="std__content-top">
          <p className="section-label std__sublabel">Save the Date</p>
          <h1 className="std__name">{config.firstName}</h1>
          <div className="std__subtitle-badge">
            <p className="std__subtitle">A Decade &amp; Eight</p>
          </div>
        </div>

        <div
          className="lace-divider std__lace-divider"
          aria-hidden="true"
        />
      </div>

      {/* BLOCK 2: Photo Block (below text, completely unobstructed) */}
      <div className="std__photo-wrap">
        <img
          src="/aubrie-portrait.png"
          alt={`${config.firstName} ${config.lastName}`}
          className="std__photo"
        />

        {/* Decorative overlay for bottom date readability & CTA contrast */}
        <div className="std__overlay" aria-hidden="true" />

        {/* Bottom overlay: date/time bar + CTA button stacked */}
        <div className="std__content-bottom">
          <div className="std__date-block">
            <span className="std__date">{config.displayDate}</span>
            <div className="std__sep" aria-hidden="true" />
            <span className="std__time">{config.displayTime}</span>
          </div>
          <p className="std__day">{config.dayLabel}</p>

          {/* CTA overlay directly on photo */}
          <div className="std__cta-block">
            <p className="std__cta-label">Ready to celebrate?</p>
            <button
              className="std__explore-btn"
              onClick={handleExplore}
              aria-label="Continue to Dress Code page"
            >
              <span>Explore the Invitation</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

