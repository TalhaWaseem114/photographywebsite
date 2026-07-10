'use client';

import { useState } from 'react';

export default function SkillsSection() {
  const skills = [
    {
      num: "01",
      title: "Photography",
      items: ["Street Photography", "Portrait Photography", "Cinematic Composition", "Mobile Photography", "Visual Storytelling"],
      progress: 95,
      level: "Mastery"
    },
    {
      num: "02",
      title: "Video Editing",
      items: ["Short Film Editing", "Reel & Short Creation", "Cinematic Cuts", "Color Grading (LUTs)", "Story Pacing & Rhythm"],
      progress: 88,
      level: "Expert"
    },
    {
      num: "03",
      title: "Graphic Design",
      items: ["Poster Layouts", "Editorial Typography", "Brand Guidelines", "Visual Balance", "Identity Design"],
      progress: 84,
      level: "Advanced"
    },
    {
      num: "04",
      title: "Creative Tools",
      items: ["Adobe Lightroom", "Photoshop CC", "Premiere Pro", "CapCut / Mobile", "Workflow Automation"],
      progress: 91,
      level: "Mastery"
    }
  ];

  return (
    <section id="skills-section" className="relative w-full bg-background py-28 overflow-hidden">
      
      {/* ─── Gray Gradient Divider Line ─── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50 z-30"></div>

      {/* Editorial Watermark Text in Background */}
      <div className="absolute right-[-10%] bottom-0 text-[180px] font-display font-black text-foreground/[0.01] uppercase tracking-widest pointer-events-none select-none">
        Aesthetic
      </div>

      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Section Title & Philosophy (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between pr-0 lg:pr-8 lg:border-r lg:border-divider/50">
            <div className="flex flex-col gap-6">
              {/* Giant elegant Number with accent line */}
              <div className="relative w-fit select-none">
                <span className="font-display text-[90px] md:text-[110px] text-foreground/10 font-extralight leading-none">
                  03
                </span>
                <div className="absolute left-[20px] bottom-[20px] w-[100px] h-[1px] bg-accent/30 -rotate-[35deg] transform origin-bottom-left"></div>
              </div>
              
              <div>
                <span className="text-[10px] font-condensed tracking-[0.4em] uppercase text-accent font-semibold">
                  Capabilities
                </span>
                <h2 className="font-display text-[28px] md:text-[34px] leading-tight tracking-[0.08em] uppercase text-foreground font-light mt-2">
                  Skills &<br />Expertise
                </h2>
              </div>
            </div>
            
            <p className="text-muted text-[13px] leading-[2.1] font-light tracking-wide mt-8 lg:mt-0 max-w-[280px]">
              Technical precision meets creative instinct. Every tool and technique is applied with intention to serve the ultimate narrative of the frame.
            </p>
          </div>

          {/* Right Column: Skills Grid (9 cols) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col justify-between group">
                <div>
                  {/* Column Header */}
                  <div className="mb-6 flex flex-col gap-1 select-none">
                    <span className="text-[10px] font-condensed font-medium tracking-[0.25em] text-accent/80">
                      {skill.num}
                    </span>
                    <h3 className="text-[14px] font-display font-medium tracking-[0.15em] uppercase text-foreground group-hover:text-accent transition-colors duration-300">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Divider Line under Header */}
                  <div className="w-full h-[1px] bg-divider/60 mb-6 group-hover:bg-accent/35 transition-colors duration-500"></div>

                  {/* Skills List */}
                  <ul className="text-muted text-[13px] font-light tracking-wide space-y-4 mb-10">
                    {skill.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 group/item">
                        <span className="w-[3px] h-[3px] bg-accent/40 rounded-full block flex-shrink-0 group-hover/item:bg-accent transition-colors"></span>
                        <span className="group-hover/item:text-foreground group-hover/item:translate-x-1.5 transition-all duration-300 inline-block">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress Indicator */}
                <div className="mt-auto pt-6 border-t border-divider/40">
                  <div className="flex justify-between items-baseline mb-2 text-[10px] font-condensed tracking-wider text-muted">
                    <span className="uppercase text-[9px] font-medium tracking-[0.15em] text-accent/70">{skill.level}</span>
                    <span className="font-semibold text-foreground/80">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-[1px] bg-foreground/5 relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-accent transition-all duration-1000 ease-out"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}