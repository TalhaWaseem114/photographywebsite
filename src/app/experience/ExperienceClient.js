'use client';

import React from 'react';
import ExperienceHero from '@/components/experience/ExperienceHero';
import CommissionsSection from '@/components/experience/CommissionsSection';
import ClientsSection from '@/components/experience/ClientsSection';
import ExhibitionsAwards from '@/components/experience/ExhibitionsAwards';
import CapabilitiesSection from '@/components/experience/CapabilitiesSection';
import ContactCTA from '@/components/home/ContactCTA';
import { STATS } from '@/data/experienceData';

export default function ExperienceClient() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Stats Hero Header */}
      <ExperienceHero 
        exhibitionsCount={STATS.exhibitions}
        awardsCount={STATS.awards}
        brandsCount={STATS.brands}
      />

      {/* 2. Commissions Case Studies */}
      <CommissionsSection />

      {/* 3. Clients Horizontal Scrolling Marquee */}
      <ClientsSection />

      {/* 4. Exhibitions & Awards lists */}
      <ExhibitionsAwards />

      {/* 5. Capabilities / Services Split */}
      <CapabilitiesSection />

      {/* 6. Booking Banner */}
      <ContactCTA />
    </main>
  );
}
