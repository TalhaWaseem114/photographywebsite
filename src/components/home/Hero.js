'use client';

import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(1); // Default to 02 like the reference image
  const [heroData, setHeroData] = useState({
    subtitle: "I don't take photos.",
    title1: "I CAPTURE",
    title2: "STORIES",
    paragraph: "Photography for me is **not looking, it's feeling**. If you can't **feel** what you're looking at, then you're never going to get others to **feel anything** when they look at your pictures.",
    image: "/images/hero.png",
    signature: "Hanzala",
    signatureSubtitle: "Hanzala Portfolio",
    signatureRole: "Photographer"
  });

  // Sync with Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "site_config", "settings"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.hero) {
          setHeroData(prev => ({
            ...prev,
            image: data.hero.image || prev.image
          }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Helper to parse **bold** text format dynamically
  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev % 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToShowreel = () => {
    const el = document.getElementById('showreel-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative h-[115vh] w-full overflow-hidden bg-background text-foreground selection:bg-foreground/20">

      {/* ─── Background Flower Image ─── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.33] mix-blend-screen bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url("/images/heroFlower.png")' }}
      ></div>

      {/* ─── SCROLL TO EXPLORE (Bottom Left Vertical Text & Divider Line) ─── */}
      <div className="absolute left-10 bottom-8 z-20 hidden md:flex flex-col items-center gap-6">
        <span
          className="text-[9px] tracking-[0.45em] uppercase text-muted font-light"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          Scroll to Explore
        </span>
        {/* Sleek Vertical Accent Line */}
        <div className="w-[1px] h-24 bg-white/30"></div>
      </div>

      {/* ─── Main Content — Side-by-Side Flex Layout ─── */}
      <div className="relative z-10 h-full max-w-[1700px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 pt-20 -translate-y-6 md:-translate-y-12">

        {/* ─── Left Side: Text Content Column ─── */}
        <div className="flex-1 flex flex-col justify-center max-w-[650px] z-10">

          {/* Subtitle & Diagonal Line Section */}
          <div className="relative pl-12 mb-6">
            {/* Top-Left Accent Diagonal Line (Longer & More Subtle) */}
            <div className="absolute left-[-80px] top-[30px] w-36 h-[1px] bg-foreground/25 -rotate-45 transform origin-left"></div>
            <p className="text-[12px] tracking-[0.45em] uppercase text-muted font-light">
              {heroData.subtitle}
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-display uppercase text-foreground mb-10 leading-[1.1] tracking-[0.18em]"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.4rem)',
              fontFamily: "'Antonio', var(--font-display), sans-serif",
              fontWeight: 100
            }}
          >
            {heroData.title1}<br />
            <span className="tracking-[0.16em]" style={{ fontWeight: 100 }}>{heroData.title2}</span>
          </h1>

          {/* Paragraph */}
          <p className="text-foreground/80 text-[14px] leading-[2.1] mb-12 max-w-[380px] font-light tracking-wide">
            {renderFormattedText(heroData.paragraph)}
          </p>

          {/* Corner Bracket Portfolio Button */}
          <div className="relative w-fit px-8 py-4.5 cursor-pointer group transition-all duration-500 ease-out hover:scale-[1.03] active:scale-[0.98] bg-transparent select-none">
            {/* Subtle glow / background fade on hover */}
            <div className="absolute inset-0 bg-foreground/[0.01] group-hover:bg-[#c5a075]/6 backdrop-blur-[1px] transition-all duration-500 ease-out pointer-events-none"></div>

            {/* Brackets - moving outward and turning gold on hover */}
            <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-foreground/25 group-hover:border-[#c5a075] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500 ease-out"></span>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-foreground/25 group-hover:border-[#c5a075] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500 ease-out"></span>
            <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-foreground/25 group-hover:border-[#c5a075] group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-all duration-500 ease-out"></span>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-foreground/25 group-hover:border-[#c5a075] group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-all duration-500 ease-out"></span>

            <span className="relative z-10 text-[10px] font-semibold tracking-[0.35em] uppercase text-foreground/70 group-hover:text-foreground transition-all duration-500 ease-out group-hover:tracking-[0.42em] block whitespace-nowrap">
              View Portfolio
            </span>
          </div>

        </div>

        {/* ─── Right Side: Image Element Column ─── */}
        <div className="w-full md:w-[52%] lg:w-[48%] flex items-center justify-center z-10 mr-12 lg:mr-24">
          <img
            src={heroData.image || "/images/hero.png"}
            alt="Showcase portrait"
            className="w-full h-auto object-contain transition-all duration-700 ease-in-out"
          />
        </div>

      </div>

      {/* ─── Elegant Signature Layer (Positioned to the left of the vertical controls) ─── */}
      <div className="absolute bottom-36 right-4 z-20 text-right hidden lg:block">
        <p className="font-script text-[48px] text-[#c5a075] mb-1 leading-none tracking-normal">
          {heroData.signature}
        </p>
        <div className="flex flex-col items-end border-t border-divider pt-1.5 mt-1">
          <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-foreground/70">{heroData.signatureSubtitle}</span>
          <span className="text-[7px] tracking-[0.3em] uppercase text-muted mt-0.5">{heroData.signatureRole}</span>
        </div>
      </div>

      {/* ─── Right Sidebar Controls (Pagination & Actions Stacked Vertically with Expanded Spacing) ─── */}
      <div className="absolute right-8 top-0 bottom-0 z-20 flex flex-col justify-center items-center gap-8 hidden md:flex w-24 -translate-y-12">

        {/* Watch Showreel Circle Button with Golden Border & Wave Ripple Effects */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={scrollToShowreel}
            className="relative w-12 h-12 rounded-full border-2 border-[#c5a075]/60 hover:border-[#c5a075] flex items-center justify-center bg-background/60 backdrop-blur-xs transition-all duration-300 group"
          >
            {/* Ethereal Golden Wave Ripples */}
            <style>{`
              @keyframes waveOut {
                0% { transform: scale(1); opacity: 0.85; }
                100% { transform: scale(2.0); opacity: 0; }
              }
              .showreel-wave-1 {
                animation: waveOut 2.4s infinite cubic-bezier(0.1, 0.8, 0.25, 1);
              }
              .showreel-wave-2 {
                animation: waveOut 2.4s infinite cubic-bezier(0.1, 0.8, 0.25, 1) 0.8s;
              }
              .showreel-wave-3 {
                animation: waveOut 2.4s infinite cubic-bezier(0.1, 0.8, 0.25, 1) 1.6s;
              }
            `}</style>

            <div className="absolute inset-0 rounded-full border-2 border-[#c5a075]/45 bg-[#c5a075]/10 showreel-wave-1 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full border border-[#c5a075]/30 bg-[#c5a075]/6 showreel-wave-2 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full border border-[#c5a075]/15 bg-[#c5a075]/3 showreel-wave-3 pointer-events-none"></div>

            <Play className="w-3.5 h-3.5 text-foreground group-hover:text-[#c5a075] ml-0.5 group-hover:scale-110 transition-all duration-300" fill="currentColor" />
          </button>
          <span className="text-[8px] tracking-[0.25em] uppercase text-muted font-light text-center whitespace-nowrap mt-1">
            Watch Showreel
          </span>
        </div>

        {/* Thin vertical separator line (positioned below the play button extending down) */}
        <div className="w-[1px] h-40 bg-white/20 mt-4"></div>

      </div>
    </section>
  );
}