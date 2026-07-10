'use client';

import Link from 'next/link';

export default function FeaturedWork() {
  // New, cinematic/moody dummy images to match the vibe
  const works = [
    { num: "01", title: "Landscapes", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
    { num: "02", title: "Portraits", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
    { num: "03", title: "Architecture", img: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop" },
    { num: "04", title: "Street", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section id="featured-section" className="relative w-full bg-background py-24">

      {/* ─── Gray Gradient Divider Line ─── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50 z-30"></div>

      {/* ─── Image Grid ─── */}
      {/* Left padding clears the vertical label. gap-[1px] with a subtle background creates the hairline separators */}
      <div className="pl-6 pr-6 md:pl-[100px] lg:pl-[140px] md:pr-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-foreground/10 w-full border border-divider">
          {works.map((work, index) => (
            <Link href={`/portfolio?category=${work.title}`} key={index} className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-background block">
              {/* Image */}
              <img
                src={work.img}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                alt={work.title}
              />

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

              {/* Text Content */}
              <div className="absolute bottom-8 left-8 z-10 flex flex-col">
                <span className="font-condensed text-[10px] tracking-[0.2em] text-muted mb-2">
                  {work.num}
                </span>
                <h3 className="font-condensed text-[12px] tracking-[0.3em] uppercase text-foreground/90">
                  {work.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── View Full Portfolio Button ─── */}
      <div className="flex justify-center mt-20">
        <Link href="/portfolio" className="group flex items-center gap-5 border border-divider hover:border-accent px-8 py-4 transition-all duration-300 bg-background hover:bg-accent/[0.05]">
          <span className="w-8 h-[1px] bg-foreground/30 group-hover:bg-accent group-hover:w-12 transition-all duration-300"></span>
          <span className="font-condensed text-[11px] tracking-[0.3em] uppercase text-foreground/80 group-hover:text-accent transition-colors">
            View Full Portfolio
          </span>
          <span className="w-8 h-[1px] bg-foreground/30 group-hover:bg-accent group-hover:w-12 transition-all duration-300"></span>
        </Link>
      </div>

    </section>
  );
}