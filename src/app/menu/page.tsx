"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { DEFAULT_PRODUCTS } from "@/lib/firebase";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "cakes", label: "Premium Cakes" },
    { id: "bread", label: "Artisanal Breads" },
    { id: "snacks", label: "Savory Snacks" },
  ];

  const filteredProducts = activeTab === "all" 
    ? DEFAULT_PRODUCTS 
    : DEFAULT_PRODUCTS.filter(p => p.cat === activeTab);

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-24 px-5 max-w-[1400px] mx-auto min-h-screen">
        <div className="text-center mb-16">
          <span className="block text-gold-main font-medium tracking-[2px] uppercase text-sm mb-4">Our Offerings</span>
          <h1 className="font-display text-[clamp(2.5rem,6vw+1rem,4.5rem)] font-bold text-text-primary leading-[1.1] mb-6">
            The Complete Collection
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Browse our selection of 100% pure vegetarian cakes, breads, and snacks. Baked fresh daily with love and premium ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300
                ${activeTab === tab.id 
                  ? "bg-gold-gradient text-bg-deep shadow-[0_10px_20px_rgba(212,175,55,0.3)] scale-105" 
                  : "bg-white/5 text-text-secondary border border-white/10 hover:border-gold-main/50 hover:text-gold-light"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center text-text-muted py-20 text-lg">
            No items found in this category.
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
