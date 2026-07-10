'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer completely on Admin panel
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="py-20 bg-background border-t border-divider text-foreground/75 text-xs w-full">
      <div className="w-full px-8 pl-8 md:pl-24 lg:pl-24 lg:pr-16 xl:pr-24 flex flex-col md:flex-row justify-between gap-16 items-start">

        {/* Brand Column (Monogram + Stylized Separator Stack + Address & Slogan) */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center">
            <span className="text-[34px] font-extralight text-foreground leading-none tracking-tight font-serif" style={{ fontFamily: '"Georgia", serif' }}>
              HZ
            </span>
            <div className="h-9 w-[1px] bg-foreground/20 mx-4.5"></div>
            <div className="flex flex-col">
              <span className="text-[13px] tracking-[0.25em] uppercase font-bold text-foreground leading-none">Hanzala</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-foreground/50 mt-1.5 leading-none">Photography</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2 select-none">
            <p className="font-condensed text-[11px] tracking-[0.22em] uppercase text-foreground/60 leading-relaxed">
              Bahawalpur, Punjab, Pakistan
            </p>
            <p className="font-script text-[18px] text-[#c5a075] leading-none mt-1">
              Where light meets emotion.
            </p>
          </div>
        </div>

        {/* Links Columns Group (Title Case link names matching your reference screenshot exactly) */}
        <div className="flex flex-wrap gap-x-20 gap-y-12">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-foreground/80 font-medium">Navigation</h4>
            <ul className="space-y-3.5 flex flex-col">
              <Link href="/" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Home</Link>
              <Link href="/portfolio" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Portfolio</Link>
              <Link href="/services" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Services</Link>
              <Link href="/about" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">About</Link>
              <Link href="/experience" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Experience</Link>
              <Link href="/testimonials" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Testimonials</Link>
              <Link href="/journal" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Journal</Link>
              <Link href="/contact" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Contact</Link>
            </ul>
          </div>

          {/* Column 2: Info */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-foreground/80 font-medium">Info</h4>
            <ul className="space-y-3.5 flex flex-col">
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">FAQ</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Pricing</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Privacy Policy</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Terms of Service</Link>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase mb-6 text-foreground/80 font-medium">Social</h4>
            <ul className="space-y-3.5 flex flex-col">
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Instagram</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Behance</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">YouTube</Link>
              <Link href="#" className="text-[12px] tracking-[0.06em] text-foreground/60 hover:text-accent transition-colors duration-300 font-light">Vimeo</Link>
            </ul>
          </div>
        </div>

        {/* Mini Gallery - clickable to specific categories in full color */}
        <div className="flex gap-2.5 h-[130px] opacity-90 hover:opacity-100 transition-opacity duration-300 group">
          <Link href="/portfolio?category=Landscapes" className="relative block w-[95px] h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-[0.7] hover:brightness-100 hover:scale-105 transition-all duration-500 cursor-pointer" 
              alt="Grey Mountain landscape" 
            />
          </Link>
          <Link href="/portfolio?category=Portraits" className="relative block w-[95px] h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-[0.75] hover:brightness-100 hover:scale-105 transition-all duration-500 cursor-pointer" 
              alt="Moody face silhouette portrait" 
            />
          </Link>
          <Link href="/portfolio?category=Street" className="relative block w-[95px] h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-[0.7] hover:brightness-100 hover:scale-105 transition-all duration-500 cursor-pointer" 
              alt="High-contrast city street silhouette" 
            />
          </Link>
        </div>

      </div>

      {/* Centered Copyright Notice */}
      <div className="w-full mt-24 text-center text-[9px] tracking-[0.35em] uppercase text-foreground/45">
        © 2024 Hanzala Photography. All Rights Reserved.
      </div>
    </footer>
  );
}
