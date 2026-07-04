'use client';

import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';

export default function SubmitReviewForm({ onAddReview }) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    category: 'Portrait',
    rating: 5,
    quote: ''
  });
  
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build new testimonial item
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const d = new Date();
    const dateStr = `${months[d.getMonth()]} ${d.getFullYear()}`;
    
    const newReview = {
      id: `test-custom-${Date.now()}`,
      quote: form.quote,
      author: form.name,
      role: form.role || 'Client',
      category: form.category,
      rating: form.rating,
      date: dateStr
    };

    onAddReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        role: '',
        category: 'Portrait',
        rating: 5,
        quote: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      className="relative bg-black py-16 md:py-24 border-t border-white/5"
      style={{ contain: "layout style paint" }}
    >
      <div className="max-w-[1700px] mx-auto px-8 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left column description */}
        <div className="lg:col-span-4 flex flex-col items-start text-left">
          {/* Large 02 with diagonal slash */}
          <div className="relative mb-5 w-fit select-none">
            <span className="font-display text-[90px] md:text-[110px] text-white/10 font-extralight leading-none">
              02
            </span>
            <div className="absolute left-[30px] bottom-[28px] w-[130px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
          </div>

          <span className="font-condensed text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3 block">
            FEEDBACK MODULE
          </span>
          <h2 className="font-display text-[26px] sm:text-[32px] tracking-[0.06em] uppercase text-white font-light mb-6">
            LEAVE A REFLECTION
          </h2>
          <p className="text-[12.5px] leading-[2.1] text-white/40 font-light tracking-wide max-w-[320px]">
            If we have collaborated on a shoot, expedition, or project, I would love to hear your thoughts. Your reflection will be compiled into this visual journal ledger.
          </p>
        </div>

        {/* Right column form block */}
        <div className="lg:col-span-8 flex flex-col items-start w-full">
          {submitted ? (
            <div className="w-full bg-[#0c0c0e] border border-[var(--accent)]/30 rounded-md p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mb-5 animate-bounce">
                <Send size={18} />
              </div>
              <h3 className="font-condensed text-lg tracking-[0.2em] uppercase text-white mb-2">
                Reflection Posted
              </h3>
              <p className="text-white/40 text-xs max-w-xs leading-relaxed">
                Thank you for your kind feedback. Your reflection has been appended to the client index ledger.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 text-left">
              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/15 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Role / Company</label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Creative Lead, Milan Silk"
                    className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/15 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Category & Interactive Stars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Category of Work</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="bg-[#0c0c0e] border-b border-white/20 focus:border-[var(--accent)] outline-none text-[12px] font-light py-2 w-full text-white/80 cursor-pointer transition-colors"
                  >
                    <option value="Portrait">Portrait Session</option>
                    <option value="Event">Event / Celebration</option>
                    <option value="Commercial">Commercial / Brand</option>
                  </select>
                </div>

                {/* Stars selector */}
                <div className="flex flex-col gap-2">
                  <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Rating Investment</label>
                  <div className="flex items-center gap-2 py-2 select-none">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isHighlighted = (hoverRating || form.rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-[var(--accent)] hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`Rate ${star} Stars`}
                        >
                          <Star 
                            size={16} 
                            fill={isHighlighted ? 'currentColor' : 'none'} 
                            className="transition-colors" 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: Reflection Text */}
              <div className="flex flex-col gap-2">
                <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Your Reflection *</label>
                <textarea
                  name="quote"
                  required
                  rows="4"
                  value={form.quote}
                  onChange={handleChange}
                  placeholder="Tell me about your experience collaborating on the shoot..."
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
                Post Reflection
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
