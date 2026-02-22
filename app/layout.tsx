import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/sections/CustomCursor";
import IntroLoader from "@/sections/IntroLoader";
import Navbar from "@/sections/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "Suyash | Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <IntroLoader />
        <Navbar />
        <CustomCursor />
        
        {children}
      </body>
    </html>
  );
}
