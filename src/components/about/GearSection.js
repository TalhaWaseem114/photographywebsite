'use client';

import React from 'react';

export default function GearSection() {
  const categories = [
    {
      num: "01",
      title: "CAMERA SYSTEMS",
      items: [
        { name: "Sony A7R V", desc: "61MP Full-Frame High Resolution" },
        { name: "Fujifilm GFX 50S II", desc: "Medium Format Tonal Range" },
        { name: "Canon EOS R5", desc: "Fast Action & Video Capture" },
        { name: "Leica Q2", desc: "Minimal Street Documentary" }
      ],
      progress: 94
    },
    {
      num: "02",
      title: "OPTICS & GLASS",
      items: [
        { name: "50mm f/1.2 prime", desc: "Pure Portrait Subject Separation" },
        { name: "35mm f/1.4 prime", desc: "Cinematic Environmental Street" },
        { name: "24-70mm f/2.8 zoom", desc: "Studio & Commercial Precision" },
        { name: "90mm f/2.8 macro", desc: "Micro-Texture Detail Capture" }
      ],
      progress: 96
    },
    {
      num: "03",
      title: "CREATIVE PROCESS",
      items: [
        { name: "Scout & Light Plot", desc: "Pre-planning sun positions & angles" },
        { name: "Shoot & Frame", desc: "Directing mood, form, and composition" },
        { name: "RAW Tonal Grade", desc: "Crafting customized color profiles" },
        { name: "Print Chemistry", desc: "Managing physical archival output" }
      ],
      progress: 90
    }
  ];

  return (
    <section 
      id="gear-section" 
      className="relative min-h-[500px] w-full bg-black border-t border-white/10"
      style={{ contain: "layout style paint" }}
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-start px-8 py-20 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 gap-12 lg:gap-16">
        
        {/* Large 02 with diagonal slash line */}
        <div className="relative w-fit flex-shrink-0 select-none pt-2">
          <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
            02
          </span>
          <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* 3-Column Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 w-full md:divide-x md:divide-white/10">
          {categories.map((col, index) => (
            <div
              key={index}
              className="flex flex-col h-full first:pl-0 md:pl-8 lg:pl-10 transition-all duration-300 group"
            >
              {/* Column Header */}
              <div className="mb-8 flex flex-col gap-1.5 select-none">
                <span className="text-[10px] font-condensed font-medium tracking-[0.2em] text-[var(--accent)]">
                  {col.num} // GENRE TOOLS
                </span>
                <h4 className="text-[13px] font-display font-light tracking-[0.18em] uppercase text-white/95 group-hover:text-white transition-colors">
                  {col.title}
                </h4>
              </div>

              {/* Items List */}
              <ul className="space-y-5 mb-10 flex-1">
                {col.items.map((item, i) => (
                  <li key={i} className="flex flex-col gap-1 text-left">
                    <span className="text-[12px] font-semibold text-white/80 tracking-wide hover:text-white transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 bg-[var(--accent)] rounded-full"></span>
                      {item.name}
                    </span>
                    <span className="text-[10.5px] font-light text-white/35 leading-tight tracking-wide pl-3">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

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
