'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Camera } from 'lucide-react';
import PortfolioCard from './PortfolioCard';

export default function MasonryGrid({ items, onCardClick }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    // Select all cards inside the grid
    const cards = gridRef.current.querySelectorAll('.masonry-item');
    
    // Clear any existing ScrollTriggers to prevent leaks
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && gridRef.current.contains(trigger.trigger)) {
        trigger.kill();
      }
    });

    // Animate cards on scroll entrance
    gsap.fromTo(
      cards,
      { 
        opacity: 0, 
        y: 40,
        scale: 0.96 
      },
      {
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      // Cleanup ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center bg-black/20 rounded-lg border border-white/5 my-12">
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] mb-5 animate-pulse">
          <Camera size={22} />
        </div>
        <h3 className="font-condensed text-lg tracking-[0.2em] uppercase text-white/80 mb-2">
          No works found
        </h3>
        <p className="text-white/30 font-light text-xs max-w-xs leading-relaxed">
          I am currently working on developing and processing film for this genre. Check back soon.
        </p>
      </div>
    );
  }

  // Partition items into 4 columns for clean control over asymmetry
  const col1 = items.filter((_, idx) => idx % 4 === 0);
  const col2 = items.filter((_, idx) => idx % 4 === 1);
  const col3 = items.filter((_, idx) => idx % 4 === 2);
  const col4 = items.filter((_, idx) => idx % 4 === 3);

  return (
    <div ref={gridRef} className="w-full py-12">
      {/* Grid of columns - allowing specific columns (2nd and 4th) to be pushed down */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-start w-full">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {col1.map((item, index) => (
            <div key={item.id} className="masonry-item opacity-0">
              <PortfolioCard
                item={item}
                onClick={() => onCardClick(item)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Column 2 (Pushed down) */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 mt-5 sm:mt-8 lg:mt-14">
          {col2.map((item, index) => (
            <div key={item.id} className="masonry-item opacity-0">
              <PortfolioCard
                item={item}
                onClick={() => onCardClick(item)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {col3.map((item, index) => (
            <div key={item.id} className="masonry-item opacity-0">
              <PortfolioCard
                item={item}
                onClick={() => onCardClick(item)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Column 4 (Pushed down) */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 mt-5 sm:mt-8 lg:mt-14">
          {col4.map((item, index) => (
            <div key={item.id} className="masonry-item opacity-0">
              <PortfolioCard
                item={item}
                onClick={() => onCardClick(item)}
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
