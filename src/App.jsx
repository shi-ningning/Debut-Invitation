import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import NavBar          from './components/NavBar';
import LandingPage     from './pages/LandingPage';
import HomePage        from './pages/HomePage';
import DressCodePage   from './pages/DressCodePage';
import CountdownPage   from './pages/CountdownPage';
import VenuePage       from './pages/VenuePage';
import TraditionsPage  from './pages/TraditionsPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* NavBar is rendered on all routes except '/' (handled internally by NavBar) */}
      <NavBar />

      <Routes>
        <Route path="/"            element={<LandingPage />} />
        <Route path="/home"        element={<HomePage />} />
        <Route path="/dress-code"  element={<DressCodePage />} />
        <Route path="/countdown"   element={<CountdownPage />} />
        <Route path="/venue"       element={<VenuePage />} />
        <Route path="/traditions"  element={<TraditionsPage />} />
        {/* Catch-all: redirect unknown paths back to /home */}
        <Route path="*"            element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

