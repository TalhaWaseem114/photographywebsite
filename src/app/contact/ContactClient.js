'use client';

import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactFAQ from '@/components/contact/ContactFAQ';

export default function ContactClient() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg)]">
      {/* 1. Page Header */}
      <ContactHero />

      {/* 2. Form & Direct Details Grid */}
      <ContactForm />

      {/* 3. FAQ Accordion Grid */}
      <ContactFAQ />
    </main>
  );
}
