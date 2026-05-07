"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/menu", label: "MENU" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center transition-all duration-500 max-w-7xl
        ${
          isScrolled
            ? "w-full top-0 h-[70px] rounded-none border-b border-gold-main/10 bg-[#0b0908]/90 px-4 md:px-8"
            : "w-[calc(100%-40px)] md:w-[calc(100%-120px)] top-4 h-[75px] md:h-[85px] rounded-full border border-gold-main/20 bg-bg-glass backdrop-blur-xl px-4 md:px-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        }
      `}
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="font-display text-4xl md:text-5xl leading-none bg-gradient-to-br from-[#FFDF73] to-[#B8860B] bg-clip-text text-transparent drop-shadow-md pb-1">
          A
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-sans text-[1rem] md:text-[1.15rem] font-bold tracking-[2px] text-gold-light uppercase leading-none">
            Anita's <span className="font-light text-white">Bakers</span>
          </div>
          <div className="text-[0.6rem] md:text-[0.65rem] text-[#4ade80] tracking-[1px] uppercase font-semibold mt-1 flex items-center gap-1">
            <span className="text-[0.5rem]">✦</span> Pure Vegetarian
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full text-[0.85rem] font-medium transition-all uppercase tracking-wide
              ${
                pathname === link.href
                  ? "text-gold-light bg-gold-main/10 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]"
                  : "text-text-secondary hover:text-gold-light hover:bg-gold-main/10"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          className="px-4 py-2 rounded-full text-[0.85rem] font-medium text-text-secondary hover:text-gold-light hover:bg-gold-main/10 transition-all uppercase tracking-wide"
        >
          LOGIN
        </Link>
      </nav>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-gold-main p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-[320px] h-screen bg-gradient-to-b from-[#110E0C] to-[#0B0908] border-l border-gold-main/10 backdrop-blur-md shadow-[-20px_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-center p-10 gap-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-40
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-xl py-4 border-b border-white/5 transition-all
              ${pathname === link.href ? "text-gold-light" : "text-text-secondary"}
            `}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-xl py-4 text-text-secondary transition-all"
        >
          LOGIN
        </Link>
      </div>
    </header>
  );
}
