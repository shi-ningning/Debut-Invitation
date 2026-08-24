import React from 'react';
import { ChevronDown } from 'lucide-react';
import { config } from '../data/content';
import Wings from './Wings';
import './Hero.css';

/**
 * Hero — accepts optional onEnvelopeTap prop so the parent page
 * can control what happens when the envelope cluster is tapped
 * (scroll to SaveTheDate, or navigate, etc.).
 */
export default function Hero({ onEnvelopeTap }) {
  function handleTap() {
    if (onEnvelopeTap) {
      onEnvelopeTap();
    } else {
      // Fallback: scroll to save-the-date if rendered standalone
      const el = document.getElementById('save-the-date');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section className="hero stripe-bg" id="hero" aria-label="Birthday invitation hero">

      {/* Top floating petals / sparkles */}
      <div className="hero__sparkles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Celebrant first name */}
      <div className="hero__name-top">
        <p className="hero__name-script hero__first-name">{config.firstName}</p>
        <div className="lace-divider" />
      </div>

      {/* Center: wings + envelope card — entire cluster is one tap target */}
      <div
        className="hero__center"
        onClick={handleTap}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleTap()}
        role="button"
        tabIndex={0}
        aria-label="Open invitation — scroll to details"
        title="Open invitation"
      >
        {/* Wings: pointer-events:none so they never intercept taps */}
        <div className="hero__wings-wrap" aria-hidden="true" style={{ pointerEvents: 'none' }}>
          <Wings className="hero__wings" width={320} />
        </div>

        {/* Envelope card — now a plain div, interaction handled by parent */}
        <div className="hero__envelope">
          <div className="envelope__body">
            <div className="envelope__flap" />
            <div className="envelope__card">
              <span className="envelope__card-label">18th Birthday Celebration</span>
              <div className="envelope__card-divider" />
              <span className="envelope__tagline">{config.tagline}</span>
              <div className="envelope__date-peek">{config.displayDate}</div>
            </div>
          </div>
          <span className="envelope__hint">
            tap to open <ChevronDown size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginLeft: '2px' }} />
          </span>
        </div>
      </div>

      {/* Bottom name */}
      <div className="hero__name-bottom">
        <div className="lace-divider" />
        <p className="hero__name-script hero__last-name">{config.lastName}</p>
      </div>

    </section>
  );
}
