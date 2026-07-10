'use client';

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, X, BookOpen, Play, Pause } from 'lucide-react';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

// Premium high-contrast editorial spreads
const journalSpreads = [
  {
    id: 1,
    pageLeft: {
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop",
      caption: "01 // THE SILENT FOREST — NORWAY"
    },
    pageRight: {
      date: "OCTOBER 2025",
      chapter: "CHAPTER I",
      title: "THE RESTLESS LIGHT",
      subtitle: "Chasing atmospheric density across northern coastlines.",
      text: "Every frame captures a fleeting moment of geographic restlessness—a perpetual search for composition amidst environmental chaos. It is a quiet dialogue with descending shadows, waiting for the exact millisecond the landscape strips away its defense and reveals its true structural silhouette.",
      pageNumber: "02"
    }
  },
  {
    id: 2,
    pageLeft: {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      caption: "02 // GEOMETRICS — BRUTALIST ARCHITECTURE"
    },
    pageRight: {
      date: "NOVEMBER 2025",
      chapter: "CHAPTER II",
      title: "MONOLITHIC FORMS",
      subtitle: "The stark poetry of raw concrete and deep shadow casting.",
      text: "Building complex systems out of structural voids. Whether mapping out complex editorial web grids or standing below raw stone elevations waiting for the hard midday sun to slice a perfect 45-degree shadow angle, the workflow remains identical: define the rigid boundaries, honor the geometry, and then break it with texture.",
      pageNumber: "04"
    }
  },
  {
    id: 3,
    pageLeft: {
      image: "https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1200&auto=format&fit=crop",
      caption: "03 // HIGH VOLTAGE — ALPINE RIDGE"
    },
    pageRight: {
      date: "JANUARY 2026",
      chapter: "CHAPTER III",
      title: "PRECISE EXPOSURE",
      subtitle: "Calculating chemical limits and visual risk thresholds.",
      text: "Analyzing unpredictable high-altitude atmospheric variables, recognizing the volatility of natural illumination gradients, and executing the mechanical capture with zero latency. In print making, you must intuitively anticipate the multi-layered depth sequences before the darkroom emulsion even develops.",
      pageNumber: "06"
    }
  },
  {
    id: 4,
    pageLeft: {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      caption: "04 // EPILOGUE — PHYSICAL ARCHIVE"
    },
    pageRight: {
      isEnding: true,
      date: "ARCHIVE COMPLETED",
      chapter: "EPILOGUE",
      title: "END OF ISSUE 01",
      subtitle: "The journey pauses here. Thank you for exploring.",
      text: "Every physical photograph is a static artifact of a transient light sequence. While this issue concludes, the capture of temporary geometry never halts. You can restart the journey below, or close this journal to return to the portfolios.",
      pageNumber: "08"
    }
  }
];

// Reusable Page Component required by react-pageflip
const Page = forwardRef((props, ref) => {
  return (
    <div className={`bg-[#f7f4eb] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] ${props.className || ''}`} ref={ref} data-density="soft">
      {props.children}
      {/* Subtle page fold shading near spine */}
      <div className={`absolute top-0 bottom-0 w-8 pointer-events-none mix-blend-multiply ${props.isLeft ? 'right-0 bg-gradient-to-l from-background/10 to-transparent' : 'left-0 bg-gradient-to-r from-background/10 to-transparent'}`}></div>
    </div>
  );
});
Page.displayName = 'Page';


export default function JournalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);

  // Flatten the spreads into an array of pages
  const pagesData = [];
  journalSpreads.forEach(spread => {
    pagesData.push({ type: 'left', data: spread.pageLeft });
    pagesData.push({ type: 'right', data: spread.pageRight });
  });

  const isAtEnding = currentPage >= pagesData.length - 2;

  useEffect(() => {
    if (!isOpen || !isAutoPlaying || isAtEnding) {
      return;
    }

    const duration = 5000; // 5 seconds duration per page
    const intervalTime = 50; // smooth update step
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying, isAtEnding]);

  useEffect(() => {
    if (progress >= 100) {
      nextSpread();
      setProgress(0);
    }
  }, [progress]);

  const nextSpread = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      const pageFlip = bookRef.current.pageFlip();
      const currentPageIndex = pageFlip.getCurrentPageIndex();
      const pageCount = pageFlip.getPageCount();

      // Flip forward only if not on final spread
      if (currentPageIndex < pageCount - 2) {
        pageFlip.flipNext();
      }
    }
  };

  const prevSpread = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const restartBook = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flip(0);
      setCurrentPage(0);
      setIsAutoPlaying(true);
      setProgress(0);
    }
  };

  // Helper functions for rendering pages
  const renderLeftPage = (pageLeftData) => {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between relative bg-[#f4f0e6] select-none">
        <div className="absolute inset-0 border border-black/[0.02] pointer-events-none"></div>
        <div className="w-full h-full bg-[#ebe7dc] relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-black/[0.04]">
          <img
            src={pageLeftData.image}
            alt={pageLeftData.caption}
            className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.9]"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-white/10 pointer-events-none mix-blend-overlay"></div>
        </div>
        <div className="pt-3 flex justify-between items-center select-none font-mono text-[8px] text-stone-500 tracking-wider">
          <span>{pageLeftData.caption}</span>
          <span className="opacity-60">FILM PLATINUM PRINT</span>
        </div>
      </div>
    );
  };

  const renderRightPage = (pageRightData) => {
    if (pageRightData.isEnding) {
      return (
        <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between items-center text-center bg-[#f7f4eb] relative select-none">
          <div className="w-full border-b border-stone-300/60 pb-4">
            <span className="font-mono text-[9px] text-stone-400 tracking-[0.3em] uppercase">HZ PHOTOGRAPHY</span>
          </div>

          <div className="my-auto py-6 max-w-[340px] flex flex-col items-center">
            <h3 className="text-3xl lg:text-4xl font-serif tracking-[0.1em] text-stone-900 font-light uppercase mb-6 leading-tight">
              THANK YOU
            </h3>
            <div className="w-8 h-[1px] bg-[#c5a075] mb-6"></div>
            <p className="text-stone-600 font-serif text-[13px] leading-[2] tracking-wide font-light">
              {pageRightData.text}
            </p>
          </div>

          <div className="w-full border-t border-stone-300/60 pt-4">
            <span className="font-mono text-[9px] text-stone-400 tracking-widest uppercase">
              HZ PRINT ISSUE N°01 // END
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-[#f7f4eb] relative select-none">
        <div className="flex justify-between items-center select-none border-b border-stone-300/60 pb-3 font-mono text-[9px] text-stone-400 tracking-widest">
          <span>{pageRightData.date}</span>
          <span className="text-[#c5a075] font-semibold">{pageRightData.chapter}</span>
        </div>
        <div className="my-auto py-3">
          <h3 className="text-2xl lg:text-3xl font-serif tracking-wide text-stone-900 font-light uppercase leading-tight mb-2">
            {pageRightData.title}
          </h3>
          <h4 className="text-[12px] font-sans font-normal italic text-stone-500 tracking-wide mb-4 leading-relaxed">
            {pageRightData.subtitle}
          </h4>
          <p className="text-stone-600 font-serif text-[13px] leading-[2] tracking-wide text-justify">
            <span className="float-left text-3xl font-serif font-light text-stone-900 pr-2 pt-1 leading-none select-none">
              {pageRightData.text.charAt(0)}
            </span>
            {pageRightData.text.slice(1)}
          </p>
        </div>
        <div className="border-t border-stone-300/60 pt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium select-none">
            P. {pageRightData.pageNumber}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="journal-section" className="relative py-20 md:py-24 bg-background flex items-center min-h-[600px]">

      {/* ─── Gray Gradient Divider Line ─── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50 z-30"></div>

      {/* ─── Background Image Layer ─── */}
      <img
        src="/images/journalbg.png"
        alt="Journal background"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-100 pointer-events-none select-none"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/60 z-0 pointer-events-none"></div>

      {/* Subtle organic light bleed behind the book array */}
      <div className="absolute right-0 top-12 bottom-12 w-[60%] bg-[radial-gradient(circle_at_60%_50%,rgba(247,244,235,0.025)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 w-full mx-auto px-8 py-2 md:pl-20 lg:pl-24 lg:pr-8 xl:pr-12 flex flex-col items-center justify-center text-center">

        {/* ─── Heading/Intro Info (Stacked & Centered) ─── */}
        <div className="flex flex-col items-center w-full max-w-[800px] mb-12 transition-all duration-700">
          <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-muted mb-3 block select-none">
            LATEST ENTRIES
          </span>

          <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[1.05] tracking-[0.04em] uppercase text-foreground font-light mb-5">
            OPEN MY JOURNEY
          </h2>

          <p className="text-muted text-[13px] font-light leading-[2] tracking-wide mb-8 max-w-[500px]">
            An unfiltered archival log tracking the analog processes, physical journeys, and design logic captured behind the film lenses.
          </p>

          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#c5a075]/40 hover:border-[#c5a075] bg-[#c5a075]/5 hover:bg-[#c5a075]/15 rounded-sm font-condensed text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a075] hover:text-white transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.4)] group cursor-pointer"
            >
              <BookOpen className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              OPEN JOURNAL
            </button>
          )}
        </div>

        {/* ─── The 3D Physical Book Experience (Centered) ─── */}
        <div className="w-full flex justify-center items-center perspective-[2500px] relative min-h-[580px]">

            {/* ─── LAYER 1: CLOSED LINEN COVER OVERLAY ─── */}
             <div
               onClick={() => setIsOpen(true)}
               className={`w-full max-w-[420px] h-[580px] cursor-pointer absolute transition-all duration-700 ease-in-out origin-center select-none ${isOpen
                 ? 'opacity-0 pointer-events-none scale-90 -translate-x-32 rotate-y-[-45deg] z-0'
                 : 'opacity-100 scale-100 z-20'
                 }`}
             >
              {/* ─── Ethereal Pulsing Purple Glow Aura (Top & Sides Only - Softened) ─── */}
              <div className="absolute -top-16 -left-12 -right-12 bottom-20 pointer-events-none -z-10 overflow-visible">
                <style>{`
                  @keyframes auraPulse1 {
                    0%, 100% { transform: scale(0.95); opacity: 0.22; filter: blur(60px); }
                    50% { transform: scale(1.04); opacity: 0.38; filter: blur(85px); }
                  }
                  @keyframes auraPulse2 {
                    0%, 100% { transform: scale(1.08) rotate(0deg); opacity: 0.15; filter: blur(95px); }
                    50% { transform: scale(1.2) rotate(90deg); opacity: 0.3; filter: blur(120px); }
                  }
                `}</style>
                {/* Concentrated violet-fuchsia core glow */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/0 via-violet-500/18 to-fuchsia-600/12 rounded-t-md mix-blend-screen"
                  style={{ animation: 'auraPulse1 5.5s infinite ease-in-out' }}
                ></div>
                {/* Wide indigo/purple ambient halo */}
                <div 
                  className="absolute inset-0 rounded-full mix-blend-screen"
                  style={{ 
                    background: 'radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
                    animation: 'auraPulse2 9s infinite ease-in-out' 
                  }}
                ></div>
              </div>

              {/* ─── Grounding Contact Shadows on the Table ─── */}
              {/* Deep core contact shadow right at the base line */}
              <div className="absolute -bottom-2 left-10 right-10 h-4 bg-background blur-[6px] rounded-[50%] pointer-events-none mix-blend-multiply"></div>
              {/* Mid-spread ambient shadow */}
              <div className="absolute -bottom-8 left-4 right-4 h-12 bg-background/90 blur-[18px] rounded-[50%] pointer-events-none mix-blend-multiply"></div>
              {/* Large soft floor shadow projection */}
              <div className="absolute -bottom-16 -left-6 -right-6 h-24 bg-background/50 blur-[36px] rounded-[50%] pointer-events-none mix-blend-multiply"></div>

              <div className="w-full h-full relative overflow-hidden rounded-xl flex flex-col justify-between p-12 select-none text-left shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
                <img
                  src="/images/journal book.png"
                  alt="HZ Journal Book Cover"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
                  draggable="false"
                />
                {/* Subtle spine shadow overlay to give it a physical book 3D feel */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
                
                {/* Overlay text offset to the left to avoid the leather strap and lock buckle */}
                <div className="relative z-20 w-[55%] flex flex-col justify-between h-full pointer-events-none">
                  
                  {/* Top printing */}
                  <div className="pt-2">
                    <span 
                      className="font-mono text-[9px] text-[#c5a075]/40 tracking-[0.25em] block uppercase"
                      style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)' }}
                    >
                      ISSUE N°01
                    </span>
                  </div>

                  {/* Center Embossed Monogram */}
                  <div className="my-auto py-10 flex flex-col items-center">
                    <h3 
                      className="text-5xl text-[#c5a075]/75 font-serif font-light tracking-[0.2em] mb-3 text-center italic"
                      style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.06)' }}
                    >
                      HZ
                    </h3>
                    <div className="w-8 h-[1px] bg-[#c5a075]/25 mx-auto mb-3"></div>
                    <p 
                      className="text-[9px] tracking-[0.55em] uppercase text-[#c5a075]/50 font-condensed text-center"
                      style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04)' }}
                    >
                      JOURNAL
                    </p>
                  </div>

                  {/* Bottom embossed instruction */}
                  <div className="w-full text-center pb-2">
                    <span 
                      className="font-condensed text-[8px] tracking-[0.45em] text-[#c5a075]/60 uppercase animate-[pulse_2.5s_infinite]"
                      style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04)' }}
                    >
                      CLICK TO OPEN
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── LAYER 2: OPEN PHYSICAL SPREAD ARCHIVE (react-pageflip) ─── */}
            <div
              className={`w-full max-w-[1240px] h-[580px] transition-all duration-700 ease-out ${isOpen
                ? 'opacity-100 scale-100 translate-x-0 z-20 relative'
                : 'opacity-0 scale-95 translate-x-12 pointer-events-none absolute z-0'
                }`}
            >
              {/* Outer Close Trigger Control Ring */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 z-[60] w-8 h-8 rounded-full bg-background/80 hover:bg-[#c5a075] border border-divider flex items-center justify-center text-foreground/80 hover:text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg"
                aria-label="Close Journal"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {isOpen && (
                <div className="relative w-full h-full flex justify-center items-center">
                  {/* Swipe Peel Hint Helper */}
                  {currentPage === 0 && (
                    <div className="absolute bottom-12 right-12 md:bottom-16 md:right-16 z-[110] flex flex-col items-end gap-2 select-none pointer-events-none animate-[pulse_3s_infinite]">
                      <span className="font-condensed text-[9px] tracking-[0.25em] text-[#c5a075] uppercase bg-[#070707]/95 px-3 py-2 rounded-sm border border-[#c5a075]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                        DRAG CORNER TO PEEL PAGE
                      </span>
                      <div className="mr-6">
                        <svg className="w-5 h-5 text-[#c5a075] animate-[bounce_1.2s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <HTMLFlipBook
                    width={620}
                    height={580}
                    size="stretch"
                    minWidth={315}
                    maxWidth={620}
                    minHeight={400}
                    maxHeight={580}
                    maxShadowOpacity={0.4}
                    showCover={false}
                    usePortrait={true}
                    mobileScrollSupport={true}
                    clickEventForward={false}
                    swipeDistance={20}
                    className="shadow-[0_40px_110px_rgba(0,0,0,0.95)] rounded-sm"
                    flippingTime={900}
                    ref={bookRef}
                    onFlip={(e) => {
                      setProgress(0);
                      setCurrentPage(e.data);
                      if (e.data >= pagesData.length - 2) {
                        setIsAutoPlaying(false);
                      }
                    }}
                  >
                    {pagesData.map((page, index) => (
                      <Page key={index} isLeft={page.type === 'left'}>
                        {page.type === 'left' ? renderLeftPage(page.data) : renderRightPage(page.data)}
                      </Page>
                    ))}
                  </HTMLFlipBook>
                </div>
              )}
            </div>

        </div>

        {/* Centered controller placed outside the book, directly below it */}
        {isOpen && (
          <div className="flex items-center gap-6 mt-12 z-[100] bg-white/[0.03] backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)] select-none">
            {!isAtEnding && (
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-[#c5a075]/40 flex items-center justify-center text-white/70 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.08] cursor-pointer shadow-sm"
                  aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 pl-0.5" />}
                </button>
                <div className="hidden md:block w-24 h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c5a075] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {!isAtEnding && <div className="w-[1px] h-4 bg-white/10"></div>}

            <div className="flex gap-2 p-0.5">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSpread(); }}
                disabled={currentPage === 0}
                className={`w-8 h-8 rounded-full border border-transparent hover:border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all hover:bg-white/5 cursor-pointer ${currentPage === 0 ? 'opacity-25 cursor-not-allowed' : ''}`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSpread(); }}
                disabled={isAtEnding}
                className={`w-8 h-8 rounded-full border border-transparent hover:border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all hover:bg-white/5 cursor-pointer ${isAtEnding ? 'opacity-25 cursor-not-allowed' : ''}`}
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}