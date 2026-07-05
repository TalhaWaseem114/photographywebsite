'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Working with Hanzala was an incredible experience. He has a rare talent for making you feel comfortable and capturing real, unposed moments.",
      author: "AISHA KHAN",
      role: "FASHION COUTURE DESIGNER"
    },
    {
      quote: "Hanzala's eye for detail, shadow play, and visual storytelling is unmatched. The photos exceeded our expectations in every way.",
      author: "ZEESHAN MALIK",
      role: "BRAND CREATIVE DIRECTOR"
    },
    {
      quote: "Professional, creative and truly passionate about his craft. The final images speak for themselves.",
      author: "MARIA FATIMA",
      role: "EVENT COORDINATOR"
    }
  ];

  return (
    <section id="testimonials-section" className="relative min-h-[400px] w-full bg-background overflow-hidden border-t border-divider">

      {/* ─── Main Content Grid ─── */}
      {/* 4 columns on large screens: 1 for Header info, 3 for testimonials */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 px-8 py-20 pl-8 md:pl-24 lg:pl-24 lg:pr-16 xl:pr-24 gap-12 lg:gap-0 lg:divide-x lg:divide-divider">

        {/* ─── COLUMN 1: Editorial Header Section ─── */}
        <div className="flex flex-col justify-between pr-0 lg:pr-8 h-full min-h-[160px] lg:min-h-auto">
          <div>
            {/* Minimal section indicator */}
            <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-muted mb-3 block">
              KIND WORDS
            </span>
            {/* Big stacked heading layout */}
            <h2 className="font-display text-[32px] md:text-[38px] leading-[1.05] tracking-[0.05em] uppercase text-foreground font-light">
              CLIENT<br />TESTIMONIALS
            </h2>
          </div>

          {/* Minimal Navigation Arrows */}
          <div className="flex items-center gap-6 mt-8 lg:mt-0 select-none">
            <button className="text-muted hover:text-foreground transition-colors duration-300 group">
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="transform translate-x-0 group-hover:-translate-x-1 transition-transform">
                <path d="M6 1L1 6M1 6L6 11M1 6H24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="text-muted hover:text-foreground transition-colors duration-300 group">
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                <path d="M18 1L23 6M23 6L18 11M23 6H0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── COLUMNS 2-4: Clean Grid Columns for Testimonials ─── */}
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full pt-2 lg:pt-0 lg:pl-8 xl:pl-10 lg:pr-4 first:pl-0 border-t border-divider lg:border-t-0"
          >
            {/* Top Anchor: Elegant Gold Quotation Symbol */}
            <div className="text-[#c5a075]/70 font-serif text-3xl leading-none mb-4 select-none">
              “
            </div>

            {/* Testimonial Quote Content Paragraph */}
            <p className="text-[13px] leading-[1.9] text-muted font-light tracking-wide mb-8 max-w-[340px] lg:max-w-none">
              {item.quote}
            </p>

            {/* Bottom Anchor: Author Meta Layout and Gold Accent Line */}
            <div className="mt-auto flex flex-col gap-1.5 select-none pb-1">
              <h4 className="text-[12px] font-condensed font-medium tracking-[0.18em] text-foreground/90">
                {item.author}
              </h4>
              <h5 className="text-[10px] font-condensed font-medium tracking-[0.18em] text-[#c5a075]">
                {item.role}
              </h5>

              {/* Minimal Accent Underlying Tracker Graphic Rule */}
              <div className="w-6 h-[1px] bg-[#c5a075]/50 mt-2"></div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}