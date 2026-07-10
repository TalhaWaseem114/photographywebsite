'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <section id="about-section" className="relative min-h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-background">
      
      {/* ─── Golden Gradient Divider Line ─── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a075] to-transparent opacity-60 z-30"></div>

      {/* ─── LEFT SIDE — Photographic Background ─── */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden">
        <img
          src="/images/ctaImg.png"
          alt="Photographer Silhouette"
          className="absolute inset-0 w-full h-full object-cover object-[40%_center] grayscale contrast-[1.1] brightness-[0.7]"
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
          {aboutData.heading || "Hanzala Photographer"}
        </h2>

        {/* Body Text */}
        <p className="text-[14px] leading-[2.1] text-muted max-w-[420px] mb-6 font-light tracking-wide">
          I am a visual artist and photographer. For me, <strong className="font-semibold text-foreground">every frame is a search for something real</strong>. I focus on the delicate balance of light, shadow, and genuine human connection.
        </p>

        <p className="text-[14px] leading-[2.1] text-muted max-w-[420px] mb-10 font-light tracking-wide">
          With a deep love for editorial and documentary styles, I blend minimal aesthetics with intention to <strong className="font-semibold text-foreground">craft visual stories that last</strong>.
        </p>

        {/* About Me Link */}
        <Link href="/about" className="group flex items-center gap-5 border border-divider hover:border-accent px-8 py-4 transition-all duration-300 w-fit mt-2 bg-foreground/[0.02] hover:bg-accent/[0.05]">
          <span className="font-condensed text-[11px] tracking-[0.3em] uppercase text-foreground/80 group-hover:text-accent transition-colors">
            {aboutData.subheading || "Read Full Bio"}
          </span>
          <span className="w-8 h-[1px] bg-foreground/30 group-hover:bg-accent group-hover:w-12 transition-all duration-300"></span>
        </Link>
      </div>

    </section>
  );
}