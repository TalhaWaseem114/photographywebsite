'use client';

import React from 'react';
import { CATEGORIES } from '@/data/portfolioData';

export default function PortfolioFilterBar({ 
  activeCategory, 
  onCategoryChange,
  getItemCountForCategory 
}) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky z-40 w-full bg-black/35 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300 ${scrolled ? 'top-[61px]' : 'top-0'}`}>
      {/* Hide default scrollbars utility inside JSX styled component for no-scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className={`max-w-[1700px] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between gap-6 overflow-x-auto no-scrollbar transition-all duration-300 ${scrolled ? 'py-2 sm:py-2.5' : 'py-4 sm:py-5'}`}>
        {/* Horizontally scrollable filter pills list */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = getItemCountForCategory(category);
            
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`shrink-0 flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-condensed text-[10px] tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer focus:outline-none border
                  ${isActive
                    ? "bg-[var(--accent)] text-[#080808] border-[var(--accent)] font-semibold scale-[1.02]"
                    : "bg-transparent text-white/40 border-white/10 hover:text-white/80 hover:border-white/20 hover:bg-white/5"
                  }`}
              >
                <span>{category}</span>
                <span className={`text-[8.5px] font-mono ${isActive ? "text-[#080808]/75" : "text-white/25"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Status Indicator (Right aligned on desktop) */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[8.5px] text-white/30 tracking-[0.25em] uppercase select-none whitespace-nowrap">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>FILTER_ACTIVE: {activeCategory.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
