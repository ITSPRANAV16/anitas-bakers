import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="pt-32 pb-24 px-5 max-w-[1200px] mx-auto min-h-screen">
        <div className="text-center mb-16">
          <span className="block text-gold-main font-medium tracking-[2px] uppercase text-sm mb-4">Our Story</span>
          <h1 className="font-display text-[clamp(2.5rem,6vw+1rem,4.5rem)] font-bold text-text-primary leading-[1.1] mb-6">
            The Anita's Legacy
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[20px] overflow-hidden border border-gold-main/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative aspect-[4/3]">
            <Image 
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop" 
              alt="Bakery Kitchen"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl text-gold-main mb-6">Tradition meets Perfection</h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Established in 2024, Anita's Bakers was born out of a passion to provide Narsingpur with premium, 100% pure vegetarian baked goods. We noticed a lack of truly exceptional eggless options in the market and set out to change that.
            </p>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Our master bakers use only the finest ingredients—organic flour, pure dairy, and rich cocoa—to ensure that every bite is an experience of luxury and indulgence.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Whether it's a grand celebration or a simple craving for fresh bread, we are dedicated to making your moments sweeter.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
