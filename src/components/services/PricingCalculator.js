'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SESSION_PACKAGES, PRICING_CONFIG } from '@/data/servicesData';
import { MessageSquare, Hourglass, Check } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export default function PricingCalculator() {
  const [activePackages, setActivePackages] = useState([]);
  const [activeConfig, setActiveConfig] = useState(PRICING_CONFIG);
  const [selectedPackageId, setSelectedPackageId] = useState('pkg-01');
  const [hours, setHours] = useState(2);
  const [addons, setAddons] = useState({
    prints: false,
    rush: false,
    film: false
  });

  // Sync pricing data from Firestore
  useEffect(() => {
    const unsubPkgs = onSnapshot(collection(db, "session_packages"), (snapshot) => {
      if (snapshot.empty) {
        SESSION_PACKAGES.forEach(async (item) => {
          await setDoc(doc(db, "session_packages", item.id), item);
        });
      } else {
        setActivePackages(snapshot.docs.map(d => d.data()));
      }
    });

    const unsubConfig = onSnapshot(doc(db, "pricing_config", "current"), (docSnap) => {
      if (!docSnap.exists()) {
        setDoc(doc(db, "pricing_config", "current"), PRICING_CONFIG);
      } else {
        setActiveConfig(docSnap.data());
      }
    });

    return () => {
      unsubPkgs();
      unsubConfig();
    };
  }, []);

  // Find selected package details
  const selectedPackage = useMemo(() => {
    return activePackages.find(pkg => pkg.id === selectedPackageId);
  }, [selectedPackageId, activePackages]);

  // Sync hours state when package changes (set to base hours of that package)
  useEffect(() => {
    if (selectedPackage) {
      setHours(selectedPackage.baseHours);
    }
  }, [selectedPackageId, selectedPackage]);

  // Calculate pricing total
  const totalPrice = useMemo(() => {
    if (!selectedPackage) return 0;
    
    let total = selectedPackage.basePrice;
    
    // Calculate extra hours cost (only if hours selected exceed base hours)
    if (hours > selectedPackage.baseHours) {
      const extraHours = hours - selectedPackage.baseHours;
      total += extraHours * activeConfig.hourlyRate;
    }
    
    // Addons
    if (addons.prints && activeConfig.addons?.prints) total += activeConfig.addons.prints.price;
    if (addons.rush && activeConfig.addons?.rush) total += activeConfig.addons.rush.price;
    if (addons.film && activeConfig.addons?.film) total += activeConfig.addons.film.price;
    
    return total;
  }, [selectedPackage, hours, addons, activeConfig]);

  const handleAddonChange = (addonKey) => {
    setAddons(prev => ({
      ...prev,
      [addonKey]: !prev[addonKey]
    }));
  };

  // WhatsApp prefilled message builder
  const whatsappUrl = useMemo(() => {
    if (!selectedPackage) return '#';
    
    const activeAddonsList = [];
    if (addons.prints) activeAddonsList.push("Archival Prints");
    if (addons.rush) activeAddonsList.push("Rush Delivery");
    if (addons.film) activeAddonsList.push("Film Capture");
    
    const addonsText = activeAddonsList.length > 0 
      ? `\n- Add-ons: ${activeAddonsList.join(', ')}`
      : '';

    const text = `Hi Hanzala, I am interested in booking a session:
- Package: ${selectedPackage.title}
- Duration: ${hours} Hours
- Estimated Price: Rs. ${totalPrice.toLocaleString()}${addonsText}

Please let me know your availability for further discussion.`;
    
    return `https://wa.me/03493771741?text=${encodeURIComponent(text)}`;
  }, [selectedPackage, hours, addons, totalPrice]);

  return (
    <section 
      className="relative bg-black py-20 border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 flex flex-col gap-12 w-full text-left">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-6">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            ESTIMATOR
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.06em] uppercase text-white font-light">
            PRICING CALCULATOR
          </h2>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">
          
          {/* LEFT PANEL: Inputs Console (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-8 bg-[#0c0c0e] border border-white/5 rounded-md p-6 sm:p-10 relative">
            <span className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/10" />
            <span className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/10" />

            {/* 1. Choose Package */}
            <div className="flex flex-col gap-3">
              <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">1. Select Package Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {activePackages.map((pkg) => {
                  const isActive = selectedPackageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`px-3 py-3 rounded border text-[8.5px] font-condensed tracking-widest uppercase transition-all duration-300 cursor-pointer
                        ${isActive
                          ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10 font-semibold'
                          : 'border-white/10 text-white/45 hover:text-white hover:border-white/20'}`}
                    >
                      {pkg.title.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Hours Slider */}
            {selectedPackage && (
              <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                <div className="flex justify-between items-center w-full">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">2. Duration Coverage</label>
                  <span className="font-mono text-[11px] text-[var(--accent)] font-semibold flex items-center gap-1.5 leading-none">
                    <Hourglass size={10} />
                    {hours} Hours Selected
                  </span>
                </div>
                
                {/* Custom Slider */}
                <div className="flex flex-col gap-2 w-full pt-2">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    style={{ accentColor: '#c5a075' }}
                  />
                  <div className="flex justify-between text-[8px] font-mono text-white/20 select-none">
                    <span>1 HR</span>
                    <span>2 HRS</span>
                    <span>3 HRS</span>
                    <span>4 HRS</span>
                    <span>5 HRS</span>
                    <span>6 HRS</span>
                    <span>7 HRS</span>
                    <span>8 HRS (MAX)</span>
                  </div>
                  {hours < selectedPackage.baseHours && (
                    <span className="text-[9px] font-mono text-amber-500/80 mt-1 select-none">
                      * Minimum recommended duration for this package is {selectedPackage.baseHours} hours.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 3. Choose Addons Checkboxes */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-6 w-full">
              <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">3. Choose Add-on Inclusions</label>
              <div className="flex flex-col gap-3.5 w-full pt-1">
                {Object.entries(activeConfig.addons || {}).map(([key, addon]) => {
                  const isChecked = addons[key];
                  return (
                    <label 
                      key={key} 
                      className="flex items-center justify-between p-4 rounded bg-black/40 border border-white/5 hover:border-white/10 cursor-pointer select-none transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAddonChange(key)}
                          className="w-4 h-4 bg-[#08080a] border border-white/20 rounded focus:ring-0 focus:ring-offset-0 text-[var(--accent)] shrink-0 accent-[var(--accent)] cursor-pointer"
                        />
                        <span className="text-[11.5px] font-light text-white/60 tracking-wide">{addon.label}</span>
                      </div>
                      <span className="text-[11.5px] font-mono text-[var(--accent)]">+Rs. {addon.price.toLocaleString()}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Output Estimator (col-span-5) */}
          <div 
            className="lg:col-span-5 flex flex-col justify-center items-start text-left bg-[#0c0c0e] border border-white/5 rounded-md p-8 md:p-12 relative w-full lg:min-h-[460px]"
            style={{ boxShadow: '0 20px 45px rgba(0,0,0,0.55)' }}
          >
            {/* Ambient gold inner frame */}
            <div className="absolute inset-0 z-20 border border-[var(--accent)]/5 rounded pointer-events-none" />

            <div className="flex flex-col gap-1.5 w-full mb-10">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">TARIFF_CALCULATION</span>
              <h3 className="font-display text-[20px] text-white font-light tracking-[0.08em] uppercase leading-none">
                ESTIMATED INVESTMENT
              </h3>
            </div>

            {/* Total Price Display */}
            <div className="flex flex-col gap-1 w-full pb-8 mb-8 border-b border-white/5">
              <span className="text-[32px] sm:text-[38px] font-display text-[var(--accent)] font-light leading-none tracking-tight">
                Rs. {totalPrice.toLocaleString()}
              </span>
              <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mt-2.5">
                ESTIMATED FOR {hours} HOURS + SELECTED ADD-ONS
              </span>
            </div>

            {/* Book Now WhatsApp Trigger */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[var(--accent)] border border-[var(--accent)] hover:bg-black hover:text-[var(--accent)] text-[#080808] py-4 transition-all duration-300 font-condensed text-[11px] font-semibold tracking-[0.25em] uppercase select-none cursor-pointer"
              style={{ boxShadow: '0 10px 30px rgba(197, 160, 117, 0.25)' }}
            >
              <MessageSquare size={13} className="shrink-0" />
              <span>BOOK THIS CONFIGURATION</span>
            </a>

            <p className="text-[10px] leading-relaxed text-white/30 font-light tracking-wide mt-5 text-center w-full">
              * Rates are custom project estimates. Final pricing is formalized inside a legal session contract.
            </p>

            {/* Corner Bracket Accents */}
            <span className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/10" />
            <span className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/10" />
          </div>

        </div>

      </div>
    </section>
  );
}
