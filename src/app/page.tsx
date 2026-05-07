"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { DEFAULT_PRODUCTS, Review } from "@/lib/firebase";

export default function Home() {
  const premiumItems = DEFAULT_PRODUCTS.filter((p) =>
    ["Mava Cake", "Black Forest", "Red Velvet", "Blueberry Cake", "Khari", "Bread"].some((n) => p.name.includes(n))
  ).slice(0, 6);

  const [reviews, setReviews] = useState<Review[]>([
    { name: "Priya S.", text: "The eggless chocolate cake is an absolute masterpiece. Unbelievably rich and entirely guilt-free.", rating: 5 },
    { name: "Dr. Rajesh M.", text: "Finally, a bakery that understands luxury without compromising on strict vegetarian principles.", rating: 5 },
    { name: "Kavita K.", text: "The Red Velvet is the centerpiece of every family celebration we have. Flawless presentation.", rating: 5 },
  ]);

  const [revName, setRevName] = useState("");
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState("5");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revText) return alert("Please enter name and review");
    setIsSubmitting(true);
    setTimeout(() => {
      setReviews([{ name: revName, text: revText, rating: parseInt(revRating) }, ...reviews]);
      setRevName("");
      setRevText("");
      setIsSubmitting(false);
      alert("Thank you for your review!");
    }, 1000);
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden pt-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center animate-float scale-110" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0b0908]/70 via-[#0b0908]/40 to-bg-deep" />
        
        <div className="relative z-10 max-w-4xl mx-auto mt-12">
          <span className="block text-base tracking-[4px] uppercase text-gold-light mb-5 opacity-0 animate-fade-in-up [animation-delay:200ms]">
            Est. 2024
          </span>
          <h1 className="font-display text-[clamp(2.5rem,8vw+1rem,5.5rem)] leading-[1.1] mb-6 text-text-primary drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] opacity-0 animate-fade-in-up [animation-delay:400ms]">
            The Art of Pure Vegetarian Baking
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up [animation-delay:600ms]">
            Exquisite eggless confections and artisanal breads, crafted daily with uncompromising quality and zero animal products.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center opacity-0 animate-fade-in-up [animation-delay:800ms]">
            <Link href="/menu" className="btn-primary">
              Explore Menu
            </Link>
            <Link href="/contact" className="btn-secondary">
              Order Custom Cake
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Creations */}
      <section className="py-24 px-5 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="block text-gold-main font-medium tracking-[2px] uppercase text-sm mb-4">Our Masterpieces</span>
          <h2 className="font-display text-[clamp(2.2rem,5vw+1rem,3.8rem)] font-bold text-text-primary leading-[1.1]">Signature Creations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumItems.map((product, i) => (
            <div key={product.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: \`\${i * 150}ms\` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/menu" className="btn-secondary px-10 py-4">View Complete Collection</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-bg-surface py-28 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[20px] overflow-hidden border border-gold-main/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative aspect-[4/3]">
            <Image 
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop" 
              alt="Bakery Kitchen"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw+1rem,3.8rem)] text-gold-main mb-6 leading-[1.1]">Uncompromising Purity & Taste</h2>
            <p className="text-lg text-text-secondary mb-6 leading-[1.8]">
              At Anita's Bakers, we've redefined what vegetarian baking can be. No eggs, no compromises. Just premium ingredients, masterful technique, and an absolute dedication to creating the most decadent treats you've ever tasted.
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-[1.8]">
              From our cloud-soft artisanal breads to our intricately designed chocolate truffles, every creation is a testament to our craft.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-gold-gradient font-bold uppercase tracking-[1px] hover:gap-4 transition-all">
              Discover Our Story <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-28 px-5">
        <div className="text-center mb-16">
          <span className="block text-gold-main font-medium tracking-[2px] uppercase text-sm mb-4">Testimonials</span>
          <h2 className="font-display text-[clamp(2.2rem,5vw+1rem,3.8rem)] font-bold text-text-primary leading-[1.1]">Words from our Patrons</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto mb-16">
          {reviews.map((r, i) => (
            <div key={i} className="bg-transparent border border-gold-main/15 p-10 rounded-xl text-center opacity-0 animate-fade-in-up" style={{ animationDelay: \`\${i * 150}ms\` }}>
              <div className="text-gold-main text-2xl mb-4">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p className="font-display text-lg text-text-primary italic mb-6 leading-[1.6]">"{r.text}"</p>
              <div className="text-sm tracking-[2px] uppercase text-gold-dark">— {r.name}</div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="max-w-[600px] mx-auto bg-white/5 p-8 rounded-xl border border-gold-main/20">
          <h3 className="text-gold-main font-display text-2xl mb-6 text-center">Share Your Experience</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-4 focus:border-gold-main focus:bg-gold-main/5 outline-none transition-colors"
                required
              />
            </div>
            <div className="mb-4">
              <select 
                value={revRating}
                onChange={(e) => setRevRating(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-gold-main rounded-lg p-4 focus:border-gold-main focus:bg-gold-main/5 outline-none transition-colors"
              >
                <option value="5">⭐️⭐️⭐️⭐️⭐️ (Excellent)</option>
                <option value="4">⭐️⭐️⭐️⭐️ (Very Good)</option>
                <option value="3">⭐️⭐️⭐️ (Average)</option>
                <option value="2">⭐️⭐️ (Below Average)</option>
                <option value="1">⭐️ (Poor)</option>
              </select>
            </div>
            <div className="mb-6">
              <textarea 
                placeholder="What did you love about our cakes?" 
                rows={3}
                value={revText}
                onChange={(e) => setRevText(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-4 focus:border-gold-main focus:bg-gold-main/5 outline-none transition-colors"
                required
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
