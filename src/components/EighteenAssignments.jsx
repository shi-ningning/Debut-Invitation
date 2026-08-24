import React, { useState, useRef } from 'react';
import { Banknote, Music, Gift, Flame } from 'lucide-react';
import { config } from '../data/content';
import Wings from './Wings';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './EighteenAssignments.css';

const SEGMENT_ICONS = {
  '18 Blue Bills': Banknote,
  '18 Dance': Music,
  '18 Gifts': Gift,
  '18 Candles': Flame,
};

export default function EighteenAssignments() {
  const ref = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const segments = config.eighteenSegments;

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % segments.length);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + segments.length) % segments.length);
  }

  function goTo(idx) {
    setActiveIndex(idx);
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  }

  // Touch swipe gestures
  function handleTouchStart(e) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      // Swiped left -> next
      goNext();
    } else if (diff < -40) {
      // Swiped right -> prev
      goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  return (
    <section
      className="eighteen stripe-bg"
      id="eighteen-assignments"
      aria-label="18 Traditions"
      ref={ref}
    >
      <div className="container eighteen__container">

        {/* Section header (UNCHANGED) */}
        <div className="eighteen__header reveal">
          <div className="eighteen__wings-wrap" aria-hidden="true">
            <Wings width={200} />
          </div>
          <span className="monogram-badge eighteen__monogram">{config.monogram}</span>
          <p className="section-label">The Celebration Circle</p>
          <h2 className="section-title eighteen__title">The 18 Traditions</h2>
          <div className="lace-divider" />
          <p className="section-body eighteen__subtitle">
            Every name is a chapter. Every role, a memory written in love.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="eighteen__carousel-wrap reveal"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="18 Traditions Carousel. Use left and right arrows, swipe, or left/right arrow keys to navigate."
        >
          {/* Left Arrow Button */}
          <button
            className="carousel-btn carousel-btn--prev"
            onClick={goPrev}
            aria-label="Previous category"
            title="Previous category"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Active Category Card Container */}
          <div className="carousel-stage">
            {segments.map((segment, idx) => {
              const isCurrent = idx === activeIndex;
              const IconComponent = SEGMENT_ICONS[segment.title] || Gift;
              return (
                <div
                  key={segment.title}
                  className={`segment-card carousel-card ${isCurrent ? 'carousel-card--active' : ''}`}
                  aria-hidden={!isCurrent}
                >
                  {/* Card top accent */}
                  <div className="segment-card__top">
                    <span className="segment-card__icon" aria-hidden="true">
                      <IconComponent size={24} strokeWidth={1.75} color="var(--color-brown)" />
                    </span>
                    <h3 className="segment-card__title">{segment.title}</h3>
                    <div className="segment-card__divider" />
                  </div>

                  {/* Names list — internally scrollable for long lists */}
                  <ol className="segment-card__list" aria-label={`${segment.title} participants`}>
                    {segment.names.map((name, nameIdx) => (
                      <li key={nameIdx} className="segment-card__item">
                        <span className="segment-card__num" aria-hidden="true">{nameIdx + 1}.</span>
                        <span className="segment-card__name">{name}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            className="carousel-btn carousel-btn--next"
            onClick={goNext}
            aria-label="Next category"
            title="Next category"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Indicators (Dots & Counter) */}
        <div className="eighteen__indicators reveal" role="tablist" aria-label="Traditions categories nav">
          <div className="indicator-dots">
            {segments.map((segment, idx) => (
              <button
                key={segment.title}
                className={`indicator-dot ${idx === activeIndex ? 'indicator-dot--active' : ''}`}
                onClick={() => goTo(idx)}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Jump to ${segment.title}`}
                title={segment.title}
              />
            ))}
          </div>
          <span className="indicator-counter">
            {activeIndex + 1} / {segments.length}
          </span>
        </div>

      </div>
    </section>
  );
}


