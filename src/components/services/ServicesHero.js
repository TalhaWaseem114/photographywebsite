'use client';

import React from 'react';

export default function ServicesHero() {
  return (
    <section 
      className="relative min-h-[50vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden bg-[var(--bg)]"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Flower Image Overlay - fallback to heroFlower.png */}
        <div 
          className="absolute inset-0 opacity-[0.55] mix-blend-screen bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: 'url("/images/portfolioBg.png"), url("/images/heroFlower.png")',
            backgroundBlendMode: 'normal'
          }}
        />

        {/* Ethereal Golden Light Orb */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        
        {/* Left-side dark overlay for text legibility */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[65%] bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Brackets */}
      <div className="absolute top-32 left-8 md:left-12 z-10 hidden md:block">
        <div className="w-6 h-6 border-t border-l border-white/10" />
      </div>
      <div className="absolute top-32 right-8 md:right-12 z-10 hidden md:block">
        <div className="w-6 h-6 border-t border-r border-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 w-full text-left">
        <div className="max-w-[750px]">
          {/* Subtitle */}
          <div className="relative pl-14 mb-4 flex items-center gap-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-[var(--accent)]/50"></div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] font-semibold">
              Rates & Offerings
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-display uppercase text-white mb-6 leading-none tracking-[0.18em]"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontFamily: "'Antonio', var(--font-display), sans-serif",
              fontWeight: 100
            }}
          >
            SERVICES
          </h1>

          <p className="text-white/60 text-[13px] sm:text-[14px] leading-[2] mb-8 max-w-[480px] font-light tracking-wide">
            Detailed commission listings, inclusions, production timelines, and an <strong className="font-semibold text-white">interactive pricing calculator</strong> to estimate your <strong className="font-semibold text-white">bespoke project config</strong>.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5 font-display text-white/50 tracking-widest text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">01 //</span>
              <span className="uppercase text-white/35 font-light">Shoot Genres:</span>
              <span className="text-white font-semibold">4 Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">02 //</span>
              <span className="uppercase text-white/35 font-light">Pricing:</span>
              <span className="text-white font-semibold">Bespoke hourly config</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">03 //</span>
              <span className="uppercase text-white/35 font-light">Inclusions:</span>
              <span className="text-white font-semibold">High-Res RAW & Graded JPEGs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Gradient Divider at the bottom of the Hero */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a075]/40 to-transparent z-20" />
    </section>
  );
}
