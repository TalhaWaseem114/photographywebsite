'use client';

import React, { useState, useEffect } from 'react';
import { SESSION_PACKAGES, PRICING_CONFIG } from '@/data/servicesData';
import { Check } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export default function PackagesSection() {
  const [activePackages, setActivePackages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "session_packages"), (snapshot) => {
      if (snapshot.empty) {
        SESSION_PACKAGES.forEach(async (item) => {
          await setDoc(doc(db, "session_packages", item.id), item);
        });
      } else {
        setActivePackages(snapshot.docs.map(d => d.data()));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section 
      className="relative bg-black py-16 md:py-24"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 flex flex-col gap-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-6">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            GENRE TARIFFS
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.06em] uppercase text-white font-light">
            SESSION PACKAGES
          </h2>
        </div>
 
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {activePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col bg-[#0c0c0e] border border-white/5 hover:border-[var(--accent)]/30 rounded-md p-6 sm:p-8 hover:bg-[#101013] transition-all duration-500 relative group"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
            >
              {/* Gold card accent */}
              <div className="absolute inset-0 z-20 border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/10 rounded-md pointer-events-none transition-all duration-500" />

              {/* Number and Title */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-[var(--accent)] font-medium tracking-widest">{pkg.num} //</span>
                <span className="bg-white/5 border border-white/10 text-white/60 text-[7px] font-mono tracking-widest px-2.5 py-0.5 rounded">
                  {pkg.timeline}
                </span>
              </div>

              <h3 className="font-display text-[15px] sm:text-[17px] tracking-[0.12em] uppercase text-white leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors">
                {pkg.title}
              </h3>

              <p className="text-[11.5px] leading-[1.8] text-white/40 font-light tracking-wide mb-8 min-h-[66px]">
                {pkg.desc}
              </p>

              {/* Deliverables List */}
              <ul className="flex flex-col gap-3.5 mb-10 flex-1 border-t border-white/5 pt-6 w-full">
                {pkg.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[11.5px] font-light text-white/50 tracking-wide">
                    <Check size={10} className="text-[var(--accent)] mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Price Label */}
              <div className="mt-auto border-t border-white/5 pt-5 w-full flex justify-between items-end">
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Base Investment</span>
                <span className="text-[17px] font-display text-[var(--accent)] font-light leading-none tracking-tight">
                  Rs. {pkg.basePrice.toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
