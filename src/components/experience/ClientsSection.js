'use client';

import React from 'react';
import { CLIENTS } from '@/data/experienceData';

export default function ClientsSection() {
  // Duplicate list to ensure seamless infinite looping
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section 
      className="relative bg-black py-16 border-t border-b border-white/5 overflow-hidden"
      style={{ contain: "layout style paint" }}
    >
      {/* Inline styles for infinite scrolling animation */}
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-wrapper:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>

      <div className="w-full relative">
        {/* Soft edge blur overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scroll Container */}
        <div className="marquee-wrapper flex items-center select-none py-2">
          {marqueeItems.map((client, idx) => (
            <div 
              key={idx}
              className="flex items-center text-center font-display text-[16px] sm:text-[22px] tracking-[0.25em] text-white/20 hover:text-[var(--accent)] font-extralight transition-colors duration-500 uppercase px-8 sm:px-12 whitespace-nowrap"
            >
              <span>{client}</span>
              <span className="text-[var(--accent)]/30 font-extralight ml-16 select-none">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
