'use client';

import React from 'react';
import { SERVICES } from '@/data/experienceData';

export default function CapabilitiesSection() {
  return (
    <section 
      id="capabilities-section" 
      className="relative min-h-[500px] w-full bg-black border-t border-white/10"
      style={{ contain: "layout style paint" }}
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-start px-8 py-20 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 gap-12 lg:gap-16">
        
        {/* Large 03 with diagonal slash line */}
        <div className="relative w-fit flex-shrink-0 select-none pt-2">
          <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
            03
          </span>
          <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* 3-Column Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 w-full md:divide-x md:divide-white/10">
          {SERVICES.map((col, index) => (
            <div
              key={index}
              className="flex flex-col h-full first:pl-0 md:pl-8 lg:pl-10 transition-all duration-300 group"
            >
              {/* Column Header */}
              <div className="mb-6 flex flex-col gap-1.5 select-none">
                <span className="text-[10px] font-condensed font-medium tracking-[0.2em] text-[var(--accent)]">
                  {col.num} // ADVISORY
                </span>
                <h4 className="text-[13px] font-display font-light tracking-[0.18em] uppercase text-white/95 group-hover:text-white transition-colors">
                  {col.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-[12.5px] leading-[2.1] text-white/40 font-light tracking-wide mb-10 text-left">
                {col.desc}
              </p>

              {/* Progress bar at the bottom */}
              <div className="mt-auto flex items-center gap-4 w-full select-none">
                <div className="flex-1 h-[1px] bg-white/10 relative">
                  <div
                    className="absolute left-0 top-0 h-full bg-[var(--accent)] transition-all duration-700"
                    style={{ width: `${col.progress}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-condensed font-light tracking-wider text-white/40 min-w-[28px] text-right">
                  {col.progress}%
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
