import React from 'react';

interface GemIconProps {
  className?: string;
  size?: number;
}

export function GemIcon({ className = "", size = 24 }: GemIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`relative drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:drop-shadow-[3px_3px_0px_#ccff00] transition-all ${className}`}
      style={{ overflow: 'visible' }}
    >
      {/* Outer Glow Defs */}
      <defs>
        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="gemGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#d1a3ff" />
          <stop offset="50%" stopColor="#b084ff" />
          <stop offset="100%" stopColor="#813bcc" />
        </linearGradient>
      </defs>

      {/* Glow Backdrop */}
      <polygon 
        points="50,10 85,35 85,65 50,90 15,65 15,35" 
        fill="#b084ff" 
        opacity="0.3" 
        filter="url(#purpleGlow)" 
      />

      {/* Main Body - Hexagon Brutalist Style */}
      <polygon 
        points="50,10 85,35 85,65 50,90 15,65 15,35" 
        fill="url(#gemGradient)" 
        stroke="#101010" 
        strokeWidth="6" 
        strokeLinejoin="miter" 
      />

      {/* Internal Facets/Lines */}
      <polyline points="15,35 50,45 85,35" fill="none" stroke="#101010" strokeWidth="4" />
      <line x1="50" y1="45" x2="50" y2="90" stroke="#101010" strokeWidth="4" />
      <line x1="15" y1="65" x2="50" y2="45" stroke="#101010" strokeWidth="4" />
      <line x1="85" y1="65" x2="50" y2="45" stroke="#101010" strokeWidth="4" />

      {/* Top Highlight Facet */}
      <polygon 
        points="50,10 85,35 50,45 15,35" 
        fill="#ffffff" 
        opacity="0.5" 
      />

      {/* Left Highlight */}
      <polygon 
        points="15,35 50,45 15,65" 
        fill="#ffffff" 
        opacity="0.2" 
      />

      {/* Shine/Sparkle Star */}
      <path 
        d="M 25 15 Q 30 25 40 30 Q 30 35 25 45 Q 20 35 10 30 Q 20 25 25 15" 
        fill="#ffffff" 
      />
    </svg>
  );
}
