'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Calendar, MapPin, Camera, Clock } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function ArticleReader({ post, onClose }) {
  const panelRef = useRef(null);
  const backdropRef = useRef(null);

  // Lock body scroll when reader is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Entry Slide-in Animation
  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return;

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    gsap.fromTo(
      panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.6, ease: 'power3.out' }
    );
  }, [post]);

  const handleCloseClick = () => {
    if (!panelRef.current || !backdropRef.current) return;
    
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(panelRef.current, { 
      x: '100%', 
      duration: 0.4, 
      ease: 'power3.in',
      onComplete: onClose
    });
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dark Overlay Backdrop */}
      <div 
        ref={backdropRef}
        onClick={handleCloseClick}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"
      />

      {/* Main Slide-in Reader Board */}
      <div 
        ref={panelRef}
        className="relative w-full max-w-4xl bg-[#08080a] border-l border-white/5 h-full flex flex-col z-10 select-none shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Top Controls Bar */}
        <div className="w-full flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/5 bg-[#08080a] z-20">
          <span className="font-mono text-[8.5px] text-white/35 tracking-[0.3em] uppercase">
            {post.type === 'essay' ? 'PHOTO ESSAY COMPILATION' : 'FIELD NOTE ENTRY'}
          </span>
          
          <button
            onClick={handleCloseClick}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Close reader"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Editorial Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          
          {/* ─── HERO HEADER IMAGE ─── */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] overflow-hidden bg-zinc-950">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover grayscale-[10%] brightness-[0.75]"
              sizes="100vw"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/25 to-transparent z-10" />
          </div>

          {/* ─── MAIN TEXT COMPOSITION ─── */}
          <div className="px-6 sm:px-16 md:px-24 py-10 md:py-14 text-left">
            
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-6 text-[9px] font-mono text-white/40 tracking-wider mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={10} className="text-[var(--accent)]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={10} className="text-[var(--accent)]" />
                <span>{post.location}</span>
              </div>
              {post.type === 'essay' ? (
                <div className="flex items-center gap-1">
                  <Clock size={10} className="text-white/20" />
                  <span>{post.readTime}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Camera size={10} className="text-white/20" />
                  <span>{post.camera}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-[26px] sm:text-[34px] tracking-[0.1em] uppercase text-white mb-3">
              {post.title}
            </h1>

            {/* Subtitle */}
            <h2 className="font-condensed text-[12px] sm:text-[13px] text-[var(--accent)] tracking-[0.25em] uppercase mb-10 leading-relaxed border-b border-white/5 pb-6">
              {post.type === 'essay' ? post.subtitle : `${post.camera} · ${post.lens}`}
            </h2>

            {/* Content Switcher */}
            {post.type === 'essay' ? (
              /* --- ESSAYS: MULTI-CHAPTER LAYOUT --- */
              <div className="flex flex-col gap-12 text-[13.5px] leading-[2.1] text-white/55 font-light tracking-wide">
                {post.chapters.map((ch, idx) => (
                  <div key={idx} className="flex flex-col gap-6">
                    <h3 className="font-condensed text-[11px] tracking-[0.3em] uppercase text-white/80 border-l-2 border-[var(--accent)] pl-3">
                      {ch.title}
                    </h3>
                    <p className="first-letter:text-3xl first-letter:font-serif first-letter:text-[var(--accent)] first-letter:mr-1.5 first-letter:float-left first-letter:leading-none">
                      {ch.text}
                    </p>
                    {ch.image && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden rounded border border-white/5 bg-zinc-950 my-2">
                        <Image
                          src={ch.image}
                          alt={ch.title}
                          fill
                          className="object-cover grayscale-[20%] brightness-90"
                          sizes="(max-width: 1024px) 100vw, 850px"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* --- DAILY DIARY LOGS: REFLECTION WITH EXIF --- */
              <div className="flex flex-col gap-10">
                {/* Typed log reflection text */}
                <div className="text-[13.5px] leading-[2.1] text-white/55 font-light tracking-wide italic border-l border-white/10 pl-6 my-2">
                  "{post.reflection}"
                </div>

                {/* Grid of full EXIF settings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded p-6 mt-4">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Aperture</span>
                    <span className="text-[12px] font-mono text-white/90 leading-none">{post.exif.aperture}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Shutter Speed</span>
                    <span className="text-[12px] font-mono text-white/90 leading-none">{post.exif.shutter}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">ISO Sensitivity</span>
                    <span className="text-[12px] font-mono text-white/90 leading-none">{post.exif.iso}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Focal Length</span>
                    <span className="text-[12px] font-mono text-white/90 leading-none">{post.exif.focal}</span>
                  </div>
                </div>

                {/* Additional Technical Meta */}
                <div className="flex flex-col gap-1.5 text-left text-[10px] font-mono text-white/30 tracking-wider">
                  <div>BODY: <span className="text-white/50">{post.camera}</span></div>
                  <div>LENS: <span className="text-white/50">{post.lens}</span></div>
                </div>
              </div>
            )}

            {/* Signature Accent */}
            <div className="mt-20 flex flex-col items-start gap-1 border-t border-white/5 pt-10 select-none">
              <span className="font-script text-[32px] text-[var(--accent)] leading-none">
                Hanzala
              </span>
              <span className="text-[7px] font-mono tracking-[0.3em] uppercase text-white/30 mt-1">
                JOURNAL ARCHIVES
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
