'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Camera, 
  Clock,
  Heart, 
  MessageSquare, 
  Send,
  ArrowLeft,
  Check,
  Share2
} from 'lucide-react';
import { JOURNAL_POSTS } from '@/data/journalData';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, increment, setDoc } from 'firebase/firestore';

export default function JournalDetailClient({ id }) {
  const router = useRouter();

  // State for items loaded from Firestore
  const [allPosts, setAllPosts] = useState([]);
  const [shareCopied, setShareCopied] = useState(false);

  // Comment form state
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Sync with Firestore on mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "journal_posts"), (snapshot) => {
      if (snapshot.empty) {
        // Seed if empty
        JOURNAL_POSTS.forEach(async (post) => {
          const initial = {
            ...post,
            likes: post.likes || Math.floor(Math.random() * 20) + 5,
            comments: post.comments || [
              { name: "Sikandar Shah", text: "Magnificent photographic details!", date: "Yesterday" }
            ]
          };
          await setDoc(doc(db, "journal_posts", post.id), initial);
        });
      } else {
        const storedLikes = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("journal_likes") || "[]")
          : [];
        const posts = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            ...data,
            likedByMe: storedLikes.includes(data.id)
          };
        });
        setAllPosts(posts);
      }
    });

    return () => unsubscribe();
  }, []);

  const slugify = useCallback((text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }, []);

  // Retrieve current active post
  const currentPost = useMemo(() => {
    return allPosts.find(post => slugify(post.title) === id || post.id === id) || null;
  }, [id, allPosts, slugify]);

  // Find index of current post in overall list
  const currentIndex = useMemo(() => {
    return allPosts.findIndex(post => slugify(post.title) === id || post.id === id);
  }, [id, allPosts, slugify]);

  const prevPost = useMemo(() => {
    if (currentIndex === -1 || allPosts.length <= 1) return null;
    const idx = (currentIndex - 1 + allPosts.length) % allPosts.length;
    return allPosts[idx];
  }, [currentIndex, allPosts]);

  const nextPost = useMemo(() => {
    if (currentIndex === -1 || allPosts.length <= 1) return null;
    const idx = (currentIndex + 1) % allPosts.length;
    return allPosts[idx];
  }, [currentIndex, allPosts]);

  // Reset page scroll when active item changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Toggle like action on Firestore
  const handleToggleLike = useCallback(async () => {
    if (!currentPost) return;
    const storedLikes = JSON.parse(localStorage.getItem("journal_likes") || "[]");
    const isLiked = storedLikes.includes(currentPost.id);
    
    let updatedLikes;
    if (isLiked) {
      updatedLikes = storedLikes.filter(itemId => itemId !== currentPost.id);
    } else {
      updatedLikes = [...storedLikes, currentPost.id];
    }
    localStorage.setItem("journal_likes", JSON.stringify(updatedLikes));
    
    const docRef = doc(db, "journal_posts", currentPost.id);
    await updateDoc(docRef, {
      likes: increment(isLiked ? -1 : 1)
    });
  }, [currentPost]);

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  // Add comment action on Firestore
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentPost) return;

    const finalAuthor = isAnonymous ? 'Anonymous' : authorName.trim() || 'Anonymous';
    const newComment = {
      name: finalAuthor,
      text: commentText,
      date: 'Just now'
    };

    const docRef = doc(db, "journal_posts", currentPost.id);
    await updateDoc(docRef, {
      comments: [newComment, ...(currentPost.comments || [])]
    });

    setCommentText('');
    if (!isAnonymous) setAuthorName('');
  };

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-mono text-white/40 uppercase tracking-widest">Loading journal post...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] py-24 px-6 md:px-12 xl:px-24">
      {/* Breadcrumb back navigation & Quick Project navigation */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link 
          href="/journal"
          className="inline-flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft size={12} />
          Back to Journal
        </Link>

        {allPosts.length > 1 && (
          <div className="flex items-center gap-4.5 select-none">
            {prevPost && (
              <Link
                href={`/journal/${slugify(prevPost.title || prevPost.id)}`}
                className="text-[9px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
              >
                ← Prev Article
              </Link>
            )}
            <span className="text-white/10 text-[9px] font-mono">/</span>
            {nextPost && (
              <Link
                href={`/journal/${slugify(nextPost.title || nextPost.id)}`}
                className="text-[9px] font-mono text-white/40 hover:text-[#c5a075] uppercase tracking-widest transition-colors duration-300 cursor-pointer"
              >
                Next Article →
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Main Editorial Content Column */}
      <article className="max-w-4xl mx-auto bg-[#0a0a0c] border border-white/[0.03] rounded-lg overflow-hidden relative shadow-2xl mb-16">
        
        {/* HERO HEADER IMAGE */}
        <div className="relative w-full aspect-[21/9] overflow-hidden bg-zinc-950">
          <Image
            src={currentPost.coverImage}
            alt={currentPost.title}
            fill
            priority
            className="object-cover grayscale-[10%] brightness-[0.75]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/25 to-transparent z-10" />
        </div>

        {/* MAIN TEXT BODY */}
        <div className="px-6 sm:px-16 md:px-20 py-10 sm:py-14 text-left">
          
          {/* Meta Tags Row */}
          <div className="flex flex-wrap items-center gap-6 text-[9px] font-mono text-white/40 tracking-wider mb-6">
            <div className="flex items-center gap-1">
              <Calendar size={10} className="text-[#c5a075]" />
              <span>{currentPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={10} className="text-[#c5a075]" />
              <span>{currentPost.location}</span>
            </div>
            {currentPost.type === 'essay' ? (
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-white/20" />
                <span>{currentPost.readTime}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Camera size={10} className="text-white/20" />
                <span>{currentPost.camera}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-[26px] sm:text-[36px] tracking-[0.1em] uppercase text-white mb-3 leading-tight">
            {currentPost.title}
          </h1>

          {/* Subtitle */}
          <h2 className="font-condensed text-[12px] sm:text-[13px] text-[#c5a075] tracking-[0.25em] uppercase mb-10 leading-relaxed border-b border-white/5 pb-6">
            {currentPost.type === 'essay' ? currentPost.subtitle : `${currentPost.camera} · ${currentPost.lens}`}
          </h2>

          {/* Content Switcher */}
          {currentPost.type === 'essay' ? (
            /* ESSAYS: MULTI-CHAPTER LAYOUT */
            <div className="flex flex-col gap-12 text-[13.5px] leading-[2.1] text-white/55 font-light tracking-wide">
              {(currentPost.chapters || []).map((ch, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  <h3 className="font-condensed text-[11px] tracking-[0.3em] uppercase text-white/80 border-l-2 border-[#c5a075] pl-3">
                    {ch.title}
                  </h3>
                  <p className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#c5a075] first-letter:mr-1.5 first-letter:float-left first-letter:leading-none">
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
            /* DAILY DIARY LOGS: REFLECTION WITH EXIF */
            <div className="flex flex-col gap-10">
              <div className="text-[13.5px] leading-[2.1] text-white/55 font-light tracking-wide italic border-l border-white/10 pl-6 my-2">
                "{currentPost.reflection}"
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded p-6 mt-4">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Aperture</span>
                  <span className="text-[12px] font-mono text-white/90 leading-none">{currentPost.exif?.aperture}</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Shutter Speed</span>
                  <span className="text-[12px] font-mono text-white/90 leading-none">{currentPost.exif?.shutter}</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">ISO Sensitivity</span>
                  <span className="text-[12px] font-mono text-white/90 leading-none">{currentPost.exif?.iso}</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Focal Length</span>
                  <span className="text-[12px] font-mono text-white/90 leading-none">{currentPost.exif?.focal}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left text-[10px] font-mono text-white/30 tracking-wider">
                <div>BODY: <span className="text-white/50">{currentPost.camera}</span></div>
                <div>LENS: <span className="text-white/50">{currentPost.lens}</span></div>
              </div>
            </div>
          )}

          {/* Signature Accent */}
          <div className="mt-20 flex flex-col items-start gap-1 border-t border-white/5 pt-10 select-none">
            <span className="font-script text-[32px] text-[#c5a075] leading-none">
              Hanzala
            </span>
            <span className="text-[7px] font-mono tracking-[0.3em] uppercase text-white/30 mt-1">
              JOURNAL ARCHIVES
            </span>
          </div>

        </div>
      </article>

      {/* COMMENTS & LIKES AREA (Substack style bottom section) */}
      <div className="max-w-2xl mx-auto border-t border-white/10 pt-12">
        
        {/* Interaction bar (Likes, Share, Comments) */}
        <div className="flex items-center justify-between py-4 border-b border-white/5 mb-8 select-none">
          <div className="flex items-center gap-3">
            {/* Heart button */}
            <button 
              onClick={handleToggleLike}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer
                ${currentPost.likedByMe 
                  ? 'bg-[#c5a075]/15 border-[#c5a075]/30 text-[#c5a075] scale-105' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
            >
              <Heart size={14} fill={currentPost.likedByMe ? 'currentColor' : 'none'} className="transition-transform active:scale-75" />
            </button>

            {/* Share button */}
            <button 
              onClick={handleShare}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer relative
                ${shareCopied
                  ? 'bg-[#c5a075]/15 border-[#c5a075]/30 text-[#c5a075] scale-105' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
              title="Share this article"
            >
              {shareCopied ? <Check size={14} /> : <Share2 size={14} />}
              {shareCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#c5a075] text-[#080808] text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded shadow whitespace-nowrap animate-bounce">
                  Copied!
                </span>
              )}
            </button>

            <div className="flex flex-col text-left ml-2">
              <span className="text-[11px] font-mono font-medium text-white/80">{currentPost.likes || 0} Likes</span>
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest mt-0.5">Article Likes</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-white/30 text-[9px] font-mono">
            <MessageSquare size={11} />
            <span>{(currentPost.comments || []).length} Comments</span>
          </div>
        </div>

        {/* Comments Feed List */}
        <div className="space-y-4 mb-8">
          {(!currentPost.comments || currentPost.comments.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/5 rounded bg-white/[0.01]">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">No reflections yet</p>
              <p className="text-[9px] text-white/20 mt-1 max-w-[180px] leading-relaxed">Be the first to share a reflection on this entry.</p>
            </div>
          ) : (
            currentPost.comments.map((comm, idx) => (
              <div key={idx} className="flex flex-col bg-white/[0.01] border border-white/[0.02] p-4 rounded text-left">
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

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3">
            {/* Comment Text Area */}
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Share a reflection on this article..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-[#121216] border border-white/20 focus:border-[#c5a075] focus:ring-1 focus:ring-[#c5a075] rounded px-4 py-3 text-[11.5px] font-normal text-white outline-none placeholder-white/55 transition-all pr-12 text-left"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#c5a075] transition-colors duration-300 w-8 h-8 flex items-center justify-center cursor-pointer"
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
                  className="w-full bg-[#121216] border border-white/20 focus:border-[#c5a075] text-[10.5px] font-normal text-white outline-none px-4 py-2 rounded placeholder-white/45 disabled:opacity-40 transition-all text-left"
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
    </main>
  );
}
