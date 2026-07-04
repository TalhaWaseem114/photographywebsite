'use client';

export default function FeaturedWork() {
  // New, cinematic/moody dummy images to match the vibe
  const works = [
    { num: "01", title: "Landscapes", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
    { num: "02", title: "Portraits", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
    { num: "03", title: "Architecture", img: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop" },
    { num: "04", title: "Street", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section id="featured-section" className="relative w-full bg-black py-24 border-t border-white/5">

      {/* ─── Image Grid ─── */}
      {/* Left padding clears the vertical label. gap-[1px] with a subtle background creates the hairline separators */}
      <div className="pl-6 pr-6 md:pl-[100px] lg:pl-[140px] md:pr-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 w-full border border-white/10">
          {works.map((work, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-black">
              {/* Image */}
              <img
                src={work.img}
                className="absolute inset-0 w-full h-full object-cover grayscale-[85%] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                alt={work.title}
              />

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

              {/* Text Content */}
              <div className="absolute bottom-8 left-8 z-10 flex flex-col">
                <span className="font-condensed text-[10px] tracking-[0.2em] text-white/50 mb-2">
                  {work.num}
                </span>
                <h3 className="font-condensed text-[12px] tracking-[0.3em] uppercase text-white/90">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── View Full Portfolio Button ─── */}
      <div className="flex justify-center mt-20">
        <button className="group flex items-center gap-6 font-condensed text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-300">
          <span className="w-12 h-[1px] bg-white/20 group-hover:bg-[#c5a075] group-hover:w-16 transition-all duration-300"></span>
          View Full Portfolio
          <span className="w-12 h-[1px] bg-white/20 group-hover:bg-[#c5a075] group-hover:w-16 transition-all duration-300"></span>
        </button>
      </div>

    </section>
  );
}