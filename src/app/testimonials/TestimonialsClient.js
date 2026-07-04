'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TestimonialsHero from '@/components/testimonials/TestimonialsHero';
import SpotlightReview from '@/components/testimonials/SpotlightReview';
import TestimonialsGrid from '@/components/testimonials/TestimonialsGrid';
import SubmitReviewForm from '@/components/testimonials/SubmitReviewForm';
import ContactCTA from '@/components/home/ContactCTA';
import { TESTIMONIAL_ITEMS } from '@/data/testimonialsData';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export default function TestimonialsClient() {
  const [activeTab, setActiveTab] = useState('All');
  const [allReviews, setAllReviews] = useState([]);

  // Load approved reviews on mount from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "testimonials_items"), (snapshot) => {
      if (snapshot.empty) {
        TESTIMONIAL_ITEMS.forEach(async (item) => {
          await setDoc(doc(db, "testimonials_items", item.id), item);
        });
      } else {
        setAllReviews(snapshot.docs.map(d => d.data()));
      }
    });

    return () => unsubscribe();
  }, []);

  // Add custom submitted review to the pending approval queue in Firestore
  const handleAddReview = useCallback(async (newReview) => {
    const id = newReview.id || `pending-${Date.now()}`;
    const reviewWithId = {
      ...newReview,
      id
    };
    try {
      await setDoc(doc(db, "pending_testimonials_items", id), reviewWithId);
    } catch (err) {
      console.error("Error submitting pending review to Firestore:", err);
    }
  }, []);

  // Isolate first review for spotlight
  const spotlightReview = useMemo(() => {
    return allReviews[0] || null;
  }, [allReviews]);

  // Filter grid reviews (excluding the spotlight review)
  const gridReviews = useMemo(() => {
    const remaining = spotlightReview 
      ? allReviews.filter(rev => rev.id !== spotlightReview.id)
      : allReviews;
      
    if (activeTab === 'All') {
      return remaining;
    }
    return remaining.filter(rev => rev.category === activeTab);
  }, [activeTab, allReviews, spotlightReview]);

  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Stats Hero Header */}
      <TestimonialsHero totalCount={allReviews.length} />

      <div className="relative w-full max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 flex-1">
        
        {/* 2. Spotlight Review Billboard (at the top of grid) */}
        {spotlightReview && (
          <div className="pt-16">
            <SpotlightReview review={spotlightReview} />
          </div>
        )}

        {/* 3. Categorized Staggered Grid */}
        <TestimonialsGrid 
          reviews={gridReviews}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

      </div>

      {/* 4. Interactive Feedback Submission Panel */}
      <SubmitReviewForm onAddReview={handleAddReview} />

      {/* 5. Booking CTA Banner */}
      <ContactCTA />
    </main>
  );
}
