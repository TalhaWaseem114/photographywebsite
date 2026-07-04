'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer completely on Admin panel
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="py-20 bg-black border-t border-white/10 text-white/40 text-xs w-full">
      <div className="w-full px-8 pl-8 md:pl-24 lg:pl-24 lg:pr-16 xl:pr-24 flex flex-col md:flex-row justify-between gap-16 items-start">

        {/* Brand Column (Monogram + Stylized Separator Stack + Address & Slogan) */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center">
            <span className="text-[34px] font-extralight text-white leading-none tracking-tight font-serif" style={{ fontFamily: '"Georgia", serif' }}>
              HZ
            </span>
            <div className="h-9 w-[1px] bg-white/15 mx-4.5"></div>
            <div className="flex flex-col">
              <span className="text-[13px] tracking-[0.25em] uppercase font-bold text-white leading-none">Hanzala</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-white/35 mt-1.5 leading-none">Photography</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2 select-none">
            <p className="font-condensed text-[11px] tracking-[0.22em] uppercase text-white/50 leading-relaxed">
              Bahawalpur, Punjab, Pakistan
            </p>
            <p className="font-script text-[18px] text-[#c5a075]/90 leading-none mt-1">
              Where light meets emotion.
            </p>
          </div>
        </div>

        {/* Links Columns Group (Title Case link names matching your reference screenshot exactly) */}
        <div className="flex flex-wrap gap-x-20 gap-y-12">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-white/30 font-medium">Navigation</h4>
            <ul className="space-y-3.5 flex flex-col">
              <a href="/" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Home</a>
              <a href="/portfolio" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Portfolio</a>
              <a href="/services" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Services</a>
              <a href="/about" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">About</a>
              <a href="/experience" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Experience</a>
              <a href="/testimonials" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Testimonials</a>
              <a href="/journal" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Journal</a>
              <a href="/contact" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Contact</a>
            </ul>

          </div>


          {/* Column 2: Info */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-white/30 font-medium">Info</h4>
            <ul className="space-y-3.5 flex flex-col">
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">FAQ</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Pricing</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Privacy Policy</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Terms of Service</a>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-white/30 font-medium">Social</h4>
            <ul className="space-y-3.5 flex flex-col">
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Instagram</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Behance</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">YouTube</a>
              <a href="#" className="text-[12px] tracking-[0.06em] text-white/45 hover:text-white transition-colors duration-300 font-light">Vimeo</a>
            </ul>
          </div>
        </div>

        {/* Mini Gallery (Tall portrait-aspect ratio pictures matching the reference exactly) */}
        <div className="flex gap-2.5 h-[130px] opacity-75 hover:opacity-100 transition-opacity duration-300 group">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop" 
            className="w-[95px] h-full object-cover filter grayscale contrast-[1.1] brightness-[0.7] hover:grayscale-0 hover:brightness-100 transition-all duration-500 cursor-pointer" 
            alt="Grey Mountain landscape" 
          />
          <img 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" 
            className="w-[95px] h-full object-cover filter grayscale contrast-[1.1] brightness-[0.65] hover:grayscale-0 hover:brightness-100 transition-all duration-500 cursor-pointer" 
            alt="Moody face silhouette portrait" 
          />
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&auto=format&fit=crop" 
            className="w-[95px] h-full object-cover filter grayscale contrast-[1.1] brightness-[0.7] hover:grayscale-0 hover:brightness-100 transition-all duration-500 cursor-pointer" 
            alt="High-contrast city street silhouette" 
          />
        </div>

      </div>

      {/* Centered Copyright Notice */}
      <div className="w-full mt-24 text-center text-[9px] tracking-[0.35em] uppercase text-white/20">
        © 2024 Hanzala Photography. All Rights Reserved.
      </div>
    </footer>
  );
}
