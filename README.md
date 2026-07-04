# Hanzala Photography | Cinematic Editorial Portfolio & Journal

A premium, bespoke web application built for photographers and visual storytellers. Featuring a dark-mode editorial layout, real-time client engagement systems, interactive pricing tools, and a secured administrative control console.

Live Demo: [https://github.com/TalhaWaseem114/photographywebsite](https://github.com/TalhaWaseem114/photographywebsite)

---

## 📸 Core Features

*   **Cinematic Portfolio Galleries**: Responsive masonry layout optimized for editorial grids, featuring smooth lightbox slideshow transitions.
*   **Substack-Style Journal**: An immersive blog system featuring photo essays, daily field logs (complete with body/lens EXIF parameters), dynamic like counts, and real-time nested comments.
*   **Interactive Pricing Estimator**: A customized pricing calculator that lets clients dynamically build photoshoot configurations (hours of coverage, prints, rush delivery) and book instantly via WhatsApp.
*   **Administrative Command Center**: A secured control hub protecting editorial actions (creating/deleting journals, uploading showcase images, approving client reviews, managing inquiries) using Firebase Auth.
*   **Cloudinary Integration**: Unsigned client-side uploads that stream media assets straight to Cloudinary, keeping database storage clean and delivery fast.
*   **Real-time Database Sync**: Powered by Cloud Firestore to keep reviews, inquiries, likes, and comment feeds synchronized across visitors in real time.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (App Router)
*   **Design System**: Tailwind CSS & Vanilla CSS (Fluid spacing, custom HSL palettes, and glassmorphism)
*   **Database**: Firebase Cloud Firestore
*   **Authentication**: Firebase Auth
*   **Media Storage**: Cloudinary (Direct unsigned image uploads)
*   **Animations**: GSAP (GreenSock Animation Platform) & CSS Micro-interactions

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18.x or later)
*   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TalhaWaseem114/photographywebsite.git
   cd photographywebsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Firebase & Cloudinary credentials in `src/lib/firebase.js` and `src/lib/cloudinary.js`.

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Security & Optimization

*   **Unsigned Presets**: Media uploads bypass client-side API Secret exposure by leveraging Cloudinary's secure unsigned presets.
*   **Next.js Hydration & SSR**: Configured layout structures to prevent Grammerly/hydration attribute conflicts.
*   **Singleton Patterns**: Prevents duplicate Firebase app re-initialization crashes during Next.js Hot Module Replacement (HMR) reloads.
