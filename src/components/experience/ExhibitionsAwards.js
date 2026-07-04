'use client';

import React from 'react';
import { EXHIBITIONS, AWARDS } from '@/data/experienceData';

export default function ExhibitionsAwards() {
  return (
    <section 
      id="exhibitions-awards" 
      className="relative bg-black py-20 border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:divide-x md:divide-white/10 text-left">
        
        {/* LEFT COLUMN: Exhibitions */}
        <div className="flex flex-col items-start w-full">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            GALLERY RECORD
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.08em] uppercase text-white font-light mb-12">
            SELECTED EXHIBITIONS
          </h2>

          <div className="flex flex-col gap-10 w-full">
            {EXHIBITIONS.map((ex, idx) => (
              <div key={idx} className="flex flex-col items-start gap-2.5 group">
                <div className="flex items-center gap-3.5 select-none">
                  <span className="font-display text-[16px] text-[var(--accent)] font-light leading-none">
                    {ex.year}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="font-condensed text-[9.5px] text-white/30 tracking-widest uppercase">
                    {ex.type}
                  </span>
                </div>

                <h3 className="font-condensed text-[12.5px] sm:text-[13.5px] tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
                  {ex.title}
                </h3>
                
                <span className="font-mono text-[9px] text-[var(--accent)]/80 tracking-wider">
                  {ex.venue}
                </span>

                <p className="text-[12px] leading-[1.8] text-white/40 font-light tracking-wide max-w-[380px] pt-1">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Awards */}
        <div className="flex flex-col items-start w-full md:pl-8 lg:pl-12">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            HONORS & PRIZES
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.08em] uppercase text-white font-light mb-12">
            ACCOLADES & AWARDS
          </h2>

          <div className="flex flex-col gap-10 w-full">
            {AWARDS.map((aw, idx) => (
              <div key={idx} className="flex flex-col items-start gap-2.5 group">
                <div className="flex items-center gap-3.5 select-none">
                  <span className="font-display text-[16px] text-[var(--accent)] font-light leading-none">
                    {aw.year}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="font-condensed text-[9.5px] text-white/30 tracking-widest uppercase">
                    {aw.status}
                  </span>
                </div>

                <h3 className="font-condensed text-[12.5px] sm:text-[13.5px] tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
                  {aw.title}
                </h3>

                <p className="text-[12px] leading-[1.8] text-white/40 font-light tracking-wide max-w-[380px] pt-1">
                  {aw.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
