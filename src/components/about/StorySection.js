'use client';

import React from 'react';

export default function StorySection() {
  return (
    <section 
      id="story-section" 
      className="relative min-h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-black border-t border-white/10"
      style={{ contain: "layout style paint" }}
    >
      {/* ─── LEFT SIDE — Photographic Action Shot ─── */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden bg-zinc-950">
        <img
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop"
          alt="Photographer holding medium format camera"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] grayscale contrast-[1.1] brightness-[0.4]"
        />

        {/* Cinematic blend overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black md:hidden z-10"></div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Fine print overlay inside image */}
        <div className="absolute bottom-12 left-10 md:left-16 z-20 font-mono text-[7px] text-white/30 tracking-[0.25em] uppercase select-none">
          [SHOOT_LOC] ON_STREET_ARCHIVE // MONOCHROM
        </div>
      </div>

      {/* ─── RIGHT SIDE — Editorial Content Block ─── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-20 md:pl-12 md:pr-24 lg:pl-20">
        
        {/* Large 01 with diagonal slash line */}
        <div className="relative mb-5 w-fit select-none">
          <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
            01
          </span>
          <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* Section Heading */}
        <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
          Origins & Path
        </span>
        <h2 className="font-display text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.08] tracking-[0.05em] uppercase mb-8 text-white font-light">
          THE BIOGRAPHY OF <br />A SHADOW CHASER
        </h2>

        {/* Body Text Blocks */}
        <div className="text-[13px] leading-[2.1] text-white/50 max-w-[440px] space-y-6 font-light tracking-wide">
          <p>
            My relationship with image-making began as an attempt to slow down a rapidly accelerating world. Raised in Bahawalpur, a region steeped in historic visual textures and architecture, I learned to observe the quiet patterns formed by raw sunlight slicing through historic spaces.
          </p>
          <p>
            Currently pursuing my Bachelor of Fine Arts in Graphic Design at the Islamia University of Bahawalpur, I blend academic compositional structure with intuitive visual emotion. I believe that an image succeeds not when it is technically flawless, but when it holds a viewer still.
          </p>
        </div>
      </div>
    </section>
  );
}
