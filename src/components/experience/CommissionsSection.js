'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FEATURED_COMMISSIONS } from '@/data/experienceData';

export default function CommissionsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll('.commission-row');
    
    sections.forEach((sec, idx) => {
      const img = sec.querySelector('.commission-img-box');
      const info = sec.querySelector('.commission-info-box');
      const isEven = idx % 2 === 0;

      // Animate Image
      gsap.fromTo(
        img,
        { opacity: 0, x: isEven ? -50 : 50, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate Info Block
      gsap.fromTo(
        info,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-16 md:py-24"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 flex flex-col gap-24 sm:gap-32 w-full">
        
        {FEATURED_COMMISSIONS.map((comm, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={comm.id}
              className={`commission-row grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full
                ${isEven ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* Image Frame (col-span-6) */}
              <div 
                className={`commission-img-box lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded bg-zinc-950 border border-white/5 opacity-0
                  ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.55)' }}
              >
                {/* Gold inner cover glow */}
                <div className="absolute inset-0 z-20 border border-[var(--accent)]/5 rounded pointer-events-none" />

                <Image
                  src={comm.image}
                  alt={comm.title}
                  fill
                  className="object-cover grayscale-[30%] brightness-[0.8] hover:scale-[1.01] hover:grayscale-0 hover:brightness-95 transition-all duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text Editorial Box (col-span-6) */}
              <div 
                className={`commission-info-box lg:col-span-6 flex flex-col items-start text-left opacity-0
                  ${isEven ? 'lg:order-2 lg:pl-10' : 'lg:order-1 lg:pr-10'}`}
              >
                {/* Pre-Label */}
                <div className="flex items-center gap-3.5 mb-5 text-[8.5px] font-mono text-white/40 tracking-[0.25em] uppercase">
                  <span>{comm.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{comm.client}</span>
                </div>

                {/* Main Title */}
                <h2 className="font-display text-[24px] sm:text-[32px] tracking-[0.08em] uppercase text-white leading-tight mb-5">
                  {comm.title}
                </h2>

                <h3 className="font-condensed text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-6 font-semibold">
                  {comm.role}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-[2.1] text-white/45 font-light tracking-wide mb-8 max-w-[460px]">
                  {comm.desc}
                </p>

                {/* Case Study Metrics Grid */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full text-left font-mono">
                  {comm.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col gap-1 select-none">
                      <span className="text-[7.5px] text-white/30 uppercase tracking-widest">{m.label}</span>
                      <span className="text-[10px] text-white/80 leading-tight tracking-tight uppercase">{m.value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
