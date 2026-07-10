'use client';

import React, { useState } from 'react';
import { Send, MessageSquare, Mail, MapPin } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    shootType: 'Portrait',
    date: '',
    budget: "Let's Discuss",
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newInquiry = {
      name: formState.name,
      email: formState.email,
      shootType: formState.shootType,
      date: formState.date || "Not Specified",
      budget: formState.budget,
      message: formState.message,
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    try {
      await addDoc(collection(db, "contact_submissions_items"), newInquiry);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: '',
          email: '',
          shootType: 'Portrait',
          date: '',
          budget: "Let's Discuss",
          message: ''
        });
      }, 3000);
    } catch (err) {
      console.error("Error submitting inquiry to Firestore:", err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      className="relative bg-black py-16 md:py-24"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Inquiry Form */}
        <div className="lg:col-span-7 flex flex-col items-start w-full">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            INQUIRY FORM
          </span>
          <h2 className="font-display text-[24px] sm:text-[30px] tracking-[0.08em] uppercase text-white font-light mb-10 text-left">
            TELL ME ABOUT YOUR PROJECT
          </h2>

          {submitted ? (
            <div className="w-full bg-[#0c0c0e] border border-[var(--accent)]/30 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mb-5 animate-bounce">
                <Send size={18} />
              </div>
              <h3 className="font-condensed text-lg tracking-[0.2em] uppercase text-white mb-2">
                Inquiry Sent
              </h3>
              <p className="text-white/40 text-xs max-w-xs leading-relaxed">
                Thank you. I have received your details and will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 text-left">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/15 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/15 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Shoot Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Shoot Type</label>
                  <select
                    name="shootType"
                    value={formState.shootType}
                    onChange={handleChange}
                    className="bg-[#0c0c0e] border-b border-white/20 focus:border-[var(--accent)] outline-none text-[12px] font-light py-2 w-full text-white/80 cursor-pointer transition-colors"
                  >
                    <option value="Portrait">Portrait Session</option>
                    <option value="Wedding">Wedding / Event</option>
                    <option value="Commercial">Commercial / Brand</option>
                    <option value="Editorial">Editorial / Fashion</option>
                    <option value="Other">Other Session</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleChange}
                    className="bg-[#0c0c0e] border-b border-white/20 focus:border-[var(--accent)] outline-none text-[12px] font-light py-2 w-full text-white/60 cursor-pointer transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Budget Range</label>
                  <select
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="bg-[#0c0c0e] border-b border-white/20 focus:border-[var(--accent)] outline-none text-[12px] font-light py-2 w-full text-white/80 cursor-pointer transition-colors"
                  >
                    <option value="Under Rs. 20,000">Under Rs. 20,000</option>
                    <option value="Rs. 20,000 - Rs. 50,000">Rs. 20,000 - Rs. 50,000</option>
                    <option value="Rs. 50,000 - Rs. 100,000">Rs. 50,000 - Rs. 100,000</option>
                    <option value="Rs. 100,000+">Rs. 100,000+</option>
                    <option value="Let's Discuss">Let's Discuss</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col gap-2">
                <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Describe your creative vision, location ideas, or details..."
                  className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/15 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-fit border border-[var(--accent)]/40 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 text-[var(--accent)] hover:text-white px-8 py-3.5 mt-4 transition-all duration-300 font-condensed text-[11px] font-semibold tracking-[0.25em] uppercase cursor-pointer"
                style={{
                  boxShadow: '0 4px 20px rgba(197, 160, 117, 0.05)'
                }}
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: Contact Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8 w-full">
          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block text-left">
            DIRECT CONTACT
          </span>

          <div className="flex flex-col gap-6 w-full text-left">
            {/* WhatsApp Booking */}
            <a 
              href="https://wa.me/03493771741" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#0c0c0e] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 hover:bg-white/[0.01] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <MessageSquare size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">WhatsApp Chat</span>
                <span className="text-[12.5px] font-semibold text-white/80 tracking-wide font-mono group-hover:text-white transition-colors">
                  +92 349 3771741
                </span>
              </div>
            </a>

            {/* Email Address */}
            <a 
              href="mailto:hello@hanzalaphotography.com"
              className="group flex items-center gap-4 bg-[#0c0c0e] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 hover:bg-white/[0.01] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform shrink-0">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Email Inquiry</span>
                <span className="text-[12px] font-semibold text-white/80 tracking-wide group-hover:text-white transition-colors">
                  hello@hanzalaphotography.com
                </span>
              </div>
            </a>

            {/* Location Stamp Card */}
            <div className="relative bg-[#0c0c0e] border border-white/5 rounded-xl p-8 text-left mt-2">
              <span className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10" />
              <span className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10" />
              <span className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/10" />
              <span className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10" />

              <div className="flex flex-col gap-1 select-none">
                <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <MapPin size={9} className="text-[var(--accent)] animate-pulse" />
                  STUDIO HQ
                </span>
                <h3 className="font-display text-[24px] text-white font-light tracking-[0.1em] uppercase leading-none">
                  BAHAWALPUR
                </h3>
                <h4 className="font-condensed text-[11px] text-[var(--accent)] font-medium tracking-[0.2em] uppercase mt-0.5">
                  PUNJAB, PAKISTAN
                </h4>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-white/5 font-mono text-[9px] tracking-widest text-white/40">
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  INSTAGRAM
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
                  YOUTUBE
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
