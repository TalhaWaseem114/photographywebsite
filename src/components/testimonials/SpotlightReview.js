'use client';

import React from 'react';

export default function SpotlightReview({ review }) {
  if (!review) return null;

  return (
    <div 
      className="relative w-full overflow-hidden rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-8 sm:p-12 md:p-16 flex flex-col items-start hover:border-[var(--accent)]/30 transition-all duration-500 ease-out text-left"
      style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)' }}
    >
      {/* Accent glow inner frame */}
      <div className="absolute inset-0 z-20 border border-[var(--accent)]/5 rounded-xl pointer-events-none transition-all duration-500" />
      
      {/* Giant Quote Watermark */}
      <span 
        className="absolute top-4 right-12 font-serif text-[180px] leading-none text-[var(--accent)]/5 font-extralight select-none pointer-events-none"
        style={{ fontFamily: '"Georgia", serif' }}
      >
        “
      </span>

      {/* Meta stamp */}
      <div className="flex items-center gap-3.5 mb-6 text-[8px] font-mono text-white/30 tracking-[0.25em] uppercase">
        <span>FEATURED SPOTLIGHT</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span>{review.date}</span>
      </div>

      {/* Quote */}
      <blockquote className="text-[17px] sm:text-[21px] md:text-[24px] text-white/90 leading-[1.8] tracking-[0.06em] font-light max-w-3xl mb-8 select-none">
        "{review.quote}"
      </blockquote>

      {/* Author and Role */}
      <div className="flex items-center gap-4 border-t border-white/5 pt-6 w-full mt-2">
        <div className="flex flex-col">
          <span className="font-condensed text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-white font-semibold">
            {review.author}
          </span>
          <span className="font-condensed text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase mt-0.5">
            {review.role}
          </span>
        </div>
        <span className="w-6 h-[1px] bg-white/20 ml-2" />
        <span className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[7.5px] font-mono tracking-widest px-2.5 py-0.5 rounded select-none">
          {review.category.toUpperCase()} WORK
        </span>
      </div>
    </div>
  );
}
