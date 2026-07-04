'use client';

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import PhilosophySection from '@/components/about/PhilosophySection';
import StorySection from '@/components/about/StorySection';
import GearSection from '@/components/about/GearSection';
import TimelineSection from '@/components/about/TimelineSection';
import GalleryStrip from '@/components/about/GalleryStrip';
import AvailabilitySection from '@/components/about/AvailabilitySection';
import ContactCTA from '@/components/home/ContactCTA';

export default function AboutClient() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Cinematic Hero Portrait */}
      <AboutHero />

      {/* 2. Philosophy Quote Section */}
      <PhilosophySection />

      {/* 3. Biography Story Section */}
      <StorySection />

      {/* 4. Tools & Process Section */}
      <GearSection />

      {/* 5. Chronological Route Timeline */}
      <TimelineSection />

      {/* 6. Selected Gallery Strip */}
      <GalleryStrip />

      {/* 7. Availability location details */}
      <AvailabilitySection />

      {/* 8. Bottom CTA Block */}
      <ContactCTA />
    </main>
  );
}
