'use client';

import React from 'react';
import Image from 'next/image';

export default function GalleryStrip() {
  const images = [
    {
      id: "strip-1",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
      title: "Mountain Peaks",
      loc: "Dolomites, IT"
    },
    {
      id: "strip-2",
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
      title: "Atmospheric Face",
      loc: "Berlin, DE"
    },
    {
      id: "strip-3",
      src: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=600&auto=format&fit=crop",
      title: "Shadow lines",
      loc: "Kyoto, JP"
    },
    {
      id: "strip-4",
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
      title: "Urban Shadows",
      loc: "Chicago, US"
    },
    {
      id: "strip-5",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
      title: "Deep Wilderness",
      loc: "Black Forest, DE"
    }
  ];

  return (
    <section 
      className="relative w-full bg-black py-20 border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      <div className="w-full pl-8 md:pl-28 lg:pl-32 pr-8 lg:pr-16 xl:pr-24">
        {/* Editorial Title Block */}
        <div className="flex items-center gap-4 mb-10 select-none">
          <span className="font-condensed text-[10px] tracking-[0.35em] uppercase text-white/40 font-medium">
            SELECTED FRAMES
          </span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* Horizontal scroll strip container */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 w-full select-none">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative flex-shrink-0 w-[240px] sm:w-[280px] aspect-[3/4] overflow-hidden rounded-md border border-white/5 bg-zinc-950 cursor-pointer"
            >
              {/* Image element */}
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover grayscale contrast-[1.1] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                sizes="(max-width: 640px) 240px, 280px"
              />

              {/* Bottom detail fade-up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col gap-1 text-left">
                <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-white/95 leading-tight">
                  {img.title}
                </span>
                <span className="text-[7.5px] font-mono text-white/40 tracking-widest uppercase">
                  {img.loc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
