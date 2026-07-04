'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    const newSub = {
      email: email,
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    try {
      await addDoc(collection(db, "email_subscriptions_items"), newSub);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error("Error subscribing to newsletter in Firestore:", err);
    }
  };

  return (
    <section id="contact-section" className="relative py-20 md:py-24 bg-black overflow-hidden border-t border-white/10 flex items-center min-h-[400px]">

      {/* ─── Cinematic Background Layer ─── */}
      <img
        src="/images/ctaImg.png"
        alt="Photographer portfolio background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 pointer-events-none select-none"
      />

      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      {/* ─── Layout Wrapper ─── */}
      <div className="relative z-10 w-full mx-auto px-8 py-4 pl-8 md:pl-24 lg:pl-24 lg:pr-16 xl:pr-24">

        {/* ─── Shared 4-Column Grid Layout Engine ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-0 items-center w-full">

          {/* COLUMN 1: Left Pitch Block */}
          <div className="lg:col-span-1 flex flex-col items-start w-full pr-0 lg:pr-8">
            <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-white/40 mb-3 block select-none">
              LET'S CREATE SOMETHING MEANINGFUL
            </span>

            <h2 className="font-display text-[36px] md:text-[46px] font-extralight tracking-[0.06em] uppercase text-white/95 leading-[1.15] mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Antonio', sans-serif" }}>
              READY TO TELL <br />
              YOUR STORY?
            </h2>

            <a 
              href="https://wa.me/03493771741" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#c5a075]/40 hover:border-[#c5a075] bg-black/10 backdrop-blur-[1px] hover:bg-white/[0.02] transition-all duration-300 px-8 py-3.5 group select-none"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/80 group-hover:text-[#c5a075] transition-colors">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="font-condensed text-[11px] font-medium tracking-[0.22em] uppercase text-white/80 group-hover:text-[#c5a075] transition-colors">
                GET IN TOUCH
              </span>
            </a>
          </div>

          {/* COLUMN 2: Empty Space / Void Channel */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* COLUMNS 3 & 4: Widened Newsletter Action Block */}
          <div className="w-full lg:col-span-2 flex flex-col pt-1 lg:pl-16 xl:pl-20">
            <div className="w-full max-w-[460px] lg:ml-auto">
              <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-white/40 mb-3 block select-none">
                STAY INSPIRED
              </span>

              <h3 className="font-display text-[24px] md:text-[30px] font-extralight tracking-[0.1em] uppercase text-white/95 mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Antonio', sans-serif" }}>
                JOIN THE JOURNEY
              </h3>

              <p className="text-white/55 text-[13px] font-light leading-[1.8] tracking-wide mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                Subscribe for exclusive updates, new work and behind the scenes stories.
              </p>

              {/* Extended horizontal input field baseline */}
              <div className="w-full min-h-[40px] flex items-center">
                {submitted ? (
                  <div className="text-[#c5a075] text-xs font-mono tracking-widest uppercase py-2 animate-fade-in">
                    ✓ Subscribed Successfully
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full flex items-center border-b border-white/20 bg-transparent pb-2.5 group focus-within:border-[#c5a075]/85 transition-colors duration-300">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="bg-transparent border-none outline-none text-[13px] font-light tracking-wide w-full text-white/90 placeholder-white/25 focus:ring-0 p-0"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="text-[#c5a075] text-lg hover:text-white transition-colors pl-4 pr-1 select-none transform translate-x-0 hover:translate-x-1 transition-transform duration-300 cursor-pointer"
                    >
                      <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                        <path d="M12 1L17 6M17 6L12 11M17 6H0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}