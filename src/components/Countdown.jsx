import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { config } from '../data/content';
import Wings from './Wings';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Countdown.css';

// ── Countdown hook ──────────────────────────────────────────
function useCountdown(targetDateISO) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(targetDateISO));

  function calcTimeLeft(target) {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDateISO)), 1000);
    return () => clearInterval(id);
  }, [targetDateISO]);

  return timeLeft;
}

// ── Calendar generator ──────────────────────────────────────
function buildCalendar(year, month) {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  // pad start
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // pad end to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function Countdown() {
  const ref = useScrollReveal();
  const timeLeft = useCountdown(config.eventDate);

  // Parse event date
  const eventDateObj = new Date(config.eventDate);
  const eventYear  = eventDateObj.getFullYear();
  const eventMonth = eventDateObj.getMonth(); // 0-indexed
  const eventDay   = eventDateObj.getDate();

  const cells = buildCalendar(eventYear, eventMonth);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="countdown stripe-bg" id="countdown" aria-label="Countdown timer" ref={ref}>
      <div className="container countdown__container">
        <div className="arch-card countdown__card">

          {/* Wings + monogram */}
          <div className="countdown__arch-top reveal" aria-hidden="true">
            <Wings width={200} className="countdown__wings" />
            <span className="monogram-badge countdown__monogram">{config.monogram}</span>
          </div>

          {/* Heading */}
          <div className="countdown__header reveal">
            <p className="section-label">Counting Down</p>
            <h2 className="section-title countdown__title">The Big Day</h2>
            <div className="lace-divider" />
          </div>

          {/* Live countdown timer */}
          <div className="countdown__timer reveal" role="timer" aria-label="Time remaining until the event">
            {[
              { label: 'Days',    value: timeLeft.days },
              { label: 'Hours',   value: pad(timeLeft.hours) },
              { label: 'Minutes', value: pad(timeLeft.minutes) },
              { label: 'Seconds', value: pad(timeLeft.seconds) },
            ].map(({ label, value }, i) => (
              <React.Fragment key={label}>
                <div className="timer__unit">
                  <span className="timer__value" aria-label={`${value} ${label}`}>{value}</span>
                  <span className="timer__label">{label}</span>
                </div>
                {i < 3 && <span className="timer__colon" aria-hidden="true">:</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Calendar */}
          <div className="countdown__calendar reveal" role="grid" aria-label={`${MONTH_NAMES[eventMonth]} ${eventYear} calendar`}>
            {/* Month title */}
            <div className="calendar__title">
              <span>{MONTH_NAMES[eventMonth]}</span>
              <span>{eventYear}</span>
            </div>

            {/* Day headers */}
            <div className="calendar__grid">
              {DAY_NAMES.map((d) => (
                <div key={d} className="calendar__day-header" aria-label={d}>{d}</div>
              ))}

              {/* Date cells */}
              {cells.map((day, i) => {
                const isEvent = day === eventDay;
                return (
                  <div
                    key={i}
                    className={`calendar__cell${!day ? ' calendar__cell--empty' : ''}${isEvent ? ' calendar__cell--event' : ''}`}
                    role={day ? 'gridcell' : 'presentation'}
                    aria-label={isEvent ? `${MONTH_NAMES[eventMonth]} ${day} — Aubrie Mae's Debut` : (day ? String(day) : '')}
                  >
                    {day && (
                      <>
                        <span className="calendar__day-num">{day}</span>
                        {isEvent && (
                          <span className="calendar__event-icon" aria-hidden="true">
                            <Heart size={12} strokeWidth={2.2} fill="var(--color-brown)" color="var(--color-brown)" />
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="calendar__legend">
              <span className="legend__item legend__item--event">
                <span className="legend__dot legend__dot--event" />
                Debut Night
              </span>
            </div>
          </div>

          {/* Venue location caption */}
          <div className="countdown__venue-caption reveal">
            <p className="countdown__venue-text">
              <MapPin size={15} strokeWidth={2} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} />
              {config.venueName} &middot; {config.venueAddress}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
