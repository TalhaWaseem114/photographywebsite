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

export const metadata = {
  title: "Hanzala — Photography",
  description: "A clean, modern photography portfolio",
};

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
