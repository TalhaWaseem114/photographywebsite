'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, MapPin, Camera } from 'lucide-react';

export default function PortfolioCard({ item, onClick, priority = false }) {
  // Select styling based on item aspect ratio
  const getAspectClass = (aspect) => {
    switch (aspect) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'square':
      default:
        return 'aspect-square';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-md border border-white/[0.04] bg-[#0c0c0e] cursor-pointer hover:border-[var(--accent)]/30 transition-all duration-500 ease-out`}
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Decorative Gold Inner Border on Hover */}
      <div className="absolute inset-0 z-20 border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/20 rounded-md transition-all duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className={`relative w-full ${getAspectClass(item.aspectRatio)} overflow-hidden`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={priority}
          className="object-cover grayscale-[20%] brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10" />

        {/* Center Hover Icon (Eye / View) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
          <div className="w-12 h-12 rounded-full bg-black/60 border border-[var(--accent)]/30 backdrop-blur-xs flex items-center justify-center text-[var(--accent)] shadow-lg shadow-black/50">
            <Eye size={18} />
          </div>
        </div>

        {/* Top-Right Category Pill (Hidden by default, slides down on hover) */}
        <div className="absolute top-3 right-3 z-20 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <span className="bg-black/60 border border-white/10 backdrop-blur-xs text-[var(--accent)] text-[8px] font-condensed tracking-[0.2em] uppercase px-2.5 py-1 rounded">
            {item.category}
          </span>
        </div>

        {/* Instagram-style Multi-image Overlay Indicator */}
        {item.slides && item.slides.length > 1 && (
          <div className="absolute top-3 left-3 z-20 bg-black/60 border border-white/10 backdrop-blur-xs p-1.5 rounded flex items-center justify-center text-white/50 group-hover:text-[var(--accent)] transition-all duration-300">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </div>
        )}

        {/* Bottom Details Overlay (Fades up on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-20 translate-y-[15px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col gap-2.5 text-white pointer-events-none">
          {/* Metadata Row (Location & Date) */}
          <div className="flex items-center justify-between text-[8px] font-mono text-white/40 tracking-wider">
            <div className="flex items-center gap-1">
              <MapPin size={8} className="text-[var(--accent)]" />
              <span>{item.location}</span>
            </div>
            <span>{item.date}</span>
          </div>

          {/* Photo Title */}
          <h3 className="font-condensed text-[12px] sm:text-[13px] tracking-[0.2em] uppercase text-white/95 leading-tight">
            {item.title}
          </h3>

          {/* Technical Info Row (Camera & Lens) */}
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 text-[7.5px] font-mono text-white/30 tracking-wider">
            <Camera size={8} className="text-white/20" />
            <span>{item.camera} · {item.lens}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
