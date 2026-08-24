import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { config } from '../data/content';
import Wings from '../components/Wings';
import './LandingPage.css';

const SESSION_KEY = 'aubriemae_entered';

export default function LandingPage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  // If the user has already entered this session, skip straight to /home
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      navigate('/home', { replace: true });
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);

  function enter() {
    if (exiting) return;
    // Mark session as entered so back-navigation bypasses the cover
    sessionStorage.setItem(SESSION_KEY, '1');
    // Trigger exit animation, then navigate
    setExiting(true);
    timerRef.current = setTimeout(() => navigate('/home'), 600); // matches CSS transition duration
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enter();
    }
  }

  return (
    <div
      className={`landing stripe-bg${exiting ? ' landing--exiting' : ''}`}
      aria-label="Aubrie Mae Torres 18th Birthday Celebration — Tap to open invitation"
    >
      {/* Floating sparkles */}
      <div className="landing__sparkles" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Top — first name */}
      <div className="landing__name-top">
        <p className="landing__name-script landing__first-name">
          {config.firstName}
        </p>
        <div className="lace-divider landing__lace" />
      </div>

      {/* Center — wings + envelope card: single tap target */}
      <div
        className="landing__center"
        onClick={enter}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Tap to open the invitation and enter the site"
        title="Open invitation"
      >
        {/* Wings (decorative, no pointer events) */}
        <div className="landing__wings-wrap" aria-hidden="true">
          <Wings className="landing__wings" width={320} />
        </div>

        {/* Envelope card */}
        <div className={`landing__envelope${exiting ? ' landing__envelope--open' : ''}`}>
          <div className="envelope__body">
            <div className="envelope__flap" />
            <div className="envelope__card">
              <span className="envelope__card-label">18th Birthday Celebration</span>
              <div className="envelope__card-divider" />
              <span className="envelope__tagline">{config.tagline}</span>
              <div className="envelope__date-peek">{config.displayDate}</div>
            </div>
          </div>
          <span className="envelope__hint" aria-live="polite">
            {exiting ? '✦' : (
              <>
                tap to open <ChevronDown size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginLeft: '2px' }} />
              </>
            )}
          </span>
        </div>
      </div>

      {/* Bottom — last name */}
      <div className="landing__name-bottom">
        <div className="lace-divider landing__lace" />
        <p className="landing__name-script landing__last-name">
          {config.lastName}
        </p>
      </div>
    </div>
  );
}
