'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function AboutSection() {
  const [aboutData, setAboutData] = useState({
    subheading: "Who I Am",
    heading: "More Than Just a Picture",
    bio1: "Every frame I capture is shaped by light, emotion and a constant search for something real. I blend creativity with intention to turn moments into timeless visual stories.",
    bio2: "",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1200&auto=format&fit=crop"
  });
  const [contactData, setContactData] = useState({
    address: "Bahawalpur, Pakistan"
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "site_config", "settings"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.about) {
          setAboutData(data.about);
        }
        if (data.contact) {
          setContactData(data.contact);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="about-section" className="relative min-h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-background border-t border-divider">

      {/* ─── LEFT SIDE — Photographic Background ─── */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden">
        <img
          src={aboutData.image || "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1200&auto=format&fit=crop"}
          alt="Photographer Silhouette"
          className="absolute inset-0 w-full h-full object-cover object-[40%_center] grayscale contrast-[1.15] brightness-[0.45]"
        />

        {/* Gradient Overlays for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-background z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background md:hidden z-10"></div>
        <div className="absolute inset-0 bg-background/20 z-10"></div>

        {/* ─── Caption overlay (Bottom Right of Image) ─── */}
        <div className="absolute bottom-16 right-8 md:right-12 text-left z-20 select-none">
          <strong className="block font-condensed font-medium text-[12px] tracking-[0.2em] uppercase text-white/90 leading-relaxed">
            Based in
          </strong>
          <strong className="block font-condensed font-medium text-[12px] tracking-[0.2em] uppercase text-white/90 leading-relaxed mb-1 truncate max-w-[200px]">
            {contactData.address?.split(',')[0] || "Bahawalpur"}
          </strong>
          <span className="block font-condensed font-light text-[11px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
            Available
          </span>
          <span className="block font-condensed font-light text-[11px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
            {contactData.address?.split(',')[1]?.trim() || "All Pakistan"}
          </span>
        </div>
      </div>

      {/* ─── RIGHT SIDE — Editorial Content ─── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:pl-8 md:pr-24 lg:pl-16">

        {/* ─── Large 01 with Diagonal Slash ─── */}
        <div className="relative mb-6 w-fit">
          <span className="font-display text-[90px] md:text-[120px] text-foreground/5 font-extralight leading-none select-none">
            01
          </span>
          {/* Diagonal Slash Line */}
          <div className="absolute left-[30px] bottom-[30px] w-[140px] h-[1px] bg-divider -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-[0.05em] uppercase mb-8 text-foreground font-light">
          {aboutData.heading}
        </h2>

        {/* Body Text */}
        <p className="text-[13px] leading-[2.1] text-muted max-w-[420px] mb-6 font-light tracking-wide">
          {aboutData.bio1}
        </p>

        {aboutData.bio2 && (
          <p className="text-[13px] leading-[2.1] text-muted max-w-[420px] mb-10 font-light tracking-wide">
            {aboutData.bio2}
          </p>
        )}

        {/* About Me Link */}
        <div className="flex flex-col gap-2 cursor-pointer group w-fit">
          <span className="font-condensed text-[10px] tracking-[0.3em] uppercase text-foreground/80 group-hover:text-foreground transition-colors">
            {aboutData.subheading}
          </span>
          {/* Accent Gold Underline */}
          <span className="block w-8 h-[1px] bg-accent opacity-80 group-hover:w-12 transition-all duration-300"></span>
        </div>
      </div>

    </section>
  );
}