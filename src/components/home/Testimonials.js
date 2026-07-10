'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Working with Hanzala was an incredible experience. He has a rare talent for making you feel comfortable and capturing real, unposed moments.",
    author: "AISHA KHAN",
    role: "FASHION COUTURE DESIGNER"
  },
  {
    quote: "Hanzala's eye for detail, shadow play, and visual storytelling is unmatched. The photos exceeded our expectations in every way.",
    author: "ZEESHAN MALIK",
    role: "BRAND CREATIVE DIRECTOR"
  },
  {
    quote: "Professional, creative and truly passionate about his craft. The final images speak for themselves.",
    author: "MARIA FATIMA",
    role: "EVENT COORDINATOR"
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Sync with Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "testimonials_items"), (snapshot) => {
      if (!snapshot.empty) {
        setTestimonials(snapshot.docs.map(doc => doc.data()));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setAnimate(true);
    }, 150);
  };

  const handlePrev = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setAnimate(true);
    }, 150);
  };

  // Get active testimonials (slide window of 3 items for desktop)
  const getVisibleTestimonials = () => {
    const items = [];
    const count = Math.min(3, testimonials.length);
    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      items.push(testimonials[idx]);
    }
    return items;
  };

  const visibleItems = getVisibleTestimonials();

  return (
    <section id="testimonials-section" className="relative min-h-[450px] w-full bg-background overflow-hidden py-24">
      {/* ─── Gray Gradient Divider Line ─── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50 z-30"></div>

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 px-6 md:px-16 lg:px-24 gap-12 lg:gap-0 lg:divide-x lg:divide-divider">
        {/* ─── COLUMN 1: Editorial Header Section ─── */}
        <div className="flex flex-col justify-between pr-0 lg:pr-8 h-full min-h-[200px] lg:min-h-auto">
          <div>
            <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-accent mb-3 block">
              KIND WORDS
            </span>
            <h2 className="font-display text-[32px] md:text-[40px] leading-[1.05] tracking-[0.05em] uppercase text-foreground font-light">
              CLIENT<br />TESTIMONIALS
            </h2>
          </div>

          <div className="flex flex-col gap-6 mt-8 lg:mt-0 select-none">
            {/* Slide Index indicator */}
            <div className="font-condensed text-[11px] tracking-[0.25em] text-muted uppercase">
              Page <span className="text-foreground font-semibold">{(currentIndex + 1).toString().padStart(2, '0')}</span> / {testimonials.length.toString().padStart(2, '0')}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handlePrev}
                className="text-muted hover:text-accent transition-colors duration-300 group p-2.5 border border-divider hover:border-accent rounded-full flex items-center justify-center cursor-pointer bg-background/5"
                title="Previous Slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform translate-x-0 group-hover:-translate-x-0.5 transition-transform">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="text-muted hover:text-accent transition-colors duration-300 group p-2.5 border border-divider hover:border-accent rounded-full flex items-center justify-center cursor-pointer bg-background/5"
                title="Next Slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform translate-x-0 group-hover:translate-x-0.5 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ─── COLUMNS 2-4: Smooth Carousel Grid ─── */}
        <div className={`lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-divider/70 transition-all duration-300 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          {visibleItems.map((item, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-8 xl:pl-10 lg:pr-6 group"
            >
              {/* Top Anchor: Large quote decoration */}
              <div className="text-accent/20 font-serif text-[64px] leading-none mb-2 select-none group-hover:text-accent/40 transition-colors duration-500">
                “
              </div>

              {/* Testimonial Quote */}
              <p className="text-[13.5px] leading-[2] text-muted font-light tracking-wide mb-8 max-w-[340px] lg:max-w-none group-hover:text-foreground/90 transition-colors duration-300">
                {item.quote}
              </p>

              {/* Author Meta */}
              <div className="mt-auto flex flex-col gap-1 select-none">
                <h4 className="text-[12px] font-condensed font-medium tracking-[0.2em] text-foreground/90 uppercase">
                  {item.author}
                </h4>
                <h5 className="text-[9.5px] font-condensed font-medium tracking-[0.2em] text-accent">
                  {item.role}
                </h5>

                {/* Animated Accent Underline */}
                <div className="w-8 h-[1px] bg-accent/40 group-hover:w-16 transition-all duration-500 mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}