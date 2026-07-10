export const CATEGORIES = [
  "All",
  "Landscapes",
  "Portraits",
  "Architecture",
  "Street",
  "Nature",
  "Events",
  "Fashion",
  "B&W"
];

export const PORTFOLIO_ITEMS = [
  // Landscapes
  {
    id: "land-01",
    title: "Golden Hour Peaks",
    category: "Landscapes",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    slides: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469521669194-bfea855730eb?q=80&w=800&auto=format&fit=crop"
    ],
    aspectRatio: "portrait",
    location: "Dolomites, Italy",
    date: "2024",
    camera: "Sony A7R V",
    lens: "24-70mm f/2.8 GM II",
    featured: true,
    likes: 45,
    comments: [
      { name: "Aisha Khan", text: "Stunning light gradients on the peak contours!", date: "2 days ago" },
      { name: "Zeeshan Malik", text: "Reminds me of Hunza Valley golden hours.", date: "1 day ago" }
    ]
  },
  {
    id: "land-02",
    title: "Autumn in Hunza",
    category: "Landscapes",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Hunza Valley, Pakistan",
    date: "2024",
    camera: "Fujifilm GFX 100S",
    lens: "32-64mm f/4",
    featured: false
  },
  {
    id: "land-03",
    title: "Whispering Pines",
    category: "Landscapes",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Oregon, USA",
    date: "2023",
    camera: "Sony A7R V",
    lens: "70-200mm f/2.8 GM II",
    featured: false
  },

  // Portraits
  {
    id: "port-01",
    title: "Elegance in Gold",
    category: "Portraits",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    slides: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
    ],
    aspectRatio: "portrait",
    location: "Studio Paris",
    date: "2024",
    camera: "Canon EOS R5",
    lens: "85mm f/1.2 L USM",
    featured: true,
    likes: 67,
    comments: [
      { name: "Maria Fatima", text: "The portrait depth and skin tone rendering is superb.", date: "4 hours ago" }
    ]
  },
  {
    id: "port-02",
    title: "Lines of Experience",
    category: "Portraits",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Kyoto, Japan",
    date: "2023",
    camera: "Leica M11",
    lens: "50mm f/1.4 Summilux",
    featured: false
  },
  {
    id: "port-03",
    title: "Chasing Shadows",
    category: "Portraits",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "square",
    location: "Berlin, Germany",
    date: "2024",
    camera: "Sony A7 IV",
    lens: "35mm f/1.4 GM",
    featured: false
  },

  // Architecture
  {
    id: "arch-01",
    title: "Concrete Minimalist",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Los Angeles, USA",
    date: "2024",
    camera: "Sony A7R V",
    lens: "16-35mm f/4 G PZ",
    featured: false
  },
  {
    id: "arch-02",
    title: "Reaching High",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    slides: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop"
    ],
    aspectRatio: "portrait",
    location: "Derawar Fort, Cholistan",
    date: "2023",
    camera: "Canon EOS R5",
    lens: "24-105mm f/4 L",
    featured: true,
    likes: 89,
    comments: [
      { name: "Haris Siddiqui", text: "Outstanding scale, captures Derawar's grand presence beautifully.", date: "1 week ago" }
    ]
  },
  {
    id: "arch-03",
    title: "Inner Sanctum",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Copenhagen, Denmark",
    date: "2024",
    camera: "Fujifilm GFX 100S",
    lens: "23mm f/4",
    featured: false
  },

  // Street
  {
    id: "str-01",
    title: "Neon Reflections",
    category: "Street",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Shinjuku, Tokyo",
    date: "2024",
    camera: "Leica Q3",
    lens: "28mm f/1.7 Summilux",
    featured: true
  },
  {
    id: "str-02",
    title: "Rainy Intersect",
    category: "Street",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Chicago, USA",
    date: "2023",
    camera: "Sony A7 IV",
    lens: "35mm f/1.4 GM",
    featured: false
  },
  {
    id: "str-03",
    title: "Chiaroscuro Silhouette",
    category: "Street",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Rome, Italy",
    date: "2024",
    camera: "Ricoh GR III",
    lens: "28mm f/2.8",
    featured: false
  },

  // Nature
  {
    id: "nat-01",
    title: "Emerald Canopy",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Yakushima, Japan",
    date: "2024",
    camera: "Sony A7R V",
    lens: "90mm f/2.8 Macro",
    featured: false
  },
  {
    id: "nat-02",
    title: "Mossy Pathway",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Black Forest, Germany",
    date: "2023",
    camera: "Canon EOS R5",
    lens: "24-70mm f/2.8 L",
    featured: false
  },
  {
    id: "nat-03",
    title: "Valley of Light",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Yosemite, USA",
    date: "2024",
    camera: "Sony A7R V",
    lens: "24-70mm f/2.8 GM II",
    featured: true
  },

  // Events
  {
    id: "evt-01",
    title: "Vows in the Forest",
    category: "Events",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Redwoods, California",
    date: "2024",
    camera: "Sony A9 III",
    lens: "50mm f/1.2 GM",
    featured: true
  },
  {
    id: "evt-02",
    title: "Rhythm & Lights",
    category: "Events",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Cholistan Desert Festival, PK",
    date: "2023",
    camera: "Canon EOS R6 II",
    lens: "70-200mm f/2.8 L",
    featured: false
  },
  {
    id: "evt-03",
    title: "The Banquet",
    category: "Events",
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Florence, Italy",
    date: "2024",
    camera: "Sony A7 IV",
    lens: "35mm f/1.4 GM",
    featured: false
  },

  // Fashion
  {
    id: "fsh-01",
    title: "Crimson Velvet",
    category: "Fashion",
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Milan, Italy",
    date: "2024",
    camera: "Hasselblad X2D 100C",
    lens: "80mm f/1.9",
    featured: true
  },
  {
    id: "fsh-02",
    title: "Behind the Lens",
    category: "Fashion",
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "London Runway",
    date: "2023",
    camera: "Sony A9 III",
    lens: "70-200mm f/2.8 GM II",
    featured: false
  },
  {
    id: "fsh-03",
    title: "Urban Editorial",
    category: "Fashion",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "SoHo, New York",
    date: "2024",
    camera: "Canon EOS R5",
    lens: "85mm f/1.2 L",
    featured: false
  },

  // Black and White
  {
    id: "bw-01",
    title: "Textures of Time",
    category: "B&W",
    src: "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Sahara Desert",
    date: "2023",
    camera: "Leica M11 Monochrom",
    lens: "35mm f/2 APO-Summicron",
    featured: true
  },
  {
    id: "bw-02",
    title: "Geometric Play",
    category: "B&W",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "landscape",
    location: "Brasilia, Brazil",
    date: "2024",
    camera: "Leica Q3",
    lens: "28mm f/1.7 Summilux",
    featured: false
  },
  {
    id: "bw-03",
    title: "Steam & Shadow",
    category: "B&W",
    src: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "portrait",
    location: "Wazir Khan, Lahore",
    date: "2024",
    camera: "Sony A7 IV",
    lens: "50mm f/1.4 GM",
    featured: false
  }
];
