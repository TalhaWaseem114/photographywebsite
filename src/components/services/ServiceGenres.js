'use client';

import React from 'react';
import { Camera, Shirt, Briefcase, Award } from 'lucide-react';

const GENRES = [
  {
    icon: Shirt,
    title: "Fashion & Editorial",
    subtitle: "High-end campaigns & lookbooks",
    image: "/images/fashion_service.png",
    desc: "Sculpting visual narratives for apparel designers, fashion models, and creative lookbooks. We focus on dramatic lighting, color gradients, and poses that emphasize texture, fabric motion, and narrative mood.",
    highlights: ["Designer Campaign Shoots", "High-Fashion Lookbooks", "Model Portfolios & Castings", "Outdoor/Studio Setups"]
  },
  {
    icon: Briefcase,
    title: "Product & E-Commerce",
    subtitle: "Premium advertising packshots",
    image: "/images/product_service.png",
    desc: "Clean, high-fidelity commercial shoots showcasing products in studio or curated lifestyles. Essential for luxury goods, cosmetics, and lifestyle brands requiring pixel-perfect detail and high-end styling.",
    highlights: ["Hero Banner Shoots", "E-commerce White Backgrounds", "Lifestyle Product Placement", "Macro Detail Capture"]
  },
  {
    icon: Camera,
    title: "Cinematic & Events",
    subtitle: "Luxury events & milestones",
    image: "/images/event_service.png",
    desc: "Documentary-style event storytelling that captures candid emotions, unposed details, and low-light atmosphere during launches, corporate galas, and bespoke personal milestones.",
    highlights: ["Luxury Event Coverage", "Brand & Product Launches", "Candid Documentary Frames", "Behind-the-Scenes Capture"]
  },
  {
    icon: Award,
    title: "Editorial Portraiture",
    subtitle: "Personal branding dossiers",
    image: "/images/portrait_service.png",
    desc: "Bespoke portraiture that captures character, intellect, and personality. Tailored specifically for authors, corporate directors, creative artists, and executive dossiers.",
    highlights: ["Corporate Headshots", "Artist Portraits", "Natural Light Environmental", "Studio Lighting dossiers"]
  }
];

export default function ServiceGenres() {
  return (
    <section className="bg-black py-16 border-b border-white/5">
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-12">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3 block">
            Core Disciplines
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.06em] uppercase text-white font-light">
            SERVICES WE PROVIDE
          </h2>
          <p className="text-white/40 text-[12px] max-w-xl leading-relaxed mt-2 font-light">
            Each genre is approached with customized pre-production planning, creative styling direction, and premium grading configurations.
          </p>
        </div>

        {/* Grid of Genres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
          {GENRES.map((genre, idx) => {
            const Icon = genre.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#08080a] border border-white/5 p-8 rounded-lg hover:border-[var(--accent)]/45 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Smooth blending service illustration image in top right corner */}
                <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none select-none z-0 rounded-tr-lg overflow-hidden">
                  <img 
                    src={genre.image} 
                    alt="" 
                    className="w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-105 transition-all duration-750"
                    style={{
                      maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
                      WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-10 h-10 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform duration-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg uppercase tracking-wider text-white leading-none">
                        {genre.title}
                      </h3>
                      <span className="text-[10px] uppercase text-white/35 font-mono tracking-widest mt-1 block">
                        {genre.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-[12px] leading-[1.8] text-white/50 font-light tracking-wide mb-6 max-w-md">
                    {genre.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 relative z-10">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
                    {genre.highlights.map((item, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                        {item}
                      </span>
                    ))}
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
