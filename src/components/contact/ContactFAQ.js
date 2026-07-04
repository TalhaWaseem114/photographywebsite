'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ContactFAQ() {
  const faqs = [
    {
      q: "What types of photography sessions do you offer?",
      a: "I specialize in editorial portraits, architectural documentation, low-light street scenes, and fine art landscape commissions. I also cover commercial branding and high-end events."
    },
    {
      q: "Do you travel for destination shoots or projects?",
      a: "Yes. While I am based in Bahawalpur, Punjab, I travel extensively throughout Pakistan and am available for selective international commissions. Travel logistics and accommodations are calculated in the session proposal."
    },
    {
      q: "How far in advance should I book my session?",
      a: "For portraits and commercial projects, I recommend booking 2–4 weeks in advance. For weddings or large events, 2–6 months is preferred to secure dates and allow adequate pre-planning."
    },
    {
      q: "What is your typical turnaround time for delivering images?",
      a: "Turnaround time ranges from 1 to 3 weeks depending on the scope of the project. Portrait sessions typically receive proofs within 7 days, with finalized graded files delivered shortly after."
    },
    {
      q: "Do you offer physical prints or albums?",
      a: "Yes, fine art prints are available upon request. I print on museum-grade archival cotton rag papers to ensure maximum color stability and texture preservation."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      className="relative bg-black py-20 md:py-28 border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[900px] mx-auto px-8 text-left select-none">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            FAQ MODULE
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.06em] uppercase text-white font-light">
            COMMON INQUIRIES
          </h2>
        </div>

        {/* Accordions Wrapper */}
        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div 
                key={index}
                className="border-b border-white/10 transition-colors py-4 sm:py-5"
              >
                {/* FAQ Header Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 py-2 hover:text-[var(--accent)] text-left cursor-pointer focus:outline-none transition-colors"
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold text-white/95 tracking-wide leading-snug">
                    {faq.q}
                  </span>
                  <span className="text-[var(--accent)] shrink-0 pl-4">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                {/* FAQ Body (Tailwind grid animation for perfect height transitions) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 pb-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[12.5px] leading-[1.9] text-white/45 font-light tracking-wide max-w-[800px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
