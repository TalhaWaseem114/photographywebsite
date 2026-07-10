'use client';

import React from 'react';

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "CONSULT & VISION",
      desc: "Every commission begins with alignment. We discuss your creative brief, outline moodboards, plan shot lists, and analyze sun coordinates or location requirements."
    },
    {
      num: "02",
      title: "THE SESSION",
      desc: "Directing the session with deliberate light management, composition, and forms. We focus on securing raw expressions and spatial geometries with low latency."
    },
    {
      num: "03",
      title: "EDIT & ARCHIVE",
      desc: "RAW processing, digital tonal grading, and fine art print production. Finalized frames are archived and delivered inside private high-resolution galleries."
    }
  ];

  return (
    <section 
      id="process-section" 
      className="relative min-h-[460px] w-full bg-black"
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
          {steps.map((col, index) => (
            <div
              key={index}
              className="flex flex-col h-full first:pl-0 md:pl-8 lg:pl-10 transition-all duration-300 group"
            >
              {/* Column Header */}
              <div className="mb-6 flex flex-col gap-1.5 select-none">
                <span className="text-[10px] font-condensed font-medium tracking-[0.2em] text-[var(--accent)]">
                  PHASE {col.num} // EXPERIENCE
                </span>
                <h4 className="text-[13px] font-display font-light tracking-[0.18em] uppercase text-white/95 group-hover:text-white transition-colors">
                  {col.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-[12.5px] leading-[2.1] text-white/40 font-light tracking-wide text-left">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
