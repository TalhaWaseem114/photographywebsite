'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function AvailabilitySection() {
  const services = [
    "Portrait & Fine Art Sessions",
    "Commercial Brand campaigns",
    "Creative Direction & Layout",
    "Archival Print Editions",
    "Cinematic Video Grading"
  ];

  return (
    <section 
      id="availability-section" 
      className="relative min-h-[460px] w-full bg-black border-t border-white/5 py-20"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Services Offered */}
        <div className="flex flex-col items-start text-left">
          {/* Large 04 with diagonal slash line */}
          <div className="relative mb-5 w-fit select-none">
            <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
              04
            </span>
            <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
          </div>

          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            AVAILABLE SERVICES
          </span>
          <h2 className="font-display text-[32px] md:text-[38px] tracking-[0.06em] uppercase text-white font-light mb-8">
            CREATIVE COLLABORATIONS
          </h2>

          <ul className="space-y-4 mb-10 w-full">
            {services.map((svc, i) => (
              <li key={i} className="flex items-center gap-3.5 text-[13px] font-light text-white/50 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 animate-pulse"></span>
                <span>{svc}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 font-condensed text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] border-b border-[var(--accent)]/30 hover:border-[var(--accent)] hover:text-white pb-1.5 transition-all duration-300 select-none"
          >
            Initiate Project
            <ArrowUpRight size={12} className="transform translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Right Side: Location Info Card */}
        <div className="flex justify-start md:justify-end">
          <div 
            className="relative w-full max-w-[440px] bg-[#0c0c0e] border border-white/5 rounded-xl p-8 md:p-12 text-left"
            style={{ boxShadow: '0 20px 45px rgba(0,0,0,0.55)' }}
          >
            {/* Ambient gold inner frame */}
            <div className="absolute inset-0 z-20 border border-[var(--accent)]/5 rounded-xl pointer-events-none" />

            {/* Top console indicators */}
            <div className="flex justify-between items-center mb-10 font-mono text-[7px] text-white/20 tracking-[0.25em] uppercase select-none">
              <span>[STATUS] AVAIL_PK_INT</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-500/80">COMMISSION_ACTIVE</span>
              </div>
            </div>

            {/* Location Data */}
            <div className="flex flex-col gap-1.5 mb-8">
              <span className="font-condensed text-[10px] tracking-[0.2em] text-white/40 uppercase">HQ BASE:</span>
              <h3 className="font-display text-[32px] sm:text-[38px] text-white font-light tracking-[0.1em] uppercase leading-none">
                BAHAWALPUR
              </h3>
              <h4 className="font-condensed text-[13px] text-[var(--accent)] font-medium tracking-[0.25em] uppercase">
                PUNJAB, PAKISTAN
              </h4>
            </div>

            {/* Travel Scope */}
            <p className="text-white/40 text-[12px] leading-[1.8] font-light tracking-wide pt-6 border-t border-white/5">
              Serving creative briefs locally across Pakistan, and internationally upon selective consultation and logistical scheduling.
            </p>

            {/* Corner Bracket Accents */}
            <span className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/10" />
            <span className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/10" />
            <span className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/10" />
            <span className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/10" />
          </div>
        </div>

      </div>
    </section>
  );
}
