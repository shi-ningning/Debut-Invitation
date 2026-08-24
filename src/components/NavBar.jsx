import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Sparkles, Clock, MapPin, Heart } from 'lucide-react';
import { config } from '../data/content';
import './NavBar.css';

const NAV_ITEMS = [
  { to: '/home',       label: 'Home',       Icon: Home },
  { to: '/dress-code', label: 'Dress Code', Icon: Sparkles },
  { to: '/countdown',  label: 'Countdown',  Icon: Clock },
  { to: '/venue',      label: 'Venue',      Icon: MapPin },
  { to: '/traditions', label: 'Traditions', Icon: Heart },
];

export default function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Header shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Do not render NavBar on Landing splash screen ('/')
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      {/* ── Top header bar ─────────────────────────────────────── */}
      <header
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        role="banner"
      >
        {/* Monogram logo — links to /home */}
        <NavLink
          to="/home"
          className="navbar__logo"
          aria-label={`${config.firstName} ${config.lastName} — Home`}
        >
          <span className="monogram-badge navbar__monogram">{config.monogram}</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Site navigation">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/home'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger for mobile */}
        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Mobile slide-down menu ──────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/home'}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="navbar__mobile-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
