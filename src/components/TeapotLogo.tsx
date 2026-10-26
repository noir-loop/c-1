import React from 'react';

export const TeapotLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Brand Logo Container */}
      <div className="relative w-72 sm:w-80 h-36 flex items-center justify-center">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute inset-0 bg-radial from-pink-200/40 via-rose-100/10 to-transparent rounded-full blur-2xl -z-10" />

        <svg
          viewBox="0 0 340 160"
          className="w-full h-full overflow-visible drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS */}
          <defs>
            {/* Filter for crisp white badge rendering */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#f48fb1" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* 1. TILTED PASTEL TEAPOT WITH "FREE" BADGE (TOP RIGHT)          */}
          {/* ============================================================== */}
          <g transform="translate(195, 48) rotate(-22)" filter="url(#softGlow)">
            {/* Teapot Main Body (Smooth rounded silhouette) */}
            <path
              d="M-36,10 C-34,-18 34,-18 36,10 C38,32 20,44 0,44 C-20,44 -38,32 -36,10 Z"
              fill="#F8BAC9"
            />

            {/* Domed Lid */}
            <path
              d="M-18,-15 C-18,-24 18,-24 18,-15 Z"
              fill="#F8BAC9"
            />
            {/* Lid Ball Finial */}
            <circle cx="0" cy="-26" r="4.5" fill="#F8BAC9" />
            <ellipse cx="0" cy="-15" rx="20" ry="2.5" fill="#ffd1dc" />

            {/* Handle on the right */}
            <path
              d="M32,-2 C56,-4 58,34 32,36"
              stroke="#F8BAC9"
              strokeWidth="7.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Graceful S-Curved Spout on the left pointing down to kettle nose at (-50, 10) */}
            <path
              d="M-24,-4 C-36,-3 -46,2 -52,8 L-48,12 C-40,9 -32,18 -26,26 Z"
              fill="#F8BAC9"
            />
            {/* Spout opening / nose ellipse */}
            <ellipse cx="-50" cy="10" rx="3.2" ry="2" fill="#ffd1dc" transform="rotate(45, -50, 10)" />

            {/* Teapot Foot/Base */}
            <path
              d="M-15,43 L15,43 L12,47 L-12,47 Z"
              fill="#F8BAC9"
            />

            {/* Circular Stamp / Seal on Teapot */}
            <g transform="translate(0, 14)">
              {/* Outer scalloped/dashed circle */}
              <circle
                cx="0"
                cy="0"
                r="19"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeDasharray="2.5 1.8"
                fill="none"
              />
              {/* Inner ring */}
              <circle
                cx="0"
                cy="0"
                r="15.5"
                stroke="#FFFFFF"
                strokeWidth="1.1"
                fill="none"
              />

              {/* Upper Arch Text */}
              <text
                x="0"
                y="-7.5"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="4.2"
                fontWeight="700"
                fontFamily="sans-serif"
                letterSpacing="0.8"
              >
                ESTD 1999
              </text>

              {/* White Banner Ribbon */}
              <rect
                x="-16"
                y="-4.5"
                width="32"
                height="9"
                rx="1.5"
                fill="#F8BAC9"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <line x1="-15" y1="-2" x2="-12" y2="-2" stroke="#FFFFFF" strokeWidth="0.9" />
              <line x1="-15" y1="2" x2="-12" y2="2" stroke="#FFFFFF" strokeWidth="0.9" />
              <line x1="12" y1="-2" x2="15" y2="-2" stroke="#FFFFFF" strokeWidth="0.9" />
              <line x1="12" y1="2" x2="15" y2="2" stroke="#FFFFFF" strokeWidth="0.9" />

              {/* "FREE" Text */}
              <text
                x="0"
                y="2.4"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="7"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="1.2"
              >
                FREE
              </text>

              {/* Lower Text */}
              <text
                x="0"
                y="11"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="3.6"
                fontWeight="700"
                fontFamily="sans-serif"
                letterSpacing="0.6"
              >
                TRADITIONAL TEA
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* 2. DUAL FLOWING CHAI STREAM DIRECTLY FROM KETTLE NOSE TO CUP   */}
          {/* ============================================================== */}
          {/* Primary stream starting directly at the kettle nose (152, 76) */}
          <path
            d="M151,76 C149,86 150,98 152,110"
            stroke="#F8BAC9"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Parallel twin stream */}
          <path
            d="M154,76 C152,86 153,98 155,110"
            stroke="#F8BAC9"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Liquid Ripple in the Cup */}
          <ellipse cx="154" cy="110" rx="6" ry="1.8" fill="#ffd1dc" opacity="0.8" />

          {/* Delicate rising steam wisps from freshly poured tea */}
          <path
            d="M149,103 C147,95 151,89 149,83"
            stroke="#ff8da9"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="animate-steam-1"
            opacity="0.6"
          />
          <path
            d="M158,102 C160,94 156,88 159,82"
            stroke="#ff8da9"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="animate-steam-2"
            opacity="0.5"
          />

          {/* ============================================================== */}
          {/* 3. PASTEL TEACUP (CENTER RECEIVING THE POUR)                   */}
          {/* ============================================================== */}
          <g transform="translate(132, 106)">
            {/* Cup Bowl */}
            <path
              d="M0,6 C1,22 10,30 22,30 C34,30 43,22 44,6 C44,4 0,4 0,6 Z"
              fill="#F8BAC9"
            />
            {/* Cup Rim top ellipse */}
            <ellipse cx="22" cy="5" rx="22" ry="2" fill="#ffd1dc" />

            {/* Cup Base */}
            <path
              d="M13,30 L31,30 L29,33.5 L15,33.5 Z"
              fill="#F8BAC9"
            />

            {/* Dainty Handle */}
            <path
              d="M42,10 C49,10 50,21 41,23"
              stroke="#F8BAC9"
              strokeWidth="3.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Ceramic Gloss Highlights (White Curved Glaze Lines) */}
            <path
              d="M8,10 C8,17 12,24 16,26"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
            <path
              d="M14,9 C14,15 17,21 20,23"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M20,8 C20,13 22,17 25,19"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>

          {/* ============================================================== */}
          {/* 4. CLEAN BRUSH LETTERING: "Ch" ... teacup ... "i Cafe:"        */}
          {/* ============================================================== */}
          {/* "Ch" in bold script */}
          <text
            x="64"
            y="136"
            fill="#e24a7b"
            fontSize="54"
            fontWeight="700"
            fontFamily="'Caveat', 'Kaushan Script', cursive"
            letterSpacing="-1"
          >
            Ch
          </text>

          {/* Small Dot next to h */}
          <circle cx="123" cy="126" r="3.2" fill="#e24a7b" />

          {/* "i" to the right of the cup */}
          <text
            x="186"
            y="136"
            fill="#e24a7b"
            fontSize="52"
            fontWeight="700"
            fontFamily="'Caveat', 'Kaushan Script', cursive"
          >
            i
          </text>

          {/* "Cafe:" Script */}
          <text
            x="208"
            y="136"
            fill="#e24a7b"
            fontSize="54"
            fontWeight="700"
            fontFamily="'Caveat', 'Kaushan Script', cursive"
            letterSpacing="0"
          >
            Cafe:
          </text>
        </svg>
      </div>

      {/* Elegant Tagline */}
      <p
        className="font-serif italic text-base md:text-lg font-medium tracking-wide mt-1"
        style={{ color: '#a61e4d' }}
      >
        Brewed with Love & Spices
      </p>
    </div>
  );
};
