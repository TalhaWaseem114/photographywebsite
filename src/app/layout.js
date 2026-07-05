import { Inter, Antonio, Barlow_Condensed, Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const antonio = Antonio({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600"],
});

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function generateMetadata() {
  let title = "Scura Studio | Cinematic Editorial Photography";
  let description = "Premium bespoke editorial portfolio and journal showcasing architectural shadows, minimal low-key studio portraiture, and photo essays.";

  try {
    const docRef = doc(db, "site_config", "settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.general?.siteTitle) title = data.general.siteTitle;
      if (data.general?.metaDesc) description = data.general.metaDesc;
    }
  } catch (err) {
    console.error("Error generating dynamic metadata:", err);
  }

  return { title, description };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${antonio.variable} ${barlowCondensed.variable} ${dancingScript.variable} h-full antialiased bg-[var(--bg)]`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]" suppressHydrationWarning>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
