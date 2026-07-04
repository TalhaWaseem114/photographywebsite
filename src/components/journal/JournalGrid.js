'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, Camera, Calendar, MapPin } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function JournalGrid({ 
  posts, 
  activeTab, 
  onTabChange, 
  onSelectPost 
}) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.grid-item');
    
    // Clear ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && gridRef.current.contains(trigger.trigger)) {
        trigger.kill();
      }
    });

    gsap.fromTo(
      items,
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
  }, [activeTab, posts]);

  return (
    <div className="w-full py-16">
      {/* ─── Tabs Toggle Bar ─── */}
      <div className="flex justify-center items-center gap-4 mb-16 select-none">
        <button
          onClick={() => onTabChange('essay')}
          className={`px-6 py-2.5 rounded-full border text-[10px] tracking-[0.2em] font-condensed uppercase transition-all duration-500 cursor-pointer
            ${activeTab === 'essay' 
              ? 'bg-[var(--accent)] text-[#080808] border-[var(--accent)] font-semibold shadow-[0_0_15px_rgba(200,169,126,0.25)] scale-102' 
              : 'bg-transparent text-white/40 border-white/10 hover:text-white/80 hover:border-white/20 hover:bg-white/5'}`}
        >
          Photo Essays
        </button>
        <button
          onClick={() => onTabChange('log')}
          className={`px-6 py-2.5 rounded-full border text-[10px] tracking-[0.2em] font-condensed uppercase transition-all duration-500 cursor-pointer
            ${activeTab === 'log' 
              ? 'bg-[var(--accent)] text-[#080808] border-[var(--accent)] font-semibold shadow-[0_0_15px_rgba(200,169,126,0.25)] scale-102' 
              : 'bg-transparent text-white/40 border-white/10 hover:text-white/80 hover:border-white/20 hover:bg-white/5'}`}
        >
          Daily Logs
        </button>
      </div>

      {/* ─── Grid Wrapper ─── */}
      <div ref={gridRef} className="w-full">
        {activeTab === 'essay' ? (
          /* ESSAYS: 2-Column Staggered Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="grid-item flex flex-col gap-6 cursor-pointer group bg-[#0a0a0c] border border-white/[0.04] p-6 sm:p-8 rounded-md hover:border-[var(--accent)]/30 transition-all duration-500"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover grayscale-[20%] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 text-[8px] font-mono text-white/30 tracking-widest uppercase">
                    <span>{post.chapter}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display text-[18px] sm:text-[22px] tracking-[0.08em] uppercase text-white group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-[12.5px] leading-[1.9] text-white/40 font-light tracking-wide mb-3 max-w-[420px]">
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 font-condensed text-[9px] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] border-b border-[var(--accent)]/15 group-hover:border-[var(--accent)] pb-1 transition-all duration-300">
                    <BookOpen size={10} />
                    <span>READ ESSAY · {post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DAILY LOGS: 3-Column Polaroid-Style Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="grid-item flex flex-col bg-[#111113] border border-white/[0.04] p-5 pb-7 rounded-md cursor-pointer hover:border-[var(--accent)]/20 hover:bg-[#141417] transition-all duration-500 relative group"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              >
                {/* Polaroid Square Frame */}
                <div className="relative w-full aspect-square overflow-hidden bg-zinc-950 rounded-sm mb-5">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                  
                  {/* Hover visual label overlay */}
                  <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/80 backdrop-blur-xs text-[var(--accent)] text-[7px] font-mono tracking-widest px-2 py-0.5 rounded">
                      READ NOTES
                    </span>
                  </div>
                </div>

                {/* Exif Technical Border Details */}
                <div className="flex justify-between items-center text-[7.5px] font-mono text-white/35 tracking-wider pb-4 mb-4 border-b border-white/5 uppercase">
                  <div className="flex items-center gap-1">
                    <Camera size={9} className="text-[var(--accent)]" />
                    <span>{post.exif.iso} · {post.exif.aperture} · {post.exif.shutter}</span>
                  </div>
                  <span>{post.exif.focal}</span>
                </div>

                {/* Context stamp details */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/30 tracking-wider">
                    <div className="flex items-center gap-1">
                      <MapPin size={8} className="text-[var(--accent)]/60" />
                      <span>{post.location}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-condensed text-[12px] sm:text-[13px] tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[11.5px] leading-[1.8] text-white/40 font-light tracking-wide line-clamp-2 italic">
                    "{post.reflection}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
