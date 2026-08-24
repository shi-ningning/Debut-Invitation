/* Wings SVG component — used across all sections */
import React from 'react';

export default function Wings({ width = 240, className = '', style = {} }) {
  return (
    <svg
      className={`wings-motif ${className}`}
      style={{ width, height: 'auto', ...style }}
      viewBox="0 0 300 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left Wing */}
      <g opacity="0.92">
        {/* Main wing shape */}
        <path
          d="M150 80 C130 60, 90 30, 40 20 C20 14, 5 20, 2 38 C-2 58, 20 72, 50 70 C70 68, 90 58, 110 62 C125 65, 138 74, 150 80Z"
          fill="white"
          stroke="#E8A0B4"
          strokeWidth="1"
        />
        {/* Feather details */}
        <path d="M150 80 C140 65, 118 42, 85 28" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C135 68, 108 50, 68 34" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C132 72, 100 60, 55 50" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C130 76, 96 68, 50 62" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        {/* Secondary feathers */}
        <path d="M120 55 C110 42, 90 30, 65 24" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        <path d="M100 62 C88 52, 68 42, 45 38" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        <path d="M80 68 C65 61, 45 54, 25 52" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        {/* Tip feathers */}
        <path d="M50 70 C35 60, 18 50, 5 42" stroke="#E8A0B4" strokeWidth="0.6" fill="none" opacity="0.5"/>
        <path d="M35 65 C22 54, 10 44, 2 40" stroke="#E8A0B4" strokeWidth="0.6" fill="none" opacity="0.5"/>
      </g>

      {/* Right Wing (mirror) */}
      <g opacity="0.92">
        <path
          d="M150 80 C170 60, 210 30, 260 20 C280 14, 295 20, 298 38 C302 58, 280 72, 250 70 C230 68, 210 58, 190 62 C175 65, 162 74, 150 80Z"
          fill="white"
          stroke="#E8A0B4"
          strokeWidth="1"
        />
        <path d="M150 80 C160 65, 182 42, 215 28" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C165 68, 192 50, 232 34" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C168 72, 200 60, 245 50" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M150 80 C170 76, 204 68, 250 62" stroke="#E8A0B4" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M180 55 C190 42, 210 30, 235 24" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        <path d="M200 62 C212 52, 232 42, 255 38" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        <path d="M220 68 C235 61, 255 54, 275 52" stroke="#F9D0DC" strokeWidth="0.7" fill="none" opacity="0.8"/>
        <path d="M250 70 C265 60, 282 50, 295 42" stroke="#E8A0B4" strokeWidth="0.6" fill="none" opacity="0.5"/>
        <path d="M265 65 C278 54, 290 44, 298 40" stroke="#E8A0B4" strokeWidth="0.6" fill="none" opacity="0.5"/>
      </g>

      {/* Center star/glow */}
      <circle cx="150" cy="80" r="5" fill="#F9D0DC" opacity="0.7"/>
      <circle cx="150" cy="80" r="2.5" fill="white"/>
    </svg>
  );
}
