'use client';

import React from 'react';

export default function PortfolioHero({ totalCount = 24, categoriesCount = 8 }) {
  return (
    <section
      className="relative min-h-[50vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden bg-[var(--bg)]"
      style={{ contain: "layout style paint" }}
    >
      {/* Ambient Background & Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Flower Image Overlay - Fallback to heroFlower.png, with support for portfolioBg.png */}
        <div 
          className="absolute inset-0 opacity-[0.55] mix-blend-screen bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: 'url("/images/portfolioBg.png"), url("/images/heroFlower.png")',
            backgroundBlendMode: 'normal'
          }}
        />

        {/* Ethereal Golden Light Orb */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />

        {/* Subtle grid pattern matching home page style */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="port-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#port-grid)" />
        </svg>

        {/* Text-side specific dark overlay (Left 50% only) - placed on top of image to mask it */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[55%] bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Decorative Corner Brackets (matching Hanzala branding) */}
      <div className="absolute top-32 left-8 md:left-12 z-10 hidden md:block">
        <div className="w-6 h-6 border-t border-l border-white/10" />
      </div>
      <div className="absolute top-32 right-8 md:right-12 z-10 hidden md:block">
        <div className="w-6 h-6 border-t border-r border-white/10" />
      </div>

      {/* Vertical Title Indicator */}
      <div className="absolute left-10 bottom-16 z-10 hidden lg:flex flex-col items-center gap-6">
        <span
          className="text-[8px] tracking-[0.4em] uppercase text-white/30 font-medium"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          Fine Art Showcase
        </span>
        <div className="w-[1px] h-16 bg-white/20"></div>
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-16 lg:px-24 w-full">
        <div className="max-w-[750px]">
          {/* Subtitle & Line Decoration */}
          <div className="relative pl-14 mb-4 flex items-center gap-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-[var(--accent)]/50"></div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] font-semibold">
              Selected Works
            </p>
          </div>

          {/* Page Headline */}
          <h1
            className="font-display uppercase text-white mb-6 leading-none tracking-[0.18em]"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontFamily: "'Antonio', var(--font-display), sans-serif",
              fontWeight: 100
            }}
          >
            PORTFOLIO
          </h1>

          {/* Description */}
          <p className="text-white/60 text-[13px] sm:text-[14px] leading-[2] mb-8 max-w-[480px] font-light tracking-wide">
            A curated visual chronicle of <strong className="font-semibold text-white">landscapes, portraiture, and architectural lines</strong>. 
            Each frame is an exploration of <strong className="font-semibold text-white">form, tone</strong>, and the <strong className="font-semibold text-white">quiet spaces</strong> between moments.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5 font-display text-white/50 tracking-widest text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">01 //</span>
              <span className="uppercase text-white/35 font-light">Total Frames:</span>
              <span className="text-white font-semibold">{totalCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">02 //</span>
              <span className="uppercase text-white/35 font-light">Genres:</span>
              <span className="text-white font-semibold">{categoriesCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">03 //</span>
              <span className="uppercase text-white/35 font-light">Formats:</span>
              <span className="text-white font-semibold">Digital & Medium Format</span>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Gradient Divider at the bottom of the Hero */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a075]/40 to-transparent z-20" />
    </section>
  );
}
