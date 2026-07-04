'use client';

import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceGenres from '@/components/services/ServiceGenres';
import PackagesSection from '@/components/services/PackagesSection';
import PricingCalculator from '@/components/services/PricingCalculator';
import ProcessSection from '@/components/services/ProcessSection';
import ContactCTA from '@/components/home/ContactCTA';

export default function ServicesClient() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Page Header */}
      <ServicesHero />

      {/* 1b. Service Genres & Disciplines */}
      <ServiceGenres />

      {/* 2. Packages Grid */}
      <PackagesSection />

      {/* 3. Pricing Calculator */}
      <PricingCalculator />

      {/* 4. Experience Process */}
      <ProcessSection />

      {/* 5. Direct Contact Banner */}
      <ContactCTA />
    </main>
  );
}
