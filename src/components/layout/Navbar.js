'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar completely on Admin panel
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Trigger dynamic top-reveal navbar only after scrolling 700px
      setScrolled(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'EXPERIENCE', path: '/experience' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'JOURNAL', path: '/journal' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      {/* ─── 1. Absolute top navbar (Visible at the very top, scrolls out of view naturally) ─── */}
      <header
        className={`absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-12 py-6 transition-all duration-300 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Logo Branding */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-medium tracking-[0.15em] uppercase font-display" style={{ fontFamily: "'Antonio', sans-serif" }}>
              <span className="text-white/40 group-hover:text-white transition-colors duration-300">.</span>HZ
            </span>
            <div className="flex flex-col ml-2 border-l border-white/10 pl-2">
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/90">Hanzala</span>
              <span className="text-[7.5px] tracking-[0.3em] uppercase text-white/40 mt-0.5">Photography</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[12px] tracking-[0.28em] transition-all duration-300 font-medium ${
                  isActive
                    ? 'text-white border-b border-white/60 pb-1.5'
                    : 'text-white/40 hover:text-white/90'
                }`}
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Animated Burger Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-7 h-7 flex flex-col justify-center items-end gap-[6.5px] cursor-pointer group z-[60] focus:outline-none"
          aria-label="Toggle navigation menu overlay"
        >
          <div className={`h-[1px] bg-white transition-all duration-350 ${menuOpen ? 'w-full rotate-45 translate-y-[3.8px]' : 'w-full'}`}></div>
          <div className={`h-[1px] bg-white transition-all duration-350 ${menuOpen ? 'w-full -rotate-45 -translate-y-[3.8px]' : 'w-4/5 group-hover:w-full'}`}></div>
        </button>
      </header>

      {/* ─── 2. Fixed Glassmorphic navbar (Slides down from top after scrolling 700px) ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-12 py-4 transition-all duration-500 ${
          scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(5, 5, 5, 0.75)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Logo Branding */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-medium tracking-[0.15em] uppercase font-display" style={{ fontFamily: "'Antonio', sans-serif" }}>
              <span className="text-white/40 group-hover:text-white transition-colors duration-300">.</span>HZ
            </span>
            <div className="flex flex-col ml-2 border-l border-white/10 pl-2">
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/90">Hanzala</span>
              <span className="text-[7.5px] tracking-[0.3em] uppercase text-white/40 mt-0.5">Photography</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[12px] tracking-[0.28em] transition-all duration-300 font-medium ${
                  isActive
                    ? 'text-white border-b border-white/60 pb-1.5'
                    : 'text-white/40 hover:text-white/90'
                }`}
                style={{ fontFamily: "'Antonio', sans-serif" }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Animated Burger Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-7 h-7 flex flex-col justify-center items-end gap-[6.5px] cursor-pointer group z-[60] focus:outline-none"
          aria-label="Toggle navigation menu overlay"
        >
          <div className={`h-[1px] bg-white transition-all duration-350 ${menuOpen ? 'w-full rotate-45 translate-y-[3.8px]' : 'w-full'}`}></div>
          <div className={`h-[1px] bg-white transition-all duration-350 ${menuOpen ? 'w-full -rotate-45 -translate-y-[3.8px]' : 'w-4/5 group-hover:w-full'}`}></div>
        </button>
      </header>

      {/* ─── 3. Fullscreen Navigation Overlay Drawer (Sliding Menu Panel) ─── */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end transition-all duration-500 ease-in-out
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`w-full max-w-[480px] bg-[#08080a] h-full border-l border-white/5 flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-transform duration-500 ease-out
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Area inside overlay */}
          <div className="flex justify-between items-center select-none pt-4">
            <span className="text-[12px] font-mono tracking-[0.25em] text-white/30 uppercase">
              INDEX LEDGER
            </span>
          </div>

          {/* Staggered Vertical Menu List */}
          <nav className="flex flex-col gap-5 sm:gap-6 select-none my-auto text-left">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-display text-[22px] sm:text-[28px] tracking-[0.18em] uppercase flex items-center group transition-all duration-300 w-fit
                    ${isActive ? 'text-[var(--accent)] font-semibold' : 'text-white/40 hover:text-white hover:translate-x-1.5'}`}
                  style={{ fontFamily: "'Antonio', sans-serif" }}
                >
                  <span className={`text-[9px] font-mono mr-4 select-none transition-colors
                    ${isActive ? 'text-[var(--accent)]/50' : 'text-white/10 group-hover:text-[var(--accent)]/50'}`}>
                    0{idx + 1}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer Metadata & Social Links */}
          <div className="flex flex-col gap-6 text-left border-t border-white/5 pt-8">
            <div className="flex flex-col gap-1 text-[8.5px] font-mono text-white/30 uppercase tracking-[0.18em]">
              <span>BAHAWALPUR, PK — AVAILABLE WORLDWIDE</span>
              <span className="text-[var(--accent)] text-[9px] mt-1">
                +92 349 3771741 · INFO@HANZALA.CO
              </span>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4.5 select-none">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href="https://wa.me/03493771741" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
