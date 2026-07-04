'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function TimelineSection() {
  const containerRef = useRef(null);

  const milestones = [
    {
      year: "2020",
      title: "First Exposure",
      desc: "Acquired first manual camera. Began documenting local street scenes and studying light.",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop"
    },
    {
      year: "2021",
      title: "Editorial Works",
      desc: "Completed first paid portrait commissions. Established distinct cinematic visual style.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    {
      year: "2022",
      title: "Atmospheric Focus",
      desc: "Focused on architectural composition and high-contrast landscapes across the Punjab region.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200&auto=format&fit=crop"
    },
    {
      year: "2023",
      title: "Academic Milestone",
      desc: "Enrolled in Bachelor of Fine Arts at Islamia University of Bahawalpur to refine design principles.",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop"
    },
    {
      year: "2024",
      title: "Visual Studio Launch",
      desc: "Launched personal portfolio and studio brand. Expanding client sessions and print editions.",
      img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.timeline-card');
    const nodes = containerRef.current.querySelectorAll('.timeline-node');
    const line = containerRef.current.querySelector('.timeline-line-active');

    // Staggered reveal of cards
    cards.forEach((card, index) => {
      const isEven = index % 2 === 0;
      
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          x: isEven ? -40 : 40 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Node scaling reveals
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Draw active timeline line dynamically on scroll
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black border-t border-white/5 overflow-hidden"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24">
        
        {/* Header Block */}
        <div className="flex flex-col items-start text-left mb-16">
          {/* Large 03 with diagonal slash line */}
          <div className="relative mb-5 w-fit select-none">
            <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
              03
            </span>
            <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
          </div>
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            CHRONOLOGY
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] tracking-[0.06em] uppercase text-white font-light">
            THE CHRONOLOGICAL ROUTE
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full py-10 flex flex-col gap-12">
          
          {/* Vertical Central Line (Desktop) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0 transform md:-translate-x-1/2">
            {/* Active Drawing Line */}
            <div className="w-full h-full bg-[var(--accent)]/50 timeline-line-active origin-top scale-y-0" />
          </div>

          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full z-10
                  ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Central Dot Node */}
                <div className="absolute left-[19px] md:left-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-[3px] border-black shadow-[0_0_10px_rgba(200,169,126,0.5)] z-20 transform -translate-x-1/2 timeline-node" />

                {/* Left/Right Side Content Wrapper */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 
                  ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                >
                  <div className="inline-flex flex-col gap-3 timeline-card opacity-0">
                    
                    {/* Visual Stamp Card */}
                    <div className={`flex items-center gap-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      {/* Image Thumbnail */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/15 bg-zinc-900 shrink-0">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover grayscale"
                          sizes="48px"
                        />
                      </div>
                      
                      {/* Year Indicator */}
                      <span className="font-display text-[26px] md:text-[32px] text-[var(--accent)] font-light leading-none">
                        {item.year}
                      </span>
                    </div>

                    {/* Editorial Description Text */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-condensed text-[12px] sm:text-[13px] tracking-[0.2em] uppercase text-white/90">
                        {item.title}
                      </h3>
                      <p className={`text-[12px] leading-[1.8] text-white/40 font-light tracking-wide max-w-[340px]
                        ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}
                      >
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Empty offset block for Desktop symmetry */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
