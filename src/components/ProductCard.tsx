"use client";

import Image from "next/image";
import { Product } from "@/lib/firebase";
import { APP_CONFIG } from "@/lib/firebase";

export default function ProductCard({ product }: { product: Product }) {
  const getProductDesc = (id: string) => {
    const descs: Record<string, string> = {
      bread: "Organic flour, slow fermentation, cloud-soft centre.",
      khari: "Hand-rolled, 100-layer flaky pastry. Traditional perfection.",
      mava: "Rich, dense, infused with cardamom and pure milk solids.",
      blackforest: "Dark Belgian chocolate, vanilla bean cream, fresh cherries.",
      redvelvet: "Velvety crimson sponge with mascarpone-style frosting.",
      blueberry: "Madagascar vanilla sponge bursting with European blueberries.",
    };
    // Match ID suffix or prefix for description
    const match = Object.keys(descs).find(k => id.includes(k));
    return match ? descs[match] : "Pure, eggless, premium confection.";
  };

  const handleOrder = () => {
    const message = `🛒 *New Order - ${APP_CONFIG.SHOP_NAME}*\n\n📦 Item: ${product.name}\n\nPlease confirm availability! 🙏`;
    window.open(`https://wa.me/${APP_CONFIG.WHATSAPP_NUM}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <article className="bg-white/5 border border-gold-main/10 rounded-xl p-5 transition-all duration-500 hover:bg-gold-main/5 hover:border-gold-main/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden flex flex-col h-full">
      <div className="rounded-lg overflow-hidden mb-5 relative aspect-[4/3]">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <h3 className="font-display text-xl md:text-2xl text-gold-light mb-2">
        {product.name}
      </h3>
      
      <p className="text-text-muted text-sm mb-5 flex-1">
        {getProductDesc(product.id)}
      </p>
      
      <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
        <span className="font-display text-2xl text-text-primary">
          {product.price}
        </span>
        <button
          onClick={handleOrder}
          className="text-gold-main text-sm uppercase tracking-wide font-medium transition-colors group-hover:text-gold-light"
        >
          Order Now →
        </button>
      </div>
    </article>
  );
}
