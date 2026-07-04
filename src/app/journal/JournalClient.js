'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import JournalHero from '@/components/journal/JournalHero';
import FeaturedBillboard from '@/components/journal/FeaturedBillboard';
import JournalGrid from '@/components/journal/JournalGrid';
import ContactCTA from '@/components/home/ContactCTA';
import { JOURNAL_POSTS } from '@/data/journalData';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export default function JournalClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('essay');
  const [allPosts, setAllPosts] = useState([]);

  // Sync journal posts from Firestore
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

  // Group posts by type
  const essays = useMemo(() => allPosts.filter(post => post.type === 'essay'), [allPosts]);
  const logs = useMemo(() => allPosts.filter(post => post.type === 'log'), [allPosts]);

  // Isolate the featured post (latest essay)
  const featuredPost = useMemo(() => {
    return essays.find(post => post.id === 'essay-01');
  }, [essays]);

  // Filter grid posts (omit the featured post if we are showing essays)
  const gridPosts = useMemo(() => {
    if (activeTab === 'essay') {
      return essays.filter(post => post.id !== 'essay-01');
    }
    return logs;
  }, [activeTab, essays, logs]);

  const slugify = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleSelectPost = (post) => {
    router.push(`/journal/${slugify(post.title || post.id)}`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Page Hero Header */}
      <JournalHero 
        essayCount={essays.length} 
        logCount={logs.length} 
      />

      <div className="relative w-full max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 flex-1">
        
        {/* 2. Featured Billboard Spotlight (only shown on Essays tab) */}
        {activeTab === 'essay' && featuredPost && (
          <div className="pt-16">
            <FeaturedBillboard 
              post={featuredPost} 
              onRead={() => handleSelectPost(featuredPost)} 
            />
          </div>
        )}

        {/* 3. Grid View with Tab Toggle */}
        <JournalGrid 
          posts={gridPosts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSelectPost={handleSelectPost}
        />

      </div>

      {/* 4. Bottom Booking Banner */}
      <ContactCTA />
    </main>
  );
}
