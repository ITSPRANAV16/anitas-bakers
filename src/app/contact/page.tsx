"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { APP_CONFIG } from "@/lib/firebase";

export default function ContactPage() {
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const message = formData.get("message");
    const waMsg = \`*Message from \${name}*\n\n\${message}\`;
    window.open(\`https://wa.me/\${APP_CONFIG.WHATSAPP_NUM}?text=\${encodeURIComponent(waMsg)}\`, "_blank");
  };

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-24 px-5 max-w-[800px] mx-auto min-h-screen">
        <div className="text-center mb-16">
          <span className="block text-gold-main font-medium tracking-[2px] uppercase text-sm mb-4">Get in Touch</span>
          <h1 className="font-display text-[clamp(2.5rem,6vw+1rem,4.5rem)] font-bold text-text-primary leading-[1.1] mb-6">
            Contact Us
          </h1>
        </div>

        <div className="bg-white/5 border border-gold-main/20 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-md">
          <form onSubmit={handleContact} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm text-text-secondary uppercase tracking-wider mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold-main focus:bg-gold-main/5 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary uppercase tracking-wider mb-2">Message or Custom Order Details</label>
              <textarea 
                name="message" 
                rows={5} 
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold-main focus:bg-gold-main/5 outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full py-5 text-lg mt-4">
              Send via WhatsApp
            </button>
          </form>

          <div className="mt-12 text-center text-text-secondary">
            <p className="mb-2">📍 Dutt Mandir Jawal, Narsingpur (Ishwarpur)</p>
            <p>📞 +91 9595997500</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
