'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg)]"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[150px]" />
        
        {/* Parallax style background overlays */}
        <div 
          className="absolute inset-0 opacity-[0.22] mix-blend-screen bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("/images/aboutHeroBg.png"), url("/images/heroFlower.png")',
            backgroundBlendMode: 'normal'
          }}
        />
      </div>

      {/* Decorative Branding Brackets */}
      <div className="absolute top-32 left-8 md:left-12 z-10 hidden md:block">
        <div className="w-8 h-8 border-t border-l border-white/10" />
      </div>
      <div className="absolute top-32 right-8 md:right-12 z-10 hidden md:block">
        <div className="w-8 h-8 border-t border-r border-white/10" />
      </div>

      {/* Vertical Navigation Accent */}
      <div className="absolute right-8 top-0 bottom-0 z-20 flex flex-col justify-center items-center gap-6 hidden md:flex">
        <span
          className="text-[9px] tracking-[0.45em] uppercase text-white/30 font-light"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          Photographer Identity
        </span>
        <div className="w-[1px] h-20 bg-white/20"></div>
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="font-condensed text-[12px] tracking-[0.45em] uppercase text-white/40 mb-4 block">
              VISUAL CREATIVE
            </span>

            <h1
              className="font-display uppercase text-white mb-3 leading-[1.05] tracking-[0.16em]"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.8rem)',
                fontFamily: "'Antonio', var(--font-display), sans-serif",
                fontWeight: 100
              }}
            >
              HANZALA
            </h1>

            {/* Signature Block */}
            <div className="mb-8 pl-1">
              <span className="font-script text-[36px] sm:text-[44px] text-[var(--accent)] leading-none block">
                Hanzala
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 block mt-1 font-mono">
                FOUNDER & VISUAL DIRECTOR
              </span>
            </div>

            <p className="text-white/40 text-[14px] leading-[2.1] mb-12 max-w-[420px] font-light tracking-wide">
              I capture the atmospheric density of stories through minimal composition, chemical tonal ranges, and deliberate light management. A visual archivist recording silent moments.
            </p>

            {/* Micro Details List */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9.5px] text-white/45 uppercase tracking-widest pt-6 border-t border-white/5 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent)]">LOC:</span>
                <span>BAHAWALPUR, PK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent)]">EST:</span>
                <span>2020</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent)]">CAM:</span>
                <span>MEDIUM FORMAT & 35MM</span>
              </div>
            </div>
          </div>

          {/* Right Block: Moody Grayscale Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-md border border-white/10"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            >
              {/* Gold overlay card glow */}
              <div className="absolute inset-0 z-20 border border-[var(--accent)]/10 rounded-md pointer-events-none" />

              <Image
                src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=800&auto=format&fit=crop"
                alt="Hanzala Silhouette Portrait"
                fill
                priority
                className="object-cover object-[40%_center] grayscale contrast-[1.1] brightness-[0.7] hover:scale-[1.02] hover:brightness-85 transition-all duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              
              {/* Elegant dark fade overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10 pointer-events-none" />
              
              {/* Portrait metadata */}
              <div className="absolute bottom-6 left-6 z-20 text-left font-condensed">
                <span className="block text-[8px] tracking-[0.2em] uppercase text-white/40">SELF PORTRAIT</span>
                <span className="block text-[11px] tracking-[0.18em] uppercase text-white/95 mt-1 font-semibold">HANZALA // 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
