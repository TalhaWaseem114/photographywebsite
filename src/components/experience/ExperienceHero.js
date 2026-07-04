'use client';

import React from 'react';

export default function ExperienceHero({ exhibitionsCount = 3, awardsCount = 3, brandsCount = 10 }) {
  return (
    <section 
      className="relative min-h-[50vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden bg-[var(--bg)] border-b border-white/5"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-[0.16] mix-blend-screen bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: 'url("/images/experienceBg.png"), url("/images/aboutTexture.png")',
            backgroundBlendMode: 'normal'
          }}
        />
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
              Professional Ledger
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
            CREDENTIALS
          </h1>

          <p className="text-white/40 text-[13px] sm:text-[14px] leading-[2] mb-8 max-w-[480px] font-light tracking-wide">
            A listing of creative commissions, brand clients, solo exhibitions, and industry awards highlighting Hanzala's career in fine art and commercial imagery.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5 font-display text-white/50 tracking-widest text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">01 //</span>
              <span className="uppercase text-white/35 font-light">Exhibitions:</span>
              <span className="text-white font-semibold">{exhibitionsCount} Solo & Group</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">02 //</span>
              <span className="uppercase text-white/35 font-light">Awards:</span>
              <span className="text-white font-semibold">{awardsCount} Prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">03 //</span>
              <span className="uppercase text-white/35 font-light">Brands:</span>
              <span className="text-white font-semibold">{brandsCount}+ Partnerships</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
