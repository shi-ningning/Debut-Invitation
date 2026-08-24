import React from 'react';
import { config } from '../data/content';
import Wings from './Wings';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './DressCode.css';

/**
 * DressCode — accepts optional onContinue prop.
 * When provided (from DressCodePage), the monogram button navigates to /countdown.
 * Without it, falls back to scrolling to #countdown (for standalone use).
 */
export default function DressCode({ onContinue }) {
  const ref = useScrollReveal();
  const { dresscode } = config;

  function handleContinue() {
    if (onContinue) {
      onContinue();
    } else {
      const el = document.getElementById('countdown');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      className="dresscode stripe-bg"
      id="dress-code"
      aria-label="Dress code"
      ref={ref}
    >
      <div className="container dresscode__container">

        {/* Arch card */}
        <div className="arch-card dresscode__card">

          {/* Wings + monogram at top of arch */}
          <div className="dresscode__arch-top reveal" aria-hidden="true">
            <Wings width={220} className="dresscode__wings" />
            <span className="monogram-badge dresscode__monogram">{config.monogram}</span>
          </div>

          {/* Heading */}
          <div className="dresscode__header reveal">
            <p className="section-label">Attire &amp; Style</p>
            <h2 className="section-title dresscode__title">{dresscode.heading}</h2>
            <div className="lace-divider" />
            <p className="section-body dresscode__desc">{dresscode.description}</p>
          </div>

          {/* Color swatches */}
          <div className="dresscode__swatches reveal" aria-label="Color palette">
            {dresscode.swatches.map((swatch) => (
              <div key={swatch.hex} className="swatch__item">
                <div
                  className="swatch__circle"
                  style={{ backgroundColor: swatch.hex }}
                  aria-label={`${swatch.label} colour swatch`}
                  role="img"
                />
                <span className="swatch__label">{swatch.label}</span>
              </div>
            ))}
          </div>

          {/* Moodboard grid */}
          <div className="dresscode__moodboard reveal" aria-label="Style inspiration moodboard">
            {dresscode.moodboardImages.map((src, i) => (
              <div key={i} className="moodboard__cell">
                <img
                  src={src}
                  alt={`Coquette debut style inspiration — image ${i + 1} of ${dresscode.moodboardImages.length}`}
                  className="moodboard__img"
                  loading="lazy"
                  width="300"
                  height="400"
                />
              </div>
            ))}
          </div>

          {/* Continue CTA */}
          <div className="dresscode__cta reveal">
            <button
              className="scroll-btn dresscode__scroll-btn"
              onClick={handleContinue}
              aria-label="Continue to Countdown page"
            >
              <span className="monogram-badge dresscode__btn-monogram">{config.monogram}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
