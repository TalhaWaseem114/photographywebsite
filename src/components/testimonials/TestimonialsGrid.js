'use client';

import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { CATEGORIES } from '@/data/testimonialsData';

export default function TestimonialsGrid({ 
  reviews, 
  activeTab, 
  onTabChange 
}) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.review-card');
    
    // Clear ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && gridRef.current.contains(trigger.trigger)) {
        trigger.kill();
      }
    });

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [activeTab, reviews]);

  return (
    <div className="w-full py-16">
      {/* ─── Category Filter Pills ─── */}
      <div className="flex justify-center items-center gap-3 mb-16 select-none flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onTabChange(cat)}
            className={`px-5 py-2.5 rounded-full border text-[10px] tracking-[0.2em] font-condensed uppercase transition-all duration-500 cursor-pointer
              ${activeTab === cat 
                ? 'bg-[var(--accent)] text-[#080808] border-[var(--accent)] font-semibold scale-102' 
                : 'bg-transparent text-white/40 border-white/10 hover:text-white/80 hover:border-white/20 hover:bg-white/5'}`}
          >
            {cat === 'All' ? 'All Reviews' : `${cat} Work`}
          </button>
        ))}
      </div>

      {/* ─── Grid Container ─── */}
      <div ref={gridRef} className="w-full">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-black/20 rounded border border-white/5 my-10">
            <h3 className="font-condensed text-md tracking-[0.2em] uppercase text-white/70">No reflections found</h3>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance] w-full text-left">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="review-card break-inside-avoid mb-6 flex flex-col bg-[#0c0c0e] border border-white/5 rounded-xl p-6 sm:p-8 hover:border-[var(--accent)]/30 hover:bg-[#101013] transition-all duration-500 relative group opacity-0"
                style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}
              >
                {/* Gold inner border highlight */}
                <div className="absolute inset-0 z-20 border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/10 rounded-xl pointer-events-none transition-all duration-500" />
                
                {/* Quotation watermark behind card */}
                <span 
                  className="absolute top-4 right-6 font-serif text-[110px] leading-none text-[var(--accent)]/3 font-extralight select-none pointer-events-none group-hover:text-[var(--accent)]/6 transition-colors"
                  style={{ fontFamily: '"Georgia", serif' }}
                >
                  “
                </span>

                {/* Rating star icons */}
                <div className="flex gap-1 mb-5 select-none text-[var(--accent)]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={11} 
                      fill="currentColor" 
                      className="drop-shadow-[0_0_5px_rgba(200,169,126,0.3)]" 
                    />
                  ))}
                </div>

                {/* Reflection quote */}
                <p className="text-[12.5px] leading-[1.9] text-white/50 font-light tracking-wide mb-6 relative z-10">
                  "{rev.quote}"
                </p>

                {/* Author and Date metadata */}
                <div className="mt-auto border-t border-white/5 pt-5 w-full flex flex-col items-start gap-1">
                  <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white font-semibold">
                    {rev.author}
                  </span>
                  
                  <div className="flex justify-between items-center w-full mt-1.5 text-[8px] font-mono text-white/35 tracking-wider uppercase select-none">
                    <span>{rev.role}</span>
                    <span className="text-[var(--accent)]">{rev.date}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
