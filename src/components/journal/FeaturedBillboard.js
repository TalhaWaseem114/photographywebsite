'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

export default function FeaturedBillboard({ post, onRead }) {
  if (!post) return null;

  return (
    <div 
      className="relative w-full overflow-hidden rounded-xl border border-white/[0.04] bg-[#0c0c0e] hover:border-[var(--accent)]/30 transition-all duration-500 ease-out cursor-pointer group"
      onClick={onRead}
      style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)' }}
    >
      {/* Inner border outline */}
      <div className="absolute inset-0 z-20 border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/15 rounded-xl pointer-events-none transition-all duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* LEFT: Cover Image */}
        <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover grayscale-[30%] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.01] transition-all duration-1000 ease-out"
          />
          {/* Edge shadow details */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden z-10" />
        </div>

        {/* RIGHT: Editorial Content */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center items-start text-left z-20 relative">
          
          {/* Top Line Meta */}
          <div className="flex items-center gap-3.5 mb-6 text-[8px] font-mono text-white/40 tracking-[0.25em] uppercase">
            <span>{post.chapter}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{post.date}</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-[26px] sm:text-[34px] tracking-[0.1em] uppercase text-white leading-tight mb-4">
            {post.title}
          </h2>

          <p className="font-condensed text-[11px] text-[var(--accent)] tracking-[0.25em] uppercase mb-5 leading-normal">
            {post.subtitle}
          </p>

          <p className="text-[13px] leading-[2] text-white/45 font-light tracking-wide mb-8 max-w-[360px]">
            {post.excerpt}
          </p>

          {/* Action Trigger */}
          <div className="inline-flex items-center gap-2.5 font-condensed text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] border-b border-[var(--accent)]/30 group-hover:border-[var(--accent)] group-hover:text-white pb-1.5 transition-all duration-300">
            <BookOpen size={12} className="shrink-0" />
            <span>READ ESSAY · {post.readTime}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
