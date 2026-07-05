'use client';

export default function EducationSection() {
  return (
    <section id="education-section" className="relative min-h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-background border-t border-divider">

      {/* ─── LEFT SIDE — High-Contrast Architectural Photo ─── */}
      {/* Replaced the wireframe SVG with an atmospheric, dark academic structure matching the reference exactly */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
          alt="Islamia University of Bahawalpur historical campus architecture"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] grayscale contrast-[1.25] brightness-[0.4]"
        />

        {/* Gradient Overlays for smooth blending into the editorial content side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-background z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background md:hidden z-10"></div>
        <div className="absolute inset-0 bg-background/30 z-10"></div>


      </div>

      {/* ─── RIGHT SIDE — Editorial Typographic Content ─── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:pl-8 md:pr-24 lg:pl-16">

        {/* ─── Large 02 with Diagonal Slash ─── */}
        {/* Replicated from section 01 to keep structural unity across your design system */}
        <div className="relative mb-6 w-fit">
          <span className="font-display text-[90px] md:text-[120px] text-foreground/5 font-extralight leading-none select-none">
            02
          </span>
          {/* Diagonal Slash Line */}
          <div className="absolute left-[30px] bottom-[30px] w-[140px] h-[1px] bg-divider -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* Section Heading Label */}
        <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-muted mb-3 block">
          Education
        </span>

        {/* Main University Title */}
        <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[1.05] tracking-[0.04em] uppercase mb-4 text-foreground font-light">
          Islamia University<br />of Bahawalpur
        </h2>

        {/* Timeline Range */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-condensed font-light text-[12px] tracking-[0.25em] text-muted">
            2023
          </span>
          <span className="w-4 h-[1px] bg-[#c5a075]/60"></span>
          <span className="font-condensed font-light text-[12px] tracking-[0.25em] text-muted">
            2027
          </span>
        </div>

        {/* Degree & Major Specification Box */}
        <div className="mb-8 flex flex-col gap-1 select-none">
          <h3 className="font-condensed font-medium text-[13px] tracking-[0.18em] uppercase text-foreground/90">
            Bachelor of Fine Arts
          </h3>
          <h4 className="font-condensed font-medium text-[12px] tracking-[0.18em] uppercase text-[#c5a075]">
            Major in Graphic Design
          </h4>
        </div>

        {/* Structural Description Body */}
        <p className="text-[13px] leading-[2.1] text-muted max-w-[420px] font-light tracking-wide">
          Focused on visual storytelling, photography, digital composition, branding, cinematic aesthetics, and human-centered visual communication.
        </p>

      </div>

    </section>
  );
}