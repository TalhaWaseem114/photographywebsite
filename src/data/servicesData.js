export const SESSION_PACKAGES = [
  {
    id: "pkg-01",
    num: "01",
    title: "EDITORIAL PORTRAITS",
    desc: "Sculpting light and shape inside studio or environmental locations. Ideal for authors, artists, fashion editorials, and personal branding dossiers.",
    basePrice: 10000,
    baseHours: 2,
    deliverables: [
      "2 Hours Session Coverage",
      "25 Fully Graded RAW Frames",
      "High-Resolution Digital Delivery",
      "Digital Print Release"
    ],
    timeline: "7-10 Days Turnaround"
  },
  {
    id: "pkg-02",
    num: "02",
    title: "SPATIAL & ARCHITECTURE",
    desc: "Documenting spatial volumes, structures, historic monuments, and interior design grids under natural sunlight configurations.",
    basePrice: 18000,
    baseHours: 3,
    deliverables: [
      "3 Hours On-Location Coverage",
      "30 Architectural Graded Frames",
      "Perspective Distortion Correction",
      "Commercial Usage Licensing"
    ],
    timeline: "10-14 Days Turnaround"
  },
  {
    id: "pkg-03",
    num: "03",
    title: "CINEMATIC EVENTS",
    desc: "Documentary-style event storytelling capturing unposed client milestones, galas, launches, and wedding visual chapters.",
    basePrice: 42000,
    baseHours: 4,
    deliverables: [
      "4 Hours Active Coverage",
      "80 Story-Graded Frames",
      "Dual Photographer Setup Available",
      "Private Online Gallery Archive"
    ],
    timeline: "2-3 Weeks Turnaround"
  },
  {
    id: "pkg-04",
    num: "04",
    title: "FINE ART COMMISSIONS",
    desc: "Custom on-demand nature and mountain landscape sessions tailored for architectural spaces, print galleries, or licensing.",
    basePrice: 25000,
    baseHours: 1,
    deliverables: [
      "Visual Briefing & Location Scout",
      "5 Selected Masterpiece Prints",
      "1 Museum-Grade Framed Print (24x36)",
      "Exclusive Digital Print Plate"
    ],
    timeline: "3-4 Weeks Production"
  }
];

export const PRICING_CONFIG = {
  hourlyRate: 3500, // extra hour rate
  addons: {
    prints: {
      label: "Archival Box Prints (20 Fine Art Plates)",
      price: 5000
    },
    rush: {
      label: "Rush Delivery (48-Hour digital turnaround)",
      price: 3000
    },
    film: {
      label: "Medium Format Film Capture (120mm Film processing)",
      price: 8000
    }
  }
};
