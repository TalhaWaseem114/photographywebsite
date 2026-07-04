'use client';

import { useState, useEffect, useCallback } from 'react';

const SECTIONS = [
  { id: 'about-section', num: '01', label: 'About' },
  { id: 'featured-section', num: '02', label: 'Portfolio' },
  { id: 'journal-section', num: '03', label: 'Journal' },
  { id: 'education-section', num: '04', label: 'Education' },
  { id: 'skills-section', num: '05', label: 'Skills' },
  { id: 'testimonials-section', num: '06', label: 'Reviews' },
  { id: 'showreel-section', num: '07', label: 'Showreel' },
  { id: 'contact-section', num: '08', label: 'Contact' },
];

export default function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      /* Hide when at hero */
      const firstSection = document.getElementById(SECTIONS[0].id);
      const show = firstSection
        ? firstSection.getBoundingClientRect().top < window.innerHeight * 0.9
        : window.scrollY > window.innerHeight * 1.5;
      setIsVisible(show);
      if (!show) { setActiveIndex(-1); return; }

      const trigger = window.innerHeight * 0.3;
      let best = -1;
      let bestDist = Infinity;

      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= trigger && rect.bottom > 0) {
          const dist = Math.abs(rect.top - trigger);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
      });

      if (best !== -1) setActiveIndex(best);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div
      className="fixed left-8 inset-y-0 my-auto h-fit z-50 hidden md:flex flex-col items-start gap-0 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0)'
          : 'translateX(-20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Glassmorphic pill behind only the dots */}
      <div className="absolute left-[-10px] top-0 bottom-0 w-[30px] bg-[#0a0a0a]/40 backdrop-blur-md border border-white/[0.02] rounded-full -z-10 shadow-lg"></div>

      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center py-5 pl-0 cursor-pointer border-none bg-transparent outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Fixed-width dot column — keeps everything on the same vertical axis */}
            <span className="relative flex items-center justify-center -translate-y-[2px]" style={{ width: '10px', height: '10px' }}>
              {/* Active ring pulse */}
              {isActive && (
                <span
                  className="absolute w-5 h-5 rounded-full border border-[#c5a075]/30"
                  style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }}
                ></span>
              )}

              {/* The dot — always centered in the 10px box */}
              <span
                className="absolute rounded-full transition-all duration-500"
                style={{
                  width: isActive ? '10px' : '5px',
                  height: isActive ? '10px' : '5px',
                  backgroundColor: isActive
                    ? '#c5a075'
                    : isPast
                      ? 'rgba(197,160,117,0.4)'
                      : 'rgba(255,255,255,0.15)',
                  boxShadow: isActive
                    ? '0 0 12px rgba(197,160,117,0.4)'
                    : 'none',
                }}
              ></span>

              {/* Connector line — anchored to center of 10px box */}
              {i < SECTIONS.length - 1 && (
                <span
                  className="absolute w-[1px] transition-colors duration-500"
                  style={{
                    left: '4.5px',
                    top: '100%',
                    height: '40px',
                    backgroundColor: isPast
                      ? 'rgba(197,160,117,0.3)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                ></span>
              )}
            </span>

            {/* Label text — slides in to the right of the dot */}
            <span
              className="ml-3 font-condensed text-[10px] tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-400 select-none"
              style={{
                color: isActive ? '#c5a075' : 'rgba(255,255,255,0.25)',
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? 'translateX(0)'
                  : 'translateX(-8px)',
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
