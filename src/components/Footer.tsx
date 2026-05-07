import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-5 text-center bg-[#080605] mt-auto">
      <div className="font-script text-3xl text-gold-main mb-2 text-shadow-sm">
        Anita's Bakers
      </div>
      <div className="text-sm text-[#81C784] mb-6 tracking-wide">
        🌿 100% Pure Vegetarian Excellence • Since 2024
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
        <Link href="/" className="text-text-secondary hover:text-gold-light transition-colors text-sm uppercase tracking-wider">Home</Link>
        <Link href="/menu" className="text-text-secondary hover:text-gold-light transition-colors text-sm uppercase tracking-wider">Menu</Link>
        <Link href="/about" className="text-text-secondary hover:text-gold-light transition-colors text-sm uppercase tracking-wider">About</Link>
        <Link href="/contact" className="text-text-secondary hover:text-gold-light transition-colors text-sm uppercase tracking-wider">Contact</Link>
        <Link href="/login" className="text-text-secondary hover:text-gold-light transition-colors text-sm uppercase tracking-wider">Login</Link>
      </div>

      <div className="text-text-muted text-xs leading-relaxed max-w-lg mx-auto">
        <p>© {new Date().getFullYear()} Anita's Bakers. All rights reserved.</p>
        <p className="mt-1">दत्त मंदिर जवळ, नरसिंहपुर, Ishwarpur</p>
        <p className="mt-4 text-white/30 tracking-[1px]">Designed & Developed by Pranav</p>
      </div>
    </footer>
  );
}
