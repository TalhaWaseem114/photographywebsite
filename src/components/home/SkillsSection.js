'use client';

export default function SkillsSection() {
  const skills = [
    {
      num: "01",
      title: "Photography",
      items: ["Street Photography", "Portrait Photography", "Cinematic Composition", "Mobile Photography", "Visual Storytelling"],
      progress: 95
    },
    {
      num: "02",
      title: "Video Editing",
      items: ["Short Film Editing", "Reel Creation", "Cinematic Cuts", "Color Grading", "Story Pacing"],
      progress: 88
    },
    {
      num: "03",
      title: "Graphic Design",
      items: ["Poster Design", "Typography", "Branding", "Layout Composition", "Visual Identity"],
      progress: 84
    },
    {
      num: "04",
      title: "Creative Tools",
      items: ["Adobe Lightroom", "Photoshop", "Premiere Pro", "Canva", "Mobile Editing Workflow"],
      progress: 91
    }
  ];

  return (
    <section id="skills-section" className="relative min-h-[450px] w-full bg-black border-t border-white/10">

      {/* ─── Main Content Flex Wrapper ─── */}
      <div className="w-full h-full flex flex-col lg:flex-row items-start px-8 py-20 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24 gap-12 lg:gap-16">

        {/* ─── Large 03 with Diagonal Slash ─── */}
        {/* Preserves design continuity with previous sections across your portfolio layout */}
        <div className="relative w-fit flex-shrink-0 select-none pt-2">
          <span className="font-display text-[90px] md:text-[120px] text-white/10 font-extralight leading-none">
            03
          </span>
          {/* Diagonal Slash Line */}
          <div className="absolute left-[30px] bottom-[30px] w-[140px] h-[1px] bg-white/20 -rotate-[35deg] transform origin-bottom-left"></div>
        </div>

        {/* ─── Minimalist Multi-Column Grid ─── */}
        {/* Replaced the dark boxed cards with clean, editorial typography separated by minimal column rules */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full sm:divide-x-0 lg:divide-x lg:divide-white/10">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col h-full first:pl-0 lg:pl-8 xl:pl-10 transition-all duration-300 group"
            >
              {/* Column Header */}
              <div className="mb-6 flex flex-col gap-1.5 select-none">
                <span className="text-[11px] font-condensed font-medium tracking-[0.2em] text-[#c5a075]">
                  {skill.num}
                </span>
                <h4 className="text-[13px] font-display font-light tracking-[0.15em] uppercase text-white/90 group-hover:text-white transition-colors">
                  {skill.title}
                </h4>
              </div>

              {/* Skill Sub-items List */}
              <ul className="text-white/50 text-[12px] font-light tracking-wide space-y-3 mb-10 flex-1">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-[3px] h-[3px] bg-[#c5a075]/60 rounded-full block flex-shrink-0"></span>
                    <span className="hover:text-white/80 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              {/* ─── Horizontal Progress Track ─── */}
              {/* Perfectly inline progress block mimicking the reference documentation layout */}
              <div className="mt-auto flex items-center gap-4 w-full select-none">
                <div className="flex-1 h-[1px] bg-white/10 relative">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#c5a075] transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <span className="text-[11px] font-condensed font-light tracking-wider text-white/40 min-w-[28px] text-right">
                  {skill.progress}%
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}