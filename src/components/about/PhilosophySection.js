'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function PhilosophySection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const quoteEl = containerRef.current.querySelector('.philosophy-quote');
    const borderEls = containerRef.current.querySelectorAll('.philosophy-border');

    gsap.fromTo(
      quoteEl,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteEl,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      borderEls,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: quoteEl,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-28 md:py-36 bg-black overflow-hidden border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      {/* Background Graphic Negative Film Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25] mix-blend-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/aboutTexture.png")' }}
      />

      {/* Subtle ambient lighting orb */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,117,0.035)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[850px] mx-auto px-6 text-center flex flex-col items-center select-none">
        
        {/* Giant Floating Quote Mark */}
        <span 
          className="font-serif text-[140px] md:text-[180px] leading-none text-[var(--accent)]/10 font-extralight tracking-tighter absolute -top-8 select-none pointer-events-none"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          “
        </span>

        {/* Philosophy Pill Indicator */}
        <span className="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 z-10">
          Artistic Philosophy
        </span>

        {/* Styled Framed Quote Block */}
        <div className="w-full relative py-6 flex flex-col items-center gap-6 philosophy-quote">
          {/* Top Divider Line */}
          <div className="w-16 h-[1px] bg-[var(--accent)]/50 philosophy-border origin-center"></div>

          {/* Core Statement Text */}
          <blockquote 
            className="text-[17px] sm:text-[20px] md:text-[23px] text-white/95 leading-[1.8] tracking-[0.06em] font-light max-w-[700px] text-center"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            "Photography for me is not looking, it's feeling. If you can't feel what you're looking at, then you're never going to get others to feel anything when they look at your pictures."
          </blockquote>

          {/* Bottom Divider Line */}
          <div className="w-16 h-[1px] bg-[var(--accent)]/50 philosophy-border origin-center"></div>
        </div>

        {/* Signature Attribution */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="font-script text-[32px] text-[var(--accent)] leading-none">
            Hanzala
          </span>
          <span className="text-[7.5px] font-mono tracking-[0.3em] uppercase text-white/30 mt-1">
            CREATOR MANIFESTO
          </span>
        </div>
      </div>
    </section>
  );
}
