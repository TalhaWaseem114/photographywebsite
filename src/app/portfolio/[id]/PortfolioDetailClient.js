'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Camera, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Send,
  ArrowLeft,
  Check,
  Share2
} from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/data/portfolioData';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, increment, setDoc } from 'firebase/firestore';

export default function PortfolioDetailClient({ id }) {
  const router = useRouter();
  
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Comment form state
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Sync with Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "portfolio_items"), (snapshot) => {
      if (snapshot.empty) {
        // Seed if empty
        PORTFOLIO_ITEMS.forEach(async (item) => {
          const initial = {
            ...item,
            slides: item.slides || [item.src],
            likes: item.likes || Math.floor(Math.random() * 30) + 5,
            comments: item.comments || [
              { name: "Aisha Khan", text: "Stunning light gradients!", date: "2 days ago" }
            ]
          };
          await setDoc(doc(db, "portfolio_items", item.id), initial);
        });
      } else {
        const storedLikes = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("portfolio_likes") || "[]")
          : [];
        const items = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            ...data,
            likedByMe: storedLikes.includes(data.id)
          };
        });
        setPortfolioItems(items);
      }
    });

    return () => unsubscribe();
  }, []);

  // Retrieve current active item
  const currentItem = useMemo(() => {
    return portfolioItems.find(item => item.id === id) || null;
  }, [id, portfolioItems]);

  // Find index of current item in overall list
  const currentIndex = useMemo(() => {
    return portfolioItems.findIndex(item => item.id === id);
  }, [id, portfolioItems]);

  const prevItem = useMemo(() => {
    if (currentIndex === -1 || portfolioItems.length <= 1) return null;
    const idx = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    return portfolioItems[idx];
  }, [currentIndex, portfolioItems]);

  const nextItem = useMemo(() => {
    if (currentIndex === -1 || portfolioItems.length <= 1) return null;
    const idx = (currentIndex + 1) % portfolioItems.length;
    return portfolioItems[idx];
  }, [currentIndex, portfolioItems]);

  // Retrieve related items (excluding current item)
  const relatedItems = useMemo(() => {
    if (!currentItem) return [];
    return portfolioItems
      .filter(item => item.category === currentItem.category && item.id !== currentItem.id)
      .slice(0, 4); // limit to 4 items
  }, [currentItem, portfolioItems]);

  // Reset slide index when active item changes
  useEffect(() => {
    setActiveSlide(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Toggle like action on Firestore
  const handleToggleLike = useCallback(async () => {
    if (!currentItem) return;
    const storedLikes = JSON.parse(localStorage.getItem("portfolio_likes") || "[]");
    const isLiked = storedLikes.includes(currentItem.id);
    
    let updatedLikes;
    if (isLiked) {
      updatedLikes = storedLikes.filter(itemId => itemId !== currentItem.id);
    } else {
      updatedLikes = [...storedLikes, currentItem.id];
    }
    localStorage.setItem("portfolio_likes", JSON.stringify(updatedLikes));
    
    const docRef = doc(db, "portfolio_items", currentItem.id);
    await updateDoc(docRef, {
      likes: increment(isLiked ? -1 : 1)
    });
  }, [currentItem]);

  // Add comment action on Firestore
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentItem) return;

    const finalAuthor = isAnonymous ? 'Anonymous' : authorName.trim() || 'Anonymous';
    const newComment = {
      name: finalAuthor,
      text: commentText,
      date: 'Just now'
    };

    const docRef = doc(db, "portfolio_items", currentItem.id);
    await updateDoc(docRef, {
      comments: [newComment, ...(currentItem.comments || [])]
    });

    setCommentText('');
    if (!isAnonymous) setAuthorName('');
  };

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-mono text-white/40 uppercase tracking-widest">Loading visual capture...</p>
        </div>
      </div>
    );
  }

  const slides = currentItem.slides || [currentItem.src];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-left py-24 px-6 md:px-12 xl:px-24">
      {/* Breadcrumb back navigation & Project navigation */}
      <div className="max-w-[1700px] mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link 
          href={`/portfolio?category=${currentItem.category}`}
          className="inline-flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft size={12} />
          Back to Gallery ({currentItem.category})
        </Link>

        {portfolioItems.length > 1 && (
          <div className="flex items-center gap-4.5 select-none">
            {prevItem && (
              <Link
                href={`/portfolio/${prevItem.id}`}
                className="text-[9px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
              >
                ← Prev Project
              </Link>
            )}
            <span className="text-white/10 text-[9px] font-mono">/</span>
            {nextItem && (
              <Link
                href={`/portfolio/${nextItem.id}`}
                className="text-[9px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
              >
                Next Project →
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Main Split Interface Area */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        
        {/* LEFT COLUMN: Slideshow Carousel */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-black/40 rounded-lg border border-white/[0.03] overflow-hidden relative min-h-[50vh] lg:min-h-[600px]">
          
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
            <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px]">
              <Image
                src={slides[activeSlide]}
                alt={`${currentItem.title} - Slide ${activeSlide + 1}`}
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
                    ${activeSlide === idx ? 'bg-[#c5a075] w-3' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}

          {/* Exif Banner Overlay */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs border border-white/5 rounded px-3 py-2 flex items-center gap-2 select-none max-w-[280px]">
            <Camera size={11} className="text-[#c5a075] shrink-0" />
            <span className="text-[8.5px] font-mono text-white/70 tracking-wider truncate">
              {currentItem.camera} · {currentItem.lens || "Prime lens"}
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Metadata, Like & Comments Stream Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#0a0a0c] border border-white/[0.04] rounded-lg p-5 sm:p-6 lg:h-full lg:min-h-[600px] relative">
          
          {/* Header Metadata block */}
          <div className="border-b border-white/5 pb-4 mb-4 select-none">
            <span className="w-fit bg-[#c5a075]/15 border border-[#c5a075]/30 text-[#c5a075] text-[8px] font-condensed tracking-[0.2em] uppercase px-2.5 py-0.5 rounded mb-2.5 block">
              {currentItem.category}
            </span>
            <h2 className="font-display uppercase text-white tracking-[0.12em] text-lg sm:text-xl font-light" style={{ fontFamily: "'Antonio', sans-serif" }}>
              {currentItem.title}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-[9px] font-mono text-white/40">
              <div className="flex items-center gap-1">
                <MapPin size={9} className="text-[#c5a075]" />
                <span>{currentItem.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={9} className="text-white/20" />
                <span>{currentItem.date || "June 2026"}</span>
              </div>
            </div>
            {currentItem.desc && (
              <p className="text-white/60 text-xs mt-3 leading-relaxed border-t border-white/5 pt-2.5 font-light">
                {currentItem.desc}
              </p>
            )}
          </div>

          {/* INTERACTION AREA (Likes counter & Heart selector) */}
          <div className="flex items-center justify-between py-2 border-b border-white/5 mb-4 select-none">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleToggleLike}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer
                  ${currentItem.likedByMe 
                    ? 'bg-[#c5a075]/15 border-[#c5a075]/30 text-[#c5a075] scale-105' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
              >
                <Heart size={14} fill={currentItem.likedByMe ? 'currentColor' : 'none'} className="transition-transform active:scale-75" />
              </button>

              <button 
                onClick={handleShare}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer relative
                  ${shareCopied
                    ? 'bg-[#c5a075]/15 border-[#c5a075]/30 text-[#c5a075] scale-105' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                title="Share this project"
              >
                {shareCopied ? <Check size={14} /> : <Share2 size={14} />}
                {shareCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#c5a075] text-[#080808] text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded shadow whitespace-nowrap animate-bounce">
                    Copied!
                  </span>
                )}
              </button>

              <div className="flex flex-col text-left ml-2">
                <span className="text-[11px] font-mono font-medium text-white/80">{currentItem.likes} Likes</span>
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest mt-0.5">Community Likes</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/30 text-[9px] font-mono">
              <MessageSquare size={11} />
              <span>{(currentItem.comments || []).length} Comments</span>
            </div>
          </div>

          {/* COMMENTS FEED LIST */}
          <div className="flex-1 lg:overflow-y-auto pr-1 space-y-4 mb-4 max-h-[300px] lg:max-h-[350px] scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
            {(!currentItem.comments || currentItem.comments.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/5 rounded">
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">No reflections yet</p>
                <p className="text-[9px] text-white/20 mt-1 max-w-[180px] leading-relaxed">Be the first to leave a comment below.</p>
              </div>
            ) : (
              currentItem.comments.map((comm, idx) => (
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
          <form onSubmit={handleCommentSubmit} className="border-t border-white/10 pt-4 mt-auto">
            <div className="flex flex-col gap-3">
              {/* Comment Text Area */}
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Share a reflection on this shoot..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-[#121216] border border-white/20 focus:border-[#c5a075] focus:ring-1 focus:ring-[#c5a075] rounded px-3 py-2.5 text-[11.5px] font-normal text-white outline-none placeholder-white/55 transition-all pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#c5a075] transition-colors duration-300 w-7 h-7 flex items-center justify-center cursor-pointer"
                  aria-label="Send comment"
                >
                  <Send size={12} className="opacity-90" />
                </button>
              </div>

              {/* Author name & Anonymous Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? "Commenting as Anonymous" : "Your name..."}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#121216] border border-white/20 focus:border-[#c5a075] text-[10.5px] font-normal text-white outline-none px-3 py-2 rounded placeholder-white/45 disabled:opacity-40 transition-all"
                  />
                </div>

                {/* Anonymous switch */}
                <label className="flex items-center gap-2 cursor-pointer select-none text-white/70 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 bg-[#121216] border border-white/20 rounded text-[#c5a075] accent-[#c5a075] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[9.5px] font-condensed tracking-wider uppercase font-semibold">Anonymous</span>
                </label>
              </div>

            </div>
          </form>

        </div>

      </div>

      {/* RELATED POSTS SECTION */}
      <div className="max-w-[1700px] mx-auto border-t border-white/5 pt-12 mt-12">
        <h3 className="font-display uppercase text-2xl text-[#c5a075] tracking-widest text-left mb-8" style={{ fontFamily: "'Antonio', sans-serif" }}>
          Related Projects
        </h3>
        
        {relatedItems.length === 0 ? (
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest">No related projects found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedItems.map((related) => (
              <div 
                key={related.id}
                onClick={() => router.push(`/portfolio/${related.id}`)}
                className="group cursor-pointer flex flex-col bg-[#0c0c0e] border border-white/5 hover:border-[#c5a075]/40 rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-black/40">
                  <img 
                    src={related.src} 
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#c5a075] uppercase border border-[#c5a075]/30 px-3 py-1.5 rounded bg-black/60">
                      View Work
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col text-left">
                  <span className="text-[8px] font-mono tracking-widest text-[#c5a075] uppercase mb-1">{related.category}</span>
                  <h4 className="font-display text-[12px] tracking-wide uppercase text-white truncate group-hover:text-[#c5a075] transition-colors">{related.title}</h4>
                  <span className="text-[8.5px] font-mono text-white/40 mt-1">{related.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
