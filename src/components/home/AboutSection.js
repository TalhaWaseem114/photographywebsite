'use client';

export default function AboutSection() {
  return (
    <section id="about-section" className="relative min-h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-black border-t border-white/10">

      {/* ─── LEFT SIDE — Photographic Background ─── */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden">
        {/* Updated Dummy Photo: High-quality dark silhouette matching your reference exactly */}
        <img
          src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1200&auto=format&fit=crop"
          alt="Photographer Silhouette"
          className="absolute inset-0 w-full h-full object-cover object-[40%_center] grayscale contrast-[1.15] brightness-[0.45]"
        />

        {/* Gradient Overlays for smooth blending */}
        {/* Right fade (blends seamlessly into the black text side) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black z-10"></div>
        {/* Bottom fade (for clean mobile stacking layout) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black md:hidden z-10"></div>
        {/* Subtle vignette layer to compress background edges */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>



        {/* ─── Caption overlay (Bottom Right of Image) ─── */}
        <div className="absolute bottom-16 right-8 md:right-12 text-left z-20 select-none">
          <strong className="block font-condensed font-medium text-[12px] tracking-[0.2em] uppercase text-white/90 leading-relaxed">
            Based in
          </strong>
          <strong className="block font-condensed font-medium text-[12px] tracking-[0.2em] uppercase text-white/90 leading-relaxed mb-1">
            Bahawalpur,
          </strong>
          <span className="block font-condensed font-light text-[11px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
            Available
          </span>
          <span className="block font-condensed font-light text-[11px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
            All Pakistan.
          </span>
        </div>
      </div>

      {/* ─── RIGHT SIDE — Editorial Content ─── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:pl-8 md:pr-24 lg:pl-16">

        {/* ─── Large 01 with Diagonal Slash ─── */}
        <div className="relative mb-6 w-fit">
          <span className="font-display text-[90px] md:text-[120px] text-white/10 font-extralight leading-none select-none">
            01
          </span>
          {/* Diagonal Slash Line */}
          <div className="absolute left-[30px] bottom-[30px] w-[140px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-[0.05em] uppercase mb-8 text-white font-light">
          More Than<br />Just a Picture
        </h2>

        {/* Body Text */}
        <p className="text-[13px] leading-[2.1] text-white/50 max-w-[420px] mb-10 font-light tracking-wide">
          Every frame I capture is shaped by light, emotion and a constant search for something real. I blend creativity with intention to turn moments into timeless visual stories.
        </p>

        {/* About Me Link */}
        <div className="flex flex-col gap-2 cursor-pointer group w-fit">
          <span className="font-condensed text-[10px] tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors">
            About Me
          </span>
          {/* Accent Gold Underline */}
          <span className="block w-8 h-[1px] bg-[#c5a075] opacity-80 group-hover:w-12 transition-all duration-300"></span>
        </div>
      </div>

    </section>
  );
}