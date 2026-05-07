import type { Metadata } from "next";
import { Playfair_Display, Rubik, Great_Vibes } from "next/font/google";
import LuxBot from "@/components/LuxBot";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anita's Bakers • Pure Vegetarian Bakery",
  description: "Explore our exquisite eggless confections and artisanal breads, crafted daily with love in Narsingpur!",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E%F0%9F%A5%90%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${rubik.variable} ${greatVibes.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen">
        {children}
        <LuxBot />
      </body>
    </html>
  );
}
