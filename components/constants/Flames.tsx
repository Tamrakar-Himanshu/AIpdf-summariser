import React from "react";

const GiyuFlame = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    className="w-10 h-10 drop-shadow-lg"
  > 
    <defs>
      <linearGradient id="giyuFlameGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#004e64" />  {/* Teal */}
        <stop offset="40%" stopColor="#073ca6" /> {/* Indigo */}
        <stop offset="100%" stopColor="#055d67" />{/* Crimson */}
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer flame */}
    <path
      d="M32 2C18 18 10 30 20 44c4 6 10 10 12 10s8-4 12-10c10-14 2-26-12-42z"
      fill="url(#giyuFlameGradient)"
      filter="url(#glow)"
    />

    {/* Inner swirl flame to resemble water motion */}
    <path
      d="M32 10c-6 8-10 14-6 22 1 2 3 4 6 6s5-2 6-6c2-8-2-14-6-22z"
      fill="#fff2e1"
    />
  </svg>
);

export default GiyuFlame;
