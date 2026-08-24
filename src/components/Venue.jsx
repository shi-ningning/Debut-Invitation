import React from 'react';
import { MapPin } from 'lucide-react';
import { config } from '../data/content';
import Wings from './Wings';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Venue.css';

export default function Venue() {
  const ref = useScrollReveal();

  return (
    <section className="venue stripe-bg" id="venue" aria-label="Venue information" ref={ref}>
      <div className="container venue__container">
        <div className="arch-card venue__card">

          {/* Wings + monogram at arch top */}
          <div className="venue__arch-top reveal" aria-hidden="true">
            <Wings width={200} className="venue__wings" />
            <span className="monogram-badge venue__monogram">{config.monogram}</span>
          </div>

          {/* Heading */}
          <div className="venue__header reveal">
            <p className="section-label">Where to Find Us</p>
            <h2 className="section-title">Venue</h2>
            <div className="lace-divider" />
          </div>

          {/* Venue details */}
          <div className="venue__details reveal">
            <p className="venue__name">{config.venueName}</p>
            <address className="venue__address">
              <p>{config.venueAddress}</p>
              <p className="venue__landmark">{config.venueLandmark}</p>
            </address>
            <a
              className="venue__map-link"
              href={config.venueMapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${config.venueName} in Google Maps (opens in new tab)`}
            >
              <MapPin size={16} strokeWidth={2} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px' }} />
              Open in Google Maps
            </a>
          </div>

          {/* Map embed */}
          <div className="venue__map-wrap reveal">
            <iframe
              className="venue__map"
              src={config.venueMapEmbedUrl}
              title={`Map showing location of ${config.venueName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={`Interactive Google Map for ${config.venueName}, ${config.venueAddress}`}
            />
          </div>

          {/* Simple closing message */}
          <div className="venue__closing reveal">
            <p className="venue__closing-msg">We can't wait to celebrate with you</p>
          </div>

        </div>
      </div>
    </section>
  );
}
