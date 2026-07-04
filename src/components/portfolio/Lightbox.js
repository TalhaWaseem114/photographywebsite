'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Camera, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
  onToggleLike,
  onAddComment
}) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  // Slide Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = item.slides || [item.src];

  // Comment Form State
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        if (slides.length > 1) {
          prevSlide();
        } else {
          onPrev();
        }
      }
      if (e.key === 'ArrowRight') {
        if (slides.length > 1) {
          nextSlide();
        } else {
          onNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, activeSlide, slides]);

  // Reset slide index when changing items
  useEffect(() => {
    setActiveSlide(0);
  }, [item]);

  // Entrance animation
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [item]);

  if (!item) return null;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const finalAuthor = isAnonymous ? 'Anonymous' : authorName.trim() || 'Anonymous';
    onAddComment(item.id, finalAuthor, commentText);
    
    // Reset inputs
    setCommentText('');
    if (!isAnonymous) setAuthorName('');
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between items-center text-left"
      onClick={onClose}
    >
      {/* Top Header Panel */}
      <div 
        className="w-full flex items-center justify-between px-6 md:px-12 py-4.5 z-10 bg-gradient-to-b from-black/90 to-transparent shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Counter */}
        <div className="font-mono text-[9px] text-white/40 tracking-[0.25em] uppercase">
          SERIES <span className="text-white font-medium">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(totalCount).padStart(2, '0')}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-6">
          {/* Quick Nav keys indicator */}
          <span className="hidden sm:inline font-mono text-[7px] text-white/20 tracking-wider uppercase">
            Use Arrow Keys ⟷
          </span>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Split Interface Area */}
      <div 
        ref={contentRef}
        className="relative flex-1 w-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden px-4 md:px-8 xl:px-12 gap-8 items-stretch pb-6 lg:pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: Slideshow Carousel (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-black/40 rounded-lg border border-white/[0.03] overflow-hidden relative min-h-[45vh] lg:min-h-0">
          
          {/* Left Arrow */}
          {slides.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/50 hover:text-white hover:border-white/35 transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Slide Image Container */}
          <div className="flex-1 relative w-full h-[350px] lg:h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src={slides[activeSlide]}
                alt={`${item.title} - Slide ${activeSlide + 1}`}
                fill
                className="object-contain rounded"
                sizes="(max-width: 1200px) 100vw, 1000px"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          {slides.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/50 hover:text-white hover:border-white/35 transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Slide Indicator Overlay Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 select-none bg-black/45 px-3 py-1.5 rounded-full border border-white/5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer
                    ${activeSlide === idx ? 'bg-[var(--accent)] w-3' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}

          {/* Exif Banner Overlay (Top left of carousel) */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs border border-white/5 rounded px-3 py-2 flex items-center gap-2 select-none max-w-[280px]">
            <Camera size={11} className="text-[var(--accent)] shrink-0" />
            <span className="text-[8.5px] font-mono text-white/70 tracking-wider truncate">
              {item.camera} · {item.lens}
            </span>
          </div>

          {/* Quick Portfolio navigation hooks */}
          <button 
            onClick={onPrev}
            className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-xs border border-white/5 text-[8.5px] font-mono text-white/40 hover:text-white px-3 py-2 rounded flex items-center gap-1 cursor-pointer transition-colors"
          >
            ← PREV FRAME
          </button>
          <button 
            onClick={onNext}
            className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-xs border border-white/5 text-[8.5px] font-mono text-white/40 hover:text-white px-3 py-2 rounded flex items-center gap-1 cursor-pointer transition-colors"
          >
            NEXT FRAME →
          </button>

        </div>

        {/* RIGHT COLUMN: Metadata, Like & Comments Stream Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#0a0a0c] border border-white/[0.04] rounded-lg p-5 sm:p-6 lg:h-full lg:overflow-hidden relative">
          
          {/* Header Metadata block */}
          <div className="border-b border-white/5 pb-4 mb-4 select-none">
            <span className="w-fit bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-[8px] font-condensed tracking-[0.2em] uppercase px-2.5 py-0.5 rounded mb-2.5 block">
              {item.category}
            </span>
            <h2 className="font-display uppercase text-white tracking-[0.12em] text-lg sm:text-xl font-light" style={{ fontFamily: "'Antonio', sans-serif" }}>
              {item.title}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-[9px] font-mono text-white/40">
              <div className="flex items-center gap-1">
                <MapPin size={9} className="text-[var(--accent)]" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={9} className="text-white/20" />
                <span>{item.date}</span>
              </div>
            </div>
            {item.desc && (
              <p className="text-white/60 text-xs mt-3 leading-relaxed border-t border-white/5 pt-2.5 font-light">
                {item.desc}
              </p>
            )}
          </div>

          {/* INTERACTION AREA (Likes counter & Heart selector) */}
          <div className="flex items-center justify-between py-2 border-b border-white/5 mb-4 select-none">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onToggleLike(item.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer
                  ${item.likedByMe 
                    ? 'bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)] scale-105' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
              >
                <Heart size={14} fill={item.likedByMe ? 'currentColor' : 'none'} className="transition-transform active:scale-75" />
              </button>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-mono font-medium text-white/80">{item.likes} Likes</span>
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest mt-0.5">Community Likes</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/30 text-[9px] font-mono">
              <MessageSquare size={11} />
              <span>{item.comments.length} Comments</span>
            </div>
          </div>

          {/* COMMENTS FEED LIST (Scrollable, takes middle space) */}
          <div className="flex-1 lg:overflow-y-auto pr-1 space-y-4 mb-4 max-h-[300px] lg:max-h-none scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
            {item.comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/5 rounded">
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">No reflections yet</p>
                <p className="text-[9px] text-white/20 mt-1 max-w-[180px] leading-relaxed">Be the first to leave a comment below.</p>
              </div>
            ) : (
              item.comments.map((comm, idx) => (
                <div key={idx} className="flex flex-col bg-white/[0.01] border border-white/[0.02] p-3 rounded">
                  <div className="flex justify-between items-center text-[9px] font-mono select-none">
                    <span className="text-white font-medium uppercase tracking-wide">{comm.name}</span>
                    <span className="text-white/25">{comm.date}</span>
                  </div>
                  <p className="text-[11px] leading-[1.7] text-white/50 font-light mt-1.5 tracking-wide">
                    {comm.text}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* COMMENT SUBMISSION FORM */}
          <form onSubmit={handleCommentSubmit} className="border-t border-white/5 pt-4 mt-auto">
            <div className="flex flex-col gap-3">
              {/* Comment Text Area */}
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Share a reflection on this shoot..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-[#08080a] border border-white/10 focus:border-[var(--accent)]/50 rounded px-3 py-2.5 text-[11.5px] font-light text-white outline-none placeholder-white/20 transition-all pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-[var(--accent)] transition-colors duration-300 w-7 h-7 flex items-center justify-center cursor-pointer"
                  aria-label="Send comment"
                >
                  <Send size={12} />
                </button>
              </div>

              {/* Author name & Anonymous Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? "Anonymous User" : "Your name..."}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 focus:border-[var(--accent)]/50 text-[10.5px] font-light text-white/70 outline-none py-1 placeholder-white/15 disabled:opacity-40 transition-colors"
                  />
                </div>

                {/* Anonymous switch */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-3.5 h-3.5 bg-[#08080a] border border-white/20 rounded text-[var(--accent)] accent-[var(--accent)] cursor-pointer"
                  />
                  <span className="text-[9.5px] font-condensed tracking-wider text-white/40 uppercase">Anonymous</span>
                </label>
              </div>

            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
