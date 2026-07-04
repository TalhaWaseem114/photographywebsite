'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioFilterBar from '@/components/portfolio/PortfolioFilterBar';
import MasonryGrid from '@/components/portfolio/MasonryGrid';
import ContactCTA from '@/components/home/ContactCTA';
import { PORTFOLIO_ITEMS, CATEGORIES } from '@/data/portfolioData';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export default function PortfolioClient() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState([]);

  // Sync with Firestore on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Sync category from URL param
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam) {
        setActiveCategory(catParam);
      }
    }

    // 2. Setup real-time listener
    const unsubscribe = onSnapshot(collection(db, "portfolio_items"), (snapshot) => {
      if (snapshot.empty) {
        // Seed initial items if database is empty
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

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

  // Find counts for each category
  const getItemCountForCategory = (category) => {
    if (category === 'All') {
      return portfolioItems.length;
    }
    return portfolioItems.filter((item) => item.category === category).length;
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      const targetUrl = category === 'All' ? '/portfolio' : `/portfolio?category=${category}`;
      router.push(targetUrl, { scroll: false });
    }
  };

  const handleCardClick = (item) => {
    router.push(`/portfolio/${item.id}`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* Cinematic Hero Header */}
      <PortfolioHero 
        totalCount={portfolioItems.length} 
        categoriesCount={CATEGORIES.length - 1} 
      />

      {/* Sticky Filter Bar */}
      <PortfolioFilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        getItemCountForCategory={getItemCountForCategory}
      />

      {/* Grid Showcase */}
      <section className="relative w-full max-w-[1700px] mx-auto px-6 md:px-16 lg:px-24 flex-1">
        <MasonryGrid 
          items={filteredItems} 
          onCardClick={handleCardClick} 
        />
      </section>

      {/* Bottom CTA Banner */}
      <ContactCTA />
    </main>
  );
}
